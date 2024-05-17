from rest_framework import serializers
from .models import Cause, MonetaryCampaign, Beneficairies


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
        model = Beneficairies
        fields = "__all__"
