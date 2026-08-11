"use client";

import React, { useState, useEffect } from "react";
import { Dices } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const SESSION_STORAGE_KEY = "benjaminsz_feeling_lucky_clicked";

export default function FeelingLuckyButton() {
  const { savedPresets, activePresetId, applyPreset, generateRandomTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user already clicked the button in this session
    if (typeof window !== "undefined") {
      const clicked = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (clicked === "true") {
        return;
      }
    }

    // Delay appearance by 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const handleClick = () => {
    // Store in session storage so it doesn't appear again during this session
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
    }

    // Pick a random available theme distinct from active theme
    const eligiblePresets = savedPresets.filter((p) => p.id !== activePresetId);

    if (eligiblePresets.length > 0) {
      const randomIndex = Math.floor(Math.random() * eligiblePresets.length);
      const randomPreset = eligiblePresets[randomIndex];
      // Pass false to ensure currentdesigntheme.md is NOT modified on disk
      applyPreset(randomPreset, false);
    } else {
      generateRandomTheme();
    }

    // Immediately hide button after trigger
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-40 animate-pop-in">
      <button
        onClick={handleClick}
        type="button"
        className="group relative flex items-center space-x-2.5 px-5 py-3 rounded-full bg-[var(--color-accent)] text-[var(--color-primary)] font-semibold text-xs sm:text-sm tracking-wide shadow-2xl border border-[var(--border-accent)] hover:brightness-110 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Feeling Lucky? Change design system theme randomly"
      >
        {/* Subtle pulsing indicator ring around icon */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-primary)] opacity-90" />
        </span>

        <Dices className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-primary)] group-hover:rotate-180 transition-transform duration-500" />
        
        <span className="font-mono font-bold uppercase">Feeling Lucky?</span>
      </button>
    </div>
  );
}
