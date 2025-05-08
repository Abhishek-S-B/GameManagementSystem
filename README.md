Game Content Management System (CMS)

This project is a **Game Content Management System** that enables users to manage characters and other content-related data for a game. It is built with a React frontend and a .NET Core backend (Web API), connected via a SQL Server database.

### High Level Architecture
	•	Frontend: React (No external UI library used)
	•	Backend: ASP.NET Core Web API with Entity Framework Core
	•	Database: SQL Server
	•	Communication: JSON over HTTP (RESTful APIs)
	•	Authentication: JWT-based (set up but not fully implemented)

### Database Schema

### GameCharacters Table
| Field          | Type        | Description                   |
|----------------|-------------|-------------------------------|
| Id             | int         | Primary key                   |
| Name           | string      | Character's name              |
| Description    | string      | Description of the character  |
| Rarity         | string      |  Common, Rare, Legendary      |
| UpgradeLevels  | int         | Number of upgrade levels(1-5) |
| ImageUrl       | string      | URL to character image        |


### API Documentation

### GET /api/characters
	•	Fetches a list of all characters.

### GET /api/characters/{id}
	•	Fetches a specific character by ID.

### POST /api/characters
	•	Creates a new character.
	•	Body:
    {
        "name": "Character Name",
        "description": "About the character",
        "rarity": "Common",
        "upgradeLevels": 3,
        "imageUrl": "http://example.com/image.jpg"
    }
### PUT /api/characters/{id}
	•	Updates an existing character.

### DELETE /api/characters/{id}
	•	Deletes a character.

Note: Authentication and role-based authorization are not yet enforced.
