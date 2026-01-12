# Task Management API Specification for Todo Application

## Overview
This document defines the task management API endpoints for the Todo application, including CRUD operations, filtering, sorting, and category management.

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

## Task Endpoints

### GET /tasks
Retrieve user's tasks with optional filtering and pagination

**Headers:**
- Authorization: Bearer `<token>`

**Query Parameters:**
- `page`: Page number (default: 1, minimum: 1)
- `limit`: Items per page (default: 10, max: 100)
- `status`: Filter by status (optional: pending, in-progress, completed)
- `priority`: Filter by priority (optional: low, medium, high)
- `category`: Filter by category ID (optional)
- `search`: Search term for title/description (optional)
- `dueDateFrom`: Filter tasks with due date after this date (optional, ISO 8601 format)
- `dueDateTo`: Filter tasks with due date before this date (optional, ISO 8601 format)
- `sortBy`: Sort field (optional: createdAt, updatedAt, dueDate, priority, title)
- `sortOrder`: Sort order (optional: asc, desc, default: desc)

**Response:**
- 200: Tasks retrieved successfully
```json
{
  "success": true,
  "data": {
    "tasks": [
      {
        "id": "uuid-string",
        "title": "Complete project proposal",
        "description": "Finish the project proposal document for client review",
        "status": "pending",
        "priority": "high",
        "dueDate": "2023-12-31T23:59:59Z",
        "completedAt": null,
        "categoryId": "category-uuid",
        "isRecurring": false,
        "recurrencePattern": null,
        "createdAt": "2023-01-01T00:00:00Z",
        "updatedAt": "2023-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "hasNext": true,
      "hasPrev": false,
      "itemsPerPage": 10
    }
  }
}
```
- 400: Invalid query parameters
- 401: Unauthorized

### GET /tasks/:id
Retrieve a specific task

**Headers:**
- Authorization: Bearer `<token>`

**Response:**
- 200: Task retrieved successfully
```json
{
  "success": true,
  "data": {
    "task": {
      "id": "uuid-string",
      "title": "Complete project proposal",
      "description": "Finish the project proposal document for client review",
      "status": "pending",
      "priority": "high",
      "dueDate": "2023-12-31T23:59:59Z",
      "completedAt": null,
      "categoryId": "category-uuid",
      "isRecurring": false,
      "recurrencePattern": null,
      "createdAt": "2023-01-01T00:00:00Z",
      "updatedAt": "2023-01-01T00:00:00Z"
    }
  }
}
```
- 401: Unauthorized
- 404: Task not found

### POST /tasks
Create a new task

**Headers:**
- Authorization: Bearer `<token>`

**Request Body:**
```json
{
  "title": "Complete project proposal",
  "description": "Finish the project proposal document for client review",
  "status": "pending",
  "priority": "high",
  "dueDate": "2023-12-31T23:59:59Z",
  "categoryId": "category-uuid",
  "isRecurring": false,
  "recurrencePattern": null
}
```

**Validation:**
- title: Required, 1-255 characters
- description: Optional, 0-1000 characters
- status: Required, one of ['pending', 'in-progress', 'completed']
- priority: Required, one of ['low', 'medium', 'high']
- dueDate: Optional, ISO 8601 format
- categoryId: Optional, valid UUID format
- isRecurring: Required, boolean
- recurrencePattern: Optional, object with recurrence configuration

**Response:**
- 201: Task created successfully
```json
{
  "success": true,
  "data": {
    "task": {
      "id": "uuid-string",
      "title": "Complete project proposal",
      "description": "Finish the project proposal document for client review",
      "status": "pending",
      "priority": "high",
      "dueDate": "2023-12-31T23:59:59Z",
      "completedAt": null,
      "categoryId": "category-uuid",
      "isRecurring": false,
      "recurrencePattern": null,
      "createdAt": "2023-01-01T00:00:00Z",
      "updatedAt": "2023-01-01T00:00:00Z"
    }
  },
  "message": "Task created successfully"
}
```
- 400: Validation error
- 401: Unauthorized

### PUT /tasks/:id
Update an existing task

**Headers:**
- Authorization: Bearer `<token>`

**Request Body:**
```json
{
  "title": "Updated task title",
  "description": "Updated task description",
  "status": "in-progress",
  "priority": "medium",
  "dueDate": "2023-12-31T23:59:59Z",
  "categoryId": "category-uuid"
}
```

**Response:**
- 200: Task updated successfully
```json
{
  "success": true,
  "data": {
    "task": {
      "id": "uuid-string",
      "title": "Updated task title",
      "description": "Updated task description",
      "status": "in-progress",
      "priority": "medium",
      "dueDate": "2023-12-31T23:59:59Z",
      "completedAt": null,
      "categoryId": "category-uuid",
      "isRecurring": false,
      "recurrencePattern": null,
      "createdAt": "2023-01-01T00:00:00Z",
      "updatedAt": "2023-01-02T00:00:00Z"
    }
  },
  "message": "Task updated successfully"
}
```
- 400: Validation error
- 401: Unauthorized
- 404: Task not found

### DELETE /tasks/:id
Delete a specific task

**Headers:**
- Authorization: Bearer `<token>`

