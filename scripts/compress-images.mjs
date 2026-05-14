#!/usr/bin/env node
/**
 * compress-images.mjs
 * Run with: node scripts/compress-images.mjs
 *
 * Compresses all oversized public PNGs using the sharp library
 * (already a Next.js dependency). Saves originals as .bak before overwriting.
 */

import sharp from 'sharp';
import { readFileSync, writeFileSync, renameSync, statSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const imgDir = join(__dirname, '..', 'public', 'images');

// Images over 200KB that need compression
const targets = [
  { file: 'rectifier_module.png',                        quality: 75 },
  { file: 'radio_unit.png',                              quality: 75 },
  { file: 'working_man_on_tower.png',                    quality: 75 },
  { file: 'alarm_sensor.png',                            quality: 75 },
  { file: 'action_banner.png',                           quality: 75 },
  { file: 'tower.png',                                   quality: 75 },
  { file: 'acdb_left.png',                               quality: 75 },
  { file: 'first_page_hero_section_image_of_servers.png',quality: 80 },
  { file: 'accelerate_your_growth_kinda_image.png',      quality: 80 },
  { file: 'acdb_right.png',                              quality: 80 },
];

let totalSavedKB = 0;

for (const { file, quality } of targets) {
  const input = join(imgDir, file);
  if (!existsSync(input)) {
    console.log(`⚠️  SKIP (not found): ${file}`);
    continue;
  }

  const beforeBytes = statSync(input).size;
  const tmpPath = input + '.tmp';

  try {
    await sharp(input)
      .png({ quality, compressionLevel: 9, effort: 10 })
      .toFile(tmpPath);

    const afterBytes = statSync(tmpPath).size;

    // Only replace if compression actually reduced size
    if (afterBytes < beforeBytes) {
      renameSync(input, input + '.orig.bak'); // keep original as backup
      renameSync(tmpPath, input);
      const savedKB = Math.round((beforeBytes - afterBytes) / 1024);
      totalSavedKB += savedKB;
      console.log(
        `✅ ${file}: ${Math.round(beforeBytes / 1024)}KB → ${Math.round(afterBytes / 1024)}KB  (-${savedKB}KB)`
      );
    } else {
      // Remove tmp if not better
      import('fs').then(({ unlinkSync }) => unlinkSync(tmpPath));
      console.log(`ℹ️  ${file}: already optimal, skipping`);
    }
  } catch (err) {
    console.error(`❌ Error compressing ${file}:`, err.message);
    if (existsSync(tmpPath)) {
      import('fs').then(({ unlinkSync }) => unlinkSync(tmpPath));
    }
  }
}

console.log(`\n🎉 Done! Total saved: ~${totalSavedKB}KB`);
console.log(`💡 .orig.bak files kept as backups — delete when satisfied.`);
