import csv

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.db import transaction
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from .models import AccountProfile, PhoneNumber, Company
from apps.donor_management.models import Donor
from .serializers import (
    AccountProfileSerializer,
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
