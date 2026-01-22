# AGENTS.md

Este archivo contiene directrices y comandos para agentes de codificación que trabajan en este repositorio.

## Descripción del Proyecto

Sistema médico para doctores construido con Next.js 16, TypeScript estricto, Tailwind CSS v4, React 19 RSC, better-auth, Zustand, react-hook-form + Zod, y componentes Shadcn/UI estilo New York.

## Comandos de Desarrollo

### Build/Lint/Test Commands
```bash
npm run dev              # Servidor desarrollo (localhost:3000)
npm run build            # Compilar para producción
npm run start            # Servidor producción
npm run lint             # Ejecutar ESLint
npm run db:push          # Push Prisma schema a DB
npm run db:generate      # Generar Prisma client
npm run postinstall      # Post-install (genera Prisma)
```

### Testing
El proyecto usa Vitest con configuración personalizada y jsdom:
```bash
npm test                 # Ejecutar todos los tests (watch mode)
npm test -- --run        # Ejecutar tests una sola vez (sin watch mode)
npm test -- ui           # Ejecutar con UI de Vitest
npm test -- --coverage   # Ejecutar con cobertura de código
```

Para prueba individual:
```bash
npm test LoginForm.test.tsx                    # Prueba específica
npm test -- --reporter=verbose LoginForm.test.tsx # Con output detallado
npm test -- --run LoginForm.test.tsx          # Ejecutar prueba específica sin watch
```

Estructura de tests:
```
tests/
├── ui/               # Tests de componentes de UI
├── functional/      # Tests de utilidades y funciones
└── setupTests.ts     # Configuración global (@testing-library/jest-dom)
```

## Directrices de Estilo

### Estructura de Importaciones
```typescript
// 1. Tipos
import type { Metadata } from "next";

// 2. React/Next.js  
import { useState } from "react";
import Image from "next/image";

// 3. Terceros
import { z } from "zod";
import { motion } from "motion";
import { clsx, type ClassValue } from "clsx";

// 4. Internos (@/* path alias)
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

### Componentes
```typescript
interface ComponentProps {
  title: string;
  onSubmit: (data: FormData) => void;
}

export default function Component({
  title,
  onSubmit
}: ComponentProps): JSX.Element {
  return <div>{title}</div>;
}
```

### Nomenclatura
- **Componentes**: PascalCase (`UserProfile`, `LoginForm`)
- **Archivos**: kebab-case utilidades (`user-service.ts`), PascalCase componentes (`UserProfile.tsx`)
- **Variables**: camelCase (`userName`, `isLoading`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Hooks**: camelCase con `use` (`useAuth`, `useFormState`)

### Formatos y Estilos
- Tailwind CSS con tema inline (`@theme inline` en globals.css)
- OKLCH color space para temas claro/oscuro
- Componentes Shadcn/UI para UI consistente
- HTML semántico con accesibilidad ARIA
- Server Components para datos estáticos cuando sea posible

### Formularios
- react-hook-form con validación Zod
- Controller pattern para componentes controlados
- Manejo de estados de carga y errores
- Tipado TypeScript para datos del formulario

### Estado y Datos
- Zustand para estado global
- Estado local para componentes simples
- Prisma ORM con PostgreSQL
- better-auth para autenticación

### Manejo de Errores
```typescript
try {
  const result = await apiCall();
  return result;
} catch (error) {
  console.error("API call failed:", error);
  throw new Error("Failed to fetch data");
}
```

### Estructura de Archivos
```
app/
├── layout.tsx          # Root layout con metadata
├── page.tsx           # Home page
├── globals.css        # Tailwind + tema inline
├── (auth)/            # Route group auth
├── (role)/            # Route group protegido
├── api/               # API routes (auth, etc.)
components/
├── ui/                # Shadcn/UI components
├── auth/              # Auth components
├── landing/           # Landing page components
lib/
├── utils.ts           # cn() utility
├── auth.ts            # better-auth config
├── prisma.ts          # Prisma client
├── auth-client.ts     # Client auth config
└── data/              # Data utilities (specialties, etc.)
tests/
├── ui/                # UI component tests
├── functional/        # Utility function tests
└── setupTests.ts      # Global test configuration
```

### Configuraciones Clave
- **TypeScript**: strict mode, target ES2017, `@/*` path alias
- **ESLint**: Next.js core-web-vitals + TypeScript
- **Tailwind**: v4 con tema inline, OKLCH colors
- **Prisma**: PostgreSQL con generated client
- **Vitest**: jsdom environment con Testing Library
- **Dependencies**: date-fns para fechas, sonner para notificaciones, react-day-picker para calendarios

### Seguridad
- Validación Zod para todas las entradas
- better-auth para autenticación segura
- Sin datos sensibles en cliente
- Privacidad HIPAA para datos médicos

## Flujo de Trabajo

1. **Antes de empezar**: `npm run lint`
2. **Desarrollo**: `npm run dev` 
3. **Pre-commit**: `npm run lint && npm run build`
4. **Database**: `npm run db:push` para cambios schema

## Notas para Agentes

- Sistema médico - cumplimiento HIPAA y privacidad de datos crítico
- Todo en español - UI, mensajes, documentación
- TypeScript estricto - evitar `any`
- React 19 + Next.js 16 patterns
- Crear branch nueva para cada implementación
- Component Shadcn/UI existentes prioritarios
- Tests obligatorios para nueva funcionalidad
- Middleware Next.js para protección de rutas
- Estado global con Zustand stores
