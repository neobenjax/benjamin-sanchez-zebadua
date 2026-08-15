---
version: "1.0.0"
name: "Mind Bubble Theme"
design_system_name: "Mind Bubble Theme"
description: "A precision-engineered design language with WCAG 2.1 AA contrast compliance, standardized tokens, responsive UI primitives, and full behavioral specifications."
mode: "dark"
author: "Benjamin Sanchez Zebadua"
updated_at: "2026-08-15"

colors:
  primary: "#1E8F8F"
  primary-focus: "#1E8F8F"
  primary-bg: "#F4FAFA"
  secondary-bg: "#E5F5F5"
  surface: "#FFFFFF"
  surface-card: "#FFFFFF"
  body: "#0F172A"
  body-muted: "#5C8A8A"
  ink: "#0F172A"
  text-primary: "#0F172A"
  text-secondary: "#366363"
  text-muted: "#5C8A8A"
  accent: "#1E8F8F"
  slate-steel: "#C2D6D6"
  border-subtle: "rgba(0, 0, 0, 0.10)"
  border-accent: "rgba(61, 214, 214, 0.25)"
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

# Design System Specification: Mind Bubble Theme

> Official Design System Specification file (`design.md` standard). Synchronized with root CSS custom properties and WCAG 2.1 AA accessibility guidelines.

## 1. System Overview & Key Characteristics

- **Geometry Canvas Color**: `#F4FAFA`.
- **Visual Philosophy**: Precision-engineered interface built for accessibility, contrast compliance, and real-time design token synchronization across application surfaces.
- **Key Characteristics**: Strict surface hierarchy, WCAG 2.1 AA contrast compliance ($ge 4.5:1$ text contrast), and responsive component layout rules.

## 2. Color System & Design Tokens

| Token Key | Design System Role | Hex / CSS Value | Description |
| :--- | :--- | :--- | :--- |
| `primary_bg` | Primary Background | `#F4FAFA` | Main application background canvas |
| `secondary_bg` | Secondary Background | `#E5F5F5` | Inset section backdrops & secondary surfaces |
| `surface_card` | Surface Card | `#FFFFFF` | Elevated card containers and popups |
| `text_primary` | Primary Copy | `#0F172A` | High contrast headings & primary body copy |
| `text_secondary` | Secondary Copy | `#366363` | Subtitles, labels, and secondary descriptions |
| `text_muted` | Muted Text | `#5C8A8A` | Captions, metadata, and fine print |
| `accent` | Accent Color | `#1E8F8F` | High visibility CTAs & status indicators |
| `slate_steel` | Steel Slate | `#C2D6D6` | Secondary borders, icon outlines, & subtle chips |
| `border_subtle` | Subtle Border | `rgba(0, 0, 0, 0.10)` | Card grid lines & translucent dividers |
| `border_accent` | Accent Border | `rgba(61, 214, 214, 0.25)` | Active state highlight focus borders |

### Color Categories & Variations

- **Brand & Accent**: Accent CTA `#1E8F8F` with high contrast interaction states.
- **Surface**: Primary Canvas `#F4FAFA`, Secondary Backdrop `#E5F5F5`, Elevated Surface Card `#FFFFFF`.
- **Text Color Descriptions**: Primary text `#0F172A`, Secondary text `#366363`, Muted text `#5C8A8A`.
- **Semantics & Category Accents**: Accent `#1E8F8F`, Steel Slate `#C2D6D6`, Subtle Border `rgba(0, 0, 0, 0.10)`, Accent Border `rgba(61, 214, 214, 0.25)`.

### CSS Custom Properties Snippet

```css
:root {
  --color-primary: #F4FAFA;
  --color-secondary-bg: #E5F5F5;
  --color-surface: #FFFFFF;
  --color-text-primary: #0F172A;
  --color-text-secondary: #366363;
  --color-text-muted: #5C8A8A;
  --color-accent: #1E8F8F;
  --color-secondary: #C2D6D6;
  --border-subtle: rgba(0, 0, 0, 0.10);
  --border-accent: rgba(61, 214, 214, 0.25);
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
