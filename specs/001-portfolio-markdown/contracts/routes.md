# API Contracts: Portfolio Routes

## Route Specifications

### GET /

**Purpose**: Home page displaying recent portfolio posts.

**Route**: `/`

**Component**: `app/page.tsx`

**Type**: Server Component

**Data Fetching**:
- Reads all posts from `content/posts/`
- Filters out drafts in production
- Sorts by date (newest first)
- Limits to recent posts (e.g., 6-10 posts)

**Response**: Renders home page with post previews

**Error Handling**: 
- If no posts found, show empty state
- If file read fails, show error boundary

---

### GET /posts

**Purpose**: All posts listing page.

**Route**: `/posts`

**Component**: `app/posts/page.tsx`

**Type**: Server Component

**Data Fetching**:
- Reads all posts from `content/posts/`
- Filters out drafts in production
- Sorts by date (newest first)

**Query Parameters**: None (future: `?tag=nextjs` for filtering)

**Response**: Renders posts listing page with all posts

**Error Handling**:
- If no posts found, show empty state
- If file read fails, show error boundary

---

### GET /posts/[slug]

**Purpose**: Individual post detail page.

**Route**: `/posts/[slug]`

**Component**: `app/posts/[slug]/page.tsx`

**Type**: Server Component

**Data Fetching**:
- Reads post file: `content/posts/[slug].md`
- Parses frontmatter and content
- Validates slug exists

**Dynamic Params**:
- `slug`: string (URL-friendly identifier)

**Response**: Renders full post with Markdown content

**Error Handling**:
- If post not found, return 404 (not-found.tsx)
- If file read fails, show error boundary
- If invalid slug format, return 404

**Static Generation**:
- Use `generateStaticParams` to pre-render all posts at build time
- Returns array of `{ slug: string }` objects

---

## Data Types

### PostMetadata (for listings)

```typescript
interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  image?: string;
}
```

### Post (for detail page)

```typescript
interface Post extends PostMetadata {
  content: string; // Rendered HTML from Markdown
}
```

## Error Responses

### 404 Not Found

**Trigger**: Post slug doesn't exist or invalid

**Component**: `app/not-found.tsx` or `app/posts/[slug]/not-found.tsx`

**Response**: Custom 404 page

### 500 Internal Server Error

**Trigger**: File system error, parsing error

**Component**: `app/error.tsx` or `app/posts/[slug]/error.tsx`

**Response**: Error boundary with user-friendly message

## Performance Considerations

### Static Generation

- All post pages should be statically generated at build time
- Use `generateStaticParams` to pre-render all posts
- Revalidate with ISR if needed (optional)

### Caching

- Post metadata cached in Server Component
- Markdown parsing cached during build
- No client-side data fetching needed

## Future API Extensions

Potential additions (not in initial scope):

- `GET /api/posts` - JSON API endpoint
- `GET /api/posts/[slug]` - JSON API for single post
- `GET /api/posts?tag=nextjs` - Filtered posts API
- `GET /api/posts/search?q=query` - Search API

