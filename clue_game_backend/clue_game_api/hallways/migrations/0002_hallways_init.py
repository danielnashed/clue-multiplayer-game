# Generated by Django 3.2.22 on 2023-10-21 18:30

from django.db import migrations
from clue_game_api.hallways.models import Hallways
from dataclasses import dataclass


@dataclass
class ClueGameHallway:
    name: str
    connecting_rooms: list


clue_game_hallways = [
    ClueGameHallway("Study-Hall-Hallway", connecting_rooms=['Study', 'Hall']),
    ClueGameHallway("Hall-Lounge-Hallway", connecting_rooms=['Hall', 'Lounge']),
    ClueGameHallway("Study-Library-Hallway", connecting_rooms=['Study', 'Library']),
    ClueGameHallway("Hall-BilliardRoom-Hallway", connecting_rooms=['Hall', 'Billiard Room']),
    ClueGameHallway("Lounge-DiningRoom-Hallway", connecting_rooms=['Lounge', 'Dining Room']),
    ClueGameHallway("Library-BilliardRoom-Hallway", connecting_rooms=['Library', 'Billiard Room']),
    ClueGameHallway("BilliardRoom-DiningRoom-Hallway", connecting_rooms=['Billiard Room', 'Dining Room']),
    ClueGameHallway("Library-Conservatory-Hallway", connecting_rooms=['Library', 'Conservatory']),
    ClueGameHallway("BilliardRoom-BallRoom-Hallway", connecting_rooms=['Billiard Room', 'Ballroom']),
    ClueGameHallway("DiningRoom-Kitchen-Hallway", connecting_rooms=['Dining Room', 'Kitchen']),
    ClueGameHallway("Conservatory-BallRoom-Hallway", connecting_rooms=['Conservatory', 'Ballroom']),
    ClueGameHallway("BallRoom-Kitchen-Hallway", connecting_rooms=['Ballroom', 'Kitchen']),
]


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("hallways", "0001_initial"),
    ]

    def default_records_insert(apps, schema_editor):
        # Stores the room id of the newly created room record
        # Allows us to reference the id of rooms to create the secret
        # passage self reference
        self_hallway_id = {}
        for hallway in clue_game_hallways:
            hallway_model = Hallways(name=hallway.name, connecting_rooms=hallway.connecting_rooms)
            hallway_model.save()

    operations = [
        migrations.RunPython(default_records_insert),
    ]
