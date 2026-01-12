---
name: "api-contract-designer"
description: "Design, implement, and document robust API contracts using OpenAPI/Swagger, ensuring consistency, validation, and clear communication between services. Use when user asks to create, modify, or validate API contracts and specifications."
version: "1.0.0"
---

# API Contract Design Skill

## When to Use This Skill

- User asks to "design an API contract" or "create OpenAPI specification"
- User needs help with API documentation, validation, or contract-first development
- User wants to implement proper request/response schemas or error handling contracts
- User needs guidance on API versioning, testing, or client SDK generation

## Procedure

1. **Analyze API requirements**: Understand endpoints, data models, and integration needs
2. **Design contract structure**: Create OpenAPI specification with proper schemas and responses
3. **Define validation rules**: Specify request/response validation and error contracts
4. **Document thoroughly**: Add descriptions, examples, and usage guidelines
5. **Validate consistency**: Ensure contract matches implementation and business requirements

## Output Format

**OpenAPI Specification**: Complete API contract with paths, schemas, and responses
**Request/Response Schemas**: Detailed type definitions for all API interactions
**Error Contracts**: Standardized error responses and status code definitions
**Documentation**: Clear descriptions, examples, and usage instructions
**Validation Strategy**: Approach for enforcing contract compliance at runtime

## Quality Criteria

- Completeness: All endpoints, parameters, and response types properly defined
- Consistency: Contract matches actual implementation behavior
- Clarity: Clear, understandable documentation with examples
- Validation: Proper schema validation and error handling contracts
- Versioning: Proper API versioning and change management strategies

## API Contract Specific Patterns

- **Schema Definition**: Use JSON Schema for request/response validation and documentation
- **Error Standardization**: Consistent error response format with codes and messages
- **Parameter Validation**: Proper type, format, and constraint definitions for all parameters
- **Response Modeling**: Clear definitions for success and error response structures
- **Example Generation**: Meaningful examples for all endpoints and data types
- **Security Definitions**: Proper authentication and authorization contract definitions
- **Version Management**: Clear versioning strategy and backward compatibility contracts
- **Contract Testing**: Strategies for validating implementation against contract

## Example

**Input**: "Help me create an API contract for a user management service"

**Output**:
- **OpenAPI Specification**: Complete contract with user endpoints, authentication, and error handling
- **Request/Response Schemas**: UserCreate, UserUpdate, UserResponse models with validation
- **Error Contracts**: Standardized error responses for validation, authentication, and server errors
- **Documentation**: Clear endpoint descriptions with parameter and response examples
- **Validation Strategy**: Runtime validation approach to enforce contract compliance