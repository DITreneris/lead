# Darbų planas — Promptų anatomija (64_APK)

Vienas kanonas: kas uždaroma čia, laikom uždaryta projekte. Lean repo principai: [SETUP.md](SETUP.md) (**„Lean repo“**), release: tas pats failas (**„Prieš push į `main`“**) + [AGENTS.md](AGENTS.md) §5.

---

## Fazė 0 — Repo higiena ir paprastumas *(uždaryta šiame PR / iteracijoje)*

- [x] PDF kanonai: LT `assets/www.promptanatomy.app.pdf` (`docs/pamoka-1-pdf.md`), EN `assets/www.promptanatomy.app-en.pdf` (`docs/pamoka-1-pdf-en.md`), build per `scripts/build-pdf.*`.
- [x] Pašalintas dublikatas `assets/promptu-anatomija-pamoka-1.pdf`.
- [x] Dokumentacija: lean + release checklist [SETUP.md](SETUP.md); įrašyta [CHANGELOG.md](CHANGELOG.md); [README.md](README.md) rodo į planą ir release.

---

## Fazė 1 — Turinys ir biblioteka (produktas)

Tikslas: aiškūs rezultatai kiekvienam mini-promptui, „TU“ tonas, be pertekliaus.

- [x] Perbėgti visas bibliotekos kategorijas **Darbuotojas** ir **Vadovas**: ar kiekvienas blokas baigiasi konkrečiu išėjimu (formatas / žingsniai / kriterijai).
- [x] Ten, kur vadovui reikia kito kampo — atskira mikrokopija (ne tik `mgr_*` kopija), kad tabas būtų prasmingas. *(UI rodytuose blokuose likę identiški tik tie raktai, kurie bibliotekoje nerodomi — pvz. `thoughtChain` / `promptSeq` / `instruct` lieka tik JS rezerve.)*
- [x] Po reikšmingų turinio pakeitimų: įrašas [CHANGELOG.md](CHANGELOG.md) (Unreleased); prieš commit — neprivaloma peržūra pagal `@.cursor/skills/q-a-agent/SKILL.md`.

---

## Fazė 2 — Prieinamumas ir mobilus UX

Tikslas: pilnas klaviatūros kelias, aiškūs fokusai, patogu telefone.

- [x] Nav + „Turinys“ (`details`) + bibliotekos tabai — tab order ir Escape elgsena *(esama: `Escape` ant `#slide-outline`, `:focus-visible`, bibliotekos tabų `aria-selected`)*.
- [x] `aria-live` po kopijavimo ir tab perjungimo — ar pranešimai ne triukšmingi *(esama: `#a11y-status`, bibliotekos `aria-live` ant panelės)*.
- [x] Mobile: sticky nav, `details` bibliotekoje, mygtukų plotis, teksto lūžiai *(lean patikra: papildomų pataisymų šioje iteracijoje nereikėjo)*.

---

## Fazė 3 — Release ir CI pasitikėjimas

Tikslas: prieš kiekvieną `main` push — trumpas, kartojamas ritualas.

- [x] Prieš push: [SETUP.md](SETUP.md) checklist **„Prieš push į `main`“** (PDF šį kartą nekeitėm; CTA/biblioteka/hash/404 — patvirtink lokaliai; Actions — žr. repo CI).
- [x] Jei keičiasi tik MD/PDF — visada commitinti abu + atnaujintas `assets/www.promptanatomy.app.pdf` *(procesas nepakitęs; ši iteracija — tik `index.html` + docs)*.

---

## Fazė 4 — Matavimas (spoke → hub)

Tikslas: matyti klikus Vercel Events ir vienodą inbound UTM ant `.app`.

- [x] `track()` → `window.va('event')` + `dataLayer` / console; `[data-track]` delegavimas ant `document` (quiz `quiz_next_paid` / `quiz_back_schema`).
- [x] Outbound UTM: `utm_source=cloud` (banner / slide / entity_footer / hero `.pro` / `.site`); `verify:utm-canon`.
- [x] Hero tools: `data-track="hero_tools_click"` (nuoroda palikta).

---

## Fazė 5 — SEO / GEO (Enter spoke) *(uždaryta 2026-09-03, commit `e8ba0ef`)*

Tikslas: teisingas freshness signalas, FAQ schema be drift, plonas sitemap, tools ne indeksuojami.

- [x] `lastmod` / `dateModified` atskirti nuo `OG_IMAGE_VERSION` — [`scripts/site-build-config.js`](scripts/site-build-config.js).
- [x] FAQ JSON-LD iš matomo hero — [`scripts/hero-faq-utils.js`](scripts/hero-faq-utils.js) + `hero-faq__item` [`index.html`](index.html).
- [x] Sitemap: 4 URL (`/` `/lt/` + 2 PDF) + `xhtml:hreflang`; `llms*` / `pricing.md` ne sitemap'e.
- [x] `tools.html` / `tools-lt.html`: `noindex, follow` + canonical į pamoką.
- [x] Organization logo JSON-LD → `favicon.svg`.
- [x] `verify:robots-llms` — FAQ paritetas, sitemap forma, tools.
- [x] **Rankinis:** GSC Domain Verify → submit `sitemap.xml` (TXT jau DNS). *(uždaryta 2026-09-07: `/` ir `/lt/` indeksuoti)*
- [x] Vercel 301 `/index.html` → `/` ir `/lt/index.html` → `/lt/`.
- [x] Satellite hrefs (`tools.html` / `tools-lt.html` / `404.html`) be `index.html`.

---

## Fazė 6 — Build determinism & cleanup *(uždaryta 2026-09-13, commit `4592126`)*

Tikslas: deterministinis `site/` artefaktas, griežtesnė LT↔EN/UTM patikra, neveikiančių UI liekanų valymas.

- [x] `build-locale-pages.js` — išvalo `site/` prieš generavimą (nebelieka `site/en/`).
- [x] `prepare-site-artifact.js` — `PUBLIC_FILES` allowlist (11 failų); meme paritetas per `verify:robots-llms`.
- [x] Idempotentinė tokenų injekcija + `verify:token-injection-idempotence`.
- [x] EN biblioteka fail-closed (`{}` + `console.error`, ne tylus LT fallback); EN `Library controls` aria pora.
- [x] `verify-utm-canon.js` — per-anchor `utm_source=cloud`, `data-track`, `data-track-dest`; brand header UTM.
- [x] Pašalinti neveikiantys CSS/JS (`.library-toc`, schema/CTA liekanos); aktyvūs memai — 2 PNG.
- [x] Vercel production deploy (`lead` → `promptanatomy.cloud`) patvirtintas po push.

---

## Backlog (be datos — kai bus prioritetas)

- [x] **„Turinys“ (TOC)**: grupavimas + „Pirmiausia“ (praktika · biblioteka) — 2026-09-13 A polish.
- [ ] **Vienas šaltinis bibliotekai** (Markdown / JSON + build): tik jei komanda nuspręs, kad `libraryPrompts` maintenance per sunkus — dabar kanonas lieka JS pagal [AGENTS.md](AGENTS.md) §4.1.
- [ ] **DS deferred:** full WCAG certification; harden `verify:typography-roles` to fail CI — žr. [docs/design_system.md](docs/design_system.md) §14.
