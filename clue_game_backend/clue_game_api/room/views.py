from clue_game_api.room.models import Room
from clue_game_api.room.serializers import RoomSerializer
from rest_framework import generics


class RoomList(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
