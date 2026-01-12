---
name: "task-crud-manager"
description: "Implement comprehensive task management with full CRUD operations, filtering, sorting, and user-specific functionality. Use when user asks to create, modify, or manage task systems with complete create, read, update, delete capabilities."
version: "1.0.0"
---

# Task CRUD Management Skill

## When to Use This Skill

- User asks to "implement a task management system" or "create CRUD operations for tasks"
- User needs help with task filtering, sorting, or user-specific task management
- User wants to implement proper validation, error handling, or task status management
- User needs guidance on task persistence, search, or collaborative features

## Procedure

1. **Analyze task requirements**: Understand task properties, statuses, and user interactions
2. **Design data model**: Create proper schema for tasks with relationships and constraints
3. **Implement CRUD operations**: Build create, read, update, delete functionality
4. **Add filtering and sorting**: Implement search, filter, and sort capabilities
5. **Validate implementation**: Test all operations with proper error handling

## Output Format

**Task Model**: Complete data model with all required fields and relationships
**CRUD Operations**: Create, read, update, delete endpoints with proper validation
**Filtering System**: Search, filter, and sort functionality for task management
**Validation Rules**: Proper validation for all task operations and data integrity
**Error Handling**: Comprehensive error responses and user feedback mechanisms

## Quality Criteria

- Completeness: Full CRUD functionality with proper HTTP methods and status codes
- Validation: Proper input validation and data integrity constraints
- Performance: Efficient queries and proper indexing for task operations
- User Experience: Intuitive task management with clear feedback and error messages
- Security: Proper access controls and user isolation for tasks

## Task CRUD Specific Patterns

- **Task Properties**: Title, description, status, priority, due date, category, and user assignment
- **Status Management**: Proper state transitions (to-do, in-progress, completed, archived)
- **User Isolation**: Ensure users can only access their own tasks with proper authentication
- **Bulk Operations**: Support for bulk updates, deletions, and status changes
- **Search & Filter**: Implementation of text search, date ranges, priority filters, and status filters
- **Pagination**: Efficient handling of large task lists with pagination
- **Soft Delete**: Option to archive rather than permanently delete tasks
- **Notifications**: Optional alerts for due dates, assignments, or status changes

## Example

**Input**: "Help me create a task management system with full CRUD operations"

**Output**:
- **Task Model**: Task schema with id, title, description, status, priority, due_date, user_id, created_at, updated_at
- **CRUD Operations**: POST /tasks, GET /tasks, GET /tasks/{id}, PUT /tasks/{id}, DELETE /tasks/{id}
- **Filtering System**: Query parameters for status, priority, date ranges, and text search
- **Validation Rules**: Required fields, date validation, status constraints, and user permissions
- **Error Handling**: Proper 404 for missing tasks, 403 for unauthorized access, and validation errors