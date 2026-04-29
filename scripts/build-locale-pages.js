'use strict';

/**
 * Generates GitHub Pages artifact under site/:
 *   site/index.html   — EN (primary), canonical /
 *   site/lt/index.html — LT, canonical /lt/
 *   robots.txt, sitemap.xml — apex URLs (+ BASE_PATH if set)
 * Legacy /en/ is not generated; use server 301 /en/ → / on production.
 */
const fs = require('fs');
const path = require('path');
const { getEnHtmlReplacementPairs } = require('./en-html-replacements.cjs');

const ROOT = path.join(__dirname, '..');
const SRC_HTML = path.join(ROOT, 'index.html');
const SITE_DIR = path.join(ROOT, 'site');

const BASE = (process.env.BASE_PATH || '').replace(/\/$/, '');
/** GitHub Pages project URL prefix, e.g. `/lead` for https://user.github.io/lead/ — empty on apex domain. */
const SITE_PREFIX = (process.env.SITE_PREFIX || '').replace(/\/$/, '');
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
  const enUrl = originUrl('/');
  const ltUrl = originUrl('/lt/');
  const block = `    <link rel="canonical" href="${canonicalHref}">
    <link rel="alternate" hreflang="lt" href="${ltUrl}">
    <link rel="alternate" hreflang="en" href="${enUrl}">
    <link rel="alternate" hreflang="en-US" href="${enUrl}">
    <link rel="alternate" hreflang="x-default" href="${enUrl}">`;
  const stripped = stripCanonicalAndAlternates(html);
  return stripped.replace(
    /(<meta name="viewport" content="width=device-width, initial-scale=1.0">)/i,
    `$1\n${block}`
  );
}

/**
 * Subpages under /lt/ use relative ../assets/ so the same build works at domain root
 * and under a project path (github.io/repo/).
 */
function fixSubdirAssetPaths(html) {
  return html
    .replace(/href="assets\//g, 'href="../assets/')
    .replace(/src="assets\//g, 'src="../assets/');
}

function injectAppBasePathMeta(html) {
  if (!SITE_PREFIX) return html;
  return html.replace(
    /<meta name="app-base-path" content="">/,
    `<meta name="app-base-path" content="${SITE_PREFIX}">`
  );
}

function setOgUrl(html, absoluteUrl) {
  return html.replace(
    /<meta property="og:url" content="[^"]*">/,
    `<meta property="og:url" content="${absoluteUrl}">`
  );
}

function injectJsonLdPrimaryEn(html) {
  const payload = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'Prompt Anatomy',
        url: originUrl('/'),
        inLanguage: 'en-US'
      },
      {
        '@type': 'Organization',
        name: 'Prompt Anatomy',
        url: originUrl('/')
      }
    ]
  };
  const script = `    <script type="application/ld+json">${JSON.stringify(payload)}</script>`;
  return html.replace('</head>', `${script}\n</head>`);
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
    ['<meta property="og:locale" content="lt_LT">', '<meta property="og:locale" content="en_US">'],
    [
      '<meta property="og:site_name" content="Promptų anatomija">',
      '<meta property="og:site_name" content="Prompt Anatomy">'
    ],
    [
      '<meta property="og:locale:alternate" content="en_US">',
      '<meta property="og:locale:alternate" content="lt_LT">'
    ],
    [
      '<meta property="og:image:alt" content="Promptų anatomija — DI praktinė sistema įmonei">',
      '<meta property="og:image:alt" content="Prompt Anatomy — practical AI system for teams">'
    ],
    [
      '<meta name="twitter:image:alt" content="Promptų anatomija — DI praktinė sistema įmonei">',
      '<meta name="twitter:image:alt" content="Prompt Anatomy — practical AI system for teams">'
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
  h = setOgUrl(h, canonicalHref);
  return h;
}

function buildEn(html) {
  let h = injectPageLocale(html, 'en');
  h = injectHreflangBlock(h, originUrl('/'));
  h = applyEnHead(h);
  h = applyEnBodyPairs(h);
  h = injectJsonLdPrimaryEn(h);
  return h;
}

function writeRobotsAndSitemap() {
  const sitemapLoc = originUrl('/sitemap.xml');
  const robots = `User-agent: *
Allow: /

Sitemap: ${sitemapLoc}
`;
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${originUrl('/')}</loc></url>
  <url><loc>${originUrl('/lt/')}</loc></url>
</urlset>
`;
  fs.writeFileSync(path.join(SITE_DIR, 'robots.txt'), robots, 'utf8');
  fs.writeFileSync(path.join(SITE_DIR, 'sitemap.xml'), sitemap, 'utf8');
}

function main() {
  const raw = fs.readFileSync(SRC_HTML, 'utf8');

  fs.mkdirSync(path.join(SITE_DIR, 'lt'), { recursive: true });

  const rootEn = injectAppBasePathMeta(buildEn(raw));
  const ltPage = injectAppBasePathMeta(fixSubdirAssetPaths(buildLt(raw, originUrl('/lt/'))));

  fs.writeFileSync(path.join(SITE_DIR, 'index.html'), rootEn, 'utf8');
  fs.writeFileSync(path.join(SITE_DIR, 'lt', 'index.html'), ltPage, 'utf8');

  writeRobotsAndSitemap();

  console.log('Wrote site/index.html (EN), site/lt/index.html (LT), robots.txt, sitemap.xml');
}

main();
