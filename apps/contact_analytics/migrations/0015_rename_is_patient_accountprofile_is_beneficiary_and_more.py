# Generated by Django 5.0 on 2024-06-14 18:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contact_analytics", "0014_alter_accountprofile_benficiary"),
        ("users", "0008_institution_user_institution"),
    ]

    operations = [
        migrations.RenameField(
            model_name="accountprofile",
            old_name="is_patient",
            new_name="is_beneficiary",
        ),
        migrations.AddField(
            model_name="accountprofile",
            name="associated_institutions",
            field=models.ManyToManyField(
                blank=True, related_name="contacts", to="users.institution"
            ),
        ),
    ]
