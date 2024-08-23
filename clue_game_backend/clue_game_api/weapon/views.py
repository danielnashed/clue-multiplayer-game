from clue_game_api.weapon.models import Weapon
from clue_game_api.weapon.serializers import WeaponSerializer
from rest_framework import generics


class WeaponList(generics.ListCreateAPIView):
    queryset = Weapon.objects.all()
    serializer_class = WeaponSerializer
