'use client';

import React from 'react';
import { Palette } from 'lucide-react';

export default function DevTunerLauncher() {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <a
      href="/theme-personalize"
      target="_blank"
      rel="noopener noreferrer"
      title="Open Theme Personalize & Tuner (Dev Mode Only)"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-slate-900/90 border border-emerald-500/30 rounded-full shadow-lg backdrop-blur-md transition-all hover:bg-slate-800 hover:border-emerald-500 hover:scale-105 active:scale-95"
    >
      <Palette className="w-4 h-4 text-emerald-400 animate-pulse" />
      <span>Theme Tuner</span>
    </a>
  );
}
