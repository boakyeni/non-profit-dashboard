# Generated by Django 5.0.6 on 2024-07-29 09:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0014_remove_user_bsystems_user_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='institution_admin',
            field=models.BooleanField(blank=True, db_default=False, null=True, verbose_name='Is Institution Admin'),
        ),
    ]