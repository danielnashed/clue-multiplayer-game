from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from clue_game_api.characters.models import Character
from clue_game_api.users.models import User
from clue_game_api.users.serializers import UserSerializer
from clue_game_api.users.views import set_next_turn
from .models import Game
import itertools
import json
import random

# from clue_game_api.users.models import User
from .serializers import GameSerializer
from clue_game_api.weapon.models import Weapon
from clue_game_api.room.models import Room
from clue_game_api.hallways.models import Hallways
from clue_game_api.weapon.serializers import WeaponSerializer
from clue_game_api.characters.serializers import CharacterSerializer
from clue_game_api.room.serializers import RoomSerializer


def set_character_starting_locations(userList):
    for user in userList:
        hallway = get_object_or_404(Hallways, name=user.character.starting_coordinate)
        user.hallway = hallway
        user.save()

def is_valid_suggestion(room, userRoom):
    if(room != userRoom):
        return False
    else:
        return True

class GameView(APIView):
    def post(self, request):
        game = Game()
        # TODO implement below to enable logic of creating user at creation of game
        user = User()
        user.game = game
        game.save()
        user.save()
        game.session_id = user.session_id
        game.external_game_id = game.session_id
        game.solution_weapon = Weapon.objects.order_by("?").first()
        game.solution_room = Room.objects.order_by("?").first()
        game.solution_character = Character.objects.order_by("?").first()
        game.save()
        serializer = GameSerializer(game)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request, game_id):
        game = get_object_or_404(Game, external_game_id=game_id)
        serializer = GameSerializer(game)

        users = User.objects.filter(game=game)
        user_serializer = UserSerializer(users, many=True)

        response_data = {
            'game': serializer.data,
            'users': user_serializer.data
        }
        return Response(response_data)

    def delete(self, request, game_id):
        game = get_object_or_404(Game, external_game_id=game_id)
        game.delete()
        return Response(status=204)


class WhosTurnIsItView(APIView):
    def get(self, request, game_id):
        game = get_object_or_404(Game, external_game_id=game_id)
        user = User.objects.filter(game_id=game.game_id).filter(is_turn=True).first()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=200)


class StartGameView(APIView):
    def post(self, request, game_id):
        thisGame = get_object_or_404(Game, external_game_id=game_id)
        gamesId = thisGame.game_id

        total_users = User.objects.filter(game_id=gamesId)
        if total_users.count() < 2:
            return Response({"error": "Must have more than 1 player in lobby to start the game"})

        if any(user.character_id is None for user in total_users):
            return Response({"error": "Some users have not yet chosen a character, cannot start game"}, status=400)

        set_character_starting_locations(total_users)

        weapons = Weapon.objects.all()
        rooms = Room.objects.all()
        characters = Character.objects.all()

        all_objects = list(weapons) + list(rooms) + list(characters)

        if thisGame.solution_weapon is not None and thisGame.solution_room is not None and thisGame.solution_character is not None:
            all_objects.remove(thisGame.solution_weapon)
            all_objects.remove(thisGame.solution_room)
            all_objects.remove(thisGame.solution_character)

        cycled_users = itertools.cycle(total_users)

        for obj in all_objects:
            current_user = next(cycled_users)
            if isinstance(obj, Weapon):
                serializer = WeaponSerializer(obj)
                data = current_user.cards['weapon']
                data.append(serializer.data)
                current_user.cards['weapon'] = data
            elif isinstance(obj, Room):
                serializer = RoomSerializer(obj)
                data = current_user.cards['room']
                data.append(serializer.data)
                current_user.cards['room'] = data
            elif isinstance(obj, Character):
                serializer = CharacterSerializer(obj)
                data = current_user.cards['character']
                data.append(serializer.data)
                current_user.cards['character'] = data
            current_user.save()

        thisGame.is_started = True
        # TODO: Right now some user is randomly selected to go first
        user = User.objects.filter(game_id=thisGame.game_id,).order_by('character_id').first()
        if user is not None:
            user.is_turn = True
        thisGame.save()
        user.save()
        serializer = GameSerializer(thisGame)
        return Response(serializer.data, status=200)

