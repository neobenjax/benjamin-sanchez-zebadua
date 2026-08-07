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

  it('updates individual token values live', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => {
      result.current.updateToken('dark', 'accent', '#F59E0B');
    });
    expect(result.current.darkTokens.accent).toBe('#F59E0B');
    expect(result.current.activePresetId).toBe('custom');
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
      result.current.updateToken('dark', 'accent', '#000000');
      result.current.resetToDefault();
    });
    expect(result.current.activePresetId).toBe('fintech-midnight');
    expect(result.current.darkTokens.accent).toBe('#10B981');
  });
});
