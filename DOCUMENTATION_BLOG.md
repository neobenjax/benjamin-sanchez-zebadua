# The Strategic Feed: Content Documentation

This guide provides exactly how to scale the "FinTech Architect" Markdown blog engine. Generating new posts takes literally seconds once you master the formatting rules governing the static engine.

## 1. File Naming Conventions
All posts are read sequentially from the `/content/posts/` directory.
- Formatting must perfectly follow `00X-slug-name.md`.
- Example: `005-estate-planning-logic.md`.
- Ensure strictly lowercase, hyphenated slugs since the file name is explicitly parsed directly into your URL path (e.g., `/entry/005-estate-planning-logic`).

## 2. Front-Matter Metadata Rules
Every markdown `.md` file MUST open and close with `---`. This is the Gray-Matter configuration block. 
```markdown
---
title: "Your High-Level Post Title"
date: "YYYY-MM-DD"
description: "A 1-2 sentence hook explaining the insight."
category: "Engineering Protocol | Equity Research | Thought Leadership"
author: "Benjamin Sanchez Zebadua"
coverImage: "/images/posts/00-slug-name/cover.png"
---
```
> **Warning:** If you skip this block, the engine will crash looking for strings to map to the `Insights.tsx` components.

## 3. Asset Management (Images)
Images used inside a markdown post MUST live inside the global React `/public/` tree, otherwise, the compiler won't track them.
- Save your images specifically to: `/public/images/posts/your-post-slug/`.
- Call them directly in Markdown relative to the root: 
  `![Image Title](/images/posts/your-post-slug/graphic.jpg)`

## 4. Deployment Pipeline
The application runs on a Git-driven CI/CD loop (specifically mapped to Vercel or similar hosts).
1. When you commit and push a new `.md` file to the `main` branch.
2. The GitHub action hook automatically triggers a rebuild.
3. The `generateStaticParams()` mapping executes at build time, securely caching the string logic for lightning-fast delivery to end-users without dynamic server fetch load.

## 5. CSS Typography Overrides
All elements you type in standard Git-Flavored Markdown natively inject the `@tailwindcss/typography` styles configured across `globals.css` and `page.tsx`.
- Header fonts scale `var(--font-serif)` securely.
- Basic text inherits the `text-gray-300` constraints for contrast preservation.
- Blockquotes force a heavy left-border `accent` (Success Green).
