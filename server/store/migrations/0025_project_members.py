# Generated by Django 5.1.2 on 2024-11-11 15:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0024_alter_portfolioentry_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='members',
            field=models.ManyToManyField(through='store.ProjectRole', to='store.innavatoruser'),
        ),
    ]
