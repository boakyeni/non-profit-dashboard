from django.core.exceptions import ObjectDoesNotExist
from rest_framework.serializers import ValidationError
from apps.campaigns.models import (
    EducationalInstitution,
    HealthcareInstitution,
    Animal,
    SocialWelfareProgram,
    EmergencyRelief,
    EnvironmentalProtection,
    CommunityDevelopment,
    DisabilitySupport,
    HealthcarePatient,
)
from apps.campaigns.serializers import (
    EducationalInstitutionSerializer,
    HealthcareInstitutionSerializer,
    AnimalSerializer,
    SocialWelfareProgramSerializer,
    PatientSerializer,
    DisabilitySupportSerializer,
)


# Define your text choices to model and serializer mappings
model_mapping = {
    "EDUCATIONAL_INSTITUTION": (
        EducationalInstitution,
        EducationalInstitutionSerializer,
    ),
    "HEALTHCARE_INSTITUTION": (HealthcareInstitution, HealthcareInstitutionSerializer),
    "HEALTHCARE_PATIENT": (HealthcarePatient, PatientSerializer),
    "ANIMAL": (Animal, AnimalSerializer),
    "SOCIAL_WELFARE_PROGRAM": (SocialWelfareProgram, SocialWelfareProgramSerializer),
    "EMERGENCY_RELIEF": (EmergencyRelief, EmergencyRelief),
    "ENVIRONMENTAL_PROTECTION": (EnvironmentalProtection, EnvironmentalProtection),
    "COMMUNITY_DEVELOPMENT": (CommunityDevelopment, CommunityDevelopment),
    "DISABILITY_SUPPORT": (DisabilitySupport, DisabilitySupportSerializer),
}


def get_model(choice):
    try:
        return model_mapping[choice][0]
    except KeyError:
        raise


def get_serializer(choice):
    try:
        return model_mapping[choice][1]
    except KeyError:
        raise


def create_or_edit_instance(model_class, serializer_class, data, instance_id=None):
    try:
        instance = model_class.objects.get(pk=instance_id)
    except ObjectDoesNotExist:
        # create new
        serializer = serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        return serializer.save()
    except ValidationError:
        raise
    except Exception:
        raise
    else:
        # edit
        serializer = serializer_class(instance=instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        return serializer.save()
