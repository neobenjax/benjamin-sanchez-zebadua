'use client';

import React from 'react';
import { clsx } from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'solid' | 'outline';
  hoverable?: boolean;
  children: React.ReactNode;
}

export function Card({
  variant = 'glass',
  hoverable = true,
  className,
  children,
  ...props
}: CardProps) {
  const baseStyles = 'rounded-sm p-6 md:p-8 transition-all duration-300 border';

  const variantStyles = {
    glass: 'glass border-[var(--border-subtle)] text-[var(--color-text-primary)]',
    solid: 'bg-[var(--color-surface)] border-[var(--border-subtle)] text-[var(--color-text-primary)]',
    outline: 'bg-transparent border-[var(--border-accent)] text-[var(--color-text-primary)]',
  };

  const hoverStyles = hoverable
    ? 'hover:-translate-y-1 hover:border-[var(--border-accent)] hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]'
    : '';

  return (
    <div
      className={clsx(baseStyles, variantStyles[variant], hoverStyles, className)}
      {...props}
    >
      {children}
    </div>
  );
}
