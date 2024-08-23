from rest_framework import serializers
from clue_game_api.weapon.models import Weapon


class WeaponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weapon
        fields = "__all__"  # You can specify specific fields if needed
