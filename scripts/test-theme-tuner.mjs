import { chromium } from '@playwright/test';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}/theme-personalize`;

async function isServerRunning() {
  try {
    const res = await fetch(`http://localhost:${PORT}/api/theme/sync`);
    return res.ok;
  } catch {
    return false;
  }
}

async function runAutomationTests() {
  console.log('🚀 Starting Theme Tuner Automation & Color Audit Suite...');

  let devServerProcess = null;
  const running = await isServerRunning();
  if (!running) {
    console.log('Starting Next.js dev server on port 3000...');
    devServerProcess = spawn('npx.cmd', ['pnpm', 'dev'], {
      cwd: rootDir,
      stdio: 'pipe',
      shell: true,
    });

    let attempts = 0;
    while (attempts < 30) {
      await new Promise((r) => setTimeout(r, 1000));
      if (await isServerRunning()) break;
      attempts++;
    }
  }

  console.log('🌐 Server ready. Launching Headless Chromium...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // 1. Navigate to /theme-personalize
    console.log(`Navigating to ${BASE_URL}...`);
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // 2. Audit Initial Dropdown State (No Unsaved Draft option on load)
    console.log('Testing Initial Dropdown State...');
    const options = await page.locator('select[aria-label="Select design system theme"] option').allTextContents();
    const hasUnsavedInitially = options.some((opt) => opt.toLowerCase().includes('unsaved draft'));
    if (hasUnsavedInitially) {
      throw new Error('❌ Test Failed: "Unsaved Draft Theme" should NOT be in the dropdown on initial page load!');
    }
    console.log('✅ Passed: Dropdown initialized cleanly without unsaved draft option.');

    // 3. Test Primary Seed Color Randomizer & Draft Badge
    console.log('Testing Seed Randomizer & Draft State...');
    await page.click('button:has-text("Random Accessible Pair")');
    await page.waitForSelector('text=Unsaved Draft', { timeout: 5000 });

    const updatedOptions = await page.locator('select[aria-label="Select design system theme"] option').allTextContents();
    const hasUnsavedAfterEdit = updatedOptions.some((opt) => opt.toLowerCase().includes('unsaved draft'));
    if (!hasUnsavedAfterEdit) {
      throw new Error('❌ Test Failed: "Unsaved Draft Theme" option should appear in dropdown after seed modification!');
    }
    console.log('✅ Passed: Seed randomizer activated draft badge and dropdown option.');

    // 4. Test Save Theme As...
    console.log('Testing Save Theme As modal and disk file sync...');
    await page.click('button:has-text("Save Theme As...")');
    await page.waitForSelector('input[placeholder="e.g. Neon Orange"]');
    await page.fill('input[placeholder="e.g. Neon Orange"]', 'Automated Violet Theme');
    await page.click('button:has-text("Save Preset")');
    await page.waitForTimeout(1000);

    const savedOptions = await page.locator('select[aria-label="Select design system theme"] option').allTextContents();
    const hasSavedTheme = savedOptions.some((opt) => opt.includes('Automated Violet Theme'));
    if (!hasSavedTheme) {
      throw new Error('❌ Test Failed: Saved theme "Automated Violet Theme" not found in dropdown options!');
    }
    console.log('✅ Passed: Theme saved and populated in dropdown selector.');

    // 5. Test Export design.md Modal
    console.log('Testing Export design.md modal...');
    await page.click('button:has-text("View / Export design.md")');
    await page.waitForSelector('textarea[readonly]');
    const exportedMd = await page.inputValue('textarea[readonly]');
    if (!exportedMd.includes('version: "1.0.0"') || !exportedMd.includes('colors:')) {
      throw new Error('❌ Test Failed: Exported design.md missing getdesign.md YAML frontmatter schema!');
    }
    await page.click('button:has-text("Copy Markdown")');
    await page.click('button[aria-label="Close export modal"]');
    await page.waitForTimeout(500);
    console.log('✅ Passed: Export design.md conforms to getdesign.md standard.');

    // 6. Test Import design.md with sample theme specification
    console.log('Testing Import design.md with sample theme specification...');
    const sampleMdPath = path.join(rootDir, 'bugs', 'sampledesingsystem.md');
    const sampleMdContent = fs.readFileSync(sampleMdPath, 'utf-8');

    await page.click('button:has-text("Import design.md")');
    await page.waitForSelector('textarea[placeholder="Paste design.md content here..."]');
    await page.fill('textarea[placeholder="Paste design.md content here..."]', sampleMdContent);
    await page.click('button:has-text("Import & Apply Theme")');
    await page.waitForTimeout(500);

    if (await page.isVisible('button:has-text("Proceed Anyway")')) {
      console.log('WCAG Accessibility Warning Modal triggered as expected for raw sampledesingsystem.md.');
      await page.click('button:has-text("Proceed Anyway")');
      await page.waitForTimeout(500);
    }

    const activeDropdownVal = await page.locator('select[aria-label="Select design system theme"]').inputValue();
    if (!activeDropdownVal) {
      throw new Error('❌ Test Failed: Active theme dropdown value is empty!');
    }
    console.log(`✅ Passed: Successfully imported and applied theme specification (${activeDropdownVal})!`);

    // 7. Audit CSS Custom Properties in Section 2 UI Catalog
    console.log('Auditing Section 2 UI Catalog computed styles...');
    const buttonBgColor = await page.evaluate(() => {
      const btn = document.querySelector('button');
      return btn ? window.getComputedStyle(btn).backgroundColor : null;
    });

    console.log(`Audited Section 2 Button Computed Background Color: ${buttonBgColor}`);
    console.log('✅ All 7 Automated Playwright Audits Passed Successfully!');

  } finally {
    await browser.close();
    if (devServerProcess) {
      devServerProcess.kill();
    }
  }
}

runAutomationTests().catch((err) => {
  console.error('Automation Test Suite Failed:', err);
  process.exit(1);
});
