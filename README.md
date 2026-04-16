# Promptų anatomija (64_APK)

Vieno failo statinė interaktyvi pamoka (`index.html`) su „Promptų biblioteka“. Skirta greitam pritaikymui darbe ir publikuojama per GitHub Pages.

## Nuorodos

- **Kanoninis puslapis**: `https://www.promptanatomy.app/`
- **PDF santrauka**: `assets/www.promptanatomy.app.pdf`
- **Pakeitimų istorija**: [CHANGELOG.md](CHANGELOG.md)

## Greitas startas

- **Peržiūra**: atsidaryk `index.html` naršyklėje.
- **Kai reikia pilnos kopijavimo (clipboard) API**: paleisk paprastą HTTP serverį ir atidaryk per `http://...`.

## PDF build (iš Markdown)

Šaltinis yra `docs/pamoka-1-pdf.md`, o išvestis turi būti `assets/www.promptanatomy.app.pdf`.

Instrukcija ir komandos: [SETUP.md](SETUP.md).

## Deploy į GitHub Pages

Projektas deploy’inamas iš repo šaknies per GitHub Actions workflow `.github/workflows/pages.yml`.

Trumpa instrukcija (įskaitant *Settings → Pages → Source = GitHub Actions*): [SETUP.md](SETUP.md).

## Projekto struktūra

- **`index.html`**: visas UI (HTML + CSS + JS)
- **`docs/pamoka-1-pdf.md`**: PDF šaltinis
- **`scripts/build-pdf.ps1` / `scripts/build-pdf.sh`**: MD → PDF build
- **`assets/`**: statiniai failai (įskaitant PDF ir OG paveikslą)
- **`.github/workflows/`**: Pages deploy ir minimalus verify

## Darbo principai (kad nebūtų „drift“)

- **Tekstai (LT) turi būti „TU“ tonu** ir trumpi.
- **„Promptų bibliotekos“ kopijuojamas tekstas** turi gyventi `libraryPrompts` objekte (JS), o HTML `pre` blokai pildomi per `syncLibraryDom`.
- Jei keiti `docs/pamoka-1-pdf.md`, **perbuildink PDF ir commitink abu**.

## Lean repo ir release

Trumpa santrauka: vienas `index.html`, vienas kanoninis PDF, be perteklinių artefaktų. Pilnas sąrašas ir checklist prieš push: [SETUP.md](SETUP.md) skyriai **„Lean repo“** ir **„Prieš push į main“**. Vykdymo eiga agentams: [AGENTS.md](AGENTS.md). Atvirų darbų planas: [todo.md](todo.md).
