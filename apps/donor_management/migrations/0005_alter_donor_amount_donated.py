# Generated by Django 5.0 on 2024-03-20 19:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("donor_management", "0004_remove_donor_address_remove_donor_country_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="donor",
            name="amount_donated",
            field=models.DecimalField(decimal_places=2, default="0.00", max_digits=10),
        ),
    ]
