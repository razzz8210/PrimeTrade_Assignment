export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Scalable Web App</h1>
          <p className="text-gray-600 mt-1">Full-stack application with React frontend and Node.js backend</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Project Overview */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h2>
            <p className="text-gray-600 mb-4">
              A complete full-stack web application featuring user authentication, profile management, and task
              management with CRUD operations.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>User authentication with JWT tokens</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Secure password hashing with bcrypt</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Task management with search and filter</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>User profile management</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Rate limiting and security headers</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Responsive design with Tailwind CSS</span>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tech Stack</h2>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Frontend</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• React 18 with TypeScript</li>
                <li>• React Router for navigation</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Vite for build tooling</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Backend</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Node.js with Express</li>
                <li>• MongoDB for database</li>
                <li>• JWT for authentication</li>
                <li>• Bcryptjs for password hashing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Backend Setup */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Backend Setup</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3 text-sm font-mono text-gray-700">
                <div>
                  <p className="text-gray-600 mb-1">1. Navigate to backend:</p>
                  <code className="bg-gray-200 px-2 py-1 rounded">cd backend</code>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">2. Install dependencies:</p>
                  <code className="bg-gray-200 px-2 py-1 rounded">npm install</code>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">3. Create .env file:</p>
                  <code className="bg-gray-200 px-2 py-1 rounded block">MONGODB_URI=mongodb://...</code>
                  <code className="bg-gray-200 px-2 py-1 rounded block">JWT_SECRET=your-secret</code>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">4. Start server:</p>
                  <code className="bg-gray-200 px-2 py-1 rounded">npm run dev</code>
                </div>
              </div>
            </div>

            {/* Frontend Setup */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Frontend Setup</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3 text-sm font-mono text-gray-700">
                <div>
                  <p className="text-gray-600 mb-1">1. Navigate to frontend:</p>
                  <code className="bg-gray-200 px-2 py-1 rounded">cd frontend</code>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">2. Install dependencies:</p>
                  <code className="bg-gray-200 px-2 py-1 rounded">npm install</code>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">3. Create .env file:</p>
                  <code className="bg-gray-200 px-2 py-1 rounded">VITE_API_URL=http://localhost:5000/api</code>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">4. Start dev server:</p>
                  <code className="bg-gray-200 px-2 py-1 rounded">npm run dev</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Structure */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Structure</h2>
          <div className="bg-gray-50 rounded-lg p-4 text-sm font-mono text-gray-700 overflow-x-auto">
            <pre>{`scalable-web-app/
├── frontend/                 # React application
│   ├── src/
│   │   ├── pages/           # Login, Register, Dashboard
│   │   ├── components/      # UI components
│   │   ├── App.tsx
│   │   └── config.ts
│   ├── package.json
│   └── .env.example
├── backend/                  # Node.js/Express API
│   ├── server.js            # Main server file
│   ├── server-enhanced.js   # Enhanced with security
│   ├── middleware/          # Error handling, rate limiting
│   ├── package.json
│   └── .env.example
├── README.md                # Full documentation
├── DEPLOYMENT_GUIDE.md      # Production deployment
├── POSTMAN_COLLECTION.md    # API testing
└── API_DOCS.md             # API reference`}</pre>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">API Endpoints</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Authentication</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <span className="font-mono bg-blue-50 px-2 py-1 rounded">POST</span> /api/auth/register
                </li>
                <li>
                  <span className="font-mono bg-blue-50 px-2 py-1 rounded">POST</span> /api/auth/login
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">User</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <span className="font-mono bg-green-50 px-2 py-1 rounded">GET</span> /api/user/profile
                </li>
                <li>
                  <span className="font-mono bg-yellow-50 px-2 py-1 rounded">PUT</span> /api/user/profile
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Tasks</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <span className="font-mono bg-green-50 px-2 py-1 rounded">GET</span> /api/tasks
                </li>
                <li>
                  <span className="font-mono bg-blue-50 px-2 py-1 rounded">POST</span> /api/tasks
                </li>
                <li>
                  <span className="font-mono bg-yellow-50 px-2 py-1 rounded">PUT</span> /api/tasks/:id
                </li>
                <li>
                  <span className="font-mono bg-red-50 px-2 py-1 rounded">DELETE</span> /api/tasks/:id
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Health</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <span className="font-mono bg-green-50 px-2 py-1 rounded">GET</span> /api/health
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Security Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>JWT token-based authentication</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Bcryptjs password hashing (12 rounds)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Rate limiting (5 login, 100 API per 15min)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Input validation and sanitization</span>
              </li>
            </ul>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>CORS configured for frontend only</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Security headers with Helmet.js</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Token expiration (7 days)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Comprehensive error handling</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Documentation Links */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-8 mt-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Documentation</h2>
          <p className="mb-6">
            Complete documentation is available in the project files. Check the following for more details:
          </p>
          <ul className="space-y-2">
            <li>
              • <span className="font-semibold">README.md</span> - Complete project documentation
            </li>
            <li>
              • <span className="font-semibold">API_DOCS.md</span> - Detailed API reference
            </li>
            <li>
              • <span className="font-semibold">DEPLOYMENT_GUIDE.md</span> - Production deployment instructions
            </li>
            <li>
              • <span className="font-semibold">POSTMAN_COLLECTION.md</span> - API testing guide
            </li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
          <ol className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">1.</span>
              <span>Download the project files using the download button in the top right</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">2.</span>
              <span>Set up MongoDB (local or MongoDB Atlas)</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">3.</span>
              <span>Follow the backend setup instructions above</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">4.</span>
              <span>Follow the frontend setup instructions above</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">5.</span>
              <span>Test the API using Postman collection</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">6.</span>
              <span>Deploy to production using the deployment guide</span>
            </li>
          </ol>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-400">
            Scalable Web App with React Frontend and Node.js Backend • Built with security and scalability in mind
          </p>
        </div>
      </footer>
    </div>
  )
}
