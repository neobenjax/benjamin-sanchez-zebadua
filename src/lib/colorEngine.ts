import { ThemeTokens } from '@/context/ThemeContext';

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface AccessibilityReport {
  hasViolations: boolean;
  primaryContrast: number | null;
  secondaryContrast: number | null;
  accentContrast: number | null;
  surfaceContrast: number | null;
  violations: string[];
}

/**
 * Converts Hex string to RGB object
 */
export function hexToRgb(hex: string): RgbColor | null {
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

/**
 * Converts RGB values (0-255) to Hex string
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (val: number) => Math.max(0, Math.min(255, Math.round(val)));
  const toHex = (val: number) => clamp(val).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Converts RGB to HSL (h: 0-360, s: 0-100, l: 0-100)
 */
export function rgbToHsl(r: number, g: number, b: number): HslColor {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Converts HSL (h: 0-360, s: 0-100, l: 0-100) to RGB
 */
export function hslToRgb(h: number, s: number, l: number): RgbColor {
  const hNorm = (h % 360) / 360;
  const sNorm = Math.max(0, Math.min(100, s)) / 100;
  const lNorm = Math.max(0, Math.min(100, l)) / 100;

  if (sNorm === 0) {
    const gray = Math.round(lNorm * 255);
    return { r: gray, g: gray, b: gray };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let tAdj = t;
    if (tAdj < 0) tAdj += 1;
    if (tAdj > 1) tAdj -= 1;
    if (tAdj < 1 / 6) return p + (q - p) * 6 * tAdj;
    if (tAdj < 1 / 2) return q;
    if (tAdj < 2 / 3) return p + (q - p) * (2 / 3 - tAdj) * 6;
    return p;
  };

  const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm;
  const p = 2 * lNorm - q;

  return {
    r: Math.round(hue2rgb(p, q, hNorm + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, hNorm) * 255),
    b: Math.round(hue2rgb(p, q, hNorm - 1 / 3) * 255),
  };
}

/**
 * Converts HSL directly to Hex
 */
export function hslToHex(h: number, s: number, l: number): string {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

/**
 * Calculate WCAG relative luminance
 */
export function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Calculate contrast ratio between two hex colors (returns 1 to 21)
 */
export function calculateContrast(hex1: string, hex2: string): number | null {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return null;
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Audit Theme Tokens against WCAG 2.1 AA requirements
 */
export function analyzeThemeAccessibility(tokens: ThemeTokens): AccessibilityReport {
  const primaryContrast = calculateContrast(tokens.text_primary, tokens.primary_bg);
  const secondaryContrast = calculateContrast(tokens.text_secondary, tokens.primary_bg);
  const accentContrast = calculateContrast(tokens.accent, tokens.primary_bg);
  const surfaceContrast = calculateContrast(tokens.text_primary, tokens.surface_card);

  const violations: string[] = [];

  if (primaryContrast !== null && primaryContrast < 4.5) {
    violations.push(`Primary Copy contrast ratio (${primaryContrast.toFixed(2)}:1) is below WCAG AA minimum (4.5:1).`);
  }
  if (secondaryContrast !== null && secondaryContrast < 3.0) {
    violations.push(`Secondary Copy contrast ratio (${secondaryContrast.toFixed(2)}:1) is below WCAG AA minimum (3.0:1).`);
  }
  if (surfaceContrast !== null && surfaceContrast < 4.5) {
    violations.push(`Surface Card text contrast ratio (${surfaceContrast.toFixed(2)}:1) is below WCAG AA minimum (4.5:1).`);
  }

  return {
    hasViolations: violations.length > 0,
    primaryContrast,
    secondaryContrast,
    accentContrast,
    surfaceContrast,
    violations,
  };
}

/**
 * Adjust lightness of a color to meet a minimum WCAG contrast against background
 */
export function ensureWCAGContrast(
  foregroundHex: string,
  backgroundHex: string,
  minRatio: number = 4.5
): string {
  let contrast = calculateContrast(foregroundHex, backgroundHex);
  if (contrast !== null && contrast >= minRatio) {
    return foregroundHex;
  }

  const fgRgb = hexToRgb(foregroundHex);
  const bgRgb = hexToRgb(backgroundHex);
  if (!fgRgb || !bgRgb) return foregroundHex;

  const bgLum = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
  const fgHsl = rgbToHsl(fgRgb.r, fgRgb.g, fgRgb.b);

  const makeLighter = bgLum < 0.5;

  let currentL = fgHsl.l;
  for (let i = 0; i < 50; i++) {
    currentL = makeLighter ? currentL + 1.5 : currentL - 1.5;
    if (currentL > 98 || currentL < 2) break;
    const testHex = hslToHex(fgHsl.h, fgHsl.s, currentL);
    contrast = calculateContrast(testHex, backgroundHex);
    if (contrast !== null && contrast >= minRatio) {
      return testHex;
    }
  }

  return foregroundHex;
}

/**
 * Derive full 10-token palette from a primary seed color
 */
export function generateThemeFromPrimary(primaryHex: string): ThemeTokens {
  const rgb = hexToRgb(primaryHex) || { r: 16, g: 185, b: 129 };
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const isSeedDark = getLuminance(rgb.r, rgb.g, rgb.b) < 0.5;

  const primary_bg = hslToHex(hsl.h, Math.min(hsl.s, 40), isSeedDark ? 7 : 97);
  const secondary_bg = hslToHex(hsl.h, Math.min(hsl.s, 45), isSeedDark ? 5 : 93);
  const surface_card = isSeedDark ? hslToHex(hsl.h, Math.min(hsl.s, 35), 11) : '#FFFFFF';

  const accent = ensureWCAGContrast(
    hslToHex(hsl.h, Math.max(hsl.s, 65), isSeedDark ? Math.max(hsl.l, 45) : Math.min(hsl.l, 40)),
    primary_bg,
    3.5
  );

  const text_primary = ensureWCAGContrast(isSeedDark ? '#F8FAFC' : '#0F172A', primary_bg, 7.0);
  const text_secondary = ensureWCAGContrast(isSeedDark ? hslToHex(hsl.h, 20, 80) : hslToHex(hsl.h, 30, 30), primary_bg, 4.5);
  const text_muted = ensureWCAGContrast(isSeedDark ? hslToHex(hsl.h, 15, 65) : hslToHex(hsl.h, 20, 45), primary_bg, 3.0);

  const slate_steel = isSeedDark ? hslToHex(hsl.h, 25, 25) : hslToHex(hsl.h, 20, 80);
  const border_subtle = isSeedDark ? 'rgba(255, 255, 255, 0.10)' : 'rgba(0, 0, 0, 0.10)';
  const border_accent = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25)`;

  return {
    primary_bg,
    secondary_bg,
    surface_card,
    text_primary,
    text_secondary,
    text_muted,
    accent,
    slate_steel,
    border_subtle,
    border_accent,
  };
}

/**
 * RandomA11y-inspired generator: returns a random primary color & accessible theme pair
 */
export function generateRandomAccessibleTheme(): {
  primaryHex: string;
  name: string;
  tokens: ThemeTokens;
} {
  const randomHue = Math.floor(Math.random() * 360);
  const randomSat = Math.floor(Math.random() * 40) + 60;
  const randomLit = Math.floor(Math.random() * 30) + 40;
  const primaryHex = hslToHex(randomHue, randomSat, randomLit);

  const tokens = generateThemeFromPrimary(primaryHex);

  const colorNames = [
    'Emerald', 'Teal', 'Cyan', 'Electric Blue', 'Royal Indigo',
    'Amethyst', 'Magenta', 'Crimson', 'Coral', 'Amber',
    'Goldenrod', 'Lime', 'Verdant', 'Titanium'
  ];
  const nameIndex = Math.floor((randomHue / 360) * colorNames.length);
  const colorName = colorNames[nameIndex] || 'Custom Seed';

  return {
    primaryHex,
    name: `${colorName} Seed`,
    tokens,
  };
}
