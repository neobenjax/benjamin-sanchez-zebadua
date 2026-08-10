'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  generateThemeFromPrimary,
  generateRandomAccessibleTheme,
  analyzeThemeAccessibility,
  AccessibilityReport,
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
  tokens: ThemeTokens;
  primarySeed?: string;
  isCustom?: boolean;
}

// Baseline default fallback theme (FinTech Midnight)
export const DEFAULT_FINTECH_MIDNIGHT: ThemePreset = {
  id: 'fintech-midnight',
  name: 'FinTech Midnight',
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
  tokens: ThemeTokens;
  activePresetId: string;
  savedPresets: ThemePreset[];
  primarySeedColor: string;
  isDraft: boolean;
  setPrimarySeedColor: (hex: string) => void;
  generateRandomTheme: () => void;
  applyPreset: (preset: ThemePreset, syncToFileSystem?: boolean) => void;
  saveCustomTheme: (name: string) => void;
  overwriteCustomTheme: (presetId: string, name?: string) => void;
  deleteCustomTheme: (presetId: string) => void;
  importDesignMD: (markdownContent: string) => { preset: ThemePreset; report: AccessibilityReport };
  exportCurrentDesignMD: () => string;
  updateToken: (key: keyof ThemeTokens, value: string) => void;
}

