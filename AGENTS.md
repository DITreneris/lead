# AGENTS — Promptų anatomija (64_APK)

Trumpi vaidmenys, kuriuos galima įklijuoti į Cursor Composer arba naudoti kaip kontekstą.

## Orkestratorius (darbo eiga)

Viena eiga vietoj atskiro „router“ ir „orchestrator“ serviso: klasifikuok užduotį, prijunk kontekstą, paleisk vieną pagrindinį specialistą, prireikus — Q_A.

1. **Įvestis:** ką keiti (pvz. tik `index.html`, tik `docs/pamoka-1-pdf.md`, ar abi dalys)? Koks tikslas (turinys, UI, PDF, schema / duomenų peržūra, LT/EN)?
2. **Maršrutas:**
   - **Turinys (LT)** — žemiau „Turinio agentas“; neardyti JS ir skaidrių be reikalo.
   - **Turinys (EN) arba abu kalbas** — `scripts/en-html-replacements.cjs` (matomas HTML EN puslapyje), [assets/prompt-library-en.js](assets/prompt-library-en.js) (biblioteka), po pakeitimo `npm run build` ir `npm run verify` (įskaitant `site/index.html` kaip EN).
   - **Skaidrės / CSS / nav / biblioteka** — „Frontend / skaidrės“ + „Biblioteka ir vadovo kelias“.
   - **PDF** — „PDF sinchronas“ (MD → build → commit PDF).
   - **Schemos, duomenų tikrinimas, planas prieš kodą** — Cursor skillas: Composer įkelti `@.cursor/skills/data-agent/SKILL.md` (ir pagal poreikį `@.cursor/skills/data-agent/reference.md`).
3. **Vykdymas:** į chat įtraukti aktualius failus (`@index.html`, `@docs/pamoka-1-pdf.md`, …) pagal maršrutą.
4. **Q_A (neprivaloma):** prieš commit ar po rizikingų pakeitimų — `@.cursor/skills/q-a-agent/SKILL.md` (įskaitant LT↔EN checklist); po `npm run build` — `npm run verify` (žr. žemiau **„Dviguba patikra“**).
5. **Release:** žemiau skyriuje „Release“.

## Ekosistema (domenai)

