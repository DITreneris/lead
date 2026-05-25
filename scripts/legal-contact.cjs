'use strict';

/** Canonical publisher / contact (GEO, legal footnote, schema.org). */
const ORG = {
  name: 'Prompt Anatomy',
  email: 'info@promptanatomy.app',
  streetAddress: '1311 Park St, Unit #654',
  addressLocality: 'Alameda',
  addressRegion: 'CA',
  postalCode: '94501',
  addressCountry: 'US'
};

function postalAddressSchema() {
  return {
    '@type': 'PostalAddress',
    streetAddress: ORG.streetAddress,
    addressLocality: ORG.addressLocality,
    addressRegion: ORG.addressRegion,
    postalCode: ORG.postalCode,
    addressCountry: ORG.addressCountry
  };
}

function addressLinesHtml() {
  return `${ORG.streetAddress}<br>${ORG.addressLocality}, ${ORG.addressRegion} ${ORG.postalCode}`;
}

function llmsLegalEntityBlock() {
  return [
    '## Legal entity',
    '',
    `- **Name:** ${ORG.name}`,
    `- **Email:** [${ORG.email}](mailto:${ORG.email})`,
    `- **Address:** ${ORG.streetAddress}, ${ORG.addressLocality}, ${ORG.addressRegion} ${ORG.postalCode}, ${ORG.addressCountry}`
  ].join('\n');
}

const CTA_FOOTNOTE_LT = `        <div class="cta-foot site-legal-footnote" role="contentinfo" aria-label="Kontaktai ir leidėjas">
            <p class="site-legal-footnote__brand"><strong>${ORG.name}</strong></p>
            <p class="site-legal-footnote__addr">${addressLinesHtml()}</p>
            <p class="site-legal-footnote__email"><a href="mailto:${ORG.email}">${ORG.email}</a></p>
            <p class="site-legal-footnote__tag">Promptų anatomija • Įmonės komandos • 2026</p>
        </div>`;

const CTA_FOOTNOTE_EN = `        <div class="cta-foot site-legal-footnote" role="contentinfo" aria-label="Contact and publisher">
            <p class="site-legal-footnote__brand"><strong>${ORG.name}</strong></p>
            <p class="site-legal-footnote__addr">${addressLinesHtml()}</p>
            <p class="site-legal-footnote__email"><a href="mailto:${ORG.email}">${ORG.email}</a></p>
            <p class="site-legal-footnote__tag">Prompt Anatomy • Teams • 2026</p>
        </div>`;

module.exports = {
  ORG,
  postalAddressSchema,
  addressLinesHtml,
  llmsLegalEntityBlock,
  CTA_FOOTNOTE_LT,
  CTA_FOOTNOTE_EN
};
