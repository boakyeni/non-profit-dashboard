import csv
import magic
from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.db import transaction
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from .models import AccountProfile, PhoneNumber, Company
from apps.donor_management.models import Donor, LeadType
from apps.donor_management.serializers import DonorSerializer, LeadTypeSerializer
from apps.campaigns.models import Cause
from apps.campaigns.serializers import PatientSerializer
from .serializers import (
    AccountProfileSerializer,
    AccountProfileReturnSerializer,
    PhoneNumberSerializer,
    CompanySerializer,
)
from django.core.exceptions import ValidationError


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


# Function to make sure file is safe
def validate_file_type(uploaded_file):
    ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "application/pdf"]
    mime_type = magic.from_buffer(uploaded_file.read(1024), mime=True)
    uploaded_file.seek(0)  # Reset file pointer after reading
    if mime_type not in ALLOWED_MIME_TYPES:
        raise ValidationError("Unsupported file type.")


class addContact(APIView):
    """
    Custom View since adding contact requires the creation of multiple models
    """

    parser_classes = (MultiPartParser, FormParser)

    @transaction.atomic
    def post(self, request):
        data = (
            request.data.copy()
        )  # THIS IS IMPORTANT, SINCE IT IS FORM DATA THE DATA OBJECT IS IMMUTABLE
        name = data.get("given_name") + " " + data.get("last_name")
        data["name"] = name

        profile_photo = request.FILES.get("profile_photo")
        if profile_photo:
            # Handle the file upload. For example, saving the file to a model associated with the contact.
            validate_file_type(profile_photo)
        # Add company relation to AccountProfile model
        if data.get("company"):
            company_name = data["company"]
            company_data = {"name": company_name}
            try:
                company_instance = Company.objects.get(name__iexact=company_name)
            except Company.DoesNotExist:
                company_serializer = CompanySerializer(data=company_data)
                company_serializer.is_valid(raise_exception=True)
                company_instance = company_serializer.save()
            data["company"] = company_instance.id

        # add lead type relation to Donor model
        donor_type = data.get("donor_type")
        if donor_type:
            try:
                lead_type_instance = LeadType.objects.get(lead_type=donor_type)
            except LeadType.DoesNotExist:
                lead_type_serializer = LeadTypeSerializer(
                    data={"lead_type": donor_type}
                )
                lead_type_serializer.is_valid(raise_exception=True)
                lead_type_instance = lead_type_serializer.save()

            data["donor_type"] = lead_type_instance.id

        account_serializer = AccountProfileSerializer(data=data)

        account_serializer.is_valid(raise_exception=True)

        account_instance = account_serializer.save()
        patient_instance = None
        donor_instance = None
        if data.get("contact_type"):
            if data["contact_type"].lower() == "donor":
                type_data = {
                    "donor_profile": account_instance.id,
                    "donor_type": data.get("donor_type"),
                    "notes": data.get("notes"),
                }
                donor_serializer = DonorSerializer(data=type_data)
                donor_serializer.is_valid(raise_exception=True)
                donor_instance = donor_serializer.save()
            elif data["contact_type"].lower() == "patient":
                type_data = {
                    "profile": account_instance.id,
                    "notes": data.get("notes"),
                    "hospital": data.get("hospital"),
                }
                patient_serializer = PatientSerializer(data=type_data)
                patient_serializer.is_valid(raise_exception=True)
                patient_instance = patient_serializer.save()

        if patient_instance and data.get("cause"):
            try:
                cause_instance = Cause.objects.get(title=data.get("cause"))
                patient_instance.causes.add(cause_instance)
                patient_instance.save()
            except Cause.DoesNotExist:
                return Response(
                    "Cause does not exist, error creating patient",
                    status=status.HTTP_404_NOT_FOUND,
                )
        # Add phone_number relation to AccountProfile model
        if data.get("phone_number"):
            phone_data = {
                "number": data["phone_number"],
                "profile": account_instance.id,
            }
            phone_serializer = PhoneNumberSerializer(data=phone_data)
            phone_serializer.is_valid(raise_exception=True)
            phone_serializer.save()

        return Response(
            AccountProfileReturnSerializer(instance=account_instance).data,
            status=status.HTTP_201_CREATED,
        )


class GetContacts(generics.ListAPIView):
    serializer_class = AccountProfileReturnSerializer

    def get_queryset(self):
        return AccountProfile.objects.all()
