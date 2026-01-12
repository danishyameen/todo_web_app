# Tasks Database Specification for Todo Application

## Overview
This document defines the tasks database schema for the Todo application using SQLModel with PostgreSQL via Neon Serverless.

## Database Technology
- PostgreSQL via Neon Serverless
- SQLModel ORM for Python
- Proper indexing and constraints for performance

## Tasks Table

### Schema Definition
```sql
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    priority VARCHAR(10) DEFAULT 'medium',
    due_date TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    category_id UUID,
    is_recurring BOOLEAN DEFAULT FALSE,
    recurrence_pattern JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_tasks_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_tasks_category_id FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    CONSTRAINT chk_tasks_status CHECK (status IN ('pending', 'in-progress', 'completed')),
    CONSTRAINT chk_tasks_priority CHECK (priority IN ('low', 'medium', 'high'))
);
```

### Field Specifications

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier for the task |
| user_id | UUID | NOT NULL, FOREIGN KEY | Reference to user who owns this task |
| title | VARCHAR(255) | NOT NULL | Task title |
| description | TEXT | NULL | Detailed task description |
| status | VARCHAR(20) | DEFAULT 'pending', CHECK | Task status: pending/in-progress/completed |
| priority | VARCHAR(10) | DEFAULT 'medium', CHECK | Task priority: low/medium/high |
| due_date | TIMESTAMP WITH TIME ZONE | NULL | When the task is due |
| completed_at | TIMESTAMP WITH TIME ZONE | NULL | When the task was completed |
| category_id | UUID | NULL, FOREIGN KEY | Reference to category (optional) |
| is_recurring | BOOLEAN | DEFAULT FALSE | Whether this is a recurring task |
| recurrence_pattern | JSONB | NULL | Recurrence configuration (if recurring) |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | When the task was created |
| updated_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | When the task was last updated |

### Indexes
- `idx_tasks_user_id` ON `user_id` - For user-specific task queries
- `idx_tasks_due_date` ON `due_date` - For due date filtering
- `idx_tasks_status` ON `status` - For status filtering
- `idx_tasks_priority` ON `priority` - For priority filtering
- `idx_tasks_created_at` ON `created_at` - For chronological ordering
- `idx_tasks_updated_at` ON `updated_at` - For tracking last modifications
- `idx_tasks_user_status` ON `user_id, status` (composite) - For user and status filtering
- `idx_tasks_user_priority` ON `user_id, priority` (composite) - For user and priority filtering
- `idx_tasks_user_due_date` ON `user_id, due_date` (composite) - For user and due date queries
- `idx_tasks_overdue` ON `user_id, due_date, status` (partial) - For overdue task queries

### Constraints
- `tasks_user_id_fk` - Foreign key to users table with cascade delete
- `tasks_category_id_fk` - Foreign key to categories table with set null on delete
- `tasks_status_check` - Status must be one of allowed values
- `tasks_priority_check` - Priority must be one of allowed values

## Categories Table

