'use strict';

/**
 * Generates GitHub Pages artifact under site/:
 *   site/index.html   — EN (primary), canonical /
 *   site/lt/index.html — LT, canonical /lt/
 *   robots.txt, sitemap.xml — absoliutūs URL pagal PUBLIC_ORIGIN (+ BASE_PATH jei nustatyta)
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
/** Interactive lesson canonical host (social meta, sitemap). Override: PUBLIC_ORIGIN. Mother brand: www.promptanatomy.app (links in body). */
const ORIGIN = (process.env.PUBLIC_ORIGIN || 'https://promptanatomy.cloud').replace(/\/$/, '');
/** Cache-busting param for social crawlers (Twitter/X, Facebook/Meta). */
const OG_IMAGE_VERSION = (process.env.OG_IMAGE_VERSION || '2026-04-30').trim();
/** Vercel sets this during builds on Vercel; omit analytics on GitHub Pages / local to avoid broken /_vercel paths under project URLs. */
const VERCEL_BUILD = process.env.VERCEL === '1';

function escapeRegExp(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

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
    .replace(/src="assets\//g, 'src="../assets/')
    .replace(/href="favicon\.svg"/g, 'href="../favicon.svg"');
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

function applySocialImageVersion(html) {
  if (!OG_IMAGE_VERSION) return html;
  const v = encodeURIComponent(OG_IMAGE_VERSION);
  const base = originUrl('/assets/og-promptanatomy.png');
  const versioned = `${base}?v=${v}`;
  const patterns = [
    ['<meta property="og:image" content="', '<meta property="og:image" content="'],
    ['<meta property="og:image:secure_url" content="', '<meta property="og:image:secure_url" content="'],
    ['<meta name="twitter:image" content="', '<meta name="twitter:image" content="']
  ];
  let h = html;
  for (const [needlePrefix] of patterns) {
    const re = new RegExp(`${escapeRegExp(needlePrefix)}[^"]*"`, 'g');
    h = h.replace(re, (m) => {
      // Keep original tag prefix, just set content to canonical versioned URL.
      const prefix = m.split(/content="/)[0] + 'content="';
      return `${prefix}${versioned}"`;
    });
  }
  return h;
}

/**
 * Vercel Web Analytics (https://vercel.com/docs/analytics). Uses the HTML snippet pattern;
 * dependency `@vercel/analytics` is installed for version alignment; script is injected here so
 * static HTML works without a bundler.
 */
function injectVercelWebAnalytics(html) {
  if (!VERCEL_BUILD) return html;
  const snippet = `    <script>
      window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    </script>
    <script defer src="/_vercel/insights/script.js"></script>`;
  return html.replace('</head>', `${snippet}\n</head>`);
}

/**
 * LT page content stays Lithuanian; Open Graph / Twitter preview fields use English so og:image
 * and shared cards match international English artwork and copy (same PNG as EN build).
 */
function applyLtSocialEnglish(html) {
  const pairs = [
    [
      '<meta property="og:title" content="Promptų anatomija — darbui ir vadovavimui">',
      '<meta property="og:title" content="Prompt Anatomy — for work and leadership">'
    ],
    [
      '<meta property="og:description" content="DI praktinė sistema įmonei: biblioteka, schema, greita patikra ir trumpas quiz — mažiau taisymo, daugiau kontrolės.">',
      '<meta property="og:description" content="A practical AI prompt framework for leaders: structure, quick send check, and a copy-ready library — less rework, more control.">'
    ],
    [
      '<meta property="og:site_name" content="Promptų anatomija">',
      '<meta property="og:site_name" content="Prompt Anatomy">'
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
  let h = html;
  for (const [from, to] of pairs) {
    if (!h.includes(from)) {
      console.warn('[build] LT social EN fragment not found:', from.slice(0, 72));
    }
    h = h.split(from).join(to);
  }
  return h;
}

function injectJsonLdForPage(html, { pageUrl, pageLanguage, pageName, faq }) {
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
        '@type': 'WebPage',
        name: pageName,
        url: pageUrl,
        inLanguage: pageLanguage,
        isPartOf: {
          '@type': 'WebSite',
          url: originUrl('/')
        }
      },
      ...(Array.isArray(faq) && faq.length
        ? [
            {
              '@type': 'FAQPage',
              url: pageUrl,
              inLanguage: pageLanguage,
              mainEntity: faq.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.a
                }
              }))
            }
          ]
        : []),
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
      '<meta name="description" content="A practical AI prompt framework for leaders: structure, quick send check, and a copy-ready library — less rework, more control.">'
    ],
    [
      '<meta property="og:title" content="Promptų anatomija — darbui ir vadovavimui">',
      '<meta property="og:title" content="Prompt Anatomy — for work and leadership">'
    ],
    [
      '<meta property="og:description" content="DI praktinė sistema įmonei: biblioteka, schema, greita patikra ir trumpas quiz — mažiau taisymo, daugiau kontrolės.">',
      '<meta property="og:description" content="A practical AI prompt framework for leaders: structure, quick send check, and a copy-ready library — less rework, more control.">'
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
      '<meta name="twitter:description" content="A practical AI prompt framework for leaders: structure, quick send check, and a copy-ready library — less rework, more control.">'
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
  h = applyLtSocialEnglish(h);
  h = injectJsonLdForPage(h, {
    pageUrl: canonicalHref,
    pageLanguage: 'lt-LT',
    pageName: 'Promptų anatomija — darbui ir vadovavimui'
  });
  h = applySocialImageVersion(h);
  h = injectVercelWebAnalytics(h);
  return h;
}

function buildEn(html) {
  let h = injectPageLocale(html, 'en');
  h = injectHreflangBlock(h, originUrl('/'));
  h = applyEnHead(h);
  h = applyEnBodyPairs(h);
  h = injectJsonLdForPage(h, {
    pageUrl: originUrl('/'),
    pageLanguage: 'en-US',
    pageName: 'Prompt Anatomy — for work and leadership',
    faq: [
      {
        q: 'What should I include in a prompt for leadership updates?',
        a: 'Audience, context, constraints, and the exact output format (bullets, table, decision memo). Add success criteria.'
      },
      {
        q: 'How do I reduce hallucinated facts in client emails?',
        a: 'Paste source notes, ask for citations/quotes, and run a quick send check: what’s safe, what must be verified.'
      },
      {
        q: 'What’s a quick send check?',
        a: 'A 30-second risk review before you send: facts, missing context, and 2–3 reputational risks.'
      },
      {
        q: 'How do I get consistent outputs across my team?',
        a: 'Use one shared template (role + context + reasoning + output), then iterate with the same checklist.'
      }
    ]
  });
  h = applySocialImageVersion(h);
  h = injectVercelWebAnalytics(h);
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
