# clue_game_backend/clue_game_api/serializers.py

from rest_framework import serializers
from clue_game_api.characters.serializers import CharacterSerializer
from .models import Game
from clue_game_api.weapon.serializers import WeaponSerializer
from clue_game_api.room.serializers import RoomSerializer


class GameSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source="external_game_id")
    solution = serializers.SerializerMethodField()

    class Meta:
        model = Game
        fields = [
            "id",
            "session_id",
            "join_code",
            "is_started",
            "solution",
        ]  # You can specify specific fields if needed

    def get_solution(self, game):
        room = RoomSerializer(game.solution_room, context=self.context).data
        weapon = WeaponSerializer(game.solution_weapon, context=self.context).data
        character = CharacterSerializer(game.solution_character, context=self.context).data
        return [room, weapon, character]
