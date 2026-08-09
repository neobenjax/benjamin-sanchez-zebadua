---
version: "1.0.0"
name: "Neon Purple"
design_system_name: "Neon Purple"
description: "A precision-engineered design language with WCAG 2.1 AA contrast compliance, standardized tokens, and responsive UI primitives."
author: "Benjamin Sanchez Zebadua"
updated_at: "2026-08-09"

colors:
  primary: "#E718A9"
  primary-focus: "#E718A9"
  primary-bg: "#190B15"
  secondary-bg: "#12070F"
  surface: "#261220"
  body: "#F8FAFC"
  body-muted: "#B398AB"
  text-primary: "#F8FAFC"
  text-secondary: "#D6C2D0"
  text-muted: "#B398AB"
  accent: "#E718A9"
  slate-steel: "#503046"
  border-subtle: "rgba(255, 255, 255, 0.10)"
  border-accent: "rgba(231, 24, 169, 0.25)"
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

# Design System Specification: Neon Purple

> Official Design System Specification file (`design.md` standard). Synchronized with root CSS custom properties and WCAG 2.1 AA accessibility guidelines.

## 1. Color System & Design Tokens

| Token Key | Design System Role | Hex / CSS Value | Description |
| :--- | :--- | :--- | :--- |
| `primary_bg` | Primary Background | `#190B15` | Main application background |
| `secondary_bg` | Secondary Background | `#12070F` | Alternating section backdrops |
| `surface_card` | Surface Card | `#261220` | Elevated card containers and popups |
| `text_primary` | Primary Copy | `#F8FAFC` | High contrast headings & body copy |
| `text_secondary` | Secondary Copy | `#D6C2D0` | Subtitles, labels & descriptions |
| `text_muted` | Muted Text | `#B398AB` | Captions, metadata & hints |
| `accent` | Accent Color | `#E718A9` | High visibility CTAs & status badges |
| `slate_steel` | Steel Slate | `#503046` | Secondary borders & icon outlines |
| `border_subtle` | Subtle Border | `rgba(255, 255, 255, 0.10)` | Card grid lines & subtle dividers |
| `border_accent` | Accent Border | `rgba(231, 24, 169, 0.25)` | Active state highlight borders |

### CSS Custom Properties Snippet

```css
:root {
  --color-primary: #190B15;
  --color-secondary-bg: #12070F;
  --color-surface: #261220;
  --color-text-primary: #F8FAFC;
  --color-text-secondary: #D6C2D0;
  --color-text-muted: #B398AB;
  --color-accent: #E718A9;
  --color-secondary: #503046;
  --border-subtle: rgba(255, 255, 255, 0.10);
  --border-accent: rgba(231, 24, 169, 0.25);
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
