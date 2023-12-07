from django.db import models
from donor_management.models import Donor


# class DonorType(models.TextChoices):
#     INDIVIDUAL = "Individual", "Individual"
#     INSTITUTION = "Institution", "Institution"


# class Donor(models.Model):
#     name = models.CharField(max_length=100)
#     donor_type = models.CharField(max_length=100, choices=DonorType.choices)
#     amount_donated = models.DecimalField(max_digits=10, decimal_places=2)
#     institution = models.CharField(max_length=100, blank=True)
#     email = models.EmailField(max_length=100)
#     address = models.CharField(max_length=100)
#     country = models.CharField(max_length=100)
#     notes = models.TextField(max_length=250, verbose_name="Notes")

#     def __str__(self):
#         return self.name


class Cause(models.Model):
    MonetaryCampaign = models.ManyToManyField(MonetaryCampaign)
    description = models.TextField(max_length=250)
    Patient = models.ManyToManyField(Patient)

    def __str__(self):
        return self.description


class MonetaryCampaign(models.Model):
    name = models.CharField(max_length=100)
    progress = models.DecimalField(max_digits=10, decimal_places=2)
    goal = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(max_length=250)
    cause = models.ManyToManyField(Cause)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return self.name


class Donation(models.Model):
    donor = models.ForeignKey(Donor, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    campaign = models.ManyToManyField(MonetaryCampaign)
    currency = models.CharField(max_length=100)
    date = models.DateField()

    def __str__(self):
        return f"{self.donor.name} - {self.amount}"


class Patient(models.Model):
    name = models.CharField(max_length=100)
    hospital = models.CharField(max_length=100)
    description = models.TextField(max_length=250)
    illness = models.CharField(max_length=100)
    cause = models.ManyToManyField(Cause)

    def __str__(self):
        return self.name
