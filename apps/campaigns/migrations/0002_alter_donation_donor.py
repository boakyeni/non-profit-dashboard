# Generated by Django 5.0 on 2024-01-25 13:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("campaigns", "0001_initial"),
        ("donor_management", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="donation",
            name="donor",
            field=models.ForeignKey(
                default=None,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="donations",
                to="donor_management.donor",
            ),
        ),
    ]