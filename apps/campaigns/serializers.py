from rest_framework import serializers
from .models import Donor, Cause, MonetaryCampaign, Donation, Patient

class CampaignDonorSerializer(serializers.ModelSerializer):
  class Meta:
    model = Donor
    fields = "__all__"

class CauseSerializer(serializers.ModelSerializer):
  class Meta:
    model = Cause
    fields = "__all__"

class MonetaryCampaignSerializer(serializers.ModelSerializer):
  class Meta:
    model = MonetaryCampaign
    fields = "__all__"

class DonationSerializer(serializers.ModelSerializer):
  class Meta:
    model = Donation
    fields = "__all__"

class PatientSerializer(serializers.ModelSerializer):
  class Meta:
    model = Patient
    fields = "__all__"