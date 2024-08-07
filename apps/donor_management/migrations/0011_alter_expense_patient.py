# Generated by Django 5.0 on 2024-06-19 00:24

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contact_analytics", "0017_accountprofile_website_phonenumber_name_and_more"),
        ("donor_management", "0010_alter_transaction_date"),
    ]

    operations = [
        migrations.AlterField(
            model_name="expense",
            name="patient",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="expenses",
                to="contact_analytics.accountprofile",
            ),
        ),
    ]
