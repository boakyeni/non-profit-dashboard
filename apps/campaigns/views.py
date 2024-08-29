from rest_framework import viewsets, status, permissions, generics
from rest_framework.exceptions import PermissionDenied
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
    model_mapping,
)
from django.db import transaction
from apps.contact_analytics.models import AccountProfile
from apps.contact_analytics.serializers import AccountProfileReturnSerializer
from apps.contact_analytics.views import (
    handle_beneficiary_creation,
    create_or_update_account,
    handle_contact_type,
    handle_phone_numbers,
)
from decimal import Decimal
from utils.beneficiary_registry import create_or_edit_instance
from utils.various_permissions import check_matching_institution_for_campaigns
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
    """Get all of an institutions campaigns, unless user is bsystems_admin, then get all campaigns"""

    serializer_class = MonetaryCampaignSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return MonetaryCampaign.objects.all()
        else:
            return MonetaryCampaign.objects.filter(
                institution=self.request.user.institution
            )


def approve_campaign(request):
    pass


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
    data["is_active"] = (
        True if request.user.institution_admin or request.user.is_superuser else False
    )
    serializer = MonetaryCampaignSerializer(data=data, context={"request": request})
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
    if not data.get("id"):
        return Response(
            {"message": "Campaign ID is required"}, status=status.HTTP_400_BAD_REQUEST
        )
    campaign_instance = MonetaryCampaign.objects.get(id=int(data.get("id")))
    try:
        check_matching_institution_for_campaigns(request.user, campaign_instance)
    except PermissionDenied:
        raise
    subscribers = []
    for x in request.data.getlist("subscribers"):
        account_instance = AccountProfile.objects.filter(id=int(x)).first()
        if account_instance:
            subscribers.append(account_instance.id)
    data["subscribers"] = subscribers
    data["last_edited_by"] = request.user.id

    serializer = MonetaryCampaignSerializer(
        instance=campaign_instance,
        data=data,
        partial=True,
        context={"request": request},
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
    campaign_id = request.query_params.get("id")

    try:
        campaign_instance = MonetaryCampaign.objects.get(id=campaign_id)
        check_matching_institution_for_campaigns(request.user, campaign_instance)
        serializer = MonetaryCampaignSerializer(
            instance=campaign_instance,
            data={"is_active": False},
            partial=True,
            context={"request": request},
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
    except MonetaryCampaign.DoesNotExist:
        raise
    except PermissionDenied:
        raise
    return Response(serializer.data, status=status.HTTP_200_OK)


def add_or_remove_beneficiary_by_id(remove=False):
    """takes a dict of types with values as an array of ids to add"""
    pass


@api_view(["PATCH"])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([JWTAuthentication])
@transaction.atomic
def add_beneficiaries_to_campaign(request):
    data = request.data.dict()
    try:
        # ids start from 1 so the 0 is just incase campaign_id is not passed
        campaign_instance = MonetaryCampaign.objects.get(
            id=int(data.get("campaign_id"))
        )  # form data so no ints
        check_matching_institution_for_campaigns(request.user, campaign_instance)
    except MonetaryCampaign.DoesNotExist:
        raise
    except PermissionDenied as err:
        raise

    if "beneficiary_list" in data:
        add_or_remove_beneficiary_by_id()

    """Duplicated from add contact, should wrap into one and use in both"""
    data["associated_institution"] = request.user.institution.id
    # Form Data so data object is immutable
    account_instance = create_or_update_account(data, request.FILES)

    # comes after AccountProfileSerializer so that we know a valid beneficiary was selected
    if data.get("beneficiary_type"):
        beneficiary_instance = handle_beneficiary_creation(
            account_instance,
            data.get("beneficiary_type"),
            json.loads(data.get("beneficiary_data", "{}")),
        )
        beneficiary_instance.campaigns.add(campaign_instance)
        beneficiary_instance.save()
    handle_contact_type(account_instance, data.get("contact_type"), data)
    for phone_number in request.data.getlist("phone_number"):
        handle_phone_numbers(account_instance, phone_number)

    return Response(
        AccountProfileReturnSerializer(instance=account_instance).data,
        status=status.HTTP_201_CREATED,
    )


def remove_beneficiaries_from_campaign(request):
    """Needs campaign id, beneficiary id and type"""
    model_mapping
    pass
