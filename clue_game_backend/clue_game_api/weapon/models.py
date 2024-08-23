from django.db import (
    models,
)


class Weapon(models.Model):
    weapon_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)
    image_resource = models.URLField()

    class Meta:
        db_table = "weapon"

    def __str__(
        self,
    ):
        return f"Weapon<(weapon_id={self.weapon_id}, name={self.name}, image_resource={self.image_resource})>"
