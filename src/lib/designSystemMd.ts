import { ThemeTokens, ThemePreset } from '@/context/ThemeContext';

export interface DesignSystemMetadata {
  name: string;
  mode: 'dark' | 'light';
  version?: string;
  author?: string;
  description?: string;
  updatedAt?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errorReason?: string;
  missingTokens?: string[];
}

export const REQUIRED_TOKEN_KEYS: (keyof ThemeTokens)[] = [
  'primary_bg',
  'secondary_bg',
  'surface_card',
  'text_primary',
  'text_secondary',
  'text_muted',
  'accent',
  'slate_steel',
  'border_subtle',
  'border_accent',
];

/**
 * Generate a clean kebab-case ID with timestamp from a human-readable theme name
 */
export function nameToKebabId(name: string): string {
  const kebab = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const timestamp = Date.now();
  return `${kebab || 'custom'}-${timestamp}`;
}

/**
 * Validates raw Markdown content against the design.md standard specification
 */
export function validateDesignSystemMarkdown(markdownContent: string): ValidationResult {
  if (!markdownContent || typeof markdownContent !== 'string' || markdownContent.trim().length === 0) {
    return { isValid: false, errorReason: 'Markdown content is empty.' };
  }

  // Check for design system name in frontmatter or H1 title
  const hasName =
    /design_system_name:\s*"([^"]+)"/i.test(markdownContent) ||
    /# Design System Specification:\s*(.+)/i.test(markdownContent);
  if (!hasName) {
    return { isValid: false, errorReason: 'Missing design system name in frontmatter or title (# Design System Specification: Name).' };
  }

  const missingTokens: string[] = [];

  for (const tokenKey of REQUIRED_TOKEN_KEYS) {
    const cssRegex = new RegExp(`--color-${tokenKey.replace(/_/g, '-')}:\\s*([^;\\n\\r]+);`, 'i');
    const tableRegex = new RegExp(`\\|\\s*\`?${tokenKey}\`?\\s*\\|[^|]*\\|\\s*\`?([^|\`\\n]+)\`?\\s*\\|`, 'i');
    const borderRegex = new RegExp(`--${tokenKey.replace(/_/g, '-')}:\\s*([^;\\n\\r]+);`, 'i');

    const matchesCSS = cssRegex.test(markdownContent) || borderRegex.test(markdownContent);
    const matchesTable = tableRegex.test(markdownContent);

    if (!matchesCSS && !matchesTable) {
      missingTokens.push(tokenKey);
    }
  }

  if (missingTokens.length > 0) {
    return {
      isValid: false,
      errorReason: `Missing required design system tokens: ${missingTokens.join(', ')}.`,
      missingTokens,
    };
  }

  return { isValid: true };
}

/**
 * Generate a standard design.md Markdown document string from Theme Preset tokens
 */
export function exportDesignSystemToMarkdown(
  preset: ThemePreset,
  author: string = 'Benjamin Sanchez Zebadua'
): string {
  const dateStr = new Date().toISOString().split('T')[0];
  const t = preset.tokens;

  return `---
design_system_name: "${preset.name}"
mode: "${preset.mode}"
version: "1.0.0"
author: "${author}"
updated_at: "${dateStr}"
---

# Design System Specification: ${preset.name}

> Official Design System Specification file (\`design.md\` standard). Synchronized with root CSS custom properties and WCAG 2.1 AA accessibility guidelines.

## 1. Color System & Design Tokens (${preset.mode.toUpperCase()} Mode)

| Token Key | Design System Role | Hex / CSS Value | Description |
| :--- | :--- | :--- | :--- |
| \`primary_bg\` | Primary Background | \`${t.primary_bg}\` | Main application background |
| \`secondary_bg\` | Secondary Background | \`${t.secondary_bg}\` | Alternating section backdrops |
| \`surface_card\` | Surface Card | \`${t.surface_card}\` | Elevated card containers and popups |
| \`text_primary\` | Primary Copy | \`${t.text_primary}\` | High contrast headings & body copy |
| \`text_secondary\` | Secondary Copy | \`${t.text_secondary}\` | Subtitles, labels & descriptions |
| \`text_muted\` | Muted Text | \`${t.text_muted}\` | Captions, metadata & hints |
| \`accent\` | Accent Color | \`${t.accent}\` | High visibility CTAs & status badges |
| \`slate_steel\` | Steel Slate | \`${t.slate_steel}\` | Secondary borders & icon outlines |
| \`border_subtle\` | Subtle Border | \`${t.border_subtle}\` | Card grid lines & subtle dividers |
| \`border_accent\` | Accent Border | \`${t.border_accent}\` | Active state highlight borders |

### CSS Custom Properties Snippet

\`\`\`css
:root[data-theme="${preset.mode}"] {
  --color-primary: ${t.primary_bg};
  --color-secondary-bg: ${t.secondary_bg};
  --color-surface: ${t.surface_card};
  --color-text-primary: ${t.text_primary};
  --color-text-secondary: ${t.text_secondary};
  --color-text-muted: ${t.text_muted};
  --color-accent: ${t.accent};
  --color-secondary: ${t.slate_steel};
  --border-subtle: ${t.border_subtle};
  --border-accent: ${t.border_accent};
}
\`\`\`

## 2. Component Guidelines & Specifications

### Buttons
- **Primary CTA**: Styled with \`var(--color-accent)\`, high contrast text.
- **Secondary**: \`var(--color-surface)\` with \`var(--border-subtle)\` border.
- **Disabled**: \`opacity: 0.5\`, \`pointer-events: none\`.
- **Pill**: Fully rounded (\`rounded-full\`).

### Typography & Display Scale
- **Display Headings**: Playfair Display (Font Serif).
- **Body Copy & Interfaces**: Inter Sans (Font Sans).
- **Technical & Code**: Fira Code / JetBrains Mono (Font Mono).
`;
}

