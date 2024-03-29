# Generated by Django 5.0 on 2024-01-30 16:41

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("schedule", "0014_use_autofields_for_pk"),
    ]

    operations = [
        migrations.CreateModel(
            name="AdditionalEventInfo",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "event",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="additional_info",
                        to="schedule.event",
                    ),
                ),
            ],
        ),
    ]
