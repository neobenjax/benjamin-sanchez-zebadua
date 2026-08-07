'use client';

import React from 'react';
import { clsx } from 'clsx';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  options,
  className,
  value,
  onChange,
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className={clsx(
          'w-full px-3 py-2 text-sm rounded-sm bg-[var(--color-surface)] border border-[var(--border-subtle)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-all cursor-pointer',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-100">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
