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
    expect(imported.tokens.primary_bg).toBe('#0F172A');
    expect(imported.tokens.accent).toBe('#F59E0B');
  });

  it('validates and imports sampledesingsystem.md', () => {
    const samplePath = path.join(process.cwd(), 'bugs', 'sampledesingsystem.md');
    if (fs.existsSync(samplePath)) {
      const sampleContent = fs.readFileSync(samplePath, 'utf-8');
      const validation = validateDesignSystemMarkdown(sampleContent);
      expect(validation.isValid).toBe(true);

      const imported = importDesignSystemFromMarkdown(sampleContent);
      expect(['Apple-design-system', 'Claude-design-system', 'Nike-design-system']).toContain(imported.name);
      expect(['#0066cc', '#cc785c', '#111111']).toContain(imported.tokens.accent);
    }
  });
});
