from django.db import (
    models,
)


class Room(models.Model):
    room_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)
    passage_to_room = models.ForeignKey(
        "Room",
        on_delete=models.DO_NOTHING,
        null=True,
        help_text="The identifier of the room this room has a secret passage to.",
        db_constraint=True,
    )

    class Meta:
        db_table = "room"

    def __str__(
        self,
    ):
        return f"Room<(room_id={self.room_id}, name={self.name}, passage_to_room={self.passage_to_room})>"
