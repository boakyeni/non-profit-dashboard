import csv
from utils.photo_validation import validate_file_type
from rest_framework import viewsets, status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.serializers import ValidationError
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from .models import AccountProfile, PhoneNumber, Company
from apps.donor_management.models import Donor, LeadType
from apps.donor_management.serializers import DonorSerializer, LeadTypeSerializer
from apps.campaigns.models import (
    Animal,
    Cause,
    Beneficairies,
    EducationalInstitution,
    HealthcareInstitution,
    SocialWelfareProgram,
)
from apps.campaigns.serializers import (
    AnimalSerializer,
    EducationalInstitutionSerializer,
    HealthcareInstitutionSerializer,
    PatientSerializer,
    SocialWelfareProgramSerializer,
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
        patient_instance = Beneficairies.objects.get(profile=account_instance)
    except Beneficairies.DoesNotExist:
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


def add_or_edit_phone_number(profile, number, phone_id=None):
    if phone_id:
        try:
            phone_instance = PhoneNumber.objects.get(id=phone_id, profile=profile)
            phone_serializer = PhoneNumberSerializer(
                instance=phone_instance, data={"number": number}, partial=True
            )
        except PhoneNumber.DoesNotExist:
            # If the ID is provided but does not exist, you can raise an error or simply create a new phone number.
            raise
    else:
        # If no ID is provided, attempt to update or create based on the number and profile
        phone_serializer = PhoneNumberSerializer(
            data={"number": number, "profile": profile},
        )

    phone_serializer.is_valid(raise_exception=True)
    return phone_serializer.save()


"""
Create or Edit factory, blessed us with this gem after I wrote the stuff above.
Probably want to incorporate those above into the below code if i have the time.
This allows beneficiary types to change or even become a donor.
Since each beneficiary has its own model, there is no clean up when beneficiary type changes.
Good for data analytics/ big data, but could also bloat the db, really depends on if we want to hold previous type for a contact.
I believe that there will be cases where we do want that, like if a welfare campaign becomes a community dev, with the same contact, no data is overwritten.
Flow: Edit AccountProfile which has SocialWelfare Ben to Com Dev > Com Dev does not exist > Com Dev gets created
> accountProfile now points to both SocialWelfare row and Com Dev row
"""


def create_or_edit_instance(model_class, serializer_class, data, instance_id=None):
    try:
        instance = model_class.objects.get(pk=instance_id)
    except ObjectDoesNotExist:
        # create new
        serializer = serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        return serializer.save()
    except ValidationError:
        raise
    except Exception:
        raise
    else:
        # edit
        serializer = serializer_class(instance=instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        return serializer.save()


def create_or_edit_educational_institution(data, instance_id=None):
    return create_or_edit_instance(
        EducationalInstitution, EducationalInstitutionSerializer, data, instance_id
    )


def create_or_edit_healthcare_institution(data, instance_id=None):
    return create_or_edit_instance(
        HealthcareInstitution, HealthcareInstitutionSerializer, data, instance_id
    )


def create_or_edit_animal(data, instance_id=None):
    return create_or_edit_instance(Animal, AnimalSerializer, data, instance_id)


def create_or_edit_social_welfare_program(data, instance_id=None):
    return create_or_edit_instance(
        SocialWelfareProgram, SocialWelfareProgramSerializer, data, instance_id
    )


# Add similar functions for other models...


class addContact(APIView):
    """
    Custom View since adding contact requires the creation of multiple models
    """

    parser_classes = (MultiPartParser, FormParser)

    @transaction.atomic
    def post(self, request):
        data = request.data.copy()
        # Form Data so data object is immutable
        data["name"] = f"{data.get('given_name', '')} {data.get('last_name', '')}"

        profile_photo = request.FILES.get("profile_photo")
        if profile_photo:
            validate_file_type(profile_photo)

        if "company" in data:
            company_instance = get_or_create_company(data.pop("company"))
            data["company"] = company_instance.id

        if "donor_type" in data:
            lead_type_instance = get_or_create_lead_type(data.pop("donor_type"))
            data["donor_type"] = lead_type_instance.id

        data["is_active"] = True
        """
        This line is required because this endpoint uses MultiParser or formurlencoded, so absence of values in data
        are treated as false. This behavior does not happen with JSON endpoints
        """

        account_serializer = AccountProfileSerializer(data=data)
        account_serializer.is_valid(raise_exception=True)
        account_instance = account_serializer.save()

        if data.get("contact_type") == "donor":
            create_or_edit_donor(
                account_instance, data.get("donor_type"), data.get("notes")
            )
        elif data.get("contact_type") == "patient":
            patient_instance = create_or_edit_patient(
                account_instance, data.get("notes"), data.get("hospital")
            )
            if "cause" in data:
                add_cause_to_patient(patient_instance, data["cause"])

        if "phone_number" in data:
            add_or_edit_phone_number(account_instance, data["phone_number"])
        return Response(
            AccountProfileReturnSerializer(instance=account_instance).data,
            status=status.HTTP_201_CREATED,
        )


class editContact(APIView):
    parser_classes = (MultiPartParser, FormParser)

    @transaction.atomic
    def patch(self, request):
        data = request.data.copy()

        name = data.get("given_name") + " " + data.get("last_name")
        data["name"] = name

        profile_photo = request.FILES.get("profile_photo")

        if profile_photo:
            # Handle the file upload. For example, saving the file to a model associated with the contact.
            validate_file_type(profile_photo)
        else:
            data.pop("profile_photo", None)

        if "company" in data:
            company_instance = get_or_create_company(data.pop("company"))
            data["company"] = company_instance.id

        if "donor_type" in data:
            lead_type_instance = get_or_create_lead_type(data.pop("donor_type"))
            data["donor_type"] = lead_type_instance.id

        account_instance = AccountProfile.objects.get(id=data["id"])
        account_serializer = AccountProfileSerializer(
            instance=account_instance, data=data, partial=True
        )
        account_serializer.is_valid(raise_exception=True)
        account_instance = account_serializer.save()
        if data.get("contact_type") == "donor":
            create_or_edit_donor(
                account_instance, data.get("donor_type"), data.get("notes")
            )
        elif data.get("contact_type") == "patient":
            patient_instance = create_or_edit_patient(
                account_instance, data.get("notes"), data.get("hospital")
            )
            if "cause" in data:
                add_cause_to_patient(patient_instance, data["cause"])

        if "phone_number" in data:
            add_or_edit_phone_number(
                account_instance, data["phone_number"], data.get("phone_id")
            )

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
    except AccountProfile.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
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
        return AccountProfile.objects.all()
