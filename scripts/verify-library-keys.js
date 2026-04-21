'use strict';

/**
 * Every data-emp-key / data-mgr-key / data-prompt-key in index.html must exist
 * in libraryPromptsLt (index.html) and in assets/prompt-library-en.js.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const INDEX = path.join(ROOT, 'index.html');
const EN_LIB = path.join(ROOT, 'assets', 'prompt-library-en.js');

function collectKeys(html) {
  const keys = new Set();
  const re = /\bdata-(?:emp|mgr|prompt)-key="([^"]+)"/g;
  let m;
  while ((m = re.exec(html)) !== null) keys.add(m[1]);
  return keys;
}

function hasLtDefinition(html, key) {
  const esc = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (key.startsWith('mgr_')) {
    return new RegExp('libraryPromptsLt\\.' + esc + '\\s*=').test(html);
  }
  return new RegExp('\\b' + esc + '\\s*:').test(html);
}

function hasEnDefinition(enSrc, key) {
  const esc = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (key.startsWith('mgr_')) {
    return new RegExp('p\\.' + esc + '\\s*=').test(enSrc);
  }
  return new RegExp('\\b' + esc + '\\s*:').test(enSrc);
}

function main() {
  const html = fs.readFileSync(INDEX, 'utf8');
  const enSrc = fs.readFileSync(EN_LIB, 'utf8');
  const keys = collectKeys(html);
  const missingLt = [];
  const missingEn = [];
  for (const k of keys) {
    if (!hasLtDefinition(html, k)) missingLt.push(k);
    if (!hasEnDefinition(enSrc, k)) missingEn.push(k);
  }
  if (missingLt.length || missingEn.length) {
    if (missingLt.length) console.error('[verify-library-keys] Missing libraryPromptsLt definition for:', missingLt.join(', '));
    if (missingEn.length) console.error('[verify-library-keys] Missing __PROMPT_LIBRARY_EN__ key for:', missingEn.join(', '));
    process.exit(1);
  }
  console.log('[verify-library-keys] OK:', keys.size, 'keys');
}

main();
