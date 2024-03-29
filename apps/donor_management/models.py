from django.db import models
from django.db.models import fields, Count
from datetime import date, datetime, timedelta
from schedule.models import Event
from apps.contact_analytics.models import AccountProfile
from django.utils.translation import gettext_lazy as _


class DonorType(models.TextChoices):
    BROAD_BASE = "broad_base_donor", "Broad Base Donor"
    MID_RANGE = "mid_range_donor", "Mid Range Donor"
    MAJOR = "major_donor", "Major Donor"


class LeadType(models.Model):
    lead_type = models.CharField(
        max_length=100,
        choices=DonorType.choices,
        default=DonorType.BROAD_BASE,
        verbose_name="Lead Type",
    )

    def __str__(self):
        return self.type


# Create your models here.
class Donor(models.Model):
    donor_profile = models.OneToOneField(
        AccountProfile,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="donor_profile",
    )
    amount_donated = models.DecimalField(
        max_digits=10, decimal_places=2, default="0.00"
    )
    notes = models.TextField(
        max_length=500, verbose_name="Notes", blank=True, null=True
    )
    attended_events = models.ManyToManyField(Event, blank=True)
    donor_type = models.ForeignKey(
        LeadType, blank=True, null=True, on_delete=models.PROTECT
    )

    def __str__(self):
        return self.donor_profile.name

    @property
    def total_amount_donated(self):
        return sum([float(donation) for donation in self.donations])
