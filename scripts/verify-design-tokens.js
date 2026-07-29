'use strict';

/**
 * Design-token checks: styles/tokens.css presence + public token set;
 * optional local docs/design_system.md §3 parity when the file exists;
 * index.html component CSS — no stray accent/overlay literals.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const INDEX = path.join(ROOT, 'index.html');
const TOKENS = path.join(ROOT, 'styles', 'tokens.css');
const DS = path.join(ROOT, 'docs', 'design_system.md');

/** Public tokens that must exist in styles/tokens.css (CI without docs/). */
const REQUIRED_PUBLIC_TOKENS = [
  '--bg-dark',
  '--surface-base',
  '--text-bright',
  '--text-body',
  '--text-muted',
  '--text-secondary',
  '--text-tertiary',
  '--accent-red',
  '--accent-yellow',
  '--accent-teal',
  '--accent-teal-deep',
  '--font-size-label',
  '--font-size-ui',
  '--font-size-lead',
  '--lh-body',
  '--measure-prose',
  '--tracking-label',
  '--space-2',
  '--space-3',
  '--space-4',
  '--duration-fast',
  '--ease-out'
];

/** Literals allowed outside :root (legacy exceptions). */
const LITERAL_EXCEPTION_PATTERNS = [
  /rgba\s*\(\s*251\s*,\s*211\s*,\s*4\s*,\s*0\.035\s*\)/,
  /rgba\s*\(\s*16\s*,\s*59\s*,\s*90\s*,/,
  /#2aabee/i,
  /rgba\s*\(\s*255\s*,\s*90\s*,\s*95\s*,\s*0\.45\s*\)/,
  /rgba\s*\(\s*251\s*,\s*211\s*,\s*4\s*,\s*0\.22\s*\)/,
  /rgba\s*\(\s*251\s*,\s*211\s*,\s*4\s*,\s*0\.06\s*\)/
];

const OVERLAY_EXCEPTION_PATTERNS = [
  /rgba\s*\(\s*0\s*,\s*0\s*,\s*0\s*,/,
  /linear-gradient/,
  /stroke:\s*rgba/,
  /rgba\s*\(\s*7\s*,\s*27\s*,\s*41\s*,\s*0\.(?:55|98)\s*\)/,
  /rgba\s*\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.(?:15|16|30|35)\s*\)/,
  /rgba\s*\(\s*255,\s*255,\s*255,/
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
  if (!fs.existsSync(TOKENS)) {
    console.error('[verify-design-tokens] Missing styles/tokens.css');
    process.exit(1);
  }

  const tokensCss = fs.readFileSync(TOKENS, 'utf8');
  const html = fs.readFileSync(INDEX, 'utf8');
  const indexStyle = extractStyleBlock(html);
  const rootBlock = extractRootBlock(tokensCss);
  const definedTokens = collectDefinedTokens(tokensCss);
  const rootOnlyTokens = collectDefinedTokens(rootBlock);

  let failed = false;

  const missingRequired = REQUIRED_PUBLIC_TOKENS.filter((t) => !definedTokens.has(t));
  if (missingRequired.length) {
    console.error('[verify-design-tokens] Required public tokens missing from styles/tokens.css:');
    missingRequired.forEach((t) => console.error('  ' + t));
    failed = true;
  }

  if (fs.existsSync(DS)) {
    const ds = fs.readFileSync(DS, 'utf8');
    const docTokens = collectDocumentedTokens(ds);

    const missingInRoot = [...docTokens].filter((t) => !definedTokens.has(t)).sort();
    if (missingInRoot.length) {
      console.error('[verify-design-tokens] Documented in DS §3 but missing in styles/tokens.css:');
      missingInRoot.forEach((t) => console.error('  ' + t));
      failed = true;
    }

    const missingInDoc = [...rootOnlyTokens].filter((t) => !docTokens.has(t)).sort();
    if (missingInDoc.length) {
      console.error('[verify-design-tokens] In tokens.css but not documented in DS §3:');
      missingInDoc.forEach((t) => console.error('  ' + t));
      failed = true;
    }
  }

  const componentPart = componentCssFromIndex(indexStyle);
  const yellowRed = findUndocumentedLiterals(
    componentPart,
    [
      /rgba\s*\(\s*251\s*,\s*211\s*,\s*4\s*,[^)]+\)/gi,
      /rgba\s*\(\s*255\s*,\s*90\s*,\s*95\s*,[^)]+\)/gi
    ],
    'accent'
  );
  const overlay = findUndocumentedLiterals(
    componentPart,
    [
      /rgba\s*\(\s*7\s*,\s*27\s*,\s*41\s*,[^)]+\)/gi,
      /rgba\s*\(\s*255\s*,\s*255\s*,\s*255\s*,[^)]+\)/gi
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

  const dsNote = fs.existsSync(DS) ? 'DS §3 parity checked' : 'no local design_system.md (CSS-only)';
  console.log(
    '[verify-design-tokens] OK —',
    rootOnlyTokens.size,
    'tokens in styles/tokens.css;',
    dsNote + ';',
    'component CSS clean.'
  );
}

main();