/**
 * Import and parse raw design.md Markdown content into a ThemePreset object
 */
export function importDesignSystemFromMarkdown(markdownContent: string): ThemePreset {
  const validation = validateDesignSystemMarkdown(markdownContent);
  if (!validation.isValid) {
    throw new Error(validation.errorReason || 'Invalid design.md specification format.');
  }

  let name = 'Imported Design System';
  let mode: 'dark' | 'light' = 'dark';

  const nameMatch =
    markdownContent.match(/design_system_name:\s*"([^"]+)"/i) ||
    markdownContent.match(/# Design System Specification:\s*(.+)/i);
  if (nameMatch && nameMatch[1]) {
    name = nameMatch[1].trim();
  }

  const modeMatch = markdownContent.match(/mode:\s*"(dark|light)"/i);
  if (modeMatch && modeMatch[1]) {
    mode = modeMatch[1].toLowerCase() as 'dark' | 'light';
  }

  const tokens: ThemeTokens = {
    primary_bg: mode === 'dark' ? '#0A192F' : '#F7F5F2',
    secondary_bg: mode === 'dark' ? '#081426' : '#EAE5DF',
    surface_card: mode === 'dark' ? '#0C1E38' : '#FFFFFF',
    text_primary: mode === 'dark' ? '#F8FAFC' : '#1A1C1E',
    text_secondary: mode === 'dark' ? '#CBD5E1' : '#475569',
    text_muted: mode === 'dark' ? '#94A3B8' : '#64748B',
    accent: mode === 'dark' ? '#10B981' : '#059669',
    slate_steel: mode === 'dark' ? '#334155' : '#CBD5E1',
    border_subtle: mode === 'dark' ? 'rgba(255, 255, 255, 0.10)' : 'rgba(0, 0, 0, 0.10)',
    border_accent: mode === 'dark' ? 'rgba(16, 185, 129, 0.20)' : 'rgba(5, 150, 105, 0.25)',
  };

  const cssPropertyMap: Record<string, keyof ThemeTokens> = {
    '--color-primary': 'primary_bg',
    '--color-secondary-bg': 'secondary_bg',
    '--color-surface': 'surface_card',
    '--color-text-primary': 'text_primary',
    '--color-text-secondary': 'text_secondary',
    '--color-text-muted': 'text_muted',
    '--color-accent': 'accent',
    '--color-secondary': 'slate_steel',
    '--border-subtle': 'border_subtle',
    '--border-accent': 'border_accent',
  };

  for (const [cssProp, tokenKey] of Object.entries(cssPropertyMap)) {
    const regex = new RegExp(`${cssProp}:\\s*([^;\\n\\r]+);`, 'i');
    const match = markdownContent.match(regex);
    if (match && match[1]) {
      tokens[tokenKey] = match[1].trim();
    }
  }

  for (const tokenKey of REQUIRED_TOKEN_KEYS) {
    const tableRegex = new RegExp(`\\|\\s*\`?${tokenKey}\`?\\s*\\|[^|]*\\|\\s*\`?([^|\`\\n]+)\`?\\s*\\|`, 'i');
    const tableMatch = markdownContent.match(tableRegex);
    if (tableMatch && tableMatch[1]) {
      tokens[tokenKey] = tableMatch[1].trim();
    }
  }

  const generatedId = nameToKebabId(name);

  return {
    id: generatedId,
    name,
    mode,
    tokens,
  };
}
