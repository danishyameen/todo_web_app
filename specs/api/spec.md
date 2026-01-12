# API Specification for Todo Full-Stack Web Application

## Overview
This document defines the REST API endpoints for the Todo application, including authentication, task management, and user profile endpoints.

## Base URL
`/api/v1`

## Authentication
All protected endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

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

## Endpoints

### Authentication Endpoints

#### POST /auth/register
Register a new user account

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
- 201: User registered successfully
- 400: Validation error
- 409: Email already exists

#### POST /auth/login
Authenticate user and return JWT tokens

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**
- 200: Login successful, returns tokens
- 401: Invalid credentials
- 403: Account locked/disabled

#### POST /auth/logout
Log out the current user

**Headers:**
- Authorization: Bearer <token>

**Response:**
- 200: Logout successful
- 401: Invalid token

#### POST /auth/refresh
Refresh the JWT access token

**Request Body:**
```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response:**
- 200: Token refreshed successfully
- 401: Invalid refresh token

#### POST /auth/forgot-password
Initiate password reset process

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
- 200: Password reset email sent
- 404: User not found

#### POST /auth/reset-password
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
- 400: Invalid token or weak password

### Task Management Endpoints

#### GET /tasks
Retrieve user's tasks with optional filtering and pagination

**Headers:**
- Authorization: Bearer <token>

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `status`: Filter by status (optional: pending, in-progress, completed)
- `priority`: Filter by priority (optional: low, medium, high)
- `category`: Filter by category (optional)
- `search`: Search term for title/description (optional)
- `sortBy`: Sort field (optional: createdAt, updatedAt, dueDate, priority)
- `sortOrder`: Sort order (optional: asc, desc)

**Response:**
- 200: Tasks retrieved successfully
```json
{
  "success": true,
  "data": {
    "tasks": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```
- 401: Unauthorized

#### GET /tasks/:id
Retrieve a specific task

**Headers:**
- Authorization: Bearer <token>

**Response:**
- 200: Task retrieved successfully
- 401: Unauthorized
- 404: Task not found

#### POST /tasks
Create a new task

**Headers:**
- Authorization: Bearer <token>

**Request Body:**
```json
{
  "title": "Complete project proposal",
  "description": "Finish the project proposal document for client review",
  "status": "pending",
  "priority": "high",
  "dueDate": "2023-12-31T23:59:59Z",
  "categoryId": "category-id-here",
  "isRecurring": false,
  "recurrencePattern": null
}
```

**Response:**
- 201: Task created successfully
- 400: Validation error
- 401: Unauthorized

#### PUT /tasks/:id
Update an existing task

**Headers:**
- Authorization: Bearer <token>

**Request Body:**
```json
{
  "title": "Updated task title",
  "description": "Updated task description",
  "status": "in-progress",
  "priority": "medium",
  "dueDate": "2023-12-31T23:59:59Z",
  "categoryId": "category-id-here"
}
```

**Response:**
- 200: Task updated successfully
- 400: Validation error
- 401: Unauthorized
- 404: Task not found

#### DELETE /tasks/:id
Delete a specific task

**Headers:**
- Authorization: Bearer <token>

**Response:**
- 200: Task deleted successfully
- 401: Unauthorized
- 404: Task not found

#### PATCH /tasks/:id/status
Update only the status of a task

**Headers:**
- Authorization: Bearer <token>

**Request Body:**
```json
{
  "status": "completed"
}
```

**Response:**
- 200: Task status updated successfully
- 400: Validation error
- 401: Unauthorized
- 404: Task not found

### Category Management Endpoints

#### GET /categories
Retrieve user's categories

**Headers:**
- Authorization: Bearer <token>

**Response:**
- 200: Categories retrieved successfully
- 401: Unauthorized

#### POST /categories
Create a new category

**Headers:**
- Authorization: Bearer <token>

**Request Body:**
```json
{
  "name": "Work",
  "color": "#FF5733"
}
```

**Response:**
- 201: Category created successfully
- 400: Validation error
- 401: Unauthorized

#### PUT /categories/:id
Update a category

**Headers:**
- Authorization: Bearer <token>

**Request Body:**
```json
{
  "name": "Personal Projects",
  "color": "#33FF57"
}
```

**Response:**
- 200: Category updated successfully
- 400: Validation error
- 401: Unauthorized
- 404: Category not found

#### DELETE /categories/:id
Delete a category

**Headers:**
- Authorization: Bearer <token>

**Response:**
- 200: Category deleted successfully
- 401: Unauthorized
- 404: Category not found

### User Profile Endpoints

#### GET /profile
Retrieve current user's profile information

**Headers:**
- Authorization: Bearer <token>

**Response:**
- 200: Profile retrieved successfully
- 401: Unauthorized

#### PUT /profile
Update current user's profile information

**Headers:**
- Authorization: Bearer <token>

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

**Response:**
- 200: Profile updated successfully
- 400: Validation error
- 401: Unauthorized
- 409: Email already exists

#### GET /profile/stats
Retrieve user's task statistics

**Headers:**
- Authorization: Bearer <token>

**Response:**
- 200: Statistics retrieved successfully
```json
{
  "success": true,
  "data": {
    "totalTasks": 50,
    "completedTasks": 30,
    "pendingTasks": 15,
    "inProgressTasks": 5,
    "completionRate": 60.0,
    "productivityTrend": "increasing",
    "topCategories": [
      { "name": "Work", "count": 20 },
      { "name": "Personal", "count": 15 }
    ]
  }
}
```
- 401: Unauthorized

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| AUTH_001 | 401 | Invalid or expired token |
| AUTH_002 | 401 | Insufficient permissions |
| AUTH_003 | 400 | Invalid credentials |
| VALIDATION_001 | 400 | Validation error |
| RESOURCE_001 | 404 | Resource not found |
| RESOURCE_002 | 409 | Resource conflict |
| SERVER_001 | 500 | Internal server error |

## Rate Limiting
All endpoints are subject to rate limiting:
- Auth endpoints: 5 requests per minute per IP
- All other endpoints: 100 requests per minute per user

## Security Headers
All responses include:
- Strict-Transport-Security
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection

---

**Version**: 1.0.0
**Created**: 2026-01-12
**Last Updated**: 2026-01-12