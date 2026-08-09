'use client';

import React from 'react';
import { ThemeTuner } from '@/components/ThemeTuner';
import { DesignCatalog } from '@/components/ui/DesignCatalog';
import { FooterFragment } from '@/components/fragments/FragmentRenderer';
import Footer from '@/components/Footer';
import { Sliders } from 'lucide-react';

export default function ThemePersonalizePage() {
  return (
    <div className="min-h-screen bg-[var(--color-primary)] text-[var(--color-text-primary)] transition-colors duration-300 flex flex-col justify-between">
      <main className="pt-28 pb-16 md:pt-32 px-6 lg:px-12 flex-grow">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          {/* Page Header */}
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-text-primary)]">
              Design System Engine
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

      {/* Agnostic Fragment Transpiler Engine Footer */}
      <FooterFragment fallback={<Footer />} />
    </div>
  );
}
