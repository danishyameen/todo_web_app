---
name: "agent-handoff-coordinator"
description: "Coordinate seamless transitions between different agents, tools, or systems while preserving context, maintaining continuity, and ensuring smooth handoffs. Use when user asks to transfer work between agents, coordinate specialized tools, or manage multi-agent workflows."
version: "1.0.0"
---

# Agent Handoff Coordination Skill

## When to Use This Skill

- User asks to "transfer work between agents" or "coordinate multiple specialized tools"
- User needs help with maintaining context during system or agent transitions
- User wants to implement proper handoff protocols or workflow orchestration
- User needs guidance on context preservation, state management, or continuity assurance

## Procedure

1. **Analyze handoff requirements**: Understand the source, destination, and context needs
2. **Capture current state**: Document progress, decisions, and relevant context
3. **Prepare handoff package**: Format information for the receiving agent/tool
4. **Execute transition**: Facilitate the handoff with proper context transfer
5. **Verify continuity**: Confirm successful transfer and maintain workflow integrity

## Output Format

**Handoff Package**: Structured context and state information for receiving agent
**Transition Protocol**: Step-by-step process for executing the handoff
**Context Preservation**: Critical information that must be maintained across agents
**Continuity Checks**: Validation points to ensure workflow integrity
**Fallback Plan**: Recovery procedures if handoff fails or encounters issues

## Quality Criteria

- Continuity: Seamless transition without loss of context or progress
- Clarity: Clear communication of relevant information to receiving agent
- Completeness: All necessary context transferred for successful continuation
- Efficiency: Minimal overhead in the handoff process
- Robustness: Fallback procedures for failed or incomplete handoffs

## Agent Handoff Specific Patterns

- **Context Serialization**: Convert current state into transferable format
- **State Mapping**: Align source agent's state with destination agent's expectations
- **Information Prioritization**: Identify critical vs. optional context for transfer
- **Protocol Definition**: Establish clear handoff procedures and communication channels
- **Validation Points**: Checkpoints to verify successful information transfer
- **Error Handling**: Procedures for handling incomplete or failed handoffs
- **Metadata Preservation**: Maintain provenance, timestamps, and decision history
- **Continuity Assurance**: Verify that receiving agent can continue seamlessly

## Example

**Input**: "Help me hand off this API design task from architecture to implementation agent"

**Output**:
- **Handoff Package**: API specifications, design decisions, constraints, and requirements in implementation-ready format
- **Transition Protocol**: Step-by-step process to transfer from architecture to implementation agent
- **Context Preservation**: Critical design decisions, performance requirements, and security constraints
- **Continuity Checks**: Validation that implementation agent understands requirements and constraints
- **Fallback Plan**: Procedures if implementation agent cannot process the handoff correctly