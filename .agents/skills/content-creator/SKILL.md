---
name: content-creator
description: Guides agents and developers in creating and managing Markdown content across multi-directory taxonomy (posts, pages, articles).
---

# Content Creator Skill

Use this skill whenever creating, modifying, or managing content files in this project.

## Directory Taxonomy Rules
All content is organized into three distinct subdirectories under `/content`:

1. **Posts (`/content/posts/`)**: Technical insights, software engineering deep dives, and system architecture articles.
2. **Pages (`/content/pages/`)**: Standalone platform pages (e.g. `about-me.md`, `resume.md`).
3. **Articles (`/content/articles/`)**: Analytical essays, leadership stories, and finance/wealth strategy entries.

## Frontmatter Schema
Every Markdown file MUST begin with valid YAML frontmatter:

```yaml
---
title: "Descriptive Entry Title"
date: "YYYY-MM-DD"
description: "A concise 1-2 sentence hook summarizing the entry."
category: "Engineering Protocol | Community Impact | Wealth Strategy"
type: "posts" # "posts" | "pages" | "articles"
tags: ["NextJS", "FinTech", "TypeScript"] # Optional array
---
```

## Post-Creation Step
After adding or editing any Markdown content, ALWAYS run the tag indexing script to update `src/data/tags.json`:

```bash
npx pnpm node scripts/generate-tags.mjs
```
