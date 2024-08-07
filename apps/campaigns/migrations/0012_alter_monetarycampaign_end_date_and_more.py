# Generated by Django 5.0 on 2024-04-04 01:30

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("campaigns", "0011_remove_donation_campaign_type_donation_campaign_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="monetarycampaign",
            name="end_date",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="monetarycampaign",
            name="start_date",
            field=models.DateTimeField(default=datetime.date.today),
        ),
    ]
