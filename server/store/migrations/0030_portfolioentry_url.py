# Generated by Django 5.1.2 on 2024-12-02 19:22

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0029_portfolioentry_picture_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='portfolioentry',
            name='url',
            field=models.URLField(blank=True, max_length=300, validators=[django.core.validators.URLValidator()], verbose_name='URL'),
        ),
    ]
