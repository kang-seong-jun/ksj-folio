# Quickstart Guide: Portfolio Markdown Management

## Prerequisites

- Node.js 20+ installed
- npm or yarn package manager
- Git repository initialized

## Initial Setup

### 1. Install Dependencies

```bash
# Core dependencies (already installed)
npm install

# Markdown processing libraries
npm install remark remark-gfm rehype rehype-highlight gray-matter

# Shadcn UI dependencies (will be installed via MCP)
# class-variance-authority clsx tailwind-merge
npm install class-variance-authority clsx tailwind-merge

# Type definitions
npm install --save-dev @types/gray-matter
```

### 2. Set Up Shadcn UI

Shadcn components will be integrated via MCP. Components will be placed in `components/ui/` directory.

### 3. Create Content Directory

```bash
mkdir -p content/posts
```

### 4. Create Sample Post

Create `content/posts/2024-12-06-welcome.md`:

```markdown
---
title: "Welcome to My Portfolio"
date: "2024-12-06"
description: "Introduction to my portfolio"
tags:
  - welcome
  - introduction
draft: false
---

# Welcome

This is my portfolio built with Next.js and Markdown.

## Features

- Markdown-based content
- Fast static generation
- Beautiful UI with Shadcn
```

## Development Workflow

### 1. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the home page.

### 2. Create New Post

1. Create a new `.md` file in `content/posts/`
2. Add frontmatter with required fields
3. Write Markdown content
4. Save file
5. Restart dev server (or use file watching if implemented)

### 3. View Posts

- Home page: `http://localhost:3000` (recent posts)
- All posts: `http://localhost:3000/posts`
- Individual post: `http://localhost:3000/posts/[slug]`

## Testing with Playwright MCP

After implementing each feature:

1. Ensure dev server is running (`npm run dev`)
2. Use Playwright MCP to:
   - Navigate to all routes
   - Check for console errors
   - Verify UI renders correctly
   - Test accessibility
3. Fix any errors found
4. Re-run Playwright tests to verify

## Project Structure

```
ksj-folio/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page
│   ├── posts/             # Posts routes
│   └── ...
├── components/            # React components
│   ├── ui/               # Shadcn components
│   └── features/         # Feature components
├── lib/                  # Utilities
│   └── markdown/         # Markdown parsing
├── types/                # TypeScript types
├── content/              # Content files
│   └── posts/           # Markdown posts
└── public/              # Static assets
    └── posts/           # Post images
```

## Common Tasks

### Adding a New Post

1. Create file: `content/posts/YYYY-MM-DD-slug.md`
2. Add frontmatter:
   ```yaml
   ---
   title: "Post Title"
   date: "YYYY-MM-DD"
   description: "Description"
   tags: ["tag1", "tag2"]
   ---
   ```
3. Write Markdown content
4. Restart dev server

### Adding Images to Posts

1. Create directory: `public/posts/[slug]/`
2. Place images in that directory
3. Reference in Markdown: `![Alt text](/posts/[slug]/image.jpg)`

### Draft Posts

Set `draft: true` in frontmatter to hide from production:

```yaml
---
title: "Draft Post"
draft: true
---
```

Drafts are hidden in production but visible in development.

## Building for Production

```bash
npm run build
```

This will:
- Parse all Markdown files
- Generate static pages for all posts
- Optimize images
- Create production bundle

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Vercel will automatically:
   - Detect Next.js
   - Run build command
   - Deploy static pages

### Other Platforms

Any platform supporting Next.js static export or serverless functions works.

## Troubleshooting

### Posts Not Showing

- Check file is in `content/posts/` directory
- Verify frontmatter is valid YAML
- Ensure `draft: false` (or in development mode)
- Check file extension is `.md`

### Markdown Not Rendering

- Verify `remark` and `rehype` are installed
- Check Markdown syntax is valid
- Review console for parsing errors

### Images Not Loading

- Verify image path is relative to `public/` directory
- Check file exists in `public/posts/[slug]/`
- Ensure path in Markdown matches actual file location

## Next Steps

1. Customize UI components
2. Add more post metadata fields if needed
3. Implement tag filtering
4. Add search functionality (optional)
5. Set up analytics (optional)

