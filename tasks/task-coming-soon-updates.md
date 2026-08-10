# Implementation Task: Coming Soon Page & Terminal Updates

## Overview
This task covers updates to the `TerminalWidget` behavior, dynamic conditional rendering for optional subsections in `FragmentComingSoon`, and removal of the floating "Get in Touch" button (`FAB`).

## Activities Checklist

- [x] **Task 1: TerminalWidget Animation Update**
  - [x] Set `resetDelayMs` default to 10,000ms (10 seconds).
  - [x] Update completion state rendering so the last typed message stays visible with a blinking cursor at the end while processing.
  - [x] Reset animation back to line 0 char 0 after 10 seconds of blinking.

- [x] **Task 2: FragmentComingSoon Conditional Rendering**
  - [x] Update `ComingSoonAST` types to mark `comingSoonStatement`, `illustrationAlt`, `illustrationUrl` as optional.
  - [x] Update `FragmentComingSoon.tsx` to conditionally render `comingSoonStatement` and `illustrationUrl` box only when present.
  - [x] Update `STATIC_COMING_SOON_MD` in `src/lib/fragments.ts` to omit `## COMING_SOON_STATEMENT` and `## COMING_SOON_ILLUSTRATION` matching `content/fragments/coming_soon.md`.
  - [x] Fix test suites (`src/test/ComingSoon.test.tsx` and `scripts/test-coming-soon.mjs`) to account for optional/omitted sections.

- [x] **Task 3: Remove Floating "Get in Touch" Button (FAB)**
  - [x] Remove `<FAB />` component render and import from `src/app/layout.tsx`.
  - [x] Delete `src/components/FAB.tsx`.

- [x] **Task 4: Validation & Testing**
  - [x] Run `pnpm test` for Vitest and accessibility.
  - [x] Run `pnpm run lint:css` for CSS compliance.
  - [x] Provide comprehensive walkthrough and manual testing instructions.
