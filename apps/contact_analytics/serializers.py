from rest_framework import serializers
from .models import AccountProfile, Company, PhoneNumber


class AccountProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountProfile
        fields = "__all__"

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"

class PhoneNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhoneNumber
        fields = "__all__"


