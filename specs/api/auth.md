# Authentication API Specification for Todo Application

## Overview
This document defines the authentication API endpoints for the Todo application, including user registration, login/logout, password management, and session handling.

## Base URL
`/api/v1/auth`

## Common Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": { ... }
  }
}
```

## Authentication Endpoints

### POST /register
Register a new user account

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe",
  "acceptTerms": true
}
```

**Validation:**
- Email: Valid email format, unique in system
- Password: Minimum 8 characters, contains uppercase, lowercase, number, special character
- firstName: Maximum 100 characters
- lastName: Maximum 100 characters
- acceptTerms: Must be true

**Response:**
- 201: User registered successfully
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-string",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isVerified": false,
      "createdAt": "2023-01-01T00:00:00Z"
    }
  },
  "message": "Registration successful. Please check your email to verify your account."
}
```
- 400: Validation error
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "email": "Email format is invalid",
      "password": "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character"
    }
  }
}
```
- 409: Email already exists
```json
{
  "success": false,
  "error": {
    "code": "EMAIL_EXISTS",
    "message": "Email address already registered"
  }
}
```

### POST /login
Authenticate user and return JWT tokens

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "rememberMe": false
}
```

**Response:**
- 200: Login successful
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-string",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isVerified": true
    },
    "tokens": {
      "accessToken": "jwt-access-token",
      "refreshToken": "jwt-refresh-token",
      "expiresIn": 3600
    }
  },
  "message": "Login successful"
}
```
- 400: Invalid credentials format
- 401: Invalid credentials
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```
- 403: Account locked or disabled
- 423: Account not verified (if email verification is required)

### POST /logout
Log out the current user

**Headers:**
- Authorization: Bearer `<access_token>`

**Response:**
- 200: Logout successful
```json
{
  "success": true,
  "message": "Logout successful"
}
```
- 401: Invalid or expired token

### POST /refresh
Refresh the JWT access token

**Request Body:**
```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response:**
- 200: Token refreshed successfully
```json
{
  "success": true,
  "data": {
    "accessToken": "new-jwt-access-token",
    "expiresIn": 3600
  },
  "message": "Token refreshed successfully"
}
```
- 400: Invalid refresh token format
- 401: Invalid or expired refresh token

### POST /forgot-password
Initiate password reset process

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
- 200: Password reset email sent (even if user doesn't exist to prevent enumeration)
```json
{
  "success": true,
  "message": "If an account with this email exists, a password reset link has been sent to your email."
}
```
- 400: Invalid email format

### POST /reset-password
Complete password reset

**Request Body:**
```json
{
  "token": "reset_token_from_email",
  "newPassword": "NewSecurePassword123!"
}
```

**Response:**
- 200: Password reset successful
```json
{
  "success": true,
  "message": "Password has been reset successfully. You can now log in with your new password."
}
```
- 400: Validation error or invalid token
- 404: Invalid or expired reset token

### POST /verify-email
Verify email address with token

**Request Body:**
```json
{
  "token": "verification_token_from_email"
}
```

**Response:**
- 200: Email verified successfully
```json
{
  "success": true,
  "message": "Email address verified successfully. You can now log in to your account."
}
```
- 400: Invalid token format
- 404: Invalid or expired verification token

### GET /me
Get current user information

**Headers:**
- Authorization: Bearer `<access_token>`

**Response:**
- 200: User information retrieved
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-string",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "avatarUrl": "https://example.com/avatar.jpg",
      "isVerified": true,
      "createdAt": "2023-01-01T00:00:00Z"
    }
  }
}
```
- 401: Invalid or expired token

### PUT /profile
Update user profile information

**Headers:**
- Authorization: Bearer `<access_token>`

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "avatarUrl": "https://example.com/new-avatar.jpg"
}
```

**Response:**
- 200: Profile updated successfully
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-string",
      "email": "user@example.com",
      "firstName": "Jane",
      "lastName": "Smith",
      "avatarUrl": "https://example.com/new-avatar.jpg",
      "updatedAt": "2023-01-01T00:00:00Z"
    }
  },
  "message": "Profile updated successfully"
}
```
- 400: Validation error
- 401: Invalid or expired token
- 409: Email already exists (if email is included)

### POST /change-password
Change user password

**Headers:**
- Authorization: Bearer `<access_token>`

**Request Body:**
```json
{
  "currentPassword": "current_password",
  "newPassword": "NewSecurePassword123!"
}
```

**Response:**
- 200: Password changed successfully
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```
- 400: Validation error
- 401: Invalid or expired token
- 403: Current password incorrect

## Social Authentication Endpoints

### POST /google/callback
Handle Google OAuth callback (server-side)

**Request Body:**
```json
{
  "code": "authorization_code_from_google"
}
```

**Response:**
- 200: Authentication successful
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "tokens": { ... }
  },
  "message": "Successfully authenticated with Google"
}
```

### POST /github/callback
Handle GitHub OAuth callback (server-side)

**Request Body:**
```json
{
  "code": "authorization_code_from_github"
}
```

**Response:**
- 200: Authentication successful
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "tokens": { ... }
  },
  "message": "Successfully authenticated with GitHub"
}
```

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| AUTH_001 | 401 | Invalid or expired token |
| AUTH_002 | 403 | Insufficient permissions |
| AUTH_003 | 400 | Invalid credentials |
| AUTH_004 | 409 | Email already exists |
| AUTH_005 | 423 | Account not verified |
| AUTH_006 | 429 | Too many requests |
| VALIDATION_001 | 400 | Validation error |
| RESOURCE_001 | 404 | Resource not found |
| SERVER_001 | 500 | Internal server error |

## Rate Limiting
- Register/Login endpoints: 5 requests per minute per IP
- Password reset endpoints: 3 requests per minute per email/IP
- All other auth endpoints: 100 requests per minute per user

## Security Headers
All responses include:
- Strict-Transport-Security: max-age=31536000; includeSubDomains
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Content-Security-Policy: default-src 'self'

---

**Version**: 1.0.0
**Created**: 2026-01-12
**Last Updated**: 2026-01-12