from rest_framework import serializers
from .models import AccountProfile, Company, PhoneNumber, Role


class CompanySerializer(serializers.ModelSerializer):
    organization = serializers.CharField(source="name")

    class Meta:
        model = Company
        fields = "__all__"


class AccountProfileSerializer(serializers.ModelSerializer):
    organizations = serializers.StringRelatedField(many=True)

    class Meta:
        model = AccountProfile
        fields = "__all__"


class PhoneNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhoneNumber
        fields = "__all__"
