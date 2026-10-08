'use strict';

/**
 * Verify social meta stability:
 * - site/index.html and site/lt/index.html must use versioned OG/Twitter image URLs (?v=...)
 * - assets/og-promptanatomy.png must be 1200×630 (matches meta tags)
 * - og:description and twitter:description share SOCIAL_DESCRIPTION_EN (≤125)
 * - meta description stays META_DESCRIPTION_EN on EN and META_DESCRIPTION_LT on LT
 */
const fs = require('fs');
const path = require('path');

const {
  META_DESCRIPTION_EN,
  META_DESCRIPTION_LT,
  SOCIAL_DESCRIPTION_EN
} = require('./build-locale-pages');

const ROOT = path.join(__dirname, '..');
const EN_HTML = path.join(ROOT, 'site', 'index.html');
const LT_HTML = path.join(ROOT, 'site', 'lt', 'index.html');
const OG_PNG = path.join(ROOT, 'assets', 'og-promptanatomy.png');
const SOCIAL_DESCRIPTION_MAX = 125;

function readFileOrFail(p) {
  if (!fs.existsSync(p)) {
    console.error('[verify-social-meta] Missing', p);
    process.exit(1);
  }
  return fs.readFileSync(p);
}

function extractMetaContent(html, attrName, attrValue) {
  const esc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(
    `<meta\\s+[^>]*\\b${esc(attrName)}="${esc(attrValue)}"[^>]*\\bcontent="([^"]+)"[^>]*>`,
    'i'
  );
  const m = html.match(re);
  return m ? m[1] : '';
}

function expectVersioned(url, label) {
  if (!url) {
    console.error('[verify-social-meta] Missing', label);
    process.exit(1);
  }
  if (!/[?&]v=/.test(url)) {
    console.error('[verify-social-meta] Expected versioned URL (?v=...) for', label, 'got:', url);
    process.exit(1);
  }
}

function readPngSize(buf) {
  // PNG header:
  // 0..7 signature
  // 8..11 IHDR length
  // 12..15 'IHDR'
  // 16..19 width (BE)
  // 20..23 height (BE)
  if (buf.length < 24) return null;
  const sig = buf.slice(0, 8);
  const pngSig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (!sig.equals(pngSig)) return null;
  if (buf.toString('ascii', 12, 16) !== 'IHDR') return null;
  const w = buf.readUInt32BE(16);
  const h = buf.readUInt32BE(20);
  return { w, h };
}

function verifyPage(htmlPath, html) {
  const og = extractMetaContent(html, 'property', 'og:image');
  const ogSecure = extractMetaContent(html, 'property', 'og:image:secure_url');
  const tw = extractMetaContent(html, 'name', 'twitter:image');

  expectVersioned(og, `${htmlPath} meta property="og:image"`);
  expectVersioned(ogSecure, `${htmlPath} meta property="og:image:secure_url"`);
  expectVersioned(tw, `${htmlPath} meta name="twitter:image"`);
}

function verifyDescriptions(htmlPath, html, metaDescription) {
  const og = extractMetaContent(html, 'property', 'og:description');
  const tw = extractMetaContent(html, 'name', 'twitter:description');
  const meta = extractMetaContent(html, 'name', 'description');

  if (og !== tw) {
    console.error('[verify-social-meta] og:description !== twitter:description on', htmlPath);
    process.exit(1);
  }
  if (og !== SOCIAL_DESCRIPTION_EN) {
    console.error('[verify-social-meta] social description mismatch on', htmlPath);
    process.exit(1);
  }
  if (SOCIAL_DESCRIPTION_EN.length > SOCIAL_DESCRIPTION_MAX) {
    console.error(
      '[verify-social-meta] social description is',
      SOCIAL_DESCRIPTION_EN.length,
      'characters; max is',
      SOCIAL_DESCRIPTION_MAX
    );
    process.exit(1);
  }
  if (meta !== metaDescription) {
    console.error('[verify-social-meta] meta description mismatch on', htmlPath);
    process.exit(1);
  }
}

function websiteName(html) {
  const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!m) return '';
  const graph = JSON.parse(m[1])['@graph'] || [];
  const site = graph.find((node) => node['@type'] === 'WebSite');
  return site ? site.name : '';
}

function expectEqual(actual, wanted, label) {
  if (actual !== wanted) {
    console.error(
      '[verify-social-meta]',
      label,
      'expected',
      JSON.stringify(wanted),
      'got',
      JSON.stringify(actual)
    );
    process.exit(1);
  }
}

function verifySiteNames(enHtml, ltHtml) {
  const shareTitle = 'Prompt Anatomy — for work and leadership';
  expectEqual(extractMetaContent(enHtml, 'property', 'og:site_name'), 'Prompt Anatomy', 'EN og:site_name');
  expectEqual(extractMetaContent(ltHtml, 'property', 'og:site_name'), 'Promptų Anatomija', 'LT og:site_name');
  expectEqual(extractMetaContent(enHtml, 'property', 'og:title'), shareTitle, 'EN og:title');
  expectEqual(extractMetaContent(ltHtml, 'property', 'og:title'), shareTitle, 'LT og:title');
  expectEqual(websiteName(enHtml), 'Prompt Anatomy', 'EN WebSite.name');
  expectEqual(websiteName(ltHtml), 'Promptų Anatomija', 'LT WebSite.name');
  if (!enHtml.includes('Training &amp; checkout')) {
    console.error('[verify-social-meta] EN entity footer is missing the escaped ampersand');
    process.exit(1);
  }
}

function main() {
  const enHtml = readFileOrFail(EN_HTML).toString('utf8');
  const ltHtml = readFileOrFail(LT_HTML).toString('utf8');

  verifyPage(EN_HTML, enHtml);
  verifyPage(LT_HTML, ltHtml);
  verifyDescriptions(EN_HTML, enHtml, META_DESCRIPTION_EN);
  verifyDescriptions(LT_HTML, ltHtml, META_DESCRIPTION_LT);
  verifySiteNames(enHtml, ltHtml);

  const pngBuf = readFileOrFail(OG_PNG);
  const size = readPngSize(pngBuf);
  if (!size) {
    console.error('[verify-social-meta] Could not parse PNG IHDR for', OG_PNG);
    process.exit(1);
  }
  if (size.w !== 1200 || size.h !== 630) {
    console.error('[verify-social-meta] OG PNG must be 1200×630. Got:', size.w + '×' + size.h);
    process.exit(1);
  }

  console.log(
    '[verify-social-meta] OK:',
    'versioned social images + 1200×630 PNG + social description',
    SOCIAL_DESCRIPTION_EN.length
  );
}

main();

