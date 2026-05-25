'use strict';

const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE_DIR = path.join(ROOT, 'site');

const BASE = (process.env.BASE_PATH || '').replace(/\/$/, '');
const SITE_PREFIX = (process.env.SITE_PREFIX || '').replace(/\/$/, '');
const ORIGIN = (process.env.PUBLIC_ORIGIN || 'https://promptanatomy.cloud').replace(/\/$/, '');
const OG_IMAGE_VERSION = (process.env.OG_IMAGE_VERSION || '2026-04-30').trim();

function originUrl(pathname) {
  const p = pathname.startsWith('/') ? pathname : '/' + pathname;
  return ORIGIN + BASE + p;
}

function publicPath(pathname) {
  const p = pathname.startsWith('/') ? pathname : '/' + pathname;
  const prefix = SITE_PREFIX || BASE;
  return prefix ? prefix + p : p;
}

function sitemapLastmod() {
  const env = (process.env.SITEMAP_LASTMOD || '').trim();
  if (env) return env;
  if (/^\d{4}-\d{2}-\d{2}$/.test(OG_IMAGE_VERSION)) return OG_IMAGE_VERSION;
  return new Date().toISOString().slice(0, 10);
}

function versionedOgImageUrl() {
  const base = originUrl('/assets/og-promptanatomy.png');
  return OG_IMAGE_VERSION ? `${base}?v=${encodeURIComponent(OG_IMAGE_VERSION)}` : base;
}

module.exports = {
  ROOT,
  SITE_DIR,
  BASE,
  SITE_PREFIX,
  ORIGIN,
  OG_IMAGE_VERSION,
  originUrl,
  publicPath,
  sitemapLastmod,
  versionedOgImageUrl
};
