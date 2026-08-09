---
version: "1.0.0"
name: "Nike-design-system"
design_system_name: "Nike-design-system"
description: "A precision-engineered design language with WCAG 2.1 AA contrast compliance, standardized tokens, and responsive UI primitives."
author: "Benjamin Sanchez Zebadua"
updated_at: "2026-08-09"

colors:
  primary: "#111111"
  primary-focus: "#111111"
  primary-bg: "#ffffff"
  secondary-bg: "#f5f5f5"
  surface: "#ffffff"
  body: "#111111"
  body-muted: "#707072"
  text-primary: "#111111"
  text-secondary: "#39393b"
  text-muted: "#707072"
  accent: "#111111"
  slate-steel: "#4b4b4d"
  border-subtle: "#cacacb"
  border-accent: "#111111"
  on-primary: "#ffffff"
  on-dark: "#ffffff"

typography:
  display-lg:
    fontFamily: "Inter, sans-serif"
    fontSize: "40px"
    fontWeight: "700"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "16px"
    fontWeight: "400"

rounded:
  none: "0px"
  xs: "2px"
  sm: "4px"
  md: "8px"
  lg: "12px"
  full: "9999px"

spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"

components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
  card-surface:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border-subtle}"
    rounded: "{rounded.md}"
---

# Design System Specification: Nike-design-system

> Official Design System Specification file (`design.md` standard). Synchronized with root CSS custom properties and WCAG 2.1 AA accessibility guidelines.

## 1. Color System & Design Tokens

| Token Key | Design System Role | Hex / CSS Value | Description |
| :--- | :--- | :--- | :--- |
| `primary_bg` | Primary Background | `#ffffff` | Main application background |
| `secondary_bg` | Secondary Background | `#f5f5f5` | Alternating section backdrops |
| `surface_card` | Surface Card | `#ffffff` | Elevated card containers and popups |
| `text_primary` | Primary Copy | `#111111` | High contrast headings & body copy |
| `text_secondary` | Secondary Copy | `#39393b` | Subtitles, labels & descriptions |
| `text_muted` | Muted Text | `#707072` | Captions, metadata & hints |
| `accent` | Accent Color | `#111111` | High visibility CTAs & status badges |
| `slate_steel` | Steel Slate | `#4b4b4d` | Secondary borders & icon outlines |
| `border_subtle` | Subtle Border | `#cacacb` | Card grid lines & subtle dividers |
| `border_accent` | Accent Border | `#111111` | Active state highlight borders |

### CSS Custom Properties Snippet

```css
:root {
  --color-primary: #ffffff;
  --color-secondary-bg: #f5f5f5;
  --color-surface: #ffffff;
  --color-text-primary: #111111;
  --color-text-secondary: #39393b;
  --color-text-muted: #707072;
  --color-accent: #111111;
  --color-secondary: #4b4b4d;
  --border-subtle: #cacacb;
  --border-accent: #111111;
}
```

## 2. Component Guidelines & Specifications

### Buttons
- **Primary CTA**: Styled with `var(--color-accent)`, high contrast text.
- **Secondary**: `var(--color-surface)` with `var(--border-subtle)` border.
- **Disabled**: `opacity: 0.5`, `pointer-events: none`.
- **Pill**: Fully rounded (`rounded-full`).

### Typography & Display Scale
- **Display Headings**: Inter (Font Sans).
- **Body Copy & Interfaces**: Inter (Font Sans).
- **Technical & Code**: Fira Code / JetBrains Mono (Font Mono).
