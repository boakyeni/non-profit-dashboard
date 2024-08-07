# Generated by Django 5.0 on 2024-06-19 19:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("campaigns", "0023_rename_upload_photo_file"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="monetarycampaign",
            name="photos",
        ),
        migrations.AddField(
            model_name="photo",
            name="campaigns",
            field=models.ManyToManyField(
                blank=True, related_name="photos", to="campaigns.monetarycampaign"
            ),
        ),
        migrations.AddField(
            model_name="photo",
            name="hash_key",
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
        migrations.AddField(
            model_name="photo",
            name="institution_id",
            field=models.UUIDField(blank=True, null=True),
        ),
        migrations.AlterUniqueTogether(
            name="photo",
            unique_together={("hash_key", "institution_id")},
        ),
    ]
