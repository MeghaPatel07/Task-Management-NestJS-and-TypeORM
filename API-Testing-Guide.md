# Task Management API - Postman Test Examples

## 🔧 Setup
- Base URL: `http://localhost:3000`
- Make sure the NestJS server is running: `npm run start:dev`

## 📋 Step-by-Step Testing Guide

### 1. 🔐 Authentication (REQUIRED FIRST)
**POST** `/auth/login`
```json
{
  "username": "admin",
  "password": "adminpass"
}
```
**Response:** Copy the `access_token` and use it as Bearer token for all subsequent requests.

---

## 👥 Team Management

### Create Team
**POST** `/team`
Headers: `Authorization: Bearer <your_token>`
```json
{
  "name": "Frontend Development Team",
  "description": "Team responsible for frontend development and UI/UX"
}
```

### Get All Teams
**GET** `/teams`
Headers: `Authorization: Bearer <your_token>`

### Get Team by ID
**GET** `/team/{team_id}`
Headers: `Authorization: Bearer <your_token>`
Example: `/team/673507c5e1234567890abcde`

### Update Team
**PATCH** `/team/{team_id}`
Headers: `Authorization: Bearer <your_token>`
```json
{
  "name": "Full-Stack Development Team",
  "description": "Updated team description"
}
```

### Delete Team
**DELETE** `/team/{team_id}`
Headers: `Authorization: Bearer <your_token>`

---

## 👤 User Management

### Create User with Team
**POST** `/users`
Headers: `Authorization: Bearer <your_token>`
```json
{
  "name": "John Doe",
  "username": "john.doe",
  "email": "john.doe@example.com",
  "teamId": "673507c5e1234567890abcde"
}
```

### Create User without Team
**POST** `/users`
Headers: `Authorization: Bearer <your_token>`
```json
{
  "name": "Jane Smith",
  "username": "jane.smith",
  "email": "jane.smith@example.com"
}
```

### Get All Users
**GET** `/users`
Headers: `Authorization: Bearer <your_token>`

### Get User by ID
**GET** `/user/{user_id}`
Headers: `Authorization: Bearer <your_token>`
Example: `/user/673507c5e1234567890abcdf`

### Update User
**PATCH** `/user/{user_id}`
Headers: `Authorization: Bearer <your_token>`
```json
{
  "name": "John Updated Doe",
  "email": "john.updated@example.com",
  "teamId": "673507c5e1234567890abcde"
}
```

### Remove User from Team
**PATCH** `/user/{user_id}`
Headers: `Authorization: Bearer <your_token>`
```json
{
  "teamId": null
}
```

### Delete User
**DELETE** `/user/{user_id}`
Headers: `Authorization: Bearer <your_token>`

---

## 📝 Task Management

### Create Task with Assignee and Due Date
**POST** `/tasks`
Headers: `Authorization: Bearer <your_token>`
```json
{
  "description": "Implement user authentication feature",
  "dueDate": "2024-12-15",
  "assigneeId": "673507c5e1234567890abcdf"
}
```

### Create Task without Assignee
**POST** `/tasks`
Headers: `Authorization: Bearer <your_token>`
```json
{
  "description": "Set up CI/CD pipeline for the project",
  "dueDate": "2024-12-20"
}
```

### Create Task without Due Date
**POST** `/tasks`
Headers: `Authorization: Bearer <your_token>`
```json
{
  "description": "Review and update project documentation"
}
```

### Get All Tasks (with Assignee Info)
**GET** `/tasks`
Headers: `Authorization: Bearer <your_token>`

### Get Task by ID
**GET** `/tasks/{task_id}`
Headers: `Authorization: Bearer <your_token>`
Example: `/tasks/673507c5e1234567890abce0`

### Update Task Status
**PATCH** `/tasks/{task_id}`
Headers: `Authorization: Bearer <your_token>`
```json
{
  "status": "IN_PROGRESS"
}
```
**Status Options:** `TODO`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`

### Assign Task to User
**PATCH** `/tasks/{task_id}`
Headers: `Authorization: Bearer <your_token>`
```json
{
  "assigneeId": "673507c5e1234567890abcdf"
}
```

### Update Task Description and Due Date
**PATCH** `/tasks/{task_id}`
Headers: `Authorization: Bearer <your_token>`
```json
{
  "description": "Updated: Implement user authentication with JWT and refresh tokens",
  "dueDate": "2024-12-18"
}
```

### Complete Task
**PATCH** `/tasks/{task_id}`
Headers: `Authorization: Bearer <your_token>`
```json
{
  "status": "COMPLETED"
}
```

### Delete Task
**DELETE** `/tasks/{task_id}`
Headers: `Authorization: Bearer <your_token>`

---

## 🧪 Complete Test Workflow

Follow this sequence to test the complete functionality:

1. **Login** - Get your JWT token
2. **Create Team** - Create "Development Team Alpha"
3. **Create User** - Add "Alice Johnson" to the team
4. **Create Task** - Assign a task to Alice
5. **Get All Tasks** - Verify task shows with assignee info
6. **Update Task** - Change status to "IN_PROGRESS"
7. **Complete Task** - Mark as "COMPLETED"

---

## 🔍 Important Notes

- **MongoDB ObjectIds**: All IDs are 24-character hex strings (e.g., `673507c5e1234567890abcde`)
- **Replace Example IDs**: Use actual IDs returned from your create operations
- **Bearer Token**: Always include `Authorization: Bearer <token>` header
- **Content-Type**: Use `application/json` for POST/PATCH requests
- **Date Format**: Use ISO date strings like "2024-12-15" for dueDate

## 🚨 Error Handling

Common HTTP Status Codes:
- `200/201`: Success
- `400`: Bad Request (validation failed)
- `401`: Unauthorized (invalid/missing token)
- `404`: Not Found (invalid ID)
- `500`: Server Error

## 💡 Tips for Testing

1. Start with authentication to get your token
2. Create a team first, then users, then tasks
3. Copy the actual ObjectIds from responses to use in subsequent requests
4. Use the "Get All" endpoints to see the current state of data
5. Test both success and error scenarios