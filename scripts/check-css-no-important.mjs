import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const cssDirs = [
  path.join(rootDir, 'src'),
];

let hasError = false;

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.css') || entry.name.endsWith('.scss'))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (line.includes('!important')) {
          console.error(`[CSS Guardrail Violation] Prohibited '!important' rule found in ${fullPath}:${index + 1}`);
          console.error(`  > ${line.trim()}`);
          hasError = true;
        }
      });
    }
  }
}

cssDirs.forEach(scanDir);

if (hasError) {
  console.error('\nCSS Guardrail Check Failed: !important rules are prohibited. Use CSS specificity instead.');
  process.exit(1);
} else {
  console.log('✅ CSS Guardrail Passed: Zero !important rules detected.');
  process.exit(0);
}
