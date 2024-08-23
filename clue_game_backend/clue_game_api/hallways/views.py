from clue_game_api.hallways.models import Hallway
from clue_game_api.hallways.serializers import HallwaySerializer
from rest_framework import generics


class HallwayList(generics.ListCreateAPIView):
    queryset = Hallway.objects.all()
    serializer_class = HallwaySerializer
