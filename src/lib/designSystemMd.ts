import { ThemeTokens, ThemePreset } from '@/context/ThemeContext';
import { generateThemeFromPrimary, hexToRgb, getLuminance, calculateContrast } from './colorEngine';

export interface DesignSystemMetadata {
  name: string;
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
 * Generate a clean kebab-case slug without timestamp
 */
export function nameToKebabSlug(name: string): string {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'custom'
  );
}

/**
 * Generate a clean kebab-case ID with timestamp from a human-readable theme name
 */
export function nameToKebabId(name: string): string {
  const kebab = nameToKebabSlug(name);
  const timestamp = Date.now();
  return `${kebab}-${timestamp}`;
}

/**
 * Robust YAML frontmatter parser supporting getdesign.md schema
 */
function parseFrontmatterYaml(markdownContent: string): {
  name?: string;
  description?: string;
  colors?: Record<string, string>;
} {
  const yamlMatch = markdownContent.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---/);
  if (!yamlMatch) return {};

  const yamlLines = yamlMatch[1].split(/[\r\n]+/);
  const result: {
    name?: string;
    description?: string;
    colors?: Record<string, string>;
  } = {};

  let inColorsBlock = false;
  const colors: Record<string, string> = {};

  for (const line of yamlLines) {
    const topLevelMatch = line.match(/^([a-z0-9_-]+):\s*(.*)/i);
    if (topLevelMatch) {
      const key = topLevelMatch[1].toLowerCase();
      let val = topLevelMatch[2].trim().replace(/^["']|["']$/g, '');
      if (key === 'colors') {
        inColorsBlock = true;
        continue;
      } else {
        inColorsBlock = false;
        if (key === 'name' || key === 'design_system_name') {
          result.name = val;
        } else if (key === 'description') {
          result.description = val;
        }
      }
    } else if (inColorsBlock) {
      const kvMatch = line.match(/^\s+([a-z0-9_-]+):\s*(.*)/i);
      if (kvMatch) {
        const cKey = kvMatch[1].toLowerCase();
        let cVal = kvMatch[2].trim();

        if (cVal.startsWith('"') || cVal.startsWith("'")) {
          const quoteChar = cVal[0];
          const endIdx = cVal.indexOf(quoteChar, 1);
          if (endIdx > 0) {
            cVal = cVal.substring(1, endIdx);
          } else {
            cVal = cVal.replace(/^["']|["']$/g, '');
          }
        } else {
          cVal = cVal.replace(/\s+#.*$/, '').trim();
        }

        if (cVal) {
          colors[cKey] = cVal;
        }
      } else if (line.trim() !== '' && !line.startsWith(' ') && !line.startsWith('\t')) {
        inColorsBlock = false;
      }
    }
  }

  if (Object.keys(colors).length > 0) {
    result.colors = colors;
  }

  return result;
}

/**
 * Validates raw Markdown content against getdesign.md standard specification
 */
export function validateDesignSystemMarkdown(markdownContent: string): ValidationResult {
  if (!markdownContent || typeof markdownContent !== 'string' || markdownContent.trim().length === 0) {
    return { isValid: false, errorReason: 'Markdown content is empty.' };
  }

  const frontmatter = parseFrontmatterYaml(markdownContent);

  const hasName =
    !!frontmatter.name ||
    /# Design System Specification:\s*(.+)/i.test(markdownContent) ||
    /^#\s+(.+)/m.test(markdownContent);

  if (!hasName) {
    return {
      isValid: false,
      errorReason: 'Missing design system name in YAML frontmatter (name:) or title (# Design System Specification: Name).',
    };
  }

  if (frontmatter.colors && (frontmatter.colors.primary || frontmatter.colors.canvas || frontmatter.colors['primary-bg'])) {
    return { isValid: true };
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
 * Generate a standard getdesign.md Markdown document string from Theme Preset tokens
 */
export function exportDesignSystemToMarkdown(
  preset: ThemePreset,
  author: string = 'Benjamin Sanchez Zebadua'
): string {
  const dateStr = new Date().toISOString().split('T')[0];
  const t = preset.tokens;

  return `---
version: "1.0.0"
name: "${preset.name}"
design_system_name: "${preset.name}"
description: "A precision-engineered design language with WCAG 2.1 AA contrast compliance, standardized tokens, and responsive UI primitives."
author: "${author}"
updated_at: "${dateStr}"

colors:
  primary: "${t.accent}"
  primary-focus: "${t.accent}"
  primary-bg: "${t.primary_bg}"
  secondary-bg: "${t.secondary_bg}"
  surface: "${t.surface_card}"
  body: "${t.text_primary}"
  body-muted: "${t.text_muted}"
  text-primary: "${t.text_primary}"
  text-secondary: "${t.text_secondary}"
  text-muted: "${t.text_muted}"
  accent: "${t.accent}"
  slate-steel: "${t.slate_steel}"
  border-subtle: "${t.border_subtle}"
  border-accent: "${t.border_accent}"
  on-primary: "#ffffff"
  on-dark: "#ffffff"

typography:
  display-lg:
    fontFamily: "Inter, sans-serif"
    fontSize: "40px"
    fontWeight: "700"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "16px"
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

components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
  card-surface:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border-subtle}"
    rounded: "{rounded.md}"
---

# Design System Specification: ${preset.name}

> Official Design System Specification file (\`design.md\` standard). Synchronized with root CSS custom properties and WCAG 2.1 AA accessibility guidelines.

## 1. Color System & Design Tokens

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
:root {
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
- **Display Headings**: Inter (Font Sans).
- **Body Copy & Interfaces**: Inter (Font Sans).
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

  const frontmatter = parseFrontmatterYaml(markdownContent);

  let name = frontmatter.name || 'Imported Design System';
  if (!frontmatter.name) {
    const titleMatch =
      markdownContent.match(/# Design System Specification:\s*(.+)/i) ||
      markdownContent.match(/^#\s+(.+)/m);
    if (titleMatch && titleMatch[1]) {
      name = titleMatch[1].trim();
    }
  }

  let primarySeed: string | undefined = undefined;
  if (frontmatter.colors && (frontmatter.colors.primary || frontmatter.colors.accent)) {
    primarySeed = frontmatter.colors.primary || frontmatter.colors.accent;
  }

  let tokens: ThemeTokens = primarySeed
    ? generateThemeFromPrimary(primarySeed)
    : {
        primary_bg: '#0A192F',
        secondary_bg: '#081426',
        surface_card: '#0C1E38',
        text_primary: '#F8FAFC',
        text_secondary: '#CBD5E1',
        text_muted: '#94A3B8',
        accent: '#10B981',
        slate_steel: '#334155',
        border_subtle: 'rgba(255, 255, 255, 0.10)',
        border_accent: 'rgba(16, 185, 129, 0.20)',
      };

  if (frontmatter.colors) {
    const c = frontmatter.colors;
    if (c.primary || c.accent) tokens.accent = c.primary || c.accent;

    const bgCandidate = c['primary-bg'] || c.canvas || c['surface-canvas'] || c['bg-primary'];
    if (bgCandidate) tokens.primary_bg = bgCandidate;

    const secBgCandidate = c['secondary-bg'] || c['canvas-parchment'] || c['canvas-soft'] || c['surface-pearl'];
    if (secBgCandidate) tokens.secondary_bg = secBgCandidate;

    const surfaceCandidate = c.surface || c['surface-card'] || c['surface-tile-1'];
    if (surfaceCandidate) tokens.surface_card = surfaceCandidate;

    const bgRgb = hexToRgb(tokens.primary_bg);
    const bgLum = bgRgb ? getLuminance(bgRgb.r, bgRgb.g, bgRgb.b) : 0.5;

    if (bgLum >= 0.5) {
      // Light surface background (e.g. #ffffff canvas):
      // Primary text MUST be dark text (body, ink, text-primary, text-dark), NEVER body-on-dark!
      tokens.text_primary = c.body || c.ink || c['text-primary'] || c['text-dark'] || '#1d1d1f';
      tokens.text_secondary = c['ink-muted-80'] || c['text-secondary'] || c['body-muted'] || c['ink-soft'] || '#475569';
      tokens.text_muted = c['ink-muted-48'] || c['fine-print'] || c['text-muted'] || '#6e6e73';
    } else {
      // Dark surface background:
      // Primary text MUST be light text (body-on-dark, on-dark, text-primary)!
      tokens.text_primary = c['body-on-dark'] || c['on-dark'] || c['text-primary'] || c.body || '#ffffff';
      tokens.text_secondary = c['body-muted'] || c['text-secondary'] || c['ink-soft'] || '#cbd5e1';
      tokens.text_muted = c['text-muted'] || c['fine-print'] || '#94a3b8';
    }

    if (c.hairline || c['divider-soft'] || c['border-subtle']) tokens.border_subtle = c.hairline || c['divider-soft'] || c['border-subtle'] || tokens.border_subtle;
    if (c['chrome-indigo'] || c['slate-steel'] || c.secondary) tokens.slate_steel = c['chrome-indigo'] || c['slate-steel'] || c.secondary || tokens.slate_steel;
  }

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

  // Post-import WCAG contrast safety check: guarantee primary text never produces low contrast (< 4.5:1)
  const contrastWithBg = calculateContrast(tokens.text_primary, tokens.primary_bg);
  if (contrastWithBg !== null && contrastWithBg < 4.5) {
    const bgRgb = hexToRgb(tokens.primary_bg);
    const bgLum = bgRgb ? getLuminance(bgRgb.r, bgRgb.g, bgRgb.b) : 0.5;
    tokens.text_primary = bgLum >= 0.5 ? '#1D1D1F' : '#F8FAFC';
  }

  const generatedId = nameToKebabSlug(name);

  return {
    id: generatedId,
    name,
    tokens,
    primarySeed,
  };
}
