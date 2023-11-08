# Generated by Django 4.2.5 on 2023-11-08 05:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0009_userprofile_phone_number"),
    ]

    operations = [
        migrations.RemoveField(model_name="driver", name="firstName",),
        migrations.RemoveField(model_name="driver", name="lastName",),
        migrations.AddField(
            model_name="userprofile",
            name="profile_picture_url",
            field=models.URLField(blank=True, max_length=255, null=True),
        ),
    ]