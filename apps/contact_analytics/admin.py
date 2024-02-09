from django.contrib import admin
from .models import AccountProfile, PhoneNumber, Company

# Register your models here.
admin.site.register(AccountProfile)

admin.site.register(PhoneNumber)

admin.site.register(Company)
