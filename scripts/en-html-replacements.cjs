'use strict';

/**
 * Ordered [LT, EN] HTML fragments for the EN build output (site/index.html).
 * Keep fragments unique enough to avoid accidental double-replace.
 */
function getEnHtmlReplacementPairs() {
  return [
    ['content: \'UŽKLAUSOS STRUKTŪRA\';', 'content: \'PROMPT STRUCTURE\';'],

    ['<a class="skip-link" href="#main-content">Pereiti prie turinio</a>', '<a class="skip-link" href="#main-content">Skip to content</a>'],

    ['aria-label="Kalbos pasirinkimas"', 'aria-label="Language selection"'],
    ['aria-label="Perjungti į lietuvių kalbą"', 'aria-label="Switch to Lithuanian"'],

    ['<summary class="slide-outline__summary">Turinys</summary>', '<summary class="slide-outline__summary">Contents</summary>'],

    [
      'aria-label="Promptų anatomija — brendo svetainė www.promptanatomy.app (atidaryti naujame skirtuke)"',
      'aria-label="Prompt Anatomy — brand site www.promptanatomy.app (opens in a new tab)"'
    ],
    ['<div class="brand-tagline">DI praktinė sistema</div>', '<div class="brand-tagline">Practical AI system</div>'],

    [
      '<div class="brand-name"><span class="brand-prompt">PROMPTŲ</span> <span class="brand-anatomy">ANATOMIJA</span></div>',
      '<div class="brand-name"><span class="brand-prompt">PROMPT</span> <span class="brand-anatomy">ANATOMY</span></div>'
    ],
    [
      '<h1>PROMPTŲ<br><span style="color: var(--accent-yellow);">ANATOMIJA</span></h1>',
      '<h1>PROMPT<br><span style="color: var(--accent-yellow);">ANATOMY</span></h1>'
    ],
    [
      '<p class="hero-geo-summary">Ši pamoka: penkių dalių užklausos schema, greita siuntimo patikra, kopijuojama biblioteka ir trumpas quiz — skirta įmonės komandai ir vadovui. Brendo svetainė: www.promptanatomy.app.</p>',
      '<p class="hero-geo-summary">A practical AI prompt framework for leaders: a 5-part structure, a quick send check, a copy-ready library, and a short quiz. Use it for leadership updates, client emails, and decision docs. Brand site: www.promptanatomy.app.</p>'
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
    ['aria-label="Skaidrė 6: Greita siuntimo patikra"', 'aria-label="Slide 6: Quick send check"'],
    ['aria-label="Skaidrė 7: Susitikimo ar sprinto planas"', 'aria-label="Slide 7: Meeting or sprint plan"'],
    ['aria-label="Skaidrė 8: Ta pati žinutė — 3 lygiai"', 'aria-label="Slide 8: Same message — three levels"'],
    ['aria-label="Skaidrė 9: Turinio grįžtamasis ryšys"', 'aria-label="Slide 9: Content feedback"'],
    ['aria-label="Skaidrė 10: Užduotis / mokymas komandai"', 'aria-label="Slide 10: Assignment / team learning"'],
    ['aria-label="Skaidrė 11: Laiškas ar žinutė (juodraštis)"', 'aria-label="Slide 11: Email or message (draft)"'],
    ['aria-label="Skaidrė 12: Promptų biblioteka (resursai)"', 'aria-label="Slide 12: Prompt library (resources)"'],
    ['aria-label="Skaidrė 13: Esmė"', 'aria-label="Slide 13: The point"'],
    ['aria-label="Skaidrė 14: Trumpas quiz"', 'aria-label="Slide 14: Short quiz"'],
    ['aria-label="Skaidrė 15: PDF santrauka ir kitas žingsnis"', 'aria-label="Slide 15: PDF summary and next step"'],

    ['aria-label="Skaidrių navigacija (mobilusis)"', 'aria-label="Slide navigation (mobile)"'],
    ['<div class="nav-mobile-progress" id="nav-mobile-progress" aria-live="polite">1/15 · Įvadas</div>', '<div class="nav-mobile-progress" id="nav-mobile-progress" aria-live="polite">1/15 · Introduction</div>'],

    ['<section id="intro" aria-label="Įvadas"', '<section id="intro" aria-label="Introduction"'],
    ['<span class="label">DI praktinė sistema įmonei</span>', '<span class="label">Practical AI system for teams</span>'],
    [
      '<p class="hero-lead">Nuo DI „spėliojimo“ iki aiškios darbo sistemos: mažiau taisymo, daugiau kontrolės.</p>',
      '<p class="hero-lead">From AI guesswork to a clear operating system: less rework, more control.</p>'
    ],
    [
      '<p class="hero-meta">Pradėk nuo 2 min. praktikos, PDF pasiimk kai prireiks.<br>Toliau: šablonas, schema, greita patikra skaidrėse.</p>',
      '<p class="hero-meta">Start with the 2-minute practice, then download the PDF when you need it.<br>Next: template, slide framework, and send check.</p>'
    ],
    [
      'href="assets/www.promptanatomy.app.pdf" download="www.promptanatomy.app.pdf"',
      'href="assets/www.promptanatomy.app-en.pdf" download="www.promptanatomy.app-en.pdf"'
    ],
    [
      'aria-label="Atsisiųsk 1 pamokos santrauką PDF formatu"',
      'aria-label="Download lesson 1 English summary (PDF)"'
    ],
    ['Atsisiųsk santrauką (PDF)', 'Download English summary (PDF)'],
    [
      'aria-label="Pradėti pamoką: pereiti į 2 minučių praktiką"',
      'aria-label="Start the lesson: go to the 2-minute practice"'
    ],
    [
      'data-track="hero_primary_click">\n                    <span class="icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span>\n                    Pradėk 2 min. praktiką\n                </a>',
      'data-track="hero_primary_click">\n                    <span class="icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></span>\n                    Start 2 min practice\n                </a>'
    ],
    ['<a href="#library" data-track="hero_library_click">Biblioteka</a>', '<a href="#library" data-track="hero_library_click">Library</a>'],
    ['<a href="#schema" data-track="hero_schema_click">Schema</a>', '<a href="#schema" data-track="hero_schema_click">Framework</a>'],
    ['<a href="#cta" data-track="hero_cta_click">Programa</a>', '<a href="#cta" data-track="hero_cta_click">Program</a>'],
    [
      '<a href="https://promptanatomy.pro/en/?utm_source=promptanatomy_app&amp;utm_medium=hero_footer&amp;utm_campaign=executive_pro" target="_blank" rel="noopener noreferrer" data-track="hero_executive_pro_click" aria-label="CEO ir COO executive rinkinys promptanatomy.pro (atidaryti naujame skirtuke)">CEO rinkinys</a>',
      '<a href="https://promptanatomy.pro/en/?utm_source=promptanatomy_app&amp;utm_medium=hero_footer&amp;utm_campaign=executive_pro" target="_blank" rel="noopener noreferrer" data-track="hero_executive_pro_click" aria-label="CEO and COO executive kit on promptanatomy.pro (opens in a new tab)">Executive kit</a>'
    ],
    [
      '<div class="geo-faq-anchor" data-geo-faq="1">\n                <p style="margin: 18px 0 10px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.9;">DUK (trumpai)</p>\n                <div style="display: grid; gap: 10px; max-width: 34em;">\n                    <div><strong>Kam tai?</strong> Komandos darbui ir vadovui: mažiau taisymo, aiškesni rezultatai.</div>\n                    <div><strong>Kada naudoti patikrą?</strong> Prieš siunčiant klientui ar vadovybei, kai svarbūs faktai ir tonas.</div>\n                    <div><strong>Ką kopijuoti?</strong> Paimk šabloną, užpildyk [laukus], paleisk, tada iteruok.</div>\n                </div>\n            </div>',
      '<div class="geo-faq-anchor" data-geo-faq="1">\n                <p style="margin: 18px 0 10px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.9;">FAQ (for leaders)</p>\n                <div style="display: grid; gap: 10px; max-width: 38em;">\n                    <div><strong>What should I include in a prompt for leadership updates?</strong> Audience, context, constraints, and the exact output format (bullets, table, decision memo). Add success criteria.</div>\n                    <div><strong>How do I reduce hallucinated facts in client emails?</strong> Paste source notes, ask for citations/quotes, and run a quick send check: what’s safe, what must be verified.</div>\n                    <div><strong>What’s a quick send check?</strong> A 30-second risk review before you send: facts, missing context, and 2–3 reputational risks.</div>\n                    <div><strong>How do I get consistent outputs across my team?</strong> Use one shared template (role + context + reasoning + output), then iterate with the same checklist.</div>\n                </div>\n            </div>'
    ],

    ['<section id="primer" class="types-slide" aria-label="Kas yra promptas?"', '<section id="primer" class="types-slide" aria-label="What is a prompt?"'],
    ['<span class="label">Pagrindai</span>', '<span class="label">Basics</span>'],
    ['<h2>Kas yra promptas?</h2>', '<h2>What is a prompt?</h2>'],
    [
      '<p class="types-lead">Žemiau — du apibrėžimai ir greito naudojimo taisyklė (juosta).<br>Penkių žingsnių schema — kai atsakymas miglotas ir vis dar reikia pataisymų.</p>',
      '<p class="types-lead">Two definitions and a one-minute rule (strip).<br>Five-step framework — when answers stay fuzzy and you still need fixes.</p>'
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
      'data-copy-text="Short AI instruction — concrete result. Example: Do X per Y and return Z in this format." aria-label="Copy prompt summary"'
    ],
    ['data-track="primer_copy_promptas">Kopijuoti</button>', 'data-track="primer_copy_promptas">Copy</button>'],

    ['<h3>Promptų inžinerija</h3>', '<h3>Prompt engineering</h3>'],
    [
      '<p class="types-card-desc">Procesas, kaip rašai promptą: specifikacija → struktūra → iteracija.</p>',
      '<p class="types-card-desc">How you write a prompt: specification → structure → iteration.</p>'
    ],
    ['<p class="types-card-k">Tikslas</p>', '<p class="types-card-k">Goal</p>'],
    [
      '<p class="types-card-example">Specifikacija → struktūra → iteracija. Mažiau spėliojimo, daugiau stabilumo per kartojimus.</p>',
      '<p class="types-card-example">Specification → structure → iteration. Less guesswork, more stability through repeats.</p>'
    ],
    [
      'data-copy-text="Procesas: specifikacija → struktūra → iteracija. Tikslas: mažiau spėliojimo, daugiau stabilumo per kartojimus." aria-label="Kopijuoti promptų inžinerijos santrauką"',
      'data-copy-text="Process: specification → structure → iteration. Goal: less guesswork, more stability through repeats." aria-label="Copy prompt engineering summary"'
    ],
    ['data-track="primer_copy_inzinerija">Kopijuoti</button>', 'data-track="primer_copy_inzinerija">Copy</button>'],

    ['<p class="types-primer-quick-k">Greitas startas (~1 min.)</p>', '<p class="types-primer-quick-k">Quick start (~1 min)</p>'],
    [
      '<p class="types-primer-quick-desc"><strong>Taisyklė:</strong> Tikslas + Įvestis + Rezultatas.</p>',
      '<p class="types-primer-quick-desc"><strong>Rule:</strong> Goal + Input + Output.</p>'
    ],
    [
      '<p class="types-card-example types-primer-quick-example">„Tikslas: [KĄ NORIU PASIEKTI]. Įvestis: [ĮKLIJUOK TEKSTĄ]. Rezultatas: 7 punktų sąrašas su A/B/C prioritetais.“</p>',
      '<p class="types-card-example types-primer-quick-example">“Goal: [WHAT I WANT]. Input: [PASTE TEXT]. Output: 7 bullet list with A/B/C priorities.”</p>'
    ],
    [
      'data-copy-text="Tikslas: [KĄ NORIU PASIEKTI]. Įvestis: [ĮKLIJUOK TEKSTĄ]. Rezultatas: 7 punktų sąrašas su A/B/C prioritetais." aria-label="Kopijuoti greito starto užklausą"',
      'data-copy-text="Goal: [WHAT I WANT]. Input: [PASTE TEXT]. Output: 7 bullet list with A/B/C priorities." aria-label="Copy quick-start prompt"'
    ],
    ['data-track="primer_copy_format">Kopijuoti</button>', 'data-track="primer_copy_format">Copy</button>'],
    ['<span class="types-card-k">Toliau</span>', '<span class="types-card-k">Next</span>'],
    ['data-track="primer_to_schema" style="color: rgba(255, 255, 255, 0.82); text-decoration: none; font-weight: 800;">Schema ↓</a>', 'data-track="primer_to_schema" style="color: rgba(255, 255, 255, 0.82); text-decoration: none; font-weight: 800;">Framework ↓</a>'],

    ['<section id="schema" class="schema-section" aria-label="Promptų anatomijos schema"', '<section id="schema" class="schema-section" aria-label="Prompt anatomy framework"'],
    ['<span class="label">Žingsniai</span>', '<span class="label">Steps</span>'],
    ['<h2>Promptų anatomijos schema</h2>', '<h2>Prompt anatomy framework</h2>'],
    [
      '<p class="schema-lead">Kiekvienas blokas prideda aiškumo. Dažnai užtenka 2–3; visus penkis jungk, kai negali rizikuoti.</p>',
      '<p class="schema-lead">Each block adds clarity. Often 2–3 are enough; use all five when you cannot risk mistakes.</p>'
    ],
    [
      '<strong>Vaidmuo</strong>\n                            <span>Kas esi ir koks tikslas (kodėl DI turi taip veikti)</span>',
      '<strong>Role</strong>\n                            <span>Who you are and why the AI should work this way</span>'
    ],
    [
      '<strong>Kontekstas</strong>\n                            <span>Faktai, auditorija, apribojimai, šaltiniai, kas jau žinoma</span>',
      '<strong>Context</strong>\n                            <span>Facts, audience, constraints, sources, what people already know</span>'
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
      '<strong>Kokybės kontrolė</strong>\n                            <span>Patikrink prieš siunčiant (ypač klientui / vadovybei)</span>',
      '<strong>Quality control</strong>\n                            <span>Check before you send (especially to clients or leadership)</span>'
    ],
    ['aria-label="Toliau: pereiti į 2 minučių praktiką" data-track="schema_next_click">Praktika ↓</a>', 'aria-label="Next: go to the 2-minute practice" data-track="schema_next_click">Practice ↓</a>'],

    [
      'alt="Memas po pagrindų kortelių (prieš / po / patikra): DI atspindi tavo įvesties aiškumą — verta struktūruoti užklausą."',
      'alt="Meme after basics cards: the AI mirrors how clear your input is — structure the prompt."'
    ],

    ['<section id="guided" class="types-slide" aria-label="Pradėk per 2 minutes"', '<section id="guided" class="types-slide" aria-label="Start in 2 minutes"'],
    ['<span class="label">Praktika</span>', '<span class="label">Practice</span>'],
    ['<h2>Pradėk per 2 minutes</h2>', '<h2>Start in 2 minutes</h2>'],
    [
      '<p class="types-lead">Tas pats Q3 tikslas — bet užklausa su rėmu keičia, ką gauni.<br>Eiga: migla → struktūra → trumpa savikontrolė.</p>',
      '<p class="types-lead">Same Q3 goal — framing changes what you get.<br>Flow: fuzzy → structure → short self-check.</p>'
    ],
    ['<h3>Prieš (per miglą)</h3>', '<h3>Before (fuzzy)</h3>'],
    [
      '<p class="types-card-desc">Be rėmo DI pildo spragas spėliodama.</p>',
      '<p class="types-card-desc">Without a frame the AI fills gaps by guessing.</p>'
    ],
    ['<p class="types-card-k">Užklausa</p>', '<p class="types-card-k">Prompt</p>'],
    [
      '<p class="types-card-example types-card-example--minimal">„Paruošk ataskaitą apie mūsų Q3 iniciatyvą.“</p>',
      '<p class="types-card-example types-card-example--minimal">“Prepare a report on our Q3 initiative.”</p>'
    ],
    [
      'data-copy-text="Paruošk ataskaitą apie mūsų Q3 iniciatyvą." aria-label="Kopijuoti \'prieš\' užklausą"',
      'data-copy-text="Prepare a report on our Q3 initiative." aria-label="Copy the “before” prompt"'
    ],
    ['data-track="practice_before_copy">Kopijuoti</button>', 'data-track="practice_before_copy">Copy</button>'],
    ['<p class="types-card-k">Rizika</p>', '<p class="types-card-k">Risk</p>'],
    ['<li>Neaiški auditorija ir formatas</li>', '<li>Unclear audience and format</li>'],
    ['<li>Skaičiai gali būti išgalvoti</li>', '<li>Numbers may be invented</li>'],
    ['<li>Trūksta tavo konteksto</li>', '<li>Missing your context</li>'],

    ['<h3>Po (pagal anatomiją)</h3>', '<h3>After (with anatomy)</h3>'],
    [
      '<p class="types-card-desc">Tas pats tikslas — aiški užklausa, naudojamas rezultatas.</p>',
      '<p class="types-card-desc">Same goal — clear prompt, usable output.</p>'
    ],
    ['<p class="types-card-k">Struktūra</p>', '<p class="types-card-k">Structure</p>'],
    [
      '<div class="practice-structured-line"><strong>Rolė</strong> <span>darbo asistentas</span></div>',
      '<div class="practice-structured-line"><strong>Role</strong> <span>work assistant</span></div>'
    ],
    [
      '<div class="practice-structured-line"><strong>Tikslas</strong> <span>Q3 planas, ką padaryti šią savaitę</span></div>',
      '<div class="practice-structured-line"><strong>Goal</strong> <span>Q3 plan, what to do this week</span></div>'
    ],
    [
      '<div class="practice-structured-line"><strong>Įvestis</strong> <span>[laiškai / užrašai]</span></div>',
      '<div class="practice-structured-line"><strong>Input</strong> <span>[emails / notes]</span></div>'
    ],
    [
      '<div class="practice-structured-line"><strong>Rezultatas</strong> <span>7 punktai, A/B/C + terminai</span></div>',
      '<div class="practice-structured-line"><strong>Output</strong> <span>7 bullets, A/B/C + deadlines</span></div>'
    ],
    [
      '<p class="visually-hidden">Pilna užklausa nukopijuojama mygtuku Kopijuoti.</p>',
      '<p class="visually-hidden">Full prompt is copied with the Copy button.</p>'
    ],
    [
      'data-copy-text="Tu esi mano darbo asistentas. Įvestis: [ĮKLIJUOK el. laišką / užrašus]. Tikslas: [KĄ TURIU PADARYTI ŠIĄ SAVAITĘ]. Rezultatas: 7 punktų užduočių sąrašas (prioritetas A/B/C + terminas, jei paminėtas)." aria-label="Kopijuoti \'po\' užklausą"',
      'data-copy-text="You are my work assistant. Input: [PASTE email / notes]. Goal: [WHAT I MUST DO THIS WEEK]. Output: 7 task bullets (A/B/C priority + deadline if mentioned)." aria-label="Copy the “after” prompt"'
    ],
    ['data-track="practice_after_copy">Kopijuoti</button>', 'data-track="practice_after_copy">Copy</button>'],
    ['<p class="types-card-k">Rezultatas</p>', '<p class="types-card-k">Output</p>'],
    [
      '<p class="types-card-result">Aiškus sąrašas — gali iškart naudoti ar deleguoti.</p>',
      '<p class="types-card-result">A clear list you can use or delegate immediately.</p>'
    ],

    ['<h3>Patikra (30 sek.)</h3>', '<h3>Check (30 sec)</h3>'],
    [
      '<p class="types-card-desc">Pilna siuntimo patikra — kitoje skaidrėje.</p>',
      '<p class="types-card-desc">Full send check — on the next slide.</p>'
    ],
    ['<p class="types-card-k">Ką tikrinti</p>', '<p class="types-card-k">What to check</p>'],
    ['<li>Ar faktai tikri?</li>', '<li>Are facts true?</li>'],
    ['<li>Ko trūksta kontekste?</li>', '<li>What context is missing?</li>'],
    ['<li>Kokios 2–3 rizikos?</li>', '<li>What are 2–3 risks?</li>'],
    ['<li>Ką patikrinti nepriklausomu šaltiniu?</li>', '<li>What to verify with an independent source?</li>'],
    [
      'data-copy-text="Patikra: 1) 3 didžiausios rizikos, 2) kas tinka naudoti, 3) ką turi patikrinti pats, 4) ko trūksta kontekste." aria-label="Kopijuoti patikros mini-checklist"',
      'data-copy-text="Check: 1) top 3 risks, 2) what is safe to use, 3) what you must verify yourself, 4) what context is missing." aria-label="Copy mini check-list"'
    ],
    ['data-track="practice_qc_copy">Kopijuoti</button>', 'data-track="practice_qc_copy">Copy</button>'],
    ['<p class="types-card-k">Toliau</p>', '<p class="types-card-k">Next</p>'],
    ['data-track="practice_next_click" style="color: var(--accent-yellow); text-decoration: none; font-weight: 800;">Kelio planas ↓</a>', 'data-track="practice_next_click" style="color: var(--accent-yellow); text-decoration: none; font-weight: 800;">Roadmap ↓</a>'],

    [
      '<section id="roadmap" class="roadmap-slide" aria-label="Tavo kelias, kaip sutaupyti iki 5 val. per savaitę"',
      '<section id="roadmap" class="roadmap-slide" aria-label="Your path to save up to 5 hours weekly"'
    ],
    ['<span class="label">Kelio planas</span>', '<span class="label">Roadmap</span>'],
    ['<h2>Tavo kelias, kaip sutaupyti iki 5 val. per savaitę</h2>', '<h2>Your path to save up to 5 hours weekly</h2>'],
    [
      '<p class="roadmap-sub">Šeši žingsniai iš eilės: pirmiausia greita siuntimo patikra, tada penki gilūs šablonai. Laikai — orientaciniai.</p>',
      '<p class="roadmap-sub">Six steps in order: quick send check first, then five deeper templates. Times are indicative.</p>'
    ],
    ['<span class="roadmap-name">Greita siuntimo patikra</span>', '<span class="roadmap-name">Quick send check</span>'],
    ['<span class="roadmap-name">Susitikimo ar sprinto planas</span>', '<span class="roadmap-name">Meeting or sprint plan</span>'],
    ['<span class="roadmap-name">Ta pati žinutė — 3 lygiai</span>', '<span class="roadmap-name">Same message — three levels</span>'],
    ['<span class="roadmap-name">Turinio grįžtamasis ryšys</span>', '<span class="roadmap-name">Content feedback</span>'],
    ['<span class="roadmap-name">Užduotis / mokymas komandai</span>', '<span class="roadmap-name">Assignment / team learning</span>'],
    ['<span class="roadmap-name">Laiškas ar žinutė (juodraštis)</span>', '<span class="roadmap-name">Email or message (draft)</span>'],
    [
      '<div class="roadmap-total">Viso iki ≈ 5 val. / sav. (priklauso nuo naudojimo dažnio)</div>',
      '<div class="roadmap-total">Up to ~5 hrs / week total (depends on how often you use it)</div>'
    ],

    ['<section aria-label="Susitikimo ar sprinto planas">', '<section aria-label="Meeting or sprint plan">'],
    ['<section aria-label="Ta pati žinutė — 3 lygiai">', '<section aria-label="Same message — three levels">'],
    ['<section aria-label="Turinio grįžtamasis ryšys">', '<section aria-label="Content feedback">'],
    ['<section aria-label="Užduotis / mokymas komandai">', '<section aria-label="Assignment / team learning">'],
    ['<section aria-label="Laiškas ar žinutė (juodraštis)">', '<section aria-label="Email or message (draft)">'],

    ['<section id="qc" aria-label="Greita siuntimo patikra"', '<section id="qc" aria-label="Quick send check"'],
    ['<span class="label">Saugumas</span>', '<span class="label">Safety</span>'],
    ['<h2>Greita siuntimo patikra</h2>', '<h2>Quick send check</h2>'],
    [
      '<p class="slide-sublead">Į DI įklijuok tą pilną tekstą, kurį ketini siųsti ar pateikti klientui, vadovybei ar partneriui (pvz. laiško, ataskaitos ar pasiūlymo juodraštį) — ne bet kurį atsakymą iš pokalbio.<br>Ši patikra peržiūri faktus ir rizikas prieš siuntimą.</p>',
      '<p class="slide-sublead">Paste the full text you plan to send or submit to a client, leadership, or partner (e.g. email, report, or proposal draft) — not a random chat reply.<br>This check reviews facts and risks before you send.</p>'
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
      '</svg></span> Mažiau rizikos klientui ir reputacijai.</div>',
      '</svg></span> Less risk for clients and reputation.</div>'
    ],

    [
      'alt="Tarp patikros ir plano struktūros: kai įvestis chaotiška, atsakymas chaotiškas; kai įvestis aiški, atsakymas labiau kontroliuojamas."',
      'alt="Between check and plan structure: chaotic input → chaotic output; clear input → more controlled output."'
    ],

    ['<span class="label">01 • Struktūra</span>', '<span class="label">01 • Structure</span>'],
    ['<h2>Susitikimo ar sprinto planas</h2>', '<h2>Meeting or sprint plan</h2>'],
    [
      '<p class="slide-sublead">Viena lentelė: laikas, veikla, tikslas — ir keli klausimai sprendimui.</p>',
      '<p class="slide-sublead">One table: time, activity, goal — plus a few decision questions.</p>'
    ],
    [
      '<div class="prompt-line"><b>UŽDUOTIS</b> Sudaryk susitikimo ar sprinto planą lentele (laikas · veikla · tikslas) ir pridėk 3 klausimus, kurie padėtų priimti sprendimą.</div>',
      '<div class="prompt-line"><b>TASK</b> Build a meeting or sprint plan as a table (time · activity · goal) and add 3 questions that help decide.</div>'
    ],
    [
      '<div class="prompt-line"><b>ĮVESTIS</b> Trukmė: [pvz. 60 min.]. Tema: [TEMA]. Komanda / rolės: [KAS DALYVAUJA]. Jie jau žino: [KĄ SUTARĖTE ANKSČIAU].</div>',
      '<div class="prompt-line"><b>INPUT</b> Duration: [e.g. 60 min]. Topic: [TOPIC]. Team / roles: [WHO JOINS]. They already know: [WHAT YOU AGREED BEFORE].</div>'
    ],
    [
      '<div class="prompt-line"><b>REZULTATAS</b> Lentelę su stulpeliais Laikas | Veikla | Tikslas, po ja — 3 klausimus.</div>',
      '<div class="prompt-line"><b>OUTPUT</b> A table with columns Time | Activity | Goal, then 3 questions below.</div>'
    ],
    ['<button type="button" class="copy-prompt-btn">Kopijuoti užklausą</button>', '<button type="button" class="copy-prompt-btn">Copy prompt</button>'],
    [
      '</svg></span> Planas paruoštas per kelias minutes.</div>',
      '</svg></span> Plan ready in a few minutes.</div>'
    ],

    ['<span class="label">02 • Personalizacija</span>', '<span class="label">02 • Personalisation</span>'],
    ['<h2>Ta pati žinutė — 3 lygiai</h2>', '<h2>Same message — three levels</h2>'],
    [
      '<p class="slide-sublead">Bazinis, vidutinis, pažengęs — ta pati esmė, skirtingas gilumas.</p>',
      '<p class="slide-sublead">Basic, intermediate, advanced — same core, different depth.</p>'
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
      '<p class="slide-sublead">Įvertinimas + vienas konkretus patarimas — mažiau tuščių iteracijų.</p>',
      '<p class="slide-sublead">Assessment + one concrete tip — fewer empty iterations.</p>'
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
      '</svg></span> Mažiau iteracijų ir taisymo laiko.</div>',
      '</svg></span> Fewer iterations and less fix-up time.</div>'
    ],

    ['<span class="label">04 • Inovacijos</span>', '<span class="label">04 • Innovation</span>'],
    ['<h2>Užduotis / mokymas komandai</h2>', '<h2>Assignment / team learning</h2>'],
    [
      '<p class="slide-sublead">Vienas konkretus formatas — pvz. patikrinimas ar praktinė užduotis — su instrukcija komandai.</p>',
      '<p class="slide-sublead">One concrete format — e.g. knowledge check or hands-on task — with instructions for the team.</p>'
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
      '<div class="prompt-line"><b>REZULTATAS</b> Paruoštą tekstą su aiškia instrukcija naudotojui; jei tinka — atsakymų ar vertinimo raktą.</div>',
      '<div class="prompt-line"><b>OUTPUT</b> Ready text with clear user instructions; if useful, an answer key or rubric.</div>'
    ],
    [
      '</svg></span> Pritaikyta realiai darbo situacijai.</div>',
      '</svg></span> Fits a real work situation.</div>'
    ],

    ['<span class="label">05 • Komunikacija</span>', '<span class="label">05 • Communication</span>'],
    ['<h2>Laiškas ar žinutė (juodraštis)</h2>', '<h2>Email or message (draft)</h2>'],
    [
      '<p class="slide-sublead">Iki ~100 žodžių: problema, sprendimas, aiškus kitas žingsnis.</p>',
      '<p class="slide-sublead">Up to ~100 words: problem, solution, clear next step.</p>'
    ],
    [
      '<div class="prompt-line"><b>UŽDUOTIS</b> Paruošk vieną juodraštį; struktūra: problema → sprendimas → kvietimas veikti arba kitas aiškus kitas žingsnis.</div>',
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
      '</svg></span> Aiški ir rami komunikacija.</div>',
      '</svg></span> Clear, calm communication.</div>'
    ],

    ['<section id="library" class="library-slide" aria-label="Promptų biblioteka (resursai)"', '<section id="library" class="library-slide" aria-label="Prompt library (resources)"'],
    ['<span class="label">Biblioteka</span>', '<span class="label">Library</span>'],
    ['<h2>Promptų biblioteka</h2>', '<h2>Prompt library</h2>'],
    [
      '<p class="library-lead">Kopijuok, užpildyk <strong>[žymes]</strong>, paleisk. Dažniausias startas: <a class="inline-link" href="#lib-cat-work" style="color: var(--accent-yellow); text-decoration: none; font-weight: 800;" data-track="library_quick_work">Kasdienis darbas</a> → dienos santrauka ar užduočių sąrašas.</p>',
      '<p class="library-lead">Copy, fill <strong>[placeholders]</strong>, run. Most common start: <a class="inline-link" href="#lib-cat-work" style="color: var(--accent-yellow); text-decoration: none; font-weight: 800;" data-track="library_quick_work">Daily work</a> → day summary or task list.</p>'
    ],
    ['aria-label="Bibliotekos auditorija"', 'aria-label="Library audience"'],
    ['>Darbuotojas</button>', '>Individual contributor</button>'],
    ['>Vadovas</button>', '>Leader</button>'],
    [
      'aria-label="Išskleisti visas bibliotekos kategorijas ir instrukciją „Kaip naudoti“" data-track="library_toggle_all">Išskleisti viską</button>',
      'aria-label="Expand all library categories and the How to use section" data-track="library_toggle_all">Expand all</button>'
    ],
    ['<summary class="library-howto-summary">Kaip naudoti (30 sek.)</summary>', '<summary class="library-howto-summary">How to use (30 sec)</summary>'],
    ['<li>„Kopijuoti“.</li>', '<li>“Copy”.</li>'],
    ['<li>Užpildyk <strong>[...]</strong>.</li>', '<li>Fill <strong>[...]</strong>.</li>'],
    [
      '<li>Per miglą — <a class="inline-link" href="#schema" style="color: var(--accent-yellow); text-decoration: none; font-weight: 800;" data-track="library_back_to_schema">schema</a>, pridėk trūkstamą žingsnį.</li>',
      '<li>If fuzzy — <a class="inline-link" href="#schema" style="color: var(--accent-yellow); text-decoration: none; font-weight: 800;" data-track="library_back_to_schema">framework</a>, add the missing step.</li>'
    ],
    ['<summary class="library-cat-summary">Kasdienis darbas</summary>', '<summary class="library-cat-summary">Daily work</summary>'],
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
    ['<summary class="library-cat-summary">Komunikacija</summary>', '<summary class="library-cat-summary">Communication</summary>'],
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
    ['<summary class="library-cat-summary">Kokybė ir patikra</summary>', '<summary class="library-cat-summary">Quality and checks</summary>'],
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
      'alt="Vizuali iliustracija prie esmės: DI kaip sistema ir struktūra darbe, ne vien atsitiktinis įrankis."',
      'alt="Visual for the point: AI as system and structure at work, not a random tool."'
    ],
    ['<h2 class="essence-tagline">DI YRA SISTEMA.</h2>', '<h2 class="essence-tagline">AI IS A SYSTEM.</h2>'],
    [
      '<p class="essence-lead">\n            Modelis nustato galimybes.<br><strong>Procesas</strong> — ar tas rezultatas išlieka darbe ir komandoje.\n        </p>',
      '<p class="essence-lead">\n            The model sets what is possible.<br><strong>Process</strong> — whether that result sticks at work and in the team.\n        </p>'
    ],

    ['<section class="quiz-slide" aria-label="Trumpas quiz"', '<section class="quiz-slide" aria-label="Short quiz"'],
    [
      'alt="Iliustracija prieš trumpą quiz: priminimas būti kritiškam ir tikrinti DI atsakymus, o ne priimti juos aklai."',
      'alt="Illustration before the short quiz: stay critical and verify AI answers, do not accept blindly."'
    ],
    [
      'data-msg-select="Pasirink vieną variantą ir spausk Tikrinti."',
      'data-msg-select="Pick one option and press Check."'
    ],
    [
      'data-feedback-correct="Teisingai: vaidmuo, kontekstas ir aiškus pageidaujamas rezultatas leidžia DI atsakyti pagal tavo užduotį."',
      'data-feedback-correct="Correct: role, context, and a clear desired output let the AI answer to your task."'
    ],
    [
      'data-feedback-wrong="Be aiškaus vaidmens ir konkretaus konteksto DI spėlioja. Vien prašymas būti kūrybingam, bendras tonas ar labai trumpa užklausa neperduoda, kokio turinio ir formato tikiesi."',
      'data-feedback-wrong="Without a clear role and concrete context the AI guesses. A vague “be creative” line, tone alone, or a very short prompt does not say what content or format you want."'
    ],
    ['<legend class="label">Pasirink vieną variantą</legend>', '<legend class="label">Pick one option</legend>'],
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
      '<span class="quiz-option-text">Vaidmuo (kas esi ir ko sieki), kontekstas (projektas, auditorija, ką jau žino komanda) ir pageidaujamas rezultato formatas.</span>',
      '<span class="quiz-option-text">Role (who you are and what you want), context (project, audience, what the team already knows), and the desired output format.</span>'
    ],
    [
      '<span class="quiz-option-text">Pakanka nurodyti tik bendrą toną (draugiškas ar formalus), be temos, auditorijos ir norimo formato.</span>',
      '<span class="quiz-option-text">It is enough to set a general tone (friendly or formal) without topic, audience, or desired format.</span>'
    ],
    ['<button type="button" class="quiz-check-btn" id="quiz-check-btn">Tikrinti</button>', '<button type="button" class="quiz-check-btn" id="quiz-check-btn">Check</button>'],
    ['<button type="button" class="quiz-reset-btn" id="quiz-reset-btn" hidden>Bandyti dar kartą</button>', '<button type="button" class="quiz-reset-btn" id="quiz-reset-btn" hidden>Try again</button>'],

    ['<section id="cta" aria-label="PDF santrauka ir kitas žingsnis"', '<section id="cta" aria-label="PDF summary and next step"'],
    ['<h2 class="cta-title">PAVERSK TAI SISTEMA</h2>', '<h2 class="cta-title">MAKE IT A SYSTEM</h2>'],
    [
      '<p class="cta-sub">PDF su santrauka — pasiimk su savimi. Gilyn — per programą.</p>',
      '<p class="cta-sub">English lesson summary (PDF) — take it with you. Go deeper via the program.</p>'
    ],
    [
      'aria-label="Pagrindinis veiksmas: peržvelk mokamą programą ir kainą (naujame skirtuke)" data-track="paid_cta_click">Peržvelk programą ir kainą</a>',
      'aria-label="Primary action: view the paid program and pricing (new tab)" data-track="paid_cta_click">View program and pricing</a>'
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
    ['PROMPTŲ ANATOMIJA • ĮMONĖS KOMANDOS • 2026', 'PROMPT ANATOMY • TEAMS • 2026']
  ];
}

module.exports = { getEnHtmlReplacementPairs };
