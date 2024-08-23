from django.db import models
import uuid


def cards_dict():
    return {'character': [], 'room': [], 'weapon': []}


# Create your models here.
class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    session_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    game = models.ForeignKey("game.Game", on_delete=models.CASCADE, default=None)
    character = models.ForeignKey("characters.Character", on_delete=models.CASCADE, default=None, null=True)
    room = models.ForeignKey("room.Room", on_delete=models.CASCADE, null=True)
    hallway = models.ForeignKey("hallways.Hallways", on_delete=models.CASCADE, null=True)
    owner = models.ForeignKey(
        "game.Game", on_delete=models.CASCADE, related_name="owned_users", default=None, null=True
    )
    cards = models.JSONField(default=cards_dict)
    is_turn = models.BooleanField(default=False)

    class Meta:
        db_table = "users"

    def __str__(self):
        return f"User<(user_id={self.user_id}, session_id={self.session_id}, game={self.game}, character={self.character}, room={self.room}, hallway={self.hallway}, is_turn={self.is_turn})"
