---
version: "1.0.0"
name: "Apple-design-analysis"
design_system_name: "Apple-design-analysis"
description: "A precision-engineered design language with WCAG 2.1 AA contrast compliance, standardized tokens, and responsive UI primitives."
mode: "dark"
author: "Benjamin Sanchez Zebadua"
updated_at: "2026-08-09"

colors:
  primary: "#0066cc"
  primary-focus: "#0066cc"
  primary-bg: "#ffffff"
  secondary-bg: "#070D12"
  surface: "#272729"
  body: "#1d1d1f"
  body-muted: "#98A6B3"
  text-primary: "#1d1d1f"
  text-secondary: "#cccccc"
  text-muted: "#98A6B3"
  accent: "#0066cc"
  slate-steel: "#304050"
  border-subtle: "#e0e0e0"
  border-accent: "rgba(0, 102, 204, 0.25)"
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

# Design System Specification: Apple-design-analysis

> Official Design System Specification file (`design.md` standard). Synchronized with root CSS custom properties and WCAG 2.1 AA accessibility guidelines.

## 1. Color System & Design Tokens (DARK Mode)

| Token Key | Design System Role | Hex / CSS Value | Description |
| :--- | :--- | :--- | :--- |
| `primary_bg` | Primary Background | `#ffffff` | Main application background |
| `secondary_bg` | Secondary Background | `#070D12` | Alternating section backdrops |
| `surface_card` | Surface Card | `#272729` | Elevated card containers and popups |
| `text_primary` | Primary Copy | `#1d1d1f` | High contrast headings & body copy |
| `text_secondary` | Secondary Copy | `#cccccc` | Subtitles, labels & descriptions |
| `text_muted` | Muted Text | `#98A6B3` | Captions, metadata & hints |
| `accent` | Accent Color | `#0066cc` | High visibility CTAs & status badges |
| `slate_steel` | Steel Slate | `#304050` | Secondary borders & icon outlines |
| `border_subtle` | Subtle Border | `#e0e0e0` | Card grid lines & subtle dividers |
| `border_accent` | Accent Border | `rgba(0, 102, 204, 0.25)` | Active state highlight borders |

### CSS Custom Properties Snippet

```css
:root[data-theme="dark"] {
  --color-primary: #ffffff;
  --color-secondary-bg: #070D12;
  --color-surface: #272729;
  --color-text-primary: #1d1d1f;
  --color-text-secondary: #cccccc;
  --color-text-muted: #98A6B3;
  --color-accent: #0066cc;
  --color-secondary: #304050;
  --border-subtle: #e0e0e0;
  --border-accent: rgba(0, 102, 204, 0.25);
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
