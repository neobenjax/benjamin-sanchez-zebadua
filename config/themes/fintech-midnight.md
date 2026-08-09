---
version: "1.0.0"
name: "FinTech Midnight (Default)"
design_system_name: "FinTech Midnight (Default)"
description: "A dark-canvas quantitative financial interface built for high-contrast readability, precise data visualization, and institutional vault aesthetics. Anchored on deep midnight slate (#0A192F) with vibrant emerald action accents (#10B981) and translucent glassmorphism overlays. Synchronized with WCAG 2.1 AA contrast compliance."
mode: "dark"
author: "Benjamin Sanchez Zebadua"
updated_at: "2026-08-09"

colors:
  primary: "#10B981"
  primary-focus: "#059669"
  primary-bg: "#0A192F"
  secondary-bg: "#081426"
  surface: "#0C1E38"
  surface-card: "#0C1E38"
  body: "#F8FAFC"
  body-muted: "#94A3B8"
  ink: "#F8FAFC"
  text-primary: "#F8FAFC"
  text-secondary: "#CBD5E1"
  text-muted: "#94A3B8"
  accent: "#10B981"
  slate-steel: "#334155"
  border-subtle: "rgba(255, 255, 255, 0.10)"
  border-accent: "rgba(16, 185, 129, 0.20)"
  on-primary: "#ffffff"
  on-dark: "#ffffff"

typography:
  display-lg:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "48px"
    fontWeight: "700"
    lineHeight: "1.1"
    letterSpacing: "-0.5px"
  display-md:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "36px"
    fontWeight: "700"
    lineHeight: "1.2"
  title-lg:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: "600"
    lineHeight: "1.3"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: "400"
    lineHeight: "1.55"
  caption:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: "400"
    lineHeight: "1.4"
  code:
    fontFamily: "Fira Code, JetBrains Mono, monospace"
    fontSize: "13px"
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
  xxl: "48px"

components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    borderColor: "{colors.border-subtle}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  button-accent-pill:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: "10px 24px"
  input-search:
    backgroundColor: "{colors.secondary-bg}"
    textColor: "{colors.text-primary}"
    borderColor: "{colors.border-subtle}"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
  select-dropdown:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    borderColor: "{colors.border-subtle}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  card-surface:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border-subtle}"
    rounded: "{rounded.md}"
    padding: "24px"
  global-nav:
    backgroundColor: "{colors.primary-bg}"
    textColor: "{colors.text-primary}"
    borderColor: "{colors.border-subtle}"
    height: "80px"
  footer:
    backgroundColor: "{colors.primary-bg}"
    textColor: "{colors.text-secondary}"
    borderColor: "{colors.border-subtle}"
    padding: "64px 32px"
---

# Design System Specification: FinTech Midnight (Default)

> Official Design System Specification file (`design.md` standard). Synchronized with root CSS custom properties and WCAG 2.1 AA accessibility guidelines.

## 1. System Overview & Key Characteristics

- **Geometry Canvas Color**: `#0A192F` (Deep Midnight Blue Slate).
- **Visual Philosophy**: Institutional financial engineering canvas with high-contrast emerald highlights, sharp numeric tabular figures, and dark glass translucent surface layers.
- **Contrast Strategy**: Dark mode default ensuring minimum $7.0:1$ contrast for primary copy and $4.5:1$ for secondary copy against dark canvas backdrops.

## 2. Color System & Design Tokens

| Token Key | Design System Role | Hex / CSS Value | Description |
| :--- | :--- | :--- | :--- |
| `primary_bg` | Primary Background | `#0A192F` | Main application background (Deep Midnight Slate) |
| `secondary_bg` | Secondary Background | `#081426` | Alternating section backdrops & deep wells |
| `surface_card` | Surface Card | `#0C1E38` | Elevated card containers, modals, and popups |
| `text_primary` | Primary Copy | `#F8FAFC` | High contrast display headings & body copy |
| `text_secondary` | Secondary Copy | `#CBD5E1` | Subtitles, form labels & secondary descriptions |
| `text_muted` | Muted Text | `#94A3B8` | Captions, metadata, and fine print |
| `accent` | Accent Color | `#10B981` | High-visibility emerald CTAs & positive indicators |
| `slate_steel` | Steel Slate | `#334155` | Secondary borders, icon outlines, & subtle badges |
| `border_subtle` | Subtle Border | `rgba(255, 255, 255, 0.10)` | Card grid lines & translucent dividers |
| `border_accent` | Accent Border | `rgba(16, 185, 129, 0.20)` | Active state highlight focus borders |

