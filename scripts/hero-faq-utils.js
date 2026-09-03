'use strict';

const FALLBACK_FAQ = {
  lt: [
    {
      q: 'Kam tai?',
      a: 'Komandai ir vadovui — aiškesni rezultatai.'
    },
    {
      q: 'Kada naudoti patikrą?',
      a: 'Prieš siunčiant klientui ar vadovybei, kai svarbūs faktai ir tonas.'
    },
    {
      q: 'Ką kopijuoti?',
      a: 'Paimk šabloną, užpildyk [laukus], paleisk, tada iteruok.'
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
      a: 'Use one shared template (role + context + reasoning + output), then iterate with the same checklist.'
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

/**
 * Parse hero FAQ from built or source HTML (matches data-geo-faq panel).
 * @param {string} html
 * @param {'lt'|'en'} locale
 * @returns {{ q: string, a: string }[]}
 */
function extractHeroFaq(html, locale = 'lt') {
  const detailsMatch = html.match(/<details[^>]*data-geo-faq="1"[^>]*>([\s\S]*?)<\/details>/i);
  if (!detailsMatch) {
    console.warn(`[hero-faq] details not found (${locale}); using fallback`);
    return FALLBACK_FAQ[locale] || FALLBACK_FAQ.lt;
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
    console.warn(`[hero-faq] no items parsed (${locale}); using fallback`);
    return FALLBACK_FAQ[locale] || FALLBACK_FAQ.lt;
  }

  return faq;
}

function parseJsonLdFaq(html) {
  const scriptMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!scriptMatch) return [];
  let payload;
  try {
    payload = JSON.parse(scriptMatch[1]);
  } catch {
    return [];
  }
  const graph = payload['@graph'];
  if (!Array.isArray(graph)) return [];
  const faqPage = graph.find((node) => node['@type'] === 'FAQPage');
  if (!faqPage || !Array.isArray(faqPage.mainEntity)) return [];
  return faqPage.mainEntity.map((entity) => ({
    q: normalizeWhitespace(entity.name),
    a: normalizeWhitespace(entity.acceptedAnswer && entity.acceptedAnswer.text)
  }));
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
