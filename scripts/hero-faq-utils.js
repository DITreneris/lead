'use strict';

const FALLBACK_FAQ = {
  lt: [
    {
      q: 'Ką įrašyti į užklausą vadovybės atnaujinimui?',
      a: 'Auditoriją, kontekstą, ribas ir rezultatą (punktai, lentelė ar sprendimo santrauka). Pridėk sėkmės kriterijų.'
    },
    {
      q: 'Kaip sumažinti pramanytus faktus klientų laiškuose?',
      a: 'Įklijuok šaltinio pastabas, prašyk citatų ir paleisk trumpą patikrą: kas saugu, ką būtina patikrinti.'
    },
    {
      q: 'Kas yra greita patikra?',
      a: '30 sekundžių rizikos peržiūra prieš siuntimą: faktai, trūkstamas kontekstas ir 2–3 reputacijos rizikos.'
    },
    {
      q: 'Kaip gauti tą patį rezultatą visoje komandoje?',
      a: 'Naudok vieną šabloną (vaidmuo, kontekstas, rezultatas), tada kartok su tuo pačiu sąrašu.'
    }
  ],
  en: [
    {
      q: 'What should I include in a prompt for leadership updates?',
      a: 'Audience, context, constraints, and the exact output format (bullets, table, decision memo). Add success criteria.'
    },
    {
      q: 'How do I reduce hallucinated facts in client emails?',
      a: "Paste source notes, ask for citations/quotes, and run a quick send check: what's safe, what must be verified."
    },
    {
      q: "What's a quick send check?",
      a: 'A 30-second risk review before you send: facts, missing context, and 2–3 reputational risks.'
    },
    {
      q: 'How do I get consistent outputs across my team?',
      a: 'Use one shared template (role, context, and output), then iterate with the same checklist.'
    }
  ]
};

function normalizeWhitespace(text) {
  return String(text).replace(/\s+/g, ' ').trim();
}

function stripTags(html) {
  return normalizeWhitespace(
    String(html)
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
  );
}

function fallbackFaq(locale) {
  return FALLBACK_FAQ[locale] || FALLBACK_FAQ.lt;
}

/**
 * Parse hero FAQ from built or source HTML (matches data-geo-faq panel).
 * @param {string} html
 * @param {'lt'|'en'} locale
 * @param {{ allowFallback?: boolean }} [options]
 * @returns {{ q: string, a: string }[]}
 */
function extractHeroFaq(html, locale = 'lt', options = {}) {
  const allowFallback = options.allowFallback === true;
  const detailsMatch = html.match(/<details[^>]*data-geo-faq="1"[^>]*>([\s\S]*?)<\/details>/i);
  if (!detailsMatch) {
    if (allowFallback) {
      console.warn(`[hero-faq] details not found (${locale}); using fallback`);
      return fallbackFaq(locale);
    }
    throw new Error(`[hero-faq] details not found (${locale}); refusing fallback`);
  }

  const scope = detailsMatch[1];
  const itemRe = /<div class="hero-faq__item"[^>]*>([\s\S]*?)<\/div>/gi;
  const faq = [];
  let match;
  while ((match = itemRe.exec(scope)) !== null) {
    const inner = match[1];
    const strongMatch = inner.match(/<strong>([\s\S]*?)<\/strong>/i);
    if (!strongMatch) continue;
    const q = stripTags(strongMatch[1]);
    const a = stripTags(inner.replace(/<strong>[\s\S]*?<\/strong>/i, ''));
    if (q && a) faq.push({ q, a });
  }

  if (!faq.length) {
    if (allowFallback) {
      console.warn(`[hero-faq] no items parsed (${locale}); using fallback`);
      return fallbackFaq(locale);
    }
    throw new Error(`[hero-faq] no items parsed (${locale}); refusing fallback`);
  }

  return faq;
}

function faqEntitiesFromPayload(payload) {
  if (!payload || typeof payload !== 'object') return null;
  const nodes = Array.isArray(payload['@graph'])
    ? payload['@graph']
    : payload['@type'] === 'FAQPage'
      ? [payload]
      : [];
  const faqPage = nodes.find((node) => node && node['@type'] === 'FAQPage');
  if (!faqPage || !Array.isArray(faqPage.mainEntity)) return null;
  return faqPage.mainEntity.map((entity) => ({
    q: normalizeWhitespace(entity.name),
    a: normalizeWhitespace(entity.acceptedAnswer && entity.acceptedAnswer.text)
  }));
}

function parseJsonLdFaq(html) {
  const scriptRe = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let scriptMatch;
  while ((scriptMatch = scriptRe.exec(html)) !== null) {
    let payload;
    try {
      payload = JSON.parse(scriptMatch[1]);
    } catch {
      continue;
    }
    const faq = faqEntitiesFromPayload(payload);
    if (faq && faq.length) return faq;
  }
  return [];
}

function faqListsMatch(visible, schema) {
  if (visible.length !== schema.length) return false;
  for (let i = 0; i < visible.length; i++) {
    if (normalizeWhitespace(visible[i].q) !== normalizeWhitespace(schema[i].q)) return false;
    if (normalizeWhitespace(visible[i].a) !== normalizeWhitespace(schema[i].a)) return false;
  }
  return true;
}

module.exports = {
  FALLBACK_FAQ,
  extractHeroFaq,
  parseJsonLdFaq,
  faqListsMatch,
  normalizeWhitespace
};
