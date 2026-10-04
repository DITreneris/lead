'use strict';

const { CTA_FOOTNOTE_LT, CTA_FOOTNOTE_EN } = require('./legal-contact.cjs');

/**
 * Ordered [LT, EN] HTML fragments for the EN build output (site/index.html).
 * Keep fragments unique enough to avoid accidental double-replace.
 */
function getEnHtmlReplacementPairs() {
  return [
    [
      '<p class="hero-foot-links"><a class="link-tier-tertiary" href="#library" data-track="hero_library_click">Biblioteka</a> · <a class="link-tier-tertiary hero-pdf-link" href="assets/www.promptanatomy.app.pdf" download="www.promptanatomy.app.pdf" aria-label="Atsisiųsk 1 pamokos santrauką PDF formatu" data-track="hero_pdf_click">Santrauka (PDF)</a> · <a class="link-tier-tertiary" href="https://promptanatomy.pro/en/?utm_source=cloud&amp;utm_medium=hero_footer&amp;utm_campaign=executive_pro" target="_blank" rel="noopener noreferrer" data-track="hero_executive_pro_click" data-track-dest="pro" aria-label="CEO ir COO vadovybės rinkinys promptanatomy.pro (atidaryti naujame skirtuke)">CEO rinkinys</a> · <a class="link-tier-tertiary" href="tools-lt.html" data-track="hero_tools_click">DI įrankių gidas</a></p>',
      '<p class="hero-foot-links"><a class="link-tier-tertiary" href="#library" data-track="hero_library_click">Library</a> · <a class="link-tier-tertiary hero-pdf-link" href="assets/www.promptanatomy.app-en.pdf" download="www.promptanatomy.app-en.pdf" aria-label="Download lesson 1 English summary (PDF)" data-track="hero_pdf_click">Summary (PDF)</a> · <a class="link-tier-tertiary" href="https://promptanatomy.pro/en/?utm_source=cloud&amp;utm_medium=hero_footer&amp;utm_campaign=executive_pro" target="_blank" rel="noopener noreferrer" data-track="hero_executive_pro_click" data-track-dest="pro" aria-label="CEO and COO executive kit on promptanatomy.pro (opens in a new tab)">Executive kit</a> · <a class="link-tier-tertiary" href="tools.html" data-track="hero_tools_click">AI tools guide</a></p>'
    ],
    ['content: \'UŽKLAUSOS STRUKTŪRA\';', 'content: \'PROMPT STRUCTURE\';'],

    ['assets/illustrations/check-lt.webp', 'assets/illustrations/check-en.webp'],
    ['assets/illustrations/check-lt.png', 'assets/illustrations/check-en.png'],
    ['alt="Patikros lapas: rizika — data nepatikrinta; tinka — laikas ir tikslas; patikrinti ne DI — skaičių sutartyje."', 'alt="Check sheet: risk — the date is unchecked; fits — time and goal; check outside AI — the figure in the contract."'],
    ['assets/illustrations/meeting-lt.webp', 'assets/illustrations/meeting-en.webp'],
    ['assets/illustrations/meeting-lt.png', 'assets/illustrations/meeting-en.png'],
    ['alt="60 min sprinto laiko juosta: 0–10 min sutark, ką palikti; 10–40 min padaryk vieną užduotį; 40–60 min sprendimas, kas lieka."', 'alt="60 min sprint timeline: 0–10 min agree what stays; 10–40 min do one task; 40–60 min decision on what stays."'],
    ['assets/illustrations/levels-lt.webp', 'assets/illustrations/levels-en.webp'],
    ['assets/illustrations/levels-lt.png', 'assets/illustrations/levels-en.png'],
    ['alt="Ta pati žinutė trimis lygiais: bazinis — palik vieną užduotį; vidutinis — ir vieną savininką; pažengęs — ir vieną sprendimą 60 min pabaigoje."', 'alt="The same message at three levels: basic — keep one task; mid — and one owner; advanced — and one decision at the end of the 60 min."'],
    ['assets/illustrations/feedback-lt.webp', 'assets/illustrations/feedback-en.webp'],
    ['assets/illustrations/feedback-lt.png', 'assets/illustrations/feedback-en.png'],
    ['alt="Įvertinimo kortelė: aišku; stipru — vienas tikslas; pirmas pakeitimas — pirmą sakinį skirk skaitytojui."', 'alt="Review card: clear; strong — one goal; first change — aim the first sentence at the reader."'],
    ['assets/illustrations/team-lt.webp', 'assets/illustrations/team-en.webp'],
    ['assets/illustrations/team-lt.png', 'assets/illustrations/team-en.png'],
    ['alt="Užduoties kortelė: įrašyk vieną riziką į sprinto planą; savininkas; iki rytojaus; sprinto lapas."', 'alt="Task card: write one risk into the sprint plan; owner; by tomorrow; sprint sheet."'],
    ['assets/illustrations/letter-lt.webp', 'assets/illustrations/letter-en.webp'],
    ['assets/illustrations/letter-lt.png', 'assets/illustrations/letter-en.png'],
    ['alt="Laiško langas: problema — šis sprintas neturi vieno tikslo; sprendimas — palik vieną užduotį ir vieną savininką; kitas žingsnis — iki pabaigos pasakyk, kas lieka."', 'alt="Letter window: problem — this sprint has no single goal; fix — keep one task and one owner; next step — by the end, say what stays."'],

    ['<a class="skip-link" href="#main-content">Pereiti prie turinio</a>', '<a class="skip-link" href="#main-content">Skip to content</a>'],

    ['aria-label="Kalbos pasirinkimas"', 'aria-label="Language selection"'],
    ['aria-label="Perjungti į lietuvių kalbą"', 'aria-label="Switch to Lithuanian"'],

    [
      '<summary class="slide-outline__summary disclosure-chip__summary"><span class="slide-outline__icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg></span>Turinys</summary>',
      '<summary class="slide-outline__summary disclosure-chip__summary"><span class="slide-outline__icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg></span>Contents</summary>'
    ],
    [
      'aria-label="Promptų anatomija — brendo svetainė www.promptanatomy.app (atidaryti naujame skirtuke)"',
      'aria-label="Prompt Anatomy — brand site www.promptanatomy.app (opens in a new tab)"'
    ],
    ['<div class="brand-tagline">DI praktinė sistema</div>', '<div class="brand-tagline">Built for real work</div>'],

    [
      '<div class="brand-name"><span class="brand-prompt">Promptų</span> <span class="brand-anatomy">Anatomija</span></div>',
      '<div class="brand-name"><span class="brand-prompt">Prompt</span> <span class="brand-anatomy">Anatomy</span></div>'
    ],
    [
      '<h1>Trumpa užklausa tampa užduotimi.</h1>',
      '<h1>A short prompt becomes a task.</h1>'
    ],
    [
      '<p class="hero-intro slide-lead">Tas pats savaitės tikslas: vaidmuo, tikslas, įvestis, rezultatas. Paleidi per 2 minutes.</p>',
      '<p class="hero-intro slide-lead">Same weekly goal: role, goal, input, result. You run it in 2 minutes.</p>'
    ],
    ['<p class="intro-proof-kicker">Prieš</p>', '<p class="intro-proof-kicker">Before</p>'],
    ['<p class="intro-proof-kicker">Po</p>', '<p class="intro-proof-kicker">After</p>'],
    [
      '<p class="intro-proof-before">„Paruošk ataskaitą apie mūsų savaitės prioritetus.“</p>',
      '<p class="intro-proof-before">“Prepare a report on our weekly priorities.”</p>'
    ],
    [
      '<div class="practice-structured-line"><strong>Vaidmuo</strong> <span>darbo asistentas</span></div>',
      '<div class="practice-structured-line"><strong>Role</strong> <span>work assistant</span></div>'
    ],
    [
      '<div class="practice-structured-line"><strong>Tikslas</strong> <span>savaitės prioritetai</span></div>',
      '<div class="practice-structured-line"><strong>Goal</strong> <span>this week’s priorities</span></div>'
    ],
    [
      '<div class="practice-structured-line"><strong>Įvestis</strong> <span>užrašai / laiškai</span></div>',
      '<div class="practice-structured-line"><strong>Input</strong> <span>notes / emails</span></div>'
    ],
    [
      '<div class="practice-structured-line"><strong>Rezultatas</strong> <span>veiksmų sąrašas (A/B/C)</span></div>',
      '<div class="practice-structured-line"><strong>Output</strong> <span>action list (A/B/C)</span></div>'
    ],
    [
      'class="cta-pdf-link btn-pdf-outline" href="assets/www.promptanatomy.app.pdf"',
      'class="cta-pdf-link btn-pdf-outline" href="assets/www.promptanatomy.app-en.pdf"'
    ],

    ['aria-label="Skaidrių navigacija"', 'aria-label="Slide navigation"'],
    ['aria-label="Skaidrė 1: Įvadas"', 'aria-label="Slide 1: Introduction"'],
    ['aria-label="Skaidrė 2: Kas yra promptas?"', 'aria-label="Slide 2: What is a prompt?"'],
    ['aria-label="Skaidrė 3: Promptų anatomijos schema"', 'aria-label="Slide 3: Prompt anatomy framework"'],
    ['aria-label="Skaidrė 4: Pradėk per 2 minutes"', 'aria-label="Slide 4: Start in 2 minutes"'],
    [
      'aria-label="Skaidrė 5: Pradėk nuo 5–15 min"',
      'aria-label="Slide 5: Start with 5–15 min"'
    ],
    ['aria-label="Skaidrė 6: Greita siuntimo patikra"', 'aria-label="Slide 6: Quick send check"'],
    ['aria-label="Skaidrė 7: Susitikimo ar sprinto planas"', 'aria-label="Slide 7: Meeting or sprint plan"'],
    ['aria-label="Skaidrė 8: Ta pati žinutė — 3 lygiai"', 'aria-label="Slide 8: Same message — three levels"'],
    ['aria-label="Skaidrė 9: Turinio grįžtamasis ryšys"', 'aria-label="Slide 9: Content feedback"'],
    ['aria-label="Skaidrė 10: Užduotis / mokymas komandai"', 'aria-label="Slide 10: Assignment / team learning"'],
    ['aria-label="Skaidrė 11: Laiškas ar žinutė (juodraštis)"', 'aria-label="Slide 11: Email or message (draft)"'],
    ['aria-label="Skaidrė 12: Promptų biblioteka (resursai)"', 'aria-label="Slide 12: Prompt library (resources)"'],
    ['aria-label="Skaidrė 13: Esmė"', 'aria-label="Slide 13: The point"'],
    ['aria-label="Skaidrė 14: Vienas klausimas"', 'aria-label="Slide 14: One question"'],
    ['aria-label="Skaidrė 15: PDF santrauka ir kitas žingsnis"', 'aria-label="Slide 15: PDF summary and next step"'],

    ['aria-label="Skaidrių navigacija (mobilusis)"', 'aria-label="Slide navigation (mobile)"'],
    ['<div class="nav-mobile-progress" id="nav-mobile-progress" aria-live="polite">1/15 · Įvadas</div>', '<div class="nav-mobile-progress" id="nav-mobile-progress" aria-live="polite">1/15 · Introduction</div>'],

    ['<section id="intro" aria-label="Įvadas"', '<section id="intro" aria-label="Introduction"'],
    ['<span class="label">DI praktinė sistema įmonei</span>', '<span class="label">Practical AI for teams</span>'],
    ['download="www.promptanatomy.app.pdf"', 'download="www.promptanatomy.app-en.pdf"'],
    ['Atsisiųsk santrauką (PDF)', 'Download English summary (PDF)'],
    [
      'aria-label="Pradėti pamoką: pereiti į 2 minučių praktiką"',
      'aria-label="Start the lesson: go to the 2-minute practice"'
    ],
    [
      'data-track="hero_primary_click">\n                    <span class="icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span>\n                    Pradėk 2 min. praktiką\n                </a>',
      'data-track="hero_primary_click">\n                    <span class="icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span>\n                    Try the 2-minute practice\n                </a>'
    ],
    [
      '<details class="hero-faq geo-faq-anchor disclosure-chip disclosure-chip--inline" data-geo-faq="1">\n                <summary class="hero-faq__summary disclosure-chip__summary">DUK (trumpai)</summary>\n                <div class="hero-faq__panel disclosure-chip__panel">\n                    <div class="hero-faq__item"><strong>Ką įrašyti į užklausą vadovybės atnaujinimui?</strong> Auditoriją, kontekstą, ribas ir rezultatą (punktai, lentelė ar sprendimo santrauka). Pridėk sėkmės kriterijų.</div>\n                    <div class="hero-faq__item"><strong>Kaip sumažinti pramanytus faktus klientų laiškuose?</strong> Įklijuok šaltinio pastabas, prašyk citatų ir paleisk trumpą patikrą: kas saugu, ką būtina patikrinti.</div>\n                    <div class="hero-faq__item"><strong>Kas yra greita patikra?</strong> 30 sekundžių rizikos peržiūra prieš siuntimą: faktai, trūkstamas kontekstas ir 2–3 reputacijos rizikos.</div>\n                    <div class="hero-faq__item"><strong>Kaip gauti tą patį rezultatą visoje komandoje?</strong> Naudok vieną šabloną (vaidmuo, kontekstas, rezultatas), tada kartok su tuo pačiu sąrašu.</div>\n                </div>\n            </details>',
      '<details class="hero-faq geo-faq-anchor disclosure-chip disclosure-chip--inline" data-geo-faq="1">\n                <summary class="hero-faq__summary disclosure-chip__summary">FAQ (for leaders)</summary>\n                <div class="hero-faq__panel disclosure-chip__panel">\n                    <div class="hero-faq__item"><strong>What should I include in a prompt for leadership updates?</strong> Audience, context, constraints, and the exact output format (bullets, table, decision memo). Add success criteria.</div>\n                    <div class="hero-faq__item"><strong>How do I reduce hallucinated facts in client emails?</strong> Paste source notes, ask for citations/quotes, and run a quick send check: what’s safe, what must be verified.</div>\n                    <div class="hero-faq__item"><strong>What’s a quick send check?</strong> A 30-second risk review before you send: facts, missing context, and 2–3 reputational risks.</div>\n                    <div class="hero-faq__item"><strong>How do I get consistent outputs across my team?</strong> Use one shared template (role, context, and output), then iterate with the same checklist.</div>\n                </div>\n            </details>'
    ],

    [
      '<div class="promo-handoff" role="region" aria-label="Nuoroda į programą www.promptanatomy.app">\n    <div class="container">\n        <div class="promo-handoff__panel">\n            <span class="label">Programa</span>\n            <p class="promo-handoff__title">Įdiek tą pačią sistemą komandoje</p>\n            <p class="promo-handoff__sub">Čia nukopijuoji užklausą. Ten ta pati sistema visai komandai.</p>\n            <a href="https://www.promptanatomy.app/?utm_source=cloud&amp;utm_medium=banner&amp;utm_campaign=promptu_anatomija" class="cta-btn cta-btn--primary" target="_blank" rel="noopener noreferrer" aria-label="Atidaryk promptanatomy.app naujame skirtuke" data-track="promo_app_banner_click" data-track-dest="app">Atidaryk promptanatomy.app</a>\n        </div>\n    </div>\n</div>',
      '<div class="promo-handoff" role="region" aria-label="Link to the program at www.promptanatomy.app">\n    <div class="container">\n        <div class="promo-handoff__panel">\n            <span class="label">Program</span>\n            <p class="promo-handoff__title">Roll out the same system for your team</p>\n            <p class="promo-handoff__sub">Here you copy a prompt. There the same system is for the whole team.</p>\n            <a href="https://www.promptanatomy.app/?utm_source=cloud&amp;utm_medium=banner&amp;utm_campaign=promptu_anatomija" class="cta-btn cta-btn--primary" target="_blank" rel="noopener noreferrer" aria-label="Open promptanatomy.app in a new tab" data-track="promo_app_banner_click" data-track-dest="app">Open promptanatomy.app</a>\n        </div>\n    </div>\n</div>'
    ],

    ['<section id="primer" class="types-slide types-slide--primer" aria-label="Kas yra promptas?"', '<section id="primer" class="types-slide types-slide--primer" aria-label="What is a prompt?"'],
    ['<span class="label">Užklausa</span>', '<span class="label">Prompt</span>'],
    ['<h2>Kas yra promptas?</h2>', '<h2>What is a prompt?</h2>'],
    [
      '<p class="types-lead slide-lead">Užklausa yra instrukcija su rezultatu.<br>Schema padeda, kai atsakymas miglotas.</p>',
      '<p class="types-lead slide-lead">A prompt is an instruction with a result.<br>Use the framework when the answer stays fuzzy.</p>'
    ],
    ['<h3>Promptas</h3>', '<h3>Prompt</h3>'],
    [
      '<p class="types-card-desc">Trumpa instrukcija DI, kad gautum konkretų rezultatą.</p>',
      '<p class="types-card-desc">Short instruction to the AI so you get a concrete result.</p>'
    ],
    ['<p class="types-card-k">Praktikoje</p>', '<p class="types-card-k">In practice</p>'],
    ['<p class="types-card-example">„Padaryk X pagal Y ir grąžink Z formatu.“</p>', '<p class="types-card-example">“Do X according to Y and return Z in this format.”</p>'],
    [
      'data-copy-text="Trumpa instrukcija DI — konkretus rezultatas. Pavyzdys: Padaryk X pagal Y ir grąžink Z formatu." aria-label="Kopijuoti prompto santrauką"',
      'data-copy-text="Short AI instruction — concrete result. Example: Do X according to Y and return Z in this format." aria-label="Copy prompt summary"'
    ],
    ['data-track="primer_copy_promptas">Kopijuoti</button>', 'data-track="primer_copy_promptas">Copy</button>'],

    ['<h3>Promptų inžinerija</h3>', '<h3>Prompt engineering</h3>'],
    [
      '<p class="types-card-desc">Struktūruotas užklausų rašymas, specifikacija, iteracija.</p>',
      '<p class="types-card-desc">Structured prompt writing, specification, iteration.</p>'
    ],
    [
      '<p class="types-card-example">„Šitą atsakymą sutrumpink iki 7 punktų. Nekeisk faktų, kurių nėra įvestyje.“</p>',
      '<p class="types-card-example">“Shorten this answer to 7 bullets. Do not change facts that are not in the input.”</p>'
    ],
    [
      'data-copy-text="Šitą atsakymą sutrumpink iki 7 punktų. Nekeisk faktų, kurių nėra įvestyje." aria-label="Kopijuoti promptų inžinerijos užklausą"',
      'data-copy-text="Shorten this answer to 7 bullets. Do not change facts that are not in the input." aria-label="Copy the prompt-engineering prompt"'
    ],
    ['data-track="primer_copy_inzinerija">Kopijuoti</button>', 'data-track="primer_copy_inzinerija">Copy</button>'],

    ['<p class="types-primer-quick-k">Greitas startas (~1 min.)</p>', '<p class="types-primer-quick-k">Quick start (~1 min)</p>'],
    [
      '<p class="types-primer-quick-desc"><strong>Taisyklė:</strong> Tikslas + Įvestis + Rezultatas.</p>',
      '<p class="types-primer-quick-desc"><strong>Rule:</strong> Goal + Input + Output.</p>'
    ],
    [
      '<p class="types-card-example types-primer-quick-example">„Tikslas: [KĄ NORIU PASIEKTI]. Įvestis: [ĮKLIJUOK TEKSTĄ]. Rezultatas: 7 punktų sąrašas su A/B/C prioritetais.“</p>',
      '<p class="types-card-example types-primer-quick-example">“Goal: [WHAT I WANT]. Input: [PASTE TEXT]. Output: 7-bullet list with A/B/C priorities.”</p>'
    ],
    [
      'data-copy-text="Tikslas: [KĄ NORIU PASIEKTI]. Įvestis: [ĮKLIJUOK TEKSTĄ]. Rezultatas: 7 punktų sąrašas su A/B/C prioritetais." aria-label="Kopijuoti greito starto užklausą"',
      'data-copy-text="Goal: [WHAT I WANT]. Input: [PASTE TEXT]. Output: 7-bullet list with A/B/C priorities." aria-label="Copy quick-start prompt"'
    ],
    ['data-track="primer_copy_format">Kopijuoti</button>', 'data-track="primer_copy_format">Copy</button>'],
    ['<span class="types-card-k">Toliau</span>', '<span class="types-card-k">Next</span>'],
    [
      '<a class="inline-link inline-link--soft primer-next-cta" href="#schema" data-track="primer_to_schema">Schema ↓</a>',
      '<a class="inline-link inline-link--soft primer-next-cta" href="#schema" data-track="primer_to_schema">Framework ↓</a>'
    ],

    ['<section id="schema" class="schema-section" aria-label="Promptų anatomijos schema"', '<section id="schema" class="schema-section" aria-label="Prompt anatomy framework"'],
    ['<span class="label">Žingsniai</span>', '<span class="label">Steps</span>'],
    ['<h2>Promptų anatomijos schema</h2>', '<h2>Prompt anatomy framework</h2>'],
    [
      '<p class="schema-lead slide-lead">Pradėk nuo vaidmens, konteksto ir rezultato.<br>Penkias schemos dalis naudok tada, kai užduotis yra sudėtinga.</p>',
      '<p class="schema-lead slide-lead">Start with role, context, and output.<br>Use the five parts of the schema when the task is complex.</p>'
    ],
    [
      '<strong>Vaidmuo</strong>\n                            <span>Kas esi ir koks tikslas (kodėl DI turi taip veikti)</span>',
      '<strong>Role</strong>\n                            <span>Who you are, what the goal is, and why the AI should work this way</span>'
    ],
    [
      '<strong>Kontekstas</strong>\n                            <span>Faktai, auditorija, apribojimai, šaltiniai, kas jau žinoma</span>',
      '<strong>Context</strong>\n                            <span>Facts, audience, constraints, sources, what is already known</span>'
    ],
    [
      '<strong>Mąstymas</strong>\n                            <span>Žingsniai, kriterijai, kaip priimti sprendimą</span>',
      '<strong>Reasoning</strong>\n                            <span>Steps, criteria, how to decide</span>'
    ],
    [
      '<strong>Rezultatas</strong>\n                            <span>Formatas, apimtis, pavyzdys, baigtumo kriterijai</span>',
      '<strong>Output</strong>\n                            <span>Format, length, example, done criteria</span>'
    ],
    [
      '<strong>Kokybės kontrolė</strong>\n                            <span>Tikrink prieš siuntimą (ypač klientui ar vadovybei)</span>',
      '<strong>Quality control</strong>\n                            <span>Check before you send (especially to clients or leadership)</span>'
    ],
    ['aria-label="Toliau: pereiti į 2 minučių praktiką" data-track="schema_next_click">Praktika ↓</a>', 'aria-label="Next: go to the 2-minute practice" data-track="schema_next_click">Practice ↓</a>'],

    ['<section id="guided" class="types-slide types-slide--guided" aria-label="Pradėk per 2 minutes"', '<section id="guided" class="types-slide types-slide--guided" aria-label="Start in 2 minutes"'],
    ['<span class="label">Praktika</span>', '<span class="label">Practice</span>'],
    ['<h2>Pradėk per 2 minutes</h2>', '<h2>Start in 2 minutes</h2>'],
    [
      '<p class="types-lead slide-lead">Tas pats savaitės tikslas — kitaip parašius, kitas atsakymas.<br>Nukopijuok „Po“ ir skliaustus pakeisk savo 3–5 eilutėmis.</p>',
      '<p class="types-lead slide-lead">Same weekly goal — write it differently, you get a different answer.<br>Copy “After” and replace the brackets with your 3–5 lines.</p>'
    ],
    ['<h3>Prieš</h3>', '<h3>Before</h3>'],
    [
      '<p class="types-card-desc">Trumpa užklausa — DI spėja, ko nepasakei.</p>',
      '<p class="types-card-desc">A short prompt — the AI guesses what you left out.</p>'
    ],
    ['<p class="types-card-k">Užklausa</p>', '<p class="types-card-k">Prompt</p>'],
    [
      '<p class="types-card-example">„Paruošk ataskaitą apie mūsų savaitės prioritetus.“</p>',
      '<p class="types-card-example">“Prepare a report on our weekly priorities.”</p>'
    ],
    [
      'data-copy-text="Paruošk ataskaitą apie mūsų savaitės prioritetus." aria-label="Kopijuoti „prieš“ užklausą"',
      'data-copy-text="Prepare a report on our weekly priorities." aria-label="Copy the “before” prompt"'
    ],
    ['data-track="practice_before_copy">Kopijuoti</button>', 'data-track="practice_before_copy">Copy</button>'],

    ['<h3>Po</h3>', '<h3>After</h3>'],
    [
      '<p class="types-card-desc">Tinka, jei matai A/B/C ir nėra skaičių, kurių neįklijavai.</p>',
      '<p class="types-card-desc">Good if you see A/B/C and no numbers you did not paste in.</p>'
    ],
    [
      '<span>Vaidmuo: Tu esi mano darbo asistentas.</span>',
      '<span>Role: You are my work assistant.</span>'
    ],
    [
      '<span>Tikslas: [KĄ TURIU PADARYTI ŠIĄ SAVAITĘ].</span>',
      '<span>Goal: [WHAT I MUST DO THIS WEEK].</span>'
    ],
    [
      '<span>Įvestis: [ĮKLIJUOK el. laišką / užrašus / užduotis].</span>',
      '<span>Input: [PASTE email / notes / task].</span>'
    ],
    [
      '<span>Rezultatas: 7 punktų sąrašas (prioritetas A/B/C + terminas, jei paminėtas).</span>',
      '<span>Output: 7-bullet list (A/B/C priority + deadline if mentioned).</span>'
    ],
    [
      '<span>Apribojimas: nenaudok faktų ar skaičių, kurių nėra įvestyje; jei trūksta duomenų — parašyk „Trūksta:“.</span>',
      '<span>Constraint: do not use facts or numbers that are not in the input; if data is missing — write “Missing:”.</span>'
    ],
    [
      'data-copy-text="Vaidmuo: Tu esi mano darbo asistentas. Tikslas: [KĄ TURIU PADARYTI ŠIĄ SAVAITĘ]. Įvestis: [ĮKLIJUOK el. laišką / užrašus / užduotis]. Rezultatas: 7 punktų sąrašas (prioritetas A/B/C + terminas, jei paminėtas). Apribojimas: nenaudok faktų ar skaičių, kurių nėra įvestyje; jei trūksta duomenų — parašyk „Trūksta:“." aria-label="Kopijuoti „po“ užklausą"',
      'data-copy-text="Role: You are my work assistant. Goal: [WHAT I MUST DO THIS WEEK]. Input: [PASTE email / notes / task]. Output: 7-bullet list (A/B/C priority + deadline if mentioned). Constraint: do not use facts or numbers that are not in the input; if data is missing — write “Missing:”." aria-label="Copy the “after” prompt"'
    ],
    ['data-track="practice_after_copy">Kopijuoti</button>', 'data-track="practice_after_copy">Copy</button>'],

    ['<p class="types-primer-quick-k">Patikra (30 sek.)</p>', '<p class="types-primer-quick-k">Check (30 sec)</p>'],
    [
      '<p class="types-primer-quick-desc">30 sekundžių: rizikos, kas tinka, ką patikrinti ne DI, ko trūksta.</p>',
      '<p class="types-primer-quick-desc">30 seconds: risks, what is safe, what to verify without AI, what context is missing.</p>'
    ],
    [
      '<p class="types-card-example types-primer-quick-example">Trumpa patikra: 1) 3 rizikos, 2) kas tinka naudoti, 3) ką patikrinti ne DI, 4) ko trūksta kontekste.</p>',
      '<p class="types-card-example types-primer-quick-example">Short check: 1) 3 risks, 2) what is safe to use, 3) what to verify without AI, 4) what context is missing.</p>'
    ],
    [
      'data-copy-text="Trumpa patikra: 1) 3 rizikos, 2) kas tinka naudoti, 3) ką patikrinti ne DI, 4) ko trūksta kontekste." aria-label="Kopijuoti patikros mini-checklist"',
      'data-copy-text="Short check: 1) 3 risks, 2) what is safe to use, 3) what to verify without AI, 4) what context is missing." aria-label="Copy mini checklist"'
    ],
    ['data-track="practice_qc_copy">Kopijuoti</button>', 'data-track="practice_qc_copy">Copy</button>'],
    ['data-track="practice_next_click">Kelio planas ↓</a>', 'data-track="practice_next_click">Roadmap ↓</a>'],
    ['data-track="practice_qc_jump">Patikra →</a>', 'data-track="practice_qc_jump">Check →</a>'],

    [
      '<section id="roadmap" class="roadmap-slide" aria-label="Pradėk nuo 5–15 min"',
      '<section id="roadmap" class="roadmap-slide" aria-label="Start with 5–15 min"'
    ],
    ['<span class="label">Kelio planas</span>', '<span class="label">Roadmap</span>'],
    ['<h2>Pradėk nuo 5–15 min</h2>', '<h2>Start with 5–15 min</h2>'],
    [
      '<p class="roadmap-sub">Pirma patikra (5–15 min). Kiti šablonai — kai prireiks.</p>',
      '<p class="roadmap-sub">The check first (5–15 min). The other templates — when you need them.</p>'
    ],
    ['<span class="roadmap-name">Greita siuntimo patikra</span>', '<span class="roadmap-name">Quick send check</span>'],
    ['<span class="roadmap-name">Susitikimo ar sprinto planas</span>', '<span class="roadmap-name">Meeting or sprint plan</span>'],
    ['<span class="roadmap-name">Ta pati žinutė — 3 lygiai</span>', '<span class="roadmap-name">Same message — three levels</span>'],
    ['<span class="roadmap-name">Turinio grįžtamasis ryšys</span>', '<span class="roadmap-name">Content feedback</span>'],
    ['<span class="roadmap-name">Užduotis / mokymas komandai</span>', '<span class="roadmap-name">Assignment / team learning</span>'],
    ['<span class="roadmap-name">Laiškas ar žinutė (juodraštis)</span>', '<span class="roadmap-name">Email or message (draft)</span>'],

    ['<section id="meeting" aria-label="Susitikimo ar sprinto planas">', '<section id="meeting" aria-label="Meeting or sprint plan">'],
    ['<section aria-label="Ta pati žinutė — 3 lygiai">', '<section aria-label="Same message — three levels">'],
    ['<section aria-label="Turinio grįžtamasis ryšys">', '<section aria-label="Content feedback">'],
    ['<section aria-label="Užduotis / mokymas komandai">', '<section aria-label="Assignment / team learning">'],
    ['<section aria-label="Laiškas ar žinutė (juodraštis)">', '<section aria-label="Email or message (draft)">'],

    ['<section id="qc" aria-label="Greita siuntimo patikra"', '<section id="qc" aria-label="Quick send check"'],
    ['<span class="label">Saugumas</span>', '<span class="label">Safety</span>'],
    ['<h2>Greita siuntimo patikra</h2>', '<h2>Quick send check</h2>'],
    [
      '<p class="slide-sublead slide-lead">Įklijuok tekstą, kurį siųsi.</p>',
      '<p class="slide-sublead slide-lead">Paste the text you will send.</p>'
    ],
    [
      '<div class="prompt-line"><b>VAIDMUO</b> Tu esi atsakingas specialistas ir informacijos kritikas: žinai, kad DI gali klysti ar išgalvoti faktus.</div>',
      '<div class="prompt-line"><b>ROLE</b> You are a responsible specialist and information critic: you know the AI can be wrong or invent facts.</div>'
    ],
    [
      '<div class="prompt-line"><b>KONTEKSTAS</b> Kur naudosiu: [kliento laiške / vidinėje ataskaitoje / pasiūlyme / sutartyje / pristatyme]. Sritis: [Sritis], auditorija: [Auditorija]. Įklijuok čia visą DI paruoštą tekstą, kurį ketini naudoti kaip siunčiamą ar pateikiamą versiją: [TEKSTAS].</div>',
      '<div class="prompt-line"><b>CONTEXT</b> Where I will use it: [client email / internal report / proposal / contract / deck]. Domain: [Domain], audience: [Audience]. Paste the full AI draft you plan to send or submit as final: [TEXT].</div>'
    ],
    [
      '<div class="prompt-line"><b>REZULTATAS</b> 1) 3 didžiausios rizikos (faktinės, teisinės ar komunikacinės). 2) Kas tinka naudoti be pakeitimų. 3) Ką patikrinti nepriklausomu šaltiniu (ne vien DI). 4) Ko trūksta kontekste tikslesniam atsakymui.</div>',
      '<div class="prompt-line"><b>OUTPUT</b> 1) Top 3 risks (factual, legal, or comms). 2) What is safe to use unchanged. 3) What to verify with an independent source (not AI alone). 4) What context is missing for a sharper answer.</div>'
    ],
    ['<button type="button" class="copy-prompt-btn" data-track="qc_copy_click">Kopijuoti patikrą</button>', '<button type="button" class="copy-prompt-btn" data-track="qc_copy_click">Copy check</button>'],
    [
      '</svg></span> Rizikos matomos prieš siuntimą.</div>',
      '</svg></span> Risks are visible before you send.</div>'
    ],
    [
      '<p class="qc-next"><a class="inline-link inline-link--accent" href="#meeting" data-track="qc_next_template">Susitikimo planas</a> · <a class="inline-link inline-link--soft" href="#library" data-track="qc_to_library">Biblioteka</a></p>',
      '<p class="qc-next"><a class="inline-link inline-link--accent" href="#meeting" data-track="qc_next_template">Meeting plan</a> · <a class="inline-link inline-link--soft" href="#library" data-track="qc_to_library">Library</a></p>'
    ],

    [
      'src="assets/memes/meme-after-roadmap-lt.png"',
      'src="assets/memes/meme-after-roadmap.png"'
    ],
    [
      'alt="Dvi pusės: kairėje CHAOSAS — chaotiškas pokalbis su perbrauktu vaizdu ir trumpais prašymais; dešinėje KONTROLĖ — vaidmuo, kontekstas, rezultatas, kriterijai ir švarus logotipas. Antraštė: „DI nėra chaotiškas. Tavo užklausa – taip.“"',
      'alt="Split graphic: CHAOS — messy chat with crossed-out images and short asks; CONTROL — Role, Context, Output, Criteria and a clean logo. Headline: AI isn’t random. Your input is."'
    ],

    ['<span class="label">01 • Struktūra</span>', '<span class="label">01 • Structure</span>'],
    ['<h2>Susitikimo ar sprinto planas</h2>', '<h2>Meeting or sprint plan</h2>'],
    [
      '<p class="slide-sublead slide-lead">Viena lentelė: laikas, veikla, tikslas — ir keli klausimai sprendimui.</p>',
      '<p class="slide-sublead slide-lead">One table: time, activity, goal — plus a few decision questions.</p>'
    ],
    [
      '<div class="prompt-line"><b>UŽDUOTIS</b> Sudaryk susitikimo ar sprinto planą lentele (laikas · veikla · tikslas) ir pridėk 3 klausimus, kurie padėtų priimti sprendimą.</div>',
      '<div class="prompt-line"><b>TASK</b> Build a meeting or sprint plan as a table (time · activity · goal) and add 3 questions that help decide.</div>'
    ],
    [
      '<div class="prompt-line"><b>ĮVESTIS</b> Trukmė: [pvz. 60 min.]. Tema: [TEMA]. Komanda / rolės: [KAS DALYVAUJA]. Jie jau žino: [KĄ SUTAREI ANKSČIAU].</div>',
      '<div class="prompt-line"><b>INPUT</b> Duration: [e.g. 60 min]. Topic: [TOPIC]. Team / roles: [WHO JOINS]. They already know: [WHAT YOU AGREED BEFORE].</div>'
    ],
    [
      '<div class="prompt-line"><b>REZULTATAS</b> Lentelę su stulpeliais Laikas | Veikla | Tikslas, po ja — 3 klausimus.</div>',
      '<div class="prompt-line"><b>OUTPUT</b> A table with columns Time | Activity | Goal, then 3 questions below.</div>'
    ],
    ['<button type="button" class="copy-prompt-btn" data-track="template_copy_meeting">Kopijuoti užklausą</button>', '<button type="button" class="copy-prompt-btn" data-track="template_copy_meeting">Copy prompt</button>'],
    ['<button type="button" class="copy-prompt-btn" data-track="template_copy_levels">Kopijuoti užklausą</button>', '<button type="button" class="copy-prompt-btn" data-track="template_copy_levels">Copy prompt</button>'],
    ['<button type="button" class="copy-prompt-btn" data-track="template_copy_feedback">Kopijuoti užklausą</button>', '<button type="button" class="copy-prompt-btn" data-track="template_copy_feedback">Copy prompt</button>'],
    ['<button type="button" class="copy-prompt-btn" data-track="template_copy_team">Kopijuoti užklausą</button>', '<button type="button" class="copy-prompt-btn" data-track="template_copy_team">Copy prompt</button>'],
    ['<button type="button" class="copy-prompt-btn" data-track="template_copy_email">Kopijuoti užklausą</button>', '<button type="button" class="copy-prompt-btn" data-track="template_copy_email">Copy prompt</button>'],
    [
      '</svg></span> Planas paruoštas per kelias minutes.</div>',
      '</svg></span> Plan ready in a few minutes.</div>'
    ],

    ['<span class="label">02 • Trys lygiai</span>', '<span class="label">02 • Three levels</span>'],
    ['<h2>Ta pati žinutė — 3 lygiai</h2>', '<h2>Same message — three levels</h2>'],
    [
      '<p class="slide-sublead slide-lead">Bazinis, vidutinis, pažengęs — ta pati esmė, skirtingas gilumas.</p>',
      '<p class="slide-sublead slide-lead">Basic, intermediate, advanced — same core, different depth.</p>'
    ],
    [
      '<div class="prompt-line"><b>UŽDUOTIS</b> Parašyk tą pačią žinutę ar užduotį trimis sudėtingumo lygiais (bazinis, vidutinis, pažengęs).</div>',
      '<div class="prompt-line"><b>TASK</b> Write the same message or task at three difficulty levels (basic, intermediate, advanced).</div>'
    ],
    [
      '<div class="prompt-line"><b>ĮVESTIS</b> Tema ar užduotis: [TEMA]. Kas skaito: [pvz. junior / senior, klientas / vidinė komanda]. Pradinė mintis ar juodraštis (jei yra): [TEKSTAS].</div>',
      '<div class="prompt-line"><b>INPUT</b> Topic or task: [TOPIC]. Reader: [e.g. junior / senior, client / internal team]. Starting idea or draft (if any): [TEXT].</div>'
    ],
    [
      '<div class="prompt-line"><b>REZULTATAS</b> Tris aiškiai atskirtas versijas su antraštėmis Bazinis / Vidutinis / Pažengęs; tonas ir detalumas turi augti kartu su lygiu.</div>',
      '<div class="prompt-line"><b>OUTPUT</b> Three clearly separated versions titled Basic / Intermediate / Advanced; tone and detail should scale with level.</div>'
    ],
    [
      '</svg></span> Vienas šablonas — kelios auditorijos.</div>',
      '</svg></span> One template — several audiences.</div>'
    ],

    ['<span class="label">03 • Grįžtamasis ryšys</span>', '<span class="label">03 • Feedback</span>'],
    ['<h2>Turinio grįžtamasis ryšys</h2>', '<h2>Content feedback</h2>'],
    [
      '<p class="slide-sublead slide-lead">Įvertinimas ir vienas pirmas pakeitimas.</p>',
      '<p class="slide-sublead slide-lead">A review and one first change.</p>'
    ],
    [
      '<div class="prompt-line"><b>UŽDUOTIS</b> Įvertink pagal kriterijus ir duok vieną aiškų patarimą, ką pakeisti pirmiausia.</div>',
      '<div class="prompt-line"><b>TASK</b> Score against the criteria and give one clear change to make first.</div>'
    ],
    [
      '<div class="prompt-line"><b>ĮVESTIS</b> Tekstas ar darbas: [TEKSTAS]. Vertinimo kriterijai: [Kriterijai].</div>',
      '<div class="prompt-line"><b>INPUT</b> Text or work: [TEXT]. Criteria: [Criteria].</div>'
    ],
    [
      '<div class="prompt-line"><b>REZULTATAS</b> Trumpą įvertinimą (balas ar lygis), 3 stiprias vietas, 1 konkretų tobulinimo žingsnį su pavyzdžiu.</div>',
      '<div class="prompt-line"><b>OUTPUT</b> Short assessment (score or level), 3 strengths, 1 concrete improvement step with an example.</div>'
    ],
    [
      '</svg></span> Vienas pakeitimas, ne dešimt taisymų.</div>',
      '</svg></span> One change, not ten fixes.</div>'
    ],

    ['<span class="label">04 • Komanda</span>', '<span class="label">04 • Team</span>'],
    ['<h2>Užduotis / mokymas komandai</h2>', '<h2>Assignment / team learning</h2>'],
    [
      '<p class="slide-sublead slide-lead">Vienas konkretus formatas — pvz. patikrinimas ar praktinė užduotis — su instrukcija komandai.</p>',
      '<p class="slide-sublead slide-lead">One concrete format — e.g. knowledge check or hands-on task — with instructions for the team.</p>'
    ],
    [
      '<div class="prompt-line"><b>UŽDUOTIS</b> Sukurk trumpą medžiagą ar užduotį; naudok pateiktą pavyzdį, kad būtų įtaigi ir pritaikoma.</div>',
      '<div class="prompt-line"><b>TASK</b> Create short material or a task; use the example so it feels relevant and usable.</div>'
    ],
    [
      '<div class="prompt-line"><b>ĮVESTIS</b> Tema: [TEMA]. Auditorija: [Komanda / rolė]. Formatas: [žinių patikrinimas / praktinė užduotis]. Pavyzdys iš tavo veiklos ar proceso: [TRUMPAI].</div>',
      '<div class="prompt-line"><b>INPUT</b> Topic: [TOPIC]. Audience: [Team / role]. Format: [knowledge check / hands-on task]. Example from your work or process: [BRIEF].</div>'
    ],
    [
      '<div class="prompt-line"><b>REZULTATAS</b> Paruoštą tekstą su aiškia instrukcija komandai; jei tinka — atsakymų ar vertinimo raktą.</div>',
      '<div class="prompt-line"><b>OUTPUT</b> Ready text with clear team instructions; if useful, an answer key or rubric.</div>'
    ],
    [
      '</svg></span> Užduotis komandai su terminu.</div>',
      '</svg></span> A team task with a deadline.</div>'
    ],

    ['<span class="label">05 • Komunikacija</span>', '<span class="label">05 • Communication</span>'],
    ['<h2>Laiškas ar žinutė (juodraštis)</h2>', '<h2>Email or message (draft)</h2>'],
    [
      '<p class="slide-sublead slide-lead">Iki ~100 žodžių: problema, sprendimas, aiškus kitas žingsnis.</p>',
      '<p class="slide-sublead slide-lead">Up to ~100 words: problem, solution, clear next step.</p>'
    ],
    [
      '<div class="prompt-line"><b>UŽDUOTIS</b> Paruošk vieną juodraštį; struktūra: problema → sprendimas → kvietimas veikti arba kitas aiškus žingsnis.</div>',
      '<div class="prompt-line"><b>TASK</b> Produce one draft; structure: problem → solution → call to action or another clear next step.</div>'
    ],
    [
      '<div class="prompt-line"><b>ĮVESTIS</b> Kam rašai: [komanda / klientas / partneris]. Situacija (faktai): [KAS ĮVYKO]. Tonas: profesionalus, bet šiltas. Riba: iki 100 žodžių.</div>',
      '<div class="prompt-line"><b>INPUT</b> Who you write to: [team / client / partner]. Situation (facts): [WHAT HAPPENED]. Tone: professional but warm. Limit: up to 100 words.</div>'
    ],
    [
      '<div class="prompt-line"><b>REZULTATAS</b> Vieną paruoštą tekstą; jei tinka — antrą, trumpesnį variantą (pvz. Slack / Teams).</div>',
      '<div class="prompt-line"><b>OUTPUT</b> One ready text; if useful, a second shorter variant (e.g. Slack / Teams).</div>'
    ],
    [
      '</svg></span> Laiškas su aiškiu kitu žingsniu.</div>',
      '</svg></span> A letter with a clear next step.</div>'
    ],

    ['<section id="library" class="library-slide" aria-label="Promptų biblioteka (resursai)"', '<section id="library" class="library-slide" aria-label="Prompt library (resources)"'],
    ['<span class="label">Biblioteka</span>', '<span class="label">Library</span>'],
    ['<h2>Promptų biblioteka</h2>', '<h2>Prompt library</h2>'],
    [
      '<p class="library-lead">Čia — paruoštos užklausos į DI: atsidaryk kategoriją ir nukopijuok. Dažniausias startas: <a class="inline-link inline-link--accent" href="#lib-cat-work" data-track="library_quick_work">Kasdienis darbas</a> → dienos santrauka ar užduočių sąrašas.</p>',
      '<p class="library-lead">Here — ready-made prompts for AI: open a category and copy. Most common start: <a class="inline-link inline-link--accent" href="#lib-cat-work" data-track="library_quick_work">Daily work</a> → day summary or task list.</p>'
    ],
    ['aria-label="Bibliotekos auditorija"', 'aria-label="Library audience"'],
    ['aria-label="Bibliotekos valdikliai"', 'aria-label="Library controls"'],
    ['>Darbuotojas</button>', '>Individual contributor</button>'],
    ['>Vadovas</button>', '>Leader</button>'],
    [
      'aria-label="Išskleisti visas bibliotekos kategorijas ir instrukciją „Kaip naudoti“" data-track="library_toggle_all">Išskleisti viską</button>',
      'aria-label="Expand all library categories and the How to use section" data-track="library_toggle_all">Expand all</button>'
    ],
    [
      '<summary class="library-howto-summary"><span class="library-howto-summary__title">Kaip naudoti (30 sek.)</span></summary>',
      '<summary class="library-howto-summary"><span class="library-howto-summary__title">How to use (30 sec)</span></summary>'
    ],
    ['<li>„Kopijuoti“.</li>', '<li>“Copy”.</li>'],
    ['<li>Užpildyk <strong>[...]</strong>.</li>', '<li>Fill <strong>[...]</strong>.</li>'],
    [
      '<li>Jei atsakymas miglotas — <a class="inline-link inline-link--accent" href="#schema" data-track="library_back_to_schema">schema</a>, pridėk trūkstamą žingsnį.</li>',
      '<li>If the answer is fuzzy — <a class="inline-link inline-link--accent" href="#schema" data-track="library_back_to_schema">schema</a>, add the missing step.</li>'
    ],
    [
      '<summary class="library-cat-summary"><span class="library-cat-summary__title">Kasdienis darbas</span><span class="library-cat-summary__meta">3 šablonai</span></summary>',
      '<summary class="library-cat-summary"><span class="library-cat-summary__title">Daily work</span><span class="library-cat-summary__meta">3 templates</span></summary>'
    ],
    ['<h4>Dienos santrauka</h4>', '<h4>Day summary</h4>'],
    [
      'aria-label="Kopijuoti dienos santraukos užklausą" data-track="library_copy_daySummary">Kopijuoti</button>',
      'aria-label="Copy day-summary prompt" data-track="library_copy_daySummary">Copy</button>'
    ],
    ['<h4>Užduočių sąrašas</h4>', '<h4>Task list</h4>'],
    [
      'aria-label="Kopijuoti užduočių sąrašo užklausą" data-track="library_copy_taskList">Kopijuoti</button>',
      'aria-label="Copy task-list prompt" data-track="library_copy_taskList">Copy</button>'
    ],
    ['<h4>Susitikimo užrašai</h4>', '<h4>Meeting notes</h4>'],
    [
      'aria-label="Kopijuoti susitikimo užrašų užklausą" data-track="library_copy_meetingNotes">Kopijuoti</button>',
      'aria-label="Copy meeting-notes prompt" data-track="library_copy_meetingNotes">Copy</button>'
    ],
    [
      '<summary class="library-cat-summary"><span class="library-cat-summary__title">Komunikacija</span><span class="library-cat-summary__meta">5 šablonai</span></summary>',
      '<summary class="library-cat-summary"><span class="library-cat-summary__title">Communication</span><span class="library-cat-summary__meta">5 templates</span></summary>'
    ],
    ['<h4>Atsakymas į laišką</h4>', '<h4>Email reply</h4>'],
    [
      'aria-label="Kopijuoti atsakymo į laišką užklausą" data-track="library_copy_emailReply">Kopijuoti</button>',
      'aria-label="Copy email-reply prompt" data-track="library_copy_emailReply">Copy</button>'
    ],
    ['<h4>Sutrumpinti tekstą</h4>', '<h4>Shorten text</h4>'],
    [
      'aria-label="Kopijuoti teksto trumpinimo užklausą" data-track="library_copy_simplifyText">Kopijuoti</button>',
      'aria-label="Copy shorten-text prompt" data-track="library_copy_simplifyText">Copy</button>'
    ],
    ['<h4>Sunki žinutė (terminas / klaida / pokytis)</h4>', '<h4>Hard message (deadline / error / change)</h4>'],
    [
      'aria-label="Kopijuoti sunkios žinutės užklausą" data-track="library_copy_hardUpdate">Kopijuoti</button>',
      'aria-label="Copy hard-message prompt" data-track="library_copy_hardUpdate">Copy</button>'
    ],
    ['<h4>Grįžtamasis ryšys po klaidos (1:1)</h4>', '<h4>Feedback after a mistake (1:1)</h4>'],
    [
      'aria-label="Kopijuoti grįžtamojo ryšio po klaidos užklausą" data-track="library_copy_feedbackAfterMistake">Kopijuoti</button>',
      'aria-label="Copy post-mistake feedback prompt" data-track="library_copy_feedbackAfterMistake">Copy</button>'
    ],
    ['<h4>Įtampos mažinimas (perrašyk žinutę)</h4>', '<h4>De-escalation (rewrite the message)</h4>'],
    [
      'aria-label="Kopijuoti įtampos mažinimo užklausą" data-track="library_copy_deescalateMessage">Kopijuoti</button>',
      'aria-label="Copy de-escalation prompt" data-track="library_copy_deescalateMessage">Copy</button>'
    ],
    [
      '<summary class="library-cat-summary"><span class="library-cat-summary__title">Kokybė ir patikra</span><span class="library-cat-summary__meta">2 šablonai</span></summary>',
      '<summary class="library-cat-summary"><span class="library-cat-summary__title">Quality and checks</span><span class="library-cat-summary__meta">2 templates</span></summary>'
    ],
    ['<h4>Užklausos kokybės patikrinimas (pagal 5 principus)</h4>', '<h4>Prompt quality check (five principles)</h4>'],
    [
      '<p class="library-goal">Įklijuok savo užklausą (promptą) ir paleisk.</p>',
      '<p class="library-goal">Paste your prompt and run.</p>'
    ],
    [
      'aria-label="Kopijuoti užklausos kokybės patikrinimo užklausą" data-track="library_copy_qualityCheck">Kopijuoti</button>',
      'aria-label="Copy quality-check prompt" data-track="library_copy_qualityCheck">Copy</button>'
    ],
    ['<h4>Apribojimai ir formatas</h4>', '<h4>Constraints and format</h4>'],
    [
      'aria-label="Kopijuoti apribojimų ir formato užklausą" data-track="library_copy_constraints">Kopijuoti</button>',
      'aria-label="Copy constraints-and-format prompt" data-track="library_copy_constraints">Copy</button>'
    ],

    ['<section aria-label="Esmė"', '<section aria-label="The point"'],
    [
      'src="assets/memes/su_2.png"',
      'src="assets/memes/su_1.png"'
    ],
    [
      'alt="Išsprogdintas suši, iš apačios į viršų: nori — 1 Vaidmuo, ryžiai — 2 Kontekstas, lašiša — 3 Rezultatas, avokadas — 4 Mąstymas, sezamai — 5 Kokybės kontrolė."',
      'alt="Exploded sushi, bottom to top: nori — 1 Role, rice — 2 Context, salmon — 3 Result, avocado — 4 Thinking, sesame — 5 Quality control."'
    ],
    ['<h2 class="essence-tagline">Be struktūros DI spėlioja.</h2>', '<h2 class="essence-tagline">Without structure, AI guesses.</h2>'],
    [
      '<p class="essence-lead">\n            Modelis nustato galimybes.<br><strong>Procesas</strong> lemia, ar tas rezultatas išlieka darbe ir komandoje.\n        </p>',
      '<p class="essence-lead">\n            The model sets what is possible.<br><strong>Process</strong> determines whether that result sticks at work and in the team.\n        </p>'
    ],

    ['<section class="quiz-slide" aria-label="Vienas klausimas"', '<section class="quiz-slide" aria-label="One question"'],
    [
      'data-msg-select="Pažymėk atsakymą ir spausk „Žiūrėk“."',
      'data-msg-select="Mark an answer and press “See result”."'
    ],
    [
      'data-feedback-correct="Teisingai: vaidmuo, kontekstas ir aiškus pageidaujamas rezultatas leidžia DI atsakyti pagal tavo užduotį."',
      'data-feedback-correct="Correct: role, context, and a clear desired output let the AI answer in line with your task."'
    ],
    [
      'data-feedback-wrong="Be aiškaus vaidmens ir konkretaus konteksto DI spėlioja. Vien prašymas būti kūrybingam, bendras tonas ar labai trumpa užklausa neperduoda, kokio turinio ir formato tikiesi."',
      'data-feedback-wrong="Without a clear role and concrete context the AI guesses. A vague “be creative” line, tone alone, or a very short prompt does not say what content or format you want."'
    ],
    ['<legend class="label">Vienas atsakymas</legend>', '<legend class="label">One answer</legend>'],
    [
      '<h2 class="quiz-question" id="quiz-question-heading">Ką įtraukti į užklausą (promptą), kad DI atsakymas būtų naudingas?</h2>',
      '<h2 class="quiz-question" id="quiz-question-heading">What should you put in a prompt so the AI answer is useful?</h2>'
    ],
    [
      '<span class="quiz-option-text">Užtenka aiškios temos ir norimo formato (pvz. „lentelė“), net jei nenurodau vaidmens ir konteksto.</span>',
      '<span class="quiz-option-text">A clear topic and desired format (e.g. “table”) are enough even if I skip role and context.</span>'
    ],
    [
      '<span class="quiz-option-text">Užtenka vienos eilutės, pvz. „Paruošk ataskaitą apie…“ — be konteksto, tikslo ir pageidaujamo rezultato.</span>',
      '<span class="quiz-option-text">One line is enough, e.g. “Prepare a report on…” — without context, goal, or desired output.</span>'
    ],
    [
      '<span class="quiz-option-text">Pakanka vaidmens ir tono (pvz. „rašyk vadovybei“), net jei nepasakau, kokių faktų DI turi žinoti ir kaip mąstyti.</span>',
      '<span class="quiz-option-text">Role and tone (e.g. “write for leadership”) are enough even if I do not say what facts the AI should know or how to reason.</span>'
    ],
    [
      '<span class="quiz-option-text">Vaidmuo (kas esi ir ko sieki), kontekstas (projektas, auditorija, ką jau žino komanda) ir pageidaujamas rezultato formatas.</span>',
      '<span class="quiz-option-text">Role (who you are and what you want), context (project, audience, what the team already knows), and the desired output format.</span>'
    ],
    [
      '<span class="quiz-option-text">Pakanka nurodyti tik bendrą toną (draugiškas ar formalus), be temos, auditorijos ir norimo formato.</span>',
      '<span class="quiz-option-text">It is enough to set a general tone (friendly or formal) without topic, audience, or desired format.</span>'
    ],
    ['<button type="button" class="quiz-check-btn" id="quiz-check-btn">Žiūrėk</button>', '<button type="button" class="quiz-check-btn" id="quiz-check-btn">See result</button>'],
    ['<button type="button" class="quiz-reset-btn" id="quiz-reset-btn" hidden>Kitas bandymas</button>', '<button type="button" class="quiz-reset-btn" id="quiz-reset-btn" hidden>Try once more</button>'],

    ['<section id="cta" aria-label="PDF santrauka ir kitas žingsnis"', '<section id="cta" aria-label="PDF summary and next step"'],
    ['<h2 class="cta-title">Ta pati sistema visai komandai.</h2>', '<h2 class="cta-title">The same system for the whole team.</h2>'],
    [
      'aria-label="Pagrindinis veiksmas: peržvelk mokamą programą ir kainą (naujame skirtuke)" data-track="paid_cta_click" data-track-dest="app">Peržvelk programą ir kainą</a>',
      'aria-label="Primary action: view the paid program and pricing (new tab)" data-track="paid_cta_click" data-track-dest="app">View program and pricing</a>'
    ],
    ['<p class="cta-secondary-label">Santrauka</p>', '<p class="cta-secondary-label">Summary</p>'],
    [
      'aria-label="Atsisiųsk 1 pamokos santrauką PDF" data-track="cta_pdf_click"',
      'aria-label="Download lesson 1 English summary (PDF)" data-track="cta_pdf_click"'
    ],
    [
      'aria-label="Bendruomenės Telegram kanalas Prompt Anatomy (atidaryti naujame skirtuke)" data-track="cta_telegram_click"',
      'aria-label="Prompt Anatomy Telegram community (opens in a new tab)" data-track="cta_telegram_click"'
    ],
    ['Telegram (palaikymas ir naujienos)', 'Telegram (support and updates)'],
    [
      '<p class="cta-ecosystem-link">\n            <a class="link-tier-tertiary" href="https://promptanatomy.site/?utm_source=cloud&amp;utm_medium=cta_footer&amp;utm_campaign=ecosystem_map" target="_blank" rel="noopener noreferrer" data-track="cta_ecosystem_site_click" data-track-dest="site" aria-label="Ekosistemos žemėlapis promptanatomy.site (atidaryti naujame skirtuke)">Ekosistemos žemėlapis</a>\n        </p>',
      '<p class="cta-ecosystem-link">\n            <a class="link-tier-tertiary" href="https://promptanatomy.site/?utm_source=cloud&amp;utm_medium=cta_footer&amp;utm_campaign=ecosystem_map" target="_blank" rel="noopener noreferrer" data-track="cta_ecosystem_site_click" data-track-dest="site" aria-label="Ecosystem map on promptanatomy.site (opens in a new tab)">Ecosystem map</a>\n        </p>'
    ],
    [
      '<p class="cta-entity-footer">Promptų anatomija · programa → <a class="link-tier-tertiary" href="https://www.promptanatomy.app/?utm_source=cloud&amp;utm_medium=entity_footer&amp;utm_campaign=ecosystem" target="_blank" rel="noopener noreferrer" data-track="entity_footer_click" data-track-dest="app" aria-label="Promptų anatomijos programa promptanatomy.app (atidaryti naujame skirtuke)">promptanatomy.app</a></p>',
      '<p class="cta-entity-footer">Part of Prompt Anatomy · the program → <a class="link-tier-tertiary" href="https://www.promptanatomy.app/?utm_source=cloud&amp;utm_medium=entity_footer&amp;utm_campaign=ecosystem" target="_blank" rel="noopener noreferrer" data-track="entity_footer_click" data-track-dest="app" aria-label="Prompt Anatomy program at promptanatomy.app (opens in a new tab)">promptanatomy.app</a></p>'
    ],
    [CTA_FOOTNOTE_LT, CTA_FOOTNOTE_EN]
  ];
}

module.exports = { getEnHtmlReplacementPairs };