### Schema Definition
```sql
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(7) DEFAULT '#000000', -- Hex color code
    icon VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_categories_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Field Specifications

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier for the category |
| user_id | UUID | NOT NULL, FOREIGN KEY | Reference to user who owns this category |
| name | VARCHAR(100) | NOT NULL | Category name |
| color | VARCHAR(7) | DEFAULT '#000000' | Hex color code for category |
| icon | VARCHAR(50) | NULL | Icon identifier for category |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | When the category was created |
| updated_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | When the category was last updated |

### Indexes
- `idx_categories_user_id` ON `user_id` - For user-specific category queries
- `idx_categories_user_name` ON `user_id, name` (composite, UNIQUE) - For preventing duplicate category names per user

### Constraints
- `categories_user_id_fk` - Foreign key to users table with cascade delete
- `categories_user_name_unique` - User cannot have duplicate category names

## Recurring Task Instances Table (Optional Enhancement)

### Schema Definition
```sql
CREATE TABLE recurring_task_instances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_task_id UUID NOT NULL,
    instance_date DATE NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_recurring_task_instances_parent_task_id FOREIGN KEY (parent_task_id) REFERENCES tasks(id) ON DELETE CASCADE
);
```

### Field Specifications

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier for the instance |
| parent_task_id | UUID | NOT NULL, FOREIGN KEY | Reference to parent recurring task |
| instance_date | DATE | NOT NULL | Date when this instance is due |
| is_completed | BOOLEAN | DEFAULT FALSE | Whether this instance is completed |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | When the instance was created |

### Indexes
- `idx_recurring_instances_parent_task_id` ON `parent_task_id` - For parent task queries
- `idx_recurring_instances_instance_date` ON `instance_date` - For date-based queries
- `idx_recurring_instances_parent_date` ON `parent_task_id, instance_date` (composite) - For parent and date queries

### Constraints
- `recurring_instances_parent_task_id_fk` - Foreign key to tasks table with cascade delete

## Relationships

### One-to-Many Relationships
- **Users → Tasks**: One user can have many tasks
- **Users → Categories**: One user can have many categories
- **Tasks → Recurring Task Instances**: One task can have many instances (if recurring)

### Many-to-One Relationships
- **Tasks → Users**: Many tasks belong to one user
- **Tasks → Categories**: Many tasks can belong to one category (optional)
- **Recurring Task Instances → Tasks**: Many instances belong to one parent task

### Many-to-Many Relationships (Implicit)
- Tasks and users have a many-to-one relationship through the user_id foreign key

## Security Considerations

### Data Encryption
- Sensitive task data encrypted at rest where appropriate
- Proper access controls through user_id foreign keys
- Encrypted transport for all database connections

### Access Control
- Row-level security through user_id foreign keys
- All task data isolated by user_id
- Cascade deletes prevent orphaned records
- Proper authorization checks at application level

### Indexing Strategy
- Proper indexes on foreign keys for JOIN operations
- Composite indexes for common query patterns
- Indexes on frequently searched columns (due_date, status, priority)

## Performance Considerations

### Query Optimization
- Proper indexing on commonly queried fields
- Efficient JOIN operations through indexed foreign keys
- Partitioning for large tasks tables if needed
- Prepared statements for repeated queries

### Connection Management
- Connection pooling for task operations
- Efficient queries with proper indexing
- Batch operations for bulk task updates

## Data Integrity

### Constraints
- Foreign key constraints to maintain referential integrity
- Check constraints for valid status and priority values
- Unique constraints to prevent duplicates
- NOT NULL constraints on required fields

### Validation
- Server-side validation in addition to database constraints
- Proper data types to prevent type-related issues
- Timestamps for audit trails and tracking

## Migration Strategy

### Version Control
- Database migrations versioned alongside application code
- Downgrade capability for rollbacks
- Test migrations in staging environment

### Data Migration
- Proper handling of existing tasks during schema changes
- Migration of recurrence patterns from older formats
- Backup and restore procedures for critical data

## Sample Queries

### Common Task Queries
```sql
-- Get user's tasks with filtering and pagination
SELECT * FROM tasks
WHERE user_id = $1
  AND status = $2
ORDER BY created_at DESC
LIMIT $3 OFFSET $4;

-- Get overdue tasks for a user
SELECT * FROM tasks
WHERE user_id = $1
  AND due_date < CURRENT_TIMESTAMP
  AND status != 'completed';

-- Get tasks by priority
SELECT * FROM tasks
WHERE user_id = $1
  AND priority = $2
ORDER BY due_date ASC;

-- Get tasks by category
SELECT t.*, c.name as category_name
FROM tasks t
LEFT JOIN categories c ON t.category_id = c.id
WHERE t.user_id = $1
  AND t.category_id = $2;

-- Update task status and completion time
UPDATE tasks
SET status = $2,
    completed_at = CASE
        WHEN $2 = 'completed' THEN CURRENT_TIMESTAMP
        ELSE completed_at
    END,
    updated_at = CURRENT_TIMESTAMP
WHERE id = $1 AND user_id = $3;
```

### Common Category Queries
```sql
-- Get user's categories
SELECT * FROM categories
WHERE user_id = $1
ORDER BY name ASC;

-- Create category with user verification
INSERT INTO categories (user_id, name, color, icon)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- Check for duplicate category names
SELECT COUNT(*) FROM categories
WHERE user_id = $1 AND LOWER(name) = LOWER($2);
```

### Task Statistics Queries
```sql
-- Get user's task statistics
SELECT
  COUNT(*) as total_tasks,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_tasks,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_tasks,
  COUNT(CASE WHEN status = 'in-progress' THEN 1 END) as in_progress_tasks,
  COUNT(CASE WHEN due_date < CURRENT_TIMESTAMP AND status != 'completed' THEN 1 END) as overdue_tasks
FROM tasks
WHERE user_id = $1;

-- Get task distribution by priority
SELECT
  priority,
  COUNT(*) as count
FROM tasks
WHERE user_id = $1
GROUP BY priority;

-- Get task distribution by category
SELECT
  c.name as category_name,
  COUNT(t.id) as task_count
FROM tasks t
LEFT JOIN categories c ON t.category_id = c.id
WHERE t.user_id = $1
GROUP BY c.id, c.name
ORDER BY task_count DESC;
```

## Audit Trail
- Created_at and updated_at timestamps on all tables
- Proper tracking of task status changes
- Category assignment history (optional)
- Task completion tracking

## Cleanup Operations
- Automatic cleanup of completed recurring task instances
- Archive old tasks after configurable period
- Purge soft-deleted tasks after retention period

---

**Version**: 1.0.0
**Created**: 2026-01-12
**Last Updated**: 2026-01-12