# Database Schema Documentation

## Overview

The Todo Web Application uses a PostgreSQL database with the following entities:

- **Users**: Store user account information
- **Categories**: Organize tasks into groups
- **Tasks**: Individual todo items assigned to users

## Entity Relationship Diagram

```
Users ||--o{ Tasks : "has many"
Users ||--o{ Categories : "has many"
Categories ||--o{ Tasks : "contains"
```

## Table Details

### Users Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier for the user |
| email | VARCHAR | UNIQUE, NOT NULL | User's email address |
| first_name | VARCHAR | NOT NULL | User's first name |
| last_name | VARCHAR | NOT NULL | User's last name |
| is_active | BOOLEAN | DEFAULT TRUE | Whether the account is active |
| is_verified | BOOLEAN | DEFAULT FALSE | Whether the email is verified |
| hashed_password | VARCHAR | NOT NULL | BCrypt hashed password |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Account creation timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

### Categories Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier for the category |
| name | VARCHAR | NOT NULL | Category name |
| description | TEXT | | Category description |
| user_id | UUID | FOREIGN KEY(users.id) | Owner of the category |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

### Tasks Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier for the task |
| title | VARCHAR | NOT NULL | Task title |
| description | TEXT | | Task description |
| status | VARCHAR | NOT NULL, DEFAULT 'pending' | Task status (pending, in-progress, completed) |
| priority | VARCHAR | NOT NULL, DEFAULT 'medium' | Task priority (low, medium, high) |
| due_date | TIMESTAMP | | Due date for the task |
| completed_at | TIMESTAMP | | Completion timestamp |
| user_id | UUID | FOREIGN KEY(users.id) | Owner of the task |
| category_id | UUID | FOREIGN KEY(categories.id) | Associated category |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

## Indexes

The following indexes are created for performance optimization:

- `idx_users_email`: Index on users.email for fast login lookups
- `idx_users_created_at`: Index on users.created_at for chronological queries
- `idx_tasks_user_id`: Index on tasks.user_id for user-specific queries
- `idx_tasks_status`: Index on tasks.status for status filtering
- `idx_tasks_priority`: Index on tasks.priority for priority filtering
- `idx_tasks_due_date`: Index on tasks.due_date for due date queries
- `idx_tasks_created_at`: Index on tasks.created_at for chronological queries
- `idx_tasks_updated_at`: Index on tasks.updated_at for modification tracking
- `idx_tasks_category_id`: Index on tasks.category_id for category filtering
- `idx_categories_user_id`: Index on categories.user_id for user-specific queries
- `idx_categories_name`: Index on categories.name for name searches

## Relationships

1. **User to Tasks (One-to-Many)**: A user can have many tasks, but each task belongs to only one user.

2. **User to Categories (One-to-Many)**: A user can have many categories, but each category belongs to only one user.

3. **Category to Tasks (One-to-Many)**: A category can contain many tasks, but each task can belong to only one category (optional).

## Data Integrity

- Foreign key constraints ensure referential integrity
- Unique constraints prevent duplicate emails
- NOT NULL constraints ensure required fields are populated
- Default values ensure consistent behavior for optional fields

## Security Considerations

- Passwords are stored as BCrypt hashes (never in plain text)
- User isolation is enforced through foreign key relationships
- Only the owner of a resource can access it (enforced by application logic)