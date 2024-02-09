from django.contrib import admin
from .models import AccountProfile, PhoneNumber, Company

# Register your models here.
admin.register(
  AccountProfile,
  PhoneNumber,
  Company,
)