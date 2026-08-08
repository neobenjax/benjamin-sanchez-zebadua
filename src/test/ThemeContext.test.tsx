import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { ThemeProvider, useTheme, DEFAULT_FINTECH_MIDNIGHT } from '../context/ThemeContext';
import { exportDesignSystemToMarkdown } from '@/lib/designSystemMd';

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
    expect(result.current.savedPresets.some((p) => p.name === 'Purple Neo System')).toBe(true);

    let exported = '';
    act(() => {
      exported = result.current.exportCurrentDesignMD();
    });
    expect(exported).toContain('Purple Neo System');
    expect(exported).toContain('--color-primary:');
  });

  it('imports design.md markdown specifications into saved presets', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    const fullPreset: ThemePreset = {
      id: 'binance-system',
      name: 'Imported Binance System',
      mode: 'dark',
      tokens: {
        primary_bg: '#181A20',
        secondary_bg: '#0B0E11',
        surface_card: '#1E2329',
        text_primary: '#EAECEF',
        text_secondary: '#848E9C',
        text_muted: '#474D57',
        accent: '#F0B90B',
        slate_steel: '#2B313A',
        border_subtle: 'rgba(255, 255, 255, 0.10)',
        border_accent: 'rgba(240, 185, 11, 0.20)',
      },
    };
    const sampleMD = exportDesignSystemToMarkdown(fullPreset);

    act(() => {
      const success = result.current.importDesignMD(sampleMD);
      expect(success).toBe(true);
    });
    expect(result.current.darkTokens.primary_bg).toBe('#181A20');
    expect(result.current.darkTokens.accent).toBe('#F0B90B');
  });

  it('applies default preset themes correctly', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => {
      result.current.applyPreset(DEFAULT_FINTECH_MIDNIGHT);
    });
    expect(result.current.activePresetId).toBe('fintech-midnight');
    expect(result.current.darkTokens.accent).toBe('#10B981');
  });
});
