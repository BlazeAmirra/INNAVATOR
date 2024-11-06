# Generated by Django 5.1.2 on 2024-11-06 15:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0020_rename_mentors_innavatoruser_mentees'),
    ]

    operations = [
        migrations.AddField(
            model_name='mentorship',
            name='mentee_accepted',
            field=models.BooleanField(default=False, verbose_name='Mentee Accepted'),
        ),
        migrations.AddField(
            model_name='mentorship',
            name='mentor_accepted',
            field=models.BooleanField(default=False, verbose_name='Mentor Accepted'),
        ),
    ]