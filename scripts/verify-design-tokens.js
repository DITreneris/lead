'use strict';

/**
 * Strict design-token parity: index.html :root ↔ docs/design_system.md §3.
 * Also fails on undocumented rgba(251,…) / rgba(255,90,…) literals in component CSS.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const INDEX = path.join(ROOT, 'index.html');
const DS = path.join(ROOT, 'docs', 'design_system.md');

/** Literals allowed outside :root (see DS §3.9 exceptions). */
const LITERAL_EXCEPTION_PATTERNS = [
  /rgba\s*\(\s*251\s*,\s*211\s*,\s*4\s*,\s*0\.035\s*\)/,
  /rgba\s*\(\s*16\s*,\s*59\s*,\s*90\s*,/,
  /#2aabee/i,
  /rgba\s*\(\s*255\s*,\s*90\s*,\s*95\s*,\s*0\.45\s*\)/,
  /rgba\s*\(\s*251\s*,\s*211\s*,\s*4\s*,\s*0\.22\s*\)/,
  /rgba\s*\(\s*251\s*,\s*211\s*,\s*4\s*,\s*0\.06\s*\)/,
];

function extractStyleBlock(html) {
  const m = html.match(/<style>([\s\S]*?)<\/style>/i);
  if (!m) throw new Error('No <style> block in index.html');
  return m[1];
}

function collectDefinedTokens(css) {
  const tokens = new Set();
  const re = /--([a-z][a-z0-9-]*)\s*:/gi;
  let match;
  while ((match = re.exec(css)) !== null) tokens.add('--' + match[1]);
  return tokens;
}

function extractRootBlock(css) {
  const m = css.match(/:root\s*\{([\s\S]*?)\n\s*\}/);
  if (!m) throw new Error('No :root block in index.html');
  return m[1];
}

function collectDocumentedTokens(dsMarkdown) {
  const tokens = new Set();
  const section = dsMarkdown.match(/## 3\. Design tokens[\s\S]*?(?=\n## 4\.)/);
  if (!section) throw new Error('Could not find §3 in design_system.md');
  const re = /`--([a-z][a-z0-9-]*)`/g;
  let m;
  while ((m = re.exec(section[0])) !== null) tokens.add('--' + m[1]);
  return tokens;
}

function componentCss(css, rootBlock) {
  const rootStart = css.indexOf(':root');
  const rootEnd = css.indexOf('}', rootStart) + 1;
  return css.slice(rootEnd);
}

function findUndocumentedLiterals(componentPart) {
  const hits = [];
  const yellowRe = /rgba\s*\(\s*251\s*,\s*211\s*,\s*4\s*,[^)]+\)/gi;
  const redRe = /rgba\s*\(\s*255\s*,\s*90\s*,\s*95\s*,[^)]+\)/gi;
  const lines = componentPart.split('\n');
  lines.forEach((line, i) => {
    const lineNo = i + 1;
    for (const re of [yellowRe, redRe]) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(line)) !== null) {
        const lit = m[0];
        if (LITERAL_EXCEPTION_PATTERNS.some((p) => p.test(lit))) continue;
        hits.push({ line: lineNo, literal: lit });
      }
    }
  });
  return hits;
}

function main() {
  const html = fs.readFileSync(INDEX, 'utf8');
  const ds = fs.readFileSync(DS, 'utf8');
  const css = extractStyleBlock(html);
  const rootBlock = extractRootBlock(css);
  const definedTokens = collectDefinedTokens(css);
  const docTokens = collectDocumentedTokens(ds);

  let failed = false;

  const missingInRoot = [...docTokens].filter((t) => !definedTokens.has(t)).sort();
  if (missingInRoot.length) {
    console.error('[verify-design-tokens] Documented in DS §3 but missing in index.html styles:');
    missingInRoot.forEach((t) => console.error('  ' + t));
    failed = true;
  }

  const rootOnlyTokens = collectDefinedTokens(rootBlock);
  const missingInDoc = [...rootOnlyTokens].filter((t) => !docTokens.has(t)).sort();
  if (missingInDoc.length) {
    console.error('[verify-design-tokens] In index.html :root but not documented in DS §3 tables:');
    missingInDoc.forEach((t) => console.error('  ' + t));
    failed = true;
  }

  const literals = findUndocumentedLiterals(componentCss(css, rootBlock));
  if (literals.length) {
    console.error('[verify-design-tokens] Undocumented rgba literals in component CSS (use var(--accent-*) or add §3.9 exception):');
    literals.forEach(({ line, literal }) => console.error(`  line ~${line}: ${literal}`));
    failed = true;
  }

  if (failed) process.exit(1);
  console.log(
    '[verify-design-tokens] OK —',
    rootOnlyTokens.size,
    'tokens in :root match DS §3; no stray accent literals in components.'
  );
}

main();
