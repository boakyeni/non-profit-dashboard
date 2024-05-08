# Generated by Django 5.0 on 2024-03-01 16:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contact_analytics", "0003_rename_company_phonenumber_company"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="phonenumber",
            name="company",
        ),
        migrations.AddField(
            model_name="accountprofile",
            name="company",
            field=models.ForeignKey(
                default=None,
                on_delete=django.db.models.deletion.CASCADE,
                to="contact_analytics.company",
            ),
        ),
        migrations.AlterField(
            model_name="company",
            name="address",
            field=models.CharField(
                blank=True, max_length=100, null=True, verbose_name="Company Address"
            ),
        ),
        migrations.AlterField(
            model_name="company",
            name="district",
            field=models.CharField(
                blank=True, max_length=100, null=True, verbose_name="Company District"
            ),
        ),
        migrations.AlterField(
            model_name="company",
            name="region",
            field=models.CharField(
                blank=True, max_length=100, null=True, verbose_name="Company Region"
            ),
        ),
    ]
