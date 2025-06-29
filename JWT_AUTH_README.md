# JWT Authentication Setup

This project now includes JWT (JSON Web Token) authentication for secure login and registration.

## Features

- ✅ JWT token generation on login/registration
- ✅ Token verification middleware
- ✅ Protected routes
- ✅ Secure password hashing with bcrypt
- ✅ Token expiration (24 hours)

## API Endpoints

### Authentication Endpoints

#### 1. Register User

```
POST /api/v1/registration
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**

```json
{
  "message": "User registration successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

#### 2. Login User

```
POST /api/v1/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### Protected Endpoints

All protected endpoints require the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

#### 3. Get User Profile

```
GET /api/v1/protected/profile
Authorization: Bearer <your-jwt-token>
```

**Response:**

```json
{
  "message": "Access granted to protected route",
  "user": {
    "userId": 1,
    "email": "john@example.com"
  }
}
```

#### 4. Update Profile

```
POST /api/v1/protected/update-profile
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "name": "John Doe",
  "bio": "Software Developer"
}
```

#### 5. Logout

```
POST /api/v1/protected/logout
Authorization: Bearer <your-jwt-token>
```

## How to Use JWT Authentication

### 1. Client-Side Implementation

```javascript
// Store token after login/registration
const response = await fetch("/api/v1/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "user@example.com",
    password: "password123",
  }),
});

const data = await response.json();
localStorage.setItem("token", data.token);

// Use token for protected requests
const token = localStorage.getItem("token");
const profileResponse = await fetch("/api/v1/protected/profile", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

### 2. Adding JWT Protection to Existing Routes

To protect any existing route, add the `authenticateToken` middleware:

```javascript
const { authenticateToken } = require("../utils/jwt-utils");

// Protected route
router.get("/sensitive-data", authenticateToken, (req, res) => {
  // Only authenticated users can access this
  res.json({ data: "Sensitive information" });
});
```

### 3. Accessing User Data in Protected Routes

In protected routes, user information is available in `req.user`:

```javascript
router.get("/profile", authenticateToken, (req, res) => {
  const userId = req.user.userId;
  const userEmail = req.user.email;

  // Use userId to fetch user-specific data
  res.json({ userId, email: userEmail });
});
```

## Security Considerations

1. **JWT Secret**: Change the `JWT_SECRET` in `utils/jwt-utils.js` to a strong, unique secret in production.

2. **Environment Variables**: Store sensitive data like JWT secrets and database credentials in environment variables.

3. **Token Storage**: Store tokens securely on the client side (localStorage, sessionStorage, or httpOnly cookies).

4. **Token Expiration**: Tokens expire after 24 hours. Implement refresh token logic for production applications.

5. **HTTPS**: Always use HTTPS in production to secure token transmission.

## Error Handling

The system handles various authentication errors:

- **401 Unauthorized**: Missing or invalid token
- **403 Forbidden**: Expired or malformed token
- **500 Internal Server Error**: Server-side errors

## Database Schema

Make sure your `users` table has the following structure:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Testing the Setup

1. Start your server: `node index.js`
2. Register a new user using the registration endpoint
3. Login with the registered credentials
4. Use the returned token to access protected routes
5. Test logout functionality

The JWT authentication system is now fully integrated and ready to use!
