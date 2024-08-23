from django.db import models


class Character(models.Model):
    character_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=50)
    image_resource = models.URLField()
    move_priority = models.PositiveIntegerField()
    starting_coordinate = models.CharField(max_length=100)

    class Meta:
        db_table = "characters"

    def __str__(self):
        return f"Character<(character_id={self.character_id}, name={self.name}, color={self.color}, image_resource={self.image_resource}, move_priority={self.move_priority}, starting_coordinate={self.starting_coordinate})>"
