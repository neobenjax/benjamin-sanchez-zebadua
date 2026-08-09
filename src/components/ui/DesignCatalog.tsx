'use client';

import React from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Badge } from './Badge';
import { Select } from './Select';
import {
  Layers,
  Table as TableIcon,
  Type,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Sliders,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export function DesignCatalog() {
  return (
    <div className="flex flex-col gap-12 w-full">
      {/* Section 2 Title Header */}
      <div className="flex flex-col gap-3 border-b border-[var(--border-subtle)] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-accent)]">
          <Layers className="w-4 h-4" /> Section 2: Component Catalog & Behavioral Spec
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[var(--color-text-primary)]">
          Design System Specifications & UI Catalog
        </h2>
        <p className="text-base text-[var(--color-text-secondary)] max-w-3xl">
          Standardized UI component spec catalog adhering to Binance & Airbnb <code className="text-[var(--color-accent)]">design.md</code> design system standards. All elements dynamically react to the active token palette.
        </p>
      </div>

      {/* 1. BUTTON VARIANTS & BEHAVIORS */}
      <Card variant="solid" className="flex flex-col gap-6 p-6 md:p-8">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
          <div>
            <h3 className="text-2xl font-serif font-bold text-[var(--color-text-primary)] flex items-center gap-2">
              <Zap className="w-5 h-5 text-[var(--color-accent)]" /> Button System Specification
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              Interactive states, sizes, shapes, and color pairings across themes.
            </p>
          </div>
          <Badge variant="accent">UI Primitives</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Button Matrix Showcase */}
          <div className="flex flex-col gap-6">
            {/* Primary & Active */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase font-semibold text-[var(--color-text-muted)]">
                Primary & Active Pulse
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="md">
                  Primary Action
                </Button>
                <Button variant="primary" size="md" className="ring-2 ring-[var(--color-accent)] ring-offset-2 ring-offset-slate-950">
                  Primary Active State
                </Button>
                <Button variant="primary" size="sm">
                  Primary Sm
                </Button>
              </div>
            </div>

            {/* Secondary Dark & Secondary Light */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase font-semibold text-[var(--color-text-muted)]">
                Secondary (Dark vs Light Context)
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <div className="p-3 rounded-sm bg-slate-950 border border-slate-800 flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-mono">Dark:</span>
                  <Button variant="secondary" size="sm">
                    Secondary Dark
                  </Button>
                </div>
                <div className="p-3 rounded-sm bg-slate-100 border border-slate-300 flex items-center gap-2">
                  <span className="text-[10px] text-slate-600 font-mono">Light:</span>
                  <Button variant="outline" size="sm" className="text-slate-900 border-slate-300 hover:bg-slate-200">
                    Secondary Light
                  </Button>
                </div>
              </div>
            </div>

            {/* Pill & Special Actions */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase font-semibold text-[var(--color-text-muted)]">
                Pill CTA & Disabled State
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="accent" size="md" className="rounded-full px-6">
                  Pill Accent CTA <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
                <button
                  disabled
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed opacity-50"
                >
                  Disabled Action
                </button>
              </div>
            </div>

            {/* Text & Ghost Buttons */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase font-semibold text-[var(--color-text-muted)]">
                Text Button & Ghost Actions
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="ghost" size="sm" className="hover:text-[var(--color-accent)]">
                  Text Action <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </Button>
                <Button variant="outline" size="sm">
                  Outline Filter
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Technical Spec Description */}
          <div className="p-5 rounded-sm bg-slate-900/50 border border-[var(--border-subtle)] flex flex-col gap-3 text-xs">
            <h4 className="font-mono font-bold text-[var(--color-text-primary)] uppercase tracking-wider">
              Button Behavioral Rules
            </h4>
            <ul className="list-disc pl-4 space-y-2 text-[var(--color-text-secondary)]">
              <li>
                <strong className="text-[var(--color-text-primary)]">Primary CTA:</strong> Uses <code className="text-[var(--color-accent)]">var(--color-accent)</code> background with high-contrast text. Reserved for single primary user intent per section.
              </li>
              <li>
                <strong className="text-[var(--color-text-primary)]">Secondary Buttons:</strong> Adapted to section background using subtle borders (<code className="text-[var(--color-accent)]">var(--border-subtle)</code>).
              </li>
              <li>
                <strong className="text-[var(--color-text-primary)]">Pill Buttons:</strong> Applied to floating navigation elements, filter badges, and quick CTA highlights.
              </li>
              <li>
                <strong className="text-[var(--color-text-primary)]">Disabled State:</strong> Enforces <code className="text-[var(--color-accent)]">opacity-50 pointer-events-none</code> with clean gray backdrop.
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* 2. TYPOGRAPHY & TEXT DISPLAY SCALE */}
      <Card variant="glass" className="flex flex-col gap-6 p-6 md:p-8">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
          <div>
            <h3 className="text-2xl font-serif font-bold text-[var(--color-text-primary)] flex items-center gap-2">
              <Type className="w-5 h-5 text-[var(--color-accent)]" /> Typography & Display Hierarchy
            </h3>
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
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-text-primary)] leading-tight">
                Architectural Resilience & Quantitative Engineering
              </h1>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">Section H2 (Serif 32px / 2rem)</span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)]">
                Algorithmic Execution & Vault Security Models
              </h2>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">Subhead H3 (Serif 24px / 1.5rem)</span>
              <h3 className="text-xl font-serif font-bold text-[var(--color-text-primary)]">
                Distributed Consensus & High-Frequency Microservices
              </h3>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">Card Title H4 (Serif 18px / 1.125rem)</span>
              <h4 className="text-lg font-serif font-bold text-[var(--color-text-primary)]">
                Institutional Liquidity Engine
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[var(--border-subtle)]">
              <div>
                <span className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">Body Copy (Body-md 14px)</span>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mt-1">
                  Engineered with zero latency overhead, complete unit test coverage, and strict design system adherence. Providing institutional grade financial UI frameworks.
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">Small Body & Caption (Body-sm / Caption 12px)</span>
                <p className="text-xs text-[var(--color-text-muted)] leading-normal mt-1">
                  Metadata tags, timestamps, and captions use <code className="text-[var(--color-accent)]">var(--color-text-muted)</code> for sub-tier visual priority.
                </p>
                <a href="#link" className="text-xs font-semibold text-[var(--color-accent)] hover:underline inline-flex items-center gap-1 mt-2">
                  Inline link anchor state <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 p-5 rounded-sm bg-slate-900/50 border border-[var(--border-subtle)] flex flex-col gap-3 text-xs">
            <h4 className="font-mono font-bold text-[var(--color-text-primary)] uppercase tracking-wider">
              Font Specification
            </h4>
            <div className="space-y-3 text-[var(--color-text-secondary)]">
              <div className="p-2.5 rounded-sm bg-slate-950 border border-slate-800">
                <span className="font-mono font-bold text-[var(--color-accent)]">Headings:</span> Playfair Display (Serif)
                <p className="text-[11px] text-slate-400 mt-0.5">Used for H1, H2, H3, H4 display titles.</p>
              </div>
              <div className="p-2.5 rounded-sm bg-slate-950 border border-slate-800">
                <span className="font-mono font-bold text-[var(--color-accent)]">Body & UI:</span> Inter (Sans-Serif)
                <p className="text-[11px] text-slate-400 mt-0.5">Used for paragraph text, buttons, and form labels.</p>
              </div>
              <div className="p-2.5 rounded-sm bg-slate-950 border border-slate-800">
                <span className="font-mono font-bold text-[var(--color-accent)]">Numbers & Code:</span> JetBrains / Fira Code
                <p className="text-[11px] text-slate-400 mt-0.5">Used for financial data, percentages, and tokens.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 3. NUMERIC DATA & TRADING METRICS */}
      <Card variant="solid" className="flex flex-col gap-6 p-6 md:p-8">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
          <div>
            <h3 className="text-2xl font-serif font-bold text-[var(--color-text-primary)] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[var(--color-accent)]" /> Quantitative Financial Metrics & Indicators
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              Binance-inspired data display with positive (+%) green and negative (-%) red indicators.
            </p>
          </div>
          <Badge variant="pulse">FinTech Metrics</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Positive growth */}
          <div className="flex flex-col gap-2 p-4 rounded-sm bg-slate-900/60 border border-[var(--border-subtle)]">
            <span className="text-xs font-mono uppercase text-[var(--color-text-muted)]">Portfolio Value</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-mono font-bold text-[var(--color-text-primary)]">$2,845,910.42</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono font-bold text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2 py-0.5 rounded-sm w-fit">
              <ArrowUpRight className="w-3.5 h-3.5" /> +14.82% (24h)
            </div>
          </div>

          {/* Card 2: Negative indicator */}
          <div className="flex flex-col gap-2 p-4 rounded-sm bg-slate-900/60 border border-[var(--border-subtle)]">
            <span className="text-xs font-mono uppercase text-[var(--color-text-muted)]">Volatility Index (VIX)</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-mono font-bold text-[var(--color-text-primary)]">14.28 pts</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-sm w-fit">
              <ArrowDownRight className="w-3.5 h-3.5" /> -3.15% (24h)
            </div>
          </div>

          {/* Card 3: System Latency */}
          <div className="flex flex-col gap-2 p-4 rounded-sm bg-slate-900/60 border border-[var(--border-subtle)]">
            <span className="text-xs font-mono uppercase text-[var(--color-text-muted)]">API Latency p99</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-mono font-bold text-[var(--color-text-primary)]">1.24 ms</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono font-semibold text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2 py-0.5 rounded-sm w-fit">
              <CheckCircle2 className="w-3.5 h-3.5" /> Optimal
            </div>
          </div>

          {/* Card 4: Neutral metric */}
          <div className="flex flex-col gap-2 p-4 rounded-sm bg-slate-900/60 border border-[var(--border-subtle)]">
            <span className="text-xs font-mono uppercase text-[var(--color-text-muted)]">Active Node Clusters</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-mono font-bold text-[var(--color-text-primary)]">32 / 32</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono font-semibold text-[var(--color-text-secondary)] bg-slate-800/80 px-2 py-0.5 rounded-sm w-fit">
              100% Operational
            </div>
          </div>
        </div>
      </Card>

      {/* 4. DATA TABLES SPECIFICATION */}
      <Card variant="glass" className="flex flex-col gap-6 p-6 md:p-8">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
          <div>
            <h3 className="text-2xl font-serif font-bold text-[var(--color-text-primary)] flex items-center gap-2">
              <TableIcon className="w-5 h-5 text-[var(--color-accent)]" /> Data Table Specification
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              Sticky header, hover row highlights, status badges, and financial column alignment.
            </p>
          </div>
          <Badge variant="secondary">Table Grid</Badge>
        </div>

        <div className="overflow-x-auto border border-[var(--border-subtle)] rounded-sm bg-[var(--color-surface)]">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 uppercase font-mono text-[var(--color-text-muted)] border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-3.5 font-semibold">Asset Pair</th>
                <th className="p-3.5 font-semibold">Execution Engine</th>
                <th className="p-3.5 font-semibold">24h Volume</th>
                <th className="p-3.5 font-semibold text-right">Last Price</th>
                <th className="p-3.5 font-semibold text-right">24h Change</th>
                <th className="p-3.5 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--color-text-secondary)]">
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="p-3.5 font-mono font-bold text-[var(--color-text-primary)]">BTC / USDT</td>
                <td className="p-3.5 font-sans">Matching Engine v4</td>
                <td className="p-3.5 font-mono">$1,420,890,120</td>
                <td className="p-3.5 font-mono text-right font-bold text-[var(--color-text-primary)]">$94,250.00</td>
                <td className="p-3.5 font-mono text-right font-bold text-[var(--color-accent)]">+5.42%</td>
                <td className="p-3.5 text-center">
                  <Badge variant="accent" className="text-[10px]">Active</Badge>
                </td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="p-3.5 font-mono font-bold text-[var(--color-text-primary)]">ETH / USDT</td>
                <td className="p-3.5 font-sans">Matching Engine v4</td>
                <td className="p-3.5 font-mono">$845,120,500</td>
                <td className="p-3.5 font-mono text-right font-bold text-[var(--color-text-primary)]">$3,420.50</td>
                <td className="p-3.5 font-mono text-right font-bold text-[var(--color-accent)]">+3.18%</td>
                <td className="p-3.5 text-center">
                  <Badge variant="accent" className="text-[10px]">Active</Badge>
                </td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="p-3.5 font-mono font-bold text-[var(--color-text-primary)]">SOL / USDT</td>
                <td className="p-3.5 font-sans">Matching Engine v3</td>
                <td className="p-3.5 font-mono">$312,450,000</td>
                <td className="p-3.5 font-mono text-right font-bold text-[var(--color-text-primary)]">$188.40</td>
                <td className="p-3.5 font-mono text-right font-bold text-rose-400">-1.75%</td>
                <td className="p-3.5 text-center">
                  <Badge variant="secondary" className="text-[10px]">Maintenance</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* 5. FORM CONTROLS & CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Controls */}
        <Card variant="solid" className="flex flex-col gap-6 p-6">
          <h3 className="text-xl font-serif font-bold text-[var(--color-text-primary)] flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[var(--color-accent)]" /> Form Controls & Inputs
          </h3>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[var(--color-text-primary)]">
                Select Strategy Classification
              </label>
              <Select
                options={[
                  { value: 'quant', label: 'Quantitative HFT Arbitrage' },
                  { value: 'vault', label: 'Vault Multi-Sig Security' },
                  { value: 'infra', label: 'Cloud Infrastructure' },
                ]}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[var(--color-text-primary)]">
                API Endpoint Domain URL
              </label>
              <input
                type="text"
                defaultValue="https://api.portfolio.dev/v1/health"
                aria-label="API Endpoint Domain URL"
                className="w-full px-3 py-2 text-xs font-mono rounded-sm bg-slate-950 border border-[var(--border-subtle)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
              />
            </div>
          </div>
        </Card>

        {/* Surface Cards */}
        <Card variant="glass" className="flex flex-col gap-6 p-6">
          <h3 className="text-xl font-serif font-bold text-[var(--color-text-primary)] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[var(--color-accent)]" /> Surface Card Containers
          </h3>

          <div className="flex flex-col gap-3">
            <Card variant="outline" className="p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-[var(--color-accent)]">Container: Glassmorphism</span>
                <Badge variant="pulse">Active</Badge>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Uses backdrop blur filters and <code className="text-[var(--color-accent)]">var(--border-subtle)</code> borders for translucent overlay elevation.
              </p>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
}
