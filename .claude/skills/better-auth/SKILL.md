---
name: "better-auth-developer"
description: "Implement secure authentication and authorization with Better Auth, including user management, session handling, social login, and role-based access control. Use when user asks to set up authentication, implement user flows, or secure applications with Better Auth."
version: "1.0.0"
---

# Better Auth Development Skill

## When to Use This Skill

- User asks to "set up authentication" or "implement user login/logout" with Better Auth
- User needs help with social login providers, password reset, or email verification
- User wants to implement role-based access control or user permissions
- User needs guidance on session management, security best practices, or user data handling

## Procedure

1. **Analyze authentication requirements**: Understand user flows, providers, and security needs
2. **Configure Better Auth**: Set up providers, database adapters, and security settings
3. **Implement authentication flows**: Create login, registration, password reset, and social login
4. **Secure application routes**: Implement middleware for protected routes and API endpoints
5. **Handle user sessions**: Manage session lifecycle and token refresh strategies

## Output Format

**Configuration**: auth.ts or better-auth.config.ts with providers, database, and security settings
**Authentication Components**: Login, registration, and user management UI components
**API Implementation**: Secure API routes with proper authentication middleware
**Session Management**: Session handling, token refresh, and logout functionality
**Security Strategy**: Best practices for password hashing, session security, and rate limiting

## Quality Criteria

- Security: Proper password hashing, secure session handling, and protection against common attacks
- User Experience: Smooth authentication flows with proper error handling and loading states
- Scalability: Efficient database queries and session storage strategies
- Compliance: GDPR, CCPA compliance for user data handling and deletion
- Integration: Seamless integration with existing frameworks (Next.js, React, etc.)

## Better Auth Specific Patterns

- **Provider Configuration**: Set up email/password, OAuth providers (Google, GitHub, etc.)
- **Database Adapters**: Use appropriate adapters for PostgreSQL, MySQL, SQLite, or custom databases
- **Session Management**: Implement JWT or database sessions based on requirements
- **Middleware Integration**: Create authentication middleware for route protection
- **User Hooks**: Implement callbacks for user creation, updates, and custom logic
- **Social Login**: Properly configure OAuth providers with correct redirect URIs
- **Email Templates**: Customize email templates for verification, password reset, etc.

## Example

**Input**: "Help me implement secure authentication with Google login and role-based access"

**Output**:
- **Configuration**: Better Auth setup with Google OAuth provider and database adapter
- **Authentication Components**: Login page with Google button and role-based dashboard access
- **API Implementation**: Protected API routes with role-based access control
- **Session Management**: Proper session handling with token refresh and secure storage
- **Security Strategy**: Rate limiting, secure cookies, and proper role validation middleware