---
name: q-a-agent
description: Kokybės ir atitikties patikra (rules, index.html, biblioteka, a11y, LT/EN paritetas). Naudoti prieš commit ar po rizikingų pakeitimų. Vietinis Python — ne Windows python (Store stubas, exit 9009); paleisti wsl python3.
---

# Q_A agentas — Promptų anatomija (64_APK)

## Lessons

Prieš shell komandą perskaityk [lessons.md](lessons.md). Windows `python` yra Store stubas (exit 9009). Python paleidžiamas per `wsl python3` arba `wsl -e python3`.

## Kada naudoti

- Prieš **commit** ar **push** į `main`, ypač po pakeitimų `index.html`, bibliotekoje ar quiz.
- Po didelės skaidrių / navigacijos / `libraryPrompts` redakcijos.
- Po bet kokio **matomo LT teksto** ar **EN porų** (`en-html-replacements.cjs`) keitimo.
- Kai reikia įsitikinti, kad pakeitimai atitinka projekto **Cursor rules** ir **AGENTS.md** ribas.

## Šaltiniai (perskaityti arba @ į Composer)

- [.cursor/rules/projektas-promptu-anatomija.mdc](../../rules/projektas-promptu-anatomija.mdc) — stack, auditorija, PDF srautas, be perteklinio stack plėtimo.
- [.cursor/rules/index-html-pamoka.mdc](../../rules/index-html-pamoka.mdc) — skaidrės, biblioteka, šablonai, prieinamumas.
- [AGENTS.md](../../../AGENTS.md) — vaidmenys ir release checklist.

## Checklist

### Turinys ir tonas (LT)

- [ ] Tekstas aiškus **įmonės darbuotojui / vadovui**; vengiama perteklinės „mokyklos“ kalbos, nebent sąmoningai pedagoginiame bloke.
- [ ] Nėra klaidinančių faktų be šaltinio (skaičiai, citatos, metai).
- [ ] **DS §2.1 tankis:** lead ≤ 2 sakiniai; kortelės aprašas ≤ 1; vienas Tier‑1 (raudonas) CTA skaidrėje.

### `index.html` struktūra

- [ ] `main section` eilė ir skaičius sutampa su `.nav-sidebar .nav-item` ir `.nav-mobile .nav-item` (įskaitant `aria-label` prasmę su skaidrių turiniu).
- [ ] Naujos skaidrės: pridėti **abu** nav rinkinius (šonas ir mobilusis), kaip nurodyta rules.

### Biblioteka ir JS

- [ ] `pre.library-prompt-block` naudoja `data-emp-key` / `data-mgr-key` ir (kur reikia) `data-prompt-key` laikantis esamo šablono.
- [ ] Kiekvienas raktas egzistuoja `libraryPrompts` objekte (`index.html` skripto IIFE bloke): jei pridėtas naujas `pre`, turi būti atitinkamas įrašas JS (žr. AGENTS.md **4.1**); po build tai dalinai dengia [scripts/verify-library-keys.js](../../../scripts/verify-library-keys.js) (`npm run verify`).
- [ ] Vadovo variantai: `mgr_*` kopijavimas / `syncLibraryDom` logika lieka nuosekli (tabai `library-tab-emp` / `library-tab-mgr`, `aria-labelledby`).

### Prieinamumas

- [ ] Išlaikyti `.skip-link`, `aria-label`, `aria-live` (pvz. quiz), `:focus-visible` stiliai kur jau apibrėžta; nauji interaktyvūs elementai nepažeidžia esamo modelio.
- [ ] Viskas, kas patenka į **`aria-live`** ar **`#a11y-status` `textContent`**, turi būti **kalbai jautrus** (`uiText` arba EN build poros), kad EN puslapyje nebūtų LT pranešimų.

### Vizualinė sistema / DS (v3.1)

