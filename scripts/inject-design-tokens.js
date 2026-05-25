'use strict';

/**
 * Inject canonical :root from styles/tokens.css (lesson) or tokens-satellite.css (404, tools).
 * Markers in HTML: /* DS_TOKENS_START *\/ … /* DS_TOKENS_END *\/
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TOKENS_FULL = path.join(ROOT, 'styles', 'tokens.css');
const TOKENS_SAT = path.join(ROOT, 'styles', 'tokens-satellite.css');

const TARGETS = [
  { file: path.join(ROOT, 'index.html'), tokensFile: TOKENS_FULL, indent: '        ' },
  { file: path.join(ROOT, '404.html'), tokensFile: TOKENS_SAT, indent: '        ' },
  { file: path.join(ROOT, 'tools.html'), tokensFile: TOKENS_SAT, indent: '        ' },
  { file: path.join(ROOT, 'tools-lt.html'), tokensFile: TOKENS_SAT, indent: '        ' },
];

const MARKER_RE = /\/\* DS_TOKENS_START[\s\S]*?\/\* DS_TOKENS_END \*\//;

function indentRoot(css, indent) {
  const lines = css.trim().split('\n');
  return lines.map((line) => (line ? indent + line : line)).join('\n');
}

function injectIntoFile(filePath, tokensPath, indent) {
  if (!fs.existsSync(filePath)) return false;
  let html = fs.readFileSync(filePath, 'utf8');
  if (!MARKER_RE.test(html)) {
    console.warn(`[inject-design-tokens] Skip ${path.basename(filePath)}: no DS_TOKENS markers`);
    return false;
  }
  const rootCss = fs.readFileSync(tokensPath, 'utf8').trim();
  const block =
    `${indent}/* DS_TOKENS_START — from ${path.relative(ROOT, tokensPath)}; do not edit here */\n` +
    `${indentRoot(rootCss, indent)}\n` +
    `${indent}/* DS_TOKENS_END */`;
  html = html.replace(MARKER_RE, block);
  fs.writeFileSync(filePath, html, 'utf8');
  return true;
}

function main() {
  let n = 0;
  for (const t of TARGETS) {
    if (injectIntoFile(t.file, t.tokensFile, t.indent)) n++;
  }
  console.log(`[inject-design-tokens] Injected tokens into ${n} file(s)`);
}

main();
