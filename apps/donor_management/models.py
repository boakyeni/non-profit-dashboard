from django.db import models
from django.db.models import fields, Count
from datetime import date, datetime, timedelta
from schedule.models import Event
from apps.contact_analytics.models import AccountProfile


class DonorType(models.TextChoices):
    INDIVIDUAL = "Individual", "Individual"
    INSTITUTION = "Institution", "Institution"


# Create your models here.
class Donor(models.Model):
    donor_profile = models.OneToOneField(
        AccountProfile,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="donor_profile",
    )
    donor_type = models.CharField(
        max_length=100, choices=DonorType.choices, default=DonorType.INDIVIDUAL
    )
    amount_donated = models.DecimalField(
        max_digits=10, decimal_places=2, default="0.00"
    )
    notes = models.TextField(max_length=250, verbose_name="Notes")
    attended_events = models.ManyToManyField(Event, blank=True)

    def __str__(self):
        return self.name

    @property
    def total_amount_donated(self):
        return sum([float(donation) for donation in self.donations])


class LeadType(models.Model):
    Donor = models.ForeignKey(Donor, on_delete=models.CASCADE, default=None)
    type = models.CharField(max_length=100, verbose_name="Lead Type")

    def __str__(self):
        return self.type


class LeadAcquisition(models.Model):
    Donor = models.ForeignKey(Donor, on_delete=models.CASCADE, default=None)
    acquisition = models.CharField(max_length=100, verbose_name="Lead Acquisition")

    def __str__(self):
        return self.acquisition
