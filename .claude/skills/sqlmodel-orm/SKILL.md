---
name: "sqlmodel-orm-developer"
description: "Design and implement database schemas with SQLModel, combining SQLAlchemy's power with Pydantic's validation. Use when user asks to create, modify, or optimize database models with SQLModel."
version: "1.0.0"
---

# SQLModel ORM Development Skill

## When to Use This Skill

- User asks to "create database models" or "design database schema" with SQLModel
- User needs help with relationships, migrations, or complex queries
- User wants to implement proper validation, constraints, or indexing strategies
- User needs guidance on session management, transactions, or performance optimization

## Procedure

1. **Analyze data requirements**: Understand entities, relationships, and business rules
2. **Design models**: Create SQLModel classes with proper fields, constraints, and relationships
3. **Implement relationships**: Define foreign keys, one-to-many, many-to-many relationships
4. **Configure database**: Set up connection pools, session management, and transaction handling
5. **Optimize queries**: Create indexes, implement efficient query patterns, and handle performance

## Output Format

**Model Definitions**: SQLModel classes with proper field types, constraints, and relationships
**Relationship Mapping**: Foreign key relationships and association tables
**Database Configuration**: Connection settings, session management, and transaction patterns
**Query Patterns**: Common query implementations with proper error handling
**Migration Strategy**: Alembic configuration and migration patterns for schema changes

## Quality Criteria

- Validation: Full use of Pydantic validation in SQLModel fields and constraints
- Performance: Proper indexing, efficient queries, and optimized relationship loading
- Integrity: Foreign key constraints, unique constraints, and data consistency
- Maintainability: Clear model relationships and proper separation of concerns
- Security: Proper input sanitization and protection against SQL injection

## SQLModel Specific Patterns

- **Model Inheritance**: Use SQLModel as base class for both table and pure Pydantic models
- **Field Constraints**: Leverage SQLModel field options (primary_key, unique, nullable, etc.)
- **Relationships**: Implement proper foreign key relationships with back_populates
- **Session Management**: Use async sessions for FastAPI integration and proper transaction handling
- **Query Building**: Leverage SQLAlchemy Core expressions with SQLModel models
- **Validation**: Combine database constraints with Pydantic validation
- **Migrations**: Integrate with Alembic for proper schema versioning

## Example

**Input**: "Help me create a database schema for a blog with users, posts, and comments"

**Output**:
- **Model Definitions**: User, Post, Comment models with proper fields and constraints
- **Relationship Mapping**: User.posts, Post.comments, User.comments relationships
- **Database Configuration**: Async session setup with connection pooling
- **Query Patterns**: Efficient queries for retrieving posts with authors and comments
- **Migration Strategy**: Alembic configuration for schema versioning and deployment