from django.db import migrations
from clue_game_api.weapon.models import Weapon
from dataclasses import dataclass


@dataclass
class ClueGameWeapon:
    name: str


clue_game_weapons = [
    ClueGameWeapon("Candlestick"),
    ClueGameWeapon("Dagger"),
    ClueGameWeapon("Revolver"),
    ClueGameWeapon("Lead Pipe"),
    ClueGameWeapon("Wrench"),
    ClueGameWeapon("Rope"),
]


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("weapon", "0001_initial"),
    ]

    def default_records_insert(apps, schema_editor):
        for weapon in clue_game_weapons:
            weapon_model = Weapon(
                name=weapon.name,
            )
            weapon_model.save()

    operations = [
        migrations.RunPython(default_records_insert),
    ]
