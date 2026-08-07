'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface ThemeTokens {
  primary_bg: string;
  secondary_bg: string;
  surface_card: string;
  text_primary: string;
  text_secondary: string;
  text_muted: string;
  accent: string;
  slate_steel: string;
  border_subtle: string;
  border_accent: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  mode: 'dark' | 'light';
  tokens: ThemeTokens;
}

export const PRESET_THEMES: ThemePreset[] = [
  {
    id: 'fintech-midnight',
    name: 'FinTech Midnight (Default)',
    mode: 'dark',
    tokens: {
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
    },
  },
  {
    id: 'cyber-amber',
    name: 'Cyber Amber',
    mode: 'dark',
    tokens: {
      primary_bg: '#0F172A',
      secondary_bg: '#020617',
      surface_card: '#1E293B',
      text_primary: '#F8FAFC',
      text_secondary: '#E2E8F0',
      text_muted: '#94A3B8',
      accent: '#F59E0B',
      slate_steel: '#475569',
      border_subtle: 'rgba(255, 255, 255, 0.10)',
      border_accent: 'rgba(245, 158, 11, 0.25)',
    },
  },
  {
    id: 'obsidian-violet',
    name: 'Obsidian Violet',
    mode: 'dark',
    tokens: {
      primary_bg: '#09090B',
      secondary_bg: '#18181B',
      surface_card: '#27272A',
      text_primary: '#FAFAFA',
      text_secondary: '#D4D4D8',
      text_muted: '#A1A1AA',
      accent: '#8B5CF6',
      slate_steel: '#3F3F46',
      border_subtle: 'rgba(255, 255, 255, 0.10)',
      border_accent: 'rgba(139, 92, 246, 0.25)',
    },
  },
  {
    id: 'nordic-light',
    name: 'Nordic Light',
    mode: 'light',
    tokens: {
      primary_bg: '#F7F5F2',
      secondary_bg: '#EAE5DF',
      surface_card: '#FFFFFF',
      text_primary: '#1A1C1E',
      text_secondary: '#475569',
      text_muted: '#64748B',
      accent: '#059669',
      slate_steel: '#CBD5E1',
      border_subtle: 'rgba(0, 0, 0, 0.10)',
      border_accent: 'rgba(5, 150, 105, 0.25)',
    },
  },
];

interface ThemeContextType {
  activeMode: 'dark' | 'light';
  tuningMode: 'dark' | 'light';
  darkTokens: ThemeTokens;
  lightTokens: ThemeTokens;
  activePresetId: string;
  setActiveMode: (mode: 'dark' | 'light') => void;
  setTuningMode: (mode: 'dark' | 'light') => void;
  updateToken: (mode: 'dark' | 'light', key: keyof ThemeTokens, value: string) => void;
  applyPreset: (preset: ThemePreset) => void;
  resetToDefault: () => void;
}

