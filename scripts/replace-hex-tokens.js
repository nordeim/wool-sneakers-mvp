#!/usr/bin/env node
/**
 * Replaces Tailwind bracket hex color values with @theme token names.
 * Only targets: bg-[#HEX], text-[#HEX], border-[#HEX], ring-[#HEX], etc.
 * Does NOT touch style={{}} props or string literals.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Hex → Token mapping (tailwinds @theme inline colors)
const HEX_MAP = {
  '#3D3835': 'wool-900',
  '#524C48': 'wool-700',
  '#6B6460': 'wool-500',
  '#8C8580': 'wool-300',
  '#B5AFA9': 'wool-100',
  '#B5A288': 'oat-500',
  '#D4C4B0': 'oat-300',
  '#C5B49A': 'oat-400',
  '#E0D4C2': 'oat-200',
  '#F5F0E8': 'oat-50',
  '#F7F4F0': 'warm-white',
  '#FDFBF8': 'cream',
  '#EDE5D8': 'oat-100',
  '#C5C0B8': 'fog-200',
  '#A8A29E': 'fog-300',
};

// Tailwind utilities that accept color values
const UTILITIES = [
  'bg', 'text', 'border', 'ring', 'fill', 'stroke', 'decoration',
  'outline', 'marker', 'caret', 'selection', 'placeholder', 'accent',
  'divide', 'ring-offset', 'from', 'via', 'to', 'shadow', 'shadow-color',
];

/**
 * Build a regex that matches a bracket hex value in a Tailwind utility context.
 * Matches:  (prefix:)?utility-[#hex]
 *           (prefix:)?utility-[#hex/N]
 * Where prefix is hover:, focus:, active:, disabled:, md:, lg:, etc.
 */
function buildReplacementRegex(hex) {
  const escaped = hex.replace(/[-.]/g, '\\$&');
  const utilPattern = `(?:${UTILITIES.join('|')})`;
  return new RegExp(
    `((?:[a-zA-Z0-9-]+:)*${utilPattern})\\[${escaped}([\\/0-9]*)?\\]`,
    'g'
  );
}

// Process a single file
function processFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf-8');
  let updated = content;

  for (const [hex, token] of Object.entries(HEX_MAP)) {
    const regex = buildReplacementRegex(hex);

    updated = updated.replace(regex, (match, prefix, opacity) => {
      // If there's an opacity like /85, append it
      const opacitySuffix = opacity || '';
      return `${prefix}${token}${opacitySuffix}`;
    });
  }

  if (updated !== content) {
    fs.writeFileSync(filepath, updated, 'utf-8');
    console.log(`✅ Updated: ${filepath}`);
    return true;
  }
  return false;
}

// Find all .tsx files in src/
function findFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findFiles(fullPath));
    } else if (entry.name.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  return files;
}

const srcDir = path.join(__dirname, '..', 'src');
const files = findFiles(srcDir);
let changedCount = 0;
for (const file of files) {
  if (processFile(file)) changedCount++;
}
console.log(`\n📊 ${changedCount} files updated`);
