import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { execSync } from "child_process";
import { existsSync } from "fs";

const isAll = process.argv.includes("--all");
let files = process.argv.slice(2).filter(arg => arg !== "--all");

async function walkDir(dir) {
  let results = [];
  try {
    const list = await fs.readdir(dir, { withFileTypes: true });
    for (const item of list) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        results = results.concat(await walkDir(fullPath));
      } else if (/\.(jpg|jpeg|png)$/i.test(item.name)) {
        results.push(fullPath);
      }
    }
  } catch (e) {
    // Ignore missing directory if applicable
  }
  return results;
}

// Ensure execution is awaited correctly at the top level via IIFE since module may not support top-level await depending on Node setup
(async () => {
  if (isAll) {
    files = await walkDir("public/images");
  } else if (files.length === 0) {
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
    console.log("No images found to optimize.");
    process.exit(0);
  }

  function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + sizes[i];
  }

  const summaryTable = [];

  async function processImage(filePath) {
    try {
      const absPath = path.resolve(process.cwd(), filePath);
      const parsedPath = path.parse(absPath);
      const webpPath = path.join(parsedPath.dir, `${parsedPath.name}.webp`);
      const relFilePath = path.relative(process.cwd(), absPath).replace(/\\/g, '/');
      const relWebpPath = path.relative(process.cwd(), webpPath).replace(/\\/g, '/');

      const originalBuffer = await fs.readFile(absPath);
      const originalSize = originalBuffer.byteLength;
      
      let pipeline = sharp(originalBuffer);
      const metadata = await pipeline.metadata();
      
      let resized = false;
      if (metadata.width > 1920) {
        pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
        resized = true;
      }

      // Process Original Format (JPG/PNG)
      let optimizedBuffer;
      if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
        optimizedBuffer = await pipeline.clone().jpeg({ mozjpeg: true, quality: 80 }).toBuffer();
      } else if (metadata.format === 'png') {
        optimizedBuffer = await pipeline.clone().png({ quality: 80, compressionLevel: 9 }).toBuffer();
      }

      const newSize = optimizedBuffer.byteLength;
      const savings = originalSize > 0 ? (((originalSize - newSize) / originalSize) * 100).toFixed(1) : "0.0";
      
      if (newSize < originalSize || resized) {
        await fs.writeFile(absPath, optimizedBuffer);
        if (!isAll) execSync(`git add "${relFilePath}"`);
        summaryTable.push({
          Filename: path.basename(filePath),
          'Orig Size': formatBytes(originalSize),
          'New Size': formatBytes(newSize),
          '% Reduction': `-${savings}%`
        });
      }

      // Process WebP Generation
      if (!existsSync(webpPath)) {
        const webpBuffer = await pipeline.clone().webp({ quality: 75 }).toBuffer();
        await fs.writeFile(webpPath, webpBuffer);
        const webpSavings = originalSize > 0 ? (((originalSize - webpBuffer.byteLength) / originalSize) * 100).toFixed(1) : "0.0";
        if (!isAll) execSync(`git add "${relWebpPath}"`);
        summaryTable.push({
          Filename: path.basename(webpPath),
          'Orig Size': formatBytes(originalSize),
          'New Size': formatBytes(webpBuffer.byteLength),
          '% Reduction': `-${webpSavings}% (WebP)`
        });
      }

    } catch (error) {
      console.error(`❌ Error optimizing ${filePath}:`, error.message);
    }
  }

  console.log(`🚀 Starting ${isAll ? 'Full Migration' : 'Staged'} optimization on ${files.length} file(s)...`);
  
  // Sequential processing
  for (const file of files) {
    await processImage(file);
  }

  if (summaryTable.length > 0) {
    console.log('\n✨ Optimization Summary:');
    console.table(summaryTable);
  } else {
    console.log('\n✨ All files were already fully optimized.');
  }
})();
