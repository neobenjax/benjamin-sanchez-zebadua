"use client";

import { useState } from "react";
import { Code2, TrendingUp, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import Link from "next/link";

export default function SplitHero() {
  const [activeSide, setActiveSide] = useState<"left" | "right" | "none">("none");

  return (
    <section className="relative min-h-[85vh] pt-24 pb-16 flex flex-col justify-center overflow-hidden border-b border-white/10 bg-primary text-foreground">
      {/* BACKGROUND DECORATIVE GRID */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        
        {/* TOP INTRO TITLE */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-accent/10 border border-accent/20 text-accent text-xs font-semibold tracking-wider uppercase mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Dual-Core FinTech Discipline</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
            Benjamin Sanchez Zebadua
          </h1>
          <p className="mt-4 text-lg text-gray-300 font-sans font-normal max-w-2xl mx-auto">
            Engineering quantitative rigor, modern software architecture, and holistic financial strategies.
          </p>
        </div>

        {/* ADHAM DANNAWAY STYLE 50/50 SPLIT PERSONA CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
          
          {/* LEFT PERSONA: SOFTWARE ARCHITECT & AI ADVOCATE */}
          <div
            onMouseEnter={() => setActiveSide("left")}
            onMouseLeave={() => setActiveSide("none")}
            className={`glass p-8 lg:p-10 rounded-sm border transition-all duration-500 relative overflow-hidden group flex flex-col justify-between ${
              activeSide === "left"
                ? "border-accent/60 shadow-2xl bg-white/[0.04] scale-[1.01]"
                : "border-white/10 hover:border-white/20 bg-white/[0.02]"
            }`}
          >
            {/* Ambient Background Accent */}
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-sm bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
                  <Code2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">
                  Engineering Core
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3 group-hover:text-accent transition-colors">
                Software Architect
              </h2>
              <p className="text-gray-300 text-base leading-relaxed mb-6">
                Designing fault-tolerant microservices, resilient APIs, and high-performance cloud platforms built to scale under critical enterprise loads.
              </p>

              {/* CODE ATTRIBUTES LIST */}
              <ul className="space-y-2 mb-8 text-sm text-gray-300 font-mono">
                <li className="flex items-center space-x-2">
                  <span className="text-accent">&gt;</span>
                  <span>TypeScript / Next.js / React 19</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-accent">&gt;</span>
                  <span>Microservices & Distributed Systems</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-accent">&gt;</span>
                  <span>CI/CD Pipeline Automation & Testing</span>
                </li>
              </ul>
            </div>

            <Link
              href="/#journey"
              className="inline-flex items-center font-semibold text-accent group-hover:text-white transition-colors text-sm"
            >
              Explore Engineering Work
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* RIGHT PERSONA: WEALTH STRATEGIST & FINTECH SPECIALIST */}
          <div
            onMouseEnter={() => setActiveSide("right")}
            onMouseLeave={() => setActiveSide("none")}
            className={`glass p-8 lg:p-10 rounded-sm border transition-all duration-500 relative overflow-hidden group flex flex-col justify-between ${
              activeSide === "right"
                ? "border-accent/60 shadow-2xl bg-white/[0.04] scale-[1.01]"
                : "border-white/10 hover:border-white/20 bg-white/[0.02]"
            }`}
          >
            {/* Ambient Background Accent */}
            <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-sm bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">
                  Quantitative Core
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3 group-hover:text-[#10B981] transition-colors">
                Wealth Strategist
              </h2>
              <p className="text-gray-300 text-base leading-relaxed mb-6">
                Bridging quantitative financial models, risk management protocols, and holistic wealth strategies for capital preservation and growth.
              </p>

              {/* STRATEGY ATTRIBUTES LIST */}
              <ul className="space-y-2 mb-8 text-sm text-gray-300 font-mono">
                <li className="flex items-center space-x-2">
                  <span className="text-[#10B981]">&gt;</span>
                  <span>Portfolio Structuring & Risk Analytics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#10B981]">&gt;</span>
                  <span>Financial Data Pipelines & FinTech APIs</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#10B981]">&gt;</span>
                  <span>Wealth Management & Compliance</span>
                </li>
              </ul>
            </div>

            <Link
              href="/articles"
              className="inline-flex items-center font-semibold text-[#10B981] group-hover:text-white transition-colors text-sm"
            >
              Read Financial Insights
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
