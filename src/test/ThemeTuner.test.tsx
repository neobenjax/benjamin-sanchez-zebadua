import { render, screen, fireEvent } from '@testing-library/react';
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

  it('switches target tuning mode between dark and light', () => {
    render(
      <ThemeProvider>
        <ThemeTuner />
      </ThemeProvider>
    );

    const lightModeButton = screen.getByText('Light Tokens');
    fireEvent.click(lightModeButton);

    expect(screen.getByText(/Derived Token Swatches \(LIGHT Mode\)/i)).toBeInTheDocument();
  });

  it('displays WCAG 2.1 AA contrast ratio pass indicator', () => {
    render(
      <ThemeProvider>
        <ThemeTuner />
      </ThemeProvider>
    );

    expect(screen.getByText(/WCAG 2.1 AA Contrast Ratio/i)).toBeInTheDocument();
    expect(screen.getByText(/Passes WCAG AA/i)).toBeInTheDocument();
  });
});
