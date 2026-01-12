---
name: "tailwindcss-stylist"
description: "Create beautiful, responsive UIs with Tailwind CSS using utility-first approach, custom configurations, component extraction, and design system patterns. Use when user asks to style components, create responsive layouts, or implement design systems with Tailwind."
version: "1.0.0"
---

# Tailwind CSS Styling Skill

## When to Use This Skill

- User asks to "style a component" or "create a responsive layout" with Tailwind
- User needs help with responsive design, dark mode, or accessibility
- User wants to extract reusable components from utility classes
- User needs guidance on Tailwind configuration, plugins, or custom design systems

## Procedure

1. **Analyze design requirements**: Understand the visual design, breakpoints, and responsive needs
2. **Configure Tailwind**: Set up theme, colors, spacing, and plugins as needed
3. **Implement utility-first approach**: Use Tailwind classes directly in JSX/HTML
4. **Extract components**: Convert frequently used patterns into reusable components
5. **Optimize for performance**: Use content matching and tree-shaking to reduce bundle size

## Output Format

**Configuration**: tailwind.config.js with custom theme, colors, and plugins
**Component Implementation**: Properly styled components with Tailwind classes
**Responsive Design**: Mobile-first approach with appropriate breakpoints
**Utility Patterns**: Reusable class combinations and component utilities
**Performance Strategy**: Purge configuration and optimization techniques

## Quality Criteria

- Consistency: Use consistent spacing, colors, and typography from the design system
- Responsiveness: Mobile-first approach with proper breakpoints (sm, md, lg, xl, 2xl)
- Accessibility: Proper contrast ratios, focus states, and semantic HTML
- Maintainability: Extract frequently used patterns into reusable components
- Performance: Optimize for production with proper purging and tree-shaking

## Tailwind Specific Patterns

- **Utility-First**: Use utility classes directly in markup rather than custom CSS
- **Responsive Design**: Use responsive prefixes (sm:, md:, lg:, xl:, 2xl:)
- **Dark Mode**: Implement dark: variant for all relevant elements
- **Component Extraction**: Create reusable components with className prop support
- **Custom Config**: Extend theme with project-specific colors, spacing, and typography
- **Plugins**: Leverage official and custom plugins for complex utilities

## Example

**Input**: "Help me create a responsive navigation with mobile menu and dark mode"

**Output**:
- **Configuration**: tailwind.config.js with custom colors, breakpoints, and dark mode settings
- **Component Implementation**: Navigation component with proper mobile/desktop states
- **Responsive Design**: Mobile hamburger menu that transforms to desktop navigation
- **Utility Patterns**: Reusable button and menu item patterns with consistent styling
- **Performance Strategy**: Purge configuration to remove unused classes in production