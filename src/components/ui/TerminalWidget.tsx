"use client";

import React, { useState, useEffect } from "react";

interface TerminalWidgetProps {
  lines?: string[];
  typingSpeedMs?: number;
  lineDelayMs?: number;
  resetDelayMs?: number;
}

const DEFAULT_LINES = [
  '$ agy init --session "portfolio-exploration"',
  "> Gemini: Connected to Benjamin Sanchez Zebadua's Solutions Architect Agent.",
  '$ agy prompt "What is Benjamin\'s core engineering philosophy?"',
  "> Gemini: Bridging high-performance software engineering with strategic financial systems.",
  "$ agy query --tech-stack",
  "> Gemini: Next.js 16 App Router, React 19, TypeScript, Node.js AST engines, & WCAG AA design systems.",
  "$ agy inspect --expertise",
  "> Gemini: Passionate about AI, AI Ethics & Compliance, Agent Skills, Spec-Driven Development, RAG, and OKF architecture for corporate data security—specializing in scalable FinTech architecture.",
  '$ agy spec --prompt "Build a portfolio website that uses SSR, Markdown files, design system, and dynamic content loading..."',
  "> Gemini: Analyzing requirements...",
  "> Gemini: Building awesome things here, please wait and stay tuned for launch!",
];

export default function TerminalWidget({
  lines = DEFAULT_LINES,
  typingSpeedMs = 30,
  lineDelayMs = 400,
  resetDelayMs = 10000,
}: TerminalWidgetProps) {
  const activeLines = lines && lines.length > 0 ? lines : DEFAULT_LINES;

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener?.("change", handleChange);
    return () => {
      mediaQuery.removeEventListener?.("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsCompleted(true);
      setCurrentLineIndex(activeLines.length);
      return;
    }

    if (isCompleted) {
      const resetTimer = setTimeout(() => {
        setIsCompleted(false);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
      }, resetDelayMs);

      return () => clearTimeout(resetTimer);
    }

    const targetLine = activeLines[currentLineIndex];

    if (!targetLine) {
      setIsCompleted(true);
      return;
    }

    if (currentCharIndex < targetLine.length) {
      const charTimer = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, typingSpeedMs);

      return () => clearTimeout(charTimer);
    } else {
      const lineTimer = setTimeout(() => {
        if (currentLineIndex + 1 < activeLines.length) {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        } else {
          setIsCompleted(true);
        }
      }, lineDelayMs);

      return () => clearTimeout(lineTimer);
    }
  }, [
    currentLineIndex,
    currentCharIndex,
    isCompleted,
    activeLines,
    typingSpeedMs,
    lineDelayMs,
    resetDelayMs,
    prefersReducedMotion,
  ]);

  return (
    <div
      className="w-full max-w-4xl rounded-xl bg-[var(--color-surface)] border border-[var(--border-subtle)] shadow-2xl overflow-hidden font-mono text-left transition-colors my-8"
      role="region"
      aria-label="Interactive Linux Terminal CLI"
    >
      {/* Linux Window Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-secondary-bg)] border-b border-[var(--border-subtle)]">
        <div className="flex items-center space-x-2" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
        </div>
        <div className="text-xs sm:text-sm font-semibold text-[var(--color-text-secondary)] truncate px-2">
          benjamin@solutions-architect: ~ (agy-cli)
        </div>
        <div className="w-12 text-right text-xs text-[var(--color-text-muted)] hidden sm:block">
          bash
        </div>
      </div>

      {/* Terminal Content Body */}
      <div className="p-4 sm:p-6 space-y-2 text-xs sm:text-sm md:text-base min-h-[260px] sm:min-h-[300px] overflow-x-auto text-[var(--color-text-primary)] leading-relaxed">
        {prefersReducedMotion ? (
          activeLines.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap break-words">
              {renderFormattedLine(line)}
            </div>
          ))
        ) : (
          <>
            {activeLines
              .slice(0, isCompleted ? activeLines.length : currentLineIndex)
              .map((line, idx) => {
                const isLastCompletedLine = isCompleted && idx === activeLines.length - 1;
                return (
                  <div key={idx} className="whitespace-pre-wrap break-words flex items-center flex-wrap">
                    {renderFormattedLine(line)}
                    {isLastCompletedLine && (
                      <span
                        className="inline-block w-2 h-4 sm:h-5 bg-[var(--color-accent)] ml-1 animate-pulse"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                );
              })}

            {!isCompleted && currentLineIndex < activeLines.length && (
              <div className="whitespace-pre-wrap break-words flex items-center flex-wrap">
                {renderFormattedLine(
                  activeLines[currentLineIndex].slice(0, currentCharIndex)
                )}
                <span
                  className="inline-block w-2 h-4 sm:h-5 bg-[var(--color-accent)] ml-1 animate-pulse"
                  aria-hidden="true"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function renderFormattedLine(line: string) {
  if (line.startsWith("$ ")) {
    const promptCommand = line.slice(2);
    return (
      <span>
        <span className="text-[var(--color-accent)] font-bold mr-2">$</span>
        <span className="text-[var(--color-text-primary)]">{promptCommand}</span>
      </span>
    );
  }

  if (line.startsWith("> ")) {
    const aiResponse = line.slice(2);
    const splitIdx = aiResponse.indexOf(":");
    if (splitIdx !== -1) {
      const label = aiResponse.slice(0, splitIdx + 1);
      const text = aiResponse.slice(splitIdx + 1);
      return (
        <span>
          <span className="text-[var(--color-accent)] font-semibold">{label}</span>
          <span className="text-[var(--color-text-secondary)]">{text}</span>
        </span>
      );
    }
    return <span className="text-[var(--color-text-secondary)]">{aiResponse}</span>;
  }

  return <span className="text-[var(--color-text-primary)]">{line}</span>;
}
