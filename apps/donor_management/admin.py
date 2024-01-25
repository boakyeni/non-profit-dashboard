from django.contrib import admin
from .models import Donor, LeadType, LeadAcquisition

# Register your models here.


admin.register(
    Donor,
    LeadType,
    LeadAcquisition,
)
