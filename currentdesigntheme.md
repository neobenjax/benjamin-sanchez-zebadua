---
version: "1.0.0"
name: "green white theme"
design_system_name: "green white theme"
description: "A precision-engineered design language with WCAG 2.1 AA contrast compliance, standardized tokens, responsive UI primitives, and full behavioral specifications."
mode: "dark"
author: "Benjamin Sanchez Zebadua"
updated_at: "2026-08-09"

colors:
  primary: "#069932"
  primary-focus: "#069932"
  primary-bg: "#F4FAF6"
  secondary-bg: "#E5F5EA"
  surface: "#FFFFFF"
  surface-card: "#FFFFFF"
  body: "#0F172A"
  body-muted: "#5C8A6A"
  ink: "#0F172A"
  text-primary: "#0F172A"
  text-secondary: "#366343"
  text-muted: "#5C8A6A"
  accent: "#069932"
  slate-steel: "#C2D6C8"
  border-subtle: "rgba(0, 0, 0, 0.10)"
  border-accent: "rgba(24, 247, 91, 0.25)"
  on-primary: "#ffffff"
  on-dark: "#ffffff"

typography:
  display-lg:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "40px"
    fontWeight: "700"
    lineHeight: "1.15"
  display-md:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "32px"
    fontWeight: "700"
  title-lg:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: "600"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: "400"
    lineHeight: "1.5"
  caption:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "12px"
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

# Design System Specification: green white theme

> Official Design System Specification file (`design.md` standard). Synchronized with root CSS custom properties and WCAG 2.1 AA accessibility guidelines.

## 1. System Overview & Key Characteristics

- **Geometry Canvas Color**: `#F4FAF6`.
- **Visual Philosophy**: Precision-engineered interface built for accessibility, contrast compliance, and real-time design token synchronization across application surfaces.
- **Key Characteristics**: Strict surface hierarchy, WCAG 2.1 AA contrast compliance ($ge 4.5:1$ text contrast), and responsive component layout rules.

## 2. Color System & Design Tokens

| Token Key | Design System Role | Hex / CSS Value | Description |
| :--- | :--- | :--- | :--- |
| `primary_bg` | Primary Background | `#F4FAF6` | Main application background canvas |
| `secondary_bg` | Secondary Background | `#E5F5EA` | Inset section backdrops & secondary surfaces |
| `surface_card` | Surface Card | `#FFFFFF` | Elevated card containers and popups |
| `text_primary` | Primary Copy | `#0F172A` | High contrast headings & primary body copy |
| `text_secondary` | Secondary Copy | `#366343` | Subtitles, labels, and secondary descriptions |
| `text_muted` | Muted Text | `#5C8A6A` | Captions, metadata, and fine print |
| `accent` | Accent Color | `#069932` | High visibility CTAs & status indicators |
| `slate_steel` | Steel Slate | `#C2D6C8` | Secondary borders, icon outlines, & subtle chips |
| `border_subtle` | Subtle Border | `rgba(0, 0, 0, 0.10)` | Card grid lines & translucent dividers |
| `border_accent` | Accent Border | `rgba(24, 247, 91, 0.25)` | Active state highlight focus borders |

### Color Categories & Variations

- **Brand & Accent**: Accent CTA `#069932` with high contrast interaction states.
- **Surface**: Primary Canvas `#F4FAF6`, Secondary Backdrop `#E5F5EA`, Elevated Surface Card `#FFFFFF`.
- **Text Color Descriptions**: Primary text `#0F172A`, Secondary text `#366343`, Muted text `#5C8A6A`.
- **Semantics & Category Accents**: Accent `#069932`, Steel Slate `#C2D6C8`, Subtle Border `rgba(0, 0, 0, 0.10)`, Accent Border `rgba(24, 247, 91, 0.25)`.

### CSS Custom Properties Snippet

```css
:root {
  --color-primary: #F4FAF6;
  --color-secondary-bg: #E5F5EA;
  --color-surface: #FFFFFF;
  --color-text-primary: #0F172A;
  --color-text-secondary: #366343;
  --color-text-muted: #5C8A6A;
  --color-accent: #069932;
  --color-secondary: #C2D6C8;
  --border-subtle: rgba(0, 0, 0, 0.10);
  --border-accent: rgba(24, 247, 91, 0.25);
}
```

## 3. Hierarchy, Layout & Spacing System

- **Hierarchy & Principles**: Clear focal emphasis on primary CTAs and headings, balanced by muted secondary text hierarchy.
- **Layout, Grid & Containers**: 12-column responsive layout grid inside `max-w-7xl` container.
- **Whitespace Philosophy**: Rhythmic padding (`p-6`, `p-8`) ensuring visual breathing room across cards and section boundaries.

## 4. Elevation, Depth & Shapes

- **Elevation & Depth**: Glassmorphism translucent layers over canvas surfaces with 1px border outlines.
- **Shapes & Border Radius Scale**: Modern radii scale including `rounded-xs` (2px), `rounded-sm` (4px), `rounded-md` (8px), `rounded-lg` (12px), and `rounded-full` (9999px).

## 5. Component Specifications

### Inputs & Forms
- **Form Controls**: `Select` dropdowns and text inputs styled with `var(--color-surface)`, `var(--border-subtle)`, and `var(--color-text-primary)`.

### Cards & Containers
- **Surface Cards**: Glass translucent backdrops with subtle border highlights.

### Navigation & Header
- **Global Header**: Fixed top navigation bar adhering to active theme background and copy tokens.

### Signature Components & Footer
- **Signature Components**: Pill CTAs, status badges, and financial metrics.
- **Footer**: Fragment-based footer adhering to root CSS theme variables.

## 6. Do's and Don'ts

### Do's
- **Do**: Maintain root CSS custom property binding across all UI elements.
- **Do**: Validate WCAG 2.1 AA contrast compliance ($ge 4.5:1$) for all copy.

### Don'ts
- **Don't**: Avoid hardcoding hex values directly in component stylesheets.
- **Don't**: Never use `!important` CSS overrides.
