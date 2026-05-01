# Promptų anatomija (64_APK)

Vieno failo statinė interaktyvi pamoka (`index.html`) su „Promptų biblioteka“. Skirta greitam pritaikymui darbe ir publikuojama per GitHub Pages.

## Nuorodos

- **Interaktyvi pamoka (kanonas):** `https://promptanatomy.cloud/` — **anglų (EN)** po `npm run build` / deploy; lietuvių — **`/lt/`**. Senas kelias `/en/` nebegeneruojamas; apex serveryje pageidautina **301** iš `/en/` į `/`. Kito staging kanonui build metu naudok env **`PUBLIC_ORIGIN`** (žr. [scripts/build-locale-pages.js](scripts/build-locale-pages.js)).
- **Motininė svetainė:** `https://www.promptanatomy.app/` — atskiras brand puslapis (ne šios pamokos hostas).
- **Seserinis executive rinkinys (EN):** `https://promptanatomy.pro/en/` — CEO/COO „Prompt Operating Kit“; papildo šią pamoką.
- **GitHub Pages (repo `lead`)**: EN — **`https://ditreneris.github.io/lead/`** (šaknis), LT — **`https://ditreneris.github.io/lead/lt/`** (ne `…github.io/en/`).
- **PDF santrauka (LT)**: `assets/www.promptanatomy.app.pdf` · **EN (šaknis)**: `assets/www.promptanatomy.app-en.pdf` (šaltiniai `docs/pamoka-1-pdf*.md`). Atsisiunčiant iš **anglų puslapio** (`/`), naršyklė turi pasiūlyti **`www.promptanatomy.app-en.pdf`** — jei matai **`www.promptanatomy.app.pdf`**, tai LT versija (atsisiuntei iš `/lt/`).
- **Pakeitimų istorija**: [CHANGELOG.md](CHANGELOG.md)

## Greitas startas

- **Peržiūra**: atsidaryk `index.html` naršyklėje.
- **Kai reikia pilnos kopijavimo (clipboard) API**: paleisk paprastą HTTP serverį ir atidaryk per `http://...`.

## PDF build (iš Markdown)

Šaltiniai: `docs/pamoka-1-pdf.md` (LT) ir `docs/pamoka-1-pdf-en.md` (EN); išvestys — `assets/www.promptanatomy.app.pdf` ir `assets/www.promptanatomy.app-en.pdf`.

Instrukcija ir komandos: [SETUP.md](SETUP.md).

## Deploy į GitHub Pages

Projektas deploy’inamas iš repo šaknies per GitHub Actions workflow `.github/workflows/pages.yml` (po `npm run build` paleidžiamas ir `npm run verify`).

Trumpa instrukcija (įskaitant *Settings → Pages → Source = GitHub Actions*): [SETUP.md](SETUP.md).

## Vercel (Web Analytics)

- **Įjunk** Vercel projekte: *Settings → Analytics* (Web Analytics).
- **Paketas:** `npm i @vercel/analytics` — priklausomybė fiksuota `package.json`; statiniam HTML be bundlerio build skriptas įterpia oficialų snippetą tik kai **`VERCEL=1`** (Vercel build), kad GitHub Pages deploy nebandytų krauti `/_vercel/insights/script.js` iš neteisingo kelio.

## Projekto struktūra

- **`index.html`**: visas UI (HTML + CSS + JS); EN statinis HTML generuoja `npm run build` → `site/index.html` (LT šaltinis → `site/lt/index.html`)
- **`assets/prompt-library-en.js`**: angliški bibliotekos šablonai
- **`scripts/build-locale-pages.js`**: LT / EN puslapių artefaktas `site/`
- **`scripts/prepare-site-artifact.js`**: po locale build kopijuoja `404.html`, `favicon.svg` ir `assets/` į `site/` (GitHub Pages / Vercel)
- **`vercel.json`**: `outputDirectory` = `site`, build su verify (žr. Vercel projekto nustatymus)
- **`scripts/en-html-replacements.cjs`**: LT→EN statinio HTML poros build metu
- **`scripts/verify-library-keys.js`** / **`scripts/verify-en-locale.js`** / **`scripts/verify-social-meta.js`**: patikros po build (`npm run verify`; žr. [AGENTS.md](AGENTS.md))
- **`docs/pamoka-1-pdf.md`**: PDF šaltinis
- **`scripts/build-pdf.ps1` / `scripts/build-pdf.sh`**: MD → PDF build
- **`assets/`**: statiniai failai (įskaitant PDF ir OG paveikslą)
- **`.github/workflows/`**: Pages deploy ir minimalus verify

## Darbo principai (kad nebūtų „drift“)

- **Tekstai (LT) turi būti „TU“ tonu** ir trumpi.
- **„Promptų bibliotekos“ kopijuojamas tekstas** turi gyventi `libraryPrompts` objekte (JS), o HTML `pre` blokai pildomi per `syncLibraryDom`.
- Jei keiti `docs/pamoka-1-pdf.md`, **perbuildink PDF ir commitink abu**.
- LT / EN: po `npm run build` paleisk **`npm run verify`** (raktų paritetas ir tipiniai LT likučiai EN puslapyje) — detalės [AGENTS.md](AGENTS.md).
- Jei keiti OG paveikslą `assets/og-promptanatomy.png`, padidink `?v=` versiją `index.html` (arba naudok `OG_IMAGE_VERSION` per build), kad Facebook/X persikrautų kortelę.

## Lean repo ir release

Trumpa santrauka: vienas `index.html`, vienas kanoninis PDF, be perteklinių artefaktų. Pilnas sąrašas ir checklist prieš push: [SETUP.md](SETUP.md) skyriai **„Lean repo“** ir **„Prieš push į main“**. Vykdymo eiga agentams: [AGENTS.md](AGENTS.md). Atvirų darbų planas: [todo.md](todo.md).
