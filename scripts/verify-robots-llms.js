'use strict';

const fs = require('fs');
const path = require('path');

const { SITE_DIR, ROOT, ORIGIN, LESSON_DATE_PUBLISHED, sitemapLastmod } = require('./site-build-config');
const { extractHeroFaq, parseJsonLdFaq, faqListsMatch } = require('./hero-faq-utils');

const REQUIRED_ROBOTS = [
  'Content-Signal',
  'GPTBot',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-SearchBot',
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

function verifyHeroFaqParity(htmlPath, locale) {
  const html = readOrFail(htmlPath);
  const visible = extractHeroFaq(html, locale);
  const schema = parseJsonLdFaq(html);
  if (!faqListsMatch(visible, schema)) {
    console.error('[verify-robots-llms] FAQ JSON-LD drift on', htmlPath);
    process.exit(1);
  }
}

function verifySitemapLastmod(sitemap) {
  const matches = sitemap.match(/<lastmod>([^<]+)<\/lastmod>/g);
  if (!matches || !matches.length) {
    console.error('[verify-robots-llms] sitemap.xml missing lastmod');
    process.exit(1);
  }
  const lastmods = matches.map((m) => m.replace(/<\/?lastmod>/g, ''));
  const expected = sitemapLastmod();
  const today = new Date().toISOString().slice(0, 10);
  for (const lastmod of lastmods) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) {
      console.error('[verify-robots-llms] invalid lastmod format:', lastmod);
      process.exit(1);
    }
    if (lastmod < LESSON_DATE_PUBLISHED || lastmod > today) {
      console.error('[verify-robots-llms] lastmod out of range:', lastmod);
      process.exit(1);
    }
    if (lastmod !== expected) {
      console.error('[verify-robots-llms] lastmod mismatch; expected', expected, 'got', lastmod);
      process.exit(1);
    }
  }
  if (lastmods.some((lastmod) => lastmod === LESSON_DATE_PUBLISHED && expected !== LESSON_DATE_PUBLISHED)) {
    console.error('[verify-robots-llms] lastmod still frozen at datePublished while build date is newer');
    process.exit(1);
  }
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
  if (!llms.includes('info@promptanatomy.app') || !llms.includes('Alameda')) {
    console.error('[verify-robots-llms] llms.txt missing legal entity block');
    process.exit(1);
  }

  const full = readOrFail('llms-full.txt');
  if (!full.includes('lib_qualityCheck') || full.length < 2000) {
    console.error('[verify-robots-llms] llms-full.txt too small or missing lib_qualityCheck');
    process.exit(1);
  }

  readOrFail('pricing.md');
  const securityRoot = readOrFail('security.txt');
  const securityWellKnown = readOrFail(path.join('.well-known', 'security.txt'));
  if (!securityWellKnown.includes('Canonical:') || !securityWellKnown.includes('/.well-known/security.txt')) {
    console.error('[verify-robots-llms] .well-known/security.txt missing Canonical /.well-known/security.txt');
    process.exit(1);
  }
  if (securityRoot !== securityWellKnown) {
    console.error('[verify-robots-llms] root security.txt must match .well-known/security.txt');
    process.exit(1);
  }

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
  if (!enHtml.includes('/favicon.svg')) {
    console.error('[verify-robots-llms] site/index.html JSON-LD logo must use favicon.svg');
    process.exit(1);
  }
  if (!enHtml.includes('94501') || !enHtml.includes('info@promptanatomy.app')) {
    console.error('[verify-robots-llms] site/index.html JSON-LD missing Organization address/email');
    process.exit(1);
  }
  if (!enHtml.includes('promptanatomy.pro/en/') || !enHtml.includes('promptanatomy.site/')) {
    console.error('[verify-robots-llms] site/index.html JSON-LD missing ecosystem sameAs');
    process.exit(1);
  }
  if (!enHtml.includes('"dateModified"') || !enHtml.includes('"datePublished"')) {
    console.error('[verify-robots-llms] site/index.html JSON-LD missing datePublished/dateModified');
    process.exit(1);
  }
  if (!ltHtml.includes('"@type":"LearningResource"')) {
    console.error('[verify-robots-llms] site/lt/index.html JSON-LD missing LearningResource');
    process.exit(1);
  }

  verifyHeroFaqParity('index.html', 'en');
  verifyHeroFaqParity(path.join('lt', 'index.html'), 'lt');

  if (!enHtml.includes('type="text/markdown"') || !enHtml.includes('llms.txt')) {
    console.error('[verify-robots-llms] EN head missing llms.txt alternate link');
    process.exit(1);
  }
  if (!enHtml.includes('info@promptanatomy.app') || !enHtml.includes('site-legal-footnote')) {
    console.error('[verify-robots-llms] EN page missing legal footnote / contact email');
    process.exit(1);
  }
  if (!ltHtml.includes('site-legal-footnote') || !ltHtml.includes('info@promptanatomy.app')) {
    console.error('[verify-robots-llms] LT page missing legal footnote / contact email');
    process.exit(1);
  }

  const sitemap = readOrFail('sitemap.xml');
  if (!sitemap.includes('<lastmod>') || !sitemap.includes('www.promptanatomy.app-en.pdf')) {
    console.error('[verify-robots-llms] sitemap.xml missing lastmod or PDF URLs');
    process.exit(1);
  }
  if (!sitemap.includes('xmlns:xhtml') || !sitemap.includes('hreflang="lt"') || !sitemap.includes('hreflang="en"')) {
    console.error('[verify-robots-llms] sitemap.xml missing xhtml hreflang annotations');
    process.exit(1);
  }
  if (sitemap.includes('/llms.txt') || sitemap.includes('/pricing.md')) {
    console.error('[verify-robots-llms] sitemap.xml must not list llms or pricing artifacts');
    process.exit(1);
  }
  const urlCount = (sitemap.match(/<url>/g) || []).length;
  if (urlCount !== 4) {
    console.error('[verify-robots-llms] sitemap.xml must contain exactly 4 URLs, got', urlCount);
    process.exit(1);
  }
  verifySitemapLastmod(sitemap);

  const toolsEn = readOrFail('tools.html');
  const toolsLt = readOrFail('tools-lt.html');
  if (!toolsEn.includes('noindex') || !toolsLt.includes('noindex')) {
    console.error('[verify-robots-llms] tools pages must include noindex');
    process.exit(1);
  }
  if (!toolsEn.includes('https://promptanatomy.cloud/') || !toolsLt.includes('https://promptanatomy.cloud/lt/')) {
    console.error('[verify-robots-llms] tools pages missing canonical to lesson');
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
