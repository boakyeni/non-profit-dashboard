# Generated by Django 5.0 on 2024-06-19 20:38

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("campaigns", "0025_rename_institution_id_photo_institution_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="monetarycampaign",
            name="start_date",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