const STORAGE_KEY = 'benjaminsz_theme_config';
const SAVED_PRESETS_KEY = 'benjaminsz_saved_theme_presets';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [tokens, setTokens] = useState<ThemeTokens>(DEFAULT_FINTECH_MIDNIGHT.tokens);
  const [activePresetId, setActivePresetId] = useState<string>('fintech-midnight');
  const [savedPresets, setSavedPresets] = useState<ThemePreset[]>([DEFAULT_FINTECH_MIDNIGHT]);
  const [primarySeedColor, setPrimarySeedColorState] = useState<string>('#10B981');
  const [isDraft, setIsDraft] = useState<boolean>(false);

  // Apply CSS custom properties to DOM
  const applyTokensToDOM = (currentTokens: ThemeTokens) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

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

  // Load configuration from server files & currentdesigntheme.md on mount
  useEffect(() => {
    const loadInitialThemes = async () => {
      let fileCurrentTheme: ThemePreset | null = null;
      let configFileThemes: ThemePreset[] = [];
      let isApiAvailable = false;

      try {
        const res = await fetch('/api/theme/sync');
        if (res.ok) {
          const data = await res.json();
          fileCurrentTheme = data.currentTheme;
          configFileThemes = data.configThemes || [];
          isApiAvailable = true;
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

      if (isApiAvailable) {
        // When server API is available, config/themes/ is the authority on disk-backed themes.
        // Prune any theme from localStorage that was deleted from config/themes/.
        const configFileIds = new Set(configFileThemes.map((p) => p.id));
        for (const p of configFileThemes) {
          combinedMap.set(p.id, p);
        }
        for (const p of localSaved) {
          if (configFileIds.has(p.id) || p.id === DEFAULT_FINTECH_MIDNIGHT.id) {
            combinedMap.set(p.id, p);
          }
        }
      } else {
        for (const p of configFileThemes) {
          combinedMap.set(p.id, p);
        }
        for (const p of localSaved) {
          combinedMap.set(p.id, p);
        }
      }

      const mergedPresets = Array.from(combinedMap.values());
      setSavedPresets(mergedPresets);
      localStorage.setItem(SAVED_PRESETS_KEY, JSON.stringify(mergedPresets));

      if (fileCurrentTheme) {
        setTokens(fileCurrentTheme.tokens);
        const matched = mergedPresets.find(
          (p) => p.id === fileCurrentTheme?.id || p.name.toLowerCase() === fileCurrentTheme?.name.toLowerCase()
        );
        const resolvedId = matched ? matched.id : fileCurrentTheme.id;

        setActivePresetId(resolvedId);
        if (fileCurrentTheme.primarySeed) {
          setPrimarySeedColorState(fileCurrentTheme.primarySeed);
        } else {
          setPrimarySeedColorState(fileCurrentTheme.tokens.accent);
        }
        applyTokensToDOM(fileCurrentTheme.tokens);
        setIsDraft(false);
      } else {
        const savedConfig = localStorage.getItem(STORAGE_KEY);
        if (savedConfig) {
          try {
            const parsed = JSON.parse(savedConfig);
            if (parsed.tokens) setTokens(parsed.tokens);
            if (parsed.activePresetId) setActivePresetId(parsed.activePresetId);
            if (parsed.primarySeedColor) setPrimarySeedColorState(parsed.primarySeedColor);

            applyTokensToDOM(parsed.tokens || DEFAULT_FINTECH_MIDNIGHT.tokens);
          } catch {
            applyTokensToDOM(tokens);
          }
        }
      }
    };

    loadInitialThemes();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed.tokens) setTokens(parsed.tokens);
          if (parsed.activePresetId) setActivePresetId(parsed.activePresetId);
          if (parsed.primarySeedColor) setPrimarySeedColorState(parsed.primarySeedColor);
          applyTokensToDOM(parsed.tokens || DEFAULT_FINTECH_MIDNIGHT.tokens);
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
    currentTokens: ThemeTokens,
    presetId: string,
    seedColor: string,
    syncToFileSystem: boolean = true
  ) => {
    const payload = {
      tokens: currentTokens,
      activePresetId: presetId,
      primarySeedColor: seedColor,
    };
    // Always save to localStorage so client browser retains temporary theme choices across page navigation
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    applyTokensToDOM(currentTokens);

    // Only write to root currentdesigntheme.md when syncToFileSystem is true (e.g. ThemeTuner)
    if (syncToFileSystem) {
      const activePresetObj: ThemePreset = {
        id: presetId,
        name: savedPresets.find((p) => p.id === presetId)?.name || 'Active Design System',
        tokens: currentTokens,
        primarySeed: seedColor,
      };
      syncThemeToFileSystem(activePresetObj, 'saveCurrent');
    }
  };

  const persistSavedPresets = (presets: ThemePreset[]) => {
    const unique = deduplicatePresets(presets);
    setSavedPresets(unique);
    localStorage.setItem(SAVED_PRESETS_KEY, JSON.stringify(unique));
  };

  const setPrimarySeedColor = (hex: string) => {
    setPrimarySeedColorState(hex);
    const computedTokens = generateThemeFromPrimary(hex);
    setTokens(computedTokens);
    setActivePresetId('custom-seed');
    setIsDraft(true);
    saveConfig(computedTokens, 'custom-seed', hex, false);
  };

  const generateRandomTheme = () => {
    const randomResult = generateRandomAccessibleTheme();
    setPrimarySeedColorState(randomResult.primaryHex);
    setTokens(randomResult.tokens);
    setActivePresetId('random-seed');
    setIsDraft(true);
    saveConfig(randomResult.tokens, 'random-seed', randomResult.primaryHex, false);
  };

  const applyPreset = (preset: ThemePreset, syncToFileSystem: boolean = true) => {
    setActivePresetId(preset.id);
    setIsDraft(false);
    setTokens(preset.tokens);
    if (preset.primarySeed) {
      setPrimarySeedColorState(preset.primarySeed);
    } else {
      setPrimarySeedColorState(preset.tokens.accent);
    }
    saveConfig(preset.tokens, preset.id, preset.primarySeed || preset.tokens.accent, syncToFileSystem);
  };

  const saveCustomTheme = (name: string) => {
    const id = nameToKebabId(name);
    const newPreset: ThemePreset = {
      id,
      name,
      tokens,
      primarySeed: primarySeedColor,
      isCustom: true,
    };

    const updated = [...savedPresets, newPreset];
    persistSavedPresets(updated);
    setIsDraft(false);
    syncThemeToFileSystem(newPreset, 'saveConfig');
    applyPreset(newPreset);
  };

  const overwriteCustomTheme = (presetId: string, name?: string) => {
    const updated = savedPresets.map((preset) => {
      if (preset.id === presetId) {
        return {
          ...preset,
          name: name || preset.name,
          tokens,
          primarySeed: primarySeedColor,
        };
      }
      return preset;
    });
    persistSavedPresets(updated);
    const overwrittenPreset = updated.find((p) => p.id === presetId);
    if (overwrittenPreset) {
      setIsDraft(false);
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

  const importDesignMD = (markdownContent: string): { preset: ThemePreset; report: AccessibilityReport } => {
    const importedPreset = importDesignSystemFromMarkdown(markdownContent);
    importedPreset.isCustom = true;
    const report = analyzeThemeAccessibility(importedPreset.tokens);
    return { preset: importedPreset, report };
  };

  const exportCurrentDesignMD = (): string => {
    const currentPreset = savedPresets.find((p) => p.id === activePresetId) || {
      id: activePresetId,
      name: 'Custom Active Theme',
      tokens,
    };

    return exportDesignSystemToMarkdown(currentPreset);
  };

  const updateToken = (key: keyof ThemeTokens, value: string) => {
    const newTokens = { ...tokens, [key]: value };
    setTokens(newTokens);
    setActivePresetId('custom');
    setIsDraft(true);
    saveConfig(newTokens, 'custom', primarySeedColor, false);
  };

  return (
    <ThemeContext.Provider
      value={{
        tokens,
        activePresetId,
        savedPresets,
        primarySeedColor,
        isDraft,
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
