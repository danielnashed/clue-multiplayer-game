from django.shortcuts import render
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.views.generic import View
from .models import User
from clue_game_api.game.models import Game
from clue_game_api.characters.models import Character
from clue_game_api.room.models import Room
from clue_game_api.hallways.models import Hallways
from .serializers import UserSerializer
from django.contrib.sessions.models import Session
import json
import uuid

def validate_character_id(game_id, character_id):
    # Validate character_id range
    if character_id < 1 or character_id > 6:
        return "character_id is out of range"
    # Check if the character_id is already taken by another user in the same game
    if User.objects.filter(game_id=game_id, character_id=character_id).exists():
        return "character_id is already taken by another user in this game."
    # If both conditions pass, return None to indicate a valid character_id
    return None

def set_next_turn(current_user, user_list):

    sorted_users = sorted(user_list, key=lambda x: x.character_id)

    current_index = sorted_users.index(current_user)

    next_index = (current_index + 1) % len(sorted_users)

    next_user = sorted_users[next_index]

    next_user.is_turn = True
    next_user.save()


# Create your views here.
class UserView(APIView):
    # POST method to create user if game exists (use the join_code for the game)
    def post(self, request):
        if request.body is not None:
            data = json.loads(request.body.decode("utf-8"))
            if "join_code" in data:
                join_code = data.get("join_code", None)
                if join_code is not None:
                    # create a user object
                    user = User()
                    # create a unique session id and assign to user
                    session_id = uuid.uuid4()
                    user.session_id = session_id
                    # get game tied to user by join_code and add user to game
                    game = get_object_or_404(Game, join_code=join_code)  # Get the user by ID
                    userList = User.objects.filter(game=game)
                    if len(userList) >= 6:
                        return Response({"error": "Game is full, can't add more users"}, status=400)
                    game.save()
                    user.game = game
                    user.save()
                    serializer = UserSerializer(user)
                    return Response(serializer.data, status=200)
                else:
                    return Response({"error": "join_code not found in the request body"}, status=400)
        else:
            return Response({"error": "request body is empty"}, status=400)

    # PUT method to select a character for a user
    def put(self, request, session_id, character_id):
        # Should update isTurn and then create method to determine/update next user's turn
        # Also we should update the users location on game start (in game logic)
        if request.body:
            data = json.loads(request.body.decode("utf-8"))
            if "hallway_id" in data:
                hallway_id = data.get("hallway_id", None)
                hallway = get_object_or_404(Hallways, hallway_id=hallway_id)
                user = get_object_or_404(User, session_id=session_id)
                # case of user being in a room and moving to an adjacent hallway
                if user.is_turn:
                    userList = User.objects.filter(game_id=user.game)
                    if any(user.hallway == hallway for user in userList):
                        return Response({"error": "Cannot move into an occupied hallway"}, status=400)
                    userRoom = get_object_or_404(Room, room_id=user.room.room_id)
                    if user.room is not None and userRoom.name in hallway.connecting_rooms:
                        user.room = None
                        user.hallway = hallway
                        user.is_turn = False
                        userList = User.objects.filter(game_id=user.game)
                        set_next_turn(user, userList)
                        user.save()
                        return Response(status=201)
                    else:
                        return Response({"error": "user cannot make this move"}, status=400)
                else:
                    return Response({"error": "not user's turn"}, status=400)
            elif "room_id" in data:
                room_id = data.get("room_id", None)
                room = get_object_or_404(Room, room_id = room_id)
                user = get_object_or_404(User, session_id=session_id)
                # case of user being in a hallway and moving into a room
                if user.is_turn and user.hallway is not None:
                    userHallway = get_object_or_404(Hallways, hallway_id=user.hallway.hallway_id)
                    roomName = room.name
                    if roomName in userHallway.connecting_rooms:
                        user.hallway = None
                        user.room = room
                        user.is_turn = False
                        userList = User.objects.filter(game_id=user.game)
                        set_next_turn(user, userList)
                        user.save()
                        return Response(status=201)
                    else:
                        return Response({"error": "user cannot make this move"}, status=400)
                # case of user being in a room and moving to a secret passage room
                elif user.is_turn and user.room is not None:
                    userRoom = get_object_or_404(Room, room_id=user.room.room_id)
                    if room == userRoom.passage_to_room:
                        user.room = room
                        user.is_turn = False
                        userList = User.objects.filter(game_id=user.game)
                        set_next_turn(user, userList)
                        user.save()
                        return Response(status=201)
                    else:
                        return Response({"error": "user cannot make this move"}, status=400)
                else:
                    return Response({"error": "not user's turn"}, status=400)
            else:
                return Response({"error": "invalid request paramaters"}, status=400)
        else:
            if session_id is not None:
                user = get_object_or_404(User, session_id=session_id)  # Get the user by ID
                # validate the character_id requested by the user
                validation_result = validate_character_id(user.game_id, character_id)
                if validation_result is not None:
                    return Response({"error": validation_result}, status=400)
                # otherwise, proceed with assigning character to user
                character = Character()
                character = get_object_or_404(Character, character_id=int(character_id))  # Get the character by ID
                user.character = character  # Set the user's character to the selected character
                user.save()
                serializer = UserSerializer(user)
                return Response(serializer.data, status=200)
            else:
                return Response({"error": "user_id not found in the request body"}, status=400)

    # DELETE method to allow user to leave a game
    def delete(self, request, id):
        session_id = id
        user = get_object_or_404(User, session_id=session_id)  # Get the user by ID
        user.delete()
        return HttpResponse(status=204)

    # GET method to get user of a game
    def get(self, request, id):
        user = get_object_or_404(User, session_id=id)
        serialzer = UserSerializer(user)
        return Response(serialzer.data, status=200)
