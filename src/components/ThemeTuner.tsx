'use client';

import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { calculateContrast } from '@/lib/colorEngine';
import { validateDesignSystemMarkdown } from '@/lib/designSystemMd';
import { ModalPortal } from './ui/ModalPortal';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import {
  Check,
  AlertTriangle,
  Shuffle,
  Save,
  FileCode,
  Upload,
  Download,
  Copy,
  Trash2,
  Sparkles,
  Sliders,
  X,
  AlertCircle,
} from 'lucide-react';

export function ThemeTuner() {
  const {
    tuningMode,
    darkTokens,
    lightTokens,
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
  } = useTheme();

  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [themeNameInput, setThemeNameInput] = useState('');
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [importMarkdownText, setImportMarkdownText] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [importErrorMessage, setImportErrorMessage] = useState<string | null>(null);

  const currentTokens = tuningMode === 'dark' ? darkTokens : lightTokens;
  const contrastRatio = calculateContrast(currentTokens.text_primary, currentTokens.primary_bg);
  const isContrastValid = contrastRatio === null || contrastRatio >= 4.5;

  const selectedPreset = savedPresets.find((p) => p.id === activePresetId);
  const isSelectedPresetCustom = selectedPreset?.isCustom ?? false;

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!themeNameInput.trim()) return;
    saveCustomTheme(themeNameInput.trim());
    setThemeNameInput('');
    setSaveModalOpen(false);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setImportErrorMessage(null);

    const validation = validateDesignSystemMarkdown(importMarkdownText);
    if (!validation.isValid) {
      setImportErrorMessage(validation.errorReason || 'Format error: Markdown does not adhere to design.md standard.');
      return;
    }

    try {
      const success = importDesignMD(importMarkdownText);
      if (success) {
        setImportMarkdownText('');
        setImportModalOpen(false);
      }
    } catch (err) {
      setImportErrorMessage((err as Error).message || 'Failed to import design.md specification.');
    }
  };

  const handleCopyMarkdown = async () => {
    const md = exportCurrentDesignMD();
    await navigator.clipboard.writeText(md);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const md = exportCurrentDesignMD();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activePresetId || 'current'}-design.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="flex flex-col gap-6 max-w-xl w-full">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-serif font-bold text-[var(--color-text-primary)] flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[var(--color-accent)]" /> Theme & Color Engine
          </h3>
          <div className="flex items-center gap-2">
            {isDraft && <Badge variant="secondary" className="text-amber-400 border-amber-500/30">Unsaved Draft</Badge>}
            <Badge variant="pulse">Design System v1.0</Badge>
          </div>
        </div>
      </div>

      {/* Primary Seed Color Picker & Randomizer */}
      <div className="flex flex-col gap-3 p-4 rounded-sm bg-slate-900/50 border border-[var(--border-subtle)]">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-primary)] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[var(--color-accent)]" /> Primary Seed Color (HueCodex Generator)
          </label>
          <span className="text-[11px] text-[var(--color-text-muted)] font-mono">{primarySeedColor}</span>
        </div>
        <p className="text-xs text-[var(--color-text-secondary)]">
          All 10 design system tokens are automatically computed based on this seed. Edits remain temporary drafts until saved.
        </p>

        <div className="flex items-center gap-3 pt-1">
          <div className="flex items-center gap-2 flex-1">
            <input
              type="color"
              value={primarySeedColor.startsWith('#') ? primarySeedColor : '#10B981'}
              aria-label="Primary seed color picker"
              onChange={(e) => setPrimarySeedColor(e.target.value)}
              className="w-9 h-9 rounded-sm border border-slate-700 bg-transparent cursor-pointer"
            />
            <input
              type="text"
              value={primarySeedColor}
              aria-label="Primary seed hex input"
              onChange={(e) => setPrimarySeedColor(e.target.value)}
              className="w-28 px-2.5 py-1.5 text-xs font-mono rounded-sm bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <Button
            size="sm"
            variant="accent"
            onClick={generateRandomTheme}
            className="shrink-0 flex items-center gap-1.5"
          >
            <Shuffle className="w-3.5 h-3.5" /> Random Accessible Pair
          </Button>
        </div>
      </div>

      {/* Saved Theme Selection Dropdown */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
            Saved Design Systems
          </label>
          <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
            {savedPresets.length} themes available
          </span>
        </div>

        <select
          value={activePresetId}
          aria-label="Select design system theme"
          onChange={(e) => {
            const chosen = savedPresets.find((p) => p.id === e.target.value);
            if (chosen) applyPreset(chosen);
          }}
          className="w-full px-3 py-2 text-xs font-medium rounded-sm bg-slate-950 border border-[var(--border-subtle)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
        >
          {savedPresets.map((preset) => (
            <option key={preset.id} value={preset.id}>
              {preset.name} ({preset.mode.toUpperCase()})
            </option>
          ))}
          {!savedPresets.some((p) => p.id === activePresetId) && (
            <option value={activePresetId}>Unsaved Draft Theme ({tuningMode.toUpperCase()})</option>
          )}
        </select>

        {/* Action Buttons: Save, Overwrite, Delete */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setSaveModalOpen(true)}>
              <Save className="w-3.5 h-3.5 mr-1" /> Save Theme As...
            </Button>
            {isSelectedPresetCustom && selectedPreset && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => overwriteCustomTheme(selectedPreset.id)}
              >
                <Check className="w-3.5 h-3.5 mr-1" /> Overwrite
              </Button>
            )}
          </div>

          {isSelectedPresetCustom && selectedPreset && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => deleteCustomTheme(selectedPreset.id)}
              className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
            </Button>
          )}
        </div>
      </div>

      {/* design.md Specification Tools */}
      <div className="flex flex-col gap-2.5 p-3.5 rounded-sm bg-slate-950/60 border border-[var(--border-subtle)]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-primary)] flex items-center gap-1.5">
            <FileCode className="w-4 h-4 text-[var(--color-accent)]" /> design.md File Standard (getdesign.md)
          </span>
          <Badge variant="secondary" className="font-mono text-[10px]">
            currentdesigntheme.md
          </Badge>
        </div>

        <div className="flex gap-2 pt-1">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setExportModalOpen(true)}
            className="flex-1 justify-center"
          >
            <FileCode className="w-3.5 h-3.5 mr-1.5" /> View / Export design.md
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setImportErrorMessage(null);
              setImportModalOpen(true);
            }}
            className="flex-1 justify-center"
          >
            <Upload className="w-3.5 h-3.5 mr-1.5" /> Import design.md
          </Button>
        </div>
      </div>

      {/* Accessibility Contrast Ratio Feedback */}
      <div
        className={`flex items-center gap-3 p-3 rounded-sm border text-xs ${
          isContrastValid
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            : 'bg-amber-500/10 border-amber-500/40 text-amber-300'
        }`}
      >
        {isContrastValid ? (
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
        ) : (
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
        )}
        <div>
          <p className="font-semibold">
            WCAG 2.1 AA Contrast Ratio: {contrastRatio ? `${contrastRatio.toFixed(2)}:1` : 'N/A'}
          </p>
          <p className="text-[11px] opacity-80">
            {isContrastValid
              ? 'Passes WCAG AA (≥ 4.5:1 text-to-background contrast ratio).'
              : 'Warning: Low contrast between text and background.'}
          </p>
        </div>
      </div>

      {/* Computed Token Palette Display (Read Only) */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          Derived Token Swatches
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { label: 'Primary BG', key: 'primary_bg', val: currentTokens.primary_bg },
            { label: 'Secondary BG', key: 'secondary_bg', val: currentTokens.secondary_bg },
            { label: 'Surface Card', key: 'surface_card', val: currentTokens.surface_card },
            { label: 'Accent CTA', key: 'accent', val: currentTokens.accent },
            { label: 'Primary Text', key: 'text_primary', val: currentTokens.text_primary },
            { label: 'Secondary Text', key: 'text_secondary', val: currentTokens.text_secondary },
            { label: 'Muted Text', key: 'text_muted', val: currentTokens.text_muted },
            { label: 'Steel Slate', key: 'slate_steel', val: currentTokens.slate_steel },
          ].map(({ label, key, val }) => (
            <div
              key={key}
              className="flex flex-col gap-1 p-2 rounded-sm border border-[var(--border-subtle)] bg-[var(--color-surface)]"
            >
              <div
                className="w-full h-7 rounded-sm border border-slate-700/40 shadow-inner"
                style={{ backgroundColor: val }}
              />
              <span className="text-[10px] font-semibold text-[var(--color-text-primary)] truncate">{label}</span>
              <span className="text-[9px] font-mono text-[var(--color-text-muted)] truncate">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Save Custom Theme Modal Portal */}
      {saveModalOpen && (
        <ModalPortal>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="flex flex-col gap-4 max-w-md w-full p-6 rounded-sm bg-slate-900 border border-[var(--border-accent)] text-slate-100 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="text-lg font-serif font-bold flex items-center gap-2">
                  <Save className="w-5 h-5 text-[var(--color-accent)]" /> Save Custom Design System
                </h4>
                <button
                  onClick={() => setSaveModalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleSaveSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-300">Design System Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Neon Orange"
                    value={themeNameInput}
                    onChange={(e) => setThemeNameInput(e.target.value)}
                    autoFocus
                    className="w-full px-3 py-2 text-sm rounded-sm bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  />
                  <p className="text-[11px] text-slate-400">
                    File will be saved as <code className="text-emerald-400">neon-orange-[timestamp].md</code> under <code className="text-emerald-400">config/themes/</code>.
                  </p>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button size="sm" variant="ghost" type="button" onClick={() => setSaveModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" variant="primary" type="submit">
                    Save Preset
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </ModalPortal>
      )}

      {/* View / Export design.md Modal Portal */}
      {exportModalOpen && (
        <ModalPortal>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="flex flex-col gap-4 max-w-2xl w-full p-6 rounded-sm bg-slate-900 border border-[var(--border-accent)] text-slate-100 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="text-lg font-serif font-bold flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-[var(--color-accent)]" /> Export currentdesigntheme.md
                </h4>
                <button
                  onClick={() => setExportModalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <textarea
                readOnly
                value={exportCurrentDesignMD()}
                className="w-full h-72 p-3 text-xs font-mono rounded-sm bg-slate-950 border border-slate-800 text-emerald-400 focus:outline-none custom-scrollbar"
              />
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-400">Standard getdesign.md format</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={handleCopyMarkdown}>
                    <Copy className="w-3.5 h-3.5 mr-1" /> {copySuccess ? 'Copied!' : 'Copy Markdown'}
                  </Button>
                  <Button size="sm" variant="primary" onClick={handleDownloadMarkdown}>
                    <Download className="w-3.5 h-3.5 mr-1" /> Download .md
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}

      {/* Import design.md Modal Portal */}
      {importModalOpen && (
        <ModalPortal>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="flex flex-col gap-4 max-w-2xl w-full p-6 rounded-sm bg-slate-900 border border-[var(--border-accent)] text-slate-100 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="text-lg font-serif font-bold flex items-center gap-2">
                  <Upload className="w-5 h-5 text-[var(--color-accent)]" /> Import External design.md
                </h4>
                <button
                  onClick={() => setImportModalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-300">
                Paste raw Markdown content from any standard <code className="text-emerald-400">design.md</code> file (such as Binance or Airbnb design-md specs) to update the website design tokens.
              </p>
              <form onSubmit={handleImportSubmit} className="flex flex-col gap-4">
                <textarea
                  placeholder="Paste design.md content here..."
                  value={importMarkdownText}
                  onChange={(e) => setImportMarkdownText(e.target.value)}
                  required
                  className="w-full h-64 p-3 text-xs font-mono rounded-sm bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-emerald-500 custom-scrollbar"
                />
                {importErrorMessage && (
                  <div className="p-3 rounded-sm bg-rose-500/10 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Validation Error:</p>
                      <p className="text-[11px] opacity-90">{importErrorMessage}</p>
                    </div>
                  </div>
                )}
                <div className="flex justify-end gap-2 pt-1">
                  <Button size="sm" variant="ghost" type="button" onClick={() => setImportModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" variant="primary" type="submit">
                    Import & Apply Theme
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </ModalPortal>
      )}
    </Card>
  );
}
