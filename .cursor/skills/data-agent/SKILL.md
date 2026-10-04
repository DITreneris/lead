---
name: data-agent
description: Schemos (Mermaid), duomenų ir teksto faktų tikrinimas, pokyčių planas ir vykdymo eilė šiame repozitorijoje. Naudoti kai reikia diagramų, duomenų srautų, rizikų prieš keičiant index.html ar PDF šaltinį. Vietinis Python — ne Windows python (Store stubas, exit 9009); paleisti wsl python3.
---

# Data agentas — Promptų anatomija (64_APK)

## Lessons

Prieš shell komandą perskaityk [lessons.md](lessons.md). Windows `python` yra Store stubas (exit 9009). Python paleidžiamas per `wsl python3` arba `wsl -e python3`.

## Kada naudoti

- Reikia **nubraižyti schemą** (architektūra, duomenų / turinio srautas, procesas).
- Reikia **patikrinti duomenis ar faktus** tekste, lentelėse, skaidrėse (ar sutampa su šaltiniu / kodu).
- Prieš didesnius pakeitimus: **planas pagal bylas**, tada vykdymas pagal rekomendacijas.
- Užduotys apie kelią: optional local `docs/pamoka-1-pdf*.md` (gitignored) → PDF build → commit `assets/www.promptanatomy.app*.pdf` → nuorodos `index.html` (EN build — `en-html-replacements.cjs`).

## Instrukcijos

### 1. Schemos (Mermaid)

- Naudoti **Mermaid** `flowchart` arba `sequenceDiagram`, jei tinka kontekstui.
- **Validi sintaksė:**
  - Node ID: be tarpų (`UserInput`, `pdfBuild`, ne `User Input`).
  - `subgraph` forma: `subgraph id [Žmogiškas pavadinimas]` (pvz. `subgraph pdfLayer [PDF sluoksnis]`).
  - Specialūs simboliai ant rodyčių: `A -->|"etiketė su skliaustais"| B` — etiketė kabutėse, jei yra `()`, `[]`, kableliai.
  - Venkti `end` kaip vienintelio node ID (konfliktas su subgraph sintakse); naudoti `endNode[End]` ar pan.
- Jei Mermaid perteklius — trumpa **ASCII** blokų schema (užtenka mažiems repo aprašams).
- Ilgesni šablonai ir pavyzdžiai: žr. [reference.md](reference.md) šiame kataloge.

### 2. Duomenų ir faktų tikrinimas

- **Šaltinis:** skaičiai ir teiginiai turi remtis `index.html`, optional local `docs/pamoka-1-pdf*.md` (jei yra), vartotojo pateiktais failais ar aiškiai pažymėtais įvesties duomenimis.
- Jei šaltinio nėra: rašyti `Nežinoma / reikia šaltinio`, ne išgalvoti skaičių ar citatų.
- Palyginti: ar tas pats faktas **nesipriešina** tarp MD, HTML ir JS (pvz. metai, pavadinimai, keliai į `assets/`).

### 3. Išvesties šablonas (visada šia tvarka)

1. **Schema** (Mermaid arba ASCII) — tai, ką vartotojas prašė vizualizuoti.
2. **Duomenų / faktų hipotezės ir rizikos** — kas patvirtinta faile, kas neaišku, kas gali išsikreipti po pakeitimo.
3. **Planuojami pakeitimai (bylos)** — sąrašas su keliais (`index.html`, `docs/...`, `scripts/...`, `assets/...`).
4. **Vykdymo eilė** — numeruoti žingsniai (pvz. pirma MD, tada `scripts/build-pdf.ps1`, tada commit PDF).

### 4. Ryšys su repozitorija

- Vienas pagrindinis puslapis: [index.html](../../../index.html) (HTML + CSS + JS).
- PDF: tracked [assets/www.promptanatomy.app.pdf](../../../assets/www.promptanatomy.app.pdf) / [assets/www.promptanatomy.app-en.pdf](../../../assets/www.promptanatomy.app-en.pdf); optional local MD `docs/pamoka-1-pdf*.md`; build: [scripts/build-pdf.ps1](../../../scripts/build-pdf.ps1) / [scripts/build-pdf.sh](../../../scripts/build-pdf.sh).
- **LT / EN (planuojant turinio ar struktūros pokyčius):** kanonas LT `index.html`; EN matomas HTML — [scripts/en-html-replacements.cjs](../../../scripts/en-html-replacements.cjs); biblioteka EN — [assets/prompt-library-en.js](../../../assets/prompt-library-en.js); po pakeitimų — `npm run build` ir `npm run verify` (žr. [AGENTS.md](../../../AGENTS.md) **„Dviguba patikra“**).
- **Build pipeline (`.cloud` → `site/`):** `inject-design-tokens.js` (idempotent) → `build-locale-pages.js` (**išvalo** `site/` prieš rašymą) → `generate-llms-artifacts.js` → `prepare-site-artifact.js`. `PUBLIC_FILES` = branduolys (404, tools, favicon, GSC, OG, EN biblioteka, abu PDF, keturi memai: LT `meme-after-roadmap-lt.png`, EN `meme-after-roadmap.png`, LT `su_2.png`, EN `su_1.png`) + keptos iliustracijos `assets/illustrations/{check,meeting,levels,feedback,team,letter}-{lt,en}.{png,webp}`. `assets/fonts/` nekeliauja. `npm run build` iliustracijų neperkepa (`build:illustrations`). `verify` — [package.json](../../../package.json): library-keys, en-locale, token-injection, design-tokens, illustration-colors, satellite-tokens, typography-roles, contrast-fixtures, social-meta, robots-llms, utm-canon.
- **SEO build sluoksnis:** [scripts/site-build-config.js](../../../scripts/site-build-config.js) (`sitemapLastmod`, `organizationLogoUrl`) → `build-locale-pages.js` (FAQ per [hero-faq-utils.js](../../../scripts/hero-faq-utils.js); sitemap = `/`, `/lt/`, abu PDF) → `verify-robots-llms.js` (meme ir iliustracijų paritetas, EN šaknis be `-lt` iliustracijų, draudimas `site/en/`).
- **Vizualiniai / CSS planai:** tokenai — [`styles/tokens.css`](../../../styles/tokens.css), ne rankinis `:root` drift; optional local `docs/design_system.md` if present. Iliustracijų drobė ir slug — `scripts/illustrations/scenes.mjs` (šešios scenos, 800×900). `#intro` proof yra HTML. Spalvos piešinyje keičiasi per `npm run build:illustrations`.
- **Neplėsti** stacko (frameworkai, bundleriai, backend) be aiškios priežasties — žr. projekto `.cursor/rules`.
- **Hub entity footer (QW1b):** planuojant `#cta` foot — žr. [reference.md](reference.md) §3 ir [AGENTS.md](../../../AGENTS.md); ne painioti su Tier‑1 / `promo-handoff`.

### 5. „Mokymasis“ šiame projekte

- Konvencijos ir pavyzdžiai gyvena šiame `SKILL.md` ir `reference.md`; atnaujink juos, kai komanda sutaria dėl naujos diagramų ar duomenų tikrinimo taisyklės.
