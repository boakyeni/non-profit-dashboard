# Generated by Django 5.0 on 2024-03-20 19:25

import datetime
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("campaigns", "0005_alter_patient_profile"),
        ("contact_analytics", "0007_alter_phonenumber_profile"),
    ]

    operations = [
        migrations.AddField(
            model_name="monetarycampaign",
            name="is_active",
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name="monetarycampaign",
            name="subscribers",
            field=models.ManyToManyField(
                blank=True, to="contact_analytics.accountprofile"
            ),
        ),
        migrations.AlterField(
            model_name="monetarycampaign",
            name="description",
            field=models.TextField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name="monetarycampaign",
            name="end_date",
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="monetarycampaign",
            name="goal",
            field=models.DecimalField(
                blank=True, decimal_places=2, max_digits=10, null=True
            ),
        ),
        migrations.AlterField(
            model_name="monetarycampaign",
            name="progress",
            field=models.DecimalField(
                blank=True, decimal_places=2, max_digits=10, null=True
            ),
        ),
        migrations.AlterField(
            model_name="monetarycampaign",
            name="start_date",
            field=models.DateField(default=datetime.date.today),
        ),
        migrations.AlterField(
            model_name="patient",
            name="profile",
            field=models.OneToOneField(
                default=None,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="patient_profile",
                to="contact_analytics.accountprofile",
            ),
        ),
    ]
