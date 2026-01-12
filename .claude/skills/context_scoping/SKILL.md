---
name: "context-scoper"
description: "Define and establish clear boundaries, scope, and context for tasks, features, or problems to ensure focused, effective solutions. Use when user asks to clarify requirements, define project boundaries, or understand the scope of work needed."
version: "1.0.0"
---

# Context Scoping Skill

## When to Use This Skill

- User asks to "define the scope" or "clarify requirements" for a project or task
- User needs help with understanding boundaries, constraints, or limitations
- User wants to identify in/out of scope items or establish clear problem boundaries
- User needs guidance on feature prioritization, MVP definition, or requirement clarification

## Procedure

1. **Analyze initial request**: Understand the core problem or desired outcome
2. **Identify stakeholders**: Determine who is affected by or involved in the solution
3. **Define boundaries**: Establish clear in-scope and out-of-scope items
4. **Map dependencies**: Identify prerequisites, constraints, and external factors
5. **Validate scope**: Confirm understanding with stakeholders and refine as needed

## Output Format

**Problem Statement**: Clear, concise description of the core issue or objective
**Scope Boundaries**: Explicit in-scope and out-of-scope items with rationale
**Stakeholder Analysis**: Identification of affected parties and their interests
**Constraints & Assumptions**: Technical, business, and timeline constraints
**Success Criteria**: Measurable outcomes that define project success

## Quality Criteria

- Clarity: Unambiguous problem statement and scope definition
- Completeness: Comprehensive identification of relevant factors and boundaries
- Feasibility: Realistic scope given constraints and available resources
- Alignment: Scope matches stakeholder needs and business objectives
- Testability: Clear success criteria that can be measured and validated

## Context Scoping Specific Patterns

- **Boundary Definition**: Clearly distinguish what is included vs. excluded from scope
- **Stakeholder Mapping**: Identify all parties affected by or contributing to the solution
- **Constraint Analysis**: Document technical, business, regulatory, and timeline constraints
- **Dependency Mapping**: Identify upstream/downstream dependencies and prerequisites
- **Risk Assessment**: Anticipate potential obstacles and mitigation strategies
- **Success Metrics**: Define measurable outcomes and validation criteria
- **Iterative Refinement**: Validate and adjust scope based on feedback and discoveries
- **Communication Framework**: Establish clear communication about scope to all stakeholders

## Example

**Input**: "Help me understand what's needed to implement a notification system"

**Output**:
- **Problem Statement**: Centralized notification system to alert users of important events and updates
- **Scope Boundaries**: In scope: email, in-app notifications; Out of scope: SMS, push notifications for now
- **Stakeholder Analysis**: End users, admin staff, system administrators, third-party service providers
- **Constraints & Assumptions**: Integration with existing auth system, rate limiting, GDPR compliance
- **Success Criteria**: 99% delivery rate, sub-second delivery for urgent notifications, user preference controls