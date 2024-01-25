from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
import requests
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from .serializers import UserSerializer
from django.db import transaction

CENTRAL_AUTH_URL = settings.CENTRAL_AUTH_URL


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

        return Response(
            {
                "refresh": str(token),
                "access": str(token.access_token),
            }
        )
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
        "password": request.data.get("password"),
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
        return Response(
            {
                "refresh": str(token),
                "access": str(token.access_token),
            }
        )
    return Response(
        {"detail": "Account creation failed"}, status=status.HTTP_400_BAD_REQUEST
    )
