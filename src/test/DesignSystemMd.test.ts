import { describe, it, expect } from 'vitest';
import { exportDesignSystemToMarkdown, importDesignSystemFromMarkdown } from '@/lib/designSystemMd';
import { ThemePreset } from '@/context/ThemeContext';

describe('DesignSystemMd Spec Transpiler Tests', () => {
  const samplePreset: ThemePreset = {
    id: 'cyber-amber',
    name: 'Cyber Amber Test System',
    mode: 'dark',
    tokens: {
      primary_bg: '#0F172A',
      secondary_bg: '#020617',
      surface_card: '#1E293B',
      text_primary: '#F8FAFC',
      text_secondary: '#E2E8F0',
      text_muted: '#94A3B8',
      accent: '#F59E0B',
      slate_steel: '#475569',
      border_subtle: 'rgba(255, 255, 255, 0.10)',
      border_accent: 'rgba(245, 158, 11, 0.25)',
    },
  };

  it('exports theme preset to valid design.md markdown content', () => {
    const md = exportDesignSystemToMarkdown(samplePreset, 'Architect');
    expect(md).toContain('design_system_name: "Cyber Amber Test System"');
    expect(md).toContain('--color-primary: #0F172A;');
    expect(md).toContain('--color-accent: #F59E0B;');
    expect(md).toContain('Primary Background');
  });

  it('imports markdown design.md specification into ThemePreset tokens', () => {
    const md = exportDesignSystemToMarkdown(samplePreset, 'Architect');
    const imported = importDesignSystemFromMarkdown(md);
    expect(imported.name).toBe('Cyber Amber Test System');
    expect(imported.mode).toBe('dark');
    expect(imported.tokens.primary_bg).toBe('#0F172A');
    expect(imported.tokens.accent).toBe('#F59E0B');
  });
});
