# Users Database Specification for Todo Application

## Overview
This document defines the users database schema for the Todo application using SQLModel with PostgreSQL via Neon Serverless.

## Database Technology
- PostgreSQL via Neon Serverless
- SQLModel ORM for Python
- Proper indexing and constraints for performance

## Users Table

### Schema Definition
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

### Field Specifications

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier for the user |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User's email address |
| password_hash | VARCHAR(255) | NOT NULL | BCrypt hash of user's password |
| first_name | VARCHAR(100) | NULL | User's first name |
| last_name | VARCHAR(100) | NULL | User's last name |
| avatar_url | TEXT | NULL | URL to user's profile picture |
| is_active | BOOLEAN | DEFAULT TRUE | Whether the user account is active |
| is_verified | BOOLEAN | DEFAULT FALSE | Whether the email has been verified |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | Timestamp when user was created |
| updated_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | Timestamp when user was last updated |

### Indexes
- `idx_users_email` ON `email` (UNIQUE) - For fast email lookups during authentication
- `idx_users_created_at` ON `created_at` - For chronological queries
- `idx_users_updated_at` ON `updated_at` - For tracking last modifications

### Constraints
- `users_email_unique` - Email must be unique across all users
- `users_email_format` - Email format validation (application level)
- `users_password_strength` - Password strength validation (application level)

### Validation Rules
- Email: Must be valid email format, unique in system
- Password: Must be properly hashed using BCrypt or similar
- First/Last Name: Maximum 100 characters each
- Avatar URL: Valid URL format (application level)

## Refresh Tokens Table

### Schema Definition
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

### Field Specifications

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier for the token |
| user_id | UUID | NOT NULL, FOREIGN KEY | Reference to user who owns this token |
| token | VARCHAR(500) | NOT NULL | The refresh token string |
| expires_at | TIMESTAMP WITH TIME ZONE | NOT NULL | When the token expires |
| is_revoked | BOOLEAN | DEFAULT FALSE | Whether the token has been revoked |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | When the token was created |

### Indexes
- `idx_refresh_tokens_user_id` ON `user_id` - For user token lookups
- `idx_refresh_tokens_token` ON `token` (UNIQUE) - For fast token validation
- `idx_refresh_tokens_expires_at` ON `expires_at` - For cleanup queries
- `idx_refresh_tokens_active` ON `expires_at, is_revoked` (partial) - For active token queries

### Constraints
- `refresh_tokens_user_id_fk` - Foreign key to users table with cascade delete
- `refresh_tokens_token_unique` - Token must be unique system-wide

## Password Reset Tokens Table

### Schema Definition
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

### Field Specifications

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier for the token |
| user_id | UUID | NOT NULL, FOREIGN KEY | Reference to user who requested reset |
| token | VARCHAR(500) | NOT NULL | The password reset token string |
| expires_at | TIMESTAMP WITH TIME ZONE | NOT NULL | When the token expires |
| used_at | TIMESTAMP WITH TIME ZONE | NULL | When the token was used (if used) |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | When the token was created |

### Indexes
- `idx_password_reset_tokens_user_id` ON `user_id` - For user token lookups
- `idx_password_reset_tokens_token` ON `token` (UNIQUE) - For fast token validation
- `idx_password_reset_tokens_expires_at` ON `expires_at` - For cleanup queries

### Constraints
- `password_reset_tokens_user_id_fk` - Foreign key to users table with cascade delete
- `password_reset_tokens_token_unique` - Token must be unique system-wide

## Email Verification Tokens Table

### Schema Definition
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

### Field Specifications

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier for the token |
| user_id | UUID | NOT NULL, FOREIGN KEY | Reference to user who needs verification |
| token | VARCHAR(500) | NOT NULL | The email verification token string |
| expires_at | TIMESTAMP WITH TIME ZONE | NOT NULL | When the token expires |
| used_at | TIMESTAMP WITH TIME ZONE | NULL | When the token was used (if used) |
| created_at | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | When the token was created |

