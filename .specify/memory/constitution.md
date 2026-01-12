# Todo Full-Stack Web Application Constitution

## Core Principles

### I. Accuracy
All feature, API, database, UI, and auth specifications must be correctly extracted from Spec-Kit Plus specifications. Implementation must precisely match documented requirements with no deviations.

### II. Clarity
Instructions, task decomposition, and agent responsibilities must be crystal clear. All documentation must be unambiguous and comprehensible to any team member.

### III. Reproducibility
Implementation must be repeatable by Claude Code CLI across all agents and phases. All steps must be deterministic and produce consistent results when executed by different agents.

### IV. Security & Isolation
User authentication and task ownership must be rigorously enforced. All API endpoints must validate JWT tokens and enforce user isolation at both application and database levels.

### V. Maintainability
Code structure must follow CLAUDE.md guidelines, monorepo structure, and Spec-Kit Plus conventions. All code must be properly typed, documented, and follow established patterns in the codebase.

### VI. Scalability
Future agents and skills can be integrated without altering existing workflows. System architecture must support expansion and evolution.

### VII. UI/UX Excellence
Frontend must be professional, beautiful, intuitive, and responsive with modern color combinations. User experience must be exceptional and accessible.

### VIII. Test-First (NON-NEGOTIABLE)
TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced. All features must have comprehensive test coverage before implementation.

## Technology Stack Standards

### Frontend Requirements
All frontend development must comply with Next.js 16+ App Router, TypeScript, and Tailwind CSS. Components must be properly typed, follow accessibility standards, implement modern design principles, and use harmonious color palettes with responsive layouts.

### Backend Requirements
All backend development must use FastAPI with proper Pydantic models and SQLModel for database interactions. API endpoints must follow REST conventions and include proper authentication validation.

### Database Requirements
All database models must follow SQLModel + Neon PostgreSQL schema specifications. Proper indexing, constraints, and relationships must be implemented according to specifications.

### Authentication Requirements
JWT and Better Auth usage must be consistent and secure across all services. Authentication must be validated at every API endpoint with proper token refresh mechanisms.

### Agent and Skill Integration
- Reference existing agents and skills: frontend_data_fetch, monorepo_navigation, spec_reference, context_scoping, agent_handoff, iteration_refinement, api_contract, database_modeling, jwt_verification, security_audit, spec_compliance_check, task_crud
- Ensure future agents/skills can be integrated without disrupting current implementation

## Project Constraints

### Monorepo Structure
Follow strict monorepo folder structure: `/frontend`, `/backend`, `/specs`. All code must be organized according to this structure with no deviations.

### Specification Adherence
Agents/skills cannot implement features outside the documented specs. All work must reference @specs/features, @specs/api, @specs/database, @specs/ui.

### Phased Workflow Alignment
Tasks must align with phased workflow: Phase 1 → Phase 2 → Phase 3. Each phase must be completed before advancing to the next.

### Agent Assignment Standards
All tasks must be assignable and testable per agent role. Authentication and API endpoints must respect user isolation at all times.

### Frontend Requirements
Frontend must implement responsive UI and modern color combinations as specified in UI/UX Excellence principle.

## Success Criteria

### Specification Alignment
Full alignment with project specs, CLAUDE.md guidance, and UI/UX standards. All implemented features must match the documented requirements exactly.

### Agent Implementation Capability
Agents can implement features across stack without ambiguity. All specifications must be clear and actionable for automated implementation.

### Security Enforcement
All security, authentication, database, and UI standards enforced. Implementation must pass security audits and compliance checks.

### Reproducible Implementation
Implementation is reproducible across phased workflow. Different agents must be able to execute the same specifications and achieve identical results.

### Future-Proof Architecture
Ready for future agents/skills additions without modifying existing prompts or disrupting current workflows.

## Development Workflow

### Feature Development Process
1. Extract requirements from @specs documentation
2. Create detailed task breakdowns following agent capabilities
3. Implement with full test coverage
4. Validate against original specifications
5. Deploy following phased approach

### Quality Gates
- All code must pass type checking
- All tests must pass before merging
- All security validations must be satisfied
- All UI/UX standards must be met
- All specifications must be verified as implemented

### Review Process
- Code reviews must verify specification compliance
- Security reviews must validate authentication and isolation
- Architecture reviews must confirm system design alignment
- UI/UX reviews must ensure design excellence
- Testing reviews must ensure adequate coverage

## Governance

Constitution supersedes all other practices; Amendments require documentation, approval, migration plan. All PRs/reviews must verify compliance; Complexity must be justified; Use CLAUDE.md for runtime development guidance.

**Version**: 1.0.0 | **Ratified**: 2026-01-12 | **Last Amended**: 2026-01-12
