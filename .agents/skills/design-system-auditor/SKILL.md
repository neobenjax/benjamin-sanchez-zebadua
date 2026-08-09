---
name: design-system-auditor
description: Audit, evaluate, and repair accessibility contrast violations in design.md design system specifications.
---

# Design System Accessibility Auditor Skill (`design-system-auditor`)

This skill guides AI agents in analyzing, evaluating, and fixing WCAG 2.1 AA accessibility contrast violations in `design.md` design system files (e.g. `bugs/sampledesingsystem.md` or any imported specification).

---

## 1. When to Use This Skill
Activate this skill whenever a user or workflow requests:
- *"Audit design system file in {route}"*
- *"Fix contrast issues in {file}.md"*
- *"Load {design.md} and resolve accessibility problems"*

---

## 2. Audit & Repair Protocol

### Step 1: Parse YAML Frontmatter & Design Tokens
Extract the `colors` dictionary and root CSS custom properties from the target `design.md` file:
- Primary background (`primary-bg`, `canvas`, `surface`)
- Primary copy (`body`, `ink`, `text-primary`)
- Secondary copy (`body-muted`, `ink-soft`, `text-secondary`)
- Accent color (`primary`, `accent`)
- Surface card background (`surface`, `surface-tile-1`)

### Step 2: Calculate WCAG Relative Luminance & Contrast Ratios
Calculate relative luminance $L = 0.2126R + 0.7152G + 0.0722B$ for background and text pairs:
- **Primary Text Contrast**: $CR(\text{text\_primary}, \text{primary\_bg}) \ge 4.5:1$
- **Secondary Text Contrast**: $CR(\text{text\_secondary}, \text{primary\_bg}) \ge 3.0:1$
- **Surface Text Contrast**: $CR(\text{text\_primary}, \text{surface\_card}) \ge 4.5:1$
- **Accent Contrast**: $CR(\text{accent}, \text{primary\_bg}) \ge 3.0:1$

### Step 3: Contrast Repair Strategies
If contrast ratios fall below WCAG minimums:
1. **Dark Surface ($L < 0.5$)**:
   - Set `text_primary` to `#F8FAFC` or `#F5F5F7` (or `body-on-dark: "#ffffff"`).
   - Set `text_secondary` to `#A1A1A6` or `#CBD5E1`.
   - Set `accent` to a lightened, high-visibility hue (e.g., `#2997ff` or `#10B981`).
2. **Light Surface ($L \ge 0.5$)**:
   - Set `text_primary` to `#1D1D1F` or `#0F172A`.
   - Set `text_secondary` to `#475569` or `#64748B`.
   - Set `accent` to a rich, high-contrast shade (e.g., `#0066cc` or `#059669`).

### Step 4: Write Compliant Theme to `config/themes/`
Export the audited, compliant `design.md` file to `config/themes/[slug].md` and verify zero WCAG violations.
