# Changelog

Visos reikšmingos šio projekto pataisos bus dokumentuojamos čia. Formatas remiasi [Keep a Changelog](https://keepachangelog.com/lt/1.1.0/), versijos seka [Semantic Versioning](https://semver.org/lang/lt/).

## [Unreleased]

### Added

### Changed

### Fixed

## [0.3.0] - 2026-04-15

### Added

- **Socialiniai meta ir OG:** `og:image`, `twitter:card` (`summary_large_image`), `twitter:image` — [assets/og-promptanatomy.png](assets/og-promptanatomy.png); absoliutus URL `http://promptanatomy.app/assets/og-promptanatomy.png` [index.html](index.html).
- **Hero:** viena eilutė apie trukmę ir rezultatą (`.hero-meta`) [index.html](index.html).
- **„Turinys“:** `#slide-outline` su dinamiškai užpildomu sąrašu iš šoninės navigacijos `aria-label`, slinkimas į tą pačią skaidrę kaip taškai [index.html](index.html).
- **Biblioteka:** kategorijos suskleidžiamos per `<details>` (numatyta atidaryta); ant `#library-panels` — `aria-live` / `aria-atomic` tab perjungimui [index.html](index.html).
- **AGENTS.md** skyrius **4.1** — bibliotekos teksto kanonas (`libraryPrompts` vs `pre`), ko vengti, backlog idėja.
- **Rules / Q_A:** [.cursor/rules/index-html-pamoka.mdc](.cursor/rules/index-html-pamoka.mdc) papildymai (Turinys, TOC, `details`); [.cursor/skills/q-a-agent/SKILL.md](.cursor/skills/q-a-agent/SKILL.md) nuoroda į AGENTS 4.1 vietoj pasenusių eilučių numerių.
- **Orkestratorius** [AGENTS.md](AGENTS.md): darbo eiga (įvestis → maršrutas → specialistas → neprivaloma Q_A → release) ir Composer nuorodos į projekto skillus.
- **Cursor skillai** (`.cursor/skills/`): `data-agent` — schemos (Mermaid), duomenų / faktų tikrinimas, pokyčių planas ir vykdymo eilė; `reference.md` su diagramų pavyzdžiais. `q-a-agent` — kokybės ir atitikties checklist (`index.html`, biblioteka, rules, PDF / release).
- Lead magnet PDF nuorodos puslapyje: hero ir CTA skaidrė (`assets/www.promptanatomy.app.pdf`, atributas `download`).
- `scripts/build-pdf.ps1` ir `scripts/build-pdf.sh` — Markdown → PDF per Pandoc (su `typst` kaip PDF engine, jei įdiegtas).
- `SETUP.md` — vietinis peržiūrėjimas, PDF build, nuorodos į svetaines.
- `README.md` — trumpas aprašymas ir nuoroda į setup.
- **CI:** [.github/workflows/verify.yml](.github/workflows/verify.yml) — minimalus statinių failų patikrinimas (`push` / `pull_request` į `main`). **SETUP.md** — šaltas deploy į GitHub (pvz. `DITreneris/lead`), Pages šaltinis = GitHub Actions.
- `.cursor/rules/` — `projektas-promptu-anatomija.mdc`, `index-html-pamoka.mdc`.
- `AGENTS.md` — vaidmenų santrauka (turinys, frontend, PDF, biblioteka, release).
- **Promptų biblioteka** skaidrėje: tabai „Darbuotojas“ / „Vadovas“, atskiri `mgr_*` promptai ir sinchronizacija (`syncLibraryDom`, `resolveLibraryKey`).

### Changed

- **PNG ir gradientai:** atnaujintas OG paveikslas (`assets/og-promptanatomy.png`), `og:image:width/height` sulyginti su faktiniais matmenimis; meme intarpų gradientas susietas su `:root` palete (su fallback senesnėms naršyklėms) [index.html](index.html).
- **Golden standard (LT) rollout:** sulygintas „TU“ tonas likusiuose UI pranešimuose ir pagalbinėse žinutėse (įskaitant edge-case tekstus) [index.html](index.html).
- **Terminija:** suvienodinta „užklausa (promptas)“ pirmo paminėjimo logika ir UI etiketės (greitas top vietų perėjimas) [index.html](index.html).
- **PDF kokybė:** PDF santraukoje pridėta aiški nuoroda `www.promptanatomy.app`, o išvesties failas standartizuotas į `assets/www.promptanatomy.app.pdf` [docs/pamoka-1-pdf.md](docs/pamoka-1-pdf.md), [scripts/build-pdf.ps1](scripts/build-pdf.ps1).
- **Premium microcopy:** suvienodintas TU tonas, sutrumpinti hero / schema / praktikos / bibliotekos / quiz tekstai (mažiau apkrovos, daugiau aiškumo) [index.html](index.html).
- **Premium mikro UI:** aktyvaus navigacijos taško `scale` sumažintas, tip'o gradientas sušvelnintas (raudona labiau palikta signalui) [index.html](index.html).
- **Bibliotekos struktūra:** pašalinta klaidinanti kategorijų numeracija (1/6), suformuotos 3 aiškios kategorijos ir įdėti papildomi promptai iš `libraryPrompts` (`meetingNotes`, `emailReply`, `simplifyText`, `constraints`) [index.html](index.html).
- **CTA pabaiga:** PDF kaip pagrindinis veiksmas (geltonas „primary“ stilius), mokama programa — antrinis mygtuko stilius ir aiški „Kitas žingsnis“ etiketė [index.html](index.html).
- **Scroll spy:** skaidrių aktyvumo skaičiavimas per `requestAnimationFrame` throttling ir `passive: true` ant `scroll` [index.html](index.html).
- Pozicionavimas ir tekstai: auditorija **įmonės darbuotojas** (title, hero, tipų skaidrė, roadmap, šablonų skaidrės, quiz, patikros blokas).
- Išorinės nuorodos: pagrindinė svetainė `http://promptanatomy.app/`, CTA į mokamą programą [index.html](index.html).
- CTA poraštės tekstas atspindi įmonės / komandos kontekstą.

### Fixed

- `.gitignore` — papildymai Pandoc/LaTeX pagalbiniams failams (`*.aux`, `*.log`, ir kt.).

## [Ankstesnės versijos]

Projektas anksčiau neturėjo atskiro changelog failo; ankstesnės istorijos detalės — `git log`.
