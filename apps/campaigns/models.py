from django.db import models
from apps.donor_management.models import Donor
# from .cause import Cause


class MonetaryCampaign(models.Model):
    name = models.CharField(max_length=100)
    progress = models.DecimalField(max_digits=10, decimal_places=2)
    goal = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(max_length=250)
    # campaign_cause = models.ManyToManyField(Cause)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return self.name


class Donation(models.Model):
    donor = models.ForeignKey(Donor, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    campaign_type = models.ManyToManyField(MonetaryCampaign)
    currency = models.CharField(max_length=100)
    date = models.DateField()

    def __str__(self):
        return f"{self.donor.name} - {self.amount}"


class Patient(models.Model):
    name = models.CharField(max_length=100)
    hospital = models.CharField(max_length=100)
    description = models.TextField(max_length=250)
    illness = models.CharField(max_length=100)
    # cause = models.ManyToManyField(Cause)

    def __str__(self):
        return self.name


class Cause(models.Model):
    patients_name = models.ManyToManyField("Patient")
    description = models.TextField(max_length=250)
    campaign_type = models.ManyToManyField("MonetaryCampaign")

    def __str__(self):
        return self.description