### Indexes
- `idx_email_verification_tokens_user_id` ON `user_id` - For user token lookups
- `idx_email_verification_tokens_token` ON `token` (UNIQUE) - For fast token validation
- `idx_email_verification_tokens_expires_at` ON `expires_at` - For cleanup queries

### Constraints
- `email_verification_tokens_user_id_fk` - Foreign key to users table with cascade delete
- `email_verification_tokens_token_unique` - Token must be unique system-wide

## Relationships

### One-to-Many Relationships
- **Users → Refresh Tokens**: One user can have many refresh tokens
- **Users → Password Reset Tokens**: One user can have many password reset tokens
- **Users → Email Verification Tokens**: One user can have many email verification tokens

### Many-to-One Relationships
- **Refresh Tokens → Users**: Many refresh tokens belong to one user
- **Password Reset Tokens → Users**: Many password reset tokens belong to one user
- **Email Verification Tokens → Users**: Many email verification tokens belong to one user

## Security Considerations

### Data Encryption
- Passwords stored as BCrypt hashes with salt
- Refresh tokens stored securely with proper length
- Token values should be cryptographically secure random strings
- Sensitive data encrypted at rest where appropriate

### Access Control
- Row-level security through user_id foreign keys
- All user data isolated by user_id
- Cascade deletes prevent orphaned authentication records
- Proper token revocation mechanisms

### Indexing Strategy
- Proper indexes on foreign keys for JOIN operations
- Unique indexes on token fields for fast validation
- Indexes on expiration fields for cleanup operations

## Performance Considerations

### Query Optimization
- Efficient JOIN operations through indexed foreign keys
- Proper indexing on commonly queried fields
- Batch operations for token cleanup
- Prepared statements for repeated queries

### Connection Management
- Connection pooling for authentication operations
- Efficient token validation queries
- Bulk operations for token cleanup

## Data Integrity

### Constraints
- Foreign key constraints to maintain referential integrity
- Unique constraints to prevent duplicate tokens
- NOT NULL constraints on required fields
- Proper timestamp defaults

### Validation
- Server-side validation in addition to database constraints
- Proper data types to prevent type-related issues
- Timestamps for audit trails and cleanup

## Migration Strategy

### Version Control
- Database migrations versioned alongside application code
- Downgrade capability for rollbacks
- Test migrations in staging environment

### Cleanup Operations
- Automatic cleanup of expired tokens via scheduled jobs
- Manual cleanup endpoints for administrative purposes
- Proper handling of cascade deletes

## Sample Queries

### Common User Queries
```sql
-- Get user by email
SELECT * FROM users WHERE email = $1;

-- Check if email exists
SELECT COUNT(*) FROM users WHERE email = $1;

-- Update user profile
UPDATE users
SET first_name = $2, last_name = $3, avatar_url = $4, updated_at = CURRENT_TIMESTAMP
WHERE id = $1;

-- Verify user email
UPDATE users
SET is_verified = TRUE, updated_at = CURRENT_TIMESTAMP
WHERE id = $1;
```

### Common Token Queries
```sql
-- Validate refresh token
SELECT u.id, u.email, u.is_active
FROM refresh_tokens rt
JOIN users u ON rt.user_id = u.id
WHERE rt.token = $1
  AND rt.expires_at > NOW()
  AND rt.is_revoked = FALSE
  AND u.is_active = TRUE;

-- Revoke refresh token
UPDATE refresh_tokens
SET is_revoked = TRUE
WHERE token = $1;

-- Cleanup expired tokens
DELETE FROM refresh_tokens WHERE expires_at < NOW();
DELETE FROM password_reset_tokens WHERE expires_at < NOW() AND used_at IS NULL;
DELETE FROM email_verification_tokens WHERE expires_at < NOW() AND used_at IS NULL;
```

## Audit Trail
- Created_at and updated_at timestamps on all tables
- Proper logging of authentication events
- Token usage tracking where applicable
- Account modification tracking

---

**Version**: 1.0.0
**Created**: 2026-01-12
**Last Updated**: 2026-01-12