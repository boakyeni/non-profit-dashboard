from rest_framework import serializers
from .models import AccountProfile, Company, PhoneNumber
from django.core.exceptions import ObjectDoesNotExist


class AccountProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountProfile
        fields = "__all__"


class PhoneNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhoneNumber
        fields = "__all__"


class AccountProfileReturnSerializer(serializers.ModelSerializer):
    phone_number = serializers.SerializerMethodField()
    contact_type = serializers.SerializerMethodField()
    causes = serializers.SerializerMethodField()
    notes = serializers.SerializerMethodField()
    company = serializers.SerializerMethodField()
    donor_type = serializers.SerializerMethodField()
    amount_donated = serializers.SerializerMethodField()
    hospital = serializers.SerializerMethodField()

    class Meta:
        model = AccountProfile
        fields = "__all__"

    def get_phone_number(self, obj):
        return [
            PhoneNumberSerializer(instance=phone_number).data
            for phone_number in obj.phone_number.all()
        ]

    def get_contact_type(self, obj):
        if obj.beneficiary_type:
            return "beneficiary"
        else:
            return "donor"

    def get_causes(self, obj):
        # try:
        #     if obj.beneficiary_type and obj.patient_profile:
        #         return [cause.title for cause in obj.patient_profile.causes.all()]
        # except ObjectDoesNotExist:
        #     return []
        return

    def get_notes(self, obj):
        try:
            if not obj.beneficiary_type and obj.donor_profile:
                return obj.donor_profile.notes
        except ObjectDoesNotExist:
            # Catching the exception if donor_profile does not exist
            pass

        try:
            if obj.beneficiary_type and obj.patient_profile:
                return obj.patient_profile.notes
        except ObjectDoesNotExist:
            # Catching the exception if patient_profile does not exist
            pass

        # Return an empty string if neither profile exists
        return ""

    def get_company(self, obj):
        # Since the foreign key is defined in AccountProfile i.e. obj is on the many side, this works
        return str(obj.company.name) if obj.company else None

    def get_hospital(self, obj):
        # Check if the patient_profile exists before trying to access its attributes
        if hasattr(obj, "patient_profile") and obj.beneficiary_type:
            return obj.patient_profile.hospital
        else:
            return None

    def get_donor_type(self, obj):
        return (
            obj.donor_profile.donor_type.lead_type
            if hasattr(obj, "donor_profile")
            and obj.donor_profile.donor_type
            and not obj.beneficiary_type
            else None
        )

    def get_amount_donated(self, obj):
        return (
            obj.donor_profile.amount_donated
            if hasattr(obj, "donor_profile") and not obj.beneficiary_type
            else None
        )


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"
