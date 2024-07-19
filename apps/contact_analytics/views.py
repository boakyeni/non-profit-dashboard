import csv
import json
from utils.photo_validation import validate_file_type
from utils.beneficiary_registry import (
    get_model,
    get_serializer,
    create_or_edit_instance,
)
from rest_framework import viewsets, status, generics, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db import transaction
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from .models import AccountProfile, PhoneNumber, Company
from apps.donor_management.models import Donor, LeadType
from apps.donor_management.serializers import DonorSerializer, LeadTypeSerializer
from apps.campaigns.models import (
    Cause,
    HealthcarePatient,
)
from apps.campaigns.serializers import (
    PatientSerializer,
)
from .serializers import (
    AccountProfileSerializer,
    AccountProfileReturnSerializer,
    PhoneNumberSerializer,
    CompanySerializer,
)


class AccountProfileViewSet(viewsets.ModelViewSet):
    queryset = AccountProfile.objects.all()
    serializer_class = AccountProfileSerializer


class PhoneNumberViewSet(viewsets.ModelViewSet):
    queryset = PhoneNumber.objects.all()
    serializer_class = PhoneNumberSerializer


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class CSVUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    # parser_classes = [FileUploadParser]
    @transaction.atomic
    def post(self, request, *args, **kwargs):
        # Get CSV file from the request
        csv_file = request.FILES.get("file")

        # check if the file is provided
        if not csv_file:
            return Response({"error": "No file provided"}, status.HTTP_400_BAD_REQUEST)
        # Check if the file has a ".csv" extension

        try:
            with transaction.atomic():
                reader = csv.DictReader(csv_file.read().decode("utf-8").splitlines())
                reader.fieldnames = [name.strip() for name in reader.fieldnames]
                # Create objects without relationships
                for row in reader:

                    mapped_row = {
                        "name": row.get("name"),
                        "given_name": row.get("given_names"),
                        "last_name": row.get("last_names"),
                        "email": row.get("email"),
                    }

                    organization = row.get("organization") or row.get("organisation")

                    if organization:
                        """
                        AccountProfile model has a foriegn key to company so Company should be serialized first.
                        Then when we serialize AccountProfile, we have already created the company object and assign the foriegn key to the company object
                        """
                        company_data = {"name": organization}
                        company_serializer = CompanySerializer(data=company_data)
                        company_serializer.is_valid(raise_exception=True)
                        company_instance, created = Company.objects.get_or_create(
                            **company_data
                        )

                        # Company is another model so its field should be an object or id
                        mapped_row["company"] = company_instance

                    account_instance, created = AccountProfile.objects.get_or_create(
                        **mapped_row
                    )

                    phone_number = row.get("phone_number")
                    if phone_number:
                        phone_number, created = PhoneNumber.objects.get_or_create(
                            number=phone_number, profile=account_instance
                        )
                    donor_data = {
                        "donor_profile": account_instance,
                    }
                    donor, created = Donor.objects.get_or_create(**donor_data)

                return Response(
                    {"success": "Data uploaded successfully"},
                    status=status.HTTP_200_OK,
                )

        except csv.Error as e:
            return Response(
                # Handle CSV errors
                {"error": f"Error processing CSV file: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        except Exception as e:
            return Response(
                # Handle unexpected errors
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


"""
Helper functions to clean up the actual views a bit
"""


def get_or_create_company(company_name):
    company_data = {"name": company_name}
    try:
        company_instance = Company.objects.get(name__iexact=company_name)
    except Company.DoesNotExist:
        company_serializer = CompanySerializer(data=company_data)
        company_serializer.is_valid(raise_exception=True)
        return company_serializer.save()
    return company_instance


def get_or_create_lead_type(donor_type):
    try:
        lead_type_instance = LeadType.objects.get(lead_type=donor_type)
    except LeadType.DoesNotExist:
        lead_type_serializer = LeadTypeSerializer(data={"lead_type": donor_type})
        lead_type_serializer.is_valid(raise_exception=True)
        return lead_type_serializer.save()
    return lead_type_instance


def create_or_edit_donor(account_instance, donor_type, notes):
    try:
        donor_instance = Donor.objects.get(donor_profile=account_instance)
    except Donor.DoesNotExist:
        donor_serializer = DonorSerializer(
            data={
                "donor_profile": account_instance.id,
                "donor_type": donor_type,
                "notes": notes,
            }
        )
        donor_serializer.is_valid(raise_exception=True)
        return donor_serializer.save()
    else:
        donor_serializer = DonorSerializer(
            instance=donor_instance,
            data={"donor_type": donor_type, "notes": notes},
            partial=True,
        )
        donor_serializer.is_valid(raise_exception=True)
        return donor_serializer.save()


def create_or_edit_patient(account_instance, notes, hospital):
    try:
        patient_instance = HealthcarePatient.objects.get(profile=account_instance)
    except HealthcarePatient.DoesNotExist:
        patient_serializer = PatientSerializer(
            data={"profile": account_instance.id, "notes": notes, "hospital": hospital}
        )
        patient_serializer.is_valid(raise_exception=True)
        return patient_serializer.save()
    else:
        patient_serializer = PatientSerializer(
            instance=patient_instance,
            data={"notes": notes, "hospital": hospital},
            partial=True,
        )
        patient_serializer.is_valid(raise_exception=True)
        return patient_serializer.save()


def add_cause_to_patient(patient_instance, cause_title):
    try:
        cause_instance = Cause.objects.get(title=cause_title)
        patient_instance.causes.add(cause_instance)
        patient_instance.save()
    except Cause.DoesNotExist:
        # rollback db
        raise


"""
To better understand this comment, the function create_or_edit_instance used to be below it
Create or Edit factory, blessed us with this gem after I wrote the stuff above.
Probably want to incorporate some of those above. The difference is that the once below, should be selectable on the frontend, thus changable by id and not by other fields
This allows beneficiary types to change or even become a donor.
Since each beneficiary has its own model, there is no clean up when beneficiary type changes.
Good for data analytics/ big data, but could also bloat the db, really depends on if we want to hold previous type for a contact.
I believe that there will be cases where we do want that, like if a welfare campaign becomes a community dev, with the same contact, no data is overwritten.
Flow: Edit AccountProfile which has SocialWelfare Ben to Com Dev > Com Dev does not exist > Com Dev gets created
> accountProfile now points to both SocialWelfare row and Com Dev row

"""


def create_or_update_account(data, files=None):
    """add ability for partial update if id is given"""

    profile_photo = files.get("profile_photo")
    if profile_photo:
        validate_file_type(profile_photo)
    else:
        data.pop("profile_photo", None)

    if "company" in data:
        company_instance = get_or_create_company(data.pop("company"))
        data["company"] = company_instance.id

    if "donor_type" in data:
        lead_type_instance = get_or_create_lead_type(data.pop("donor_type"))
        data["donor_type"] = lead_type_instance.id

    instance_id = data.pop("id", None)
    if instance_id:
        # Attempt to fetch the existing instance
        try:
            instance = AccountProfile.objects.get(id=int(instance_id))
        except AccountProfile.DoesNotExist:
            raise ValueError("Account with provided ID does not exist.")
        # Perform a partial update
        account_serializer = AccountProfileSerializer(instance, data=data, partial=True)
    else:
        if not data.get("name"):
            data["name"] = f"{data.get('given_name', '')} {data.get('last_name', '')}"
        data["is_active"] = True
        # Create a new instance
        account_serializer = AccountProfileSerializer(data=data)
    account_serializer.is_valid(raise_exception=True)
    return account_serializer.save()


def handle_beneficiary_creation(
    account_instance, beneficiary_type, beneficiary_data, instance_id=None
):
    if beneficiary_type:
        beneficiary_model = get_model(beneficiary_type)
        beneficiary_serializer = get_serializer(beneficiary_type)
        beneficiary_data["profile"] = account_instance.id
        return create_or_edit_instance(
            beneficiary_model, beneficiary_serializer, beneficiary_data, instance_id
        )


def handle_contact_type(account_instance, contact_type, data):
    if contact_type == "donor":
        create_or_edit_donor(
            account_instance, data.get("donor_type"), data.get("notes")
        )


def handle_phone_numbers(account_instance, phone_data_json, instance_id=None):
    if phone_data_json:
        phone_data = json.loads(phone_data_json)
        phone_data["profile"] = account_instance.id
        create_or_edit_instance(
            PhoneNumber, PhoneNumberSerializer, phone_data, instance_id
        )


class addContact(APIView):
    """
    Custom View since adding contact requires the creation of multiple models
    This endpoint uses MultiParser or formurlencoded, so absence of values in data
    are treated as false. This behavior does not happen with JSON endpoints
    """

    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)

    @transaction.atomic
    def post(self, request):
        data = request.data.dict()
        data["associated_institution"] = request.user.institution.id
        # Form Data so data object is immutable
        account_instance = create_or_update_account(data, request.FILES)

        # comes after AccountProfileSerializer so that we know a valid beneficiary was selected
        handle_beneficiary_creation(
            account_instance,
            data.get("beneficiary_type"),
            json.loads(data.get("beneficiary_data", "{}")),
        )
        handle_contact_type(account_instance, data.get("contact_type"), data)
        for phone_number in request.data.getlist("phone_number"):
            handle_phone_numbers(account_instance, phone_number)

        return Response(
            AccountProfileReturnSerializer(instance=account_instance).data,
            status=status.HTTP_201_CREATED,
        )


class editContact(APIView):
    """use the same format as add contact"""

    parser_classes = (MultiPartParser, FormParser)

    @transaction.atomic
    def patch(self, request):
        data = request.data.dict()

        account_instance = create_or_update_account(data, request.FILES)
        if (
            not request.user.is_superuser
            or request.user.institution.id != account_instance.associated_institution.id
        ):
            raise PermissionDenied(detail="You cannot edit this contact")

        if "beneficiary_id" in data:
            handle_beneficiary_creation(
                account_instance,
                data.get("beneficiary_type"),
                json.loads(data.get("beneficiary_data", "{}")),
                int(data.get("beneficiary_id")),
            )
        if data.get("contact_type") == "donor":
            create_or_edit_donor(
                account_instance, data.get("donor_type"), data.get("notes")
            )
        elif data.get("contact_type") == "patient":
            create_or_edit_patient(
                account_instance, data.get("notes"), data.get("hospital")
            )
        if "phone_number" in data:
            for phone_number in json.loads(data.get("phone_number")):
                if phone_number.id:
                    handle_phone_numbers(
                        account_instance, data.get("phone_number"), phone_number.id
                    )
                else:
                    handle_phone_numbers(account_instance, data.get("phone_number"))

        return Response(
            AccountProfileReturnSerializer(instance=account_instance).data,
            status=status.HTTP_200_OK,
        )


@api_view(["PATCH"])
@permission_classes([permissions.IsAdminUser])
@authentication_classes([JWTAuthentication])
@transaction.atomic
def delete_contact(request):
    """
    Deletes a contact. Beneficiaries cascade so all is needed is to delete AccountProfile
    """
    data = request.data
    try:
        account_instance = AccountProfile.objects.get(id=data.get("id"))
        if (
            not request.user.is_superuser
            or request.user.institution.id != account_instance.associated_institution.id
        ):
            raise PermissionDenied(detail="You cannot edit this contact")
    except AccountProfile.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    except PermissionDenied:
        raise
    serializer = AccountProfileSerializer(
        instance=account_instance, partial=True, data={"is_active": False}
    )
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(
        {"message": "Contact deleted successfully."}, status=status.HTTP_200_OK
    )


class GetContacts(generics.ListAPIView):
    serializer_class = AccountProfileReturnSerializer

    def get_queryset(self):
        if not self.request.user.is_superuser:
            return AccountProfile.objects.filter(
                associated_institution=self.request.user.institution
            )
        return AccountProfile.objects.all()