### Color Categories & Variations

- **Brand & Accent**: Emerald Accent `#10B981` with Focus state `#059669`. Used for primary CTAs, positive financial changes (+%), and active navigation pills.
- **Surface**: Primary Canvas `#0A192F`, Secondary Section Backdrop `#081426`, Elevated Surface Card `#0C1E38`.
- **Text Color Descriptions**: High-contrast white `#F8FAFC` (Primary), cool slate `#CBD5E1` (Secondary), muted slate `#94A3B8` (Muted captions).
- **Semantics**: Success Emerald `#10B981`, Error Rose `#F43F5E`, Warning Amber `#F59E0B`, Info Cyan `#06B6D4`.

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

## 3. Hierarchy, Layout & Spacing System

- **Hierarchy**: Primary display headings in Playfair Display serif font, balanced by clean Inter sans-serif body copy and Fira Code monospaced numeric data.
- **Layout & Grid**: 12-column responsive fluid grid inside max-width container (`max-w-7xl`, 1280px).
- **Spacing Scale**: Base 4px rhythm (`xs: 4px`, `sm: 8px`, `md: 16px`, `lg: 24px`, `xl: 32px`, `xxl: 48px`).
- **Whitespace Philosophy**: Generous section padding (`pt-28 pb-16`) to provide airy executive pacing, paired with compact internal card padding (`p-6`).

## 4. Elevation, Depth & Shapes

- **Elevation & Depth**: Translucent glassmorphism (`backdrop-blur-md`, `bg-slate-900/60`) over midnight dark canvas with 1px subtle borders (`border-white/10`).
- **Decorative Depth**: Ambient radial glows (`bg-gradient-to-r from-transparent via-[#10B981]/20 to-transparent blur-[100px]`).
- **Border Radius Scale**: Crisp modern radius scale: `rounded-xs` (2px), `rounded-sm` (4px), `rounded-md` (8px), `rounded-lg` (12px), `rounded-full` (9999px).

## 5. Component Guidelines & Specifications

### Inputs & Forms
- **Select Dropdowns & Text Inputs**: Styled using `var(--color-surface)` background, `var(--border-subtle)` border, and `var(--color-text-primary)` copy. Active focus applies `var(--border-accent)` outline.

### Cards & Containers
- **Surface Cards**: Glassmorphism translucent backdrop (`bg-slate-900/60`) with `var(--border-subtle)` border. Hover states highlight border to `var(--border-accent)`.

### Navigation & Header
- **Fixed Blurred Header**: Top bar fixed to viewport with `backdrop-blur-md` and `var(--border-subtle)` bottom border. Uses `var(--color-text-primary)` for brand identity and `var(--color-text-secondary)` for nav links.

### Footer
- **Multi-Column Footer**: Modular grid columns with `var(--color-text-secondary)` copy, social icon links, and `var(--border-subtle)` top hairline.

## 6. Do's and Don'ts

### Do's
- **Do**: Always reference root CSS custom properties (`var(--color-primary)`, `var(--color-accent)`) for UI styling.
- **Do**: Maintain minimum $4.5:1$ text-to-background contrast ratio across all custom theme variations.
- **Do**: Use monospaced fonts (`Fira Code` / `JetBrains Mono`) for numeric values, percentages, and hex values.

### Don'ts
- **Don't**: Never hardcode hex values like `#ffffff` directly on body text elements in components.
- **Don't**: Never use `!important` in CSS stylesheets or inline styles.
- **Don't**: Never allow white text on white backgrounds when switching to light mode themes.
