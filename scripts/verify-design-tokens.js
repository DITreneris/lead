'use strict';

/**
 * Design-token parity: styles/tokens.css ↔ docs/design_system.md §3;
 * index.html component CSS — no stray accent/overlay literals.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const INDEX = path.join(ROOT, 'index.html');
const TOKENS = path.join(ROOT, 'styles', 'tokens.css');
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

const OVERLAY_EXCEPTION_PATTERNS = [
  /rgba\s*\(\s*0\s*,\s*0\s*,\s*0\s*,/,
  /linear-gradient/,
  /stroke:\s*rgba/,
  /rgba\s*\(\s*7\s*,\s*27\s*,\s*41\s*,\s*0\.(?:55|98)\s*\)/,
  /rgba\s*\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.(?:15|16|30|35)\s*\)/,
  /rgba\s*\(\s*255,\s*255,\s*255,/,
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
  const m = css.match(/:root\s*\{([\s\S]*)\}/);
  if (!m) throw new Error('No :root block');
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

function componentCssFromIndex(css) {
  const markerEnd = css.indexOf('/* DS_TOKENS_END */');
  if (markerEnd >= 0) return css.slice(markerEnd + '/* DS_TOKENS_END */'.length);
  const rootStart = css.indexOf(':root');
  const rootEnd = css.indexOf('}', rootStart) + 1;
  return css.slice(rootEnd);
}

function findUndocumentedLiterals(componentPart, patterns, label) {
  const hits = [];
  const lines = componentPart.split('\n');
  lines.forEach((line, i) => {
    for (const re of patterns) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(line)) !== null) {
        const lit = m[0];
        if (LITERAL_EXCEPTION_PATTERNS.some((p) => p.test(lit))) continue;
        if (OVERLAY_EXCEPTION_PATTERNS.some((p) => p.test(lit))) continue;
        hits.push({ line: i + 1, literal: lit, label });
      }
    }
  });
  return hits;
}

function main() {
  const tokensCss = fs.readFileSync(TOKENS, 'utf8');
  const html = fs.readFileSync(INDEX, 'utf8');
  const ds = fs.readFileSync(DS, 'utf8');
  const indexStyle = extractStyleBlock(html);
  const rootBlock = extractRootBlock(tokensCss);
  const definedTokens = collectDefinedTokens(tokensCss);
  const docTokens = collectDocumentedTokens(ds);

  let failed = false;

  const missingInRoot = [...docTokens].filter((t) => !definedTokens.has(t)).sort();
  if (missingInRoot.length) {
    console.error('[verify-design-tokens] Documented in DS §3 but missing in styles/tokens.css:');
    missingInRoot.forEach((t) => console.error('  ' + t));
    failed = true;
  }

  const rootOnlyTokens = collectDefinedTokens(rootBlock);
  const missingInDoc = [...rootOnlyTokens].filter((t) => !docTokens.has(t)).sort();
  if (missingInDoc.length) {
    console.error('[verify-design-tokens] In tokens.css but not documented in DS §3:');
    missingInDoc.forEach((t) => console.error('  ' + t));
    failed = true;
  }

  const componentPart = componentCssFromIndex(indexStyle);
  const yellowRed = findUndocumentedLiterals(
    componentPart,
    [
      /rgba\s*\(\s*251\s*,\s*211\s*,\s*4\s*,[^)]+\)/gi,
      /rgba\s*\(\s*255\s*,\s*90\s*,\s*95\s*,[^)]+\)/gi,
    ],
    'accent'
  );
  const overlay = findUndocumentedLiterals(
    componentPart,
    [
      /rgba\s*\(\s*7\s*,\s*27\s*,\s*41\s*,[^)]+\)/gi,
      /rgba\s*\(\s*255\s*,\s*255\s*,\s*255\s*,[^)]+\)/gi,
    ],
    'overlay'
  );

  for (const { line, literal, label } of [...yellowRed, ...overlay]) {
    if (!failed) {
      console.error('[verify-design-tokens] Undocumented literals in index.html component CSS:');
      failed = true;
    }
    console.error(`  [${label}] line ~${line}: ${literal}`);
  }

  if (failed) process.exit(1);
  console.log(
    '[verify-design-tokens] OK —',
    rootOnlyTokens.size,
    'tokens in styles/tokens.css match DS §3; component CSS clean.'
  );
}

main();
