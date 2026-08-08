import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { ThemeTuner } from '../components/ThemeTuner';

describe('ThemeTuner Component', () => {
  it('renders Theme & Color Engine header and primary seed controls', () => {
    render(
      <ThemeProvider>
        <ThemeTuner />
      </ThemeProvider>
    );

    expect(screen.getByText('Theme & Color Engine')).toBeInTheDocument();
    expect(screen.getByText(/Primary Seed Color/i)).toBeInTheDocument();
    expect(screen.getByText(/Random Accessible Pair/i)).toBeInTheDocument();
    expect(screen.getByText(/Save Theme As.../i)).toBeInTheDocument();
  });

  it('renders derived token swatches and accessibility feedback', () => {
    render(
      <ThemeProvider>
        <ThemeTuner />
      </ThemeProvider>
    );

    expect(screen.getByText(/Derived Token Swatches/i)).toBeInTheDocument();
    expect(screen.getByText(/WCAG 2.1 AA Contrast Ratio/i)).toBeInTheDocument();
    expect(screen.getByText(/Passes WCAG AA/i)).toBeInTheDocument();
  });
});
