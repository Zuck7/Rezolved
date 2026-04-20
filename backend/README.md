# Help Desk System Backend API

A comprehensive backend API for a college help desk system built with Express.js, MongoDB, and JWT authentication. This system enables students to submit support tickets and allows staff to manage and resolve them efficiently.

## Features

- **User Authentication**: JWT-based authentication with role-based access control
- **User Management**: Student and Admin user types with different permissions
- **Ticket Management**: Full CRUD operations for support tickets
- **Status Workflow**: Ticket status management (NEW → IN_PROGRESS → DISPATCHED → CLOSED/CANCELLED)
- **Audit Trail**: Complete history tracking with ticket iterations
- **Security**: Rate limiting, CORS, password hashing, input validation

## Tech Stack

- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT (JSON Web Tokens) for authentication
- bcryptjs for password hashing
- express-validator for input validation
- express-rate-limit for API protection
- CORS for cross-origin requests

## Quick Start

### Prerequisites

- Node.js 16+ recommended
- MongoDB (local or Atlas)

### 1) Install Dependencies

```bash
npm install
```

### 2) Configure Environment

Create a `.env` file in the project root:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/help-desk-system
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3) Run the Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server runs on http://localhost:3001 by default.

## Project structure

```
.
├── app
│   ├── controllers
│   │   ├── auth.js       (Authentication logic)
│   │   ├── index.js      (Home/Info endpoints)
│   │   └── users.js      (User CRUD operations)
│   ├── models
│   │   └── users.js      (User schema and authentication methods)
│   └── routers
│       ├── auth.js       (Auth routes)
│       ├── index.js      (Home routes)
│       └── users.js      (User routes)
├── config
│   └── db.js             (MongoDB connection)
├── server.js             (Express app setup)
├── package.json
└── README.md
```

## Configuration

- `config/db.js` reads `process.env.ATLASDB` and connects to MongoDB via Mongoose.
- `server.js` wires middleware and mounts routers under `/api/*` paths.
- `app/controllers/auth.js` handles JWT token generation and validation.
- `app/models/users.js` implements password hashing with salt and authentication methods.

Environment variables:

- `ATLASDB` — MongoDB URI (e.g., from MongoDB Atlas)
- `SECRETKEY` — JWT secret key for token signing and verification

## API

Base URL: `http://localhost:3000`

All endpoints return JSON responses.

### Authentication — `/api/auth`

- `POST /api/auth/signin` — user login (returns JWT token)

**Request body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Authentication successful",
  "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9..."
}
```

### Users — `/api/users`

- `POST /api/users` — create user
- `GET /api/users` — list all users
- `GET /api/users/:id` — get user by ID
- `PUT /api/users/:id` — update user by ID
- `DELETE /api/users/:id` — delete user by ID
- `DELETE /api/users` — delete all users

**Create User - Request body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "password": "securepassword123"
}
```

**Update User - Request body:**
```bash
curl -X PUT http://localhost:3000/api/users/<id> \
  -H 'Content-Type: application/json' \
  -d '{"firstName":"Jane","lastName":"Smith"}'
```

### Home — `/`

- `GET /` — home endpoint (returns welcome message)
- `GET /hello` — hello world endpoint
- `GET /goodbye` — goodbye endpoint

## Implementation notes

- Requests are parsed via `express.json()` and `express.urlencoded({ extended: true })`.
- Logging is via `morgan('dev')`.
- CORS is enabled via `cors()`.
- Errors bubble to a centralized JSON error handler.
- Passwords are hashed using PBKDF2 with a random salt before storage.
- JWT tokens are issued upon successful authentication and expire after 20 minutes.
- The `authenticate()` method compares provided passwords with stored hashed passwords.

## User Schema

```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique, validated),
  username: String (unique, required),
  password: String (virtual - triggers hashing),
  hashed_password: String (stored hash),
  salt: String (random salt for password hashing),
  fullName: String (virtual getter/setter),
  created: Date (immutable),
  updated: Date
}
```

## Troubleshooting

- If the server cannot connect to MongoDB, ensure `ATLASDB` is set and valid.
- If authentication fails, ensure `SECRETKEY` is set in `.env`.
- For JWT token validation errors, check that the token is included in the Authorization header.
- Check the server logs for error stack traces.

## License

MIT
