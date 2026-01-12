# AGENTS.md

Este archivo contiene directrices y comandos para agentes de codificación que trabajan en este repositorio.

## Descripción del Proyecto

Este es un sistema médico para doctores construido con Next.js 16 que utiliza:
- TypeScript con modo estricto
- Tailwind CSS v4 con configuración de tema inline
- React 19 con RSC (React Server Components)
- App Router architecture
- Autenticación con better-auth
- Manejo de estado con Zustand
- Formularios con react-hook-form + validación Zod
- Componentes Shadcn/UI con estilo New York

## Comandos de Desarrollo

### Comandos Principales
```bash
npm run dev          # Iniciar servidor de desarrollo (localhost:3000)
npm run build        # Compilar para producción
npm run start        # Iniciar servidor de producción
npm run lint         # Ejecutar ESLint
```

### Comandos de Pruebas
Actualmente no hay un framework de pruebas configurado. Al agregar pruebas:
- Configurar Jest o Vitest con TypeScript
- Agregar scripts de prueba al package.json
- Seguir convenciones de Next.js para testing
- Comando para prueba individual: `npm test -- --testNamePattern="nombre-prueba"`

## Directrices de Estilo de Código

### Configuración TypeScript
- Modo estricto habilitado
- Target ES2017, transform React JSX
- Path aliases: `@/*` mapea a `./*`
- Configuración en tsconfig.json

### Organización de Importaciones
```typescript
// 1. Importaciones de tipos
import type { Metadata } from "next";

// 2. Importaciones de React/Next.js
import { useState, useEffect } from "react";
import Image from "next/image";

// 3. Librerías de terceros
import { z } from "zod";
import { motion } from "motion";
import { clsx, type ClassValue } from "clsx";

// 4. Importaciones internas (usando path aliases)
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
```

### Estructura de Componentes
```typescript
// Definir interfaces de props
interface ComponentProps {
  title: string;
  onSubmit: (data: FormData) => void;
}

// Export default con tipado adecuado
export default function Component({
  title,
  onSubmit
}: ComponentProps): JSX.Element {
  // Lógica del componente
  return <div>{title}</div>;
}
```

### Convenciones de Nomenclatura
- **Componentes**: PascalCase (ej: `UserProfile`, `LoginForm`)
- **Archivos**: kebab-case para utilidades (ej: `user-service.ts`), PascalCase para componentes (ej: `UserProfile.tsx`)
- **Variables**: camelCase (ej: `userName`, `isLoading`)
- **Constantes**: UPPER_SNAKE_CASE (ej: `API_BASE_URL`)
- **Hooks**: camelCase con prefijo `use` (ej: `useAuth`, `useFormState`)

### Directrices de Estilos
- Usar clases de Tailwind CSS
- Seguir estructura de tema con propiedades CSS personalizadas
- Usar directiva `@theme inline` para valores de tema personalizados
- Usar elementos HTML semánticos
- Configuración en globals.css con OKLCH color space

### Manejo de Errores
```typescript
// Usar error boundaries y bloques try-catch
try {
  const result = await apiCall();
  return result;
} catch (error) {
  console.error("API call failed:", error);
  throw new Error("Failed to fetch data");
}
```

### Manejo de Formularios
- Usar react-hook-form con schemas Zod para validación
- Implementar tipos TypeScript adecuados para datos del formulario
- Manejar estados de carga y errores apropiadamente
- Usar componentes Shadcn/UI para formularios

### Manejo de Estado
- Usar Zustand para estado global
- Mantener estado local cuando sea posible
- Seguir mejores prácticas de React para actualizaciones de estado
- Considerar Server Components para datos estáticos

### Organización de Archivos
```
app/
├── layout.tsx
├── page.tsx
├── globals.css
components/
├── ui/              # Componentes Shadcn/UI
├── forms/           # Componentes de formulario
├── hooks/           # Hooks personalizados
lib/
├── utils.ts         # Utilidades generales
├── auth.ts          # Configuración better-auth
types/               # Definiciones de tipos
```

### Configuración ESLint
- Usa configuración recomendada de Next.js
- Reglas Core Web Vitals habilitadas
- Reglas TypeScript forzadas
- Ignora salidas de compilación
- Configuración en `eslint.config.mjs` con globalIgnores

### Consideraciones de Performance
- Usar componente Image de Next.js para optimización
- Implementar estados de carga apropiados
- Considerar code splitting para componentes grandes
- Usar React.memo para componentes costosos

### Mejores Prácticas de Seguridad
- Validar todas las entradas de usuario con schemas Zod
- Usar better-auth para autenticación
- Nunca exponer datos sensibles en código cliente
- Implementar protección CSRF apropiada

## Flujo de Trabajo de Desarrollo

1. **Antes de empezar**: Ejecutar `npm run lint` para asegurar calidad de código
2. **Durante desarrollo**: Usar `npm run dev` para hot reloading
3. **Antes de commitear**: Ejecutar `npm run lint` y `npm run build`
4. **Pruebas**: Agregar pruebas para nuevas funcionalidades

## Notas para Agentes

- Este es un sistema médico/doctors - asegurar cumplimiento HIPAA y privacidad de datos
- Todos los datos de usuario deben ser validados y asegurados
- Seguir guías de accesibilidad (etiquetas ARIA, HTML semántico)
- Implementar manejo de errores apropiado para todas las llamadas API
- Usar TypeScript estrictamente - sin tipos `any` a menos que sea absolutamente necesario
- Seguir patrones y mejores prácticas de React 19
- Aprovechar características de Next.js 16 apropiadamente
- Usar componentes Shadcn/UI
- Usar Tailwind CSS para estilos
- Usar Zustand para manejo de estado
- Responder en español y crear todo en español
- Cada vez que hagas una implementación, crea una rama nueva con el nombre de la implementación y ahí realiza la implementación