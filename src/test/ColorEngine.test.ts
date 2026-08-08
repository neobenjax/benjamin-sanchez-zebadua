import { describe, it, expect } from 'vitest';
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  getLuminance,
  calculateContrast,
  ensureWCAGContrast,
  generateThemeFromPrimary,
  generateRandomAccessibleTheme,
} from '@/lib/colorEngine';

describe('Color Engine Math & Contrast Unit Tests', () => {
  it('converts hex to RGB and back accurately', () => {
    const rgb = hexToRgb('#10B981');
    expect(rgb).toEqual({ r: 16, g: 185, b: 129 });
    const hex = rgbToHex(16, 185, 129);
    expect(hex).toBe('#10B981');
  });

  it('converts RGB to HSL and back accurately', () => {
    const hsl = rgbToHsl(16, 185, 129);
    expect(hsl.h).toBeGreaterThanOrEqual(155);
    expect(hsl.h).toBeLessThanOrEqual(165);
    const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
    expect(Math.abs(rgb.r - 16)).toBeLessThanOrEqual(2);
    expect(Math.abs(rgb.g - 185)).toBeLessThanOrEqual(2);
    expect(Math.abs(rgb.b - 129)).toBeLessThanOrEqual(2);
  });

  it('calculates WCAG contrast ratio for pure black and white', () => {
    const contrast = calculateContrast('#000000', '#FFFFFF');
    expect(contrast).toBeGreaterThan(20);
  });

  it('adjusts color lightness to satisfy WCAG AA ratio >= 4.5', () => {
    const lowContrastText = '#333333';
    const darkBg = '#0A192F';
    const adjusted = ensureWCAGContrast(lowContrastText, darkBg, 4.5);
    const contrast = calculateContrast(adjusted, darkBg);
    expect(contrast).not.toBeNull();
    expect(contrast!).toBeGreaterThanOrEqual(4.5);
  });

  it('generates full 10-token dark and light mode themes from primary seed color', () => {
    const primarySeed = '#3B82F6';
    const darkTheme = generateThemeFromPrimary(primarySeed, 'dark');
    expect(darkTheme.primary_bg).toBeDefined();
    expect(darkTheme.text_primary).toBeDefined();
    expect(darkTheme.accent).toBeDefined();

    const darkTextContrast = calculateContrast(darkTheme.text_primary, darkTheme.primary_bg);
    expect(darkTextContrast!).toBeGreaterThanOrEqual(4.5);

    const lightTheme = generateThemeFromPrimary(primarySeed, 'light');
    const lightTextContrast = calculateContrast(lightTheme.text_primary, lightTheme.primary_bg);
    expect(lightTextContrast!).toBeGreaterThanOrEqual(4.5);
  });

  it('generates a random accessible theme pair (RandomA11y)', () => {
    const randomTheme = generateRandomAccessibleTheme('dark');
    expect(randomTheme.primaryHex).toMatch(/^#[0-9A-F]{6}$/i);
    expect(randomTheme.tokens.primary_bg).toBeDefined();
    const contrast = calculateContrast(randomTheme.tokens.text_primary, randomTheme.tokens.primary_bg);
    expect(contrast!).toBeGreaterThanOrEqual(4.5);
  });
});
