import { chromium } from '@playwright/test';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

async function isServerRunning() {
  try {
    const res = await fetch(`http://localhost:${PORT}/api/theme/sync`);
    return res.ok;
  } catch {
    return false;
  }
}

async function runComingSoonAutomationTests() {
  console.log('🚀 Starting Coming Soon Frontpage Browser Automation Suite...');

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
    // 1. Navigate to index route /
    console.log(`Navigating to ${BASE_URL}...`);
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // 2. Audit Hero Elements
    console.log('Auditing Hero Title, Statement, and Subtitle...');
    const titleText = await page.locator('h1').innerText();
    if (!titleText.includes('Precision in Code') || !titleText.includes('Performance in Finance')) {
      throw new Error(`❌ Test Failed: Hero title unexpected text "${titleText}"`);
    }
    console.log('✅ Passed: Hero title accurately rendered from coming_soon.md AST.');

    // 3. Audit CTA Action Links
    console.log('Auditing CTA Action Links (LinkedIn, Email mailto, Download CV)...');
    
    // LinkedIn CTA
    const linkedinHref = await page.getAttribute('a:has-text("Let\'s Connect")', 'href');
    if (!linkedinHref || !linkedinHref.includes('linkedin.com/in/benjaminsanchezzebadua')) {
      throw new Error(`❌ Test Failed: Invalid LinkedIn CTA href "${linkedinHref}"`);
    }

    // Email mailto CTA
    const mailHref = await page.getAttribute('a:has-text("Reach Out via Email")', 'href');
    if (!mailHref || !mailHref.startsWith('mailto:benjaminsz.work@gmail.com')) {
      throw new Error(`❌ Test Failed: Invalid Email CTA href "${mailHref}"`);
    }

    // Download CV CTA
    const cvHref = await page.getAttribute('a:has-text("Download CV")', 'href');
    if (!cvHref || !cvHref.includes('benjamin-cv.pdf')) {
      throw new Error(`❌ Test Failed: Invalid Download CV CTA href "${cvHref}"`);
    }
    console.log('✅ Passed: All 3 CTA interaction links validated.');

    // 4. Audit Coming Soon Statement & Illustration
    console.log('Auditing Coming Soon Statement & Blueprint SVG...');
    const comingSoonText = await page.locator('h2:has-text("crafted meticulously")').innerText();
    if (!comingSoonText.includes('crafted meticulously')) {
      throw new Error('❌ Test Failed: Coming Soon Statement missing!');
    }

    const svgImgSrc = await page.getAttribute('img[alt*="Solutions Architect"]', 'src');
    if (!svgImgSrc || !svgImgSrc.includes('/images/architect-blueprint.svg')) {
      throw new Error(`❌ Test Failed: Architect Blueprint SVG image source invalid "${svgImgSrc}"`);
    }
    console.log('✅ Passed: Coming Soon statement and blueprint SVG verified.');

    // 5. Verify /old secondary route works for internal testing
    console.log(`Auditing secondary route ${BASE_URL}/old...`);
    await page.goto(`${BASE_URL}/old`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    const synergySectionExists = await page.locator('#synergy').isVisible();
    if (!synergySectionExists) {
      throw new Error('❌ Test Failed: /old secondary route failed to load full portfolio sections!');
    }
    console.log('✅ Passed: /old secondary route successfully preserved full portfolio.');

    console.log('🎉 All Coming Soon Browser Automation Audits Passed Successfully!');

  } finally {
    await browser.close();
    if (devServerProcess) {
      devServerProcess.kill();
    }
  }
}

runComingSoonAutomationTests().catch((err) => {
  console.error('Automation Test Suite Failed:', err);
  process.exit(1);
});
