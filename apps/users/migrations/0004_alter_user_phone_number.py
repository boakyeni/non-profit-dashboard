# Generated by Django 5.0 on 2024-03-20 19:29

import phonenumber_field.modelfields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0003_remove_user_calendars"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="phone_number",
            field=phonenumber_field.modelfields.PhoneNumberField(
                blank=True,
                max_length=30,
                null=True,
                region=None,
                verbose_name="Phone Number",
            ),
        ),
    ]
