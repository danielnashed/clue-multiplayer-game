from django.urls import path
from clue_game_api.characters.views import CharacterList, CharacterDetail
from clue_game_api.game.views import GameView, WhosTurnIsItView
from clue_game_api.game.views import GameView, StartGameView, AccusationGameView, SuggestionGameView
from clue_game_api.users.views import UserView
from clue_game_api.room.views import RoomList
from clue_game_api.weapon.views import WeaponList

urlpatterns = [
    # Add a URL pattern for character API
    path("api/characters/", CharacterList.as_view(), name="character-list"),
    path("api/characters/<int:pk>/", CharacterDetail.as_view(), name="character-detail"),
    # Adding URL pattern for Game API
    path("api/game/", GameView.as_view(), name="p"),
    path("api/game/<str:game_id>/", GameView.as_view(), name="get_game"),
    path("api/game/<str:game_id>/", GameView.as_view(), name="delete_game"),
    path("api/game/<str:game_id>/whoismove/", WhosTurnIsItView.as_view(), name="whos_move_is_it"),
    path("api/game/<str:game_id>/start_game/", StartGameView.as_view(), name="start_game"),
    path("api/game/<str:game_id>/accusation/", AccusationGameView.as_view(), name="accusation"),
    path("api/game/<str:game_id>/suggestion/", SuggestionGameView.as_view(), name="suggestion"),
    # Room endpoints
    path("api/rooms/", RoomList.as_view(), name="get_rooms"),
    # Weapon endpoints
    path("api/weapons/", WeaponList.as_view(), name="get_weapons"),
    # User endpoints
    path("api/users/", UserView.as_view(), name="create-user"),
    path("api/users/<str:id>/", UserView.as_view(), name="remove-user or get user"),
    path("api/users/<str:session_id>/character/<int:character_id>/", UserView.as_view(), name="select_character"),
]