- [ ] Naujas mygtukas / CTA — esami tieriai (ne naujas „raudonas“ variantas); naujas tekstas / `details` — decision recipes (role + `.disclosure-chip*`); chrome ≥12–13px. Optional local prose: `docs/design_system.md` if present.
- [ ] Tokenai redaguojami [`styles/tokens.css`](../../../styles/tokens.css) (satellites: [`styles/tokens-satellite.css`](../../../styles/tokens-satellite.css)); po to `npm run build` arba `node scripts/inject-design-tokens.js` — ne rankinis `:root` drift HTML.
- [ ] Nauja vieša CSS klasė ar tokenas — atnaujintas `styles/tokens.css` (+ optional local `docs/design_system.md` if present); disclosure/lead/PDF — reuse `.disclosure-chip*`, `.slide-lead`, `.btn-pdf-outline`.
- [ ] `npm run verify`: `verify:design-tokens` (a new white `rgba` or untokenized hex in lesson component CSS fails; only `#2aabee` allowed), `verify:illustration-colors`, `verify:satellite-tokens`, `verify:typography-roles` (exits 1 when a rule can render below 12px, including `clamp()` and `em`/`rem` at a 16px root, and on orphan `font-size` above 32px; expands `var(--font-size-*)`), `verify:contrast-fixtures`. Optional local smoke notes in `docs/DS_A11Y_SMOKE_v2.md` if present. Color token changes that should update drawings: `npm run build:illustrations`.
- [ ] Po CSS pakeitimų: mobilus smoke (375 / 390 / 768 / 1024 px), jei liečia layout ar nav.

### LT ↔ EN (i18n ir „drift“)

- [ ] **Trys kanonai sinchronizuoti**, jei liečia atitinkamą sritį:
  - matomas HTML LT — [index.html](../../../index.html);
  - EN statinis HTML — [scripts/en-html-replacements.cjs](../../../scripts/en-html-replacements.cjs) (ir `build-locale-pages` `head` EN šakai, jei keičiasi meta / `title`);
  - kopijuojama biblioteka — `libraryPromptsLt` + [assets/prompt-library-en.js](../../../assets/prompt-library-en.js) (tie patys `data-emp-key` / `data-mgr-key`).
- [ ] Po pakeitimų: `npm run build`, tada `npm run verify` (žr. [package.json](../../../package.json)) — CI tai daro po build. **`verify:en-locale`** neveiks be iš anksto sugeneruoto `site/index.html` (EN; pirmiau paleisk `npm run build`).
- [ ] Build konsolėje **nėra** `[build] EN pair … LT fragment missing` / `EN head fragment not found` (žinutės iš [scripts/build-locale-pages.js](../../../scripts/build-locale-pages.js)).
- [ ] **Terminologija EN** sutampa su [AGENTS.md](../../../AGENTS.md) skyriumi „Golden standard (EN)“ ir jau naudojamais žodžiais UI (pvz. „framework“, „prompt“, „library“ — ne maišyti atsitiktinai su kitais sinonimais vienoje šakoje).
- [ ] Nauja ar keista **išorinė nuoroda į promptanatomy.pro** ar **promptanatomy.site**: LT ir EN poros [scripts/en-html-replacements.cjs](../../../scripts/en-html-replacements.cjs), `aria-label`, UTM; pamokos kanonas — `promptanatomy.cloud` (žr. AGENTS.md **„Ekosistema (domenai)“**). Kitų ekosistemos subdomainų (`.info` … `.lol`) **nekelti** į pamokos chrome be atskiros užduoties.
- [ ] **Entity footer (QW1b):** `#cta` turi `.cta-entity-footer` virš legal footnote; copy sutampa su AGENTS.md kanonu (LT + EN pora); href `utm_source=cloud&utm_medium=entity_footer&utm_campaign=ecosystem`; `data-track=entity_footer_click`; neužgožia Tier‑1 CTA; be founder / hard-sell.
- [ ] **Outbound UTM = `cloud`:** visos nuorodos į `.app` / `.pro` / `.site` naudoja `utm_source=cloud` (ne `lead` / `promptanatomy_app` / `promptanatomy_cloud`); LT + EN poros; kiekvienas outbound anchor turi `data-track` ir teisingą `data-track-dest` (`app` / `pro` / `site`); `npm run verify` apima `verify:utm-canon`.
- [ ] **EN biblioteka runtime:** jei `window.__PROMPT_LIBRARY_EN__` neįsikrauna, `libraryPrompts` = `{}` ir `console.error` — ne tylus fallback į LT.

### SEO / GEO (Enter build)

