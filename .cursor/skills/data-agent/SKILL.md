---
name: data-agent
description: Schemos (Mermaid), duomenų ir teksto faktų tikrinimas, pokyčių planas ir vykdymo eilė šiame repozitorijoje. Naudoti kai reikia diagramų, duomenų srautų, rizikų prieš keičiant index.html ar PDF šaltinį.
---

# Data agentas — Promptų anatomija (64_APK)

## Kada naudoti

- Reikia **nubraižyti schemą** (architektūra, duomenų / turinio srautas, procesas).
- Reikia **patikrinti duomenis ar faktus** tekste, lentelėse, skaidrėse (ar sutampa su šaltiniu / kodu).
- Prieš didesnius pakeitimus: **planas pagal bylas**, tada vykdymas pagal rekomendacijas.
- Užduotys apie kelią: `docs/pamoka-1-pdf.md` → PDF build → `assets/www.promptanatomy.app.pdf` → nuorodos `index.html`.

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

- **Šaltinis:** skaičiai ir teiginiai turi remtis `index.html`, `docs/pamoka-1-pdf.md`, vartotojo pateiktais failais ar aiškiai pažymėtais įvesties duomenimis.
- Jei šaltinio nėra: rašyti `Nežinoma / reikia šaltinio`, ne išgalvoti skaičių ar citatų.
- Palyginti: ar tas pats faktas **nesipriešina** tarp MD, HTML ir JS (pvz. metai, pavadinimai, keliai į `assets/`).

### 3. Išvesties šablonas (visada šia tvarka)

1. **Schema** (Mermaid arba ASCII) — tai, ką vartotojas prašė vizualizuoti.
2. **Duomenų / faktų hipotezės ir rizikos** — kas patvirtinta faile, kas neaišku, kas gali išsikreipti po pakeitimo.
3. **Planuojami pakeitimai (bylos)** — sąrašas su keliais (`index.html`, `docs/...`, `scripts/...`, `assets/...`).
4. **Vykdymo eilė** — numeruoti žingsniai (pvz. pirma MD, tada `scripts/build-pdf.ps1`, tada commit PDF).

### 4. Ryšys su repozitorija

- Vienas pagrindinis puslapis: [index.html](../../../index.html) (HTML + CSS + JS).
- PDF šaltinis: [docs/pamoka-1-pdf.md](../../../docs/pamoka-1-pdf.md); build: [scripts/build-pdf.ps1](../../../scripts/build-pdf.ps1) / [scripts/build-pdf.sh](../../../scripts/build-pdf.sh); išvestis: [assets/www.promptanatomy.app.pdf](../../../assets/www.promptanatomy.app.pdf).
- **Neplėsti** stacko (frameworkai, bundleriai, backend) be aiškios priežasties — žr. projekto `.cursor/rules`.

### 5. „Mokymasis“ šiame projekte

- Konvencijos ir pavyzdžiai gyvena šiame `SKILL.md` ir `reference.md`; atnaujink juos, kai komanda sutaria dėl naujos diagramų ar duomenų tikrinimo taisyklės.
