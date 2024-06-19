from rest_framework import serializers
from .models import (
    Cause,
    MonetaryCampaign,
    HealthcarePatient,
    EducationalInstitution,
    HealthcareInstitution,
    Animal,
    SocialWelfareProgram,
    EmergencyRelief,
    EnvironmentalProtection,
    CommunityDevelopment,
    DisabilitySupport,
)


class CauseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cause
        fields = "__all__"


class MonetaryCampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonetaryCampaign
        fields = "__all__"


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthcarePatient
        fields = "__all__"


class EducationalInstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationalInstitution
        fields = "__all__"


class HealthcareInstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthcareInstitution
        fields = "__all__"


class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = "__all__"


class SocialWelfareProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialWelfareProgram
        fields = "__all__"


class EmergencyReliefSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyRelief
        fields = "__all__"


class EnvironmentalProtectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnvironmentalProtection
        fields = "__all__"


class CommunityDevelopmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityDevelopment
        fields = "__all__"


class DisabilitySupportSerializer(serializers.ModelSerializer):
    class Meta:
        model = DisabilitySupport
        fields = "__all__"
