# Generated by Django 5.1.2 on 2024-11-04 16:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0018_remove_palette_gradient1_remove_palette_gradient2_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='innavatoruser',
            name='major',
            field=models.CharField(default='Computer Science', max_length=100, verbose_name='Major'),
        ),
    ]