'use strict';

/**
 * After build-locale-pages.js: mirror GitHub Pages artifact layout —
 * static assets at site root so /assets/… and favicon work when deploying site/ only (e.g. Vercel).
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = path.join(ROOT, 'site');

function copyIntoSite(relFromRoot) {
  const src = path.join(ROOT, relFromRoot);
  const dest = path.join(SITE, relFromRoot);
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.cpSync(src, dest, { recursive: true });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function main() {
  if (!fs.existsSync(SITE)) {
    console.error('[prepare-site-artifact] site/ missing; run build-locale-pages first.');
    process.exit(1);
  }
  copyIntoSite('404.html');
  copyIntoSite('favicon.svg');
  copyIntoSite('assets');
  console.log('[prepare-site-artifact] Copied 404.html, favicon.svg, assets/ → site/');
}

main();
