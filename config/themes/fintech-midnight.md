---
design_system_name: "FinTech Midnight (Default)"
mode: "dark"
version: "1.0.0"
author: "Benjamin Sanchez Zebadua"
updated_at: "2026-08-08"
---

# Design System Specification: FinTech Midnight (Default)

> Official Design System Specification file (`design.md` standard). Synchronized with root CSS custom properties and WCAG 2.1 AA accessibility guidelines.

## 1. Color System & Design Tokens (DARK Mode)

| Token Key | Design System Role | Hex / CSS Value | Description |
| :--- | :--- | :--- | :--- |
| `primary_bg` | Primary Background | `#0A192F` | Main application background |
| `secondary_bg` | Secondary Background | `#081426` | Alternating section backdrops |
| `surface_card` | Surface Card | `#0C1E38` | Elevated card containers and popups |
| `text_primary` | Primary Copy | `#F8FAFC` | High contrast headings & body copy |
| `text_secondary` | Secondary Copy | `#CBD5E1` | Subtitles, labels & descriptions |
| `text_muted` | Muted Text | `#94A3B8` | Captions, metadata & hints |
| `accent` | Accent Color | `#10B981` | High visibility CTAs & status badges |
| `slate_steel` | Steel Slate | `#334155` | Secondary borders & icon outlines |
| `border_subtle` | Subtle Border | `rgba(255, 255, 255, 0.10)` | Card grid lines & subtle dividers |
| `border_accent` | Accent Border | `rgba(16, 185, 129, 0.20)` | Active state highlight borders |

### CSS Custom Properties Snippet

```css
:root[data-theme="dark"] {
  --color-primary: #0A192F;
  --color-secondary-bg: #081426;
  --color-surface: #0C1E38;
  --color-text-primary: #F8FAFC;
  --color-text-secondary: #CBD5E1;
  --color-text-muted: #94A3B8;
  --color-accent: #10B981;
  --color-secondary: #334155;
  --border-subtle: rgba(255, 255, 255, 0.10);
  --border-accent: rgba(16, 185, 129, 0.20);
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
