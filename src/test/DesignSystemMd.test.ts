import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import {
  exportDesignSystemToMarkdown,
  importDesignSystemFromMarkdown,
  validateDesignSystemMarkdown,
  nameToKebabId,
} from '@/lib/designSystemMd';
import { ThemePreset } from '@/context/ThemeContext';

describe('DesignSystemMd Spec Transpiler & Auditor Tests', () => {
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

  it('converts theme name to kebab-case with timestamp ID', () => {
    const id = nameToKebabId('Neon Orange');
    expect(id).toMatch(/^neon-orange-\d+$/);
  });

  it('validates a correct design.md specification', () => {
    const md = exportDesignSystemToMarkdown(samplePreset, 'Architect');
    const result = validateDesignSystemMarkdown(md);
    expect(result.isValid).toBe(true);
  });

  it('detects missing tokens and rejects invalid markdown', () => {
    const invalidMD = `---
design_system_name: "Broken Theme"
---
# Design System Specification: Broken Theme
:root {
  --color-primary: #000;
}
`;
    const result = validateDesignSystemMarkdown(invalidMD);
    expect(result.isValid).toBe(false);
    expect(result.errorReason).toContain('Missing required design system tokens');
  });

  it('exports theme preset to valid design.md markdown content', () => {
    const md = exportDesignSystemToMarkdown(samplePreset, 'Architect');
    expect(md).toContain('name: "Cyber Amber Test System"');
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

  it('validates and imports sample apple_design_system.md', () => {
    const applePath = path.join(process.cwd(), 'bugs', 'apple_design_system.md');
    if (fs.existsSync(applePath)) {
      const appleContent = fs.readFileSync(applePath, 'utf-8');
      const validation = validateDesignSystemMarkdown(appleContent);
      expect(validation.isValid).toBe(true);

      const imported = importDesignSystemFromMarkdown(appleContent);
      expect(imported.name).toBe('Apple-design-analysis');
      expect(imported.tokens.accent).toBe('#0066cc');
    }
  });

  it('validates and imports sample nintendo_2001_design_system.md', () => {
    const nintendoPath = path.join(process.cwd(), 'bugs', 'nintendo_2001_design_system.md');
    if (fs.existsSync(nintendoPath)) {
      const nintendoContent = fs.readFileSync(nintendoPath, 'utf-8');
      const validation = validateDesignSystemMarkdown(nintendoContent);
      expect(validation.isValid).toBe(true);

      const imported = importDesignSystemFromMarkdown(nintendoContent);
      expect(imported.name).toBe('Nintendo.com (2001) Analysis');
      expect(imported.tokens.accent).toBe('#e60012');
    }
  });
});
