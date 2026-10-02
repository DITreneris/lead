'use strict';

/**
 * Fail CI on font-size below 12px, and on font-size above 32px outside
 * the §4 display allowlist. Lesson headings must use their role token
 * (h1 → --font-size-hero, h2 → --font-size-title, essence/CTA → --font-size-display).
 * Scans lesson + satellite component CSS.
 *
 * Each style rule is checked on its own (including rules nested in
 * @media / @supports). Lengths inside clamp(), min(), and max() count.
 * em and rem are judged at a 16px root. `--font-size-*` custom properties are expanded.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILES = ['index.html', '404.html', 'tools.html', 'tools-lt.html'];
const TOKENS = path.join(ROOT, 'styles', 'tokens.css');
const ROOT_PX = 16;
const FLOOR_PX = 12;
const DISPLAY_MAX_PX = 32;

function loadFontSizeTokens() {
  const map = new Map();
  const css = fs.readFileSync(TOKENS, 'utf8');
  const re = /(--font-size-[a-z0-9-]*)\s*:\s*([^;]+);/gi;
  let match;
  while ((match = re.exec(css)) !== null) {
    map.set(match[1], match[2].trim());
  }
  return map;
}

const FONT_SIZE_TOKENS = loadFontSizeTokens();

function expandFontSize(value) {
  const m = String(value)
    .trim()
    .match(/^var\(\s*(--font-size-[a-z0-9-]*)\s*\)$/i);
  if (m && FONT_SIZE_TOKENS.has(m[1])) return FONT_SIZE_TOKENS.get(m[1]);
  return value;
}

const ALLOWED_CONTEXT =
  /(?:^|,)\s*(?:[#.][\w-]+\s+)*(?:h1|h2(?:\.essence-tagline|\.cta-title)?|\.hero-title-accent|\.header-title)\b/;

/** Heading subjects whose font-size must be one role token, never a raw clamp. */
const RHYTHM_ROLES = [
  { subject: 'h1', token: '--font-size-hero' },
  { subject: 'h2', token: '--font-size-title' },
  { subject: 'h2.essence-tagline', token: '--font-size-display' },
  { subject: 'h2.cta-title', token: '--font-size-display' }
];

function extractComponentCss(html) {
  const m = html.match(/<style>([\s\S]*?)<\/style>/i);
  if (!m) return '';
  let css = m[1];
  const end = css.indexOf('/* DS_TOKENS_END */');
  if (end >= 0) css = css.slice(end + '/* DS_TOKENS_END */'.length);
  return css;
}

function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

function isDisplayRole(selector) {
  const flat = selector.replace(/\s+/g, ' ').trim();
  return ALLOWED_CONTEXT.test(flat);
}

function absolutePx(value) {
  const lengths = [];
  const re = /(\d+(?:\.\d+)?)(px|rem|em)\b/gi;
  let match;
  while ((match = re.exec(value)) !== null) {
    const n = parseFloat(match[1]);
    const unit = match[2].toLowerCase();
    lengths.push(unit === 'px' ? n : n * ROOT_PX);
  }
  return lengths;
}

function forEachStyleRule(css, fn) {
  const src = stripComments(css);
  const stack = [];
  let cursor = 0;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (ch === '{') {
      stack.push({ prelude: src.slice(cursor, i).trim(), bodyStart: i + 1 });
      cursor = i + 1;
    } else if (ch === '}') {
      const frame = stack.pop();
      if (!frame) continue;
      const prelude = frame.prelude.replace(/\s+/g, ' ').trim();
      if (prelude && prelude[0] !== '@') {
        fn(prelude, src.slice(frame.bodyStart, i));
      }
      cursor = i + 1;
    }
  }
}

function collectFailures(rel, css) {
  const failures = [];
  forEachStyleRule(css, (selector, body) => {
    const allowed = isDisplayRole(selector);
    const sizeRe = /font-size\s*:\s*([^;}{]+)/gi;
    let match;
    while ((match = sizeRe.exec(body)) !== null) {
      const lengths = absolutePx(expandFontSize(match[1]));
      if (!lengths.length) continue;
      const min = Math.min.apply(null, lengths);
      const max = Math.max.apply(null, lengths);
      const sel = selector.slice(0, 80) || '(block)';
      if (min < FLOOR_PX) {
        failures.push(`${rel}: font-size can render ${min}px, below ${FLOOR_PX}px floor — ${sel}`);
      } else if (max > DISPLAY_MAX_PX && !allowed) {
        failures.push(`${rel}: font-size can render ${max}px outside §4 roles — ${sel}`);
      }
    }
  });
  return failures;
}

