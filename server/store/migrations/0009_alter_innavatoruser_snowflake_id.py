# Generated by Django 5.1.2 on 2024-10-25 19:10

import snowflake.snowflake
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0008_innavatoruser_palette'),
    ]

    operations = [
        migrations.AlterField(
            model_name='innavatoruser',
            name='snowflake_id',
            field=models.BigIntegerField(default=snowflake.snowflake.SnowflakeGenerator.__next__, primary_key=True, serialize=False, unique=True, verbose_name='Snowflake ID'),
        ),
    ]
