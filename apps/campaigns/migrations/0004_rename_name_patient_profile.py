# Generated by Django 5.0 on 2024-02-09 15:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("campaigns", "0003_alter_donation_donor_alter_patient_name"),
    ]

    operations = [
        migrations.RenameField(
            model_name="patient",
            old_name="name",
            new_name="profile",
        ),
    ]
