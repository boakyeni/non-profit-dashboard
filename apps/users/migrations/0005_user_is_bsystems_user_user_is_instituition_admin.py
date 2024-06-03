# Generated by Django 5.0 on 2024-06-03 12:46

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0004_alter_user_phone_number"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="is_bsystems_user",
            field=models.BooleanField(default=False, verbose_name="Is Bsystems User"),
        ),
        migrations.AddField(
            model_name="user",
            name="is_instituition_admin",
            field=models.BooleanField(
                default=False, verbose_name="Is Institution Admin"
            ),
        ),
    ]