const STORAGE_KEY = 'benjaminsz_theme_config';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeMode, setActiveMode] = useState<'dark' | 'light'>('dark');
  const [tuningMode, setTuningMode] = useState<'dark' | 'light'>('dark');
  const [darkTokens, setDarkTokens] = useState<ThemeTokens>(PRESET_THEMES[0].tokens);
  const [lightTokens, setLightTokens] = useState<ThemeTokens>(PRESET_THEMES[3].tokens);
  const [activePresetId, setActivePresetId] = useState<string>('fintech-midnight');

  // Apply CSS custom properties to document root
  const applyTokensToDOM = (mode: 'dark' | 'light', dark: ThemeTokens, light: ThemeTokens) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    const currentTokens = mode === 'dark' ? dark : light;

    root.setAttribute('data-theme', mode);
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    root.style.setProperty('--color-primary', currentTokens.primary_bg);
    root.style.setProperty('--color-secondary-bg', currentTokens.secondary_bg);
    root.style.setProperty('--color-surface', currentTokens.surface_card);
    root.style.setProperty('--color-text-primary', currentTokens.text_primary);
    root.style.setProperty('--color-text-secondary', currentTokens.text_secondary);
    root.style.setProperty('--color-text-muted', currentTokens.text_muted);
    root.style.setProperty('--color-accent', currentTokens.accent);
    root.style.setProperty('--color-secondary', currentTokens.slate_steel);
    root.style.setProperty('--border-subtle', currentTokens.border_subtle);
    root.style.setProperty('--border-accent', currentTokens.border_accent);
  };

  // Load state from localStorage on mount & listen for cross-tab sync
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.darkTokens) setDarkTokens(parsed.darkTokens);
        if (parsed.lightTokens) setLightTokens(parsed.lightTokens);
        if (parsed.activeMode) setActiveMode(parsed.activeMode);
        if (parsed.activePresetId) setActivePresetId(parsed.activePresetId);
        applyTokensToDOM(
          parsed.activeMode || 'dark',
          parsed.darkTokens || PRESET_THEMES[0].tokens,
          parsed.lightTokens || PRESET_THEMES[3].tokens
        );
      } catch {
        applyTokensToDOM('dark', darkTokens, lightTokens);
      }
    } else {
      applyTokensToDOM('dark', darkTokens, lightTokens);
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed.darkTokens) setDarkTokens(parsed.darkTokens);
          if (parsed.lightTokens) setLightTokens(parsed.lightTokens);
          if (parsed.activeMode) setActiveMode(parsed.activeMode);
          if (parsed.activePresetId) setActivePresetId(parsed.activePresetId);
          applyTokensToDOM(
            parsed.activeMode || 'dark',
            parsed.darkTokens || PRESET_THEMES[0].tokens,
            parsed.lightTokens || PRESET_THEMES[3].tokens
          );
        } catch {
          // ignore error
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const saveConfig = (mode: 'dark' | 'light', dark: ThemeTokens, light: ThemeTokens, presetId: string) => {
    const payload = { activeMode: mode, darkTokens: dark, lightTokens: light, activePresetId: presetId };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    applyTokensToDOM(mode, dark, light);
  };

  const updateToken = (targetMode: 'dark' | 'light', key: keyof ThemeTokens, value: string) => {
    let newDark = darkTokens;
    let newLight = lightTokens;

    if (targetMode === 'dark') {
      newDark = { ...darkTokens, [key]: value };
      setDarkTokens(newDark);
    } else {
      newLight = { ...lightTokens, [key]: value };
      setLightTokens(newLight);
    }
    setActivePresetId('custom');
    saveConfig(activeMode, newDark, newLight, 'custom');
  };

  const applyPreset = (preset: ThemePreset) => {
    setActivePresetId(preset.id);
    if (preset.mode === 'dark') {
      setDarkTokens(preset.tokens);
      setActiveMode('dark');
      saveConfig('dark', preset.tokens, lightTokens, preset.id);
    } else {
      setLightTokens(preset.tokens);
      setActiveMode('light');
      saveConfig('light', darkTokens, preset.tokens, preset.id);
    }
  };

  const resetToDefault = () => {
    const defaultDark = PRESET_THEMES[0].tokens;
    const defaultLight = PRESET_THEMES[3].tokens;
    setDarkTokens(defaultDark);
    setLightTokens(defaultLight);
    setActiveMode('dark');
    setActivePresetId('fintech-midnight');
    saveConfig('dark', defaultDark, defaultLight, 'fintech-midnight');
  };

  const handleSetActiveMode = (mode: 'dark' | 'light') => {
    setActiveMode(mode);
    saveConfig(mode, darkTokens, lightTokens, activePresetId);
  };

  return (
    <ThemeContext.Provider
      value={{
        activeMode,
        tuningMode,
        darkTokens,
        lightTokens,
        activePresetId,
        setActiveMode: handleSetActiveMode,
        setTuningMode,
        updateToken,
        applyPreset,
        resetToDefault,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
