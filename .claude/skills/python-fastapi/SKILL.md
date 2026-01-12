---
name: "fastapi-developer"
description: "Build robust, high-performance Python APIs with FastAPI using type hints, automatic documentation, dependency injection, and async capabilities. Use when user asks to create, modify, or optimize Python APIs with FastAPI."
version: "1.0.0"
---

# Python FastAPI Development Skill

## When to Use This Skill

- User asks to "create a Python API" or "build a REST service" with FastAPI
- User needs help with data validation, automatic documentation, or async endpoints
- User wants to implement authentication, database integration, or middleware
- User needs guidance on dependency injection, testing, or deployment strategies

## Procedure

1. **Analyze API requirements**: Understand endpoints, data models, and integration needs
2. **Design data models**: Create Pydantic models for requests, responses, and database schemas
3. **Implement endpoints**: Build async endpoints with proper error handling and validation
4. **Configure middleware**: Add authentication, CORS, logging, and security middleware
5. **Document and test**: Generate OpenAPI documentation and implement comprehensive tests

## Output Format

**Project Structure**: Recommended FastAPI app organization with routers and models
**Data Models**: Pydantic models for all request/response schemas and database entities
**Endpoint Implementation**: Async route handlers with proper status codes and validation
**Configuration**: Settings, environment variables, and middleware setup
**Testing Strategy**: Unit and integration tests with pytest and test clients

## Quality Criteria

- Type Safety: Full use of Pydantic models and Python type hints for validation
- Performance: Async endpoints, proper connection pooling, and optimized database queries
- Documentation: Automatic OpenAPI/Swagger docs with clear descriptions and examples
- Security: Input validation, rate limiting, and proper authentication patterns
- Testing: Comprehensive test coverage with pytest fixtures and mock dependencies

## FastAPI Specific Patterns

- **Pydantic Models**: Use BaseModel for request/response validation and serialization
- **Dependency Injection**: Leverage FastAPI's DI system for database connections, authentication
- **Async Endpoints**: Use async/await for I/O-bound operations and database calls
- **Automatic Docs**: Leverage FastAPI's automatic OpenAPI generation with proper annotations
- **Background Tasks**: Use BackgroundTasks for non-blocking operations
- **Middleware**: Implement custom middleware for authentication, logging, and error handling
- **Event Handlers**: Use lifespan events for startup/shutdown database connections

## Example

**Input**: "Help me create a REST API for managing user profiles with database integration"

**Output**:
- **Project Structure**: app/main.py, app/models/, app/schemas/, app/database/, app/routers/
- **Data Models**: UserCreate, UserUpdate, UserResponse Pydantic models with validation
- **Endpoint Implementation**: GET, POST, PUT, DELETE endpoints with proper status codes
- **Configuration**: Database connection pool, CORS settings, and authentication middleware
- **Testing Strategy**: pytest fixtures for database testing and API client integration tests