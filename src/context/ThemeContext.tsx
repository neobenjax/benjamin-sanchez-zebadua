'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  generateThemeFromPrimary,
  generateRandomAccessibleTheme,
} from '@/lib/colorEngine';
import {
  exportDesignSystemToMarkdown,
  importDesignSystemFromMarkdown,
  nameToKebabId,
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

// Baseline default fallback theme (FinTech Midnight)
export const DEFAULT_FINTECH_MIDNIGHT: ThemePreset = {
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
};

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
  updateToken: (mode: 'dark' | 'light', key: keyof ThemeTokens, value: string) => void;
}

const STORAGE_KEY = 'benjaminsz_theme_config';
const SAVED_PRESETS_KEY = 'benjaminsz_saved_theme_presets';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeMode, setActiveMode] = useState<'dark' | 'light'>('dark');
  const [tuningMode, setTuningMode] = useState<'dark' | 'light'>('dark');
  const [darkTokens, setDarkTokens] = useState<ThemeTokens>(DEFAULT_FINTECH_MIDNIGHT.tokens);
  const [lightTokens, setLightTokens] = useState<ThemeTokens>(DEFAULT_FINTECH_MIDNIGHT.tokens);
  const [activePresetId, setActivePresetId] = useState<string>('fintech-midnight');
  const [savedPresets, setSavedPresets] = useState<ThemePreset[]>([DEFAULT_FINTECH_MIDNIGHT]);
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

  // Helper to sync theme to root currentdesigntheme.md and config/themes/
  const syncThemeToFileSystem = (preset: ThemePreset, action: 'saveCurrent' | 'saveConfig' = 'saveCurrent') => {
    if (typeof window === 'undefined') return;
    fetch('/api/theme/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preset, action }),
    }).catch(() => {
      // ignore network errors in static deploy
    });
  };

  // Deduplicate themes array by ID and Name
  const deduplicatePresets = (presets: ThemePreset[]): ThemePreset[] => {
    const map = new Map<string, ThemePreset>();
    for (const p of presets) {
      if (p && p.id) {
        map.set(p.id, p);
      }
    }
    return Array.from(map.values());
  };

  // Load configuration from localStorage & server files on mount
  useEffect(() => {
    const loadInitialThemes = async () => {
      let fileCurrentTheme: ThemePreset | null = null;
      let configFileThemes: ThemePreset[] = [];

      try {
        const res = await fetch('/api/theme/sync');
        if (res.ok) {
          const data = await res.json();
          fileCurrentTheme = data.currentTheme;
          configFileThemes = data.configThemes || [];
        }
      } catch {
        // static deploy fallback
      }

      let localSaved: ThemePreset[] = [];
      const savedPresetsJson = localStorage.getItem(SAVED_PRESETS_KEY);
      if (savedPresetsJson) {
        try {
          const parsed = JSON.parse(savedPresetsJson);
          if (Array.isArray(parsed)) localSaved = parsed;
        } catch {
          // ignore
        }
      }

      const combinedMap = new Map<string, ThemePreset>();
      combinedMap.set(DEFAULT_FINTECH_MIDNIGHT.id, DEFAULT_FINTECH_MIDNIGHT);

      for (const p of configFileThemes) {
        combinedMap.set(p.id, p);
      }
      for (const p of localSaved) {
        combinedMap.set(p.id, p);
      }

      const mergedPresets = Array.from(combinedMap.values());
      setSavedPresets(mergedPresets);

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
            parsed.darkTokens || DEFAULT_FINTECH_MIDNIGHT.tokens,
            parsed.lightTokens || DEFAULT_FINTECH_MIDNIGHT.tokens
          );
        } catch {
          applyTokensToDOM('dark', darkTokens, lightTokens);
        }
      } else if (fileCurrentTheme) {
        applyPreset(fileCurrentTheme);
      } else {
        applyTokensToDOM('dark', darkTokens, lightTokens);
      }
    };

    loadInitialThemes();

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
            parsed.darkTokens || DEFAULT_FINTECH_MIDNIGHT.tokens,
            parsed.lightTokens || DEFAULT_FINTECH_MIDNIGHT.tokens
          );
        } catch {
          // ignore
        }
      } else if (e.key === SAVED_PRESETS_KEY && e.newValue) {
        try {
          const parsedPresets = JSON.parse(e.newValue);
          if (Array.isArray(parsedPresets)) {
            setSavedPresets(deduplicatePresets(parsedPresets));
          }
        } catch {
          // ignore
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

    const activePresetObj: ThemePreset = {
      id: presetId,
      name: savedPresets.find((p) => p.id === presetId)?.name || 'Active Design System',
      mode,
      tokens: mode === 'dark' ? dark : light,
      primarySeed: seedColor,
    };
    syncThemeToFileSystem(activePresetObj, 'saveCurrent');
  };

  const persistSavedPresets = (presets: ThemePreset[]) => {
    const unique = deduplicatePresets(presets);
    setSavedPresets(unique);
    localStorage.setItem(SAVED_PRESETS_KEY, JSON.stringify(unique));
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
    const id = nameToKebabId(name);
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
    syncThemeToFileSystem(newPreset, 'saveConfig');
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
    if (overwrittenPreset) {
      syncThemeToFileSystem(overwrittenPreset, 'saveConfig');
      applyPreset(overwrittenPreset);
    }
  };

  const deleteCustomTheme = (presetId: string) => {
    const updated = savedPresets.filter((p) => p.id !== presetId);
    persistSavedPresets(updated);
    if (activePresetId === presetId) {
      applyPreset(DEFAULT_FINTECH_MIDNIGHT);
    }
  };

  const importDesignMD = (markdownContent: string): boolean => {
    try {
      const importedPreset = importDesignSystemFromMarkdown(markdownContent);
      importedPreset.isCustom = true;
      const updated = [...savedPresets.filter((p) => p.id !== importedPreset.id), importedPreset];
      persistSavedPresets(updated);
      syncThemeToFileSystem(importedPreset, 'saveConfig');
      applyPreset(importedPreset);
      return true;
    } catch (err) {
      throw err;
    }
  };

  const exportCurrentDesignMD = (): string => {
    const currentTokens = activeMode === 'dark' ? darkTokens : lightTokens;
    const currentPreset = savedPresets.find((p) => p.id === activePresetId) || {
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
