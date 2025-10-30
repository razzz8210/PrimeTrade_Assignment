# Scalable Web App with Authentication & Dashboard

A full-stack web application built with React (frontend) and Node.js/Express (backend) featuring user authentication, profile management, and task management with CRUD operations.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Password Security**: Bcrypt hashing for password protection
- **User Profiles**: View and update user information
- **Task Management**: Create, read, update, and delete tasks
- **Search & Filter**: Search tasks by title and filter by status
- **Protected Routes**: Dashboard accessible only to authenticated users
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Error Handling**: Comprehensive error handling and validation
- **Rate Limiting**: Protection against brute force attacks
- **Security Headers**: Helmet.js for HTTP security headers

## Tech Stack

### Frontend
- React 18
- React Router for navigation
- Tailwind CSS for styling
- Vite for build tooling
- TypeScript for type safety

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- Bcryptjs for password hashing
- Helmet for security
- Express Rate Limit for rate limiting

## Project Structure

\`\`\`
scalable-web-app/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── components/
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── UserProfile.tsx
│   │   │   ├── TaskList.tsx
│   │   │   ├── TaskForm.tsx
│   │   │   └── TaskItem.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── config.ts
│   │   └── index.css
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── .env.example
├── backend/
│   ├── server.js
│   ├── server-enhanced.js
│   ├── package.json
│   ├── .env.example
│   ├── API_DOCS.md
│   └── middleware/
│       ├── errorHandler.js
│       └── rateLimiter.js
├── DEPLOYMENT_GUIDE.md
├── POSTMAN_COLLECTION.md
└── README.md
\`\`\`

## Getting Started

### Prerequisites
- Node.js 16+
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
\`\`\`bash
cd backend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create `.env` file:
\`\`\`
MONGODB_URI=mongodb://localhost:27017/scalable-app
JWT_SECRET=your-super-secret-key-change-this
PORT=5000
NODE_ENV=development
\`\`\`

4. Start the server:
\`\`\`bash
npm run dev
\`\`\`

### Frontend Setup

1. Navigate to frontend directory:
\`\`\`bash
cd frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create `.env` file:
\`\`\`
VITE_API_URL=http://localhost:5000/api
\`\`\`

4. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open http://localhost:3000 in your browser

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Tasks
- `GET /api/tasks?search=keyword` - Get all tasks (with optional search)
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

See `API_DOCS.md` for detailed endpoint documentation.

## Security Features

- **Password Hashing**: Bcryptjs with salt rounds of 12
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: 5 login attempts per 15 minutes, 100 API requests per 15 minutes
- **Input Validation**: Server-side validation for all inputs
- **CORS**: Configured for frontend domain only
- **Security Headers**: Helmet.js for HTTP security headers
- **Token Expiration**: JWT tokens expire after 7 days
- **Email Validation**: Regex validation for email format

## Scaling Considerations

### Horizontal Scaling
- Deploy multiple backend instances behind a load balancer
- Use Redis for session management
- Implement database connection pooling

### Caching
- Add Redis for frequently accessed data
- Cache user profiles and task lists
- Implement cache invalidation strategy

### Database Optimization
- Add indexes on frequently queried fields
- Implement pagination for large datasets
- Monitor slow queries

### Frontend Optimization
- Code splitting with React.lazy()
- Image optimization
- Minify and compress assets
- Use CDN for static files

See `DEPLOYMENT_GUIDE.md` for detailed deployment and scaling instructions.

## Testing

### Manual Testing
Use Postman collection provided in `POSTMAN_COLLECTION.md` to test all endpoints.

### Test Scenarios
1. Register new user
2. Login with credentials
3. Create, read, update, delete tasks
4. Search and filter tasks
5. Update user profile
6. Logout

## Error Handling

The application includes comprehensive error handling:
- Form validation errors
- Authentication errors
- API request errors
- Network errors
- Database errors

All errors are displayed to the user with clear messages.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on GitHub or contact the development team.
