from django.shortcuts import render

# Create your views here.
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.conf import settings
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
import requests
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from .serializers import UserSerializer

from .serializers import TokenRefreshSerializer


CENTRAL_AUTH_URL = settings.CENTRAL_AUTH_URL
User = get_user_model()


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get("email")
    password = request.data.get("password")

    request_data = {
        "operation": "SIGNIN",
        "configs": {},
        "body": {"user": {"email": email, "password": password}},
    }
    # Send credentials to centralized service
    response = requests.put(
        f"{CENTRAL_AUTH_URL}/api/v1/gateway/make",
        json=request_data,
    )
    data = response.json()
    if data["success"]:
        # If valid, issue JWT token
        token = RefreshToken()
        token["user_id"] = data["data"]["user"]["_id"]
        token["merchant_id"] = data["data"]["merchant"]["_id"]
        token["merchant_name"] = data["data"]["merchant"]["businessName"]
        drf_response = Response(
            {
                "refresh": str(token),  # probably dont need
                "access": str(token.access_token),
            }
        )
        drf_response.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE"],
            value=str(token),
            httponly=True,
        )
        return drf_response
    return Response(
        {"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
    )


@api_view(["POST"])
@permission_classes([AllowAny])
@transaction.atomic
def signup_view(request):
    user_data = {
        "first_name": request.data.get("first_name"),
        "last_name": request.data.get("last_name"),
        "email": request.data.get("email"),
        # Add other fields as needed
    }
    merchant_data = {}

    # Post to app db
    serializer = UserSerializer(data=user_data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    # Post to central user db
    name = user_data.pop("first_name") + " " + user_data.pop("last_name")
    user_data["name"] = name
    user_data["password"] = request.data.get("password")

    request_data = {
        "operation": "SIGNUP",
        "configs": {
            "signup": {
                "genPassword": False,
                "appName": "non-profit sass",
                "option": "BOTH",
            }
        },
        "body": {
            "user": user_data,
            "merchant": merchant_data,
        },
    }

    # Send user data to centralized service for account creation
    response = requests.put(
        f"{CENTRAL_AUTH_URL}/api/v1/gateway/make", json=request_data
    )
    data = response.json()
    if data["success"]:
        # If account creation successful, issue JWT token
        token = RefreshToken()
        token["user_id"] = data["data"]["user"]["_id"]
        token["merchant_id"] = data["data"]["merchant"]["_id"]
        token["merchant_name"] = data["data"]["merchant"]["businessName"]
        drf_response = Response(
            {
                "refresh": str(token),  # probably dont need
                "access": str(token.access_token),
            }
        )
        drf_response.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE"],
            value=str(token),
            httponly=True,
        )
        return drf_response
    return Response(
        {"detail": "Account creation failed"}, status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["POST"])
@transaction.atomic
def custom_password_reset_view(request):
    email = request.data.get("email")
    user = User.objects.filter(email=email).first()
    if not user:
        return Response(
            {"error": "User with this email does not exist."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Generate password reset token and UID
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))

    # Construct the password reset link (to be sent via email)
    reset_link = f"{settings.DOMAIN}/reset-password/{uid}/{token}/"

    # Send an email with the password reset link
    send_mail(
        subject="Password Reset for Your Bsystems Account",
        message=f"Please click the following link to reset your password: {reset_link}",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[email],
    )

    return Response({"message": "Password reset link sent."}, status=status.HTTP_200_OK)


@api_view(["POST"])
@transaction.atomic
def custom_password_reset_confirm_view(request):
    uidb64 = request.data.get("uid")
    token = request.data.get("token")
    new_password = request.data.get("new_password")

    try:
        # Decode the UID
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        # Communicate with the central auth service to reset the password
        reference = user.reference
        response = requests.post(
            f"{CENTRAL_AUTH_URL}/reset-password",
            data={"reference": reference, "new_password": new_password},
        )
        data = response.json()
        if data["success"]:
            return Response({"message": "Password has been reset successfully."})
        else:
            return Response(
                {"error": "Failed to reset password with the central auth service."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
    else:
        return Response(
            {"error": "Invalid UID or token."}, status=status.HTTP_400_BAD_REQUEST
        )


# NEEDS TESTING
# Gets new access token else should return 401
# to get a new refresh token, login
@api_view(["GET"])
@permission_classes([AllowAny])
def refresh_token_view(request):
    print("hellp")
    # Access the refresh_token from the cookies sent with the request
    refresh_token = request.COOKIES.get("refresh_token")
    # if not refresh_token:
    #     return Response({"error": "Refresh token not found."}, status=400)

    # Prepare data for TokenRefreshView
    data = {"refresh": refresh_token}

    # Check simplejwt docs if this doesnt work
    serializer = TokenRefreshSerializer(data=data)
    try:
        serializer.is_valid(raise_exception=True)
    except TokenError:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    return Response(serializer.validated_data, status=status.HTTP_200_OK)
