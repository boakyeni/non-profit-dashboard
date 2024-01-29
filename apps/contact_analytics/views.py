from django.shortcuts import render

from rest_framework import viewsets

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
