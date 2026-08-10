# Implementation Task: "Feeling Lucky?" Theme Switcher & Theme Reorganization

## Overview
This task covers the creation of the reusable `FeelingLuckyButton` component, transpiling pre-installed themes to `src/app/pre-installed-themes/`, updating `theme-tokens.css` to `current-theme-tokens.css`, and implementing the 5-second delayed floating button with `sessionStorage` persistence and smooth 400ms theme transition.

## Activities Checklist

- [x] **Task 1: Project Theme Reorganization & Build Transpiler Update**
  - [x] Update `scripts/transpile-current-theme.mjs` to output `current-theme-tokens.css` instead of `theme-tokens.css`.
  - [x] Transpile each markdown theme in `config/themes/*.md` into `src/app/pre-installed-themes/<name>.css`.
  - [x] Generate `src/app/pre-installed-themes/manifest.json` with pre-installed theme metadata & tokens.
  - [x] Update `src/app/globals.css` import `@import "./current-theme-tokens.css";` and add 400ms smooth CSS transitions for theme custom variables.
  - [x] Update `src/lib/themeFileServer.ts` path variable `THEME_TOKENS_CSS_PATH`.

- [x] **Task 2: Reusable Feeling Lucky Floating Button Component**
  - [x] Create `src/components/ui/FeelingLuckyButton.tsx` ("use client").
  - [x] Check `sessionStorage.getItem("benjaminsz_feeling_lucky_clicked")` on mount; if present, do not display.
  - [x] Set 5-second `setTimeout` to show button with scale pop-in animation and subtle pulse effect.
  - [x] Style button using strict theme CSS variables (`bg-[var(--color-accent)] text-[var(--color-primary)] border border-[var(--border-accent)]`), positioned bottom-center (`fixed bottom-6 left-1/2 -translate-x-1/2 z-40`).
  - [x] On click: randomly pick a non-active theme from `savedPresets`, call `applyPreset(randomTheme)`, set `sessionStorage` flag, and hide button.

- [x] **Task 3: Integration into Coming Soon Page**
  - [x] Integrate `<FeelingLuckyButton />` into `src/components/fragments/FragmentComingSoon.tsx`.

- [x] **Task 4: Validation & Quality Control**
  - [x] Run `pnpm test` for Vitest & accessibility tests.
  - [x] Run `pnpm run lint:css` for CSS compliance.
  - [x] Provide walkthrough guide & manual testing instructions.
