'use strict';

/**
 * Satellite pages: styles/tokens-satellite.css values must match styles/tokens.css;
 * 404.html / tools.html must not use undeclared custom properties.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TOKENS_FULL = path.join(ROOT, 'styles', 'tokens.css');
const TOKENS_SAT = path.join(ROOT, 'styles', 'tokens-satellite.css');

const SATELLITE_HTML = [
  path.join(ROOT, '404.html'),
  path.join(ROOT, 'tools.html'),
  path.join(ROOT, 'tools-lt.html'),
];

function parseTokenValues(css) {
  const map = new Map();
  const re = /(--[a-z][a-z0-9-]*)\s*:\s*([^;]+);/gi;
  let m;
  while ((m = re.exec(css)) !== null) {
    map.set(m[1], m[2].trim().replace(/\s+/g, ' '));
  }
  return map;
}

function extractStyle(html) {
  const m = html.match(/<style>([\s\S]*?)<\/style>/i);
  return m ? m[1] : '';
}

function collectUsedVars(css) {
  const used = new Set();
  const re = /var\(\s*(--[a-z][a-z0-9-]*)\s*\)/gi;
  let m;
  while ((m = re.exec(css)) !== null) used.add(m[1]);
  return used;
}

function main() {
  const fullMap = parseTokenValues(fs.readFileSync(TOKENS_FULL, 'utf8'));
  const satMap = parseTokenValues(fs.readFileSync(TOKENS_SAT, 'utf8'));
  let failed = false;

  for (const [name, val] of satMap) {
    if (!fullMap.has(name)) {
      console.error(`[verify-satellite-tokens] ${name} in satellite file but missing in tokens.css`);
      failed = true;
      continue;
    }
    if (fullMap.get(name) !== val) {
      console.error(
        `[verify-satellite-tokens] Value drift for ${name}:\n  satellite: ${val}\n  full:      ${fullMap.get(name)}`
      );
      failed = true;
    }
  }

  for (const htmlPath of SATELLITE_HTML) {
    if (!fs.existsSync(htmlPath)) continue;
    const style = extractStyle(fs.readFileSync(htmlPath, 'utf8'));
    const used = collectUsedVars(style);
    for (const v of used) {
      if (!satMap.has(v)) {
        console.error(`[verify-satellite-tokens] ${path.basename(htmlPath)} uses ${v} not in tokens-satellite.css`);
        failed = true;
      }
    }
  }

  if (failed) process.exit(1);
  console.log('[verify-satellite-tokens] OK — satellite subset matches full tokens; HTML vars in subset.');
}

main();
