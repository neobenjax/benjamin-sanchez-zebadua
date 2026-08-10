import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const currentThemeMdPath = path.join(rootDir, 'currentdesigntheme.md');
const currentThemeCssPath = path.join(rootDir, 'src', 'app', 'current-theme-tokens.css');
const oldThemeCssPath = path.join(rootDir, 'src', 'app', 'theme-tokens.css');

const configThemesDir = path.join(rootDir, 'config', 'themes');
const preInstalledOutputDir = path.join(rootDir, 'src', 'app', 'pre-installed-themes');

const DEFAULT_TOKENS = {
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

const CSS_PROP_MAP = {
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

function parseThemeFromMarkdownContent(content, fallbackName = 'Custom Theme') {
  let tokens = { ...DEFAULT_TOKENS };
  let themeName = fallbackName;

  const nameMatch =
    content.match(/design_system_name:\s*"([^"]+)"/i) ||
    content.match(/# Design System Specification:\s*(.+)/i) ||
    content.match(/^name:\s*"([^"]+)"/im);
  if (nameMatch && nameMatch[1]) {
    themeName = nameMatch[1].trim();
  }

  for (const [cssProp, tokenKey] of Object.entries(CSS_PROP_MAP)) {
    const regex = new RegExp(`${cssProp}:\\s*([^;\\n\\r]+);`, 'i');
    const match = content.match(regex);
    if (match && match[1]) {
      tokens[tokenKey] = match[1].trim();
    }
  }

  const tokenKeys = Object.values(CSS_PROP_MAP);
  for (const key of tokenKeys) {
    const tableRegex = new RegExp(`\\|\\s*\`?${key}\`?\\s*\\|[^|]*\\|\\s*\`?([^|\`\\n]+)\`?\\s*\\|`, 'i');
    const tableMatch = content.match(tableRegex);
    if (tableMatch && tableMatch[1]) {
      tokens[key] = tableMatch[1].trim();
    }
  }

  return { themeName, tokens };
}

function generateCssString(themeName, tokens, sourceFilename = 'currentdesigntheme.md') {
  return `/* AUTO-GENERATED FROM ${sourceFilename} - DO NOT EDIT DIRECTLY */
/* Theme: ${themeName} */
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
}

export function transpileCurrentTheme() {
  let tokens = { ...DEFAULT_TOKENS };
  let themeName = 'FinTech Midnight';

  if (fs.existsSync(currentThemeMdPath)) {
    try {
      const content = fs.readFileSync(currentThemeMdPath, 'utf-8');
      const parsed = parseThemeFromMarkdownContent(content, 'FinTech Midnight');
      tokens = parsed.tokens;
      themeName = parsed.themeName;
    } catch (err) {
      console.warn('Warning reading currentdesigntheme.md during build transpilation:', err.message);
    }
  }

  const cssOutput = generateCssString(themeName, tokens, 'currentdesigntheme.md');
  fs.writeFileSync(currentThemeCssPath, cssOutput, 'utf-8');
  console.log(`✅ Transpiled currentdesigntheme.md into src/app/current-theme-tokens.css (${themeName})`);

  // Remove old theme-tokens.css if it exists to maintain clean repo state
  if (fs.existsSync(oldThemeCssPath)) {
    try {
      fs.unlinkSync(oldThemeCssPath);
    } catch {
      // ignore
    }
  }
}

export function transpilePreInstalledThemes() {
  if (!fs.existsSync(preInstalledOutputDir)) {
    fs.mkdirSync(preInstalledOutputDir, { recursive: true });
  }

  const manifestEntries = [];

  if (fs.existsSync(configThemesDir)) {
    const files = fs.readdirSync(configThemesDir);
    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(configThemesDir, file);
        const stem = file.replace(/\.md$/i, '');
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          const { themeName, tokens } = parseThemeFromMarkdownContent(content, stem);
          const cssFilename = `${stem}.css`;
          const cssPath = path.join(preInstalledOutputDir, cssFilename);
          const cssContent = generateCssString(themeName, tokens, `config/themes/${file}`);
          fs.writeFileSync(cssPath, cssContent, 'utf-8');

          manifestEntries.push({
            id: stem,
            name: themeName,
            file: cssFilename,
            tokens,
            primarySeed: tokens.accent,
          });
        } catch (err) {
          console.warn(`[Build] Warning transpiling theme ${file}:`, err.message);
        }
      }
    }
  }

  const manifestPath = path.join(preInstalledOutputDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifestEntries, null, 2), 'utf-8');
  console.log(`✅ Transpiled ${manifestEntries.length} pre-installed themes into src/app/pre-installed-themes/`);
}

transpileCurrentTheme();
transpilePreInstalledThemes();
