---
name: ui-component-builder
description: Guides agents and developers in creating or extending atomic UI components adhering to design system tokens and strict CSS guardrails.
---

# UI Component Builder Skill

Use this skill whenever creating new UI elements (e.g. buttons, dropdowns, radio inputs, modals, cards) or modifying existing components in `src/components/ui/`.

## Mandatory Architecture & Styling Rules

1. **NO `!important` Rule**:
   - The use of `!important` in CSS or inline styles is strictly PROHIBITED.
   - All style overrides MUST be handled via standard CSS specificity and CSS custom property cascades.

2. **Design System CSS Tokens**:
   - Components MUST bind their visual styling directly to root CSS custom properties:
     - Backgrounds: `var(--color-primary)`, `var(--color-secondary-bg)`, `var(--color-surface)`
     - Text: `var(--color-text-primary)`, `var(--color-text-secondary)`, `var(--color-text-muted)`
     - Accent: `var(--color-accent)`
     - Borders: `var(--border-subtle)`, `var(--border-accent)`
     - Fonts: `var(--font-sans)` (Inter), `var(--font-serif)` (Playfair Display)
     - Radii: `rounded-sm` (2px sharp architectural corners)

3. **Accessibility Guardrails (WCAG AA)**:
   - Form inputs (`<input>`, `<select>`, `<textarea>`) MUST have explicit `<label>` or `aria-label` attributes.
   - Interactive elements MUST support keyboard navigation (`focus:outline-none focus:ring-2`).

4. **Testing Requirement**:
   - Every new component MUST include a unit test and an `axe-core` accessibility test in `src/test/`.
