# Generated by Django 5.0 on 2024-05-15 15:52

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("contact_analytics", "0012_alter_accountprofile_role"),
    ]

    operations = [
        migrations.RenameField(
            model_name="accountprofile",
            old_name="role",
            new_name="benficiary",
        ),
    ]
