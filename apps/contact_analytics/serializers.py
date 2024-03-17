from rest_framework import serializers
from .models import AccountProfile, Company, PhoneNumber


class AccountProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountProfile
        fields = "__all__"


class AccountProfileReturnSerializer(serializers.ModelSerializer):
    phone_number = serializers.SerializerMethodField()
    contact_type = serializers.SerializerMethodField()

    class Meta:
        model = AccountProfile
        fields = "__all__"

    def get_phone_number(self, obj):
        return str(obj.phone_number.number)

    def get_contact_type(self, obj):
        if obj.donor_profile:
            return "donor"
        elif obj.patient_profile:
            return "patient"
        else:
            return "unknown"


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"


class PhoneNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhoneNumber
        fields = "__all__"
