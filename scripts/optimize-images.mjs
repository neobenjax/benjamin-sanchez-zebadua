import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { execSync } from "child_process";

let files = process.argv.slice(2);

// If no files passed (e.g., ran via npm run image:optimize directly), fetch staged files manually
if (files.length === 0) {
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf-8' });
    files = output.split('\n')
      .filter(line => line.trim())
      .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
      .filter(file => file.startsWith('public/images/'));
  } catch (err) {
    console.error("Error fetching staged files via git.");
    process.exit(1);
  }
}

if (files.length === 0) {
  console.log("No staged images found to optimize.");
  process.exit(0);
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function optimizeImage(filePath) {
  try {
    // Resolve absolute path in case git returns relative to repo root
    const absPath = path.resolve(process.cwd(), filePath);
    const originalBuffer = await fs.readFile(absPath);
    const originalSize = originalBuffer.byteLength;
    
    const metadata = await sharp(originalBuffer).metadata();
    
    let pipeline = sharp(originalBuffer);
    let resized = false;
    
    if (metadata.width > 1920) {
      pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
      resized = true;
    }
    
    if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
      pipeline = pipeline.jpeg({ mozjpeg: true, quality: 80 });
    } else if (metadata.format === 'png') {
      // Note: sharp png optimization uses pngquant/oxipng equivalents natively
      pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
    } else {
      return; // Skip non-jpg/png
    }
    
    const optimizedBuffer = await pipeline.toBuffer();
    const newSize = optimizedBuffer.byteLength;
    
    // Safety Measure: Only overwrite if it actually saved space or was resized
    if (newSize < originalSize || resized) {
      await fs.writeFile(absPath, optimizedBuffer);
      const savings = (((originalSize - newSize) / originalSize) * 100).toFixed(2);
      console.log(`✅ Optimized ${path.basename(filePath)}: ${formatBytes(originalSize)} -> ${formatBytes(newSize)} (-${savings}%) ${resized ? '[Resized]' : ''}`);
      
      // Stage the optimized file automatically
      execSync(`git add "${filePath}"`);
    } else {
      console.log(`⏭️  Skipped ${path.basename(filePath)}: Already fully optimized.`);
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${filePath}:`, error.message);
  }
}

async function main() {
  console.log(`🚀 Starting image optimization pipeline on ${files.length} file(s)...`);
  const promises = files.map(optimizeImage);
  await Promise.all(promises);
  console.log("✨ Image optimization complete!");
}

main();
