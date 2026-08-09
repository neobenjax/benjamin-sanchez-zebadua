---
name: design-system-auditor
description: Audit, evaluate, and repair accessibility contrast violations in design.md design system specifications using natural language processing (NLP) and WCAG relative luminance formulas.
---

# Design System Accessibility Auditor Skill (`design-system-auditor`)

This skill guides AI agents in analyzing, evaluating, and fixing WCAG 2.1 AA accessibility contrast violations in `design.md` design system files (e.g. `bugs/sampledesingsystem.md` or any imported specification). It combines **Natural Language Processing (NLP)** semantic reading of markdown documentation with **WCAG relative luminance formulas** to accurately translate external design system specifications into fully compliant application themes.

---

## 1. When to Use This Skill
Activate this skill whenever a user or workflow requests:
- *"Audit design system file in {route}"*
- *"Fix contrast issues in {file}.md"*
- *"Load {design.md} and resolve accessibility problems"*
- *"Repair white-on-white or low-contrast imported design themes"*

---

## 2. Multi-Modal Audit & Repair Protocol

### Phase 1: Natural Language Processing (NLP) & Semantic Text Analysis
Do NOT rely solely on YAML key names. Read and parse the entire Markdown document including `### Text`, `### Colors`, `## Component Specifications`, `## Do's and Don'ts`, tables, and documentation notes:

1. **Extract Surface & Canvas Mode Context**:
   - Identify default page canvas (`canvas: "#ffffff"`, `canvas-parchment: "#f5f5f7"`) vs dark section surfaces (`surface-tile-1: "#272729"`).
2. **Extract Semantic Text Intent**:
   - Read body copy descriptions (e.g. *"Apple uses one near-black tone for all text on light surfaces"* $\rightarrow$ `colors.body` / `colors.ink` `#1d1d1f`).
   - Identify surface-restricted tokens (e.g. *"Body on dark: all text on dark tiles and global nav"* $\rightarrow$ `colors.body-on-dark` `#ffffff` applies ONLY to dark tiles/bars, NOT default canvas body text).
3. **Disambiguate Surface Tokens**:
   - When `primary_bg` is a light surface (`#ffffff`), `text_primary` MUST map to light-surface body text (`colors.body` / `colors.ink` `#1d1d1f`), NEVER to `body-on-dark` (`#ffffff`).

---

### Phase 2: Token Translation & System Mapping
Translate the spec's design tokens to the application's `ThemeTokens` structure:

| App Token Key | Target Spec Mapping Rule | Fallback Value |
|---|---|---|
| `primary_bg` | `colors.canvas` / `colors.primary-bg` / `colors.bg-primary` | `#ffffff` (light) / `#0a192f` (dark) |
| `secondary_bg` | `colors.canvas-parchment` / `colors.canvas-soft` / `colors.surface-pearl` | `#f5f5f7` |
| `surface_card` | `colors.surface-card` / `colors.surface` / `colors.surface-tile-1` | `#fafafc` / `#272729` |
| `text_primary` | If $L(\text{primary\_bg}) \ge 0.5 \Rightarrow$ `colors.body` / `colors.ink` (`#1d1d1f`). If $L < 0.5 \Rightarrow$ `colors.body-on-dark` (`#ffffff`) | `#1d1d1f` (light) / `#f8fafc` (dark) |
| `text_secondary` | If $L(\text{primary\_bg}) \ge 0.5 \Rightarrow$ `colors.ink-muted-80` / `colors.ink-muted-48` (`#6e6e73`). If $L < 0.5 \Rightarrow$ `colors.body-muted` (`#cccccc`) | `#475569` |
| `text_muted` | `colors.ink-muted-48` (`#6e6e73`) / `colors.fine-print` / `colors.text-muted` | `#6e6e73` |
| `accent` | `colors.primary` (`#0066cc`) / `colors.accent` | `#0066cc` |
| `slate_steel` | `colors.slate-steel` / `colors.hairline` / `colors.divider-soft` | `#475569` |
| `border_subtle` | `colors.hairline` (`#e0e0e0`) / `colors.divider-soft` (`#f0f0f0`) | `rgba(0, 0, 0, 0.08)` |
| `border_accent` | `colors.primary-focus` (`#0071e3`) / `colors.border-accent` | `rgba(0, 102, 204, 0.25)` |

---

### Phase 3: WCAG Relative Luminance & Contrast Calculation
Calculate sRGB relative luminance $L = 0.2126 R + 0.7152 G + 0.0722 B$ for color channels:
$$c = \begin{cases} \frac{C}{12.92} & C \le 0.04045 \\ \left(\frac{C + 0.055}{1.055}\right)^{2.4} & C > 0.04045 \end{cases}$$

Calculate contrast ratio $CR(L_1, L_2) = \frac{L_{\text{max}} + 0.05}{L_{\text{min}} + 0.05}$:
- **Primary Text Contrast**: $CR(\text{text\_primary}, \text{primary\_bg}) \ge 4.5:1$
- **Secondary Text Contrast**: $CR(\text{text\_secondary}, \text{primary\_bg}) \ge 3.0:1$ (target $\ge 4.5:1$)
- **Muted Text Contrast**: $CR(\text{text\_muted}, \text{primary\_bg}) \ge 4.5:1$
- **Accent Contrast**: $CR(\text{accent}, \text{primary\_bg}) \ge 3.0:1$ (UI controls)
- **Dark Surface CTA Contrast**: $CR(\text{primary-on-dark}, \text{surface-tile-1}) \ge 3.0:1$

---

### Phase 4: Automated Contrast Repair Strategies
If contrast ratios fail WCAG minimums:

1. **Light Surface ($L(\text{primary\_bg}) \ge 0.5$)**:
   - If `text_primary` contrast is $< 4.5:1$ (e.g. white-on-white text), set `text_primary` to `#1D1D1F` (or `colors.body` / `colors.ink`).
   - If `text_muted` or `fine-print` is $< 4.5:1$ (e.g. `#7a7a7a` on `#f5f5f7` = 3.94:1), set `text_muted` to `#6e6e73` (achieves **4.66:1** on parchment, **5.07:1** on white canvas).
2. **Dark Surface ($L(\text{primary\_bg}) < 0.5$)**:
   - If `text_primary` contrast is $< 4.5:1$, set `text_primary` to `#F8FAFC`.
   - For primary action CTAs on dark surfaces (`surface-tile-1`), use `primary-on-dark` (`#2997ff`) with black text (`#000000`) to guarantee **4.94:1** surface contrast and **6.96:1** label text contrast.

---

### Phase 5: Export & File Synchronization
Write the audited, compliant specification to `config/themes/[slug].md` and run automated verification tests to confirm 100% WCAG AA compliance.
