# Generated by Django 5.1.2 on 2024-12-06 15:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0031_portfolioentry_subject'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProjectSubject',
            fields=[
                ('snowflake_id', models.BigIntegerField(primary_key=True, serialize=False, unique=True, verbose_name='Snowflake ID')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store.project')),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store.subject')),
            ],
        ),
        migrations.AddField(
            model_name='project',
            name='subjects',
            field=models.ManyToManyField(through='store.ProjectSubject', to='store.subject'),
        ),
    ]
