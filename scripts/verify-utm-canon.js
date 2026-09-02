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
  if (!html.includes('utm_source=cloud')) {
    console.error('[verify-utm-canon] Expected utm_source=cloud in', rel);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log('[verify-utm-canon] OK — outbound UTM source is cloud');
