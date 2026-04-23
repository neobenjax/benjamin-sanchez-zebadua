# Implementation Plan: Interactive Skill Tagging System

## 1. Front-Matter Parsing Update (`src/lib/posts.ts`)
- Update `PostInfo` and `PostContent` interfaces to include `tags: string[]`.
- Update `getSortedPostsData` and `getPostData` to extract the `tags` array from `matterResult.data.tags`. Ensure it falls back to an empty array `[]` if not present.

## 2. UI Implementation: SkillTag Component (`src/components/SkillTag.tsx`)
- Create a `SkillTag` React component inside `src/components/SkillTag.tsx` for reusability. It should receive `tag: string`.
- Styles: Small 'pill' shape, thin Success Green (`#10B981` / `text-accent` / `border-accent`) border, transparent background, Success Green text.
- Interaction: Wrapper is a `Link` directing to `/insights?tag={tag}`.

## 3. UI Implementation: Single Post View (`src/app/entry/[slug]/page.tsx`)
- Import the `SkillTag` component.
- Extract `post.frontMatter.tags`.
- Top Placement: Display the tags container between the description and the first H1 header (before the markdown content).
- Bottom Placement: Display the tags container right after the markdown content block, just before the footer container.

## 4. Filtering Logic (`src/app/insights/page.tsx`)
- Update the page component to receive `searchParams` as a Promise (adhering to Next.js >15 conventions).
- Await `searchParams` and extract the `tag` parameter.
- Filter the `posts` array to only include those containing the active tag.
- Render an active filter indicator and a "Clear Filter" button when a tag is selected.

## 5. Template Update (`content/posts/*.md`)
- Update `000-template.md` front-matter to include `tags: ["architecture", "automation"]`.
- Update the other existing markdown files (`000-welcome.md`, `001-vibecoding-workflow.md`) with placeholder tags to test the system properly.
