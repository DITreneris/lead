'use strict';

/**
 * After build-locale-pages.js: mirror GitHub Pages artifact layout —
 * static assets at site root so /assets/… and favicon work when deploying site/ only (e.g. Vercel).
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = path.join(ROOT, 'site');

const PUBLIC_FILES = [
  '404.html',
  'tools.html',
  'tools-lt.html',
  'favicon.svg',
  'google7305663b2567346e.html',
  path.join('assets', 'og-promptanatomy.png'),
  path.join('assets', 'prompt-library-en.js'),
  path.join('assets', 'www.promptanatomy.app.pdf'),
  path.join('assets', 'www.promptanatomy.app-en.pdf'),
  path.join('assets', 'memes', 'meme-after-roadmap.png'),
  path.join('assets', 'memes', 'su_1.png'),
  path.join('assets', 'memes', 'su_2.png'),
  // Lesson illustrations (tracked outputs of `npm run build:illustrations`).
  ...['check', 'meeting', 'levels', 'feedback', 'team', 'letter'].flatMap((slug) =>
    ['lt', 'en'].flatMap((locale) => [
      path.join('assets', 'illustrations', `${slug}-${locale}.png`),
      path.join('assets', 'illustrations', `${slug}-${locale}.webp`)
    ])
  )
];

function copyIntoSite(relFromRoot) {
  const src = path.join(ROOT, relFromRoot);
  const dest = path.join(SITE, relFromRoot);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function main() {
  if (!fs.existsSync(SITE)) {
    console.error('[prepare-site-artifact] site/ missing; run build-locale-pages first.');
    process.exit(1);
  }
  for (const rel of PUBLIC_FILES) copyIntoSite(rel);
  console.log(
    `[prepare-site-artifact] Copied ${PUBLIC_FILES.length} public files → site/`
  );
}

main();
