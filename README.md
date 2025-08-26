
# AdonisJS CRUD Project

## Overview
This project is a simple **CRUD (Create, Read, Update, Delete) API** built using **AdonisJS + TypeScript**.  
It allows creating, updating, deleting, and listing users through API endpoints.

---

## Project Structure

```

.
├── app
│   ├── controllers
│   │   └── UsersController.ts
│   ├── models
│   │   └── User.ts
│   ├── middleware
│   └── exceptions
├── config
├── database
│   └── migrations
├── start
│   └── routes.ts
├── tests
├── package.json
└── tsconfig.json

````

- **`app/models/User.ts`** → Defines the User model and database schema  
- **`app/controllers/UsersController.ts`** → Handles CRUD operations for users  
- **`app/middleware/`** → Middleware (authentication, JSON response, etc.)  
- **`config/`** → Application and database configuration  
- **`database/migrations/`** → Scripts to create database tables  
- **`start/routes.ts`** → Defines API routes  

---

## Installation

```bash
# Clone the repository
git clone <repo-url>
cd <project-folder>

# Install dependencies
npm install

# Set up environment file
cp .env.example .env
# Update DB configuration in .env

# Run database migrations
node ace migration:run

# Start the server
node ace serve --watch
````

Server will run at `http://localhost:3333`.

---

## API Endpoints

| Method | Endpoint    | Description       |
| ------ | ----------- | ----------------- |
| GET    | /users      | Get all users     |
| POST   | /users      | Create a new user |
| GET    | /users/\:id | Get a single user |
| PUT    | /users/\:id | Update a user     |
| DELETE | /users/\:id | Delete a user     |

---

## Example JSON for Creating a User

```json
{
  "fullName": "Ali Khan",
  "email": "ali@example.com",
  "password": "12345678"
}
```

---

## GitHub Workflows

* **Prettier** → Automatically formats and checks code style
* **ESLint** → Linting and code quality checks
* **AI PR Reviewer** → Provides automatic PR review suggestions

---

## Notes

* Passwords are **hashed** before storing in the database.
* The `fullName` field is **case-sensitive** and must match exactly in JSON (`fullName`).
* Ensure your database configuration in `.env` is correct (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).

---

```
