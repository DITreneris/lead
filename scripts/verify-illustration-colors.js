'use strict';

/**
 * Illustration bake colors must come from styles/tokens.css.
 * Fails on hex/rgba in scenes.mjs or build-illustrations.mjs that
 * is not a resolved token value (or an atom inside one, e.g. shadow rgba).
 */
const fs = require('fs');
const path = require('path');
const {
  ROOT,
  loadResolvedTokens,
  collectColorAtoms,
  normalizeColor,
  getIllustrationColors,
  BAKE_KEYS
} = require('./illustration-colors.cjs');

const FILES = [
  path.join(ROOT, 'scripts', 'illustrations', 'scenes.mjs'),
  path.join(ROOT, 'scripts', 'build-illustrations.mjs')
];

const COLOR_RE = /#([0-9a-fA-F]{3,8})\b|rgba?\(\s*[\d.]+(?:\s*,\s*[\d.]+){2,3}\s*\)/g;

/** Smallest baked glyph must stay >= 13px when the picture is 280px wide. */
const MIN_TYPE_PX = 13;
const MIN_DISPLAY_PX = 280;

function stripCommentsAndStrings(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1');
}

function main() {
  const resolved = loadResolvedTokens();
  const atoms = collectColorAtoms(resolved);
  const colors = getIllustrationColors();
  let failed = false;

  for (const [key, token] of Object.entries(BAKE_KEYS)) {
    if (!colors[key]) {
      console.error(`[verify-illustration-colors] Bake key ${key} missing (${token})`);
      failed = true;
    }
  }

  for (const filePath of FILES) {
    const rel = path.relative(ROOT, filePath).split(path.sep).join('/');
    const src = stripCommentsAndStrings(fs.readFileSync(filePath, 'utf8'));
    COLOR_RE.lastIndex = 0;
    let match;
    while ((match = COLOR_RE.exec(src)) !== null) {
      const raw = match[0];
      const atom = normalizeColor(raw);
      if (!atom) continue;
      if (!atoms.has(atom)) {
        if (!failed) {
          console.error('[verify-illustration-colors] Color not in styles/tokens.css:');
          failed = true;
        }
        console.error(`  ${rel}: ${raw}`);
      }
    }
  }

  const bakeSrc = fs.readFileSync(path.join(ROOT, 'scripts', 'build-illustrations.mjs'), 'utf8');
  const sceneSrc = fs.readFileSync(path.join(ROOT, 'scripts', 'illustrations', 'scenes.mjs'), 'utf8');
  const fontSizes = [...bakeSrc.matchAll(/fontSize:\s*(\d+)/g)].map((m) => Number(m[1]));
  const sceneWidths = [...sceneSrc.matchAll(/width:\s*(\d+)/g)].map((m) => Number(m[1]));
  const minFont = fontSizes.length ? Math.min(...fontSizes) : 0;
  const maxWidth = sceneWidths.length ? Math.max(...sceneWidths) : 0;
  const floor = MIN_TYPE_PX / MIN_DISPLAY_PX;
  if (!maxWidth || minFont / maxWidth < floor) {
    console.error(
      `[verify-illustration-colors] Type ratio ${minFont}/${maxWidth} is below ${MIN_TYPE_PX}px at ${MIN_DISPLAY_PX}px display`
    );
    failed = true;
  }

  if (failed) process.exit(1);
  console.log(
    '[verify-illustration-colors] OK —',
    Object.keys(BAKE_KEYS).length,
    'bake keys from tokens.css; no stray hex/rgba in illustration scripts;',
    `type ${minFont}px on ${maxWidth}px canvas.`
  );
}

main();
