'use client';

import React from 'react';
import { ThemeTuner } from '@/components/ThemeTuner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { useTheme } from '@/context/ThemeContext';
import { ArrowLeft, Sparkles, Layers, Palette, Terminal, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ThemePersonalizePage() {
  const { activeMode, tuningMode, darkTokens, lightTokens } = useTheme();
  const currentTokens = tuningMode === 'dark' ? darkTokens : lightTokens;

  return (
    <main className="min-h-screen bg-[var(--color-primary)] text-[var(--color-text-primary)] transition-colors duration-300 py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Main Portfolio
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant="pulse">Interactive Design System Viewer</Badge>
            <Badge variant="secondary">Mode: {activeMode.toUpperCase()}</Badge>
          </div>
        </div>

        {/* Page Header */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-[var(--color-text-primary)]">
            Design System Viewer & Theme Personalizer
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl">
            Tuning tokens in this view broadcasts real-time CSS variable updates across all open portfolio tabs without reloading. Adjust colors, test WCAG contrast compliance, and switch between Light and Dark mode presets.
          </p>
        </div>

        {/* Core Layout: Tuner + Live Preview Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Theme Tuner Engine */}
          <div className="lg:col-span-6 flex justify-center">
            <ThemeTuner />
          </div>

          {/* Right Column: Live Design Token Preview */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            {/* Color Swatch Display */}
            <Card variant="glass" className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <h3 className="text-xl font-serif font-bold flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[var(--color-accent)]" /> Active Token Palette
                </h3>
                <span className="text-xs uppercase font-mono text-[var(--color-text-muted)]">
                  {tuningMode} Mode
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Primary BG', color: currentTokens.primary_bg },
                  { label: 'Secondary BG', color: currentTokens.secondary_bg },
                  { label: 'Surface Card', color: currentTokens.surface_card },
                  { label: 'Accent', color: currentTokens.accent },
                  { label: 'Primary Text', color: currentTokens.text_primary },
                  { label: 'Secondary Text', color: currentTokens.text_secondary },
                  { label: 'Muted Text', color: currentTokens.text_muted },
                  { label: 'Steel Slate', color: currentTokens.slate_steel },
                ].map(({ label, color }) => (
                  <div
                    key={label}
                    className="flex flex-col gap-1.5 p-2.5 rounded-sm border border-[var(--border-subtle)] bg-[var(--color-surface)]"
                  >
                    <div
                      className="w-full h-10 rounded-sm border border-slate-700/50 shadow-inner"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-[11px] font-semibold text-[var(--color-text-primary)] truncate">{label}</span>
                    <span className="text-[10px] font-mono text-[var(--color-text-muted)]">{color}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Shared UI Components Showcase */}
            <Card variant="solid" className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <h3 className="text-xl font-serif font-bold flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[var(--color-accent)]" /> Shared Component Primitives
                </h3>
                <span className="text-xs text-[var(--color-text-muted)]">src/components/ui/</span>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Button Variants</span>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary CTA</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Badges & Status Indicators</span>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="accent">Accent Growth</Badge>
                  <Badge variant="pulse">Active Status</Badge>
                  <Badge variant="secondary" className="font-mono">FINTECH-ARCH-v1</Badge>
                </div>
              </div>

              {/* Dropdown Select */}
              <div className="flex flex-col gap-2">
                <Select
                  label="Sample Dynamic Select"
                  options={[
                    { value: 'all', label: 'All Technical Insights' },
                    { value: 'fintech', label: 'Quantitative Finance' },
                    { value: 'architecture', label: 'System Architecture' },
                  ]}
                />
              </div>

              {/* Card Sample */}
              <Card variant="outline" className="flex flex-col gap-2 p-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
                  <ShieldCheck className="w-4 h-4" /> FinTech Security Architecture
                </div>
                <h4 className="text-lg font-serif font-bold">Resilient Microservices & Vault Security</h4>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  Demonstrating live style synchronization across nested card containers, typography levels, and borders.
                </p>
              </Card>
            </Card>

            {/* Typography Scale Preview */}
            <Card variant="glass" className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <h3 className="text-xl font-serif font-bold flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-[var(--color-accent)]" /> Shared Typography Hierarchy
                </h3>
                <span className="text-xs text-[var(--color-text-muted)]">Playfair Display & Inter</span>
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <span className="text-[10px] uppercase font-mono text-[var(--color-text-muted)]">Display H1 (Playfair Display)</span>
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--color-text-primary)]">
                    FinTech Architect Strategy
                  </h1>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[var(--color-text-muted)]">Section H2 (Playfair Display)</span>
                  <h2 className="text-2xl font-serif font-bold text-[var(--color-text-primary)]">
                    Quantitative Engineering
                  </h2>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[var(--color-text-muted)]">Body Copy (Inter Sans)</span>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    High-reliability software systems powering institutional financial growth and real-time execution.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
