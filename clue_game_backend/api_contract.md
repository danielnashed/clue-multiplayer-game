# Create Game
```
POST /api/game/
	Request Body
		{}
	Response Body
		{
			"id": "210730a4-6d46-11ee-b962-0242ac120002"
			"join_code": "pawn123",
            "session_id": "210730a4-6d46-11ee-b962-0242ac120002", // When "someone" creates a game, the BE is going to create a user for this person, this is their session id
		}
```
# Get a game
```
GET /api/game/<id>/
	Request Body
		{}
	Response Body
		{
			"id": "210730a4-6d46-11ee-b962-0242ac120002"
			"join_code": "pawn123",
			"users": [
				{
					"session_id": "210730a4-6d46-11ee-b962-0242ac120002", // This remains the same for as long as this user exists
					"game_id": "210730a4-6d46-11ee-b962-0242ac120002", // This is the game they joined, matching the join code
					"character_id": "1" // Needs to be set separetly from joining a game
					"is_turn": true,
					"room_id": NULL,
					"hallway_id": "2"
				}
			]
		}
```

# Delete a game
```
DELETE /api/game/<id>/
	Request Body
		{}
	Response Body
		{
		}
```


# Join a Game (i.e. create a user)
```
POST /api/user/
	Request Body
		{
			"join_code": "pawn123"
		}
	Response Body
		{
			"session_id": "210730a4-6d46-11ee-b962-0242ac120002", // (USER_ID) This remains the same for as long as this user exists
			"game_id": "210730a4-6d46-11ee-b962-0242ac120002", // This is the game they joined, matching the join code
			"character_id": NULL // Needs to be set separetly from joining a game
			"is_turn": NULL,
			"room_id": NULL,
			"hallway_id": NULL
		}
```
# Remove yourself from a Game (i.e. delete a user)
```
DELETE /api/user/<id>/
	Request Body
		{
		}
	Response Body
		{
		}
```

# Get a user
```
GET /api/user/<id>/
	Request Body
		{
		}
	Response Body
		{
			"session_id": "210730a4-6d46-11ee-b962-0242ac120002", // This remains the same for as long as this user exists
			"game_id": "210730a4-6d46-11ee-b962-0242ac120002", // This is the game they joined, matching the join code
			"character_id": "1" // Needs to be set separetly from joining a game
			"is_turn": true,
			"room_id": NULL,
			"hallway_id": "2",
			"cards": {
				"weapons": [
					<api contract for a single weapon>
				],
				"rooms": [
					{
						"room_id": 2,
						"name": "Kitchen",
						"passage_to_room": 1
					}
				],
				"characters": [
					{
						"character_id": "2",
						"name": "Mr. Green",
						"image_resources": <url>
						"move_priority": "2",
						"hallway_id": "3"
					}
				]
			}
		}
```

# Get Character List
```
GET /api/characters/

	Request Body
		{
		}
	Response Body
	{
		[
			{
				"character_id": "1",
				"name": "Scarlet",
				"image_resources": <url>
				"move_priority": "1",
				"hallway_id": "2"
			},
			{
				"character_id": "2",
				"name": "Mr. Green",
				"image_resources": <url>
				"move_priority": "2",
				"hallway_id": "3"
			}
		]
	}
```

# Set Character for User
```
PUT /api/user/<session_id>/character/<character_id>/

	Request Body
		{
		}
	Response Body
		{
			"session_id": "210730a4-6d46-11ee-b962-0242ac120002", // This remains the same for as long as this user exists
			"game_id": "210730a4-6d46-11ee-b962-0242ac120002", // This is the game they joined, matching the join code
			"character_id": "1" // Needs to be set separetly from joining a game
			"is_turn": true,
			"room_id": NULL,
			"hallway_id": "2"
		}
```

# Get Room List
```
GET /api/rooms/

	Request Body
		{
		}
	Response Body
    [
        {
            "room_id": 2,
            "name": "Kitchen",
            "passage_to_room": 1
        },
	]
```

# Get Room List
```
GET /api/weapons/

	Request Body
		{
		}
	Response Body
    [
        {
            "weapon_id": 1,
            "name": "Candlestick",
            "image_resource": ""
        },
	]
```


# Get Who's Move is it Anyway
```
GET /api/game/<id>/whoismove/

	Request Body
		{
		}
	Response Body
	{
		"user":  {
			"session_id": "210730a4-6d46-11ee-b962-0242ac120002",
			"game_id": "210730a4-6d46-11ee-b962-0242ac120002",
			"character_id": 1,
			"is_turn": true,
			"room_id": 1,
			"hallway_id": 2
		}
	}
```


# Get Available Characters by Game
Characters that have not been already selected in a particular game.
```
GET /api/game/<id>/characters/

	Request Body
		{
		}
	Response Body
	{
		[
			{
				"character_id": "1",
				"name": "Scarlet",
				"image_resources": <url>
				"move_priority": "1",
				"hallway_id": "2"
			}
		]
	}
```


# Start Game
```
POST /api/game/<id>/start_game/

	Request Body
		{
		}
	Response Body
		{
		}
```



# Make Suggestion
```
POST /api/game/<id>/suggestion/

	Request Body
		{
			"user_session_id": "210730a4-6d46-11ee-b962-0242ac120002", // The user who made the suggestion
			"character_id": 4,
			"room_id": 3,
			"weapon_id": 3
		}
	Response Body
		{
			"character_id": NULL,
			"room_id": 3,
			"weapon_id": NULL
		}
```


# Make Accusation
```
POST /api/game/<id>/accusation/

	Request Body
		{
			"user_session_id": "210730a4-6d46-11ee-b962-0242ac120002", // The user who made the suggestion
			"character_id": 4,
			"room_id": 3,
			"weapon_id": 3
		}
	Response Body
		{
			// Solution
			"character_id": 5,
			"room_id": 3,
			"weapon_id": 2,
			"game_end": false // indicates if the game should end at the end of this accusation
		}
```


# Player Moves
```
POST /api/user/<session_id>/character/<character_id>/

	Request Body
		{
			"room_id": "",
			"hallway_id": "2"
		}

```