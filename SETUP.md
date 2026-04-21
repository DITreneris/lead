# Setup — Promptų anatomija (64_APK)

## Kas tai

Vieno failo statinė pamoka ir lead magnetas: [index.html](index.html), publikuojama per [GitHub Pages](.github/workflows/pages.yml) (šaknies katalogas).

## Vietinis peržiūrėjimas

Atidarykite `index.html` naršyklėje (dvigubas paspaudimas) arba naudokite paprastą HTTP serverį, jei reikia pilnos `clipboard` API funkcijos.

**LT / EN (lokalus build):** įdiekite [Node.js](https://nodejs.org/) (LTS), tada iš repozitorijos šaknies:

```powershell
npm install
npm run build
npm run verify
```

`npm run verify` reikalauja, kad jau būtų paleistas `npm run build` (generuojamas `site/en/index.html`). Žr. [AGENTS.md](AGENTS.md) skyrių „Dviguba patikra (LT↔EN)“.

Atidarykite `site/index.html` (LT, šaknis), `site/lt/index.html` arba `site/en/index.html` per tą patį HTTP serverį, kad veiktų keliai į `assets/` (poaplankiuose build naudoja `../assets/…`) ir kalbos perjungimas į `/lt/` bei `/en/`. Katalogą `site/` galima ignoruoti commituose — jį generuoja CI.

- **Anglų biblioteka:** [assets/prompt-library-en.js](assets/prompt-library-en.js) (įkeliama prieš pagrindinį skriptą `index.html`).
- **GitHub Pages projekto URL** (`…/repo/`): build metu nustatykite `BASE_PATH=/repo` (žr. [scripts/build-locale-pages.js](scripts/build-locale-pages.js) komentarus / aplinkos kintamąjį workflow).

## PDF iš Markdown

1. Įdiekite **Pandoc**: [https://pandoc.org/installing.html](https://pandoc.org/installing.html) arba `winget install JohnMacFarlane.Pandoc`.
2. **PDF variklis** (skriptas renka šia tvarka; jei nieko neranda — aiški klaida ir stabdymas):
   - pirmiausia **Typst** (`winget install Typst.Typst`), tada Pandoc kviečiamas su `--pdf-engine=typst`;
   - jei Typst nėra — bandoma **pdflatex**, paskui **xelatex**, paskui **lualatex** (turi būti PATH, pvz. MiKTeX arba TeX Live).
3. Šaltiniai: [docs/pamoka-1-pdf.md](docs/pamoka-1-pdf.md) (LT) ir [docs/pamoka-1-pdf-en.md](docs/pamoka-1-pdf-en.md) (EN). Išvestis: [assets/www.promptanatomy.app.pdf](assets/www.promptanatomy.app.pdf) ir [assets/www.promptanatomy.app-en.pdf](assets/www.promptanatomy.app-en.pdf) (abu generuoja tas pats `build-pdf` skriptas). **Maketas (PDF):** pagrindiniai nustatymai (`geometry`, `fontsize`) ir turinio patobulinimai — abiejų kalbų MD YAML ir lentelėse; skriptas tik nurodo `--resource-path`.

**Pull request į `main`:** jei PR keičia `docs/pamoka-1-pdf.md`, tame pačiame PR turi būti ir atnaujintas LT PDF; jei keičia `docs/pamoka-1-pdf-en.md` — EN PDF — tai tikrina [verify.yml](.github/workflows/verify.yml).

**Windows (PowerShell):**

```powershell
.\scripts\build-pdf.ps1
```

**Linux / macOS:**

```bash
chmod +x scripts/build-pdf.sh
./scripts/build-pdf.sh
```

Po pakeitimų `docs/pamoka-1-pdf.md` paleiskite build ir commitinkite atnaujintą PDF kartu su MD.

## Lean repo (kad būtų paprasta tvarkytis)

- **Vienas UI šaltinis:** [index.html](index.html) — HTML, CSS, JS vienoje byloje; naujos funkcijos geriau čia nei nauji įrankiai. LT / EN statinis skaidymas — `npm run build` + [scripts/build-locale-pages.js](scripts/build-locale-pages.js); papildomas failas tik EN bibliotekai — [assets/prompt-library-en.js](assets/prompt-library-en.js).
- **PDF kanonai:** LT — [docs/pamoka-1-pdf.md](docs/pamoka-1-pdf.md) → [assets/www.promptanatomy.app.pdf](assets/www.promptanatomy.app.pdf); EN — [docs/pamoka-1-pdf-en.md](docs/pamoka-1-pdf-en.md) → [assets/www.promptanatomy.app-en.pdf](assets/www.promptanatomy.app-en.pdf).
- **Biblioteka:** kopijuojamas tekstas — `libraryPrompts` + `syncLibraryDom` (žr. [AGENTS.md](AGENTS.md) §4.1).
- **LT / EN patikra:** po `npm run build` — `npm run verify` ([package.json](package.json) — `verify-library-keys` + `verify-en-locale`).
- **Kontekstas agentams:** [AGENTS.md](AGENTS.md) — maršrutai; Cursor rules — `.cursor/rules/`; kokybė — `.cursor/skills/q-a-agent/SKILL.md`.

## Prieš push į `main` (release)

Trumpas smoke testas ir atitiktis; išsamiau — [AGENTS.md](AGENTS.md) skyrius „Release“.

- [ ] Jei keitėsi `docs/pamoka-1-pdf.md` ir/ar `docs/pamoka-1-pdf-en.md`: paleistas `scripts/build-pdf.ps1` arba `build-pdf.sh`, commitinti pasikeitusius `assets/www.promptanatomy.app.pdf` ir/ar `assets/www.promptanatomy.app-en.pdf`.
- [ ] Jei [CHANGELOG.md](CHANGELOG.md) mini PDF perbuild arba turinio pakeitimą PDF — commit’e matosi atitinkamas [assets/www.promptanatomy.app.pdf](assets/www.promptanatomy.app.pdf) pakeitimas (kai taikoma).
- [ ] `index.html`: pagrindiniai CTA, PDF nuorodos, bibliotekos kopijavimas, `#library` / hash elgsena; po `npm run build` — `site/en/index.html` ir `site/lt/index.html` (kalbos perjungiklis, `/en/` ir `/lt/`).
- [ ] Po `npm run build`: `npm run verify` (bibliotekos raktų paritetas ir EN puslapio LT „drift“) — žr. [AGENTS.md](AGENTS.md) skyrių „Dviguba patikra (LT↔EN)“.
- [ ] [404.html](404.html) atsidaro ir grįžta į pamoką.
- [ ] GitHub Actions: [pages.yml](.github/workflows/pages.yml) ir [verify.yml](.github/workflows/verify.yml) žali po push (kai taikoma).

## Nuorodos

- Oficiali svetainė: [https://www.promptanatomy.app/](https://www.promptanatomy.app/)
- Tęsinys (automation hub): [https://ditreneris.github.io/automation/](https://ditreneris.github.io/automation/)

## Šaltas deploy į GitHub (pvz. [DITreneris/lead](https://github.com/DITreneris/lead))

1. **Repozitorija:** tuščias `lead` klonas arba naujas remote. Vietiniame kataloge `origin` dabar gali rodyti į kitą repo — pasirinkite vieną variantą:
   - pakeisti `origin`: `git remote set-url origin https://github.com/DITreneris/lead.git`
   - arba antras remote: `git remote add lead https://github.com/DITreneris/lead.git` ir tada `git push -u lead main`
2. **Pirmas push:** įsitikinkite, kad `main` šakoje yra visi reikalingi failai (įskaitant [.github/workflows/pages.yml](.github/workflows/pages.yml) ir [`.github/workflows/verify.yml`](.github/workflows/verify.yml)), tada `git push -u origin main` (arba `-u lead main`).
3. **GitHub Pages:** repozitorijoje *Settings → Pages → Build and deployment → Source:* pasirinkite **GitHub Actions** (ne „Deploy from a branch“), kad veiktų esamas Pages workflow.
4. **Pirmas Actions paleidimas:** po push atidarykite *Actions* ir leiskite workflow baigtis; jei reikia, *Settings → Actions → General* patvirtinkite workflow leidimus organizacijos lygmenyje.
5. **Publikacija:** projekto Pages URL yra **`https://DITreneris.github.io/lead/`**; anglų versija — **`https://DITreneris.github.io/lead/en/`**. Adresas `https://DITreneris.github.io/en/` yra vartotojo/organizacijos šaknies svetainė (ne šis repo) ir ten bus 404. Deploy workflow nustato `SITE_PREFIX=/lead`, kad kalbos perjungiklis ir `../assets/` veiktų po `/lead/`.

**Pastaba:** `og:url`, `canonical` ir panašūs meta gali likti nukreipti į [www.promptanatomy.app](https://www.promptanatomy.app/) kaip į kanoninį domeną; tai normalu, jei `github.io` naudojate tik kaip papildomą ar perkėlimo etapą.
