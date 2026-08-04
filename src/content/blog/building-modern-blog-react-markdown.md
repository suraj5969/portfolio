---
title: "Building a Modern Blog with React & Markdown"
slug: "building-modern-blog-react-markdown"
date: "2026-08-04"
excerpt: "A deep dive into how I built this very blog section — parsing Markdown at build time, lazy-loading routes, syntax highlighting, and making it all look beautiful with a custom dark theme."
tags: ["react", "markdown", "vite", "typescript", "webdev"]
published: false
---

Every developer should have a blog. Not because the world needs more hot takes on JavaScript frameworks, but because writing forces you to **actually understand** what you're building. So here it is — my blog, built right into my portfolio.

## Why Markdown?

I wanted the simplest possible authoring experience. No CMS dashboard, no database, no WYSIWYG editor that produces garbage HTML. Just a `.md` file in my repo.

Here's what a blog post file looks like:

```markdown
---
title: "Your Post Title"
slug: "your-post-title"
date: "2026-08-04"
excerpt: "A short summary for the card."
tags: ["react", "typescript"]
published: true
---

Your content here...
```

The frontmatter (the YAML between `---`) contains metadata. Everything below it is your content. Simple.

## The Tech Stack

This blog is built with a deliberately minimal stack:

| Technology         | Role                         |
| ------------------ | ---------------------------- |
| **Vite**           | Build tool + dev server      |
| **React**          | UI rendering                 |
| **react-markdown** | Markdown → React components  |
| **gray-matter**    | Frontmatter parsing          |
| **highlight.js**   | Syntax highlighting          |
| **reading-time**   | Auto-calculated reading time |

> **Why not MDX?** MDX is powerful but adds complexity. For a personal blog, standard Markdown with good styling is more than enough. KISS.

## How It Works

The build pipeline has three stages:

1. **Parse** — A custom Vite plugin reads all `.md` files from `src/content/blog/`
2. **Transform** — `gray-matter` splits frontmatter from content, `reading-time` calculates the read duration
3. **Serve** — The data is exposed as a virtual module that React components can import

### The Vite Plugin

The magic happens in a ~70-line Vite plugin:

```typescript
import type { Plugin } from "vite";
import matter from "gray-matter";
import readingTime from "reading-time";

export default function blogPlugin(): Plugin {
  return {
    name: "vite-plugin-blog",
    resolveId(id) {
      if (id === "virtual:blog-posts") return "\0virtual:blog-posts";
    },
    load(id) {
      if (id === "\0virtual:blog-posts") {
        const posts = loadAndParsePosts();
        return `export default ${JSON.stringify(posts)};`;
      }
    },
  };
}
```

It even supports **HMR** — edit a Markdown file and the browser refreshes automatically.

### Lazy Loading

The blog pages are loaded with `React.lazy()`, so visiting the portfolio homepage doesn't download any blog code:

```tsx
const BlogListPage = lazy(() => import("./components/blog/BlogListPage"));
const BlogPostPage = lazy(() => import("./components/blog/BlogPostPage"));
```

This keeps the initial bundle lean. Blog assets are only fetched when you navigate to `/blog`.

## Code Highlighting

Code blocks get full syntax highlighting. Here are some examples across languages:

### JavaScript

```javascript
async function fetchPosts() {
  const response = await fetch("/api/posts");
  const data = await response.json();

  return data.filter((post) => post.published).sort((a, b) => new Date(b.date) - new Date(a.date));
}
```

### Python

```python
from dataclasses import dataclass
from datetime import datetime

@dataclass
class BlogPost:
    title: str
    slug: str
    date: datetime
    content: str
    tags: list[str]

    @property
    def reading_time(self) -> int:
        words = len(self.content.split())
        return max(1, round(words / 200))
```

### CSS

```css
.blog-prose h2 {
  background: linear-gradient(135deg, #ffdb70 0%, #ff7600 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-top: 2.5rem;
}
```

### Bash

```bash
# Create a new blog post
touch src/content/blog/my-new-post.md

# Start dev server with HMR
npm run dev

# Build for production
npm run build
```

## Typography & Formatting

The blog supports all standard Markdown formatting:

**Bold text** for emphasis, _italic text_ for subtle emphasis, and `inline code` for technical terms. You can also use ~~strikethrough~~ for corrections.

### Lists

Unordered lists:

- React components render Markdown nodes
- Each node type maps to a styled element
- Custom components override defaults
  - Nested items are indented
  - Multiple levels supported

Ordered lists:

1. Write your post in Markdown
2. Add frontmatter with metadata
3. Place the file in `src/content/blog/`
4. The build system handles the rest

### Task Lists

- [x] Set up Vite plugin for Markdown processing
- [x] Create blog list and post pages
- [x] Add syntax highlighting
- [x] Implement lazy loading
- [ ] Add RSS feed
- [ ] Add search functionality

### Blockquotes

> "Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
>
> — Martin Fowler

Blockquotes can also contain multiple paragraphs:

> This is the first paragraph of a longer quote.
>
> And this is the second paragraph. Notice how the left border spans the entire block, using the same gradient accent as the rest of the site.

### Links

Links work naturally: check out [React's documentation](https://react.dev) or the [Vite build tool](https://vite.dev).

### Horizontal Rules

Use horizontal rules to separate major sections:

---

## Tables

Tables are rendered with proper styling:

| Feature             | Status     | Notes                          |
| ------------------- | ---------- | ------------------------------ |
| Markdown rendering  | ✅ Done    | Using react-markdown           |
| Syntax highlighting | ✅ Done    | highlight.js with custom theme |
| Lazy loading        | ✅ Done    | React.lazy + Suspense          |
| Tag filtering       | ✅ Done    | Click tags to filter           |
| Reading time        | ✅ Done    | Auto-calculated                |
| Cover images        | ✅ Done    | Optional, gradient fallback    |
| RSS feed            | 🔜 Planned | Coming soon                    |

## Images

Images are rendered responsively with rounded corners:

![Vite Logo](https://vite.dev/logo.svg)

## What's Next?

This blog is just getting started. Here's what I'm planning:

1. **RSS Feed** — So you can subscribe
2. **Search** — Full-text search across all posts
3. **Series** — Group related posts together
4. **Comments** — Probably via GitHub Discussions

But for now, it works. It's fast, it's simple, and it lets me write in Markdown — which is all I ever wanted.

---

_Thanks for reading! If you found this useful, feel free to check out the [source code on GitHub](https://github.com/suraj5969)._
