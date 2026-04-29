'use strict';

/**
 * After `npm run build`, fail if site/index.html (EN primary) still contains common LT-only
 * UI fragments outside <script>/<style>/HTML comments (where LT in JS is expected).
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const EN_HTML = path.join(ROOT, 'site', 'index.html');

function stripNoise(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ');
}

const DENY_SUBSTRINGS = [
  'Pereiti prie turinio',
  'Kalbos pasirinkimas',
  'aria-label="Skaidrė',
  'Perjungti į lietuvių kalbą',
  '<title>Promptų anatomija',
  '>Pradėk</a>',
  '>Kopijuoti</button>',
  '>Tikrinti</button>',
  'Pasirink vieną variantą</legend>',
  'Bandyti dar kartą</button>',
  '<html lang="lt">',
  '<meta name="page-locale" content="lt">'
];

function main() {
  if (!fs.existsSync(EN_HTML)) {
    console.error('[verify-en-locale] Missing', EN_HTML, '— run npm run build first.');
    process.exit(1);
  }
  const raw = fs.readFileSync(EN_HTML, 'utf8');
  if (!/<html\s+lang="en"/i.test(raw)) {
    console.error('[verify-en-locale] Expected <html lang="en"> in EN page.');
    process.exit(1);
  }
  if (!/<meta\s+name="page-locale"\s+content="en"/i.test(raw)) {
    console.error('[verify-en-locale] Expected page-locale meta content="en".');
    process.exit(1);
  }

  const body = stripNoise(raw);
  for (const s of DENY_SUBSTRINGS) {
    if (body.includes(s)) {
      console.error('[verify-en-locale] EN page still contains LT-only or wrong fragment:', JSON.stringify(s));
      process.exit(1);
    }
  }

  if (body.includes('www.promptanatomy.app.pdf')) {
    console.error(
      '[verify-en-locale] EN page should use assets/www.promptanatomy.app-en.pdf for lesson PDF, not LT filename www.promptanatomy.app.pdf (check scripts/en-html-replacements.cjs).'
    );
    process.exit(1);
  }

  const ltDiacritics = /[\u0105\u010d\u0119\u0117\u012f\u0161\u0173\u016b\u017e\u0104\u010c\u0118\u0116\u012e\u0160\u0172\u016a\u017d]/;
  if (ltDiacritics.test(body)) {
    const idx = body.search(ltDiacritics);
    const ctx = body.slice(Math.max(0, idx - 60), Math.min(body.length, idx + 60)).replace(/\s+/g, ' ');
    console.error('[verify-en-locale] EN page body still contains Lithuanian letters (outside script/style). Context:', JSON.stringify(ctx));
    process.exit(1);
  }

  console.log('[verify-en-locale] OK:', EN_HTML);
}

main();
