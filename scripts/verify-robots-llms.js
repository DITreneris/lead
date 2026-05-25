'use strict';

const fs = require('fs');
const path = require('path');

const { SITE_DIR, ROOT, ORIGIN } = require('./site-build-config');

const REQUIRED_ROBOTS = [
  'Content-Signal',
  'GPTBot',
  'ClaudeBot',
  'PerplexityBot',
  'Google-Extended',
  'CCBot',
  'Bytespider',
  'Sitemap:'
];

function readOrFail(rel) {
  const p = path.join(SITE_DIR, rel);
  if (!fs.existsSync(p)) {
    console.error('[verify-robots-llms] Missing', p);
    process.exit(1);
  }
  return fs.readFileSync(p, 'utf8');
}

function main() {
  const robots = readOrFail('robots.txt');
  for (const needle of REQUIRED_ROBOTS) {
    if (!robots.includes(needle)) {
      console.error('[verify-robots-llms] robots.txt missing:', needle);
      process.exit(1);
    }
  }

  const llms = readOrFail('llms.txt');
  if (!llms.startsWith('# Prompt Anatomy')) {
    console.error('[verify-robots-llms] llms.txt must start with H1');
    process.exit(1);
  }
  if (!llms.includes('llms-full.txt') || !llms.includes(ORIGIN)) {
    console.error('[verify-robots-llms] llms.txt must link llms-full and use PUBLIC_ORIGIN');
    process.exit(1);
  }

  const full = readOrFail('llms-full.txt');
  if (!full.includes('lib_qualityCheck') || full.length < 2000) {
    console.error('[verify-robots-llms] llms-full.txt too small or missing lib_qualityCheck');
    process.exit(1);
  }

  readOrFail('pricing.md');
  readOrFail('security.txt');

  const agentPath = path.join(SITE_DIR, '.well-known', 'agent.json');
  if (!fs.existsSync(agentPath)) {
    console.error('[verify-robots-llms] Missing', agentPath);
    process.exit(1);
  }
  JSON.parse(fs.readFileSync(agentPath, 'utf8'));

  const enHtml = readOrFail('index.html');
  const ltHtml = readOrFail(path.join('lt', 'index.html'));
  if (!enHtml.includes('"@type":"Organization"') || !enHtml.includes('"logo"')) {
    console.error('[verify-robots-llms] site/index.html JSON-LD missing Organization logo');
    process.exit(1);
  }
  if (!ltHtml.includes('"@type":"LearningResource"')) {
    console.error('[verify-robots-llms] site/lt/index.html JSON-LD missing LearningResource');
    process.exit(1);
  }

  if (!enHtml.includes('type="text/markdown"') || !enHtml.includes('llms.txt')) {
    console.error('[verify-robots-llms] EN head missing llms.txt alternate link');
    process.exit(1);
  }

  const sitemap = readOrFail('sitemap.xml');
  if (!sitemap.includes('<lastmod>') || !sitemap.includes('www.promptanatomy.app-en.pdf')) {
    console.error('[verify-robots-llms] sitemap.xml missing lastmod or PDF URLs');
    process.exit(1);
  }

  const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const enLib = fs.readFileSync(path.join(ROOT, 'assets', 'prompt-library-en.js'), 'utf8');
  const keyRe = /\bdata-(?:emp|mgr)-key="([^"]+)"/g;
  const keys = new Set();
  let m;
  while ((m = keyRe.exec(indexHtml)) !== null) keys.add(m[1]);
  for (const k of keys) {
    if (!full.includes(`### ${k}`)) {
      console.error('[verify-robots-llms] llms-full.txt missing library key from HTML:', k);
      process.exit(1);
    }
    if (!enLib.includes(k)) {
      console.error('[verify-robots-llms] EN library source missing key:', k);
      process.exit(1);
    }
  }

  console.log('[verify-robots-llms] OK');
}

main();
