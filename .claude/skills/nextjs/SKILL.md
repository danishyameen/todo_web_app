---
name: "nextjs-developer"
description: "Build modern Next.js applications with proper architecture, routing, data fetching, styling, and deployment configurations. Use when user asks to create, modify, or troubleshoot Next.js projects."
version: "1.0.0"
---

# Next.js Development Skill

## When to Use This Skill

- User asks to "create a Next.js app" or "build a React application with Next.js"
- User needs help with routing, API routes, data fetching, or SSR/SSG/ISR
- User wants to implement authentication, state management, or styling in Next.js
- User needs help with Next.js deployment, optimization, or configuration

## Procedure

1. **Analyze requirements**: Understand the Next.js version, project structure, and specific features needed
2. **Follow Next.js conventions**: Use App Router (app/) or Pages Router (pages/) appropriately
3. **Implement best practices**: Proper data fetching, error handling, loading states, and SEO optimization
4. **Consider performance**: Optimize images, implement code splitting, and use proper caching strategies
5. **Configure deployment**: Set up for Vercel, Netlify, or other platforms as needed

## Output Format

**Project Structure**: Recommended file organization
**Component Architecture**: How to structure components and layouts
**Data Flow**: Recommended patterns for data fetching and state management
**Configuration**: next.config.js, package.json, and other setup files
**Deployment Strategy**: Recommended hosting and deployment approach

## Quality Criteria

- Routing: Follow Next.js file-based routing conventions (app router preferred for new projects)
- Data Fetching: Use appropriate methods (fetch, SWR, React Query) with proper error/loading states
- Styling: Recommend Tailwind CSS, CSS Modules, or styled-components based on project needs
- Performance: Implement image optimization, font optimization, and code splitting
- SEO: Include proper meta tags, structured data, and accessibility features
- TypeScript: Use strict typing with proper interfaces and type safety

## Next.js Specific Patterns

- **App Router**: Use layout.tsx, page.tsx, loading.tsx, error.tsx, not-found.tsx
- **Data Fetching**: Leverage server components for data fetching, client components for interactivity
- **API Routes**: Place in app/api/[route]/route.ts with proper HTTP method handlers
- **Image Optimization**: Use next/image with proper sizing and loading strategies
- **Font Optimization**: Use next/font for local font loading and optimization

## Example

**Input**: "Help me create a Next.js blog with CMS integration"

**Output**:
- **Project Structure**:
  ```
  app/
  ├── layout.tsx
  ├── page.tsx
  ├── blog/
  │   ├── page.tsx
  │   └── [slug]/
  │       └── page.tsx
  ├── components/
  │   ├── Header.tsx
  │   ├── Footer.tsx
  │   └── BlogCard.tsx
  └── lib/
      └── cms.ts
  ```
- **Data Flow**: Server components fetch CMS data, client components handle interactivity, use Suspense for loading states
- **Configuration**: Environment variables for CMS API, image optimization settings, security headers
- **Deployment**: Vercel deployment with automatic builds and previews