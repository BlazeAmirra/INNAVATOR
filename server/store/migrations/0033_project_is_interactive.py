# Generated by Django 5.1.2 on 2024-12-09 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0032_projectsubject_project_subjects'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='is_interactive',
            field=models.BooleanField(default=False, verbose_name='Is Interactive'),
        ),
    ]