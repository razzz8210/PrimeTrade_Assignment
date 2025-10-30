# Postman Collection - API Endpoints

## Import Instructions
1. Open Postman
2. Click "Import"
3. Paste the JSON below or import from file

## Base URL
\`\`\`
http://localhost:5000/api
\`\`\`

## Authentication
All protected endpoints require:
\`\`\`
Authorization: Bearer <your_jwt_token>
\`\`\`

## Endpoints

### 1. Register User
**POST** \`/auth/register\`

Body:
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
\`\`\`

Response:
\`\`\`json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
\`\`\`

### 2. Login User
**POST** \`/auth/login\`

Body:
\`\`\`json
{
  "email": "john@example.com",
  "password": "password123"
}
\`\`\`

### 3. Get User Profile
**GET** \`/user/profile\`

Headers:
\`\`\`
Authorization: Bearer <token>
\`\`\`

### 4. Update User Profile
**PUT** \`/user/profile\`

Headers:
\`\`\`
Authorization: Bearer <token>
Content-Type: application/json
\`\`\`

Body:
\`\`\`json
{
  "name": "Jane Doe"
}
\`\`\`

### 5. Get All Tasks
**GET** \`/tasks?search=keyword\`

Headers:
\`\`\`
Authorization: Bearer <token>
\`\`\`

Query Parameters:
- \`search\` (optional): Search tasks by title

### 6. Create Task
**POST** \`/tasks\`

Headers:
\`\`\`
Authorization: Bearer <token>
Content-Type: application/json
\`\`\`

Body:
\`\`\`json
{
  "title": "Complete project",
  "description": "Finish the scalable web app"
}
\`\`\`

### 7. Update Task
**PUT** \`/tasks/:id\`

Headers:
\`\`\`
Authorization: Bearer <token>
Content-Type: application/json
\`\`\`

Body:
\`\`\`json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
\`\`\`

### 8. Delete Task
**DELETE** \`/tasks/:id\`

Headers:
\`\`\`
Authorization: Bearer <token>
\`\`\`

### 9. Health Check
**GET** \`/health\`

Response:
\`\`\`json
{
  "status": "Backend is running"
}
\`\`\`
