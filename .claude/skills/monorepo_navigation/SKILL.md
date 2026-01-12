---
name: "monorepo-navigator"
description: "Navigate, understand, and work efficiently within monorepo structures using tools like Nx, Lerna, Turborepo, or custom setups. Use when user asks to find, modify, or understand code across multiple packages in a monorepo."
version: "1.0.0"
---

# Monorepo Navigation Skill

## When to Use This Skill

- User asks to "find code across packages" or "understand dependencies" in a monorepo
- User needs help with workspace configuration, package linking, or cross-package imports
- User wants to implement proper shared libraries, build orchestration, or dependency management
- User needs guidance on monorepo tooling, project structure, or code organization

## Procedure

1. **Analyze monorepo structure**: Understand the workspace configuration and package organization
2. **Map dependencies**: Identify relationships between packages and shared dependencies
3. **Locate relevant code**: Find code across packages using proper search patterns
4. **Understand build system**: Determine how packages are built, tested, and deployed
5. **Implement changes**: Apply changes following monorepo patterns and conventions

## Output Format

**Structure Analysis**: Overview of monorepo layout, packages, and configuration files
**Dependency Map**: Visualization of package relationships and shared dependencies
**Navigation Strategy**: Commands and approaches for efficient monorepo exploration
**Implementation Plan**: Steps to implement changes while respecting monorepo patterns
**Best Practices**: Guidelines for working effectively within the monorepo structure

## Quality Criteria

- Organization: Clear understanding of package boundaries and responsibilities
- Efficiency: Use proper tools and commands for navigation and operations
- Consistency: Follow established monorepo patterns and conventions
- Dependency Management: Proper handling of shared dependencies and versioning
- Build Integration: Respect build orchestration and dependency graphs

## Monorepo Specific Patterns

- **Workspace Configuration**: Understand package.json workspaces, nx.json, or lerna.json
- **Cross-Package Imports**: Use proper import paths and avoid circular dependencies
- **Shared Libraries**: Identify and utilize common utilities, components, and types
- **Build Orchestration**: Leverage tools like Nx affected, Turborepo pipeline, or Lerna commands
- **Dependency Management**: Manage both internal and external dependencies properly
- **Code Generation**: Use generators for consistent boilerplate across packages
- **Testing Strategy**: Implement isolated and integrated testing approaches
- **Release Management**: Coordinate versioning and publishing across packages

## Example

**Input**: "Help me understand how to add a new shared utility function across multiple packages"

**Output**:
- **Structure Analysis**: Overview of current packages and shared utility locations
- **Dependency Map**: Understanding of how packages currently share code
- **Navigation Strategy**: Commands to locate existing utilities and package relationships
- **Implementation Plan**: Steps to create shared utility with proper exports and imports
- **Best Practices**: Guidelines for maintaining clean package boundaries and dependencies