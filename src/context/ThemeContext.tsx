'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  generateThemeFromPrimary,
  generateRandomAccessibleTheme,
  calculateContrast,
} from '@/lib/colorEngine';
import {
  exportDesignSystemToMarkdown,
  importDesignSystemFromMarkdown,
} from '@/lib/designSystemMd';

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
  primarySeed?: string;
  isCustom?: boolean;
}

export const PRESET_THEMES: ThemePreset[] = [
  {
    id: 'fintech-midnight',
    name: 'FinTech Midnight (Default)',
    mode: 'dark',
    primarySeed: '#10B981',
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
    primarySeed: '#F59E0B',
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
    primarySeed: '#8B5CF6',
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
    primarySeed: '#059669',
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

export interface ThemeContextType {
  activeMode: 'dark' | 'light';
  tuningMode: 'dark' | 'light';
  darkTokens: ThemeTokens;
  lightTokens: ThemeTokens;
  activePresetId: string;
  savedPresets: ThemePreset[];
  primarySeedColor: string;
  setActiveMode: (mode: 'dark' | 'light') => void;
  setTuningMode: (mode: 'dark' | 'light') => void;
  setPrimarySeedColor: (hex: string) => void;
  generateRandomTheme: () => void;
  applyPreset: (preset: ThemePreset) => void;
  saveCustomTheme: (name: string) => void;
  overwriteCustomTheme: (presetId: string, name?: string) => void;
  deleteCustomTheme: (presetId: string) => void;
  importDesignMD: (markdownContent: string) => boolean;
  exportCurrentDesignMD: () => string;
  resetToDefault: () => void;
  updateToken: (mode: 'dark' | 'light', key: keyof ThemeTokens, value: string) => void;
}

const STORAGE_KEY = 'benjaminsz_theme_config';
const SAVED_PRESETS_KEY = 'benjaminsz_saved_theme_presets';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeMode, setActiveMode] = useState<'dark' | 'light'>('dark');
  const [tuningMode, setTuningMode] = useState<'dark' | 'light'>('dark');
  const [darkTokens, setDarkTokens] = useState<ThemeTokens>(PRESET_THEMES[0].tokens);
  const [lightTokens, setLightTokens] = useState<ThemeTokens>(PRESET_THEMES[3].tokens);
  const [activePresetId, setActivePresetId] = useState<string>('fintech-midnight');
  const [savedPresets, setSavedPresets] = useState<ThemePreset[]>([]);
  const [primarySeedColor, setPrimarySeedColorState] = useState<string>('#10B981');

  // Apply CSS custom properties to DOM
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

  // Load configuration from localStorage on mount & listen for cross-tab sync
  useEffect(() => {
    // Saved presets load
    const savedPresetsJson = localStorage.getItem(SAVED_PRESETS_KEY);
    if (savedPresetsJson) {
      try {
        const parsedPresets = JSON.parse(savedPresetsJson);
        if (Array.isArray(parsedPresets)) setSavedPresets(parsedPresets);
      } catch {
        // ignore error
      }
    }

    const savedConfig = localStorage.getItem(STORAGE_KEY);
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        if (parsed.darkTokens) setDarkTokens(parsed.darkTokens);
        if (parsed.lightTokens) setLightTokens(parsed.lightTokens);
        if (parsed.activeMode) setActiveMode(parsed.activeMode);
        if (parsed.activePresetId) setActivePresetId(parsed.activePresetId);
        if (parsed.primarySeedColor) setPrimarySeedColorState(parsed.primarySeedColor);

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
          if (parsed.primarySeedColor) setPrimarySeedColorState(parsed.primarySeedColor);
          applyTokensToDOM(
            parsed.activeMode || 'dark',
            parsed.darkTokens || PRESET_THEMES[0].tokens,
            parsed.lightTokens || PRESET_THEMES[3].tokens
          );
        } catch {
          // ignore error
        }
      } else if (e.key === SAVED_PRESETS_KEY && e.newValue) {
        try {
          const parsedPresets = JSON.parse(e.newValue);
          if (Array.isArray(parsedPresets)) setSavedPresets(parsedPresets);
        } catch {
          // ignore error
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const saveConfig = (
    mode: 'dark' | 'light',
    dark: ThemeTokens,
    light: ThemeTokens,
    presetId: string,
    seedColor: string
  ) => {
    const payload = {
      activeMode: mode,
      darkTokens: dark,
      lightTokens: light,
      activePresetId: presetId,
      primarySeedColor: seedColor,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    applyTokensToDOM(mode, dark, light);
  };

  const persistSavedPresets = (presets: ThemePreset[]) => {
    setSavedPresets(presets);
    localStorage.setItem(SAVED_PRESETS_KEY, JSON.stringify(presets));
  };

  const setPrimarySeedColor = (hex: string) => {
    setPrimarySeedColorState(hex);
    const computedTokens = generateThemeFromPrimary(hex, tuningMode);

    let newDark = darkTokens;
    let newLight = lightTokens;

    if (tuningMode === 'dark') {
      newDark = computedTokens;
      setDarkTokens(newDark);
    } else {
      newLight = computedTokens;
      setLightTokens(newLight);
    }

    setActivePresetId('custom-seed');
    saveConfig(activeMode, newDark, newLight, 'custom-seed', hex);
  };

  const generateRandomTheme = () => {
    const randomResult = generateRandomAccessibleTheme(tuningMode);
    setPrimarySeedColorState(randomResult.primaryHex);

    let newDark = darkTokens;
    let newLight = lightTokens;

    if (tuningMode === 'dark') {
      newDark = randomResult.tokens;
      setDarkTokens(newDark);
    } else {
      newLight = randomResult.tokens;
      setLightTokens(newLight);
    }

    setActivePresetId('random-seed');
    saveConfig(activeMode, newDark, newLight, 'random-seed', randomResult.primaryHex);
  };

  const applyPreset = (preset: ThemePreset) => {
    setActivePresetId(preset.id);
    if (preset.primarySeed) {
      setPrimarySeedColorState(preset.primarySeed);
    } else {
      setPrimarySeedColorState(preset.tokens.accent);
    }

    if (preset.mode === 'dark') {
      setDarkTokens(preset.tokens);
      setActiveMode('dark');
      saveConfig('dark', preset.tokens, lightTokens, preset.id, preset.primarySeed || preset.tokens.accent);
    } else {
      setLightTokens(preset.tokens);
      setActiveMode('light');
      saveConfig('light', darkTokens, preset.tokens, preset.id, preset.primarySeed || preset.tokens.accent);
    }
  };

  const saveCustomTheme = (name: string) => {
    const id = `custom-${Date.now()}`;
    const currentTokens = tuningMode === 'dark' ? darkTokens : lightTokens;
    const newPreset: ThemePreset = {
      id,
      name,
      mode: tuningMode,
      tokens: currentTokens,
      primarySeed: primarySeedColor,
      isCustom: true,
    };

    const updated = [...savedPresets, newPreset];
    persistSavedPresets(updated);
    applyPreset(newPreset);
  };

  const overwriteCustomTheme = (presetId: string, name?: string) => {
    const currentTokens = tuningMode === 'dark' ? darkTokens : lightTokens;
    const updated = savedPresets.map((preset) => {
      if (preset.id === presetId) {
        return {
          ...preset,
          name: name || preset.name,
          mode: tuningMode,
          tokens: currentTokens,
          primarySeed: primarySeedColor,
        };
      }
      return preset;
    });
    persistSavedPresets(updated);
    const overwrittenPreset = updated.find((p) => p.id === presetId);
    if (overwrittenPreset) applyPreset(overwrittenPreset);
  };

  const deleteCustomTheme = (presetId: string) => {
    const updated = savedPresets.filter((p) => p.id !== presetId);
    persistSavedPresets(updated);
    if (activePresetId === presetId) {
      resetToDefault();
    }
  };

  const importDesignMD = (markdownContent: string): boolean => {
    try {
      const importedPreset = importDesignSystemFromMarkdown(markdownContent);
      importedPreset.isCustom = true;
      const updated = [...savedPresets.filter((p) => p.id !== importedPreset.id), importedPreset];
      persistSavedPresets(updated);
      applyPreset(importedPreset);
      return true;
    } catch {
      return false;
    }
  };

  const exportCurrentDesignMD = (): string => {
    const currentTokens = activeMode === 'dark' ? darkTokens : lightTokens;
    const allPresets = [...PRESET_THEMES, ...savedPresets];
    const currentPreset = allPresets.find((p) => p.id === activePresetId) || {
      id: activePresetId,
      name: 'Custom Active Theme',
      mode: activeMode,
      tokens: currentTokens,
    };

    return exportDesignSystemToMarkdown(currentPreset);
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
    saveConfig(activeMode, newDark, newLight, 'custom', primarySeedColor);
  };

  const resetToDefault = () => {
    const defaultDark = PRESET_THEMES[0].tokens;
    const defaultLight = PRESET_THEMES[3].tokens;
    setDarkTokens(defaultDark);
    setLightTokens(defaultLight);
    setActiveMode('dark');
    setActivePresetId('fintech-midnight');
    setPrimarySeedColorState('#10B981');
    saveConfig('dark', defaultDark, defaultLight, 'fintech-midnight', '#10B981');
  };

  const handleSetActiveMode = (mode: 'dark' | 'light') => {
    setActiveMode(mode);
    saveConfig(mode, darkTokens, lightTokens, activePresetId, primarySeedColor);
  };

  return (
    <ThemeContext.Provider
      value={{
        activeMode,
        tuningMode,
        darkTokens,
        lightTokens,
        activePresetId,
        savedPresets,
        primarySeedColor,
        setActiveMode: handleSetActiveMode,
        setTuningMode,
        setPrimarySeedColor,
        generateRandomTheme,
        applyPreset,
        saveCustomTheme,
        overwriteCustomTheme,
        deleteCustomTheme,
        importDesignMD,
        exportCurrentDesignMD,
        resetToDefault,
        updateToken,
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
