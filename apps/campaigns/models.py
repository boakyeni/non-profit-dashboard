from django.db import models
from apps.donor_management.models import Donor
from apps.contact_analytics.models import AccountProfile
from datetime import date

# from .cause import Cause


class MonetaryCampaign(models.Model):
    name = models.CharField(max_length=100)
    progress = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True
    )
    goal = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    description = models.TextField(max_length=250, blank=True, null=True)
    start_date = models.DateField(default=date.today)
    end_date = models.DateField(blank=True, null=True)
    subscribers = models.ManyToManyField(AccountProfile, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Donation(models.Model):
    donor = models.ForeignKey(
        Donor, on_delete=models.CASCADE, default=None, related_name="Donations"
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    campaign_type = models.ManyToManyField(MonetaryCampaign)
    currency = models.CharField(max_length=100)
    date = models.DateField(auto_now=True)

    def __str__(self):
        return f"{self.donor.name} - {self.amount}"


class Patient(models.Model):
    profile = models.OneToOneField(
        AccountProfile,
        on_delete=models.CASCADE,
        default=None,
        related_name="patient_profile",
    )
    hospital = models.CharField(max_length=100)
    description = models.TextField(max_length=250)
    illness = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Cause(models.Model):
    patients_name = models.ManyToManyField("Patient")
    description = models.TextField(max_length=250)
    campaign_type = models.ManyToManyField("MonetaryCampaign")

    def __str__(self):
        return self.description
