# clue_game_backend/clue_game_api/serializers.py

from rest_framework import serializers
from clue_game_api.game.serializers import GameSerializer
from clue_game_api.users.models import User


class UserSerializer(serializers.ModelSerializer):
    game_id = serializers.ReadOnlyField(source="game.external_game_id")

    class Meta:
        model = User
        fields = ["session_id", "game_id", "character", "is_turn", "room", "hallway", "cards"]
