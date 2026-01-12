---
name: "jwt-security-expert"
description: "Implement secure JWT authentication with proper signing, validation, refresh strategies, and security best practices. Use when user asks to create, manage, or secure applications with JWT tokens."
version: "1.0.0"
---

# JWT Security Skill

## When to Use This Skill

- User asks to "implement JWT authentication" or "secure an API with tokens"
- User needs help with token signing, validation, or refresh mechanisms
- User wants to implement role-based access, claims management, or token expiration
- User needs guidance on JWT security, storage strategies, or cross-platform integration

## Procedure

1. **Analyze security requirements**: Understand token payload, expiration, and security constraints
2. **Design token structure**: Create appropriate claims and roles for the application
3. **Implement signing strategy**: Choose secure algorithms (RS256, HS256) and key management
4. **Create validation logic**: Implement proper token verification and error handling
5. **Plan refresh mechanism**: Design secure refresh token strategy with rotation

## Output Format

**Token Structure**: JWT payload with appropriate claims and role information
**Signing Implementation**: Secure token signing with proper algorithm selection
**Validation Logic**: Token verification with error handling and security checks
**Storage Strategy**: Secure client-side storage (HTTP-only cookies vs localStorage)
**Refresh Mechanism**: Secure refresh token implementation with rotation and invalidation

## Quality Criteria

- Security: Use strong algorithms (RS256 preferred), proper secret/key management, and secure storage
- Expiration: Short-lived access tokens with appropriate refresh token lifecycles
- Validation: Proper signature verification, expiration checks, and claim validation
- Performance: Efficient token validation without unnecessary database lookups
- Compatibility: Cross-platform token handling and proper header/cookie management

## JWT Specific Patterns

- **Algorithm Selection**: RS256 for distributed systems, HS256 for single services
- **Claims Structure**: Standard claims (iss, sub, aud, exp, nbf, iat) plus custom claims
- **Token Storage**: HTTP-only secure cookies for web apps, secure storage for mobile
- **Refresh Strategy**: Separate refresh tokens with longer expiration and rotation
- **Blacklisting**: Maintain revoked token lists for logout and security events
- **Payload Size**: Keep tokens lightweight with minimal but essential information
- **Error Handling**: Proper responses for expired, invalid, or malformed tokens

## Example

**Input**: "Help me implement secure JWT authentication with refresh tokens and role-based access"

**Output**:
- **Token Structure**: Access token with user ID, roles, and permissions; refresh token with unique ID
- **Signing Implementation**: RS256 algorithm with public/private key pair management
- **Validation Logic**: Middleware for token verification with proper error responses
- **Storage Strategy**: HTTP-only secure cookies for tokens with proper SameSite attributes
- **Refresh Mechanism**: Secure refresh token rotation with database storage and invalidation