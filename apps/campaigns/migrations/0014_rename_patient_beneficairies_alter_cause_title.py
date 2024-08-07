# Generated by Django 5.0 on 2024-05-15 16:15

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("campaigns", "0013_alter_monetarycampaign_goal_delete_donation"),
        ("contact_analytics", "0013_rename_role_accountprofile_benficiary"),
        ("donor_management", "0010_alter_transaction_date"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="Patient",
            new_name="Beneficairies",
        ),
        migrations.AlterField(
            model_name="cause",
            name="title",
            field=models.CharField(blank=True, max_length=250, null=True, unique=True),
        ),
    ]
