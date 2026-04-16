# Changelog

Visos reikšmingos šio projekto pataisos bus dokumentuojamos čia. Formatas remiasi [Keep a Changelog](https://keepachangelog.com/lt/1.1.0/), versijos seka [Semantic Versioning](https://semver.org/lang/lt/).

## [Unreleased]

### Added

- **Prieinamumas:** paslėptas `#a11y-status` regionas (`.visually-hidden`, `aria-live="polite"`, `aria-atomic="true"`) ir pranešimai po sėkmingo / nesėkmingo kopijavimo (`copyPromptText`) [index.html](index.html).
- **Klaviatūra:** `Escape` uždaro „Turinys“ (`details#slide-outline`) ir grąžina fokusą į `summary` [index.html](index.html).

### Removed

- **Dublikatas:** pašalintas senas PDF failas `assets/promptu-anatomija-pamoka-1.pdf` — kanonas lieka [assets/www.promptanatomy.app.pdf](assets/www.promptanatomy.app.pdf).

### Changed

- **Gilumo skaidrės 7–11 ir biblioteka:** trumpesni pavadinimai (nav, kelio planas, `aria-label`); gilumo `prompt-line` šablonai įvairesni (ne vienoda VAIDMUO–KONTEKSTAS–REZULTATAS monotonija); skaidrė 6 (QC) — tik lengvas sutrumpinimas; bibliotekos kopijuojami šablonai (`libraryPrompts` + `mgr_*` kur skiriasi) — trumpa LT įžanga ir laukai **Įvestis** / **Išvestis** vietoj META/INPUT/OUTPUT (įskaitant kokybės patikrą) [index.html](index.html).
- **Copy (mažiau pasikartojimų):** schema — sujungtas `schema-lead` su 2–3 vs 5 žingsnių mintimi, pašalinta antra bibliotekos eilutė ir `schema-advance-hint`; praktika — vienas „Toliau“ į kelio planą (6 žingsniai), pašalinta `guided-advance-hint` ir šoninis kelias „į patikrą“; kelio planas — viena `roadmap-sub`; gilumo skaidrės 6–11 — unikalūs įžangų sakiniai vietoj „Kitas lygis…“ [index.html](index.html).
- **Kanoninis URL:** `og:url`, `og:image`, `twitter:image`, `link rel="canonical"`, prekės ženklo nuoroda ir mokamos programos CTA nukreipti į `https://www.promptanatomy.app/` [index.html](index.html); [README.md](README.md) ir [.cursor/rules/projektas-promptu-anatomija.mdc](.cursor/rules/projektas-promptu-anatomija.mdc) sutapdinti su [SETUP.md](SETUP.md).
- **Cursor rule:** [.cursor/rules/index-html-pamoka.mdc](.cursor/rules/index-html-pamoka.mdc) — bibliotekos kategorijų inkarai atitinka kodą (`#lib-cat-work`, `#lib-cat-comm`, `#lib-cat-qc`).
- **CI:** [.github/workflows/verify.yml](.github/workflows/verify.yml) — papildomas patikrinimas, kad egzistuotų `assets/www.promptanatomy.app.pdf`.
- **Biblioteka (vadovas):** atskiros `mgr_*` užklausos tekstui trumpinimui ir apribojimams (`mgr_simplifyText`, `mgr_constraints`) — nebe identiškos darbuotojo versijai [index.html](index.html).
- **Dokumentacija:** [SETUP.md](SETUP.md) — skyriai „Lean repo“ ir „Prieš push į main“; [README.md](README.md) — nuorodos į lean/release ir [todo.md](todo.md).
- **UI:** ramus „surface“ sluoksniavimas (`:root` žetonai), subtilesnės skaidrių ir kortelių ribos (`--border-hairline`), silpnas ambient fonas ant `body`, didesnis vertikalus tarpas tarp iliustracijos ir quiz / esmės teksto; švelninta įvado geltona dėmė [index.html](index.html).
- **Mikrokopija (LT):** gramatikos ir tono pataisymai (schema „nespėliuotų“, praktika „per miglą“, kelio plano įvadas, patikros ir bibliotekos eilutės, kveizo grįžtamasis ryšys, `libraryPrompts` vietos rezervai ir kokybės šablone); patikslinta `lib_emailReply` eilutė (**„Profesionalus, mandagus tonas“**) ir deeskalacijos įvesties rezervas (**„[TRUMPAI APRAŠYK]“** — žodis „aprašyk“, ne „aprąžyk“) [index.html](index.html).
- **Vartotojo kelionė:** kelio plano skaidrė perkelta **po praktikos**, prieš 6 gilumo skaidres (`#roadmap`); sąrašo eilė sutapatinta su skaidrėmis (nuo patikros); schema ir praktika papildytos trumpu „kur eisi toliau“ su nuorodomis; navigacijos ir `#cta` etiketės suderintos su PDF + kitu žingsniu [index.html](index.html).
- **Hash → biblioteka:** `#library` atidaro numatytą kategoriją **„Kasdienis darbas“** (`#lib-cat-work`) ir išsuka į bibliotekos sekciją (`openLibraryTargetFromHash`) [index.html](index.html).
- **Inline nuorodos:** likusioms geltonoms `<a>` pridėta `class="inline-link"` (įskaitant dinaminį kveizo atsakymo linką), kad sutaptų fokuso stilius su kitais inline CTA [index.html](index.html).

## [0.3.0] - 2026-04-15

### Added

- **Socialiniai meta ir OG:** `og:image`, `twitter:card` (`summary_large_image`), `twitter:image` — [assets/og-promptanatomy.png](assets/og-promptanatomy.png); absoliutus URL pradžioje `http://promptanatomy.app/assets/og-promptanatomy.png` (vėliau sutapdinta su `https://www.promptanatomy.app/` žr. [Unreleased]) [index.html](index.html).
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
- Išorinės nuorodos: pagrindinė svetainė ir CTA į mokamą programą (anksčiau `http://promptanatomy.app/`; žr. [Unreleased] dėl `https://www.promptanatomy.app/`) [index.html](index.html).
- CTA poraštės tekstas atspindi įmonės / komandos kontekstą.

### Fixed

- `.gitignore` — papildymai Pandoc/LaTeX pagalbiniams failams (`*.aux`, `*.log`, ir kt.).

## [Ankstesnės versijos]

Projektas anksčiau neturėjo atskiro changelog failo; ankstesnės istorijos detalės — `git log`.
