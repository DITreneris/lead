# AGENTS — Promptų anatomija (64_APK)

Trumpi vaidmenys, kuriuos galima įklijuoti į Cursor Composer arba naudoti kaip kontekstą.

## Docs map

| Layer | Files | Notes |
|-------|--------|--------|
| Public | [README.md](README.md) | Product-facing only |
| Agents | This file + [.cursor/rules/](.cursor/rules/) + [.cursor/skills/](.cursor/skills/) | Committed guidance |
| Local-only | `SETUP.md`, `CHANGELOG.md`, `todo.md`, `docs/*` | **Gitignored** — may be missing on fresh clones |

Token/CSS canon for CI and agents: [`styles/tokens.css`](styles/tokens.css) (+ inject). Optional local DS bible: `docs/design_system.md` (if present).

## Orkestratorius (darbo eiga)

Viena eiga vietoj atskiro „router“ ir „orchestrator“ serviso: klasifikuok užduotį, prijunk kontekstą, paleisk vieną pagrindinį specialistą, prireikus — Q_A.

1. **Įvestis:** ką keiti (pvz. tik `index.html`, PDF binary `assets/*.pdf`, ar abi dalys)? Koks tikslas (turinys, UI, PDF, schema / duomenų peržūra, LT/EN)?
2. **Maršrutas:**
   - **Turinys (LT)** — žemiau „Turinio agentas“; neardyti JS ir skaidrių be reikalo.
   - **Turinys (EN) arba abu kalbas** — `scripts/en-html-replacements.cjs` (matomas HTML EN puslapyje), [assets/prompt-library-en.js](assets/prompt-library-en.js) (biblioteka), po pakeitimo `npm run build` ir `npm run verify` (įskaitant `site/index.html` kaip EN).
   - **Skaidrės / CSS / nav / biblioteka** — „Frontend / skaidrės“ + „Biblioteka ir vadovo kelias“; vizualinė sistema — [`styles/tokens.css`](styles/tokens.css) + decision recipes (žemiau §2 / golden standard tankis); optional local `docs/design_system.md` **v2.1** if present.
   - **PDF** — „PDF sinchronas“ (local MD if present → build → commit PDF binaries).
   - **Schemos, duomenų tikrinimas, planas prieš kodą** — Cursor skillas: Composer įkelti `@.cursor/skills/data-agent/SKILL.md` (ir pagal poreikį `@.cursor/skills/data-agent/reference.md`).
3. **Vykdymas:** į chat įtraukti aktualius failus (`@index.html`, local `@docs/pamoka-1-pdf.md` if present, …) pagal maršrutą.
4. **Q_A (neprivaloma):** prieš commit ar po rizikingų pakeitimų — `@.cursor/skills/q-a-agent/SKILL.md` (įskaitant LT↔EN checklist); po `npm run build` — `npm run verify` (žr. žemiau **„Dviguba patikra“**).
5. **Release:** žemiau skyriuje „Release“.

## Ekosistema (domenai)

