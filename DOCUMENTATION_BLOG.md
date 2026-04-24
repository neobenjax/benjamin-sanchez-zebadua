# The Strategic Feed: Content Documentation

This guide provides exactly how to scale the "FinTech Architect" Markdown blog engine. Generating new posts takes literally seconds once you master the formatting rules governing the static engine.

## 1. File Naming Conventions & Visibility
All posts are read sequentially from the `/content/posts/` directory. The engine utilizes a dual-visibility logic based on file names:

- **FEED POSTS**: Files starting with a numeric prefix like `###-` (e.g., `002-tax-drag.md`) are automatically indexed into the Strategic Feed and the Tag Dropdown.
- **STANDALONE PAGES**: Files without the numbered prefix (e.g., `about-me.md`) remain hidden from the main feed and dropdowns, but are accessible via direct URL (e.g., `/entry/about-me`).

Ensure strictly lowercase, hyphenated slugs since the file name is explicitly parsed directly into your URL path.

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
tags: ["VibeCoding", "Automation", "WealthManagement"]
---
```
**Tags Instruction:** The `tags` array is mandatory. Tags are **Case-Insensitive** for filtering purposes, but their capitalization is preserved exactly as typed for the UI.
> **Warning:** If you skip this block, the engine will crash looking for strings to map to the `Insights.tsx` components.

## 3. Asset Management & Accessibility
Images used inside a markdown post MUST live inside the global React `/public/` tree, otherwise, the compiler won't track them.
- Save your images specifically to: `/public/images/posts/your-post-slug/`.
- Call them directly in Markdown relative to the root: 
  `![Image Title](/images/posts/your-post-slug/graphic.jpg)`

**Accessibility Enhancements:**
- **Zoom Component:** Images rendered in posts are interactive and can be clicked to enlarge.
- **Responsive Tables:** Tables are wrapped in a responsive container, meaning they will automatically scroll horizontally on mobile devices to prevent layout overflow.

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

## 6. Taxonomy Engine
The tagging engine is powered by a build hook (`scripts/generate-tags.mjs`). 
- Every time a new post is added or a tag is modified in the front-matter, a production build (or local `npm run build`) **must run**.
- This script extracts and deduplicates all tags, refreshing the global Dropdown Filter and updating the `src/data/tags.json` file.

## 7. Interactive Features
The blog engine includes several interactive UX features to improve content discovery:
- **Skill Pills:** Clicking a tag (Skill Pill) on a post automatically redirects the user to the Insights archive, pre-filtered for that specific tag.
- **Discovery Dropdown & Clear Filter:** A dynamic dropdown allows users to filter the strategic feed by taxonomy. A "Clear Filter" option is available to reset the view and show all posts.
