# Website Builder Platform

A SaaS-based website/web application builder platform. Built with Next.js 14, Turborepo, and npm workspaces.

## Monorepo Structure

```
apps/
  builder/    — Protected admin app (dashboard + drag-drop page builder)
  renderer/   — Public SSR app (serves published websites to visitors)

packages/
  ui/         — Shared design system components
  types/      — Shared TypeScript interfaces
  api-client/ — Typed API wrapper functions
```

## Getting Started

```bash
# Install all dependencies
npm install

# Run both apps in development mode
npm run dev

# Run only the builder app
npm run dev:builder

# Run only the renderer app
npm run dev:renderer

# Build all apps and packages
npm run build
```

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **State Management:** Zustand + TanStack React Query
- **Styling:** Tailwind CSS
- **Drag & Drop:** dnd-kit
- **Forms:** React Hook Form + Zod
- **HTTP Client:** Axios
- **Monorepo:** Turborepo + npm workspaces
- **Language:** TypeScript (strict mode)
