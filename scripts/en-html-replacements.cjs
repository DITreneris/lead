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
    [
      'id="roomModeBtn" aria-pressed="false" aria-label="Salės režimas: šviesus fonas projektoriui">Salė</button>',
      'id="roomModeBtn" aria-pressed="false" aria-label="Room mode: light background for a projector">Room</button>'
    ],
    ['aria-label="Perjungti į lietuvių kalbą"', 'aria-label="Switch to Lithuanian"'],

    [
      '<summary class="slide-outline__summary disclosure-chip__summary"><span class="slide-outline__icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg></span>Turinys</summary>',
      '<summary class="slide-outline__summary disclosure-chip__summary"><span class="slide-outline__icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg></span>Contents</summary>'
    ],
    [
      'aria-label="Promptų Anatomija, pamokos pradžia"',
      'aria-label="Prompt Anatomy, start of the lesson"'
    ],
    ['<p class="brand-tagline">DI praktinė sistema</p>', '<p class="brand-tagline">Built for real work</p>'],

    [
      '<div class="brand-name"><span class="brand-prompt">Promptų</span> <span class="brand-anatomy">Anatomija</span></div>',
      '<div class="brand-name"><span class="brand-prompt">Prompt</span> <span class="brand-anatomy">Anatomy</span></div>'
    ],
    [
      '<h1>Trumpa užklausa tampa užduotimi.</h1>',
      '<h1>A short prompt becomes a task.</h1>'
    ],
    [
      '<p class="hero-intro slide-lead">Tas pats savaitės tikslas: rolė, tikslas, įvestis, rezultatas. Paleidi per 2 minutes.</p>',
      '<p class="hero-intro slide-lead">Same weekly goal: role, goal, input, result. You run it in 2 minutes.</p>'
    ],
    ['<p class="intro-proof-kicker">Prieš</p>', '<p class="intro-proof-kicker">Before</p>'],
    ['<p class="intro-proof-kicker">Po</p>', '<p class="intro-proof-kicker">After</p>'],
    [
      '<p class="intro-proof-before">„Paruošk ataskaitą apie mūsų savaitės prioritetus.“</p>',
      '<p class="intro-proof-before">“Prepare a report on our weekly priorities.”</p>'
    ],
    [
      '<div class="practice-structured-line"><strong>Rolė</strong> <span>darbo asistentas</span></div>',
      '<div class="practice-structured-line"><strong>Role</strong> <span>work assistant</span></div>'
    ],
    [
      '<div class="practice-structured-line"><strong>Tikslas</strong> <span>savaitės prioritetai</span></div>',
      '<div class="practice-structured-line"><strong>Goal</strong> <span>this week’s priorities</span></div>'
    ],
    [
      '<div class="practice-structured-line"><strong>Kontekstas</strong> <span>užrašai / laiškai</span></div>',
      '<div class="practice-structured-line"><strong>Context</strong> <span>notes / emails</span></div>'
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
      'aria-label="Skaidrė 5: Tavo kelias, kaip sutaupyti iki 5 val. per savaitę"',
      'aria-label="Slide 5: Your path to save up to 5 hours weekly"'
    ],
    ['aria-label="Skaidrė 6: Laiškas ar žinutė (juodraštis)"', 'aria-label="Slide 6: Email or message (draft)"'],
    ['aria-label="Skaidrė 7: Susitikimo ar sprinto planas"', 'aria-label="Slide 7: Meeting or sprint plan"'],
    ['aria-label="Skaidrė 8: Viena žinutė, trys versijos"', 'aria-label="Slide 8: One message, three versions"'],
    ['aria-label="Skaidrė 9: Teksto įvertinimas"', 'aria-label="Slide 9: Text review"'],
    ['aria-label="Skaidrė 10: Užduotis / mokymas komandai"', 'aria-label="Slide 10: Assignment / team learning"'],
    ['aria-label="Skaidrė 11: Greita patikra"', 'aria-label="Slide 11: Quick check"'],
    ['aria-label="Skaidrė 12: Promptų biblioteka (resursai)"', 'aria-label="Slide 12: Prompt library (resources)"'],
    ['aria-label="Skaidrė 13: Esmė"', 'aria-label="Slide 13: The point"'],
    ['aria-label="Skaidrė 14: Vienas klausimas"', 'aria-label="Slide 14: One question"'],
    ['aria-label="Skaidrė 15: PDF santrauka ir kitas žingsnis"', 'aria-label="Slide 15: PDF summary and next step"'],

    ['aria-label="Skaidrių navigacija (mobilusis)"', 'aria-label="Slide navigation (mobile)"'],
    [
      '<button type="button" class="nav-mobile-step" id="nav-mobile-prev" disabled aria-label="Ankstesnė skaidrė">Ankstesnė</button>',
      '<button type="button" class="nav-mobile-step" id="nav-mobile-prev" disabled aria-label="Previous slide">Previous</button>'
    ],
    [
      '<button type="button" class="nav-mobile-step" id="nav-mobile-next" aria-label="Kita skaidrė">Kita</button>',
      '<button type="button" class="nav-mobile-step" id="nav-mobile-next" aria-label="Next slide">Next</button>'
    ],
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
      '<details class="hero-faq geo-faq-anchor disclosure-chip disclosure-chip--inline" data-geo-faq="1">\n                <summary class="hero-faq__summary disclosure-chip__summary">DUK (trumpai)</summary>\n                <div class="hero-faq__panel disclosure-chip__panel">\n                    <div class="hero-faq__item"><strong>Ką įrašyti į užklausą vadovybės atnaujinimui?</strong> Auditoriją, kontekstą, ribas ir rezultatą (punktai, lentelė ar sprendimo santrauka). Pridėk sėkmės kriterijų.</div>\n                    <div class="hero-faq__item"><strong>Kaip sumažinti pramanytus faktus klientų laiškuose?</strong> Įklijuok šaltinio pastabas, prašyk citatų ir paleisk trumpą patikrą: kuriuos sakinius galima siųsti ir ką patikrinti ne DI.</div>\n                    <div class="hero-faq__item"><strong>Kas yra greita patikra?</strong> Keturi punktai prieš siuntimą: trys rizikos su citata, sakiniai, kuriuos galima siųsti, ką patikrinti ne DI, ir sąrašas „Trūksta:“.</div>\n                    <div class="hero-faq__item"><strong>Kaip gauti tą patį rezultatą visoje komandoje?</strong> Naudok vieną šabloną (rolė, kontekstas, rezultatas), tada kartok su tuo pačiu sąrašu.</div>\n                </div>\n            </details>',
      '<details class="hero-faq geo-faq-anchor disclosure-chip disclosure-chip--inline" data-geo-faq="1">\n                <summary class="hero-faq__summary disclosure-chip__summary">FAQ (for leaders)</summary>\n                <div class="hero-faq__panel disclosure-chip__panel">\n                    <div class="hero-faq__item"><strong>What should I include in a prompt for leadership updates?</strong> Audience, context, constraints, and the exact output format (bullets, table, decision memo). Add success criteria.</div>\n                    <div class="hero-faq__item"><strong>How do I reduce hallucinated facts in client emails?</strong> Paste source notes, ask for citations/quotes, and run a quick check: which sentences you can send and what to check outside the AI.</div>\n                    <div class="hero-faq__item"><strong>What’s a quick check?</strong> Four points before you send: three risks with a quote, sentences you can send, what to check outside the AI, and a “Missing:” list.</div>\n                    <div class="hero-faq__item"><strong>How do I get consistent outputs across my team?</strong> Use one shared template (role, context, and output), then iterate with the same checklist.</div>\n                </div>\n            </details>'
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
      '<p class="schema-lead slide-lead">Pradėk nuo rolės, konteksto ir rezultato.<br>Penkias schemos dalis naudok tada, kai užduotis yra sudėtinga.</p>',
      '<p class="schema-lead slide-lead">Start with role, context, and output.<br>Use the five parts of the schema when the task is complex.</p>'
    ],
    [
      '<strong>Rolė</strong>\n                            <span>Kas esi</span>',
      '<strong>Role</strong>\n                            <span>Who you are</span>'
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
      '<span>Rolė: Tu esi mano darbo asistentas.</span>',
      '<span>Role: You are my work assistant.</span>'
    ],
    [
      '<span>Tikslas: [KĄ TURIU PADARYTI ŠIĄ SAVAITĘ].</span>',
      '<span>Goal: [WHAT I MUST DO THIS WEEK].</span>'
    ],
    [
      '<span>Kontekstas: [ĮKLIJUOK el. laišką / užrašus / užduotis].</span>',
      '<span>Context: [PASTE email / notes / task].</span>'
    ],
    [
      '<span>Rezultatas: 7 punktų sąrašas (prioritetas A/B/C + terminas, jei paminėtas).</span>',
      '<span>Output: 7-bullet list (A/B/C priority + deadline if mentioned).</span>'
    ],
    [
      '<span>Apribojimas: nenaudok faktų ar skaičių, kurių nėra kontekste; jei trūksta duomenų — parašyk „Trūksta:“.</span>',
      '<span>Constraint: do not use facts or numbers that are not in the context; if data is missing — write “Missing:”.</span>'
    ],
    [
      'data-copy-text="Rolė: Tu esi mano darbo asistentas. Tikslas: [KĄ TURIU PADARYTI ŠIĄ SAVAITĘ]. Kontekstas: [ĮKLIJUOK el. laišką / užrašus / užduotis]. Rezultatas: 7 punktų sąrašas (prioritetas A/B/C + terminas, jei paminėtas). Apribojimas: nenaudok faktų ar skaičių, kurių nėra kontekste; jei trūksta duomenų — parašyk „Trūksta:“." aria-label="Kopijuoti „po“ užklausą"',
      'data-copy-text="Role: You are my work assistant. Goal: [WHAT I MUST DO THIS WEEK]. Context: [PASTE email / notes / task]. Output: 7-bullet list (A/B/C priority + deadline if mentioned). Constraint: do not use facts or numbers that are not in the context; if data is missing — write “Missing:”." aria-label="Copy the “after” prompt"'
    ],
    ['data-track="practice_after_copy">Kopijuoti</button>', 'data-track="practice_after_copy">Copy</button>'],

    ['<p class="types-primer-quick-k">Patikra (30 sek.)</p>', '<p class="types-primer-quick-k">Check (30 sec)</p>'],
    [
      '<p class="types-primer-quick-desc">30 sekundžių: trys rizikos, ką siųsti, ką tikrinti ne DI, ko trūksta.</p>',
      '<p class="types-primer-quick-desc">30 seconds: three risks, what to send, what to check outside the AI, what is missing.</p>'
    ],
    [
      '<p class="types-card-example types-primer-quick-example">Trumpa patikra: 1) trys rizikos su citata, 2) sakiniai, kuriuos galima siųsti, 3) ką patikrinti ne DI, 4) sąrašas „Trūksta:“.</p>',
      '<p class="types-card-example types-primer-quick-example">Short check: 1) three risks with a quote, 2) sentences you can send, 3) what to check outside the AI, 4) a “Missing:” list.</p>'
    ],
    [
      'data-copy-text="Trumpa patikra: 1) trys rizikos su citata, 2) sakiniai, kuriuos galima siųsti, 3) ką patikrinti ne DI, 4) sąrašas „Trūksta:“." aria-label="Kopijuoti patikros mini-checklist"',
      'data-copy-text="Short check: 1) three risks with a quote, 2) sentences you can send, 3) what to check outside the AI, 4) a “Missing:” list." aria-label="Copy mini checklist"'
    ],
    ['data-track="practice_qc_copy">Kopijuoti</button>', 'data-track="practice_qc_copy">Copy</button>'],
    ['data-track="practice_next_click">Kelio planas ↓</a>', 'data-track="practice_next_click">Roadmap ↓</a>'],
    ['data-track="practice_qc_jump">Patikra →</a>', 'data-track="practice_qc_jump">Check →</a>'],

    [
      '<section id="roadmap" class="roadmap-slide" aria-label="Tavo kelias, kaip sutaupyti iki 5 val. per savaitę"',
      '<section id="roadmap" class="roadmap-slide" aria-label="Your path to save up to 5 hours weekly"'
    ],
    ['<span class="label">Kelio planas</span>', '<span class="label">Roadmap</span>'],
    ['<h2>Tavo kelias, kaip sutaupyti iki 5 val. per savaitę</h2>', '<h2>Your path to save up to 5 hours weekly</h2>'],
    ['<span class="roadmap-name">Greita patikra</span>', '<span class="roadmap-name">Quick check</span>'],
    ['<span class="roadmap-name">Susitikimo ar sprinto planas</span>', '<span class="roadmap-name">Meeting or sprint plan</span>'],
    ['<span class="roadmap-name">Viena žinutė, trys versijos</span>', '<span class="roadmap-name">One message, three versions</span>'],
    ['<span class="roadmap-name">Teksto įvertinimas</span>', '<span class="roadmap-name">Text review</span>'],
    ['<span class="roadmap-name">Užduotis / mokymas komandai</span>', '<span class="roadmap-name">Assignment / team learning</span>'],
    ['<span class="roadmap-name">Laiškas ar žinutė (juodraštis)</span>', '<span class="roadmap-name">Email or message (draft)</span>'],
    [
      '<div class="roadmap-total">Iš viso iki ≈ 5 val. / sav. (priklauso nuo naudojimo dažnio)</div>',
      '<div class="roadmap-total">Up to ~5 hrs / week (depends how often you use it)</div>'
    ],

    ['<section id="meeting" aria-label="Susitikimo ar sprinto planas">', '<section id="meeting" aria-label="Meeting or sprint plan">'],
    ['<section aria-label="Viena žinutė, trys versijos">', '<section aria-label="One message, three versions">'],
    ['<section aria-label="Teksto įvertinimas">', '<section aria-label="Text review">'],
    ['<section aria-label="Užduotis / mokymas komandai">', '<section aria-label="Assignment / team learning">'],
    ['<section aria-label="Laiškas ar žinutė (juodraštis)">', '<section aria-label="Email or message (draft)">'],

    ['<section id="qc" aria-label="Greita patikra"', '<section id="qc" aria-label="Quick check"'],
    ['<span class="label">Saugumas</span>', '<span class="label">Safety</span>'],
    ['<h2>Greita patikra</h2>', '<h2>Quick check</h2>'],
    [
      '<p class="slide-sublead slide-lead">Įklijuok tekstą, kurį siųsi.</p>',
      '<p class="slide-sublead slide-lead">Paste the text you will send.</p>'
    ],
    [
      '<div class="prompt-line"><b>Rolė:</b> Tu esi informacijos kritikas. Žinai, kad DI gali išgalvoti faktus.</div>',
      '<div class="prompt-line"><b>Role:</b> You are an information critic. You know the AI can invent facts.</div>'
    ],
    [
      '<div class="prompt-line"><b>Tikslas:</b> Patikrink tekstą prieš siuntimą.</div>',
      '<div class="prompt-line"><b>Goal:</b> Check the text before it is sent.</div>'
    ],
    [
      '<div class="prompt-line"><b>Kontekstas:</b> Kur naudosiu: [kliento laiškas / vidinė ataskaita / pasiūlymas / sutartis / pristatymas]. Sritis: [SRITIS]. Auditorija: [AUDITORIJA]. Tekstas: [TEKSTAS].</div>',
      '<div class="prompt-line"><b>Context:</b> Where I will use it: [client email / internal report / proposal / contract / deck]. Domain: [DOMAIN]. Audience: [AUDIENCE]. Text: [TEXT].</div>'
    ],
    [
      '<div class="prompt-line"><b>Mąstymas:</b> Kiekvieną riziką rišk su vienu sakiniu iš teksto. Vienas tipas — viena rizika.</div>',
      '<div class="prompt-line"><b>Reasoning:</b> Tie each risk to one sentence from the text. One type — one risk.</div>'
    ],
    [
      '<div class="prompt-line"><b>Rezultatas:</b> 1) Trys rizikos: viena faktinė, viena teisinė, viena komunikacinė. Kiekviena cituoja sakinį. 2) Sakiniai, kuriuos galima siųsti be pakeitimų. Cituok juos. 3) Ką patikrinti ne DI. Kiekvienam punktui — ką būtent tikrinti. 4) Ko trūksta kontekste. Sąrašas „Trūksta:“.</div>',
      '<div class="prompt-line"><b>Output:</b> 1) Three risks: one factual, one legal, one about communication. Each quotes a sentence. 2) Sentences that can be sent unchanged. Quote them. 3) What to check outside the AI. For each item — what exactly to check. 4) What context is missing. A “Missing:” list.</div>'
    ],
    ['<button type="button" class="copy-prompt-btn" data-track="qc_copy_click">Kopijuoti patikrą</button>', '<button type="button" class="copy-prompt-btn" data-track="qc_copy_click">Copy check</button>'],
    [
      '</svg></span> Rizikos matomos prieš siuntimą.</div>',
      '</svg></span> Risks are visible before you send.</div>'
    ],
    [
      '<p class="qc-next"><a class="inline-link inline-link--accent" href="#library" data-track="qc_to_library">Biblioteka</a></p>',
      '<p class="qc-next"><a class="inline-link inline-link--accent" href="#library" data-track="qc_to_library">Library</a></p>'
    ],

    [
      'src="assets/memes/meme-after-roadmap-lt.png"',
      'src="assets/memes/meme-after-roadmap.png"'
    ],
    [
      'alt="Dvi pusės: kairėje CHAOSAS — chaotiškas pokalbis su perbrauktu vaizdu ir trumpais prašymais; dešinėje KONTROLĖ — rolė, kontekstas, rezultatas, kriterijai ir švarus logotipas. Antraštė: „DI nėra chaotiškas. Tavo užklausa – taip.“"',
      'alt="Split graphic: CHAOS — messy chat with crossed-out images and short asks; CONTROL — Role, Context, Output, Criteria and a clean logo. Headline: AI isn’t random. Your input is."'
    ],

    ['<span class="label">02 • Struktūra</span>', '<span class="label">02 • Structure</span>'],
    ['<h2>Susitikimo ar sprinto planas</h2>', '<h2>Meeting or sprint plan</h2>'],
    [
      '<p class="slide-sublead slide-lead">Viena lentelė: laikas, veikla, tikslas — ir keli klausimai sprendimui.</p>',
      '<p class="slide-sublead slide-lead">One table: time, activity, goal — plus a few decision questions.</p>'
    ],
    [
      '<div class="prompt-line"><b>Rolė:</b> Tu esi mano darbo asistentas.</div>',
      '<div class="prompt-line"><b>Role:</b> You are my work assistant.</div>'
    ],
    [
      '<div class="prompt-line"><b>Tikslas:</b> Sudaryk planą, pagal kurį komanda priima vieną sprendimą.</div>',
      '<div class="prompt-line"><b>Goal:</b> Build a plan the team uses to make one decision.</div>'
    ],
    [
      '<div class="prompt-line"><b>Kontekstas:</b> Trukmė: [MIN.]. Tema: [TEMA]. Pareigos: [KAS DALYVAUJA]. Jau sutarta: [KĄ SUTAREI ANKSČIAU].</div>',
      '<div class="prompt-line"><b>Context:</b> Duration: [MINUTES]. Topic: [TOPIC]. Position: [WHO JOINS]. Already agreed: [WHAT YOU AGREED BEFORE].</div>'
    ],
    [
      '<div class="prompt-line"><b>Rezultatas:</b> Lentelė Laikas | Veikla | Tikslas. Laikai susideda į trukmę. Tuščia trukmė — 60 min. ir eilutė „Prielaida: 60 min.“ Trys klausimai. Kiekvienas pavadina sprendimą, kurį atrakina. Ko nėra įvestyje — „Trūksta:“.</div>',
      '<div class="prompt-line"><b>Output:</b> Table Time | Activity | Goal. Times add up to the duration. Empty duration — 60 min and the line “Assumption: 60 min.” Three questions. Each names the decision it unlocks. If it is not in the input — “Missing:”.</div>'
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

    ['<span class="label">03 • Trys versijos</span>', '<span class="label">03 • Three versions</span>'],
    ['<h2>Viena žinutė, trys versijos</h2>', '<h2>One message, three versions</h2>'],
    [
      '<p class="slide-sublead slide-lead">Trumpa, normali ir detali — ta pati mintis.</p>',
      '<p class="slide-sublead slide-lead">Short, normal, and detailed — the same point.</p>'
    ],
    [
      '<div class="prompt-line"><b>Tikslas:</b> Tą pačią mintį parašyk trimis lygiais.</div>',
      '<div class="prompt-line"><b>Goal:</b> Write the same point at three levels.</div>'
    ],
    [
      '<div class="prompt-line"><b>Kontekstas:</b> Mintis: [TEMA]. Kas skaito: [junior / senior, klientas / vidinė komanda]. Juodraštis, jei yra: [TEKSTAS].</div>',
      '<div class="prompt-line"><b>Context:</b> Point: [TOPIC]. Reader: [junior / senior, client / internal team]. Draft, if any: [TEXT].</div>'
    ],
    [
      '<div class="prompt-line"><b>Rezultatas:</b> Trys blokai, tie patys faktai. Bazinis: 1 sakinys, vienas veiksmas. Vidutinis: 4 sakiniai, veiksmas, savininkas, terminas. Pažengęs: tie patys faktai, 1 rizika, 1 sprendimas. Naujo fakto, kurio nėra įvestyje, nekurk. Trūksta — „Trūksta:“.</div>',
      '<div class="prompt-line"><b>Output:</b> Three blocks, the same facts. Basic: 1 sentence, one action. Intermediate: 4 sentences, action, owner, deadline. Advanced: the same facts, 1 risk, 1 decision. Do not add a fact that is not in the input. If missing — “Missing:”.</div>'
    ],
    [
      '</svg></span> Vienas šablonas — kelios auditorijos.</div>',
      '</svg></span> One template — several audiences.</div>'
    ],

    ['<span class="label">04 • Įvertinimas</span>', '<span class="label">04 • Review</span>'],
    ['<h2>Teksto įvertinimas</h2>', '<h2>Text review</h2>'],
    [
      '<p class="slide-sublead slide-lead">Vienas pirmas pakeitimas.</p>',
      '<p class="slide-sublead slide-lead">One first change.</p>'
    ],
    [
      '<div class="prompt-line"><b>Tikslas:</b> Pasakyk, ką šiame tekste keisti pirmiausia.</div>',
      '<div class="prompt-line"><b>Goal:</b> Say what to change first in this text.</div>'
    ],
    [
      '<div class="prompt-line"><b>Kontekstas:</b> Tekstas: [TEKSTAS]. Kriterijai: aiškumas; vienas veiksmas; tonas.</div>',
      '<div class="prompt-line"><b>Context:</b> Text: [TEXT]. Criteria: clarity; one action; tone.</div>'
    ],
    [
      '<div class="prompt-line"><b>Mąstymas:</b> Kiekvienam kriterijui atsakyk „yra“ arba „nėra“. Prie „nėra“ cituok sakinį iš teksto.</div>',
      '<div class="prompt-line"><b>Reasoning:</b> For each criterion answer “yes” or “no”. Next to “no”, quote a sentence from the text.</div>'
    ],
    [
      '<div class="prompt-line"><b>Rezultatas:</b> Trys eilutės, po vieną kriterijų: yra arba nėra, citata. Tada viena pora: Buvo / Turi būti.</div>',
      '<div class="prompt-line"><b>Output:</b> Three lines, one criterion each: yes or no, plus a quote. Then one pair: Was / Should be.</div>'
    ],
    [
      '</svg></span> Vienas pakeitimas, ne dešimt taisymų.</div>',
      '</svg></span> One change, not ten fixes.</div>'
    ],

    ['<span class="label">05 • Komanda</span>', '<span class="label">05 • Team</span>'],
    ['<h2>Užduotis / mokymas komandai</h2>', '<h2>Assignment / team learning</h2>'],
    [
      '<p class="slide-sublead slide-lead">Vienas konkretus formatas — pvz. patikrinimas ar praktinė užduotis — su instrukcija komandai.</p>',
      '<p class="slide-sublead slide-lead">One concrete format — e.g. knowledge check or hands-on task — with instructions for the team.</p>'
    ],
    [
      '<div class="prompt-line"><b>Tikslas:</b> Paruošk vieną užduotį komandai ir raktą, pagal kurį ji laikoma padaryta.</div>',
      '<div class="prompt-line"><b>Goal:</b> Prepare one team task and the key that shows it is done.</div>'
    ],
    [
      '<div class="prompt-line"><b>Kontekstas:</b> Tema: [TEMA]. Auditorija: [KOMANDA]. Pareigos: [PAREIGOS]. Formatas: [žinių patikrinimas / praktinė užduotis]. Pavyzdys: [TRUMPAI].</div>',
      '<div class="prompt-line"><b>Context:</b> Topic: [TOPIC]. Audience: [TEAM]. Position: [POSITION]. Format: [knowledge check / hands-on task]. Example: [BRIEF].</div>'
    ],
    [
      '<div class="prompt-line"><b>Mąstymas:</b> Formatą imk tik iš lauko. Tuščias formatas — sustok ir parašyk „Trūksta: formatas“.</div>',
      '<div class="prompt-line"><b>Reasoning:</b> Take the format only from the field. If the format is empty — stop and write “Missing: format”.</div>'
    ],
    [
      '<div class="prompt-line"><b>Rezultatas:</b> Visada du blokai. 1) Instrukcija, iki 120 žodžių: viena užduotis, vienas savininkas, terminas. 2) Raktas. Jei formatas yra žinių patikrinimas — teisingi atsakymai. Jei formatas yra praktinė užduotis — 3 punktai, pagal kuriuos laikoma padaryta. Faktai tik iš pavyzdžio. Ko nėra — „Trūksta:“.</div>',
      '<div class="prompt-line"><b>Output:</b> Always two blocks. 1) Instruction, up to 120 words: one task, one owner, a deadline. 2) Key. If the format is a knowledge check — the correct answers. If the format is a hands-on task — 3 points that count as done. Facts only from the example. If it is not there — “Missing:”.</div>'
    ],
    [
      '</svg></span> Užduotis komandai su terminu.</div>',
      '</svg></span> A team task with a deadline.</div>'
    ],

    ['<span class="label">01 • Komunikacija</span>', '<span class="label">01 • Communication</span>'],
    ['<h2>Laiškas ar žinutė (juodraštis)</h2>', '<h2>Email or message (draft)</h2>'],
    [
      '<p class="slide-sublead slide-lead">Iki ~100 žodžių: problema, sprendimas, aiškus kitas žingsnis.</p>',
      '<p class="slide-sublead slide-lead">Up to ~100 words: problem, solution, clear next step.</p>'
    ],
    [
      '<div class="prompt-line"><b>Tikslas:</b> Paruošk žinutę, kurią galima siųsti.</div>',
      '<div class="prompt-line"><b>Goal:</b> Draft a message you can send.</div>'
    ],
    [
      '<div class="prompt-line"><b>Kontekstas:</b> Kam: [komanda / klientas / partneris]. Faktai: [KAS ĮVYKO]. Tonas: profesionalus, šiltas.</div>',
      '<div class="prompt-line"><b>Context:</b> To: [team / client / partner]. Facts: [WHAT HAPPENED]. Tone: professional, warm.</div>'
    ],
    [
      '<div class="prompt-line"><b>Rezultatas:</b> 1) Laiškas, iki 100 žodžių. Trys pastraipos: problema; sprendimas; kitas žingsnis (kas ir kada). 2) Žinutė, iki 40 žodžių. Tos pačios trys dalys, po vieną sakinį. Ko nėra įvestyje — „Trūksta:“.</div>',
      '<div class="prompt-line"><b>Output:</b> 1) Letter, up to 100 words. Three paragraphs: problem; solution; next step (who and when). 2) Message, up to 40 words. The same three parts, one sentence each. If it is not in the input — “Missing:”.</div>'
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
    ['<p class="library-goal">5 punktai iš įrašytų faktų.</p>', '<p class="library-goal">5 bullets from the facts you entered.</p>'],
    [
      'aria-label="Kopijuoti dienos santraukos užklausą" data-track="library_copy_daySummary">Kopijuoti</button>',
      'aria-label="Copy day-summary prompt" data-track="library_copy_daySummary">Copy</button>'
    ],
    ['<h4>Užduočių sąrašas</h4>', '<h4>Task list</h4>'],
    ['<p class="library-goal">Užduotys su prioritetu A, B arba C.</p>', '<p class="library-goal">Tasks with priority A, B, or C.</p>'],
    [
      'aria-label="Kopijuoti užduočių sąrašo užklausą" data-track="library_copy_taskList">Kopijuoti</button>',
      'aria-label="Copy task-list prompt" data-track="library_copy_taskList">Copy</button>'
    ],
    ['<h4>Susitikimo užrašai</h4>', '<h4>Meeting notes</h4>'],
    ['<p class="library-goal">Santrauka, sprendimai, veiksmai, atviri klausimai.</p>', '<p class="library-goal">Summary, decisions, actions, open questions.</p>'],
    [
      'aria-label="Kopijuoti susitikimo užrašų užklausą" data-track="library_copy_meetingNotes">Kopijuoti</button>',
      'aria-label="Copy meeting-notes prompt" data-track="library_copy_meetingNotes">Copy</button>'
    ],
    [
      '<summary class="library-cat-summary"><span class="library-cat-summary__title">Komunikacija</span><span class="library-cat-summary__meta">5 šablonai</span></summary>',
      '<summary class="library-cat-summary"><span class="library-cat-summary__title">Communication</span><span class="library-cat-summary__meta">5 templates</span></summary>'
    ],
    ['<h4>Atsakymas į laišką</h4>', '<h4>Email reply</h4>'],
    ['<p class="library-goal">Atsakymas su kitu žingsniu.</p>', '<p class="library-goal">A reply with a next step.</p>'],
    [
      'aria-label="Kopijuoti atsakymo į laišką užklausą" data-track="library_copy_emailReply">Kopijuoti</button>',
      'aria-label="Copy email-reply prompt" data-track="library_copy_emailReply">Copy</button>'
    ],
    ['<h4>Sutrumpinti tekstą</h4>', '<h4>Shorten text</h4>'],
    ['<p class="library-goal">Trumpesnė versija, tie patys faktai.</p>', '<p class="library-goal">A shorter version, the same facts.</p>'],
    [
      'aria-label="Kopijuoti teksto trumpinimo užklausą" data-track="library_copy_simplifyText">Kopijuoti</button>',
      'aria-label="Copy shorten-text prompt" data-track="library_copy_simplifyText">Copy</button>'
    ],
    ['<h4>Sunki žinutė (terminas / klaida / pokytis)</h4>', '<h4>Hard message (deadline / error / change)</h4>'],
    ['<p class="library-goal">Du variantai: trumpas ir vidutinis.</p>', '<p class="library-goal">Two variants: short and medium.</p>'],
    [
      'aria-label="Kopijuoti sunkios žinutės užklausą" data-track="library_copy_hardUpdate">Kopijuoti</button>',
      'aria-label="Copy hard-message prompt" data-track="library_copy_hardUpdate">Copy</button>'
    ],
    ['<h4>Grįžtamasis ryšys po klaidos (1:1)</h4>', '<h4>Feedback after a mistake (1:1)</h4>'],
    ['<p class="library-goal">Pokalbio pradžia, pastebėjimai, viena sutartis.</p>', '<p class="library-goal">An opening, observations, one agreement.</p>'],
    [
      'aria-label="Kopijuoti grįžtamojo ryšio po klaidos užklausą" data-track="library_copy_feedbackAfterMistake">Kopijuoti</button>',
      'aria-label="Copy post-mistake feedback prompt" data-track="library_copy_feedbackAfterMistake">Copy</button>'
    ],
    ['<h4>Įtampos mažinimas (perrašyk žinutę)</h4>', '<h4>De-escalation (rewrite the message)</h4>'],
    ['<p class="library-goal">Viena rami žinutė su kitu žingsniu.</p>', '<p class="library-goal">One calm message with a next step.</p>'],
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
      '<p class="library-goal">Penki „yra / nėra“ ir viena perrašyta užklausa.</p>',
      '<p class="library-goal">Five yes / no lines and one rewritten prompt.</p>'
    ],
    [
      'aria-label="Kopijuoti užklausos kokybės patikrinimo užklausą" data-track="library_copy_qualityCheck">Kopijuoti</button>',
      'aria-label="Copy quality-check prompt" data-track="library_copy_qualityCheck">Copy</button>'
    ],
    ['<h4>Užklausa su ribomis</h4>', '<h4>A prompt with limits</h4>'],
    ['<p class="library-goal">Paruošk užklausą su ribomis, ne gatavą laišką.</p>', '<p class="library-goal">Prepare a prompt with limits, not a finished letter.</p>'],
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
      'alt="Išsprogdintas suši, iš apačios į viršų: nori — 1 Rolė, ryžiai — 2 Kontekstas, lašiša — 3 Rezultatas, avokadas — 4 Mąstymas, sezamai — 5 Kokybės kontrolė."',
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
      'data-feedback-correct="Teisingai: rolė, kontekstas ir aiškus pageidaujamas rezultatas leidžia DI atsakyti pagal tavo užduotį."',
      'data-feedback-correct="Correct: role, context, and a clear desired output let the AI answer in line with your task."'
    ],
    [
      'data-feedback-wrong="Be aiškios rolės ir konkretaus konteksto DI spėlioja. Vien prašymas būti kūrybingam, bendras tonas ar labai trumpa užklausa neperduoda, kokio turinio ir formato tikiesi."',
      'data-feedback-wrong="Without a clear role and concrete context the AI guesses. A vague “be creative” line, tone alone, or a very short prompt does not say what content or format you want."'
    ],
    ['<legend class="label">Vienas atsakymas</legend>', '<legend class="label">One answer</legend>'],
    [
      '<h2 class="quiz-question" id="quiz-question-heading">Ką įtraukti į užklausą (promptą), kad DI atsakymas būtų naudingas?</h2>',
      '<h2 class="quiz-question" id="quiz-question-heading">What should you put in a prompt so the AI answer is useful?</h2>'
    ],
    [
      '<span class="quiz-option-text">Užtenka aiškios temos ir norimo formato (pvz. „lentelė“), net jei nenurodau rolės ir konteksto.</span>',
      '<span class="quiz-option-text">A clear topic and desired format (e.g. “table”) are enough even if I skip role and context.</span>'
    ],
    [
      '<span class="quiz-option-text">Užtenka vienos eilutės, pvz. „Paruošk ataskaitą apie…“ — be konteksto, tikslo ir pageidaujamo rezultato.</span>',
      '<span class="quiz-option-text">One line is enough, e.g. “Prepare a report on…” — without context, goal, or desired output.</span>'
    ],
    [
      '<span class="quiz-option-text">Pakanka rolės ir tono (pvz. „rašyk vadovybei“), net jei nepasakau, kokių faktų DI turi žinoti ir kaip mąstyti.</span>',
      '<span class="quiz-option-text">Role and tone (e.g. “write for leadership”) are enough even if I do not say what facts the AI should know or how to reason.</span>'
    ],
    [
      '<span class="quiz-option-text">Rolė (kas esi), kontekstas (projektas, auditorija, ką jau žino komanda) ir pageidaujamas rezultato formatas.</span>',
      '<span class="quiz-option-text">Role (who you are), context (project, audience, what the team already knows), and the desired output format.</span>'
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
      '<p class="cta-entity-footer">Promptų Anatomijos ekosistema · Mokymai ir checkout → <a class="link-tier-tertiary" href="https://www.promptanatomy.app/?utm_source=cloud&amp;utm_medium=entity_footer&amp;utm_campaign=ecosystem" target="_blank" rel="noopener noreferrer" data-track="entity_footer_click" data-track-dest="app" aria-label="Promptų Anatomijos mokymai ir checkout promptanatomy.app (atidaryti naujame skirtuke)">promptanatomy.app</a></p>',
      '<p class="cta-entity-footer">Part of Prompt Anatomy · Training &amp; checkout → <a class="link-tier-tertiary" href="https://www.promptanatomy.app/?utm_source=cloud&amp;utm_medium=entity_footer&amp;utm_campaign=ecosystem" target="_blank" rel="noopener noreferrer" data-track="entity_footer_click" data-track-dest="app" aria-label="Prompt Anatomy training and checkout at promptanatomy.app (opens in a new tab)">promptanatomy.app</a></p>'
    ],
    [CTA_FOOTNOTE_LT, CTA_FOOTNOTE_EN]
  ];
}

module.exports = { getEnHtmlReplacementPairs };
