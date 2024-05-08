from rest_framework import viewsets, status, permissions, generics
from utils.photo_validation import validate_file_type
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
    parser_classes,
)
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import MonetaryCampaign, Patient, Cause
from .serializers import (
    MonetaryCampaignSerializer,
    PatientSerializer,
    CauseSerializer,
)
from django.db import transaction
from apps.contact_analytics.models import AccountProfile
from decimal import Decimal


class CampaignViewSet(viewsets.ModelViewSet):
    queryset = MonetaryCampaign.objects.all()
    serializer_class = MonetaryCampaignSerializer


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())

        name = request.query_params.get("name")
        hospital = request.query_params.get("hospital")
        illness = request.query_params.get("illness")

        if name:
            queryset = queryset.filter(name__icontains=name)
        if hospital:
            queryset = queryset.filter(hospital=hospital)
        if illness:
            queryset = queryset.filter(illness__icontains=illness)

        serializer = self.get_serializer(instance=queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CampaignCauseViewSet(viewsets.ModelViewSet):
    queryset = Cause.objects.all()
    serializer_class = CauseSerializer


class GetCauses(generics.ListAPIView):
    serializer_class = CauseSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return Cause.objects.all()


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([JWTAuthentication])
@transaction.atomic
def create_cause(request):
    serializer = CauseSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    cause_instance = serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([JWTAuthentication])
@transaction.atomic
def edit_cause(request):
    try:
        cause_instance = Cause.objects.get(id=request.data.get("id"))
    except Cause.DoesNotExist:
        return Response({"error": "Cause not found"}, status=status.HTTP_404_NOT_FOUND)
    serializer = CauseSerializer(instance=cause_instance, data=request.data)
    serializer.is_valid(raise_exception=True)
    cause_instance = serializer.save()
    return Response(serializer.data, status=status.HTTP_200_OK)


class GetCampaigns(generics.ListAPIView):
    serializer_class = MonetaryCampaignSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return MonetaryCampaign.objects.all()


@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([JWTAuthentication])
@transaction.atomic
def create_campaign(request):
    data = request.data.copy()
    print(data)
    photo = request.FILES.get("photo")
    if photo:
        # Handle the file upload. For example, saving the file to a model associated with the contact.
        validate_file_type(photo)
    serializer = MonetaryCampaignSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    campaign_instance = serializer.save()

    for uid in data.get("subscribers"):
        try:
            account = AccountProfile.objects.get(id=uid)
            campaign_instance.subscribers.add(account)
        except AccountProfile.DoesNotExist:
            pass
    campaign_instance.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["PATCH"])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([JWTAuthentication])
@transaction.atomic
def edit_campaign(request):
    data = request.data.copy()
    photo = request.FILES.get("photo")

    if photo:
        # Handle the file upload. For example, saving the file to a model associated with the contact.
        validate_file_type(photo)
    else:
        data.pop("photo", None)


@api_view(["PATCH"])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([JWTAuthentication])
@transaction.atomic
def delete_campaign(request):
    """
    Soft Delete
    """
    data = request.data
    try:
        campaign_instance = MonetaryCampaign.objects.get(id=data.get("id"))
        serializer = MonetaryCampaignSerializer(
            instance=campaign_instance, data={"is_active": False}
        )
        serializer.is_valid(raise_exception=True)
    except MonetaryCampaign.DoesNotExist:
        pass
    return Response(serializer.data, status=status.HTTP_200_OK)
