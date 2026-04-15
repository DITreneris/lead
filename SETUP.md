# Setup — Promptų anatomija (64_APK)

## Kas tai

Vieno failo statinė pamoka ir lead magnetas: [index.html](index.html), publikuojama per [GitHub Pages](.github/workflows/pages.yml) (šaknies katalogas).

## Vietinis peržiūrėjimas

Atidarykite `index.html` naršyklėje (dvigubas paspaudimas) arba naudokite paprastą HTTP serverį, jei reikia pilnos `clipboard` API funkcijos.

## PDF iš Markdown

1. Įdiekite **Pandoc**: [https://pandoc.org/installing.html](https://pandoc.org/installing.html) arba `winget install JohnMacFarlane.Pandoc`.
2. **Windows**: be LaTeX dažnai pakanka **Typst** kaip PDF variklio: `winget install Typst.Typst`, tada skriptas naudoja `--pdf-engine=typst`.
3. Šaltinis: [docs/pamoka-1-pdf.md](docs/pamoka-1-pdf.md). Išvestis: [assets/promptu-anatomija-pamoka-1.pdf](assets/promptu-anatomija-pamoka-1.pdf).

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
