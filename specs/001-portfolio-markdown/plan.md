# Implementation Plan: Portfolio Markdown Management System

**Branch**: `001-portfolio-markdown` | **Date**: 2025-12-06 | **Spec**: `/specs/001-portfolio-markdown/spec.md`

**Input**: Feature specification from user requirements

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement a portfolio management system using Markdown files for content storage, Shadcn UI for components, and Playwright MCP for automated testing. The system will allow managing portfolio posts as Markdown files with frontmatter metadata, displaying them using Next.js App Router with Server Components, and automatically testing all pages after implementation.

**Technical Approach**: File-based content management with Next.js App Router Server Components for optimal performance. Shadcn UI components integrated via MCP for accessible, customizable UI. Playwright MCP integration for automated end-to-end testing workflow.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 20+  
**Primary Dependencies**: Next.js 16.0.7, React 19.2.0, Shadcn UI (via MCP), Tailwind CSS 4, remark/rehype for Markdown processing  
**Storage**: File system (`content/posts/*.md` files with frontmatter)  
**Testing**: Playwright (via MCP), ESLint with eslint-config-next  
**Target Platform**: Web (Next.js deployment - Vercel recommended)  
**Project Type**: Web application (Next.js App Router)  
**Performance Goals**: 
- Static generation for all posts at build time
- <100ms page load time for post pages
- <500ms initial page load for home page
- Optimized images with next/image

**Constraints**: 
- Must follow Next.js 15+ best practices (constitution compliance)
- All components must be modular and follow single responsibility
- TypeScript strict mode required
- Accessibility WCAG AA minimum
- Mobile-first responsive design

**Scale/Scope**: 
- Initial: ~10-20 portfolio posts
- Scalable to 100+ posts without performance degradation
- Single developer workflow with automated testing

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Compliance Verification**:
- [x] Code follows modular architecture with single responsibility per module
- [x] Next.js App Router patterns are used (Server Components default, explicit Client Components)
- [x] TypeScript types are explicitly defined (strict mode)
- [x] Components follow consistent structure (imports → types → component → hooks → handlers → render)
- [x] Performance optimizations applied (code splitting, memoization, image optimization)
- [x] Accessibility standards met (semantic HTML, alt attributes, keyboard navigation)
- [x] File naming conventions followed (PascalCase components, camelCase utilities)
- [x] Error handling implemented with user-friendly messages
- [x] ESLint rules followed (eslint-config-next)

**Status**: ✅ PASSED - All constitution requirements are met by the planned architecture.

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-markdown/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
app/
├── (routes)/
│   ├── page.tsx                    # Home page with portfolio list
│   ├── layout.tsx                  # Root layout
│   ├── loading.tsx                 # Loading UI
│   ├── error.tsx                   # Error boundary
│   ├── not-found.tsx               # 404 page
│   └── posts/
│       ├── page.tsx                # Posts listing page
│       └── [slug]/
│           ├── page.tsx            # Individual post page
│           └── loading.tsx         # Post loading state
├── globals.css                      # Global styles
└── layout.tsx                       # Root layout (already exists)

components/
├── ui/                              # Shadcn UI components (via MCP)
│   ├── button.tsx
│   ├── card.tsx
│   └── ...                         # Other Shadcn components
├── features/
│   └── portfolio/
│       ├── PostCard.tsx            # Post preview card
│       ├── PostList.tsx            # Posts listing component
│       ├── PostContent.tsx         # Markdown content renderer
│       └── PostMetadata.tsx       # Post metadata display
└── layout/
    ├── Header.tsx                  # Site header
    ├── Footer.tsx                  # Site footer
    └── Navigation.tsx             # Navigation component

lib/
├── markdown/
│   ├── parsePost.ts                # Parse Markdown file with frontmatter
│   ├── getAllPosts.ts              # Get all posts metadata
│   ├── getPostBySlug.ts            # Get single post by slug
│   └── renderMarkdown.ts          # Render Markdown to HTML
└── utils/
    ├── cn.ts                       # Class name utility (for Shadcn)
    └── date.ts                     # Date formatting utilities

types/
└── post.ts                         # Post type definitions

content/
└── posts/                          # Markdown files
    ├── 2024-12-06-first-post.md
    └── ...

public/
└── posts/                          # Post images
    └── [slug]/
        └── ...
```

**Structure Decision**: Single Next.js App Router project with modular component architecture. Content stored as Markdown files in `content/posts/` directory. Components organized by feature (portfolio) and type (ui, layout). Utilities separated into `lib/` directory following single responsibility principle.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations - architecture follows all constitution principles.

## Phase 0: Research

**Status**: ✅ COMPLETE

See `research.md` for detailed technology decisions and rationale.

**Key Decisions**:
1. Next.js App Router with Server Components
2. Shadcn UI via MCP integration
3. File-based Markdown storage
4. Playwright MCP for automated testing
5. remark/rehype for Markdown processing

## Phase 1: Design & Contracts

### Data Model

See `data-model.md` for detailed entity definitions.

**Core Entities**:
- **Post**: Portfolio post with frontmatter metadata and Markdown content
- **PostMetadata**: Frontmatter fields (title, date, tags, draft, etc.)

### API Contracts

See `contracts/` directory for detailed API specifications.

**Routes**:
- `GET /` - Home page with recent posts
- `GET /posts` - All posts listing
- `GET /posts/[slug]` - Individual post page

**Data Flow**:
1. Server Component reads Markdown files from `content/posts/`
2. Parses frontmatter and content
3. Renders Markdown to HTML
4. Returns to client as Server Component

### Quickstart Guide

See `quickstart.md` for setup and usage instructions.

**Quick Overview**:
1. Install dependencies (Shadcn via MCP, markdown libraries)
2. Create `content/posts/` directory
3. Add Markdown files with frontmatter
4. Run `npm run dev` to start development server
5. Use Playwright MCP to test all pages

## Next Steps

1. Generate tasks using `/speckit.tasks` command
2. Implement foundation (Markdown parsing utilities)
3. Set up Shadcn UI components
4. Create post listing and detail pages
5. Integrate Playwright MCP testing workflow
6. Deploy and verify
