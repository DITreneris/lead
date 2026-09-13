'use strict';

/**
 * Outbound UTM canon: all spoke links use utm_source=cloud.
 * Fail if a stale source (lead / promptanatomy_app / promptanatomy_cloud) remains.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILES = [
  path.join(ROOT, 'index.html'),
  path.join(ROOT, 'site', 'index.html'),
  path.join(ROOT, 'site', 'lt', 'index.html')
];

const FORBIDDEN = [
  'utm_source=lead',
  'utm_source=promptanatomy_app',
  'utm_source=promptanatomy_cloud'
];

const DEST_BY_HOST = new Map([
  ['promptanatomy.app', 'app'],
  ['www.promptanatomy.app', 'app'],
  ['promptanatomy.pro', 'pro'],
  ['www.promptanatomy.pro', 'pro'],
  ['promptanatomy.site', 'site'],
  ['www.promptanatomy.site', 'site']
]);

function outboundAnchorTags(html) {
  return html.match(/<a\b[^>]*\bhref="https:\/\/[^"]+"[^>]*>/gi) || [];
}

let failed = false;

for (const file of FILES) {
  if (!fs.existsSync(file)) {
    console.error('[verify-utm-canon] Missing', file);
    failed = true;
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(ROOT, file);
  for (const needle of FORBIDDEN) {
    if (html.includes(needle)) {
      console.error('[verify-utm-canon] Forbidden', needle, 'in', rel);
      failed = true;
    }
  }
  let checked = 0;
  for (const tag of outboundAnchorTags(html)) {
    const hrefMatch = tag.match(/\bhref="([^"]+)"/i);
    if (!hrefMatch) continue;
    const href = hrefMatch[1].replace(/&amp;/g, '&');
    const url = new URL(href);
    const expectedDest = DEST_BY_HOST.get(url.hostname.toLowerCase());
    if (!expectedDest) continue;
    checked++;
    if (url.searchParams.get('utm_source') !== 'cloud') {
      console.error('[verify-utm-canon] Outbound link missing utm_source=cloud in', rel, href);
      failed = true;
    }
    if (!/\bdata-track="[^"]+"/i.test(tag)) {
      console.error('[verify-utm-canon] Outbound link missing data-track in', rel, href);
      failed = true;
    }
    const destMatch = tag.match(/\bdata-track-dest="([^"]+)"/i);
    if (!destMatch || destMatch[1] !== expectedDest) {
      console.error(
        '[verify-utm-canon] Outbound link has wrong data-track-dest in',
        rel,
        href,
        'expected',
        expectedDest
      );
      failed = true;
    }
  }
  if (!checked) {
    console.error('[verify-utm-canon] No tracked ecosystem outbound links found in', rel);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log('[verify-utm-canon] OK — every ecosystem outbound link is tracked with utm_source=cloud');
