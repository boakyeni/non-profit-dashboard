# Generated by Django 5.0 on 2024-03-29 01:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("donor_management", "0005_alter_donor_amount_donated"),
    ]

    operations = [
        migrations.RenameField(
            model_name="leadacquisition",
            old_name="Donor",
            new_name="donor",
        ),
        migrations.RenameField(
            model_name="leadtype",
            old_name="Donor",
            new_name="donor",
        ),
    ]
