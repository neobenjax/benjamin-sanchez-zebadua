<!-- BEGIN:nextjs-agent-rules -->
# Next.js 16 & React 19 Project Directives

This project uses Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and pnpm.
<!-- END:nextjs-agent-rules -->

# Agent Directives & Solutions Architecture Team Guidelines (AGENTS.md)

This file contains strict behavioral rules, team role definitions, and architecture guidelines for AI coding agents operating on this repository.

## 1. Solutions Architecture Team & Role Taxonomy
AI agents and human developers operating on this repository act as a cross-functional Solutions Architecture squad comprising four specialized personas:

- **Solutions Architect (Lead)**: Responsible for system architecture, cross-functional task planning, deterministic vs. non-deterministic workflow separation, scripting strategy, and git release flow management.
- **Senior Front End Developer**: Responsible for React/Next.js 16 App Router UI components, theme custom property binding (`var(--color-primary)`), responsive layouts, and UI accessibility (WCAG AA).
- **Senior Backend Developer**: Responsible for transpiler engines (`src/lib/fragments.ts`, `src/lib/designSystemMd.ts`), AST parsing, color math algorithms (`src/lib/colorEngine.ts`), and deterministic Node.js utility scripts.
- **Senior UX Designer**: Responsible for design system specifications (`getdesign.md`), typography and spacing scales, visual hierarchy, surface elevation models, and component Do's and Don'ts.

## 2. Task Execution Strategy: Parallel vs. Dependent Workflows

### A. Parallel Task Execution Directives
Tasks MUST be executed concurrently when there are no strict data dependencies between them.
- **Example**: A UX Designer auditing UI components in `DesignCatalog.tsx` can run in parallel with a Backend Developer expanding color algorithms in `colorEngine.ts`.
- **Example**: Front-end refactoring of `FragmentHeader.tsx` styling can run concurrently with backend script creation (`scripts/validate-design-specs.mjs`).

### B. Dependent Task Execution Directives
Tasks MUST be executed sequentially in strict order when downstream steps depend on upstream outputs.
- **Example**: Updating the design specification schema (UX/BE) MUST complete BEFORE upgrading `exportDesignSystemToMarkdown()` and `generateRandomAccessibleTheme()` generators.
- **Example**: Upgrading the design markdown generator MUST complete BEFORE implementing the live Theme Tuner "Documentation" section.
- **Example**: All code edits and test passes MUST complete BEFORE generating user walkthroughs and executing git release procedures.

## 3. Deterministic vs. Non-Deterministic Workflow Separation
To optimize AI token usage and maintain system reliability, tasks MUST be divided by determinism:

- **Deterministic Workflows (Use Scripts)**:
  - Token calculations, luminance ratio math, and WCAG contrast validation.
  - Tag generation across posts (`scripts/generate-tags.mjs`).
  - Validation of `design.md` Markdown files against schema rules (`scripts/validate-design-specs.mjs`).
  - CSS rule verification (`pnpm run lint:css`) and test suite execution (`pnpm test`).
  
- **Non-Deterministic Workflows (Use AI Reasoning)**:
  - Interpreting subjective brand tone, visual balance, and key characteristics of imported design systems.
  - Generating contextual Do's and Don'ts for custom design themes.
  - Resolving design trade-offs and accessibility fallback strategies.

## 4. Package Manager & Script Execution
- **Mandatory Package Manager**: Always use `pnpm` (`npx pnpm`).
- Do NOT generate or use `package-lock.json` or `yarn.lock`.
- Use `pnpm run lint:css` to verify CSS compliance and `pnpm test` to run Vitest unit & accessibility tests.

## 5. CSS Guardrail: Strict Prohibited Use of `!important`
- The use of `!important` in any stylesheet (`.css`, `.scss`) or inline style is **STRICTLY PROHIBITED**.
- Any style override MUST be achieved through standard CSS specificity and CSS custom property cascades.
- Run `pnpm lint:css` to validate zero `!important` violations before completing any styling task.

## 6. Design System & Style Synchronization
- Both the main portfolio website and `/theme-personalize` MUST share identical fonts (`Inter` and `Playfair Display`), radii (`rounded-sm`), glassmorphism utilities, and UI primitives from `src/components/ui/`.
- Color tokens MUST be bound to root CSS custom properties (`--color-primary`, `--color-accent`, etc.) managed via `ThemeContext`.
- Header and Footer fragments (`FragmentHeader.tsx`, `FragmentFooter.tsx`) MUST consume CSS custom properties dynamically to prevent text contrast collisions (e.g. white text on light backgrounds).
- Theme changes MUST trigger `localStorage` updates to allow real-time cross-tab synchronization.

## 7. Multi-Directory Content Taxonomy
- Content is organized strictly into three subdirectories under `/content`:
  - `content/posts/` (Technical engineering insights)
  - `content/pages/` (Platform pages like `about-me.md`)
  - `content/articles/` (Analytical essays and leadership stories)
- Every content change MUST be followed by `npx pnpm node scripts/generate-tags.mjs`.

## 8. Automated Testing & Accessibility (WCAG AA)
- Every component and theme utility MUST include unit tests and `axe-core` accessibility tests using `vitest-axe` in `src/test/`.
- All interactive controls MUST include explicit `<label>` or `aria-label` attributes.

## 9. Available Agent Skills (`.agents/skills/`)
Agents MUST consult the specialized skill instructions in `.agents/skills/` when executing tasks:
- **`content-creator`** (`.agents/skills/content-creator/SKILL.md`): For creating or modifying posts, pages, and articles.
- **`ui-component-builder`** (`.agents/skills/ui-component-builder/SKILL.md`): For creating atomic UI components adhering to design tokens and CSS guardrails.
- **`design-system-tuner`** (`.agents/skills/design-system-tuner/SKILL.md`): For extending theme tokens, presets, and tuner capabilities.
- **`design-system-auditor`** (`.agents/skills/design-system-auditor/SKILL.md`): For auditing, evaluating, and repairing accessibility contrast violations in design specifications.
