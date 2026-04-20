# Help Desk System - Setup Guide

## Quick Start (Local Development)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Database (Choose One Option)**

   ### Option A: MongoDB Atlas (Recommended for testing)
   1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   2. Create a free account and cluster
   3. Get your connection string
   4. Update `.env`:
      ```env
      MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/help-desk-system
      ```

   ### Option B: Local MongoDB
   1. Install MongoDB locally
   2. Start MongoDB: `mongod`
   3. The `.env` is already configured for local MongoDB

3. **Start the Server**
   ```bash
   npm run dev
   ```

4. **Test the API**
   ```bash
   curl http://localhost:3001/
   ```

## Environment Configuration

Copy and configure your `.env` file:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/help-desk-system
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## API Testing

### 1. Register a User
```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "student1",
    "email": "student@college.edu",
    "password": "password123",
    "userType": "USER",
    "firstName": "John",
    "lastName": "Doe",
    "studentId": "STU001"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3001/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@college.edu",
    "password": "password123"
  }'
```

### 3. Create a Ticket (with JWT token from login)
```bash
curl -X POST http://localhost:3001/api/tickets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "description": "My laptop is not connecting to WiFi",
    "priority": "MEDIUM",
    "customerName": "John Doe",
    "customerEmail": "student@college.edu"
  }'
```

### 4. Get All Tickets
```bash
curl -X GET http://localhost:3001/api/tickets \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Troubleshooting

### MongoDB Connection Issues
- **Local**: Make sure MongoDB is running with `mongod`
- **Atlas**: Check your connection string and IP whitelist
- **No Database**: The server will run without DB, but API calls will timeout

### CORS Issues
- Update `FRONTEND_URL` in `.env` to match your frontend URL
- Default is set for React dev server on port 5173

### Port Conflicts
- Change `PORT` in `.env` if 3001 is in use
- Update your frontend API calls accordingly

## Development Workflow

1. **Code Changes**: Server auto-restarts with nodemon
2. **Database Changes**: Check MongoDB logs or Atlas monitoring
3. **Testing**: Use curl commands above or Postman/Insomnia

## Production Deployment

1. Set `NODE_ENV=production`
2. Use strong JWT secret
3. Configure MongoDB Atlas
4. Set proper CORS origins
5. Use process manager (PM2)

## Frontend Integration

Your frontend should connect to:
- **Base URL**: `http://localhost:3001`
- **Auth Endpoints**: `/api/auth/signin`, `/api/users`
- **Ticket Endpoints**: `/api/tickets`

The API returns consistent JSON responses:
```json
{
  "success": boolean,
  "message": "string",
  "data": object,
  "token": "string (auth only)"
}
```