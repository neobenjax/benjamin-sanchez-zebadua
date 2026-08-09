'use client';

import React from 'react';
import { ThemeTuner } from '@/components/ThemeTuner';
import { DesignCatalog } from '@/components/ui/DesignCatalog';
import { Badge } from '@/components/ui/Badge';
import { useTheme } from '@/context/ThemeContext';
import { ArrowLeft, Sliders } from 'lucide-react';
import Link from 'next/link';

export default function ThemePersonalizePage() {
  const { activeMode } = useTheme();

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

        {/* SECTION 1: Theme Tuner Engine & Live Color Tokens (Full Width) */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-accent)]">
            <Sliders className="w-4 h-4" /> Section 1: Color & Theme System Generator
          </div>
          <div className="w-full">
            <ThemeTuner />
          </div>
        </div>

        {/* SECTION 2: UI Component Catalog & Behavioral Specifications */}
        <DesignCatalog />
      </div>
    </main>
  );
}
