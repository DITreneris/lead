'use strict';

/**
 * Generates GitHub Pages artifact under site/:
 *   site/index.html   — LT, canonical /
 *   site/lt/index.html — LT, canonical /lt/
 *   site/en/index.html — EN (replacements + head)
 */
const fs = require('fs');
const path = require('path');
const { getEnHtmlReplacementPairs } = require('./en-html-replacements.cjs');

const ROOT = path.join(__dirname, '..');
const SRC_HTML = path.join(ROOT, 'index.html');
const SITE_DIR = path.join(ROOT, 'site');

const BASE = (process.env.BASE_PATH || '').replace(/\/$/, '');
const ORIGIN = 'https://www.promptanatomy.app';

function originUrl(pathname) {
  const p = pathname.startsWith('/') ? pathname : '/' + pathname;
  return ORIGIN + BASE + p;
}

function stripCanonicalAndAlternates(html) {
  return html
    .replace(/<link rel="canonical"[^>]*>\s*/gi, '')
    .replace(/<link rel="alternate" hreflang="[^"]+" href="[^"]*">\s*/gi, '');
}

function injectPageLocale(html, locale) {
  if (/<meta name="page-locale"/i.test(html)) {
    return html.replace(
      /<meta name="page-locale" content="(lt|en)"/i,
      `<meta name="page-locale" content="${locale}"`
    );
  }
  return html.replace(
    '<meta charset="UTF-8">',
    `<meta charset="UTF-8">\n    <meta name="page-locale" content="${locale}">`
  );
}

function injectHreflangBlock(html, canonicalHref) {
  const block = `    <link rel="canonical" href="${canonicalHref}">
    <link rel="alternate" hreflang="lt" href="${originUrl('/lt/')}">
    <link rel="alternate" hreflang="en" href="${originUrl('/en/')}">
    <link rel="alternate" hreflang="x-default" href="${originUrl('/lt/')}">`;
  const stripped = stripCanonicalAndAlternates(html);
  return stripped.replace(
    /(<meta name="viewport" content="width=device-width, initial-scale=1.0">)/i,
    `$1\n${block}`
  );
}

function fixSubdirAssetPaths(html) {
  return html
    .replace(/href="assets\//g, 'href="/assets/')
    .replace(/src="assets\//g, 'src="/assets/');
}

function applyEnHead(html) {
  let h = html.replace('<html lang="lt">', '<html lang="en">');
  const headPairs = [
    ['<title>Promptų anatomija — darbui ir vadovavimui</title>', '<title>Prompt Anatomy — for work and leadership</title>'],
    [
      '<meta name="description" content="DI praktinė sistema įmonei: biblioteka, schema, greita patikra ir trumpas quiz — mažiau taisymo, daugiau kontrolės.">',
      '<meta name="description" content="A practical AI prompt system for teams: library, schema, quick send check, short quiz — less rework, more control.">'
    ],
    [
      '<meta property="og:title" content="Promptų anatomija — darbui ir vadovavimui">',
      '<meta property="og:title" content="Prompt Anatomy — for work and leadership">'
    ],
    [
      '<meta property="og:description" content="DI praktinė sistema įmonei: biblioteka, schema, greita patikra ir trumpas quiz — mažiau taisymo, daugiau kontrolės.">',
      '<meta property="og:description" content="A practical AI prompt system for teams: library, schema, quick send check, short quiz — less rework, more control.">'
    ],
    ['<meta property="og:url" content="https://www.promptanatomy.app/">', '<meta property="og:url" content="https://www.promptanatomy.app/en/">'],
    ['<meta property="og:locale" content="lt_LT">', '<meta property="og:locale" content="en_US">'],
    [
      '<meta property="og:image:alt" content="Promptų anatomija — DI praktinė sistema įmonei">',
      '<meta property="og:image:alt" content="Prompt Anatomy — practical AI system for teams">'
    ],
    [
      '<meta name="twitter:title" content="Promptų anatomija — darbui ir vadovavimui">',
      '<meta name="twitter:title" content="Prompt Anatomy — for work and leadership">'
    ],
    [
      '<meta name="twitter:description" content="DI praktinė sistema įmonei: biblioteka, schema, greita patikra ir trumpas quiz — mažiau taisymo, daugiau kontrolės.">',
      '<meta name="twitter:description" content="A practical AI prompt system for teams: library, schema, quick send check, short quiz — less rework, more control.">'
    ]
  ];
  for (const [from, to] of headPairs) {
    if (!h.includes(from)) {
      console.warn('[build] EN head fragment not found:', from.slice(0, 72));
    }
    h = h.split(from).join(to);
  }
  return h;
}

function applyEnBodyPairs(html) {
  let h = html;
  const pairs = getEnHtmlReplacementPairs();
  for (let i = 0; i < pairs.length; i++) {
    const [from, to] = pairs[i];
    if (!h.includes(from)) {
      console.warn('[build] EN pair', i, 'LT fragment missing:', String(from).slice(0, 80));
      continue;
    }
    h = h.split(from).join(to);
  }
  return h;
}

function buildLt(html, canonicalHref) {
  let h = injectPageLocale(html, 'lt');
  h = injectHreflangBlock(h, canonicalHref);
  return h;
}

function buildEn(html) {
  let h = injectPageLocale(html, 'en');
  h = injectHreflangBlock(h, originUrl('/en/'));
  h = applyEnHead(h);
  h = applyEnBodyPairs(h);
  return h;
}

function main() {
  const raw = fs.readFileSync(SRC_HTML, 'utf8');

  fs.mkdirSync(path.join(SITE_DIR, 'lt'), { recursive: true });
  fs.mkdirSync(path.join(SITE_DIR, 'en'), { recursive: true });

  const rootLt = buildLt(raw, originUrl('/'));
  const ltPage = fixSubdirAssetPaths(buildLt(raw, originUrl('/lt/')));
  const enPage = fixSubdirAssetPaths(buildEn(raw));

  fs.writeFileSync(path.join(SITE_DIR, 'index.html'), rootLt, 'utf8');
  fs.writeFileSync(path.join(SITE_DIR, 'lt', 'index.html'), ltPage, 'utf8');
  fs.writeFileSync(path.join(SITE_DIR, 'en', 'index.html'), enPage, 'utf8');

  console.log('Wrote site/index.html, site/lt/index.html, site/en/index.html');
}

main();
