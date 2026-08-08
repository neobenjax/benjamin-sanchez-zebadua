import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { ThemeProvider, useTheme, PRESET_THEMES } from '../context/ThemeContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides default dark theme tokens', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.activeMode).toBe('dark');
    expect(result.current.darkTokens.primary_bg).toBe('#0A192F');
    expect(result.current.darkTokens.accent).toBe('#10B981');
  });

  it('allows toggling active mode between dark and light', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => {
      result.current.setActiveMode('light');
    });
    expect(result.current.activeMode).toBe('light');
  });

  it('generates whole token system from a primary seed color', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => {
      result.current.setPrimarySeedColor('#3B82F6');
    });
    expect(result.current.primarySeedColor).toBe('#3B82F6');
    expect(result.current.darkTokens.primary_bg).toBeDefined();
    expect(result.current.darkTokens.text_primary).toBeDefined();
    expect(result.current.activePresetId).toBe('custom-seed');
  });

  it('generates random accessible theme pair (RandomA11y)', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => {
      result.current.generateRandomTheme();
    });
    expect(result.current.primarySeedColor).toMatch(/^#[0-9A-F]{6}$/i);
    expect(result.current.activePresetId).toBe('random-seed');
  });

  it('saves custom themes and exports design.md specifications', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => {
      result.current.setPrimarySeedColor('#8B5CF6');
      result.current.saveCustomTheme('Purple Neo System');
    });
    expect(result.current.savedPresets.length).toBe(1);
    expect(result.current.savedPresets[0].name).toBe('Purple Neo System');

    let exported = '';
    act(() => {
      exported = result.current.exportCurrentDesignMD();
    });
    expect(exported).toContain('Purple Neo System');
    expect(exported).toContain('--color-primary:');
  });

  it('imports design.md markdown specifications into saved presets', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    const sampleMD = `---
design_system_name: "Imported Binance System"
mode: "dark"
---
# Design System Specification: Imported Binance System
\`\`\`css
:root[data-theme="dark"] {
  --color-primary: #181A20;
  --color-accent: #F0B90B;
}
\`\`\`
`;
    act(() => {
      const success = result.current.importDesignMD(sampleMD);
      expect(success).toBe(true);
    });
    expect(result.current.darkTokens.primary_bg).toBe('#181A20');
    expect(result.current.darkTokens.accent).toBe('#F0B90B');
  });

  it('applies preset themes correctly', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    const cyberAmberPreset = PRESET_THEMES.find((p) => p.id === 'cyber-amber')!;
    act(() => {
      result.current.applyPreset(cyberAmberPreset);
    });
    expect(result.current.activePresetId).toBe('cyber-amber');
    expect(result.current.darkTokens.accent).toBe('#F59E0B');
  });

  it('resets to default FinTech Midnight theme', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => {
      result.current.setPrimarySeedColor('#000000');
      result.current.resetToDefault();
    });
    expect(result.current.activePresetId).toBe('fintech-midnight');
    expect(result.current.darkTokens.accent).toBe('#10B981');
  });
});
