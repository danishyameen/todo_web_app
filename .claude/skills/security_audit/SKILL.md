---
name: "security-auditor"
description: "Perform comprehensive security audits to identify vulnerabilities, assess risks, and recommend remediation strategies. Use when user asks to evaluate security posture, identify vulnerabilities, or improve security measures."
version: "1.0.0"
---

# Security Audit Skill

## When to Use This Skill

- User asks to "perform a security audit" or "identify vulnerabilities" in code/system
- User needs help with risk assessment, penetration testing, or security evaluation
- User wants to implement security best practices or compliance requirements
- User needs guidance on vulnerability remediation or security hardening

## Procedure

1. **Analyze scope**: Define systems, code, or infrastructure to be audited
2. **Identify threats**: Enumerate potential attack vectors and threat models
3. **Scan for vulnerabilities**: Check for common security issues and misconfigurations
4. **Assess risks**: Evaluate severity and potential impact of identified issues
5. **Recommend remediation**: Provide prioritized list of fixes and security improvements

## Output Format

**Vulnerability Report**: Comprehensive list of identified security issues with severity ratings
**Risk Assessment**: Evaluation of potential impact and likelihood of exploitation
**Remediation Plan**: Prioritized list of fixes with implementation guidance
**Security Recommendations**: Best practices and preventive measures for future security
**Compliance Check**: Assessment against security standards and regulations

## Quality Criteria

- Thoroughness: Comprehensive coverage of security domains (application, network, data)
- Accuracy: Precise identification of actual vulnerabilities vs. false positives
- Prioritization: Clear ranking of issues by severity and risk level
- Actionability: Practical, implementable recommendations for remediation
- Coverage: Assessment of common security categories (OWASP, NIST, etc.)

## Security Audit Specific Patterns

- **Vulnerability Categories**: Check for injection, authentication, session management, and authorization issues
- **Configuration Review**: Assess server configs, database settings, and security parameters
- **Code Analysis**: Identify insecure coding practices and vulnerable functions
- **Dependency Scanning**: Check for vulnerable third-party libraries and components
- **Access Controls**: Evaluate privilege escalation, authorization bypasses, and permissions
- **Data Protection**: Assess encryption, data handling, and privacy compliance
- **Network Security**: Review firewall rules, ports, and network segmentation
- **Logging & Monitoring**: Evaluate security event tracking and incident response readiness

## Example

**Input**: "Help me audit a web application for security vulnerabilities"

**Output**:
- **Vulnerability Report**: XSS, CSRF, SQL injection, authentication bypass findings with CVSS scores
- **Risk Assessment**: Business impact analysis and exploitation probability for each vulnerability
- **Remediation Plan**: Step-by-step fixes with code examples and configuration changes
- **Security Recommendations**: Input validation, secure session management, and security headers
- **Compliance Check**: OWASP Top 10 and PCI DSS compliance assessment