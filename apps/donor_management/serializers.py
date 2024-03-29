from rest_framework import serializers
from .models import Donor, LeadType


class DonorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donor
        fields = "__all__"


class LeadTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadType
        fields = "__all__"
