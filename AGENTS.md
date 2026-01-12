# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this repository.

## Project Overview

This is a Next.js 16 doctor system application using:
- TypeScript with strict mode
- Tailwind CSS v4
- React 19
- App Router architecture
- Authentication with better-auth
- State management with Zustand
- Form handling with react-hook-form + Zod validation

## Development Commands

### Core Commands
```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Testing Commands
No test framework is currently configured. When adding tests:
- Set up Jest or Vitest with appropriate TypeScript configuration
- Add test scripts to package.json
- Follow Next.js testing conventions

## Code Style Guidelines

### TypeScript Configuration
- Strict mode enabled
- ES2017 target
- React JSX transform
- Path aliases: `@/*` maps to `./*`

### Import Organization
```typescript
// 1. React/Next.js imports
import type { Metadata } from "next";
import { useState, useEffect } from "react";

// 2. Third-party libraries
import { z } from "zod";
import { motion } from "motion";

// 3. Internal imports (using path aliases)
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
```

### Component Structure
```typescript
// Use proper TypeScript types
interface ComponentProps {
  title: string;
  onSubmit: (data: FormData) => void;
}

// Default export with proper typing
export default function Component({
  title,
  onSubmit
}: ComponentProps): JSX.Element {
  // Component logic
  return <div>{title}</div>;
}
```

### Naming Conventions
- **Components**: PascalCase (e.g., `UserProfile`, `LoginForm`)
- **Files**: kebab-case for utilities (e.g., `user-service.ts`), PascalCase for components (e.g., `UserProfile.tsx`)
- **Variables**: camelCase (e.g., `userName`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth`, `useFormState`)

### Styling Guidelines
- Use Tailwind CSS classes
- Follow the existing theme structure with CSS custom properties
- Leverage the `@theme inline` directive for custom theme values
- Use semantic HTML elements

### Error Handling
```typescript
// Use proper error boundaries and try-catch blocks
try {
  const result = await apiCall();
  return result;
} catch (error) {
  console.error("API call failed:", error);
  throw new Error("Failed to fetch data");
}
```

### Form Handling
- Use react-hook-form with Zod schemas for validation
- Implement proper TypeScript types for form data
- Handle loading and error states appropriately

### State Management
- Use Zustand for global state
- Keep component state local when possible
- Follow React best practices for state updates

### File Organization
```
app/
├── layout.tsx
├── page.tsx
├── globals.css
components/
├── ui/
├── forms/
hooks/
lib/
types/
```

### ESLint Configuration
- Uses Next.js recommended ESLint configuration
- Core Web Vitals rules enabled
- TypeScript rules enforced
- Custom ignores for build outputs

### Performance Considerations
- Use Next.js Image component for optimization
- Implement proper loading states
- Consider code splitting for large components
- Use React.memo for expensive components

### Security Best Practices
- Validate all user inputs with Zod schemas
- Use better-auth for authentication
- Never expose sensitive data in client-side code
- Implement proper CSRF protection

## Development Workflow

1. **Before starting work**: Run `npm run lint` to ensure code quality
2. **During development**: Use `npm run dev` for hot reloading
3. **Before committing**: Run `npm run lint` and `npm run build` to verify everything works
4. **Testing**: Add tests for new features (framework to be determined)

## Notes for Agents

- This is a medical/doctor system - ensure HIPAA compliance and data privacy
- All user data should be properly validated and secured
- Follow accessibility guidelines (ARIA labels, semantic HTML)
- Implement proper error handling for all API calls
- Use TypeScript strictly - no `any` types unless absolutely necessary
- Follow React 19 patterns and best practices
- Leverage Next.js 16 features appropriately
- Use Shadcn UI for components
- Use Tailwind CSS for styling
- Use Zustand for state management
- Respond to my instructions with the least amount of words possible
- Responde en español
- Cada que vez que hagas una implementación, crea una rama nueva con el nombre de la implementación y ahí realiza la implementación.