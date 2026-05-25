'use strict';

/**
 * Warn on font-size literals >32px outside allowed display selectors (DS §4).
 * Exit 0 with warnings only (v2.0 soft gate).
 */
const fs = require('fs');
const path = require('path');

const INDEX = path.join(__dirname, '..', 'index.html');

const ALLOWED_CONTEXT =
  /(?:^|[,{]\s*)(?:h1|h2(?:\.essence-tagline|\.cta-title)?|\.essence-primary-headline|\.hero-title-accent)\b/;

function extractComponentCss(html) {
  const m = html.match(/<style>([\s\S]*?)<\/style>/i);
  if (!m) return '';
  let css = m[1];
  const end = css.indexOf('/* DS_TOKENS_END */');
  if (end >= 0) css = css.slice(end + '/* DS_TOKENS_END */'.length);
  return css;
}

function main() {
  const css = extractComponentCss(fs.readFileSync(INDEX, 'utf8'));
  const blocks = css.split(/\n(?=[.#a-z])/i);
  let warnings = 0;

  for (const block of blocks) {
    const selectorPart = block.split('{')[0] || '';
    if (ALLOWED_CONTEXT.test(selectorPart)) continue;
    const sizeRe = /font-size:\s*(\d+)px/gi;
    let m;
    while ((m = sizeRe.exec(block)) !== null) {
      if (parseInt(m[1], 10) > 32) {
        const sel = selectorPart.trim().slice(0, 80);
        console.warn(`[verify-typography-roles] font-size:${m[1]}px outside §4 roles — ${sel || '(block)'}`);
        warnings++;
      }
    }
  }

  if (warnings) {
    console.warn(`[verify-typography-roles] ${warnings} warning(s) — audit docs/DS_TYPOGRAPHY_AUDIT.md`);
  } else {
    console.log('[verify-typography-roles] OK — no orphan font-size >32px detected.');
  }
}

main();
