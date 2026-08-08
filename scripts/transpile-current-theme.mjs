import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const currentThemeMdPath = path.join(rootDir, 'currentdesigntheme.md');
const outputPath = path.join(rootDir, 'src', 'app', 'theme-tokens.css');

const DEFAULT_TOKENS = {
  mode: 'dark',
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

export function transpileCurrentTheme() {
  let tokens = { ...DEFAULT_TOKENS };
  let themeName = 'FinTech Midnight (Default)';

  if (fs.existsSync(currentThemeMdPath)) {
    try {
      const content = fs.readFileSync(currentThemeMdPath, 'utf-8');

      const nameMatch =
        content.match(/design_system_name:\s*"([^"]+)"/i) ||
        content.match(/# Design System Specification:\s*(.+)/i);
      if (nameMatch && nameMatch[1]) {
        themeName = nameMatch[1].trim();
      }

      const modeMatch = content.match(/mode:\s*"(dark|light)"/i);
      if (modeMatch && modeMatch[1]) {
        tokens.mode = modeMatch[1].toLowerCase();
      }

      const cssPropertyMap = {
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
        const match = content.match(regex);
        if (match && match[1]) {
          tokens[tokenKey] = match[1].trim();
        }
      }

      // Check markdown table rows if CSS block was missing
      const tokenKeys = [
        'primary_bg', 'secondary_bg', 'surface_card',
        'text_primary', 'text_secondary', 'text_muted',
        'accent', 'slate_steel', 'border_subtle', 'border_accent'
      ];
      for (const key of tokenKeys) {
        const tableRegex = new RegExp(`\\|\\s*\`?${key}\`?\\s*\\|[^|]*\\|\\s*\`?([^|\`\\n]+)\`?\\s*\\|`, 'i');
        const tableMatch = content.match(tableRegex);
        if (tableMatch && tableMatch[1]) {
          tokens[key] = tableMatch[1].trim();
        }
      }
    } catch (err) {
      console.warn('Warning reading currentdesigntheme.md during build transpilation:', err.message);
    }
  }

  const cssOutput = `/* AUTO-GENERATED FROM currentdesigntheme.md - DO NOT EDIT DIRECTLY */
/* Theme: ${themeName} (${tokens.mode.toUpperCase()}) */
:root {
  --color-primary: ${tokens.primary_bg};
  --color-secondary-bg: ${tokens.secondary_bg};
  --color-surface: ${tokens.surface_card};
  --color-text-primary: ${tokens.text_primary};
  --color-text-secondary: ${tokens.text_secondary};
  --color-text-muted: ${tokens.text_muted};
  --color-accent: ${tokens.accent};
  --color-secondary: ${tokens.slate_steel};
  --border-subtle: ${tokens.border_subtle};
  --border-accent: ${tokens.border_accent};
}
`;

  fs.writeFileSync(outputPath, cssOutput, 'utf-8');
  console.log(`✅ Transpiled currentdesigntheme.md into src/app/theme-tokens.css (${themeName})`);
}

transpileCurrentTheme();
