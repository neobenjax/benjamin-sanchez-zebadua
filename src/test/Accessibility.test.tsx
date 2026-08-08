import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { ThemeTuner } from '../components/ThemeTuner';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import FragmentHeader from '../components/fragments/FragmentHeader';
import FragmentFooter from '../components/fragments/FragmentFooter';
import { parseHeaderMarkdown, parseFooterMarkdown } from '../lib/fragments';

describe('Accessibility Automated Testing (axe-core)', () => {
  it('ThemeTuner has zero accessibility violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <ThemeTuner />
      </ThemeProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('UI Primitives (Button, Card, Badge) have zero accessibility violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Card variant="glass">
          <Badge variant="accent">Accessibility Check</Badge>
          <Button variant="primary">Click Me</Button>
        </Card>
      </ThemeProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('FragmentHeader has zero accessibility violations', async () => {
    const headerAst = parseHeaderMarkdown('# LEFT_SIDE_HEADER\n[Home](/)\n# RIGHT_SIDE_HEADER\n[About](/about)\n[CV](/cv.pdf)');
    const { container } = render(
      <ThemeProvider>
        <FragmentHeader ast={headerAst} />
      </ThemeProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('FragmentFooter has zero accessibility violations', async () => {
    const footerAst = parseFooterMarkdown('# THREE_COLUMN_LAYOUT\n## COLUMN\n### Links\n[Home](/)');
    const { container } = render(
      <ThemeProvider>
        <FragmentFooter ast={footerAst} />
      </ThemeProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
