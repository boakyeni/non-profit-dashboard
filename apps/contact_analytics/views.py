import csv

from rest_framework import viewsets, status
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.db import transaction

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
    parser_classes = [FileUploadParser]

    def post(self, request, *args, **kwargs):
        # Get CSV file from the request
        csv_file = request.FILES.get("file")

        # check if the file is provided
        if not csv_file:
            return Response({"error": "No file provided"}), status.HTTP_400_BAD_REQUEST
        # Check if the file has a ".csv" extension
        if not csv_file.lower().endswith(".csv"):
            return Response(
                {"error": "Invalid file format. Please upload a CSV file"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            with transaction.atomic():
                reader = csv.DictReader(csv_file.read().decode("utf-8").splitlines())
                account_profiles = []

                # Create objects without relationships
                for row in reader:
                    phone_number_id = row.get("phone_number_id")
                    if phone_number_id:
                        # Retrieve or create phone number
                        phone_number, created = PhoneNumber.objects.get_or_create(
                            id=phone_number_id
                        )
                        serializer = AccountProfileSerializer(data=row)

                        # validate data using accountprofileserializer
                        if serializer.is_valid():
                            # save the accountprofile instance to handle relationships
                            account_instance = serializer.save()
                            phone_number.profile = account_instance
                            phone_number.save()

                            company_id = row.get("company_id")
                            if company_id:
                                company, created = Company.objects.get_or_create(
                                    id=company_id
                                )
                                account_instance.company = company
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
