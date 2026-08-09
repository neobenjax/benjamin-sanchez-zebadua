---
version: "1.0.0"
name: "Nintendo.com (2001) Analysis"
design_system_name: "Nintendo.com (2001) Analysis"
description: "A precision-engineered design language with WCAG 2.1 AA contrast compliance, standardized tokens, and responsive UI primitives."
mode: "dark"
author: "Benjamin Sanchez Zebadua"
updated_at: "2026-08-09"

colors:
  primary: "#e60012"
  primary-focus: "#e60012"
  primary-bg: "#7a8aba"
  secondary-bg: "#9fbee7"
  surface: "#ffffff"
  body: "#21242e"
  body-muted: "#B3989B"
  text-primary: "#21242e"
  text-secondary: "#3d4f97"
  text-muted: "#B3989B"
  accent: "#e60012"
  slate-steel: "#3d4f97"
  border-subtle: "#5a5f8c"
  border-accent: "rgba(230, 0, 18, 0.25)"
  on-primary: "#ffffff"
  on-dark: "#ffffff"

typography:
  display-lg:
    fontFamily: "Playfair Display, serif"
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

# Design System Specification: Nintendo.com (2001) Analysis

> Official Design System Specification file (`design.md` standard). Synchronized with root CSS custom properties and WCAG 2.1 AA accessibility guidelines.

## 1. Color System & Design Tokens (DARK Mode)

| Token Key | Design System Role | Hex / CSS Value | Description |
| :--- | :--- | :--- | :--- |
| `primary_bg` | Primary Background | `#7a8aba` | Main application background |
| `secondary_bg` | Secondary Background | `#9fbee7` | Alternating section backdrops |
| `surface_card` | Surface Card | `#ffffff` | Elevated card containers and popups |
| `text_primary` | Primary Copy | `#21242e` | High contrast headings & body copy |
| `text_secondary` | Secondary Copy | `#3d4f97` | Subtitles, labels & descriptions |
| `text_muted` | Muted Text | `#B3989B` | Captions, metadata & hints |
| `accent` | Accent Color | `#e60012` | High visibility CTAs & status badges |
| `slate_steel` | Steel Slate | `#3d4f97` | Secondary borders & icon outlines |
| `border_subtle` | Subtle Border | `#5a5f8c` | Card grid lines & subtle dividers |
| `border_accent` | Accent Border | `rgba(230, 0, 18, 0.25)` | Active state highlight borders |

### CSS Custom Properties Snippet

```css
:root[data-theme="dark"] {
  --color-primary: #7a8aba;
  --color-secondary-bg: #9fbee7;
  --color-surface: #ffffff;
  --color-text-primary: #21242e;
  --color-text-secondary: #3d4f97;
  --color-text-muted: #B3989B;
  --color-accent: #e60012;
  --color-secondary: #3d4f97;
  --border-subtle: #5a5f8c;
  --border-accent: rgba(230, 0, 18, 0.25);
}
```

## 2. Component Guidelines & Specifications

### Buttons
- **Primary CTA**: Styled with `var(--color-accent)`, high contrast text.
- **Secondary**: `var(--color-surface)` with `var(--border-subtle)` border.
- **Disabled**: `opacity: 0.5`, `pointer-events: none`.
- **Pill**: Fully rounded (`rounded-full`).

### Typography & Display Scale
- **Display Headings**: Playfair Display (Font Serif).
- **Body Copy & Interfaces**: Inter Sans (Font Sans).
- **Technical & Code**: Fira Code / JetBrains Mono (Font Mono).
