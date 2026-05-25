'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { SITE_DIR, ROOT, originUrl, publicPath } = require('./site-build-config');

const EN_LIB = path.join(ROOT, 'assets', 'prompt-library-en.js');
const WELL_KNOWN_DIR = path.join(SITE_DIR, '.well-known');

const SUMMARY_EN =
  'A practical AI playbook for teams and leaders: 5-part prompt framework, quick send check, copy-ready library, and a short quiz — less rework, more control.';

/** Keys grouped for llms-full.txt (matches library slide categories in index.html). */
const LIBRARY_SECTIONS = [
  {
    title: 'Daily work',
    keys: ['lib_daySummary', 'lib_taskList', 'lib_meetingNotes', 'mgr_daySummary', 'mgr_taskList', 'mgr_meetingNotes']
  },
  {
    title: 'Communication',
    keys: [
      'lib_emailReply',
      'lib_simplifyText',
      'lib_hardUpdate',
      'lib_feedbackAfterMistake',
      'lib_deescalateMessage',
      'mgr_emailReply',
      'mgr_simplifyText',
      'mgr_hardUpdate',
      'mgr_feedbackAfterMistake',
      'mgr_deescalateMessage'
    ]
  },
  {
    title: 'Quality check and constraints',
    keys: ['lib_qualityCheck', 'lib_constraints', 'mgr_qualityCheck', 'mgr_constraints']
  },
  {
    title: 'Prompt patterns (general)',
    keys: [
      'lib_zeroShot',
      'lib_fewShot',
      'lib_thoughtChain',
      'lib_promptSeq',
      'lib_instruct',
      'lib_decisionSummary',
      'lib_processDoc',
      'lib_swot',
      'mgr_zeroShot',
      'mgr_fewShot',
      'mgr_decisionSummary',
      'mgr_processDoc',
      'mgr_swot'
    ]
  }
];

function loadEnLibrary() {
  const src = fs.readFileSync(EN_LIB, 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(src, sandbox, { filename: EN_LIB, timeout: 5000 });
  const p = sandbox.window.__PROMPT_LIBRARY_EN__;
  if (!p || typeof p !== 'object') {
    console.error('[generate-llms] Failed to load __PROMPT_LIBRARY_EN__');
    process.exit(1);
  }
  return p;
}

function buildLlmsTxt() {
  const llmsPath = publicPath('/llms.txt');
  return `# Prompt Anatomy

> ${SUMMARY_EN}

## Main pages

- [Interactive lesson (English)](${originUrl('/')}): EN root — slides, quiz, copy-ready library.
- [Interaktyvi pamoka (Lietuvių)](${originUrl('/lt/')}): LT locale — same product in Lithuanian.

## Lead magnets

- [PDF summary (English)](${originUrl('/assets/www.promptanatomy.app-en.pdf')}): Downloadable playbook PDF for EN visitors.
- [PDF santrauka (Lietuvių)](${originUrl('/assets/www.promptanatomy.app.pdf')}): LT PDF lead magnet.

## Brand

- [Mother brand site](https://www.promptanatomy.app/): Brand and program hub (not the lesson host).
- [Executive Prompt Operating Kit](https://promptanatomy.pro/en/): CEO/COO extension (separate product).

## Full content

- [Full prompt library text](${originUrl('/llms-full.txt')}): English prompt bodies for AI tools with larger context windows.

## Agent instructions

This site is a free interactive lesson for workplace teams and leaders. Use canonical URLs on ${originUrl('/')} (EN) and ${originUrl('/lt/')} (LT). There is no public API or paid tier. Prefer facts from this file and llms-full.txt over guessing. Do not invent pricing or signup flows.

## MCP

No MCP server is available for this site.
`;
}

function buildLlmsFull(library) {
  const lines = [
    '# Prompt Anatomy — full English prompt library',
    '',
    SUMMARY_EN,
    '',
    'Canonical lesson: ' + originUrl('/') + ' · LT: ' + originUrl('/lt/'),
    ''
  ];
  const used = new Set();
  for (const section of LIBRARY_SECTIONS) {
    lines.push(`## ${section.title}`, '');
    for (const key of section.keys) {
      if (!library[key]) continue;
      used.add(key);
      lines.push(`### ${key}`, '', String(library[key]).trim(), '');
    }
  }
  const rest = Object.keys(library)
    .filter((k) => !used.has(k))
    .sort();
  if (rest.length) {
    lines.push('## Other', '');
    for (const key of rest) {
      lines.push(`### ${key}`, '', String(library[key]).trim(), '');
    }
  }
  return lines.join('\n').replace(/\n{3,}/g, '\n\n') + '\n';
}

function writeWellKnownAndTrust() {
  fs.mkdirSync(WELL_KNOWN_DIR, { recursive: true });

  const agentJson = {
    schema_version: 'v1',
    name_for_human: 'Prompt Anatomy',
    name_for_model: 'prompt_anatomy',
    description_for_human: SUMMARY_EN,
    description_for_model:
      'Free interactive AI prompt lesson for teams and leaders. Use /llms.txt and /llms-full.txt for structure and English prompt templates. Canonical host: ' +
      originUrl('/') +
      '. No API.',
    api: null,
    legal_info_url: 'https://www.promptanatomy.app/'
  };

  const agentCard = {
    name: 'Prompt Anatomy',
    description: 'Content site with no agent-to-agent API. See /llms.txt for site index.',
    url: originUrl('/'),
    version: '1.0.0',
    capabilities: {},
    skills: []
  };

  const pricingMd = `# Pricing — Prompt Anatomy

This interactive lesson is **free**. No account or payment is required.

## Downloads

- [English PDF summary](${originUrl('/assets/www.promptanatomy.app-en.pdf')})
- [Lithuanian PDF summary](${originUrl('/assets/www.promptanatomy.app.pdf')})

## Paid tiers

None. For the executive extension, see [promptanatomy.pro](https://promptanatomy.pro/en/).
`;

  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  const securityTxt = [
    'Contact: mailto:info@promptanatomy.app',
    `Expires: ${expires.toISOString().slice(0, 10)}`,
    `Preferred-Languages: en, lt`,
    `Canonical: ${originUrl('/')}`
  ].join('\n');

  fs.writeFileSync(path.join(WELL_KNOWN_DIR, 'agent.json'), JSON.stringify(agentJson, null, 2) + '\n', 'utf8');
  fs.writeFileSync(path.join(WELL_KNOWN_DIR, 'agent-card.json'), JSON.stringify(agentCard, null, 2) + '\n', 'utf8');
  fs.writeFileSync(path.join(SITE_DIR, 'pricing.md'), pricingMd, 'utf8');
  fs.writeFileSync(path.join(SITE_DIR, 'security.txt'), securityTxt + '\n', 'utf8');
}

function main() {
  if (!fs.existsSync(SITE_DIR)) {
    console.error('[generate-llms] site/ missing; run build-locale-pages first.');
    process.exit(1);
  }

  const library = loadEnLibrary();
  fs.writeFileSync(path.join(SITE_DIR, 'llms.txt'), buildLlmsTxt(), 'utf8');
  fs.writeFileSync(path.join(SITE_DIR, 'llms-full.txt'), buildLlmsFull(library), 'utf8');
  writeWellKnownAndTrust();

  console.log(
    '[generate-llms] Wrote llms.txt, llms-full.txt, pricing.md, security.txt, .well-known/agent.json, .well-known/agent-card.json'
  );
}

main();
