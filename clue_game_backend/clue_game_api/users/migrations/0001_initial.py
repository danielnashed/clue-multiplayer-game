# Generated by Django 3.2.23 on 2023-11-13 00:58

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('characters', '0003_fix_character_name_spelling'),
        ('room', '0002_characters_init'),
        ('game', '0002_auto_20231109_0353'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('session_id', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('hallway', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='hallways.hallways')),
                ('is_turn', models.BooleanField(default=False)),
                ('character', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='characters.character')),
                ('game', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='game.game')),
                ('owner', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='owned_users', to='game.game')),
                ('room', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='room.room')),
            ],
            options={
                'db_table': 'users',
            },
        ),
    ]
