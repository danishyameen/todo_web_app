---
name: "database-modeler"
description: "Design, optimize, and implement efficient database schemas with proper normalization, relationships, indexing, and performance considerations. Use when user asks to create, modify, or optimize database models and schemas."
version: "1.0.0"
---

# Database Modeling Skill

## When to Use This Skill

- User asks to "design a database schema" or "create entity relationship model"
- User needs help with normalization, indexing, or performance optimization
- User wants to implement proper relationships, constraints, or data integrity
- User needs guidance on database design patterns, migration strategies, or optimization

## Procedure

1. **Analyze data requirements**: Understand entities, relationships, and business rules
2. **Design conceptual model**: Create high-level entity-relationship diagram
3. **Normalize schema**: Apply normalization rules to eliminate redundancy
4. **Optimize for performance**: Add proper indexes, partitioning, and constraints
5. **Validate design**: Review for scalability, maintainability, and performance

## Output Format

**Entity-Relationship Model**: Diagram and description of entities and relationships
**Normalized Schema**: Properly normalized table structure with primary/foreign keys
**Index Strategy**: Performance optimization with proper indexing and constraints
**Data Integrity Rules**: Constraints, triggers, and validation rules
**Migration Plan**: Approach for implementing schema changes safely

## Quality Criteria

- Normalization: Proper normalization to reduce redundancy and improve integrity
- Performance: Efficient indexing and query optimization strategies
- Integrity: Proper constraints, foreign keys, and validation rules
- Scalability: Design that supports growth and changing requirements
- Maintainability: Clear, understandable schema with proper documentation

## Database Modeling Specific Patterns

- **Normalization Levels**: Apply appropriate normalization (1NF, 2NF, 3NF) based on use case
- **Relationship Mapping**: Proper implementation of one-to-one, one-to-many, many-to-many relationships
- **Index Optimization**: Strategic placement of indexes for query performance
- **Partitioning Strategy**: Horizontal or vertical partitioning for large datasets
- **Constraint Design**: Proper use of primary keys, foreign keys, unique, and check constraints
- **Data Types**: Optimal selection of data types for storage efficiency and performance
- **Denormalization Considerations**: Strategic denormalization for read-heavy applications
- **Audit Trail**: Implementation of change tracking and historical data management

## Example

**Input**: "Help me design a database schema for an e-commerce application"

**Output**:
- **Entity-Relationship Model**: Customers, Products, Orders, Categories, Reviews with relationships
- **Normalized Schema**: Properly structured tables with primary/foreign keys and referential integrity
- **Index Strategy**: Performance-optimized indexes on frequently queried columns
- **Data Integrity Rules**: Constraints for prices, stock levels, and order states
- **Migration Plan**: Safe approach to implement schema in production environment