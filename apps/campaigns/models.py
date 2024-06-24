from django.db import models
from apps.contact_analytics.models import AccountProfile
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from utils.hash_photo import calculate_file_hash
from apps.users.models import Institution


User = get_user_model()


# from .cause import Cause
class Cause(models.Model):
    title = models.CharField(max_length=250, blank=True, null=True, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title if self.title else "Cause"


class MonetaryCampaign(models.Model):
    name = models.CharField(max_length=100)
    progress = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True
    )
    goal = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True)
    description = models.TextField(max_length=250, blank=True, null=True)
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField(blank=True, null=True)
    subscribers = models.ManyToManyField(
        AccountProfile, blank=True, related_name="subscribed_campaigns"
    )
    is_active = models.BooleanField(default=False)
    causes = models.ManyToManyField(Cause, blank=True, related_name="campaigns")
    # i have this as many to many cause you might have a fund that supports multiple patients or something
    created_by = models.ForeignKey(
        User, blank=True, null=True, on_delete=models.PROTECT, related_name="campaigns"
    )
    last_edited = models.DateTimeField(auto_now=True)
    last_edited_by = models.ForeignKey(
        User,
        blank=True,
        null=True,
        on_delete=models.PROTECT,
        related_name="edited_campaigns",
    )
    institution = models.ForeignKey(
        Institution, blank=True, null=True, on_delete=models.CASCADE
    )

    @property
    def beneficiaries(self):
        all_beneficiaries = []

        for key in [
            "EDUCATIONAL_INSTITUTION",
            "HEALTHCARE_INSTITUTION",
            "HEALTHCARE_PATIENT",
            "ANIMAL",
            "SOCIAL_WELFARE_PROGRAM",
            "EMERGENCY_RELIEF",
            "ENVIRONMENTAL_PROTECTION",
            "COMMUNITY_DEVELOPMENT",
            "DISABILITY_SUPPORT",
        ]:
            beneficiary_relation = getattr(self, key, None)
            if beneficiary_relation is not None:
                all_beneficiaries.extend(
                    [(key, instance) for instance in beneficiary_relation.all()]
                )
        return all_beneficiaries

    def __str__(self):
        return self.name


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/institution_<id>/campaign_photos/<filename>
    return "institution_{0}/campaign_photos/{1}".format(instance.institution, filename)


class Photo(models.Model):
    file = models.FileField(upload_to=user_directory_path)
    hash_key = models.CharField(max_length=64, blank=True, null=True)
    campaigns = models.ManyToManyField(
        MonetaryCampaign, blank=True, related_name="photos"
    )
    institution = models.UUIDField(blank=True, null=True)

    class Meta:
        unique_together = ("hash_key", "institution")