- **Šis repo / kanonas:** [www.promptanatomy.app](https://www.promptanatomy.app/) — interaktyvi pamoka; LT redakcija — [index.html](index.html), EN statinis build — [site/index.html](site/index.html) po `npm run build`.
- **Seserinis executive rinkinys:** [promptanatomy.pro/en/](https://promptanatomy.pro/en/) — CEO/COO „Prompt Operating Kit“; ne pakaitalas šiam repo ir ne kanoninis LT šaltinio URL. Jei keiti hero nuorodą į `.pro`: LT [index.html](index.html) + pora [scripts/en-html-replacements.cjs](scripts/en-html-replacements.cjs), tada `npm run build` ir `npm run verify`.

## Golden standard (LT)

- **Tonas**: visur „TU“ (profesionaliai, trumpai, be „mokyklos“ tono).
- **Forma**: vengti „-kite“ konstrukcijų (pvz. „Atsisiųskite“) — rašyti tiesiai „Atsisiųsk“.
- **Tikslas**: padėti **įmonės darbuotojui** ir **vadovui** greitai pritaikyti sistemą darbe.
- **Terminija**: „DI“, „užklausa (promptas)“ (pirmą kartą gali būti su paaiškinimu), „šablonas“, „patikra“, „skaidrė“, „biblioteka“.
- **Microcopy**: vienas sakinys = viena mintis; CTA = vienas veiksmas; veiksmažodžiai vietoj abstrakcijų.
- **Ilgis**: jei įmanoma, sakinys iki ~14–18 žodžių; perteklių skaidyti į 2 sakinius arba į sąrašą.
- **Formatas**: kabutės „…“, intervalai su brūkšniu/en dash (pvz. 10–30 min), didžiosios raidės tik kai reikia (ne šaukimui).
- **Aiškumas**: vietoj „kažkas“/„tinka“/„geriau“ rašyti konkretų kriterijų ar rezultatą (ką gausi, ką darysi).
- **Red flags**: mišrus „TU/JŪS“, ilgi sakiniai su 3+ šalutiniais, dviprasmiai pažadai („sutaupysi garantuotai“), kaltinanti kalba, perteklinis žargonas.

## Golden standard (EN)

- **Audience**: same product; address the reader as **you** (professional, concise, not a “school” tone).
- **Terminology**: “AI”, “prompt”, “template”, “check”, “slide”, “library” — keep consistent with the EN UI.
- **Microcopy**: one clear action per CTA; short sentences; avoid mixed LT/EN in one string.

## LT / EN (i18n) ir deploy

- **Šaltinis (LT):** [index.html](index.html) lieka kanoninis lietuviškas šablonas redagavimui.
- **Build:** `npm run build` generuoja [site/](site/) — **EN** į `site/index.html` (šaknis, kanonas JAV / pagrindinė auditorija), **LT** į `site/lt/index.html` (`../assets/…`), taip pat `robots.txt` ir `sitemap.xml`; `canonical` / `hreflang` / `x-default` → EN šaknis. EN tekstas — [scripts/en-html-replacements.cjs](scripts/en-html-replacements.cjs) + [scripts/build-locale-pages.js](scripts/build-locale-pages.js). GitHub Pages projektui CI nustato `SITE_PREFIX=/lead` (`app-base-path`). Senas kelias `/en/` repozitoriuje nebegeneruojamas — apex serveryje pageidautina **301** iš `/en/` į `/`.
- **Biblioteka EN:** kopijuojami tekstai anglų kalba — [assets/prompt-library-en.js](assets/prompt-library-en.js) (`window.__PROMPT_LIBRARY_EN__`); LT tekstai — `libraryPromptsLt` inline `index.html`. Naujas raktas: atnaujink abu šaltinius ir `syncLibraryDom` raktus HTML.
- **PDF:** LT šaltinis — [docs/pamoka-1-pdf.md](docs/pamoka-1-pdf.md) → [assets/www.promptanatomy.app.pdf](assets/www.promptanatomy.app.pdf); EN šaltinis — [docs/pamoka-1-pdf-en.md](docs/pamoka-1-pdf-en.md) → [assets/www.promptanatomy.app-en.pdf](assets/www.promptanatomy.app-en.pdf). Build: `scripts/build-pdf.ps1` arba `build-pdf.sh` (abu failai). Statiniame EN HTML (`site/index.html`) nuorodos į anglišką PDF — [scripts/en-html-replacements.cjs](scripts/en-html-replacements.cjs). **Patikra:** jei vartotojas atsisiuntė `www.promptanatomy.app.pdf`, tai LT failas — anglų turinį duoda tik `…-en.pdf` iš EN puslapio (šaknis `/`).
- **GitHub Pages:** [.github/workflows/pages.yml](.github/workflows/pages.yml) paleidžia `npm install`, `npm run build` ir `npm run verify` prieš artefaktą; `BASE_PATH` jei kada nors reikės project site — aplinkos kintamasis build skripte.

### Dviguba patikra (LT↔EN)

- **Viena redakcija — keli šaltiniai:** pakeitus matomą LT eilutę `index.html`, dažnai reikia atnaujinti ir [scripts/en-html-replacements.cjs](scripts/en-html-replacements.cjs) porą (kartais kelias poras: matomas tekstas, `aria-label`, `data-copy-text`).
- **Biblioteka:** naujas ar pakeistas `data-emp-key` / `data-mgr-key` — visada **abu**: `libraryPromptsLt` ir [assets/prompt-library-en.js](assets/prompt-library-en.js) (vadovui atskiri `mgr_*`, jei taikoma).
- **Dinaminiai pranešimai:** naujas tekstas į `aria-live`, `#a11y-status` ar mygtuko būseną po veiksmo — naudoti `uiText(lt, en)` (arba EN statinį HTML per build), kad EN šaknis nepraleistų LT.
- **Automatinė patikra:** `npm run build`, tada `npm run verify` — [scripts/verify-library-keys.js](scripts/verify-library-keys.js) (raktų paritetas HTML ↔ abu bibliotekos šaltiniai) ir [scripts/verify-en-locale.js](scripts/verify-en-locale.js) (dažni LT likučiai `site/index.html` ne `<script>` / ne CSS). **Pastaba:** `verify:en-locale` reikalauja jau sugeneruoto `site/index.html` (EN; paleisk build).

## 1. Turinio agentas (LT)

- Redaguoja viešą tekstą `index.html`: antraštės, lead, quiz, CTA, bibliotekos įvadas.
- Tonas: profesionalus, aiškus, **įmonės darbuotojui / vadovui**; vengti perteklinės mokyklos terminologijos, nebent sąmoningai pedagoginiame kontekste.
- Nekeisti JS logikos be reikalo; neardyti skaidrių struktūros be priežasties.

## 2. Frontend / skaidrės

- Viena byla `index.html`: CSS `:root` kintamieji, navigacija, responsive taisyklių laikymasis.
- Naujos skaidrės = nauji `section` + du atitinkami `nav-item` (šonas ir mobilusis).

## 3. PDF sinchronas

- Šaltiniai: `docs/pamoka-1-pdf.md` (LT), `docs/pamoka-1-pdf-en.md` (EN). Po pakeitimo: `scripts/build-pdf.ps1` arba `scripts/build-pdf.sh`, tada commitinti atitinkamus `assets/www.promptanatomy.app.pdf` ir `assets/www.promptanatomy.app-en.pdf`.
- Nuorodos puslapyje: LT → `assets/www.promptanatomy.app.pdf`; EN build (šaknis) → angliškas failas (poros faile `en-html-replacements.cjs`).
- PR į `main`: jei keičiasi MD, tame pačiame PR turi keistis ir PDF — tikrina `.github/workflows/verify.yml` (kitu atveju CI failina).

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

- Prieš push į `main`: ar PDF atitinka MD (jei keitėsi MD); ar veikia nuorodos ir GitHub Pages deploy.
- Jei keitėsi **i18n** (`index.html` matomas tekstas, bibliotekos raktai, [scripts/en-html-replacements.cjs](scripts/en-html-replacements.cjs), [assets/prompt-library-en.js](assets/prompt-library-en.js)): `npm run build`, tada `npm run verify` (žr. **„Dviguba patikra“**).
- Checklist su punktais: [SETUP.md](SETUP.md) skyrius **„Prieš push į `main` (release)“**.
