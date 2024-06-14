# Generated by Django 5.0 on 2024-06-05 17:05

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0006_alter_user_options_and_more"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="user",
            options={"verbose_name": "user", "verbose_name_plural": "users"},
        ),
        migrations.RenameField(
            model_name="user",
            old_name="is_bsystems_user",
            new_name="bsystems_user",
        ),
        migrations.RenameField(
            model_name="user",
            old_name="is_institution_admin",
            new_name="institution_admin",
        ),
        migrations.RemoveField(
            model_name="user",
            name="is_instituition_user",
        ),
    ]