**Response:**
- 200: Task deleted successfully
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```
- 401: Unauthorized
- 404: Task not found

### PATCH /tasks/:id/status
Update only the status of a task

**Headers:**
- Authorization: Bearer `<token>`

**Request Body:**
```json
{
  "status": "completed"
}
```

**Validation:**
- status: Required, one of ['pending', 'in-progress', 'completed']

**Response:**
- 200: Task status updated successfully
```json
{
  "success": true,
  "data": {
    "task": {
      "id": "uuid-string",
      "title": "Complete project proposal",
      "status": "completed",
      "completedAt": "2023-01-02T10:30:00Z",
      "updatedAt": "2023-01-02T10:30:00Z"
    }
  },
  "message": "Task status updated successfully"
}
```
- 400: Validation error
- 401: Unauthorized
- 404: Task not found

### POST /tasks/:id/duplicate
Create a copy of an existing task

**Headers:**
- Authorization: Bearer `<token>`

**Response:**
- 201: Task duplicated successfully
```json
{
  "success": true,
  "data": {
    "task": {
      "id": "new-uuid-string",
      "title": "Copy of Complete project proposal",
      "description": "Finish the project proposal document for client review",
      "status": "pending",
      "priority": "high",
      "dueDate": "2023-12-31T23:59:59Z",
      "completedAt": null,
      "categoryId": "category-uuid",
      "isRecurring": false,
      "recurrencePattern": null,
      "createdAt": "2023-01-02T00:00:00Z",
      "updatedAt": "2023-01-02T00:00:00Z"
    }
  },
  "message": "Task duplicated successfully"
}
```
- 401: Unauthorized
- 404: Task not found

## Category Endpoints

### GET /categories
Retrieve user's categories

**Headers:**
- Authorization: Bearer `<token>`

**Response:**
- 200: Categories retrieved successfully
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "category-uuid",
        "name": "Work",
        "color": "#3B82F6",
        "icon": "briefcase",
        "createdAt": "2023-01-01T00:00:00Z",
        "updatedAt": "2023-01-01T00:00:00Z"
      }
    ]
  }
}
```
- 401: Unauthorized

### POST /categories
Create a new category

**Headers:**
- Authorization: Bearer `<token>`

**Request Body:**
```json
{
  "name": "Work",
  "color": "#3B82F6",
  "icon": "briefcase"
}
```

**Validation:**
- name: Required, 1-100 characters
- color: Optional, hex color format (default: #000000)
- icon: Optional, 1-50 characters

**Response:**
- 201: Category created successfully
```json
{
  "success": true,
  "data": {
    "category": {
      "id": "category-uuid",
      "name": "Work",
      "color": "#3B82F6",
      "icon": "briefcase",
      "createdAt": "2023-01-02T00:00:00Z",
      "updatedAt": "2023-01-02T00:00:00Z"
    }
  },
  "message": "Category created successfully"
}
```
- 400: Validation error
- 401: Unauthorized

### PUT /categories/:id
Update a category

**Headers:**
- Authorization: Bearer `<token>`

**Request Body:**
```json
{
  "name": "Personal Projects",
  "color": "#10B981",
  "icon": "folder"
}
```

**Response:**
- 200: Category updated successfully
```json
{
  "success": true,
  "data": {
    "category": {
      "id": "category-uuid",
      "name": "Personal Projects",
      "color": "#10B981",
      "icon": "folder",
      "createdAt": "2023-01-01T00:00:00Z",
      "updatedAt": "2023-01-02T00:00:00Z"
    }
  },
  "message": "Category updated successfully"
}
```
- 400: Validation error
- 401: Unauthorized
- 404: Category not found

### DELETE /categories/:id
Delete a category

**Headers:**
- Authorization: Bearer `<token>`

**Response:**
- 200: Category deleted successfully
```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```
- 401: Unauthorized
- 404: Category not found

## Bulk Operations

### POST /tasks/bulk-update
Update multiple tasks at once

**Headers:**
- Authorization: Bearer `<token>`

**Request Body:**
```json
{
  "taskIds": ["uuid1", "uuid2", "uuid3"],
  "updates": {
    "status": "completed"
  }
}
```

**Response:**
- 200: Bulk update successful
```json
{
  "success": true,
  "data": {
    "updatedCount": 3,
    "failedCount": 0
  },
  "message": "Successfully updated 3 tasks"
}
```
- 400: Validation error
- 401: Unauthorized

### POST /tasks/bulk-delete
Delete multiple tasks at once

**Headers:**
- Authorization: Bearer `<token>`

**Request Body:**
```json
{
  "taskIds": ["uuid1", "uuid2", "uuid3"]
}
```

**Response:**
- 200: Bulk delete successful
```json
{
  "success": true,
  "data": {
    "deletedCount": 3
  },
  "message": "Successfully deleted 3 tasks"
}
```
- 400: Validation error
- 401: Unauthorized

## Statistics Endpoints

### GET /tasks/stats
Retrieve user's task statistics

**Headers:**
- Authorization: Bearer `<token>`

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
    "overdueTasks": 2,
    "completionRate": 60.0,
    "productivityTrend": "increasing",
    "topCategories": [
      { "id": "category-uuid", "name": "Work", "count": 20 },
      { "id": "category-uuid2", "name": "Personal", "count": 15 }
    ],
    "tasksByPriority": {
      "high": 10,
      "medium": 25,
      "low": 15
    }
  }
}
```
- 401: Unauthorized

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| AUTH_001 | 401 | Invalid or expired token |
| AUTH_002 | 403 | Insufficient permissions |
| VALIDATION_001 | 400 | Validation error |
| RESOURCE_001 | 404 | Task or category not found |
| RESOURCE_002 | 409 | Resource conflict |
| SERVER_001 | 500 | Internal server error |

## Rate Limiting
- All endpoints: 100 requests per minute per user
- Bulk operations: 10 requests per minute per user

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