class AccusationGameView(APIView):
    def post(self, request, game_id):
        thisGame = get_object_or_404(Game, external_game_id=game_id)
        if thisGame.is_started==False:
            return Response({"error": "Game not yet started"}, status=-400)
        game_id = thisGame.game_id

        if  request.body:
            data = json.loads(request.body.decode("utf-8"))
            if "character_id" and "room_id" and "weapon_id" and "session_id" in data:
                character_id = data.get("character_id", None)
                room_id = data.get("room_id", None)
                weapon_id = data.get("weapon_id", None)
                session_id = data.get("session_id", None)
                user = User.objects.get(session_id=session_id, game_id=game_id)
                room = Room.objects.get(room_id=room_id)
                if user.is_turn==False:
                    return Response({"error": "not your turn"}, status=400)
                if not is_valid_suggestion(room, user.room):
                    return Response({"error": "user not in room they are making suggestion about"}, status=400)
                userList = User.objects.filter(game=thisGame)
                if not User.objects.filter(game_id=game_id).exists():
                    return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
                if thisGame.solution_character.character_id==character_id and thisGame.solution_room.room_id==room_id and thisGame.solution_weapon.weapon_id==weapon_id:
                    thisGame.is_started = False
                    return Response({"Congratulations! You have won the game"}, status=200)
                else:
                    incorrect_objects = []

                    if thisGame.solution_character.character_id != character_id:
                        incorrect_objects.append(("character_id", character_id))

                    if thisGame.solution_room.room_id != room_id:
                        incorrect_objects.append(("room_id", room_id))

                    if thisGame.solution_weapon.weapon_id != weapon_id:
                        incorrect_objects.append(("weapon_id", weapon_id))

                    # Choose a random incorrect object
                    if incorrect_objects:
                        chosen_incorrect_object_type, chosen_incorrect_object_id = random.choice(incorrect_objects)
                    else:
                        chosen_incorrect_object_type, chosen_incorrect_object_id = None, None

                    print(user.session_id)
                    for userd in userList:
                        print(userd.session_id)
                    # Choose a random incorrect object
                    user.is_turn=False
                    user.save()
                    set_next_turn(user, userList)
                    return Response({
                        chosen_incorrect_object_type: chosen_incorrect_object_id
                    }, status=status.HTTP_200_OK)
            else:
                return Response({"error":"Invalid request, doesn't contain room, character and weapon"}, status=400)


class SuggestionGameView(APIView):
    def post(self, request, game_id):
        thisGame = get_object_or_404(Game, external_game_id=game_id)
        if thisGame.is_started==False:
            return Response({"error": "Game not yet started"}, status=-400)
        game_id = thisGame.game_id

        if  request.body:
            data = json.loads(request.body.decode("utf-8"))
            if "character_id" and "room_id" and "weapon_id" and "session_id" in data:
                character_id = data.get("character_id", None)
                room_id = data.get("room_id", None)
                weapon_id = data.get("weapon_id", None)
                session_id = data.get("session_id", None)
                user = User.objects.get(session_id=session_id, game_id=game_id)
                room = Room.objects.get(room_id=room_id)
                userSuggested = User.objects.get(game_id=thisGame.game_id, character_id=character_id)
                if user.is_turn==False:
                    return Response({"error": "not your turn"}, status=400)
                if not is_valid_suggestion(room, user.room):
                    return Response({"error": "user not in room they are making suggestion about"}, status=400)
                userList = User.objects.filter(game=thisGame)

                if not User.objects.filter(game_id=game_id).exists():
                    return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
                if thisGame.solution_character.character_id==character_id and thisGame.solution_room.room_id==room_id and thisGame.solution_weapon.weapon_id==weapon_id:
                    userSuggested.room = room
                    if userSuggested.hallway is not None:
                        userSuggested.hallway = None
                    userSuggested.save()
                    user.is_turn=False
                    user.save()
                    set_next_turn(user, userList)
                    return Response(status=200)
                else:
                    userSuggested.room = room
                    userSuggested.save()
                    incorrect_objects = []

                    if thisGame.solution_character.character_id != character_id:
                        incorrect_objects.append(("character_id", character_id))

                    if thisGame.solution_room.room_id != room_id:
                        incorrect_objects.append(("room_id", room_id))

                    if thisGame.solution_weapon.weapon_id != weapon_id:
                        incorrect_objects.append(("weapon_id", weapon_id))

                    # Choose a random incorrect object
                    if incorrect_objects:
                        chosen_incorrect_object_type, chosen_incorrect_object_id = random.choice(incorrect_objects)
                    else:
                        chosen_incorrect_object_type, chosen_incorrect_object_id = None, None

                    print(user.session_id)
                    for userd in userList:
                        print(userd.session_id)
                    # Choose a random incorrect object
                    user.is_turn=False
                    user.save()
                    set_next_turn(user, userList)
                    return Response({
                        chosen_incorrect_object_type: chosen_incorrect_object_id
                    }, status=status.HTTP_200_OK)
            else:
                return Response({"error":"Invalid request, doesn't contain room, character and weapon"}, status=400)