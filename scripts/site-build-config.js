'use strict';

const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE_DIR = path.join(ROOT, 'site');

const BASE = (process.env.BASE_PATH || '').replace(/\/$/, '');
const SITE_PREFIX = (process.env.SITE_PREFIX || '').replace(/\/$/, '');
const ORIGIN = (process.env.PUBLIC_ORIGIN || 'https://promptanatomy.cloud').replace(/\/$/, '');
const OG_IMAGE_VERSION = (process.env.OG_IMAGE_VERSION || '2026-04-30').trim();
/** Stable LearningResource datePublished (ISO date); align with first public OG asset version. */
const LESSON_DATE_PUBLISHED = (process.env.LESSON_DATE_PUBLISHED || '2026-04-30').trim();

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

  const vercelGitDate = (process.env.VERCEL_GIT_COMMIT_DATE || '').trim();
  if (vercelGitDate) {
    const d = new Date(vercelGitDate);
    if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }

  const sourceEpoch = process.env.SOURCE_DATE_EPOCH;
  if (sourceEpoch) {
    const n = Number(sourceEpoch);
    if (Number.isFinite(n) && n > 0) {
      return new Date(n * 1000).toISOString().slice(0, 10);
    }
  }

  return new Date().toISOString().slice(0, 10);
}

function versionedOgImageUrl() {
  const base = originUrl('/assets/og-promptanatomy.png');
  return OG_IMAGE_VERSION ? `${base}?v=${encodeURIComponent(OG_IMAGE_VERSION)}` : base;
}

/** Square brand mark for schema.org Organization (not social OG 1200×630). */
function organizationLogoUrl() {
  return originUrl('/favicon.svg');
}

module.exports = {
  ROOT,
  SITE_DIR,
  BASE,
  SITE_PREFIX,
  ORIGIN,
  OG_IMAGE_VERSION,
  LESSON_DATE_PUBLISHED,
  originUrl,
  publicPath,
  sitemapLastmod,
  versionedOgImageUrl,
  organizationLogoUrl
};
