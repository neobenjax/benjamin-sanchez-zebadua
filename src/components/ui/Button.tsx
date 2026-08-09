'use client';

import React from 'react';
import { clsx } from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-sm transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  const variantStyles = {
    primary: 'bg-[var(--color-accent)] hover:opacity-90 text-[var(--color-primary)] font-semibold shadow-md active:scale-95',
    secondary: 'bg-[var(--color-surface)] hover:bg-[var(--border-subtle)] text-[var(--color-text-primary)] border border-[var(--border-subtle)] active:scale-95',
    outline: 'border border-[var(--border-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 active:scale-95',
    ghost: 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/5 active:scale-95',
    accent: 'bg-[var(--color-accent)] hover:opacity-90 text-[var(--color-primary)] font-semibold shadow-md active:scale-95',
  };

  return (
    <button
      className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
