# Generated by Django 5.0 on 2024-02-08 01:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0002_user_calendars"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="calendars",
        ),
    ]