class HealthcarePatient(models.Model):
    profile = models.OneToOneField(
        AccountProfile,
        on_delete=models.CASCADE,
        default=None,
        related_name="patient_profile",
    )
    hospital = models.CharField(max_length=255, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    illness = models.CharField(max_length=255, blank=True, null=True)
    campaigns = models.ManyToManyField(
        MonetaryCampaign, blank=True, related_name="HEALTHCARE_PATIENT"
    )

    def __str__(self):
        return self.profile.name


class EducationalInstitution(models.Model):
    INSTITUTION_TYPE_CHOICES = [
        ("PRIMARY", "Primary"),
        ("SECONDARY", "Secondary"),
        ("UNIVERSITY", "University"),
        ("ORPHANAGE", "Orphanage"),
    ]
    profile = models.OneToOneField(AccountProfile, on_delete=models.CASCADE)
    institution_type = models.CharField(max_length=50, choices=INSTITUTION_TYPE_CHOICES)
    number_of_students = models.IntegerField(default=0)
    programs_offered = models.TextField(blank=True, null=True)
    accreditation_details = models.TextField(blank=True, null=True)
    campaigns = models.ManyToManyField(
        MonetaryCampaign, blank=True, related_name="EDUCATIONAL_INSTITUTION"
    )


class HealthcareInstitution(models.Model):
    INSTITUTION_TYPE_CHOICES = [
        ("HOSPITAL", "Hospital"),
        ("CLINIC", "Clinic"),
        ("HEALTH CENTER", "Health Center"),
        ("SENIOR HOMES", "Senior Homes"),
    ]
    profile = models.OneToOneField(AccountProfile, on_delete=models.CASCADE)
    institution_type = models.CharField(max_length=50, choices=INSTITUTION_TYPE_CHOICES)
    number_of_beds = models.IntegerField(default=0)
    specializations = models.TextField(blank=True, null=True)
    operating_hours = models.TextField(blank=True, null=True)
    campaigns = models.ManyToManyField(
        MonetaryCampaign, blank=True, related_name="HEALTHCARE_INSTITUTION"
    )


class Animal(models.Model):
    profile = models.OneToOneField(AccountProfile, on_delete=models.CASCADE)
    species = models.CharField(max_length=255)
    # Maybe use a choices
    health_status = models.TextField(blank=True, null=True)
    location = models.TextField(blank=True, null=True)
    special_needs = models.TextField(blank=True, null=True)
    campaigns = models.ManyToManyField(
        MonetaryCampaign, blank=True, related_name="ANIMAL"
    )


class SocialWelfareProgram(models.Model):
    PROGRAM_TYPE_CHOICES = [
        ("FOOD AID", "Food Aid"),
        ("SHELTER", "Shelter"),
        ("EDUCATION", "Education"),
    ]
    profile = models.OneToOneField(AccountProfile, on_delete=models.CASCADE)
    program_name = models.CharField(max_length=255)  # possible remove
    program_type = models.CharField(max_length=50, choices=PROGRAM_TYPE_CHOICES)
    target_population = models.TextField(blank=True, null=True)
    funding_sources = models.TextField(blank=True, null=True)
    key_activities = models.TextField(blank=True, null=True)
    impact_metrics = models.TextField(blank=True, null=True)
    campaigns = models.ManyToManyField(
        MonetaryCampaign, blank=True, related_name="SOCIAL_WELFARE_PROGRAM"
    )


class EmergencyRelief(models.Model):
    RELIEF_TYPE_CHOICES = [
        ("NATURAL DISASTER", "Natural Disaster"),
        ("CONFLICT", "Conflict"),
        ("PANDEMIC", "Pandemic"),
    ]
    profile = models.OneToOneField(AccountProfile, on_delete=models.CASCADE)
    relief_type = models.CharField(max_length=50, choices=RELIEF_TYPE_CHOICES)
    area_covered = models.TextField(blank=True, null=True)
    contact_organization = models.TextField(blank=True, null=True)  # possible remove
    number_of_beneficiaries = models.IntegerField(default=0)
    key_services_provided = models.TextField(blank=True, null=True)
    campaigns = models.ManyToManyField(
        MonetaryCampaign, blank=True, related_name="EMERGENCY_RELIEF"
    )


class EnvironmentalProtection(models.Model):
    CONSERVATION_TYPE_CHOICES = [
        ("REFORESTATION", "Reforestation"),
        ("WEILDLIFE PROTECTION", "Wildlife Protection"),
    ]
    profile = models.OneToOneField(AccountProfile, on_delete=models.CASCADE)
    organization_name = models.CharField(max_length=255)  # possible remove
    project_name = models.CharField(max_length=255)  # possible remove
    location = models.TextField(blank=True, null=True)
    conservation_type = models.CharField(
        max_length=50, choices=CONSERVATION_TYPE_CHOICES
    )
    impact_metrics = models.TextField(blank=True, null=True)
    funding_sources = models.TextField(blank=True, null=True)
    campaigns = models.ManyToManyField(
        MonetaryCampaign, blank=True, related_name="ENVIRONMENTAL_PROTECTION"
    )


class CommunityDevelopment(models.Model):
    profile = models.OneToOneField(AccountProfile, on_delete=models.CASCADE)
    project_name = models.CharField(max_length=255)  # possible remove
    community_name = models.CharField(max_length=255)
    location = models.TextField(blank=True, null=True)
    key_objectives = models.TextField(blank=True, null=True)
    impact_metrics = models.TextField(blank=True, null=True)
    funding_sources = models.TextField(blank=True, null=True)
    campaigns = models.ManyToManyField(
        MonetaryCampaign, blank=True, related_name="COMMUNITY_DEVELOPMENT"
    )


class DisabilitySupport(models.Model):
    SUPPORT_TYPE_CHOICES = [
        ("FINANCIAL AID", "Financial Aid"),
        ("EQUIPMENT", "Equipment"),
        ("TRAINING", "Training"),
    ]
    profile = models.OneToOneField(AccountProfile, on_delete=models.CASCADE)
    support_type = models.CharField(max_length=50, choices=SUPPORT_TYPE_CHOICES)
    organization_name = models.CharField(max_length=255)  # possible remove
    number_of_beneficiaries = models.IntegerField(default=0)
    key_services_provided = models.TextField(blank=True, null=True)
    funding_sources = models.TextField(blank=True, null=True)
    campaigns = models.ManyToManyField(
        MonetaryCampaign, blank=True, related_name="DISABILITY_SUPPORT"
    )
