# Auth Module (Backend Dev 1)

## Owner: Backend Dev 1

## Files to create:
- `auth.controller.js` — Route handler functions (register, login, getProfile, updateProfile)
- `auth.routes.js` — Express router with route definitions
- `auth.middleware.js` — JWT token verification middleware (`verifyToken`)

## Routes:
```
POST /api/auth/register     → Create new user account
POST /api/auth/login        → Authenticate and return JWT
GET  /api/auth/profile      → Get current user profile (protected)
PUT  /api/auth/profile      → Update profile (protected)
```

## Dependencies:
- User model from `/modules/users/`
- bcryptjs for password hashing
- jsonwebtoken for JWT generation/verification
