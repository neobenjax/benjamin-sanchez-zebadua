"use client";

import React from "react";
import Image from "next/image";
import { Mail, Download, ArrowUpRight, Sparkles } from "lucide-react";
import type { ComingSoonAST, FragmentLink } from "@/types/fragments";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

interface FragmentComingSoonProps {
  ast: ComingSoonAST;
}

export default function FragmentComingSoon({ ast }: FragmentComingSoonProps) {
  const statementLines = ast.comingSoonStatement.split("\n").map((l) => l.trim()).filter(Boolean);

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-6 lg:px-8 max-w-6xl mx-auto flex flex-col justify-center min-h-[calc(100vh-5rem)]">
      {/* 1. HERO SECTION */}
      <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
        
        {/* Subtitle with hard accent line stroke underneath and no icons */}
        {ast.heroSubtitle && (
          <div className="inline-block border-b-2 border-[var(--color-accent)] pb-1.5 px-1 text-sm sm:text-base font-mono font-bold text-[var(--color-accent)] tracking-wider">
            <span>{ast.heroSubtitle}</span>
          </div>
        )}

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[var(--color-text-primary)] leading-[1.15] tracking-tight max-w-4xl">
          {ast.heroTitle}
        </h1>

        {/* Hero Statement */}
        <p className="text-base sm:text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-3xl font-sans">
          {ast.heroStatement}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {ast.heroActions.map((action, idx) => (
            <RenderCTAButton key={idx} item={action} />
          ))}
        </div>
      </div>

      {/* 2. HORIZONTAL SEPARATOR */}
      <div className="w-full my-12 md:my-16 flex items-center justify-center">
        <div className="w-full border-t border-[var(--border-subtle)]" />
      </div>

      {/* 3. COMING SOON SECTION & BLUEPRINT ILLUSTRATION */}
      <div className="flex flex-col items-center text-center space-y-8">
        <div className="space-y-3 max-w-3xl">
          {statementLines[0] && (
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)]">
              {statementLines[0]}
            </h2>
          )}
          {statementLines[1] && (
            <p className="text-sm sm:text-base font-mono font-bold text-[var(--color-accent)] tracking-wide">
              {statementLines[1]}
            </p>
          )}
        </div>

        {/* Dynamic Architectural Blueprint Card */}
        <div className="w-full max-w-4xl p-4 sm:p-6 md:p-8 rounded-xl bg-[var(--color-surface)] border border-[var(--border-subtle)] shadow-2xl backdrop-blur-md transition-colors">
          {ast.illustrationUrl ? (
            <div className="relative w-full overflow-hidden rounded-lg flex items-center justify-center">
              <img
                src={ast.illustrationUrl}
                alt={ast.illustrationAlt || "Solutions Architect Blueprint Diagram"}
                className="w-full h-auto object-contain max-h-[480px] block"
              />
            </div>
          ) : (
            <div className="p-12 text-[var(--color-text-muted)] font-mono text-sm">
              [Blueprint Illustration Placeholder]
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function RenderCTAButton({ item }: { item: FragmentLink }) {
  const isLinkedIn = item.href.includes("linkedin.com");
  const isMail = item.isMailto;
  const isCv = item.isDownload || item.href.endsWith(".pdf");

  // Variant Styling based on CTA Type
  if (isLinkedIn) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-6 py-3 rounded-sm bg-[#0A66C2] text-white font-semibold text-sm hover:brightness-110 transition-all shadow-md active:scale-95"
      >
        <LinkedinIcon className="w-4 h-4 mr-2.5" />
        {item.text}
      </a>
    );
  }

  if (isMail) {
    return (
      <a
        href={item.href}
        className="inline-flex items-center px-6 py-3 rounded-sm bg-[var(--color-secondary-bg)] border border-[var(--border-subtle)] text-[var(--color-text-primary)] font-semibold text-sm hover:bg-[var(--color-surface)] hover:text-[var(--color-accent)] transition-all shadow-sm active:scale-95 group"
      >
        <Mail className="w-4 h-4 mr-2.5 text-[var(--color-accent)]" />
        {item.text}
        <ArrowUpRight className="w-4 h-4 ml-1.5 text-[var(--color-accent)] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    );
  }

  return (
    <a
      href={item.href}
      download={isCv}
      target={item.isExternal ? "_blank" : "_self"}
      rel={item.isExternal ? "noopener noreferrer" : undefined}
      className="inline-flex items-center px-6 py-3 rounded-sm bg-[var(--color-accent)] text-[var(--color-primary)] font-bold text-sm hover:brightness-110 transition-all shadow-md active:scale-95"
    >
      <Download className="w-4 h-4 mr-2.5" />
      {item.text}
    </a>
  );
}
