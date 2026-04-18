# Setup — Promptų anatomija (64_APK)

## Kas tai

Vieno failo statinė pamoka ir lead magnetas: [index.html](index.html), publikuojama per [GitHub Pages](.github/workflows/pages.yml) (šaknies katalogas).

## Vietinis peržiūrėjimas

Atidarykite `index.html` naršyklėje (dvigubas paspaudimas) arba naudokite paprastą HTTP serverį, jei reikia pilnos `clipboard` API funkcijos.

## PDF iš Markdown

1. Įdiekite **Pandoc**: [https://pandoc.org/installing.html](https://pandoc.org/installing.html) arba `winget install JohnMacFarlane.Pandoc`.
2. **PDF variklis** (skriptas renka šia tvarka; jei nieko neranda — aiški klaida ir stabdymas):
   - pirmiausia **Typst** (`winget install Typst.Typst`), tada Pandoc kviečiamas su `--pdf-engine=typst`;
   - jei Typst nėra — bandoma **pdflatex**, paskui **xelatex**, paskui **lualatex** (turi būti PATH, pvz. MiKTeX arba TeX Live).
3. Šaltinis: [docs/pamoka-1-pdf.md](docs/pamoka-1-pdf.md). Išvestis: [assets/www.promptanatomy.app.pdf](assets/www.promptanatomy.app.pdf).

**Pull request į `main`:** jei PR keičia `docs/pamoka-1-pdf.md`, tame pačiame PR turi būti ir atnaujintas [assets/www.promptanatomy.app.pdf](assets/www.promptanatomy.app.pdf) — tai tikrina [verify.yml](.github/workflows/verify.yml).

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

- **Vienas UI šaltinis:** [index.html](index.html) — HTML, CSS, JS vienoje byloje; naujos funkcijos geriau čia nei nauji įrankiai.
- **Vienas PDF kanonas:** šaltinis [docs/pamoka-1-pdf.md](docs/pamoka-1-pdf.md) → build → tik [assets/www.promptanatomy.app.pdf](assets/www.promptanatomy.app.pdf) (senų dublikatų necommitinti).
- **Biblioteka:** kopijuojamas tekstas — `libraryPrompts` + `syncLibraryDom` (žr. [AGENTS.md](AGENTS.md) §4.1).
- **Kontekstas agentams:** [AGENTS.md](AGENTS.md) — maršrutai; Cursor rules — `.cursor/rules/`; kokybė — `.cursor/skills/q-a-agent/SKILL.md`.

## Prieš push į `main` (release)

Trumpas smoke testas ir atitiktis; išsamiau — [AGENTS.md](AGENTS.md) skyrius „Release“.

- [ ] Jei keitėsi `docs/pamoka-1-pdf.md`: paleistas `scripts/build-pdf.ps1` arba `build-pdf.sh`, commitintas [assets/www.promptanatomy.app.pdf](assets/www.promptanatomy.app.pdf).
- [ ] Jei [CHANGELOG.md](CHANGELOG.md) mini PDF perbuild arba turinio pakeitimą PDF — commit’e matosi atitinkamas [assets/www.promptanatomy.app.pdf](assets/www.promptanatomy.app.pdf) pakeitimas (kai taikoma).
- [ ] `index.html`: pagrindiniai CTA, PDF nuorodos, bibliotekos kopijavimas, `#library` / hash elgsena.
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
5. **Publikacija:** projekto Pages URL bus `https://DITreneris.github.io/lead/` (keliai puslapyje santykiniai — papildomo `base` nereikia).

**Pastaba:** `og:url`, `canonical` ir panašūs meta gali likti nukreipti į [www.promptanatomy.app](https://www.promptanatomy.app/) kaip į kanoninį domeną; tai normalu, jei `github.io` naudojate tik kaip papildomą ar perkėlimo etapą.
