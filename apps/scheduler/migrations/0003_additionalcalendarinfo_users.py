# Generated by Django 5.0 on 2024-02-08 01:18

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("scheduler", "0002_additionalcalendarinfo"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name="additionalcalendarinfo",
            name="users",
            field=models.ManyToManyField(
                blank=True, related_name="calendar", to=settings.AUTH_USER_MODEL
            ),
        ),
    ]