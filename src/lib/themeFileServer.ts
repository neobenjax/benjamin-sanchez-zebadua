import fs from 'fs';
import path from 'path';
import { ThemePreset } from '@/context/ThemeContext';
import { importDesignSystemFromMarkdown, exportDesignSystemToMarkdown } from './designSystemMd';

const ROOT_CURRENT_THEME_PATH = path.join(process.cwd(), 'currentdesigntheme.md');
const THEME_TOKENS_CSS_PATH = path.join(process.cwd(), 'src', 'app', 'current-theme-tokens.css');
const CONFIG_THEMES_DIR = path.join(process.cwd(), 'config', 'themes');

/**
 * Ensures that the config/themes directory exists
 */
function ensureThemesDir() {
  if (!fs.existsSync(CONFIG_THEMES_DIR)) {
    fs.mkdirSync(CONFIG_THEMES_DIR, { recursive: true });
  }
}

/**
 * Read current active theme from root currentdesigntheme.md
 */
export function getCurrentDesignThemeFromFile(): ThemePreset | null {
  try {
    if (fs.existsSync(ROOT_CURRENT_THEME_PATH)) {
      const content = fs.readFileSync(ROOT_CURRENT_THEME_PATH, 'utf-8');
      return importDesignSystemFromMarkdown(content);
    }
  } catch (err) {
    console.warn('[Theme Audit] Warning reading currentdesigntheme.md:', (err as Error).message);
  }
  return null;
}

/**
 * Read all audited saved themes from config/themes/*.md
 */
export function getAllConfigFileThemes(): ThemePreset[] {
  ensureThemesDir();
  const presets: ThemePreset[] = [];
  try {
    const files = fs.readdirSync(CONFIG_THEMES_DIR);
    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(CONFIG_THEMES_DIR, file);
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          const preset = importDesignSystemFromMarkdown(content);
          const stemId = file.replace(/\.md$/i, '');
          preset.id = stemId;
          preset.isCustom = true;
          presets.push(preset);
        } catch (err) {
          console.warn(`[Theme Audit] Skipping invalid theme file ${file}:`, (err as Error).message);
        }
      }
    }
  } catch (err) {
    console.error('Error reading config/themes:', err);
  }
  return presets;
}

/**
 * Save active theme to root currentdesigntheme.md and update src/app/theme-tokens.css
 */
export function saveCurrentDesignThemeToFile(preset: ThemePreset): boolean {
  try {
    const markdown = exportDesignSystemToMarkdown(preset);
    fs.writeFileSync(ROOT_CURRENT_THEME_PATH, markdown, 'utf-8');

    // Also update static CSS custom properties file
    const t = preset.tokens;
    const cssOutput = `/* AUTO-GENERATED FROM currentdesigntheme.md - DO NOT EDIT DIRECTLY */
/* Theme: ${preset.name} */
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
`;
    fs.writeFileSync(THEME_TOKENS_CSS_PATH, cssOutput, 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing root currentdesigntheme.md and theme-tokens.css:', err);
    return false;
  }
}

/**
 * Save custom theme to config/themes/[id].md
 */
export function saveConfigFileTheme(preset: ThemePreset): boolean {
  ensureThemesDir();
  try {
    const cleanId = preset.id.replace(/[^a-z0-9_-]/gi, '-');
    const filePath = path.join(CONFIG_THEMES_DIR, `${cleanId}.md`);
    const markdown = exportDesignSystemToMarkdown(preset);
    fs.writeFileSync(filePath, markdown, 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing config theme file:', err);
    return false;
  }
}
