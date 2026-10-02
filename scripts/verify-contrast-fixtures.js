'use strict';

/**
 * Fixed contrast pairs from styles/tokens.css (relative luminance).
 * Not a WCAG certification — only the listed fixtures.
 */
const { loadResolvedTokens, normalizeColor } = require('./illustration-colors.cjs');

const MIN_RATIO = 4.5;

const FIXTURES = [
  ['--text-body', '--bg-dark'],
  ['--text-muted', '--bg-dark'],
  ['--text-soft', '--bg-dark'],
  ['--text-on-accent', '--accent-yellow'],
  ['--text-on-accent', '--accent-red'],
  ['--text-ink', '--surface-light'],
  ['--text-ink-muted', '--surface-light'],
  ['--text-ink', '--surface-paper'],
  ['--text-ink-body', '--surface-paper'],
  ['--text-ink', '--surface-reason'],
  ['--text-ink-body', '--surface-reason'],
  ['--text-ink', '--surface-qc'],
  ['--text-ink-body', '--surface-qc'],
  ['--accent-yellow', '--surface-stage-card'],
  ['--text-bright', '--accent-teal-deep']
];

function srgbToLin(channel) {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function luminance(rgb) {
  return 0.2126 * srgbToLin(rgb[0]) + 0.7152 * srgbToLin(rgb[1]) + 0.0722 * srgbToLin(rgb[2]);
}

function parseRgb(value) {
  const atom = normalizeColor(value);
  if (!atom) return null;
  if (atom[0] === '#') {
    const h = atom.slice(1);
    if (h.length < 6) return null;
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  const m = atom.match(/^rgba\((\d+),(\d+),(\d+),/);
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function contrastRatio(a, b) {
  const l1 = luminance(a);
  const l2 = luminance(b);
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}

function main() {
  const resolved = loadResolvedTokens();
  let failed = false;
  const rows = [];

  for (const [fgName, bgName] of FIXTURES) {
    const fgVal = resolved.get(fgName);
    const bgVal = resolved.get(bgName);
    if (!fgVal || !bgVal) {
      console.error(`[verify-contrast-fixtures] Missing token ${fgName} or ${bgName}`);
      failed = true;
      continue;
    }
    const fg = parseRgb(fgVal);
    const bg = parseRgb(bgVal);
    if (!fg || !bg) {
      console.error(`[verify-contrast-fixtures] Not a solid color: ${fgName}=${fgVal} on ${bgName}=${bgVal}`);
      failed = true;
      continue;
    }
    const ratio = contrastRatio(fg, bg);
    const label = `${fgName} on ${bgName}`;
    rows.push(`${label}: ${ratio.toFixed(2)}:1`);
    if (ratio < MIN_RATIO) {
      console.error(`[verify-contrast-fixtures] ${label} is ${ratio.toFixed(2)}:1 (need ${MIN_RATIO}:1)`);
      failed = true;
    }
  }

  if (failed) process.exit(1);
  console.log('[verify-contrast-fixtures] OK —', rows.join('; '));
}

main();
