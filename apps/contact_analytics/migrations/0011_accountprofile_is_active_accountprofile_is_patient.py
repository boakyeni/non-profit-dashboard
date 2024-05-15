# Generated by Django 5.0 on 2024-03-30 21:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contact_analytics", "0010_accountprofile_profile_photo"),
    ]

    operations = [
        migrations.AddField(
            model_name="accountprofile",
            name="is_active",
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name="accountprofile",
            name="is_patient",
            field=models.BooleanField(default=False),
        ),
    ]