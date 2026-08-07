import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { ThemeTuner } from '../components/ThemeTuner';

describe('ThemeTuner Component', () => {
  it('renders Theme Tuner Engine header and preset choices', () => {
    render(
      <ThemeProvider>
        <ThemeTuner />
      </ThemeProvider>
    );

    expect(screen.getByText('Theme Tuner Engine')).toBeInTheDocument();
    expect(screen.getAllByText(/FinTech Midnight/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Cyber Amber/i)).toBeInTheDocument();
    expect(screen.getByText(/Obsidian Violet/i)).toBeInTheDocument();
  });

  it('switches target tuning mode between dark and light', () => {
    render(
      <ThemeProvider>
        <ThemeTuner />
      </ThemeProvider>
    );

    const lightModeButton = screen.getByText('Tuning Light Mode');
    fireEvent.click(lightModeButton);

    expect(screen.getByText(/Token Color Fine-Tuning \(LIGHT Mode\)/i)).toBeInTheDocument();
  });

  it('displays WCAG AA contrast ratio pass indicator', () => {
    render(
      <ThemeProvider>
        <ThemeTuner />
      </ThemeProvider>
    );

    expect(screen.getByText(/WCAG AA Text Contrast Ratio/i)).toBeInTheDocument();
    expect(screen.getByText(/Passes WCAG AA/i)).toBeInTheDocument();
  });
});
