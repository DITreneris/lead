'use strict';

/**
 * Single color source for baked illustrations.
 * Reads styles/tokens.css, resolves var() aliases, exports the bake map.
 * Used by build-illustrations.mjs and verify-illustration-colors.js.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TOKENS_PATH = path.join(ROOT, 'styles', 'tokens.css');

const BAKE_KEYS = {
  navy: '--bg-dark',
  navy2: '--primary-blue',
  surface: '--surface-stage',
  card: '--surface-stage-card',
  cardLight: '--surface-light',
  lightBar: '--surface-light-bar',
  ink: '--text-ink',
  inkMuted: '--text-ink-muted',
  inkFaint: '--text-ink-faint',
  inkMid: '--text-ink-mid',
  text: '--text-body',
  textMuted: '--text-muted',
  yellow: '--accent-yellow',
  red: '--accent-red',
  teal: '--accent-teal',
  line: '--border',
  onAccent: '--text-on-accent',
  yellowSubtle: '--accent-yellow-bg-subtle',
  yellowEmphasis: '--accent-yellow-bg-emphasis',
  yellowStrong: '--accent-yellow-border-strong',
  yellowGlow: '--accent-yellow-bg-glow',
  navyWash: '--primary-blue-wash'
};

function extractRootBlock(css) {
  const m = css.match(/:root\s*\{([\s\S]*)\}/);
  if (!m) throw new Error('No :root block in styles/tokens.css');
  return m[1];
}

function parseTokenValues(css) {
  const map = new Map();
  const re = /(--[a-z][a-z0-9-]*)\s*:\s*([^;]+);/gi;
  let match;
  while ((match = re.exec(css)) !== null) {
    map.set(match[1], match[2].trim().replace(/\s+/g, ' '));
  }
  return map;
}

function resolveValue(name, map, seen) {
  const raw = map.get(name);
  if (raw == null) throw new Error(`Missing token ${name}`);
  const ref = raw.match(/^var\(\s*(--[a-z][a-z0-9-]*)\s*\)$/i);
  if (!ref) return raw;
  if (seen.has(name)) throw new Error(`Circular token ${name}`);
  seen.add(name);
  return resolveValue(ref[1], map, seen);
}

function resolveAll(map) {
  const out = new Map();
  for (const name of map.keys()) {
    out.set(name, resolveValue(name, map, new Set()));
  }
  return out;
}

function normalizeColor(value) {
  const s = String(value).trim().toLowerCase();
  const hex = s.match(/^#([0-9a-f]{3,8})$/);
  if (hex) {
    const h = hex[1];
    if (h.length === 3) {
      return `#${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`;
    }
    if (h.length === 4) {
      return `#${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}`;
    }
    return `#${h}`;
  }
  const rgba = s.match(
    /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/
  );
  if (rgba) {
    const r = Number(rgba[1]);
    const g = Number(rgba[2]);
    const b = Number(rgba[3]);
    const a = rgba[4] == null ? 1 : Number(rgba[4]);
    return `rgba(${r},${g},${b},${a})`;
  }
  return null;
}

function collectColorAtoms(resolved) {
  const atoms = new Set();
  const colorRe = /#([0-9a-f]{3,8})\b|rgba?\(\s*[\d.]+(?:\s*,\s*[\d.]+){2,3}\s*\)/gi;
  for (const value of resolved.values()) {
    const whole = normalizeColor(value);
    if (whole) atoms.add(whole);
    let match;
    colorRe.lastIndex = 0;
    while ((match = colorRe.exec(value)) !== null) {
      const atom = normalizeColor(match[0]);
      if (atom) atoms.add(atom);
    }
  }
  return atoms;
}

function loadResolvedTokens(rootDir) {
  const tokensPath = path.join(rootDir || ROOT, 'styles', 'tokens.css');
  const css = fs.readFileSync(tokensPath, 'utf8');
  return resolveAll(parseTokenValues(extractRootBlock(css)));
}

function getIllustrationColors(rootDir) {
  const resolved = loadResolvedTokens(rootDir);
  const colors = {};
  for (const [key, token] of Object.entries(BAKE_KEYS)) {
    if (!resolved.has(token)) throw new Error(`Bake map missing ${token} (${key})`);
    colors[key] = resolved.get(token);
  }
  return colors;
}

module.exports = {
  ROOT,
  TOKENS_PATH,
  BAKE_KEYS,
  extractRootBlock,
  parseTokenValues,
  resolveAll,
  normalizeColor,
  collectColorAtoms,
  loadResolvedTokens,
  getIllustrationColors
};
