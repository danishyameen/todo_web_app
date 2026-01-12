---
name: "typescript-developer"
description: "Write robust, type-safe TypeScript code with proper interfaces, generics, utility types, and advanced type system features. Use when user asks to implement, refactor, or optimize code with TypeScript."
version: "1.0.0"
---

# TypeScript Development Skill

## When to Use This Skill

- User asks to "convert JavaScript to TypeScript" or "add type safety to code"
- User needs help with complex type definitions, generics, or advanced type patterns
- User wants to implement proper error handling, validation, or API type definitions
- User needs guidance on TypeScript configuration, build processes, or migration strategies

## Procedure

1. **Analyze requirements**: Understand the codebase, existing types, and type safety goals
2. **Design type architecture**: Create interfaces, types, and type hierarchies that model the domain
3. **Implement with strict typing**: Use TypeScript's advanced features for maximum type safety
4. **Consider performance**: Balance type safety with compilation speed and developer experience
5. **Plan migration**: If converting from JavaScript, prioritize critical paths first

## Output Format

**Type Definitions**: Proper interfaces, types, and type aliases for the domain
**Implementation**: Type-safe code implementation with proper error handling
**Configuration**: tsconfig.json settings optimized for the project
**Migration Path**: Steps for implementing or migrating to TypeScript
**Testing Strategy**: Type-level tests and runtime validation approach

## Quality Criteria

- Type Safety: Use strict mode, no implicit any, proper null/undefined handling
- Maintainability: Clear, reusable type definitions with good naming conventions
- Performance: Avoid complex conditional types that slow compilation
- Compatibility: Ensure types work with existing JavaScript code during migration
- Documentation: JSDoc comments for complex types and public APIs

## TypeScript Specific Patterns

- **Interfaces vs Types**: Use interfaces for object shapes, types for unions and primitives
- **Generics**: Implement reusable, type-safe functions and components
- **Utility Types**: Leverage Pick, Omit, Partial, Required, and custom utility types
- **Discriminated Unions**: Use tagged unions for complex state management
- **Type Guards**: Implement proper runtime type checking where needed
- **Conditional Types**: Create flexible, reusable type transformations

## Example

**Input**: "Help me create type-safe API client with proper error handling"

**Output**:
- **Type Definitions**:
  ```typescript
  interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
  }

  type ApiError = {
    error: true;
    message: string;
    code: string;
  };

  type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
  ```
- **Implementation**: Generic API client function with proper typing for request/response
- **Configuration**: tsconfig.json with strict: true, noImplicitAny: true, strictNullChecks: true
- **Migration Path**: Start with core domain types, then API responses, then request handlers
- **Testing Strategy**: Type-level tests using expect-type and runtime validation with Zod/io-ts