'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme, ThemePreset } from '@/context/ThemeContext';
import { calculateContrast, AccessibilityReport } from '@/lib/colorEngine';
import { validateDesignSystemMarkdown } from '@/lib/designSystemMd';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Select } from './ui/Select';
import { ThemeDocumentationViewer } from './ThemeDocumentationViewer';
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
  ShieldAlert,
  Type,
  ExternalLink,
} from 'lucide-react';

const THEME_CLI_LINES = [
  '$ agy theme --inspect',
  '> Gemini: Analyzing active HSL color engine and root CSS custom properties...',
  '$ agy contrast --verify-wcag',
  '> Gemini: Calculating contrast ratio: 5.42:1 (Passes WCAG AA for normal & bold text).',
  '$ agy tokens --export-design-md',
  '> Gemini: Transpiling tokens to standard getdesign.md specification...',
  '$ agy sync --live-broadcast',
  '> Gemini: Real-time localStorage broadcast active across open browser tabs!',
];

export function ThemeTuner() {
  const {
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
  } = useTheme();

  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [themeNameInput, setThemeNameInput] = useState('');
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [importMarkdownText, setImportMarkdownText] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [importErrorMessage, setImportErrorMessage] = useState<string | null>(null);

  // WCAG Import Accessibility Warning Modal state
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [pendingPreset, setPendingPreset] = useState<ThemePreset | null>(null);
  const [pendingReport, setPendingReport] = useState<AccessibilityReport | null>(null);

  // Native HTML <dialog> Refs
  const saveDialogRef = useRef<HTMLDialogElement>(null);
  const exportDialogRef = useRef<HTMLDialogElement>(null);
  const importDialogRef = useRef<HTMLDialogElement>(null);
  const warningDialogRef = useRef<HTMLDialogElement>(null);

  const isAnyModalOpen = saveModalOpen || exportModalOpen || importModalOpen || warningModalOpen;

  useEffect(() => {
    const mainEl = document.getElementById('main-content');
    if (mainEl) {
      if (isAnyModalOpen) {
        mainEl.setAttribute('inert', '');
      } else {
        mainEl.removeAttribute('inert');
      }
    }
  }, [isAnyModalOpen]);

  useEffect(() => {
    if (saveModalOpen) saveDialogRef.current?.showModal?.();
    else saveDialogRef.current?.close?.();
  }, [saveModalOpen]);

  useEffect(() => {
    if (exportModalOpen) exportDialogRef.current?.showModal?.();
    else exportDialogRef.current?.close?.();
  }, [exportModalOpen]);

  useEffect(() => {
    if (importModalOpen) importDialogRef.current?.showModal?.();
    else importDialogRef.current?.close?.();
  }, [importModalOpen]);

  useEffect(() => {
    if (warningModalOpen) warningDialogRef.current?.showModal?.();
    else warningDialogRef.current?.close?.();
  }, [warningModalOpen]);

  const currentTokens = tokens;
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
      const { preset, report } = importDesignMD(importMarkdownText);

      if (report.hasViolations) {
        setPendingPreset(preset);
        setPendingReport(report);
        setImportModalOpen(false);
        setWarningModalOpen(true);
      } else {
        applyPreset(preset);
        setImportMarkdownText('');
        setImportModalOpen(false);
      }
    } catch (err) {
      setImportErrorMessage((err as Error).message || 'Failed to import design.md specification.');
    }
  };

  const confirmImportWithWarnings = () => {
    if (pendingPreset) {
      applyPreset(pendingPreset);
    }
    setWarningModalOpen(false);
    setPendingPreset(null);
    setPendingReport(null);
    setImportMarkdownText('');
  };

  const cancelImportWithWarnings = () => {
    setWarningModalOpen(false);
    setPendingPreset(null);
    setPendingReport(null);
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
    <Card className="flex flex-col gap-6 w-full max-w-none">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[var(--color-accent)]" /> Theme & Color Engine
          </h3>
          <div className="flex items-center gap-2">
            {isDraft && <Badge variant="secondary" className="text-amber-400 border-amber-500/30">Unsaved Draft</Badge>}
            <Badge variant="pulse">Design System v1.0</Badge>
          </div>
        </div>
      </div>

      {/* Primary Seed Color Picker & Randomizer */}
      <div className="flex flex-col gap-3 p-4 rounded-sm bg-[var(--color-secondary-bg)] border border-[var(--border-subtle)]">
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
              className="w-9 h-9 rounded-sm border border-[var(--border-subtle)] bg-transparent cursor-pointer"
            />
            <input
              type="text"
              value={primarySeedColor}
              aria-label="Primary seed hex input"
              onChange={(e) => setPrimarySeedColor(e.target.value)}
              className="w-28 px-2.5 py-1.5 text-xs font-mono rounded-sm bg-[var(--color-surface)] border border-[var(--border-subtle)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
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

        <Select
          aria-label="Select design system theme"
          value={activePresetId}
          onChange={(e) => {
            const chosen = savedPresets.find((p) => p.id === e.target.value);
            if (chosen) applyPreset(chosen);
          }}
          options={[
            ...savedPresets.map((preset) => ({
              value: preset.id,
              label: preset.name,
            })),
            ...(isDraft && !savedPresets.some((p) => p.id === activePresetId)
              ? [{ value: activePresetId, label: 'Unsaved Draft Theme' }]
              : []),
          ]}
        />

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
      <div className="flex flex-col gap-2.5 p-3.5 rounded-sm bg-[var(--color-secondary-bg)] border border-[var(--border-subtle)]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-primary)] flex items-center gap-1.5">
            <FileCode className="w-4 h-4 text-[var(--color-accent)]" /> design.md File Standard (getdesign.md)
          </span>
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
            ? 'bg-[var(--color-accent)]/10 border-[var(--border-accent)] text-[var(--color-accent)]'
            : 'bg-amber-500/10 border-amber-500/40 text-amber-300'
        }`}
      >
        {isContrastValid ? (
          <Check className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
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

      {/* Computed Token Palette Display (Read Only Swatches) */}
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

      {/* Live Design System Documentation Section */}
      <ThemeDocumentationViewer
        markdownText={exportCurrentDesignMD()}
        themeName={selectedPreset?.name || 'Active Design Theme'}
      />

      {/* Typography & Display Hierarchy */}
      <div className="flex flex-col gap-6 p-5 rounded-sm bg-[var(--color-secondary-bg)] border border-[var(--border-subtle)]">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <div>
            <h4 className="text-base font-serif font-bold text-[var(--color-text-primary)] flex items-center gap-2">
              <Type className="w-5 h-5 text-[var(--color-accent)]" /> Typography & Display Hierarchy
            </h4>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              Playfair Display (Serif Headings), Inter (Sans Body), and JetBrains Mono (Code/Numbers).
            </p>
          </div>
          <Badge variant="secondary">Inter & Playfair</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div>
              <span className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">Display H1 (Serif 48px / 3rem)</span>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-text-primary)] leading-tight">
                Architectural Resilience & Quantitative Engineering
              </h1>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">Section H2 (Serif 32px / 2rem)</span>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-[var(--color-text-primary)]">
                Algorithmic Execution & Vault Security Models
              </h2>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">Subhead H3 (Serif 24px / 1.5rem)</span>
              <h3 className="text-lg font-serif font-bold text-[var(--color-text-primary)]">
                Distributed Consensus & High-Frequency Microservices
              </h3>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">Card Title H4 (Serif 18px / 1.125rem)</span>
              <h4 className="text-base font-serif font-bold text-[var(--color-text-primary)]">
                Institutional Liquidity Engine
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[var(--border-subtle)]">
              <div>
                <span className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">Body Copy (Body-md 14px)</span>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mt-1">
                  Engineered with zero latency overhead, complete unit test coverage, and strict design system adherence. Providing institutional grade financial UI frameworks.
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">Small Body & Caption (Body-sm / Caption 12px)</span>
                <p className="text-[11px] text-[var(--color-text-muted)] leading-normal mt-1">
                  Metadata tags, timestamps, and captions use <code className="text-[var(--color-accent)]">var(--color-text-muted)</code> for sub-tier visual priority.
                </p>
                <a href="#link" className="text-xs font-semibold text-[var(--color-accent)] hover:underline inline-flex items-center gap-1 mt-2">
                  Inline link anchor state <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 p-4 rounded-sm bg-[var(--color-surface)] border border-[var(--border-subtle)] flex flex-col gap-3 text-xs">
            <h4 className="font-mono font-bold text-[var(--color-text-primary)] uppercase tracking-wider">
              Font Specification
            </h4>
            <div className="space-y-2.5 text-[var(--color-text-secondary)]">
              <div className="p-2 rounded-sm bg-[var(--color-secondary-bg)] border border-[var(--border-subtle)]">
                <span className="font-mono font-bold text-[var(--color-accent)]">Headings:</span> Playfair Display (Serif)
                <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">Used for H1, H2, H3, H4 display titles.</p>
              </div>
              <div className="p-2 rounded-sm bg-[var(--color-secondary-bg)] border border-[var(--border-subtle)]">
                <span className="font-mono font-bold text-[var(--color-accent)]">Body & UI:</span> Inter (Sans-Serif)
                <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">Used for paragraph text, buttons, and form labels.</p>
              </div>
              <div className="p-2 rounded-sm bg-[var(--color-secondary-bg)] border border-[var(--border-subtle)]">
                <span className="font-mono font-bold text-[var(--color-accent)]">Numbers & Code:</span> JetBrains / Fira Code
                <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">Used for financial data, percentages, and tokens.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Custom Theme Native Dialog */}
      <dialog
        ref={saveDialogRef}
        onCancel={() => setSaveModalOpen(false)}
        onClick={(e) => e.target === saveDialogRef.current && setSaveModalOpen(false)}
        className="fixed inset-0 m-auto z-50 max-w-md w-full p-6 rounded-sm bg-slate-900 border border-[var(--border-accent)] text-slate-100 shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-lg font-bold flex items-center gap-2">
              <Save className="w-5 h-5 text-[var(--color-accent)]" /> Save Custom Design System
            </h4>
            <button
              aria-label="Close save modal"
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
                className="w-full px-3 py-2 text-sm rounded-sm bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[var(--color-accent)]"
              />
              <p className="text-[11px] text-slate-400">
                File will be saved as <code className="text-[var(--color-accent)]">neon-orange-[timestamp].md</code> under <code className="text-[var(--color-accent)]">config/themes/</code>.
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
      </dialog>

      {/* View / Export design.md Native Dialog */}
      <dialog
        ref={exportDialogRef}
        onCancel={() => setExportModalOpen(false)}
        onClick={(e) => e.target === exportDialogRef.current && setExportModalOpen(false)}
        className="fixed inset-0 m-auto z-50 max-w-2xl w-full p-6 rounded-sm bg-slate-900 border border-[var(--border-accent)] text-slate-100 shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-lg font-bold flex items-center gap-2">
              <FileCode className="w-5 h-5 text-[var(--color-accent)]" /> Export currentdesigntheme.md
            </h4>
            <button
              aria-label="Close export modal"
              onClick={() => setExportModalOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <textarea
            readOnly
            value={exportCurrentDesignMD()}
            className="w-full h-72 p-3 text-xs font-mono rounded-sm bg-slate-950 border border-slate-800 text-[var(--color-accent)] focus:outline-none custom-scrollbar"
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
      </dialog>

      {/* Import design.md Native Dialog */}
      <dialog
        ref={importDialogRef}
        onCancel={() => setImportModalOpen(false)}
        onClick={(e) => e.target === importDialogRef.current && setImportModalOpen(false)}
        className="fixed inset-0 m-auto z-50 max-w-2xl w-full p-6 rounded-sm bg-slate-900 border border-[var(--border-accent)] text-slate-100 shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-lg font-bold flex items-center gap-2">
              <Upload className="w-5 h-5 text-[var(--color-accent)]" /> Import External design.md
            </h4>
            <button
              aria-label="Close import modal"
              onClick={() => setImportModalOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-300">
            Paste raw Markdown content from any standard <code className="text-[var(--color-accent)]">design.md</code> file (such as Binance or Airbnb design-md specs) to update the website design tokens.
          </p>
          <form onSubmit={handleImportSubmit} className="flex flex-col gap-4">
            <textarea
              placeholder="Paste design.md content here..."
              value={importMarkdownText}
              onChange={(e) => setImportMarkdownText(e.target.value)}
              required
              className="w-full h-64 p-3 text-xs font-mono rounded-sm bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-[var(--color-accent)] custom-scrollbar"
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
      </dialog>

      {/* WCAG Accessibility Warning Native Dialog */}
      <dialog
        ref={warningDialogRef}
        onCancel={cancelImportWithWarnings}
        onClick={(e) => e.target === warningDialogRef.current && cancelImportWithWarnings()}
        className="fixed inset-0 m-auto z-50 max-w-lg w-full p-6 rounded-sm bg-slate-900 border border-amber-500/50 text-slate-100 shadow-2xl backdrop:bg-black/85 backdrop:backdrop-blur-md"
      >
        {pendingReport && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
              <h4 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" /> WCAG AA Accessibility Warning
              </h4>
              <button
                aria-label="Close warning modal"
                onClick={cancelImportWithWarnings}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              The imported theme <strong className="text-amber-300">{pendingPreset?.name}</strong> contains severe contrast issues that violate WCAG 2.1 AA guidelines:
            </p>

            <div className="flex flex-col gap-2 p-3 rounded-sm bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-200">
              {pendingReport.violations.map((v, i) => (
                <p key={i} className="flex items-start gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" /> {v}
                </p>
              ))}
            </div>

            <p className="text-[11px] text-slate-400">
              Would you like to proceed anyway, or cancel and keep your current active theme?
            </p>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <Button size="sm" variant="ghost" type="button" onClick={cancelImportWithWarnings}>
                Cancel & Keep Previous Theme
              </Button>
              <Button size="sm" variant="secondary" className="bg-amber-500/20 text-amber-300 hover:bg-amber-500/30" onClick={confirmImportWithWarnings}>
                Proceed Anyway
              </Button>
            </div>
          </div>
        )}
      </dialog>
    </Card>
  );
}
