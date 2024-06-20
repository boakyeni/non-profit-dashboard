from rest_framework import viewsets, status, permissions, generics
from utils.photo_validation import validate_file_type
from utils.hash_photo import calculate_file_hash
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
    parser_classes,
)
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import MonetaryCampaign, Cause, HealthcarePatient, Photo
from .serializers import (
    MonetaryCampaignSerializer,
    PatientSerializer,
    CauseSerializer,
    PhotoSerializer,
)
from django.db import transaction
from apps.contact_analytics.models import AccountProfile
from apps.contact_analytics.views import (
    handle_beneficiary_creation,
    create_or_update_account,
    handle_contact_type,
    handle_phone_numbers,
)
from decimal import Decimal
from utils.beneficiary_registry import create_or_edit_instance
import json


class CampaignViewSet(viewsets.ModelViewSet):
    queryset = MonetaryCampaign.objects.all()
    serializer_class = MonetaryCampaignSerializer


class PatientViewSet(viewsets.ModelViewSet):
    queryset = HealthcarePatient.objects.all()
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


def handle_photo_upload(photo, campaign, institution_id):
    try:
        file_hash = calculate_file_hash(photo)
        existing_photo = Photo.objects.get(
            hash_key=file_hash, institution=institution_id
        )
        if existing_photo:
            existing_photo.campaigns.add(campaign)
            return
    except Photo.DoesNotExist:
        validate_file_type(photo)
        create_or_edit_instance(
            Photo,
            PhotoSerializer,
            data={
                "file": photo,
                "hash_key": file_hash,
                "campaigns": [campaign.id],
                "institution": institution_id,
            },
        )
        return


@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([JWTAuthentication])
@transaction.atomic
def create_campaign(request):
    """I apologize for the nested json in form_data. In hind sight file upload should be separated, so that we can do simple json. But the application is already in too deep with form data"""
    data = request.data.dict()
    photos = request.FILES.getlist("photos")
    data["created_by"] = request.user.id
    data["institution"] = request.user.institution.id
    subscribers = []
    for x in request.data.getlist("subscribers"):
        account_instance = AccountProfile.objects.filter(id=int(x)).first()
        if account_instance:
            subscribers.append(account_instance.id)
    data["subscribers"] = subscribers
    serializer = MonetaryCampaignSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    campaign_instance = serializer.save()
    if photos:
        for photo in photos:

            handle_photo_upload(photo, campaign_instance, request.user.institution.id)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["PATCH"])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([JWTAuthentication])
@transaction.atomic
def edit_campaign(request):
    data = request.data.dict()
    photos = request.FILES.getlist("photos")
    campaign_instance = MonetaryCampaign.objects.get(id=int(data.get("id")))
    subscribers = []
    for x in request.data.getlist("subscribers"):
        account_instance = AccountProfile.objects.filter(id=int(x)).first()
        if account_instance:
            subscribers.append(account_instance.id)
    data["subscribers"] = subscribers
    data["last_edited_by"] = request.user.id

    serializer = MonetaryCampaignSerializer(
        instance=campaign_instance, data=data, partial=True
    )
    serializer.is_valid(raise_exception=True)
    serializer.save()

    for photo in photos:
        handle_photo_upload(photo, campaign_instance, request.user.institution.id)
    for photo_id in data.get("remove_photo", []):
        photo_instance = Photo.objects.filter(id=int(photo_id)).first()
        campaign_instance.photos.remove(photo_instance)

    for x in request.data.getlist("remove_subscribers"):
        account_instance = AccountProfile.objects.filter(id=int(x)).first()
        if account_instance:
            campaign_instance.subscribers.remove(account_instance)

    return Response(serializer.data, status=status.HTTP_200_OK)


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


@api_view(["PATCH"])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([JWTAuthentication])
@transaction.atomic
def add_beneficiaries_to_campaign(request):
    data = request.data.dict()
    try:
        campaign_instance = MonetaryCampaign.objects.get(
            id=int(data.get("campaign_id"))
        )  # form data so no ints
    except MonetaryCampaign.DoesNotExist:
        raise
    if "beneficiary_list" in data:
        serializer = MonetaryCampaignSerializer(
            instance=campaign_instance,
            data={"beneficiaries": data.get("beneficiary_list")},
            partial=True,
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        """Duplicated from add contact, should wrap into one and use in both"""
        data["associated_institution"] = request.user.institution.id
        # Form Data so data object is immutable
        account_instance = create_or_update_account(data, request.FILES)

        # comes after AccountProfileSerializer so that we know a valid beneficiary was selected
        beneficiary_instance = handle_beneficiary_creation(
            account_instance,
            data.get("beneficiary_type"),
            json.loads(data.get("beneficiary_data", "{}")),
        )
        handle_contact_type(account_instance, data.get("contact_type"), data)
        handle_phone_numbers(account_instance, data.get("phone_number"))

        beneficiary_instance.campaigns.add(campaign_instance)
        beneficiary_instance.save()

        return Response(
            MonetaryCampaignSerializer(instance=campaign_instance).data,
            status=status.HTTP_201_CREATED,
        )
