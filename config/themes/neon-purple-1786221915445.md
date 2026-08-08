---
design_system_name: "Neon Purple"
mode: "dark"
version: "1.0.0"
author: "Benjamin Sanchez Zebadua"
updated_at: "2026-08-08"
---

# Design System Specification: Neon Purple

> Official Design System Specification file (`design.md` standard). Synchronized with root CSS custom properties and WCAG 2.1 AA accessibility guidelines.

## 1. Color System & Design Tokens (DARK Mode)

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
:root[data-theme="dark"] {
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
- **Display Headings**: Playfair Display (Font Serif).
- **Body Copy & Interfaces**: Inter Sans (Font Sans).
- **Technical & Code**: Fira Code / JetBrains Mono (Font Mono).
