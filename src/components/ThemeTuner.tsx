'use client';

import React from 'react';
import { useTheme, PRESET_THEMES, ThemeTokens } from '@/context/ThemeContext';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Sun, Moon, RotateCcw, Check, AlertTriangle } from 'lucide-react';

// Helper function to convert HEX to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map((c) => c + c).join('');
  }
  if (cleanHex.length !== 6) return null;
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

// Calculate relative luminance for WCAG contrast
function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Calculate contrast ratio (1:1 to 21:1)
function calculateContrast(hex1: string, hex2: string): number | null {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return null;
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

export function ThemeTuner() {
  const {
    activeMode,
    tuningMode,
    darkTokens,
    lightTokens,
    activePresetId,
    setActiveMode,
    setTuningMode,
    updateToken,
    applyPreset,
    resetToDefault,
  } = useTheme();

  const currentTokens = tuningMode === 'dark' ? darkTokens : lightTokens;
  const contrastRatio = calculateContrast(currentTokens.text_primary, currentTokens.primary_bg);
  const isContrastValid = contrastRatio === null || contrastRatio >= 4.5;

  const tokenLabels: { key: keyof ThemeTokens; label: string; desc: string }[] = [
    { key: 'primary_bg', label: 'Primary Background', desc: 'Main backdrop color' },
    { key: 'secondary_bg', label: 'Secondary Background', desc: 'Alternating section backdrop' },
    { key: 'surface_card', label: 'Surface Card', desc: 'Card containers and popups' },
    { key: 'text_primary', label: 'Primary Text', desc: 'Body and headline copy' },
    { key: 'text_secondary', label: 'Secondary Text', desc: 'Descriptions & metadata' },
    { key: 'text_muted', label: 'Muted Text', desc: 'Labels and captions' },
    { key: 'accent', label: 'Accent Color', desc: 'CTAs, badges, active states' },
    { key: 'slate_steel', label: 'Steel Slate', desc: 'Secondary borders & icons' },
  ];

  return (
    <Card className="flex flex-col gap-6 max-w-xl w-full">
      {/* Mode Selectors */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-serif font-bold text-[var(--color-text-primary)]">Theme Tuner Engine</h3>
          <Badge variant="pulse">Live Sync Active</Badge>
        </div>

        {/* Global Active Theme Mode */}
        <div className="flex items-center justify-between p-3 rounded-sm bg-slate-900/60 border border-[var(--border-subtle)]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
            Active Site Mode: <strong className="text-[var(--color-accent)] uppercase">{activeMode}</strong>
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={activeMode === 'dark' ? 'primary' : 'secondary'}
              onClick={() => setActiveMode('dark')}
            >
              <Moon className="w-3.5 h-3.5 mr-1" /> Dark
            </Button>
            <Button
              size="sm"
              variant={activeMode === 'light' ? 'primary' : 'secondary'}
              onClick={() => setActiveMode('light')}
            >
              <Sun className="w-3.5 h-3.5 mr-1" /> Light
            </Button>
          </div>
        </div>

        {/* Mode Being Edited */}
        <div className="flex items-center justify-between p-3 rounded-sm bg-slate-900/40 border border-[var(--border-accent)]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
            Target Tuning Target:
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setTuningMode('dark')}
              className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                tuningMode === 'dark'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tuning Dark Mode
            </button>
            <button
              onClick={() => setTuningMode('light')}
              className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                tuningMode === 'light'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tuning Light Mode
            </button>
          </div>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          Curated WCAG AA Presets
        </label>
        <div className="grid grid-cols-2 gap-2">
          {PRESET_THEMES.map((preset) => {
            const isSelected = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset)}
                className={`flex items-center justify-between p-3 text-xs font-medium rounded-sm border transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'border-[var(--color-accent)] bg-emerald-500/10 text-[var(--color-text-primary)] font-bold'
                    : 'border-[var(--border-subtle)] bg-slate-900/30 text-[var(--color-text-secondary)] hover:border-slate-600'
                }`}
              >
                <span>{preset.name}</span>
                {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accessibility Contrast Checker */}
      <div className={`flex items-center gap-3 p-3 rounded-sm border text-xs ${
        isContrastValid
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          : 'bg-amber-500/10 border-amber-500/40 text-amber-300'
      }`}>
        {isContrastValid ? (
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
        ) : (
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
        )}
        <div>
          <p className="font-semibold">
            WCAG AA Text Contrast Ratio:{' '}
            {contrastRatio ? `${contrastRatio.toFixed(2)}:1` : 'N/A'}
          </p>
          <p className="text-[11px] opacity-80">
            {isContrastValid
              ? 'Passes WCAG AA (≥ 4.5:1 min contrast ratio).'
              : 'Warning: Low contrast between primary text and background.'}
          </p>
        </div>
      </div>

      {/* Individual Token Color Inputs */}
      <div className="flex flex-col gap-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          Token Color Fine-Tuning ({tuningMode.toUpperCase()} Mode)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
          {tokenLabels.map(({ key, label, desc }) => {
            const hexValue = currentTokens[key];
            const isHex = hexValue.startsWith('#');
            return (
              <div
                key={key}
                className="flex items-center justify-between p-2.5 rounded-sm bg-slate-900/40 border border-[var(--border-subtle)]"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold text-[var(--color-text-primary)]">{label}</span>
                  <span className="text-[10px] text-[var(--color-text-muted)]">{desc}</span>
                </div>
                <div className="flex items-center gap-2">
                  {isHex && (
                    <input
                      type="color"
                      value={hexValue}
                      aria-label={`${label} color picker`}
                      onChange={(e) => updateToken(tuningMode, key, e.target.value)}
                      className="w-7 h-7 rounded-sm border border-slate-700 bg-transparent cursor-pointer"
                    />
                  )}
                  <input
                    type="text"
                    value={hexValue}
                    aria-label={`${label} hex value`}
                    onChange={(e) => updateToken(tuningMode, key, e.target.value)}
                    className="w-20 px-2 py-1 text-xs font-mono rounded-sm bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset Action */}
      <div className="flex justify-end pt-2 border-t border-[var(--border-subtle)]">
        <Button variant="outline" size="sm" onClick={resetToDefault}>
          <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Reset to FinTech Midnight Default
        </Button>
      </div>
    </Card>
  );
}
