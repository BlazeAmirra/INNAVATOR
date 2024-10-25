# Generated by Django 5.1.2 on 2024-10-25 19:39

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0012_alter_innavatoruser_snowflake_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='innavatoruser',
            name='profile_picture_url',
            field=models.URLField(blank=True, max_length=300, validators=[django.core.validators.URLValidator()], verbose_name='Profile Picture URL'),
        ),
    ]
