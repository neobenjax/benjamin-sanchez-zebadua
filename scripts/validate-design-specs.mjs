import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const THEMES_DIR = path.join(__dirname, '..', 'config', 'themes');

function hexToRgb(hex) {
  let cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map((c) => c + c).join('');
  }
  if (cleanHex.length !== 6) return null;
  const num = parseInt(cleanHex, 16);
  if (isNaN(num)) return null;
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function getLuminance(r, g, b) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function calculateContrast(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return null;
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

function validateSpecFile(filePath) {
  const fileName = path.basename(filePath);
  const content = fs.readFileSync(filePath, 'utf8');

  console.log(`\n🔍 Auditing Design Spec: ${fileName}`);

  const yamlMatch = content.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---/);
  if (!yamlMatch) {
    console.error(`❌ ERROR: ${fileName} is missing YAML frontmatter.`);
    return false;
  }

  const requiredSections = [
    'System Overview & Key Characteristics',
    'Color System & Design Tokens',
    'Hierarchy, Layout & Spacing System',
    'Elevation, Depth & Shapes',
    'Component Guidelines',
    "Do's and Don'ts",
  ];

  let missingSections = [];
  requiredSections.forEach((sec) => {
    if (!content.includes(sec)) {
      missingSections.push(sec);
    }
  });

  if (missingSections.length > 0) {
    console.warn(`⚠️ WARNING: ${fileName} missing recommended sections: ${missingSections.join(', ')}`);
  }

  // Token extraction
  const tokens = {};
  const tokenKeys = ['primary_bg', 'secondary_bg', 'surface_card', 'text_primary', 'text_secondary', 'text_muted', 'accent'];

  tokenKeys.forEach((key) => {
    const tableRegex = new RegExp(`\\|\\s*\`?${key}\`?\\s*\\|[^|]*\\|\\s*\`?([^|\`\\n]+)\`?\\s*\\|`, 'i');
    const cssRegex = new RegExp(`--color-${key.replace(/_/g, '-')}:\\s*([^;\\n\\r]+);`, 'i');
    const match = content.match(tableRegex) || content.match(cssRegex);
    if (match && match[1]) {
      tokens[key] = match[1].trim();
    }
  });

  if (tokens.primary_bg && tokens.text_primary) {
    const cr = calculateContrast(tokens.text_primary, tokens.primary_bg);
    if (cr !== null) {
      if (cr >= 4.5) {
        console.log(`  ✅ Primary Copy Contrast: ${cr.toFixed(2)}:1 (Passes WCAG AA $\\ge 4.5:1$)`);
      } else {
        console.error(`  ❌ Primary Copy Contrast: ${cr.toFixed(2)}:1 (Fails WCAG AA $\\ge 4.5:1$)`);
      }
    }
  }

  if (tokens.primary_bg && tokens.text_secondary) {
    const cr = calculateContrast(tokens.text_secondary, tokens.primary_bg);
    if (cr !== null) {
      if (cr >= 3.0) {
        console.log(`  ✅ Secondary Copy Contrast: ${cr.toFixed(2)}:1 (Passes WCAG AA $\\ge 3.0:1$)`);
      } else {
        console.warn(`  ⚠️ Secondary Copy Contrast: ${cr.toFixed(2)}:1 (Below WCAG AA $\\ge 3.0:1$)`);
      }
    }
  }

  return true;
}

function main() {
  console.log('🚀 Running Deterministic Design Spec Validation Engine...');
  const files = fs.readdirSync(THEMES_DIR).filter((f) => f.endsWith('.md'));

  let totalValid = 0;
  files.forEach((file) => {
    if (validateSpecFile(path.join(THEMES_DIR, file))) {
      totalValid++;
    }
  });

  console.log(`\n🎉 Completed validation of ${totalValid}/${files.length} design specifications.\n`);
}

main();