function selectorSubjects(selector) {
  return selector
    .split(',')
    .map((part) => part.trim().split(/\s+/).pop())
    .filter(Boolean);
}

function collectRhythmFailures(rel, css) {
  if (rel !== 'index.html') return [];
  const failures = [];
  forEachStyleRule(css, (selector, body) => {
    const sizeRe = /font-size\s*:\s*([^;}{]+)/gi;
    let match;
    while ((match = sizeRe.exec(body)) !== null) {
      const value = match[1].trim();
      for (const subject of selectorSubjects(selector)) {
        const role = RHYTHM_ROLES.find((item) => item.subject === subject);
        if (!role) continue;
        const expected = 'var(' + role.token + ')';
        if (value.replace(/\s+/g, '') !== expected) {
          failures.push(
            `${rel}: ${subject} font-size must be ${expected} — got ${value}`
          );
        }
      }
    }
  });
  return failures;
}

function rhythmSelfCheck() {
  const bad = [
    'h1 { font-size: clamp(48px, 12vw, 80px); }',
    'h2 { font-size: var(--font-size-title); }',
    'h2.cta-title { font-size: clamp(44px, 7vw, 104px); }'
  ].join('\n');
  const good = [
    'h1 { font-size: var(--font-size-hero); }',
    '#intro h1 { line-height: 1.12; }',
    'h2.essence-tagline { font-size: var(--font-size-display); }'
  ].join('\n');
  const problems = [];
  const badText = collectRhythmFailures('index.html', bad).join('\n');
  const goodText = collectRhythmFailures('index.html', good).join('\n');
  if (!/h1 font-size must be var\(--font-size-hero\)/.test(badText)) {
    problems.push('missed raw clamp on h1');
  }
  if (!/h2\.cta-title font-size must be var\(--font-size-display\)/.test(badText)) {
    problems.push('missed raw clamp on h2.cta-title');
  }
  if (/h2 font-size must be/.test(badText)) problems.push('flagged h2 on the title token');
  if (goodText) problems.push('flagged a heading already on its role token');
  if (problems.length) {
    console.error('[verify-typography-roles] rhythm self-check failed');
    problems.forEach((line) => console.error('  ' + line));
    if (badText) console.error(badText);
    if (goodText) console.error(goodText);
    process.exit(1);
  }
}

function selfCheck() {
  const css = [
    '.primer-next-cta { font-size: clamp(11px, 0.85vw, 12px); }',
    'h2 { font-size: clamp(36px, 4.2vw, 56px); }',
    '.ok { font-size: var(--font-size-label); }',
    '.legal { font-size: 0.92em; }',
    '.banner { font-size: clamp(20px, 4vw, 40px); }',
    '.floor { font-size: 0.7em; }',
    '@media (max-width: 400px) {',
    '  h1 { font-size: clamp(48px, 12vw, 80px); }',
    '  .tiny { font-size: 10px; }',
    '}'
  ].join('\n');
  const text = collectFailures('fixture.css', css).join('\n');
  const problems = [];
  if (!/11px/.test(text)) problems.push('missed clamp() minimum of 11px');
  if (!/10px/.test(text)) problems.push('missed 10px nested in @media');
  if (!/40px/.test(text)) problems.push('missed clamp() maximum of 40px');
  if (!/11\.2px/.test(text)) problems.push('missed 0.7em at a 16px root');
  if (/\bh2\b/.test(text)) problems.push('flagged display h2');
  if (/\bh1\b/.test(text)) problems.push('flagged display h1 inside @media');
  if (/legal/.test(text)) problems.push('flagged 0.92em');
  if (/\.ok\b/.test(text)) problems.push('flagged var(--font-size-label)');
  if (problems.length) {
    console.error('[verify-typography-roles] self-check failed');
    problems.forEach((line) => console.error('  ' + line));
    if (text) console.error(text);
    process.exit(1);
  }
}

function main() {
  selfCheck();
  rhythmSelfCheck();
  const failures = [];

  for (const rel of FILES) {
    const filePath = path.join(ROOT, rel);
    if (!fs.existsSync(filePath)) continue;
    const css = extractComponentCss(fs.readFileSync(filePath, 'utf8'));
    failures.push.apply(failures, collectFailures(rel, css));
    failures.push.apply(failures, collectRhythmFailures(rel, css));
  }

  if (failures.length) {
    console.error('[verify-typography-roles] FAIL');
    failures.forEach((line) => console.error('  ' + line));
    process.exit(1);
  }

  console.log('[verify-typography-roles] OK — floor, display ceiling, and heading role tokens.');
}

main();
