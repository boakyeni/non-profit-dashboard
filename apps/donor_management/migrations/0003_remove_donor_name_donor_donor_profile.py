# Generated by Django 5.0 on 2024-02-01 11:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contact_analytics", "0002_accountprofile_company_phonenumber_delete_contact"),
        ("donor_management", "0002_donor_attended_events"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="donor",
            name="name",
        ),
        migrations.AddField(
            model_name="donor",
            name="donor_profile",
            field=models.ForeignKey(
                default=None,
                on_delete=django.db.models.deletion.CASCADE,
                to="contact_analytics.accountprofile",
            ),
        ),
    ]
