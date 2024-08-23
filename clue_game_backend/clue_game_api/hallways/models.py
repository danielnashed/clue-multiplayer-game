from django.contrib.postgres.fields import ArrayField

from django.db import models


class Hallways(models.Model):
    hallway_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)
    connecting_rooms = models.JSONField()

    class Meta:
        db_table = "hallways"

    def __str__(
        self,
    ):
        return f"Room<(hallway_id={self.hallway_id}, name={self.name}, connecting_rooms={self.connecting_rooms})>"
