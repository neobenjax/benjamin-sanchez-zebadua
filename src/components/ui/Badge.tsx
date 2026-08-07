'use client';

import React from 'react';
import { clsx } from 'clsx';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'accent' | 'secondary' | 'outline' | 'pulse';
  children: React.ReactNode;
}

export function Badge({
  variant = 'accent',
  className,
  children,
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full transition-all';

  const variantStyles = {
    accent: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    secondary: 'bg-slate-800/80 text-slate-300 border border-slate-700/50',
    outline: 'border border-emerald-500/40 text-emerald-400',
    pulse: 'glass border-emerald-500/30 text-emerald-400 shadow-sm',
  };

  return (
    <span
      className={clsx(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {variant === 'pulse' && (
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      )}
      {children}
    </span>
  );
}
