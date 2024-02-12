import csv

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.db import transaction
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser

from apps.donor_management.models import Donor
from .models import AccountProfile, PhoneNumber, Company
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


"""
Csv export for account profile:
"""


class CSVUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    # parser_classes = [FileUploadParser]

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
                account_profiles = []

                # Create objects without relationships
                for row in reader:

                    mapped_row = {
                        "name": row.get("name"),
                        "given_name": row.get("given_name"),
                        "last_name": row.get("last_names"),
                        "email": row.get("email"),
                        "phone_number": row.get("phone_number"),
                    }
                    serializer = AccountProfileSerializer(data=mapped_row)
                    if serializer.is_valid:
                        account_instance, created = (
                            AccountProfile.objects.get_or_create(**mapped_row)
                        )
                        account_profiles.append(account_instance)

                    phone_number = row.get(phone_number)
                    if phone_number:
                        phone_number, created = PhoneNumber.objects.get_or_create(
                            number=phone_number
                        )

                        account_instance.phone_number = phone_number
                        account_instance.save()
                        account_instance.phone_number.add(phone_number)

                        organization = "organization"
                        company = row.get(organization)
                        if company:
                            company, created = Company.objects.get_or_create(
                                name=company
                            )
                            account_instance.company = company
                            account_instance.save()

                    donor = row.get("donor")
                    if account_instance:
                        donor, created = Donor.objects.get_or_create(id=donor)
                        account_instance = serializer.save()
                        account_instance.donor = donor
                        account_instance.save()

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