| Rolė | Domenas | Pastaba |
|------|---------|---------|
| Hub | [promptanatomy.app](https://www.promptanatomy.app/) | Motininė / programa; hero brand + `promo-handoff` + CTA Tier‑1 |
| Enter | [promptanatomy.cloud](https://promptanatomy.cloud/) | **Šis repo** — interaktyvi pamoka (kanonas) |
| Use | promptanatomy.info | Organization kit — **ne** pamokos chrome be atskiros užduoties |
| Create | promptanatomy.space | Marketing kit — ne chrome |
| Hire | promptanatomy.help | HR kit — ne chrome |
| Manage | promptanatomy.ceo | CEO generator — ne chrome |
| Decide | [promptanatomy.pro/en/](https://promptanatomy.pro/en/) | Executive kit — hero tertiary „CEO rinkinys“ |
| Deepen | promptanatomy.blog | Knowledge hub — ne chrome |
| Play | promptanatomy.lol | Corporate Ladder — ne chrome |
| Žemėlapis | [promptanatomy.site](https://promptanatomy.site/) | Sibling marketing SPA (DITreneris/site); CTA tertiary „Ekosistemos žemėlapis“ |

- **Interaktyvi pamoka (kanonas):** EN `/`, LT `/lt/`; LT šaltinis — [index.html](index.html), statinis build — [site/index.html](site/index.html) ir `site/lt/index.html` po `npm run build`. Absoliutūs `canonical` / `og:*` / `hreflang` / `sitemap.xml`: numatyta `https://promptanatomy.cloud` ([scripts/build-locale-pages.js](scripts/build-locale-pages.js), aplinka `PUBLIC_ORIGIN`).
- **Viešas UI šiame repo:** Enter → Hub (`.app`) + Decide (`.pro`, hero foot) + tertiary į `.site` (CTA skaidrė). Kitų subdomainų **nekelti** į pamokos chrome be atskiros užduoties.
- **Entity footer (hub QW1b):** `#cta` → `.cta-entity-footer` **virš** `.site-legal-footnote` — entity + kelias į hubą, ne antras Tier‑1 / ne „Buy Core“. Copy kanonas: LT `Promptų Anatomijos ekosistema · Mokymai ir checkout → promptanatomy.app`; EN `Part of Prompt Anatomy · Training & checkout → promptanatomy.app`. Href: `https://www.promptanatomy.app/?utm_source=cloud&utm_medium=entity_footer&utm_campaign=ecosystem` + `data-track=entity_footer_click`. Be founder vardo. LT + EN pora [scripts/en-html-replacements.cjs](scripts/en-html-replacements.cjs). Ne dėti ant hub `.app`; satellites (`tools*`, `404`) — neprivaloma.
- **Outbound UTM:** visos nuorodos į `.app` / `.pro` / `.site` — `utm_source=cloud`. Medium = vieta (`banner` / `slide` / `entity_footer` / `hero_footer` / `cta_footer`). Campaign trumpas ir stabilus (`promptu_anatomija` / `ecosystem` / `executive_pro` / `ecosystem_map`). Draudžiama: `lead`, `promptanatomy_app`, `promptanatomy_cloud`. Patikra: [scripts/verify-utm-canon.js](scripts/verify-utm-canon.js) (`npm run verify:utm-canon`). Eventai: `data-track` + `document` delegavimas → `window.va('event')` (Vercel); outbound turi `data-track-dest` (`app` / `pro` / `site`).
- **Išorinės nuorodos (`.pro` / `.site` / entity `.app`):** LT [index.html](index.html) + pora [scripts/en-html-replacements.cjs](scripts/en-html-replacements.cjs) (`aria-label`, UTM), tada `npm run build` ir `npm run verify`.

## Golden standard (LT)

- **Tonas**: visur „TU“ (profesionaliai, trumpai, be „mokyklos“ tono).
- **Forma**: vengti „-kite“ konstrukcijų (pvz. „Atsisiųskite“) — rašyti tiesiai „Atsisiųsk“. Bibliotekos placeholder’iai — TU: `[ĮRAŠYK]`, `[APRAŠYK UŽDUOTĮ]`, `[ĮKLIJUOK TEKSTĄ]` (ne `[ĮRAŠYKITE]`).
- **Tikslas**: padėti **įmonės darbuotojui** ir **vadovui** greitai pritaikyti sistemą darbe.
- **Terminija**: „DI“, „užklausa (promptas)“ (pirmą kartą gali būti su paaiškinimu), „šablonas“, „patikra“, „skaidrė“, „biblioteka“.
- **Microcopy**: vienas sakinys = viena mintis; CTA = vienas veiksmas; veiksmažodžiai vietoj abstrakcijų.
- **Ilgis**: jei įmanoma, sakinys iki ~14–18 žodžių; perteklių skaidyti į 2 sakinius arba į sąrašą. **Skaidržių tankis:** lead ≤ 2 sakiniai; kortelės aprašas ≤ 1; vienas Tier‑1 CTA skaidrėje.
- **Formatas**: kabutės „…“, intervalai su brūkšniu/en dash (pvz. 10–30 min), didžiosios raidės tik kai reikia (ne šaukimui).
- **Aiškumas**: vietoj „kažkas“/„tinka“/„geriau“ rašyti konkretų kriterijų ar rezultatą (ką gausi, ką darysi).
- **Red flags**: mišrus „TU/JŪS“, ilgi sakiniai su 3+ šalutiniais, dviprasmiai pažadai („sutaupysi garantuotai“), kaltinanti kalba, perteklinis žargonas.

## Golden standard (EN)

- **Audience**: same product; address the reader as **you** (professional, concise, not a “school” tone).
- **Terminology**: “AI”, “prompt”, “template”, “check”, “slide”, “library” — keep consistent with the EN UI.
- **Microcopy**: one clear action per CTA; short sentences; avoid mixed LT/EN in one string.

## LT / EN (i18n) ir deploy

- **Šaltinis (LT):** [index.html](index.html) lieka kanoninis lietuviškas šablonas redagavimui.
- **Build:** `npm run build` generuoja [site/](site/) — **EN** į `site/index.html` (šaknis), **LT** į `site/lt/index.html` (`../assets/…`, `../favicon.svg`), taip pat `robots.txt` ir `sitemap.xml`; `canonical` / `hreflang` / `x-default` ir social meta absoliučiais URL pagal `PUBLIC_ORIGIN` (numatyta `promptanatomy.cloud`). EN tekstas — [scripts/en-html-replacements.cjs](scripts/en-html-replacements.cjs) + [scripts/build-locale-pages.js](scripts/build-locale-pages.js). GitHub Pages projektui CI nustato `SITE_PREFIX=/lead` (`app-base-path`). Senas kelias `/en/` repozitoriuje nebegeneruojamas — apex serveryje pageidautina **301** iš `/en/` į `/`.
- **Biblioteka EN:** kopijuojami tekstai anglų kalba — [assets/prompt-library-en.js](assets/prompt-library-en.js) (`window.__PROMPT_LIBRARY_EN__`); LT tekstai — `libraryPromptsLt` inline `index.html`. Naujas raktas: atnaujink abu šaltinius ir `syncLibraryDom` raktus HTML.
- **PDF:** Tracked outputs — [assets/www.promptanatomy.app.pdf](assets/www.promptanatomy.app.pdf) (LT) and [assets/www.promptanatomy.app-en.pdf](assets/www.promptanatomy.app-en.pdf) (EN). Local sources (gitignored, optional): `docs/pamoka-1-pdf.md`, `docs/pamoka-1-pdf-en.md`. If those MD files exist locally, rebuild with `scripts/build-pdf.ps1` or `build-pdf.sh`, then **commit the PDF binaries**. EN page links — [scripts/en-html-replacements.cjs](scripts/en-html-replacements.cjs).
- **GitHub Pages:** [.github/workflows/pages.yml](.github/workflows/pages.yml) paleidžia `npm install`, `npm run build` ir `npm run verify` prieš artefaktą; `BASE_PATH` jei kada nors reikės project site — aplinkos kintamasis build skripte.

### Dviguba patikra (LT↔EN)

- **Viena redakcija — keli šaltiniai:** pakeitus matomą LT eilutę `index.html`, dažnai reikia atnaujinti ir [scripts/en-html-replacements.cjs](scripts/en-html-replacements.cjs) porą (kartais kelias poras: matomas tekstas, `aria-label`, `data-copy-text`).
- **Biblioteka:** naujas ar pakeistas `data-emp-key` / `data-mgr-key` — visada **abu**: `libraryPromptsLt` ir [assets/prompt-library-en.js](assets/prompt-library-en.js) (vadovui atskiri `mgr_*`, jei taikoma).
- **Dinaminiai pranešimai:** naujas tekstas į `aria-live`, `#a11y-status` ar mygtuko būseną po veiksmo — naudoti `uiText(lt, en)` (arba EN statinį HTML per build), kad EN šaknis nepraleistų LT.
- **Automatinė patikra:** `npm run build`, tada `npm run verify` — [scripts/verify-library-keys.js](scripts/verify-library-keys.js) (raktų paritetas HTML ↔ abu bibliotekos šaltiniai) ir [scripts/verify-en-locale.js](scripts/verify-en-locale.js) (dažni LT likučiai `site/index.html` ne `<script>` / ne CSS). **Pastaba:** `verify:en-locale` reikalauja jau sugeneruoto `site/index.html` (EN; paleisk build).

## 1. Turinio agentas (LT)

- Redaguoja viešą tekstą `index.html`: antraštės, lead, quiz, CTA, bibliotekos įvadas.
- Tonas: profesionalus, aiškus, **įmonės darbuotojui / vadovui**; vengti perteklinės mokyklos terminologijos, nebent sąmoningai pedagoginiame kontekste.
- **Readability:** lead ≤ 2 sakiniai; kortelės `desc` ≤ 1; vienas raudonas (Tier 1) CTA skaidrėje; CTA = vienas veiksmas.
- Nekeisti JS logikos be reikalo; neardyti skaidrių struktūros be priežasties.

## 2. Frontend / skaidrės

- Viena byla `index.html`: CSS `:root` kintamieji, navigacija, responsive taisyklių laikymasis.
- **Design system (v2.1):** kanonas [`styles/tokens.css`](styles/tokens.css) + `inject-design-tokens` → [index.html](index.html); patterns `.slide-lead`, `.disclosure-chip*`, `.btn-pdf-outline`, `.link-tier-tertiary`; type/measure tokens; decision recipes (lead ≤ 2 / desc ≤ 1 / one Tier‑1 CTA; disclosure chips for progressive detail); public tokens in CSS; verify: `design-tokens`, `satellite-tokens`, `typography-roles`; palydoviniai [`404.html`](404.html), [`tools.html`](tools.html), [`tools-lt.html`](tools-lt.html). Optional local prose: `docs/design_system.md` if present.
- Naujas mygtukas / tekstas / `details` — pirmiausia decision recipes; tokenai tik per `styles/tokens.css` (ne rankinis `:root` tarp `DS_TOKENS_*`).
- Naujos skaidrės = nauji `section` + du atitinkami `nav-item` (šonas ir mobilusis).

## 3. PDF sinchronas

- Tracked: `assets/www.promptanatomy.app.pdf`, `assets/www.promptanatomy.app-en.pdf`.
- If local (gitignored) `docs/pamoka-1-pdf.md` / `docs/pamoka-1-pdf-en.md` exist and you edit them: run `scripts/build-pdf.ps1` or `scripts/build-pdf.sh`, then commit the matching PDF binaries.
- Nuorodos puslapyje: LT → `assets/www.promptanatomy.app.pdf`; EN build (šaknis) → angliškas failas (poros faile `en-html-replacements.cjs`).

## 4. Biblioteka ir vadovo kelias

- Darbuotojo ir vadovo rinkiniai: `libraryPrompts` (LT arba EN objektas) + vadovo raktai (`mgr_*`), tabų būsena `syncLibraryDom`.
- Naujas mini-promptas: pridėti `pre` + mygtuką su `data-emp-key` / `data-mgr-key` ir atitinkamus tekstus JS.

### 4.1. Teksto šaltinis (vienas kanonas, be „drift“)

- **Kanonas kopijuojamam tekstui:** LT — `libraryPromptsLt` inline `index.html`; EN — `window.__PROMPT_LIBRARY_EN__` faile [assets/prompt-library-en.js](assets/prompt-library-en.js); veikiantis objektas `libraryPrompts` renkamas pagal `LOCALE`. Tušti `pre.library-prompt-block` užpildo `syncLibraryDom()` paleidus puslapį ir perjungus tabą Darbuotojas / Vadovas.
- **Naujas ar keičiamas mini-promptas:** visada atnaujinti LT ir EN objektus (ir skirtingus `mgr_*`, jei vadovui reikia kitokio teksto). Ant `pre` ir „Kopijuoti“ mygtuko palikti tuos pačius `data-emp-key` / `data-mgr-key`.
- **Ko vengti:** rankiniu būdu pildyti tik `pre` turinį HTML be atitikmens JS — tada kopijuojamas tekstas gali nesutapti su tuo, ką mato vartotojas.
- **Automatinė raktų sinchronizacija:** visi `data-emp-key` / `data-mgr-key` / `data-prompt-key` iš `index.html` turi egzistuoti ir `libraryPromptsLt`, ir [assets/prompt-library-en.js](assets/prompt-library-en.js) — tai tikrina [scripts/verify-library-keys.js](scripts/verify-library-keys.js) (`npm run verify` dalis).
- **Ilgesnė alternatyva (backlog):** vienas šaltinis (Markdown / JSON) + build žingsnis, jei komanda nuspręs priimti minimalų įrankių sluoksnį.

## 5. Release

- Prieš push į `main`: jei regeneravai PDF iš local MD — commit updated `assets/*.pdf`; ar veikia nuorodos ir GitHub Pages deploy.
- Jei keitėsi **i18n** (`index.html` matomas tekstas, bibliotekos raktai, [scripts/en-html-replacements.cjs](scripts/en-html-replacements.cjs), [assets/prompt-library-en.js](assets/prompt-library-en.js)): `npm run build`, tada `npm run verify` (žr. **„Dviguba patikra“**).
- **SEO / GEO artefaktai:** `npm run build` generuoja `site/robots.txt` (AI crawlers įskaitant `OAI-SearchBot` / `Claude-SearchBot` + `Content-Signal`), `sitemap.xml` (PDF + `llms*` + `pricing.md` + `lastmod`), `llms.txt`, `llms-full.txt`, `pricing.md`, `security.txt` + `/.well-known/security.txt` (RFC 9116), `.well-known/*` — [scripts/build-locale-pages.js](scripts/build-locale-pages.js), [scripts/generate-llms-artifacts.js](scripts/generate-llms-artifacts.js); JSON-LD build metu (`Organization` + `LearningResource` ir kt.). Po build: `verify:robots-llms`. Produkcijoje patikrink `https://promptanatomy.cloud/robots.txt`, `…/sitemap.xml`, `…/llms.txt`, `…/.well-known/security.txt`.
- Optional local checklist: `SETUP.md` (gitignored) if present on your machine.
