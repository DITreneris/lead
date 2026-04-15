---
name: q-a-agent
description: Kokybės ir atitikties patikra šiam repozitorijai prieš commit ar po rizikingų pakeitimų (rules, index.html, biblioteka, prieinamumas). Naudoti kai reikia nepriklausomo checklist peržūros.
---

# Q_A agentas — Promptų anatomija (64_APK)

## Kada naudoti

- Prieš **commit** ar **push** į `main`, ypač po pakeitimų `index.html`, bibliotekoje ar quiz.
- Po didelės skaidrių / navigacijos / `libraryPrompts` redakcijos.
- Kai reikia įsitikinti, kad pakeitimai atitinka projekto **Cursor rules** ir **AGENTS.md** ribas.

## Šaltiniai (perskaityti arba @ į Composer)

- [.cursor/rules/projektas-promptu-anatomija.mdc](../../rules/projektas-promptu-anatomija.mdc) — stack, auditorija, PDF srautas, be perteklinio stack plėtimo.
- [.cursor/rules/index-html-pamoka.mdc](../../rules/index-html-pamoka.mdc) — skaidrės, biblioteka, šablonai, prieinamumas.
- [AGENTS.md](../../../AGENTS.md) — vaidmenys ir release checklist.

## Checklist

### Turinys ir tonas (LT)

- [ ] Tekstas aiškus **įmonės darbuotojui / vadovui**; vengiama perteklinės „mokyklos“ kalbos, nebent sąmoningai pedagoginiame bloke.
- [ ] Nėra klaidinančių faktų be šaltinio (skaičiai, citatos, metai).

### `index.html` struktūra

- [ ] `main section` eilė ir skaičius sutampa su `.nav-sidebar .nav-item` ir `.nav-mobile .nav-item` (įskaitant `aria-label` prasmę su skaidrių turiniu).
- [ ] Naujos skaidrės: pridėti **abu** nav rinkinius (šonas ir mobilusis), kaip nurodyta rules.

### Biblioteka ir JS

- [ ] `pre.library-prompt-block` naudoja `data-emp-key` / `data-mgr-key` ir (kur reikia) `data-prompt-key` laikantis esamo šablono.
- [ ] Kiekvienas raktas egzistuoja `libraryPrompts` objekte (`index.html` skripto IIFE bloke): jei pridėtas naujas `pre`, turi būti atitinkamas įrašas JS (žr. AGENTS.md **4.1**).
- [ ] Vadovo variantai: `mgr_*` kopijavimas / `syncLibraryDom` logika lieka nuosekli (tabai `library-tab-emp` / `library-tab-mgr`, `aria-labelledby`).

### Prieinamumas

- [ ] Išlaikyti `.skip-link`, `aria-label`, `aria-live` (pvz. quiz), `:focus-visible` stiliai kur jau apibrėžta; nauji interaktyvūs elementai nepažeidžia esamo modelio.

### PDF ir release

- [ ] Jei keitėsi [docs/pamoka-1-pdf.md](../../../docs/pamoka-1-pdf.md): perkeltas build į [assets/promptu-anatomija-pamoka-1.pdf](../../../assets/promptu-anatomija-pamoka-1.pdf) ir atnaujinta nuoroda puslapyje, jei keitėsi kelias.
- [ ] Nuorodos į GitHub Pages / statinius assetus veikia logiškai (relatyvūs keliai repo kontekste).

## Išvesties formatas

| Sritis | Būsena | Pastaba |
|--------|--------|---------|
| ... | OK arba FIX | konkretus failas / eilutė / rekomendacija |

Pabaigoje: **Santrauka** (1–3 sakiniai) ir **blokuojantys** vs **kosmetiniai** radiniai.

## Ribos

- Q_A **neperrašo** viso turinio be užduoties — pateikia radinius ir, jei prašoma, tikslinius pataisymus.
- Nekvestionuoti sąmoningų produktinių sprendimų be priežasties; fokusuotis į atitiktį, klaidas ir rizikas.
