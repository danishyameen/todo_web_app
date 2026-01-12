---
name: "jwt-verifier"
description: "Implement secure JWT verification with proper signature validation, claim checking, and security best practices. Use when user asks to validate, verify, or secure applications with JWT token verification."
version: "1.0.0"
---

# JWT Verification Skill

## When to Use This Skill

- User asks to "verify JWT tokens" or "implement token validation"
- User needs help with signature validation, claim verification, or expiration checks
- User wants to implement proper error handling or security measures for JWT verification
- User needs guidance on public key management, algorithm validation, or token introspection

## Procedure

1. **Analyze token requirements**: Understand signing algorithm, expected claims, and security constraints
2. **Implement signature verification**: Validate token signature against trusted keys
3. **Check token claims**: Verify expiration, issuer, audience, and custom claims
4. **Apply security measures**: Implement proper error handling and security checks
5. **Validate implementation**: Test with valid and invalid tokens to ensure security

## Output Format

**Verification Implementation**: Secure JWT validation function with proper error handling
**Claim Validation**: Checks for standard claims (exp, nbf, iat, iss, aud) and custom claims
**Security Measures**: Protection against common JWT vulnerabilities and attacks
**Error Handling**: Proper responses for invalid, expired, or malformed tokens
**Key Management**: Secure handling of public/private keys or secrets for verification

## Quality Criteria

- Security: Proper algorithm validation, protection against signature bypass attacks
- Accuracy: Correct validation of all required claims and token integrity
- Performance: Efficient verification without unnecessary operations
- Error Handling: Clear, secure responses without leaking sensitive information
- Compliance: Adherence to JWT RFC standards and security best practices

## JWT Verification Specific Patterns

- **Algorithm Validation**: Explicit algorithm specification and protection against alg:none attacks
- **Signature Verification**: Proper cryptographic validation using trusted keys
- **Claim Checking**: Validation of exp, nbf, iat, iss, aud, and custom claims
- **Clock Skew Handling**: Appropriate tolerance for time-based claims
- **Key Rotation**: Support for multiple keys and key rotation strategies
- **Token Blacklisting**: Optional revocation checking for logged-out users
- **Error Responses**: Secure error messages that don't reveal internal information
- **Performance Optimization**: Caching of public keys and verification results

## Example

**Input**: "Help me implement secure JWT verification with public key validation"

**Output**:
- **Verification Implementation**: Function to verify RS256-signed tokens with public key
- **Claim Validation**: Checks for expiration, issuer, audience, and custom user claims
- **Security Measures**: Protection against common JWT vulnerabilities and timing attacks
- **Error Handling**: Proper responses for expired, invalid, or improperly signed tokens
- **Key Management**: Secure public key retrieval and caching strategy