- [ ] Hero FAQ: kiekviena eilutė turi `class="hero-faq__item"`; JSON-LD generuojamas build metu per [scripts/hero-faq-utils.js](../../../scripts/hero-faq-utils.js) — ne hardcoded masyvai `build-locale-pages.js`.
- [ ] FAQ extract **be** fallback; `verify:robots-llms` (ir `npm run build`) failina, jei `extractHeroFaq` kristų į `FALLBACK_FAQ`.
- [ ] `dateModified` / sitemap `lastmod` = build data ([scripts/site-build-config.js](../../../scripts/site-build-config.js) `sitemapLastmod`), **ne** `OG_IMAGE_VERSION`; `datePublished` lieka `LESSON_DATE_PUBLISHED`.
- [ ] `sitemap.xml`: tik `/`, `/lt/`, abu PDF; **be** `llms.txt` / `pricing.md`; lesson eilutėse `xmlns:xhtml` + hreflang.
- [ ] `tools.html` / `tools-lt.html`: `noindex, follow` + `canonical` į pamoką; ne sitemap.
- [ ] `tools.html` / `tools-lt.html` / `404.html` href **ne** į `index.html` (naudoti `./` / `./lt/`).
- [ ] Organization JSON-LD `logo` → `favicon.svg` (OG/Twitter lieka 1200×630 PNG).
- [ ] Social vs search: `og:description` ir `twitter:description` (EN ir `/lt/`) = `SOCIAL_DESCRIPTION_EN` (≤125); `<meta name="description">` ir JSON-LD lieka `META_DESCRIPTION_EN` / `META_DESCRIPTION_LT`. `verify:social-meta` tai tikrina. Neperpiešti `assets/og-promptanatomy.png` dėl „nėra CTA“ OCR.
- [ ] Po SEO pakeitimų: `npm run build` + `verify:robots-llms` (FAQ paritetas, 4 URL sitemap, tools noindex, meme ir iliustracijų paritetas, EN šaknis be `-lt` iliustracijų, draudimas `site/en/`).

### Build artefaktas (`site/`)

- [ ] [scripts/build-locale-pages.js](../../../scripts/build-locale-pages.js) išvalo `site/` prieš generavimą — nebelieka legacy `site/en/`.
- [ ] [scripts/prepare-site-artifact.js](../../../scripts/prepare-site-artifact.js) kopijuoja tik `PUBLIC_FILES`: branduolys + `assets/illustrations/{intro,check,meeting,levels,feedback,team,letter}-{lt,en}.{png,webp}`. `assets/fonts/` ne. Naujas meme, scenos slug ar asset = allowlist + HTML nuoroda + `verify:robots-llms`. Spalva piešinyje — `npm run build:illustrations`, ne `npm run build`. Drobių dydžiai: intro 800×1120, kitos šešios 800×900.
- [ ] `npm run verify` apima `verify:token-injection-idempotence` — pakartotinis tokenų inject nekeičia HTML.

### PDF ir release

- [ ] Jei lokaliai (gitignored) keitei `docs/pamoka-1-pdf.md` / `docs/pamoka-1-pdf-en.md`: perbuildinta ir commitinta [assets/www.promptanatomy.app.pdf](../../../assets/www.promptanatomy.app.pdf) / [assets/www.promptanatomy.app-en.pdf](../../../assets/www.promptanatomy.app-en.pdf). EN build PDF nuorodos — [scripts/en-html-replacements.cjs](../../../scripts/en-html-replacements.cjs) (`…-en.pdf`).
- [ ] Nuorodos į GitHub Pages / statinius assetus veikia logiškai (relatyvūs keliai repo kontekste).

## Išvesties formatas

| Sritis | Būsena | Pastaba |
|--------|--------|---------|
| ... | OK arba FIX | konkretus failas / eilutė / rekomendacija |

Pabaigoje: **Santrauka** (1–3 sakiniai) ir **blokuojantys** vs **kosmetiniai** radiniai.

## Ribos

- Q_A **neperrašo** viso turinio be užduoties — pateikia radinius ir, jei prašoma, tikslinius pataisymus.
- Nekvestionuoti sąmoningų produktinių sprendimų be priežasties; fokusuotis į atitiktį, klaidas ir rizikas.
