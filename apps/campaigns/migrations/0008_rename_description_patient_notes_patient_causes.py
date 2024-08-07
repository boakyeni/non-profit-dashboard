# Generated by Django 5.0 on 2024-03-28 22:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("campaigns", "0007_remove_cause_campaign_type_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="patient",
            old_name="description",
            new_name="notes",
        ),
        migrations.AddField(
            model_name="patient",
            name="causes",
            field=models.ManyToManyField(
                blank=True, related_name="patients", to="campaigns.cause"
            ),
        ),
    ]
