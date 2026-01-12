# Database Specification for Todo Full-Stack Web Application

## Overview
This document defines the database schema for the Todo application using SQLModel with PostgreSQL via Neon Serverless.

## Database Technology
- PostgreSQL via Neon Serverless
- SQLModel ORM for Python
- Proper indexing and constraints

## Schema Design

### Users Table
Stores user account information

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

**Indexes:**
- `idx_users_email` ON `email` (UNIQUE)
- `idx_users_created_at` ON `created_at`

**Constraints:**
- `users_email_unique` - Email must be unique
- `users_email_format` - Email format validation
- `users_password_strength` - Password strength validation

### Tasks Table
Stores task information with user ownership

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

**Indexes:**
- `idx_tasks_user_id` ON `user_id`
- `idx_tasks_due_date` ON `due_date`
- `idx_tasks_status` ON `status`
- `idx_tasks_priority` ON `priority`
- `idx_tasks_created_at` ON `created_at`
- `idx_tasks_updated_at` ON `updated_at`
- `idx_tasks_user_status` ON `user_id, status` (composite)

**Constraints:**
- `tasks_user_id_fk` - Foreign key to users table
- `tasks_category_id_fk` - Foreign key to categories table
- `tasks_status_check` - Status must be one of allowed values
- `tasks_priority_check` - Priority must be one of allowed values

### Categories Table
Stores task categories for organization

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

**Indexes:**
- `idx_categories_user_id` ON `user_id`
- `idx_categories_user_name` ON `user_id, name` (composite, UNIQUE)

**Constraints:**
- `categories_user_id_fk` - Foreign key to users table
- `categories_user_name_unique` - User cannot have duplicate category names

### Refresh Tokens Table
Stores refresh tokens for authentication

```sql
CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    token VARCHAR(500) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_revoked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_refresh_tokens_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**Indexes:**
- `idx_refresh_tokens_user_id` ON `user_id`
- `idx_refresh_tokens_token` ON `token` (UNIQUE)
- `idx_refresh_tokens_expires_at` ON `expires_at`
- `idx_refresh_tokens_active` ON `expires_at, is_revoked` (partial index for active tokens)

**Constraints:**
- `refresh_tokens_user_id_fk` - Foreign key to users table
- `refresh_tokens_token_unique` - Token must be unique

### Password Reset Tokens Table
Stores password reset tokens

```sql
CREATE TABLE password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    token VARCHAR(500) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_password_reset_tokens_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**Indexes:**
- `idx_password_reset_tokens_user_id` ON `user_id`
- `idx_password_reset_tokens_token` ON `token` (UNIQUE)
- `idx_password_reset_tokens_expires_at` ON `expires_at`

**Constraints:**
- `password_reset_tokens_user_id_fk` - Foreign key to users table
- `password_reset_tokens_token_unique` - Token must be unique

### Email Verification Tokens Table
Stores email verification tokens

```sql
CREATE TABLE email_verification_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    token VARCHAR(500) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_email_verification_tokens_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**Indexes:**
- `idx_email_verification_tokens_user_id` ON `user_id`
- `idx_email_verification_tokens_token` ON `token` (UNIQUE)
- `idx_email_verification_tokens_expires_at` ON `expires_at`

**Constraints:**
- `email_verification_tokens_user_id_fk` - Foreign key to users table
- `email_verification_tokens_token_unique` - Token must be unique

## Relationships

### One-to-Many Relationships
- **Users → Tasks**: One user can have many tasks
- **Users → Categories**: One user can have many categories
- **Users → Refresh Tokens**: One user can have many refresh tokens
- **Users → Password Reset Tokens**: One user can have many password reset tokens
- **Users → Email Verification Tokens**: One user can have many email verification tokens

### Many-to-One Relationships
- **Tasks → Users**: Many tasks belong to one user
- **Tasks → Categories**: Many tasks can belong to one category (optional)
- **Refresh Tokens → Users**: Many refresh tokens belong to one user
- **Password Reset Tokens → Users**: Many password reset tokens belong to one user
- **Email Verification Tokens → Users**: Many email verification tokens belong to one user

## Security Considerations

### Data Encryption
- Passwords stored as bcrypt hashes
- Refresh tokens stored securely
- Sensitive data encrypted at rest where appropriate

### Access Control
- Row-level security through user_id foreign keys
- All user data isolated by user_id
- Cascade deletes prevent orphaned records

### Indexing Strategy
- Proper indexes on foreign keys
- Composite indexes for common query patterns
- Indexes on frequently searched columns (due_date, status, priority)

## Performance Considerations

### Query Optimization
- Proper indexing on commonly queried fields
- Efficient JOIN operations through indexed foreign keys
- Partitioning for large tables if needed

### Connection Management
- Connection pooling for application
- Prepared statements for repeated queries
- Batch operations for bulk inserts/updates

## Data Integrity

### Constraints
- Foreign key constraints to maintain referential integrity
- Check constraints for valid values
- Unique constraints to prevent duplicates

### Validation
- Server-side validation in addition to database constraints
- Proper data types to prevent type-related issues
- Timestamps for audit trails

## Migration Strategy

### Version Control
- Database migrations versioned alongside application code
- Downgrade capability for rollbacks
- Test migrations in staging environment

### Backup Strategy
- Automated backups with point-in-time recovery
- Regular backup verification
- Disaster recovery procedures

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
  AND due_date < NOW()
  AND status != 'completed';
```

### User Statistics Queries
```sql
-- Get user's task statistics
SELECT
  COUNT(*) as total_tasks,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_tasks,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_tasks,
  COUNT(CASE WHEN status = 'in-progress' THEN 1 END) as in_progress_tasks
FROM tasks
WHERE user_id = $1;
```

---

**Version**: 1.0.0
**Created**: 2026-01-12
**Last Updated**: 2026-01-12