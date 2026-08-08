# Website Fragments & Layout Schema Specification

This directory contains layout fragments (`header.md`, `footer.md`, and optional custom section fragments) used by the personal portfolio website.

The fragment architecture decouples content, navigation structure, and brand link configurations from visual UI components. Content maintainers can edit Markdown files in this directory to update headers, footers, and section layouts without modifying code.

---

## 1. Supported Layout Directives (Headings)

Heading level 1 (`#`) and level 2 (`##`) tags in fragment files act as layout directives for the Markdown Transpiler Engine (`src/lib/fragments.ts`).

### Header Directives
- `# LEFT_SIDE_HEADER` (or `# BRANDING_LEFT`): Container for left-aligned elements (brand logo, website title, home link).
- `# RIGHT_SIDE_HEADER` (or `# NAVIGATION_RIGHT`): Container for right-aligned navigation items and action buttons.
- `# CENTERED_HEADER`: Stacked layout centering branding and navigation.

### Footer Directives
- `# THREE_COLUMN_LAYOUT`: Responsive 3-column equal grid layout (`grid-cols-1 md:grid-cols-3`).
- `# TWO_COLUMN_LAYOUT`: Responsive 2-column split grid layout (`grid-cols-1 md:grid-cols-2`).
- `# FOUR_COLUMN_LAYOUT`: Responsive 4-column layout (`grid-cols-1 md:grid-cols-4`).
- `# CENTERED_FOOTER`: Single-column centered footer layout.
- `## COLUMN`: Sub-container directive marking the start of a distinct column block inside multi-column footer directives.

### Section Layout Directives
- `# SPLIT_HERO_LAYOUT`: Dual persona split screen container.
- `# TWO_COLUMN_SPLIT`: 50/50 side-by-side section grid.
- `# FEATURE_GRID`: 3-column feature or card layout.

---

## 2. Markdown to UI Component Transpilation Map

The transpiler parses raw Markdown syntax into typed Abstract Syntax Trees (`FragmentAST`) and maps elements to design system components:

| Markdown Syntax | Transpiler AST Node | UI Component (`src/components/fragments/`) | Rendered Output |
| :--- | :--- | :--- | :--- |
| `# LEFT_SIDE_HEADER` | `HeaderSlot.left` | `<HeaderLeftSlot>` | Flex container aligned to start |
| `# RIGHT_SIDE_HEADER` | `HeaderSlot.right` | `<HeaderRightSlot>` | Desktop nav menu & action items |
| `[![Alt](img_url)](url)` | `FragmentImageLink` | `<BrandLogo>` / `<SocialBadge>` | Interactive image link or badge |
| `[Text](url)` (Header context) | `FragmentNavLink` | `<NavLink>` | Styled navigation link (`hover:text-accent`) |
| `[Text](url)` (Action context) | `FragmentAction` | `<Button variant="accent">` | Primary action CTA button |
| `### Title` | `ColumnHeading` | `<h4 className="font-serif font-bold">` | Column header title |
| `[Text](mailto:...)` | `FragmentMailLink` | `<MailCTAButton>` | Email action link with icon |
| `[Text](url)` (Footer context) | `FragmentFooterLink` | `<FooterLink>` | Subtle footer link (`text-gray-400 hover:text-white`) |

---

## 3. How to Author & Customize Fragments

### Editing Header Navigation (`header.md`)
1. Place branding elements under `# LEFT_SIDE_HEADER`. Use image links `[![Alt](logo_url)](home_url)` or standard text links.
2. Place navigation links under `# RIGHT_SIDE_HEADER`.
3. Links pointing to external URLs or `.pdf` files automatically render with appropriate icons or action button styling.

```markdown
# LEFT_SIDE_HEADER

[![BENJAMIN // FINTECH ARCHITECT](/favicon.svg)](/)

# RIGHT_SIDE_HEADER

[About Me](/#about)
[Synergy](/#synergy)
[Articles](/articles)
[Download CV](/benjamin-cv.pdf)
```

### Editing Footer Grid (`footer.md`)
1. Declare the main grid layout directive at the top (e.g. `# THREE_COLUMN_LAYOUT`).
2. Separate each column block with a `## COLUMN` heading.
3. Add column titles with `### Title` and list links or badges underneath.

```markdown
# THREE_COLUMN_LAYOUT

## COLUMN
### Section 1
[Link 1](/url-1)

## COLUMN
### Section 2
[Link 2](/url-2)

## COLUMN
### Section 3
[Link 3](/url-3)
```

---

## 4. Architecture & Data Flow

```
+------------------------------------+
|  content/fragments/*.md            |
|  (header.md, footer.md)            |
+------------------------------------+
                 |
                 v (Build / Runtime Transpilation)
+------------------------------------+
|  src/lib/fragments.ts              |
|  (Markdown -> AST Transpiler Engine)|
+------------------------------------+
                 |
                 v (Structured AST Props)
+------------------------------------+
|  src/components/fragments/         |
|  (FragmentHeader, FragmentFooter)  |
+------------------------------------+
                 |
                 v
+------------------------------------+
|  Next.js Page / App Router Layout  |
+------------------------------------+
```
