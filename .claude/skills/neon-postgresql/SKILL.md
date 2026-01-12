---
name: "neon-postgresql-expert"
description: "Design and manage serverless PostgreSQL databases with Neon, including branching, connection pooling, and performance optimization. Use when user asks to set up, optimize, or integrate with Neon PostgreSQL."
version: "1.0.0"
---

# Neon Serverless PostgreSQL Skill

## When to Use This Skill

- User asks to "set up a Neon PostgreSQL database" or "configure serverless PostgreSQL"
- User needs help with database branching, connection pooling, or performance optimization
- User wants to implement proper connection management or migration strategies
- User needs guidance on Neon-specific features like branching, isolation, and scaling

## Procedure

1. **Analyze database requirements**: Understand schema, performance, and scaling needs
2. **Configure Neon project**: Set up project, branches, and connection settings
3. **Design schema**: Create tables, indexes, and relationships optimized for serverless
4. **Implement connection management**: Configure connection pooling and timeout settings
5. **Optimize performance**: Set up proper indexing, query optimization, and monitoring

## Output Format

**Project Configuration**: Neon project setup with branches, roles, and access controls
**Schema Design**: PostgreSQL schema optimized for serverless usage patterns
**Connection Management**: Proper connection pooling, retry logic, and timeout configurations
**Performance Strategy**: Indexing strategy, query optimization, and monitoring setup
**Migration Plan**: Database migration approach compatible with Neon's branching feature

## Quality Criteria

- Performance: Proper connection pooling, optimized queries, and appropriate indexing
- Reliability: Connection retry logic, timeout handling, and error recovery
- Scalability: Efficient resource usage with serverless scaling capabilities
- Security: Proper access controls, encrypted connections, and role management
- Cost-effectiveness: Optimal configuration to balance performance and serverless billing

## Neon PostgreSQL Specific Patterns

- **Branching Strategy**: Use Neon's branching for development, staging, and production isolation
- **Connection Pooling**: Implement client-side pooling with libraries like pgBouncer or connection pooling in the application
- **Serverless Scaling**: Configure auto-suspend settings and understand compute startup times
- **Data Migration**: Leverage Neon's branching for safe schema migrations without downtime
- **Monitoring**: Use Neon's built-in metrics along with application-level database monitoring
- **Connection Management**: Handle connection timeouts and implement proper retry mechanisms
- **Resource Optimization**: Configure compute size and auto-suspend to balance cost and performance

## Example

**Input**: "Help me set up a Neon PostgreSQL database for a high-traffic web application"

**Output**:
- **Project Configuration**: Neon project with production branch, connection pooling settings
- **Schema Design**: Optimized table structure with proper indexes and constraints
- **Connection Management**: Application-level connection pooling with timeout and retry logic
- **Performance Strategy**: Query optimization techniques and monitoring setup
- **Migration Plan**: Safe migration strategy using Neon's branching capabilities