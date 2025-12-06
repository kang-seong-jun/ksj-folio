# Data Model: Portfolio Markdown Management

## Entities

### Post

**Description**: A portfolio post/article stored as a Markdown file with frontmatter metadata.

**Location**: `content/posts/[slug].md`

**Fields**:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `slug` | `string` | Yes | URL-friendly identifier, derived from filename | `"first-post"` |
| `title` | `string` | Yes | Post title | `"My First Portfolio Post"` |
| `date` | `string` (ISO 8601) | Yes | Publication date | `"2024-12-06"` |
| `description` | `string` | No | Short description for previews | `"A brief description"` |
| `tags` | `string[]` | No | Array of tag strings | `["nextjs", "portfolio"]` |
| `draft` | `boolean` | No | If true, post is hidden in production | `false` |
| `content` | `string` | Yes | Markdown content body | `"# Content\n\n..."` |
| `image` | `string` | No | Featured image path (relative to public) | `"/posts/first-post/hero.jpg"` |

**Frontmatter Format** (YAML):

```yaml
---
title: "My First Portfolio Post"
date: "2024-12-06"
description: "A brief description of the post"
tags:
  - nextjs
  - portfolio
draft: false
image: "/posts/first-post/hero.jpg"
---

# Post Content

Markdown content goes here...
```

**Relationships**:
- None (posts are independent)

**Validation Rules**:
- `slug` must be URL-safe (lowercase, alphanumeric, hyphens only)
- `date` must be valid ISO 8601 date string
- `title` cannot be empty
- `tags` must be array of non-empty strings
- `draft` defaults to `false` if not specified

**State Transitions**:
- Draft → Published: Set `draft: false` in frontmatter
- Published → Draft: Set `draft: true` in frontmatter

### PostMetadata

**Description**: Extracted frontmatter metadata from a Post, used for listings and previews.

**Fields**: Same as Post, excluding `content` field.

**Purpose**: Lightweight representation for post listings without loading full content.

## Data Access Patterns

### Get All Posts

**Purpose**: Retrieve metadata for all published posts (excluding drafts in production).

**Implementation**: 
- Read all `.md` files from `content/posts/`
- Parse frontmatter from each file
- Filter out drafts if `NODE_ENV === 'production'`
- Sort by date (newest first)

**Return Type**: `PostMetadata[]`

### Get Post by Slug

**Purpose**: Retrieve full post content including Markdown body.

**Implementation**:
- Read `content/posts/[slug].md`
- Parse frontmatter and content
- Return full Post object

**Return Type**: `Post | null`

### Get Posts by Tag

**Purpose**: Filter posts by tag.

**Implementation**:
- Get all posts
- Filter where `tags` array includes target tag
- Return filtered `PostMetadata[]`

**Return Type**: `PostMetadata[]`

## TypeScript Types

```typescript
// types/post.ts

export interface PostFrontmatter {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  draft?: boolean;
  image?: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
}

export interface PostMetadata extends PostFrontmatter {
  slug: string;
}
```

## File Structure Example

```
content/
└── posts/
    ├── 2024-12-06-first-post.md
    ├── 2024-12-05-second-post.md
    └── 2024-12-04-draft-post.md (draft: true)
```

**Filename Convention**: `YYYY-MM-DD-slug.md`

- Date prefix for chronological organization
- Slug for URL-friendly identifier
- `.md` extension for Markdown files

## Storage Considerations

### File System

- **Advantages**: Version control friendly, easy to edit, no database needed
- **Limitations**: File system reads (acceptable for portfolio scale)
- **Scalability**: Suitable for 100+ posts without performance issues

### Caching Strategy

- **Build Time**: Parse all posts during `next build`
- **Runtime**: Cache parsed posts in memory (Server Components)
- **Invalidation**: Restart dev server or rebuild for new posts

## Migration Path

If migrating from database or CMS:

1. Export posts to Markdown format
2. Add frontmatter metadata
3. Place files in `content/posts/`
4. Update code to use file-based reading

## Future Enhancements

Potential additions (not in initial scope):

- Post categories (separate from tags)
- Author information
- Reading time calculation
- Related posts by tags
- Post series/collections

