from django.contrib import admin
from .models import Beneficairies, MonetaryCampaign, Cause

# Register your models here.
admin.site.register(MonetaryCampaign)
admin.site.register(Beneficairies)
admin.site.register(Cause)
