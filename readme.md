# 🚀 Task Management API - NestJS & TypeORM Assessment

This project is a complete NestJS application designed to manage tasks, teams, and team members. It uses TypeORM as the ORM and integrates JWT-based Bearer Token authentication to secure all API endpoints.

## Features

**Task Management:** Create, get, and update tasks with properties: `id`, `description`, `due_date`, `assignee`, and `status`.
**Team Management:** Create and manage teams with multiple assigned team members.
**User Management:** Create and manage team members with ability to assign them to teams.
**Task Assignment:** Ability to assign tasks to individual team members .


**Auth:** All apis are protected using a JWT Bearer Token strategy in header.

 
## Setup and Installation
 
 
   1)  npm install
   2) change env configurations if needed 
   3) run by **npm run start:dev**

The application will be available at `http://localhost:3000`


### 1. Get a JWT Token to put in headers 
`http://localhost:3000/auth/login`|`POST`|`{ "username": "admin", "password": "adminpass" }`|
 
**Response:**
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
 

## API Endpoints

All endpoints are created in collection of postman : postman link : https://elements.getpostman.com/redirect?entityId=38436367-e4926dee-c8eb-4067-908a-22aa70ffe48c&entityType=collection

###  Task Management
  
|**Create Task** |`/tasks`|`POST`|`{ "description": "Fix bug on homepage", "dueDate": "2024-12-01", "assigneeId": 1 }`|
|**Get All Tasks** |`/tasks`|`GET` 
|**Get Task by ID** |`/tasks/:id`|`GET`
|**Update Task** |`/tasks/:id`|`PATCH`|`{ "status": "IN_PROGRESS", "assigneeId": 2 }`|
|**Delete Task** |`/tasks/:id`|`DELETE` 

**Task Status Options:** `TODO`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`


### Team Management
 
|**Create Team** | `/team`|`POST`| `{ "name": "Frontend Squad", "description": "Frontend development team" }`|
|**Get All Teams** |` /teams` |`GET`
|**Get Team by ID** |`/team/:id`|`GET`
|**Update Team** |`/team/:id `|`PATCH`|`{ "name": "Updated Team Name" }`|
|**Delete Team** |`/team/:id`|`DELETE `


###  User/Member Management 
|**Create User** |`/users `|`POST`|`{ "name": "Jane Doe", "username": "jane.doe", "email": "jane@example.com", "teamId": 1 }`|
|**Get All Users** |`/users`|  `GET` 
|**Get User by ID** |`/user/:id`|`GET` 
|**Update User** |`/user/ :id`|`PATCH`|`{ "teamId": 2 }`|
|**Delete User** |`/user/:id`|`DEL ETE`
 