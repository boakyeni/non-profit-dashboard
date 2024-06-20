# Generated by Django 5.0 on 2024-06-20 02:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("campaigns", "0027_remove_monetarycampaign_beneficiaries"),
    ]

    operations = [
        migrations.AddField(
            model_name="healthcarepatient",
            name="campaigns",
            field=models.ManyToManyField(
                blank=True,
                related_name="HEALTHCARE_PATIENT",
                to="campaigns.monetarycampaign",
            ),
        ),
    ]
