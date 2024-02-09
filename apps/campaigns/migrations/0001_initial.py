# Generated by Django 5.0 on 2024-02-08 10:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("contact_analytics", "0001_initial"),
        ("donor_management", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="MonetaryCampaign",
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
                ("name", models.CharField(max_length=100)),
                ("progress", models.DecimalField(decimal_places=2, max_digits=10)),
                ("goal", models.DecimalField(decimal_places=2, max_digits=10)),
                ("description", models.TextField(max_length=250)),
                ("start_date", models.DateField()),
                ("end_date", models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name="Donation",
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
                ("amount", models.DecimalField(decimal_places=2, max_digits=10)),
                ("currency", models.CharField(max_length=100)),
                ("date", models.DateField(auto_now=True)),
                (
                    "donor",
                    models.ForeignKey(
                        default=None,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="Donations",
                        to="donor_management.donor",
                    ),
                ),
                (
                    "campaign_type",
                    models.ManyToManyField(to="campaigns.monetarycampaign"),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Patient",
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
                ("hospital", models.CharField(max_length=100)),
                ("description", models.TextField(max_length=250)),
                ("illness", models.CharField(max_length=100)),
                (
                    "name",
                    models.ForeignKey(
                        default=None,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="contact_analytics.accountprofile",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Cause",
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
                ("description", models.TextField(max_length=250)),
                (
                    "campaign_type",
                    models.ManyToManyField(to="campaigns.monetarycampaign"),
                ),
                ("patients_name", models.ManyToManyField(to="campaigns.patient")),
            ],
        ),
    ]
