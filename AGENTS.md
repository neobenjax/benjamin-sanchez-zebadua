<!-- BEGIN:nextjs-agent-rules -->
# Next.js 16 & React 19 Project Directives

This project uses Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and pnpm.
<!-- END:nextjs-agent-rules -->

# Agent Directives & Operating System Guidelines (AGENTS.md)

This file contains strict behavioral rules and architecture guidelines for AI coding agents operating on this repository.

## 1. Package Manager & Script Execution
- **Mandatory Package Manager**: Always use `pnpm` (`npx pnpm`).
- Do NOT generate or use `package-lock.json` or `yarn.lock`.
- Use `pnpm run lint:css` to verify CSS compliance and `pnpm test` to run Vitest unit & accessibility tests.

## 2. CSS Guardrail: Strict Prohibited Use of `!important`
- The use of `!important` in any stylesheet (`.css`, `.scss`) or inline style is **STRICTLY PROHIBITED**.
- Any style override MUST be achieved through standard CSS specificity and CSS custom property cascades.
- Run `pnpm lint:css` to validate zero `!important` violations before completing any styling task.

## 3. Design System & Style Synchronization
- Both the main portfolio website and `/theme-personalize` MUST share identical fonts (`Inter` and `Playfair Display`), radii (`rounded-sm`), glassmorphism utilities, and UI primitives from `src/components/ui/`.
- Color tokens MUST be bound to root CSS custom properties (`--color-primary`, `--color-accent`, etc.) managed via `ThemeContext`.
- Theme changes MUST trigger `localStorage` updates to allow real-time cross-tab synchronization.

## 4. Multi-Directory Content Taxonomy
- Content is organized strictly into three subdirectories under `/content`:
  - `content/posts/` (Technical engineering insights)
  - `content/pages/` (Platform pages like `about-me.md`)
  - `content/articles/` (Analytical essays and leadership stories)
- Every content change MUST be followed by `npx pnpm node scripts/generate-tags.mjs`.

## 5. Automated Testing & Accessibility (WCAG AA)
- Every component and theme utility MUST include unit tests and `axe-core` accessibility tests using `vitest-axe` in `src/test/`.
- All interactive controls MUST include explicit `<label>` or `aria-label` attributes.

## 6. Available Agent Skills (`.agents/skills/`)
Agents MUST consult the specialized skill instructions in `.agents/skills/` when executing tasks:
- **`content-creator`** (`.agents/skills/content-creator/SKILL.md`): For creating or modifying posts, pages, and articles.
- **`ui-component-builder`** (`.agents/skills/ui-component-builder/SKILL.md`): For creating atomic UI components adhering to design tokens and CSS guardrails.
- **`design-system-tuner`** (`.agents/skills/design-system-tuner/SKILL.md`): For extending theme tokens, presets, and tuner capabilities.
