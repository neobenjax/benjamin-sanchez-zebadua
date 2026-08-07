---
name: design-system-tuner
description: Guides agents and developers in extending design tokens, adding color presets, or modifying the Theme Tuner engine.
---

# Design System Tuner Skill

Use this skill when extending the Theme Engine, adding new color presets, or modifying `/theme-personalize`.

## Guidelines & Rules

1. **Dual Mode Support**:
   - Every theme modification or preset MUST support both Light and Dark mode tokens.

2. **WCAG Contrast Ratios**:
   - Presets MUST maintain at least a **4.5:1 text-to-background contrast ratio** for WCAG AA compliance.

3. **Cross-Tab Live Broadcast**:
   - Modifications MUST trigger `localStorage.setItem('benjaminsz_theme_config', ...)` so the `storage` event handler in `ThemeProvider` broadcasts updates across all open browser tabs.

4. **Synchronized Aesthetics**:
   - Both the main portfolio website and `/theme-personalize` MUST share identical fonts (`Inter`, `Playfair Display`), glassmorphism utilities, and UI primitives.
