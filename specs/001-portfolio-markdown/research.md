# Research: Portfolio Markdown Management System

## Technology Stack Decisions

### Next.js 15+ App Router

**Decision**: Use Next.js 16.0.7 (current version) with App Router pattern.

**Rationale**: 
- App Router provides optimal performance through server-side rendering
- Automatic code splitting and built-in optimizations
- Server Components as default reduce client-side JavaScript
- Built-in support for metadata, loading states, and error boundaries

**Alternatives considered**:
- Pages Router: Rejected - App Router is the modern approach with better performance
- Other frameworks (Remix, SvelteKit): Rejected - Next.js provides best ecosystem and deployment options

### Shadcn UI Integration

**Decision**: Use Shadcn UI components via MCP (Model Context Protocol) integration.

**Rationale**:
- Shadcn provides accessible, customizable components built on Radix UI
- Copy-paste component pattern allows full control over code
- Works seamlessly with Tailwind CSS (already configured)
- TypeScript-first with excellent type safety

**Integration approach**:
- Use Shadcn MCP to fetch and integrate components
- Components will be placed in `components/ui/` directory
- Follow Shadcn's component structure and styling patterns

**Alternatives considered**:
- Material UI: Rejected - heavier bundle size, less customization
- Chakra UI: Rejected - Shadcn provides better TypeScript support and modern patterns

### Markdown Portfolio Management

**Decision**: Store portfolio posts as Markdown files in `content/posts/` directory with frontmatter metadata.

**Rationale**:
- Markdown is human-readable and version-controllable
- Frontmatter provides structured metadata (title, date, tags, etc.)
- Easy to edit without database setup
- Can be statically generated at build time for optimal performance

**Storage structure**:
```
content/
└── posts/
    ├── 2024-12-06-first-post.md
    ├── 2024-12-05-second-post.md
    └── ...
```

**Markdown parsing**:
- Use `remark` and `rehype` for parsing and rendering
- `remark-gfm` for GitHub Flavored Markdown support
- `rehype-highlight` or `rehype-prism` for code syntax highlighting
- `remark-mdx` if MDX features needed (optional)

**Alternatives considered**:
- Database storage (PostgreSQL, MongoDB): Rejected - overkill for portfolio, adds complexity
- CMS (Contentful, Sanity): Rejected - adds external dependency and cost
- Headless CMS: Rejected - Markdown files are simpler and more maintainable

### Playwright MCP Integration

**Decision**: Use Playwright MCP for automated browser testing after each implementation phase.

**Rationale**:
- Playwright provides reliable end-to-end testing
- MCP integration allows automated testing workflow
- Can test all pages and catch visual/functional errors
- Supports multiple browsers (Chromium, Firefox, WebKit)

**Testing strategy**:
- After each major feature implementation, run Playwright tests
- Test all routes and pages
- Verify UI components render correctly
- Check for console errors and accessibility issues
- Generate screenshots for visual regression (optional)

**Workflow**:
1. Implement feature
2. Run Playwright MCP to test all pages
3. Fix any errors found
4. Re-run tests to verify fixes
5. Continue to next feature

**Alternatives considered**:
- Cypress: Rejected - Playwright has better MCP integration and multi-browser support
- Manual testing: Rejected - automated testing is more reliable and faster

## Architecture Decisions

### File-based Content Management

**Decision**: Use file system for Markdown storage with Server Components for reading.

**Rationale**:
- No database needed for portfolio content
- Files can be version controlled
- Easy to backup and migrate
- Fast reads with Next.js file system APIs

**Implementation**:
- Server Components read Markdown files using Node.js `fs` module
- Parse frontmatter with `gray-matter` or `front-matter`
- Cache parsed content at build time or runtime

### Component Architecture

**Decision**: Modular component structure following constitution principles.

**Structure**:
```
components/
├── ui/              # Shadcn UI components
├── features/        # Feature-specific components
│   ├── portfolio/   # Portfolio-specific components
│   │   ├── PostCard.tsx
│   │   ├── PostList.tsx
│   │   └── PostContent.tsx
│   └── ...
└── layout/         # Layout components
```

**Rationale**: Follows single responsibility and modular architecture principles.

### Routing Strategy

**Decision**: Use App Router with dynamic routes for posts.

**Route structure**:
- `/` - Home page with portfolio list
- `/posts` - All posts listing page
- `/posts/[slug]` - Individual post page

**Rationale**: Clean URLs, SEO-friendly, leverages Next.js App Router benefits.

## Dependencies Required

### Core Dependencies
- `next`: 16.0.7 (already installed)
- `react`: 19.2.0 (already installed)
- `typescript`: ^5 (already installed)

### Markdown Processing
- `remark`: ^15.0.0 - Markdown parser
- `remark-gfm`: ^4.0.0 - GitHub Flavored Markdown
- `rehype`: ^13.0.0 - HTML processor
- `rehype-highlight`: ^7.0.0 - Code syntax highlighting
- `gray-matter`: ^4.0.0 - Frontmatter parsing

### UI Components
- Shadcn UI components (via MCP)
- `@radix-ui/*` packages (installed with Shadcn)
- `tailwindcss`: ^4 (already installed)
- `class-variance-authority`: For component variants
- `clsx`: For conditional class names
- `tailwind-merge`: For merging Tailwind classes

### Testing
- Playwright (via MCP)
- `@playwright/test`: ^1.40.0 (if needed for local testing)

## Performance Considerations

### Static Generation
- Use `generateStaticParams` for post pages at build time
- Pre-render all posts for optimal performance
- Use ISR (Incremental Static Regeneration) if needed for dynamic updates

### Image Optimization
- Use `next/image` for all images
- Optimize images in Markdown content
- Lazy load images below the fold

### Code Splitting
- Use `next/dynamic` for heavy components
- Lazy load Markdown renderer if needed
- Split vendor chunks appropriately

## Security Considerations

### Markdown Rendering
- Sanitize HTML output to prevent XSS
- Use `rehype-sanitize` for safe HTML rendering
- Validate frontmatter data

### File System Access
- Validate file paths to prevent directory traversal
- Limit file reading to `content/` directory only
- Handle file read errors gracefully

## Accessibility

### Markdown Content
- Ensure proper heading hierarchy
- Add alt text for images in Markdown
- Use semantic HTML in rendered content

### UI Components
- Shadcn components are accessible by default (Radix UI)
- Ensure keyboard navigation works
- Test with screen readers

## Deployment Considerations

### Build Process
- Parse all Markdown files at build time
- Generate static pages for all posts
- Optimize images during build

### Environment Variables
- No sensitive data needed for this feature
- Consider adding `CONTENT_DIR` if needed for flexibility

## Open Questions Resolved

1. **Q**: Should we use MDX instead of Markdown?
   **A**: No - Plain Markdown is sufficient. MDX adds complexity without clear benefit for portfolio posts.

2. **Q**: Should posts support categories/tags?
   **A**: Yes - Use frontmatter tags for filtering and organization.

3. **Q**: Should we support draft posts?
   **A**: Yes - Use frontmatter `draft: true` to hide from production.

4. **Q**: How to handle images in Markdown?
   **A**: Store images in `public/posts/[slug]/` and reference relatively in Markdown.

## Next Steps

1. Set up Shadcn UI components via MCP
2. Create Markdown parsing utilities
3. Design post data model and types
4. Implement post listing and detail pages
5. Set up Playwright testing workflow

