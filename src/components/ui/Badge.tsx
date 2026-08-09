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
    accent: 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--border-accent)]',
    secondary: 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--border-subtle)]',
    outline: 'border border-[var(--border-accent)] text-[var(--color-accent)]',
    pulse: 'glass border border-[var(--border-accent)] text-[var(--color-accent)] shadow-sm',
  };

  return (
    <span
      className={clsx(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {variant === 'pulse' && (
        <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
      )}
      {children}
    </span>
  );
}
