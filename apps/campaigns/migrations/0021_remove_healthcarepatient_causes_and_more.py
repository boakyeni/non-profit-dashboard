# Generated by Django 5.0 on 2024-06-19 04:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("campaigns", "0020_alter_disabilitysupport_support_type_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="healthcarepatient",
            name="causes",
        ),
        migrations.AddField(
            model_name="monetarycampaign",
            name="causes",
            field=models.ManyToManyField(
                blank=True, related_name="campaigns", to="campaigns.cause"
            ),
        ),
    ]
