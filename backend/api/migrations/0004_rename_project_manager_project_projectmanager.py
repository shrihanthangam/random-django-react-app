# Generated by Django 5.0.4 on 2024-04-19 16:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_projectmanager_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='project',
            old_name='project_manager',
            new_name='projectmanager',
        ),
    ]
