from django.db import models
from django.db.models import fields, Count
from datetime import date, datetime, timedelta
from schedule.models import Event
from apps.contact_analytics.models import AccountProfile
from apps.campaigns.models import MonetaryCampaign
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
        return self.lead_type


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
        total = self.donations.all().aggregate(
            total_donated=models.Sum("transaction__amount")
        )["total_donated"]

        return total if total is not None else 0.0


class Transaction(models.Model):
    # General fields applicable to all transactions
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=100, default="GHC")
    date = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True, null=True)

    # Type to distinguish between incoming (e.g., donation) and outgoing (e.g., expense) funds
    TRANSACTION_TYPE_CHOICES = (
        ("IN", "Incoming"),
        ("OUT", "Outgoing"),
    )
    transaction_type = models.CharField(max_length=3, choices=TRANSACTION_TYPE_CHOICES)

    def __str__(self):
        return f"{self.transaction_type} - {self.amount} {self.currency} on {self.date}"


class Donation(models.Model):
    donor = models.ForeignKey(
        Donor, on_delete=models.CASCADE, default=None, related_name="donations"
    )
    transaction = models.OneToOneField(
        Transaction, on_delete=models.CASCADE, related_name="donation"
    )
    campaign = models.ManyToManyField(MonetaryCampaign, blank=True)

    def __str__(self):
        return f"Donation by {self.donor.name} - {self.transaction.amount}"


# change patient to account profile
class Expense(models.Model):
    patient = models.ForeignKey(
        AccountProfile,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="expenses",
    )
    transaction = models.OneToOneField(
        Transaction, on_delete=models.CASCADE, related_name="expense"
    )
    campaign = models.ManyToManyField(MonetaryCampaign, blank=True)

    def __str__(self):
        return f"Donation by {self.donor.name} - {self.transaction.amount}"
