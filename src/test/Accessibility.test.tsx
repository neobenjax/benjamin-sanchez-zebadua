import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { ThemeTuner } from '../components/ThemeTuner';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

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
});
