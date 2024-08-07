# Generated by Django 5.0 on 2024-06-19 19:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("campaigns", "0024_remove_monetarycampaign_photos_photo_campaigns_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="photo",
            old_name="institution_id",
            new_name="institution",
        ),
        migrations.AlterUniqueTogether(
            name="photo",
            unique_together={("hash_key", "institution")},
        ),
    ]
