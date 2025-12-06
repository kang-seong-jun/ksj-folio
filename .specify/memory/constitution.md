<!--
Sync Impact Report:
Version change: 1.0.0 → 1.1.0 (minor version bump - new content management principles added)
Modified principles: N/A
Added sections:
  - VII. Content Management & Structure
  - Content Organization (in Development Workflow)
Templates requiring updates:
  - ✅ plan-template.md - Constitution Check section already comprehensive
  - ✅ spec-template.md - No changes needed (generic template)
  - ✅ tasks-template.md - No changes needed (generic template)
Follow-up TODOs: None
-->

# ksj-folio Constitution

## Core Principles

### I. Modular Architecture & Single Responsibility

Every module, component, and function MUST have a single, well-defined responsibility. Code MUST be organized into logical, reusable modules that can be independently tested and maintained. Separation of concerns is mandatory: UI components, business logic, data fetching, and utilities MUST be clearly separated. Each file MUST have a clear purpose with no organizational-only modules.

**Rationale**: Modular code is easier to understand, test, maintain, and scale. Single responsibility prevents tight coupling and makes the codebase more resilient to change.

### II. Next.js App Router Best Practices

All routing MUST use the Next.js App Router pattern. Server Components are the default; Client Components require explicit `'use client'` directive. Data fetching in Server Components MUST use `async/await` directly. Images MUST use `next/image` with required `width`, `height`, and `alt` props. Internal links MUST use `next/link`. Route files MUST follow naming conventions: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`.

**Rationale**: App Router provides optimal performance through server-side rendering, automatic code splitting, and built-in optimizations. Following these patterns ensures consistency and leverages Next.js capabilities.

### III. TypeScript Type Safety (NON-NEGOTIABLE)

All code MUST be written in TypeScript with strict mode enabled. Types MUST be explicitly defined; avoid relying solely on type inference for public APIs. Props interfaces MUST be defined for all components. Shared types MUST be placed in `types/` directory. Type guards MUST be used for runtime type validation when needed.

**Rationale**: Type safety prevents runtime errors, improves developer experience, and makes code self-documenting. Strict typing catches errors at compile time rather than runtime.

### IV. Component Structure & Organization

Components MUST follow a consistent structure: imports (external → internal), types/interfaces, component definition, hooks, event handlers, render. Components MUST use PascalCase naming. Default exports are required for components. Conditional rendering MUST prefer early returns over nested ternaries. Props MUST be explicitly typed.

**Rationale**: Consistent structure makes code predictable and easier to navigate. Early returns reduce nesting and improve readability.

### V. Performance Optimization

Code splitting MUST be implemented using `next/dynamic` for large components. Memoization (`React.memo`, `useMemo`, `useCallback`) MUST be used appropriately for expensive calculations and stable props. Images MUST be optimized with appropriate sizing; `priority` prop only for above-the-fold content. Lazy loading is default for non-priority images.

**Rationale**: Performance directly impacts user experience. Optimizations reduce bundle size, improve load times, and enhance perceived performance.

### VI. Accessibility Standards

Semantic HTML MUST be used throughout. All images MUST have descriptive `alt` attributes. Keyboard navigation MUST be supported for all interactive elements. ARIA attributes MUST be used when semantic HTML is insufficient. Color contrast MUST meet WCAG AA standards minimum.

**Rationale**: Accessible code ensures the application is usable by everyone, complies with legal requirements, and improves SEO.

### VII. Content Management & Structure

Portfolio content MUST be managed as Markdown files with frontmatter metadata. Content files MUST be stored in `content/` directory with clear organization by type (e.g., `content/posts/`, `content/research/`). Frontmatter MUST include required fields: `title`, `date`, `slug`, and optional fields: `description`, `tags`, `category`, `thumbnail`, `summary`, `readingTime`, `author`. Markdown content MUST be parsed and rendered server-side using remark/rehype. Content structure MUST support both listing pages (metadata only) and detail pages (full content).

**Rationale**: Markdown-based content management provides version control, easy editing, and separation of content from presentation. Frontmatter enables structured metadata for filtering, sorting, and SEO optimization.

## Development Workflow

### Code Organization

Project structure MUST follow: `app/` for App Router routes, `components/` for reusable components (with `ui/` and `features/` subdirectories), `lib/` for utilities, `hooks/` for custom React hooks, `types/` for TypeScript definitions, `constants/` for constants, `content/` for Markdown content files.

### Content Organization

Content MUST be organized by type in `content/` directory: `content/posts/` for blog posts, `content/research/` for research articles, etc. Each content file MUST follow naming convention: `YYYY-MM-DD-slug.md`. Frontmatter MUST be valid YAML. Content files MUST be readable and parseable by server-side utilities. Images referenced in content MUST be stored in `public/` directory with organized subdirectories matching content structure.

### File Naming Conventions

Components: PascalCase (`UserProfile.tsx`). Utilities and hooks: camelCase (`useAuth.ts`, `formatDate.ts`). Types: PascalCase (`User.ts`). Constants: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`). Folders: kebab-case (`user-profile/`).

### Styling Standards

Tailwind CSS MUST be used with utility-first approach. Custom classes MUST minimize use of `@apply`. Responsive design MUST follow mobile-first approach. Dark mode MUST use `dark:` prefix. CSS Modules are allowed only for complex component-specific styles. Global styles MUST be in `app/globals.css` only.

## Code Quality Standards

### Error Handling

Error boundaries MUST be implemented using `error.tsx` files. User-friendly error messages MUST be provided. API errors MUST return appropriate HTTP status codes with clear, type-safe error responses.

### Testing & Validation

ESLint MUST be configured with `eslint-config-next`. Pre-commit lint checks are required. Code reviews MUST verify type safety, error handling, accessibility, and performance optimizations.

### Documentation

Comments MUST explain "why" not "what". Complex logic MUST include explanatory comments. TODO comments MUST include reason and plan. JSDoc is required only for public APIs.

### Function Guidelines

Functions MUST be kept under 50 lines when possible. Functions MUST have maximum 3 parameters; use object parameters for more. Pure functions are preferred when possible.

## Governance

This constitution supersedes all other coding practices and style guides. All PRs and code reviews MUST verify compliance with these principles. Any deviation from these principles MUST be justified with explicit rationale in code comments or PR descriptions. Complexity additions MUST be justified against simpler alternatives.

Amendments to this constitution require:
1. Documentation of the proposed change
2. Rationale for the change
3. Impact assessment on existing code
4. Version bump according to semantic versioning:
   - MAJOR: Backward incompatible principle removals or redefinitions
   - MINOR: New principle/section added or materially expanded guidance
   - PATCH: Clarifications, wording, typo fixes, non-semantic refinements

**Version**: 1.1.0 | **Ratified**: 2025-12-06 | **Last Amended**: 2025-12-06
