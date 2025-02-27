# Generated by Django 3.2.23 on 2023-11-13 03:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Hallways',
            fields=[
                ('hallway_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50, unique=True)),
                ('connecting_rooms', models.JSONField()),
            ],
            options={
                'db_table': 'hallways',
            },
        ),
    ]
