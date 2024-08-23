import uuid
import string
import random

from django.db import models


def create_random_join_code():
    randString = "".join(random.choice(string.ascii_uppercase + string.digits) for _ in range(20))
    return randString


def create_random_external_game_id():
    uuidToUse = uuid.uuid4()
    return uuidToUse


def create_random_join_code():
    randString = "".join(random.choice(string.ascii_uppercase + string.digits) for _ in range(20))
    return randString


def create_random_external_game_id():
    uuidToUse = uuid.uuid4()
    return uuidToUse

class Game(models.Model):
    game_id = models.AutoField(primary_key=True)
    external_game_id = models.UUIDField(
        default=uuid.uuid4,
        editable=False,
        unique=True,
    )
    join_code = models.CharField(default=create_random_join_code, editable=False, unique=True, max_length=20)
    solution_weapon = models.ForeignKey("weapon.Weapon", on_delete=models.CASCADE, null=True)
    solution_room = models.ForeignKey("room.Room", on_delete=models.CASCADE, null=True)
    solution_character = models.ForeignKey("characters.Character", on_delete=models.CASCADE, null=True)
    session_id = models.UUIDField(null=True, default=None)
    is_started = models.BooleanField(default=False, editable=True)

    class Meta:
        db_table = "game"

    def __str__(self):
        return f"Game<(game_id={self.game_id}, id={self.external_game_id}, join_code={self.join_code}, solution_weapon_id={self.solution_weapon_id}, solution_room_id={self.solution_room_id}, solution_character_id={self.solution_character_id}, session_id={self.session_id}, is_started={self.is_started})"
