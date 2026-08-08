'use client';

import React from 'react';
import { ThemeTuner } from '@/components/ThemeTuner';
import { DesignCatalog } from '@/components/ui/DesignCatalog';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/context/ThemeContext';
import { ArrowLeft, Palette, Sliders, Layers } from 'lucide-react';
import Link from 'next/link';

export default function ThemePersonalizePage() {
  const { activeMode, tuningMode, darkTokens, lightTokens } = useTheme();
  const currentTokens = tuningMode === 'dark' ? darkTokens : lightTokens;

  return (
    <main className="min-h-screen bg-[var(--color-primary)] text-[var(--color-text-primary)] transition-colors duration-300 py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Main Portfolio
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant="pulse">Design System Engine</Badge>
            <Badge variant="secondary">Mode: {activeMode.toUpperCase()}</Badge>
          </div>
        </div>

        {/* Page Header */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-[var(--color-text-primary)]">
            Design System Viewer & Theme Tuner
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-4xl">
            Configure primary brand seeds, generate accessible WCAG 2.1 AA token systems (inspired by HueCodex & RandomA11y), manage saved design systems, and export standard <code className="text-[var(--color-accent)] font-mono">design.md</code> specifications. Live updates broadcast real-time CSS variable changes across all open browser tabs.
          </p>
        </div>

        {/* SECTION 1: Theme Tuner Engine & Live Color Tokens */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-accent)]">
            <Sliders className="w-4 h-4" /> Section 1: Color & Theme System Generator
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Theme Tuner Control Panel */}
            <div className="lg:col-span-7 flex justify-center">
              <ThemeTuner />
            </div>

            {/* Right Column: Active Token Palette Summary Card */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <Card variant="glass" className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                  <h3 className="text-xl font-serif font-bold flex items-center gap-2">
                    <Palette className="w-5 h-5 text-[var(--color-accent)]" /> Active Token System
                  </h3>
                  <span className="text-xs uppercase font-mono text-[var(--color-text-muted)]">
                    {tuningMode} Mode
                  </span>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  Tokens are derived automatically from the primary seed color to guarantee high accessibility contrast.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {[
                    { label: 'Primary BG', color: currentTokens.primary_bg, role: 'Main backdrop' },
                    { label: 'Secondary BG', color: currentTokens.secondary_bg, role: 'Section backdrop' },
                    { label: 'Surface Card', color: currentTokens.surface_card, role: 'Card containers' },
                    { label: 'Accent CTA', color: currentTokens.accent, role: 'Primary buttons & badges' },
                    { label: 'Primary Text', color: currentTokens.text_primary, role: 'Headings & body' },
                    { label: 'Secondary Text', color: currentTokens.text_secondary, role: 'Subtitles & labels' },
                    { label: 'Muted Text', color: currentTokens.text_muted, role: 'Captions & hints' },
                    { label: 'Steel Slate', color: currentTokens.slate_steel, role: 'Secondary borders' },
                  ].map(({ label, color, role }) => (
                    <div
                      key={label}
                      className="flex flex-col gap-1.5 p-3 rounded-sm border border-[var(--border-subtle)] bg-[var(--color-surface)]"
                    >
                      <div
                        className="w-full h-8 rounded-sm border border-slate-700/50 shadow-inner"
                        style={{ backgroundColor: color }}
                      />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-semibold text-[var(--color-text-primary)] truncate">{label}</span>
                        <span className="text-[10px] font-mono text-[var(--color-text-muted)]">{color}</span>
                        <span className="text-[9px] text-[var(--color-text-secondary)] truncate opacity-80">{role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* SECTION 2: UI Component Catalog & Behavioral Specifications */}
        <DesignCatalog />
      </div>
    </main>
  );
}
