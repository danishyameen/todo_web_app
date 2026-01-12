---
name: "frontend-data-fetcher"
description: "Implement efficient, type-safe data fetching in frontend applications using modern patterns like SWR, React Query, or native fetch with proper caching, error handling, and loading states. Use when user asks to fetch, cache, or manage API data in frontend applications."
version: "1.0.0"
---

# Frontend Data Fetching Skill

## When to Use This Skill

- User asks to "fetch data from an API" or "implement data caching" in frontend
- User needs help with loading states, error handling, or optimistic updates
- User wants to implement proper authentication headers or request interceptors
- User needs guidance on data synchronization, pagination, or real-time updates

## Procedure

1. **Analyze data requirements**: Understand API endpoints, response structures, and update frequency
2. **Choose fetching strategy**: Select appropriate library (SWR, React Query, or native fetch)
3. **Implement caching layer**: Set up proper cache keys, invalidation, and stale-while-revalidate
4. **Handle error states**: Implement proper error boundaries, retry logic, and user feedback
5. **Optimize performance**: Configure suspense, pagination, and selective re-rendering

## Output Format

**Fetching Implementation**: Proper data fetching hooks/components with error/loading states
**Caching Strategy**: Cache configuration with appropriate TTL and invalidation patterns
**Type Definitions**: TypeScript interfaces for API responses and request parameters
**Error Handling**: Comprehensive error states and user feedback mechanisms
**Performance Optimization**: Loading states, suspense boundaries, and data synchronization

## Quality Criteria

- Performance: Efficient caching, minimal re-fetching, and optimized network usage
- User Experience: Proper loading states, error handling, and optimistic updates
- Type Safety: Full TypeScript integration with proper response typing
- Reliability: Retry logic, offline support, and graceful error handling
- Maintainability: Clean, reusable hooks and clear separation of concerns

## Frontend Data Fetching Specific Patterns

- **Caching Strategy**: Implement proper cache keys, stale-while-revalidate, and cache invalidation
- **Loading States**: Show skeletons, spinners, and progressive loading for better UX
- **Error Boundaries**: Handle network errors, server errors, and parsing errors gracefully
- **Authentication**: Include proper headers, token refresh, and authentication interceptors
- **Pagination**: Implement infinite scroll, cursor-based, or offset-based pagination
- **Real-time Updates**: Combine with WebSocket or Server-Sent Events for live data
- **Optimistic Updates**: Update UI immediately while background requests process
- **Suspense Integration**: Use React Suspense for clean loading state management

## Example

**Input**: "Help me implement data fetching with caching and error handling for a todo list app"

**Output**:
- **Fetching Implementation**: Custom hook with SWR/React Query for todos API with loading/error states
- **Caching Strategy**: Cache key based on user ID with automatic invalidation on mutations
- **Type Definitions**: TypeScript interfaces for Todo items and API response structures
- **Error Handling**: Proper error messages and retry mechanisms for failed requests
- **Performance Optimization**: Pagination for large datasets and selective re-rendering