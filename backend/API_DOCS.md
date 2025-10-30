# Scalable Web App - API Documentation

## Base URL
\`\`\`
http://localhost:5000/api
\`\`\`

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
\`\`\`
Authorization: Bearer <token>
\`\`\`

## Endpoints

### Auth Routes

#### Register
- **POST** `/auth/register`
- **Body**: `{ name, email, password }`
- **Response**: `{ token, user }`

#### Login
- **POST** `/auth/login`
- **Body**: `{ email, password }`
- **Response**: `{ token, user }`

### User Routes

#### Get Profile
- **GET** `/user/profile`
- **Auth**: Required
- **Response**: User object

#### Update Profile
- **PUT** `/user/profile`
- **Auth**: Required
- **Body**: `{ name }`
- **Response**: Updated user object

### Task Routes

#### Get All Tasks
- **GET** `/tasks?search=keyword`
- **Auth**: Required
- **Query**: `search` (optional)
- **Response**: Array of tasks

#### Create Task
- **POST** `/tasks`
- **Auth**: Required
- **Body**: `{ title, description }`
- **Response**: Created task

#### Update Task
- **PUT** `/tasks/:id`
- **Auth**: Required
- **Body**: `{ title, description, completed }`
- **Response**: Updated task

#### Delete Task
- **DELETE** `/tasks/:id`
- **Auth**: Required
- **Response**: `{ message: "Task deleted" }`

### Health Check
- **GET** `/health`
- **Response**: `{ status: "Backend is running" }`
