# Mermaid pavyzdžiai — Data agentas

Šablonus galima kopijuoti ir adaptuoti `SKILL.md` kontekste. Laikytis taisyklių iš pagrindinio skilo (node ID be tarpų, `subgraph id [Label]`, kabučių etiketės ant rodyčių).

## 1. Lean turinio srautas (MD → PDF → puslapis)

```mermaid
flowchart LR
  mdSource[pamoka-1-pdf.md]
  buildScript[build-pdf ps1 arba sh]
  pdfAsset[promptu-anatomija-pamoka-1.pdf]
  indexPage[index.html nuoroda]
  mdSource --> buildScript
  buildScript --> pdfAsset
  pdfAsset --> indexPage
```

## 2. Sluoksniai: statinis deploy (GitHub Pages)

```mermaid
flowchart TD
  subgraph repo [Repozitorija]
    html[index.html]
    workflow[pages.yml]
  end
  subgraph pages [GitHub Pages]
    site[Public site]
  end
  html --> workflow
  workflow -->|"deploy"| site
```

## 3. Orkestratoriaus logika (supaprastinta)

```mermaid
flowchart TD
  task[Užduotis]
  orch[AGENTS maršrutas]
  dataSkill[Data agent skill]
  impl[Implementacija]
  qaSkill[Q_A skill]
  task --> orch
  orch -->|"schema_duomenys_planas"| dataSkill
  orch -->|"turinys_ar_kodas"| impl
  impl -->|"prieš_commit"| qaSkill
  qaSkill -->|"FIX"| impl
```
