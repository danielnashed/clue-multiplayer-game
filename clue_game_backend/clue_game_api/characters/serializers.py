# clue_game_backend/clue_game_api/serializers.py

from rest_framework import serializers
from .models import Character

class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = '__all__'  # You can specify specific fields if needed