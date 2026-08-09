# LT / EN rašybos, gramatikos ir skyrybos auditas

**Data:** 2026-08-09  
**Produktas:** Promptų anatomija (64_APK)  
**Apimtis:** matomas UI + kopijuojami promptai + PDF MD šaltiniai + satellites  
**Metodas:** linijinė inventorizacija → klasifikacija → kanoninis pataisymas → failų pora (LT↔EN)

---

## 0. Santrauka

| Klasė | Skaičius (apytiksliai) | Blokuojantis release? |
|-------|------------------------|------------------------|
| **P0 — aiški klaida** (rašyba / gramatika / dubliavimas) | 6 | Taip — taisyti prieš commit |
| **P1 — golden standard / skyryba / terminija** | 12+ | Rekomenduojama toje pačioje redakcijoje |
| **P2 — stilius / lokalė / anglicizmai** | 10+ | Neprivaloma; produktinis sprendimas |
| **OK / sąmoninga** | Didžioji UI dalis | — |

**Verdiktas:** LT UI kalba bendrai stipri (TU tonas, trumpi sakiniai). Kritinės klaidos koncentruotos keliose vietose: angliškas *minutes*, *Viso iki*, giminės nesutapimas *Dabartinė … juodraštis*, dubliuotas *kitas*, PDF lentelės JŪS formos. EN — greičiau stilistika ir konsistencija (*check-list*, *7 bullet*, *Personalisation*, *without upside*, a11y *manager/employee*).

**Šis dokumentas nekeičia kodo** — jis yra vykdymo planas. Po pataisymų: `npm run build` → `npm run verify`.

---

## 1. Kaip skaityti ir taikyti

### 1.1 Prioritetai

| Kodas | Reikšmė | Veiksmas |
|-------|---------|----------|
| **P0** | Objektyvi klaida (skaitytojas mato netaisyklingą LT/EN) | Taisyti visada |
| **P1** | Projekto kanonas (`AGENTS.md` golden standard) ar skyrybos vienodumas | Taisyti toje pačioje bangėje |
| **P2** | Stilius, skolinių politika, UK/US | Spręsti produkto savininkui; dokumentuoti sprendimą |

### 1.2 Failų žemėlapis (vienas pakeitimas = kelios vietos)

| Turinys | Failai |
|---------|--------|
| Matomas LT HTML | `index.html` |
| Matomas EN HTML | `scripts/en-html-replacements.cjs` (pora LT→EN) |
| Biblioteka LT | `libraryPromptsLt` `index.html` |
| Biblioteka EN | `assets/prompt-library-en.js` |
| Runtime a11y | `uiText(lt, en)` `index.html` |
| PDF LT/EN | `docs/pamoka-1-pdf.md` / `docs/pamoka-1-pdf-en.md` → rebuild → `assets/*.pdf` |
| Satellites | `404.html`, `tools-lt.html`, `tools.html` |

**Taisyklė:** kiekviena P0/P1 eilutė žemiau turi stulpelį **Failai** — taisyti visus vienu metu, kad nebūtų LT↔EN drift.

### 1.3 Skyrybos kanonas (projektui)

| Elementas | Kanonas | Pastaba |
|-----------|---------|---------|
| Em dash | `—` (U+2014) | Prasmės atskirtis, lead’ai |
| En dash | `–` (U+2013) | Intervalai: `10–30`, `1–2` |
| Kabutės LT | `„…“` | Ne `"..."` matomame LT |
| Kabutės EN | `“…”` | Kaip jau EN porose |
| Minutės LT | `min.` arba `minutės` | **Ne** `minutes` |
| Suma LT | `Iš viso` | **Ne** `Viso` |

---

## 2. P0 — blokuojančios klaidos (taisyti pirmiausia)

### P0-01 · EN žodis LT UI: `minutes`

| | |
|--|--|
| **Klaida** | Lietuviškame UI paliktas angliškas *minutes* |
| **Taisyklė** | Skaičius + LT daiktavardis: *2 minutės*; arba santrumpa *2 min.* |
| **Dabar** | `Pradėk per 2 minutes` · `Planas paruoštas per kelias minutes.` |
| **Siūloma** | `Pradėk per 2 minutes` → **`Pradėk per 2 minutės`** · badge → **`Planas paruoštas per kelias minutes.` → `… per kelias minutės.`** |
| **Pastaba** | Hero jau teisingai: `Pradėk 2 min. praktiką` / aria `2 minučių praktiką` — suvienodinti su h2 |
| **Failai** | `index.html` (h2 `#guided`, nav `aria-label` ×2, section `aria-label`, badge skaidrėje 7); `scripts/en-html-replacements.cjs` (LT pusė porų — EN *minutes* lieka) |

**Vykdymas**

```
Pradėk per 2 minutes  →  Pradėk per 2 minutės
per kelias minutes.   →  per kelias minutės.
```

EN poros lieka: `Start in 2 minutes` / `Plan ready in a few minutes.`

---

### P0-02 · `Viso iki` → `Iš viso iki`

| | |
|--|--|
| **Klaida** | *Viso* vietoj *Iš viso* (suma) |
| **Dabar** | `Viso iki ≈ 5 val. / sav. (priklauso nuo naudojimo dažnio)` |
| **Siūloma** | **`Iš viso iki ≈ 5 val. / sav. (priklauso nuo naudojimo dažnio)`** |
| **Failai** | `index.html` (`.roadmap-total`); `en-html-replacements.cjs` (LT eilutė poros; EN jau OK: `Up to ~5 hrs / week total…`) |

---

### P0-03 · Giminės nesutapimas: `Dabartinė žinutės juodraštis`

| | |
|--|--|
| **Klaida** | Būdvardis *Dabartinė* (moteriška) + *juodraštis* (vyriška) |
| **Dabar** | `Dabartinė žinutės juodraštis: [ĮKLIJUOK TEKSTĄ]` |
| **Siūloma** | **`Dabartinis žinutės juodraštis: [ĮKLIJUOK TEKSTĄ]`** |
| **Alternatyva** | `Dabartinė žinutės juodraščio versija:` (jei norima moteriškos konstrukcijos) |
| **Failai** | `index.html` → `lib_deescalateMessage` **ir** `mgr_deescalateMessage` |
| **EN** | Jau teisinga: `Current draft:` — keisti nereikia |

---

### P0-04 · Dubliuotas žodis: `kitas aiškus kitas žingsnis`

| | |
|--|--|
| **Klaida** | Perteklinis *kitas* |
| **Dabar** | `… kvietimas veikti arba kitas aiškus kitas žingsnis.` |
| **Siūloma** | **`… kvietimas veikti arba kitas aiškus žingsnis.`** |
| **Failai** | `index.html` (skaidrė 11 `UŽDUOTIS`); `en-html-replacements.cjs` (LT iš; EN jau gerai: `another clear next step`) |

---

### P0-05 · PDF LT: JŪS formos golden-standard TU kontekste

| | |
|--|--|
| **Klaida** | PDF lentelėje / šablone *-ote / -ėte* (JŪS), kai kanonas — TU |
| **Dabar** | `Ką įrašote` · `[ką sutarėte anksčiau]` |
| **Siūloma** | **`Ką įrašai`** · **`[ką sutarėte anksčiau]` → `[ką sutarei anksčiau]`** |
| **Failai** | `docs/pamoka-1-pdf.md` → `scripts/build-pdf.ps1` / `.sh` → commit `assets/www.promptanatomy.app.pdf` |
| **EN PDF** | OK (`What you write`) |

---

### P0-06 · Skyryba: brūkšnys `–` vs kanonas `—` (de-escalate)

| | |
|--|--|
| **Klaida** | Tame pačiame promptų rinkinyje mišrus brūkšnys |
| **Dabar** | `Jei trūksta faktų – parašyk…` (hyphen/en-dash stilius) |
| **Siūloma** | **`Jei trūksta faktų — parašyk…`** (kaip `lib_qualityCheck` ir EN `—`) |
| **Failai** | `index.html` → `lib_deescalateMessage`, `mgr_deescalateMessage` |

---

## 3. P1 — golden standard, terminija, skyryba

### P1-01 · Placeholder’iai `ĮRAŠYKITE` / `APRAŠYKITE` (JŪS)

| | |
|--|--|
| **Problema** | Golden standard: vengti *-kite*; UI — TU. Placeholder’iai lieka JŪS. |
| **Dabar** | `[ĮRAŠYKITE]`, `[APRAŠYKITE UŽDUOTĮ]` (daug `lib_*` / `mgr_*`) |
| **Siūloma (kanonas)** | `[ĮRAŠYK]`, `[APRAŠYK UŽDUOTĮ]` — arba neutralu `[TEKSTAS]` / `[UŽDUOTIS]` kaip EN `[TASK]` |
| **Rekomendacija** | Vienas sprendimas visai bibliotekai: **neutralūs laukai** (`[TEKSTAS]`, `[UŽDUOTIS]`) *arba* TU veiksmažodis (`[ĮRAŠYK]`). Nemaišyti. |
| **Failai** | `index.html` `libraryPromptsLt` (visi `ĮRAŠYKITE` / `APRAŠYKITE`); EN jau neutralu — paritetas OK |

**Paieška po pataisos:** `ĮRAŠYKITE|APRAŠYKITE` → 0 atitikmenų `index.html`.

---

### P1-02 · `spėliodama` (DI giminė)

| | |
|--|--|
| **Problema** | *DI* = *dirbtinis intelektas* (vyr.) → gramatiškai dažniau *spėliodamas* |
| **Dabar** | `Be rėmo DI pildo spragas spėliodama.` |
| **Siūloma** | **`… spėliodamas.`** |
| **Alternatyva (jei personifikuojama „sistema“)** | `Be rėmo modelis pildo spragas spėliodamas.` |
| **Failai** | `index.html`; `en-html-replacements.cjs` (LT; EN: `by guessing` — OK) |

---

### P1-03 · Quiz / hero: *rolė* vs *vaidmuo*

| | |
|--|--|
| **Problema** | Toje pačioje quiz skaidrėje: *rolės* (A, C) ir *Vaidmuo* (D + schema) |
| **Kanonas** | Schema ir golden standard: **vaidmuo** |
| **Siūloma** | Quiz A/C: *rolės* → **vaidmens** / **vaidmens ir konteksto** |
| **Failai** | `index.html` quiz option A, C; EN poros atitinkamai (*role* jau vartojama — patikrinti LT→EN pair sync) |

---

### P1-04 · Entity footer kapitalizacija

| | |
|--|--|
| **Dabar** | `Promptų Anatomijos ekosistema · …` |
| **Kitur** | `Promptų anatomija` (title case tik pirmam žodžiui / brandui) |
| **Siūloma** | **`Promptų anatomijos ekosistema · Mokymai ir checkout → promptanatomy.app`** (mažoji *anatomijos*), nebent AGENTS.md kanonas reikalauja dabartinės formos — tada palikti ir pažymėti kaip **sąmoninga** |
| **Failai** | `index.html` + EN pora (EN: `Prompt Anatomy` — brand OK) |

*Pastaba:* AGENTS.md šiuo metu fiksuoja dabartinį entity footer copy — prieš keičiant suderinti su kanonu.

---

### P1-05 · PDF: `Instrukcija vartotojui`

| | |
|--|--|
| **Problema** | Auditorija — darbuotojas/vadovas; *vartotojas* skamba produkto UI, ne darbo kontekstu |
| **Dabar** | `Instrukcija vartotojui + atsakymų…` |
| **Siūloma** | **`Instrukcija komandai / vykdytojui + …`** (kaip skaidrėje 10: *instrukcija naudotojui* — ten irgi P1) |
| **Skaidrė 10** | `… su aiškia instrukcija naudotojui` → **`… instrukcija komandai`** arba **`vykdytojui`** |
| **Failai** | `docs/pamoka-1-pdf.md`; `index.html` skaidrė 10; EN: `User instructions` → `Team instructions` / `Instructions for the person doing the task` |

---

### P1-06 · EN: `7 bullet list` vs `7-bullet list`

| | |
|--|--|
| **Dabar** | Quick start: `7 bullet list`; After prompt: `7-bullet list` |
| **Siūloma** | Visur **`7-bullet list`** (arba `a list of 7 bullets`) |
| **Failai** | `en-html-replacements.cjs` (quick-start visible + `data-copy-text`) |

---

### P1-07 · EN: `check-list` → `checklist`

| | |
|--|--|
| **Dabar** | `aria-label="Copy mini check-list"` |
| **Siūloma** | **`Copy mini checklist`** |
| **Failai** | `en-html-replacements.cjs` |

---

### P1-08 · EN biblioteka: `do not change without upside`

| | |
|--|--|
| **Problema** | Neaišku / neidiomiška |
| **Dabar** | `do not change without upside.` |
| **Siūloma** | **`do not change anything that does not improve the prompt.`** arba **`only change what clearly improves the prompt.`** |
| **LT pora** | Jau geriau: `nekeisk be naudos.` — palikti; EN priartinti prie LT prasmės |
| **Failai** | `assets/prompt-library-en.js` → `lib_qualityCheck` ir `mgr_qualityCheck` |

---

### P1-09 · EN a11y: `Library: manager` / `employee` ≠ tabų *Leader* / *Individual contributor*

| | |
|--|--|
| **Dabar** | Tabai: Leader / IC; `uiText`: manager / employee |
| **Siūloma** | **`Library: leader`** / **`Library: individual contributor`** (arba trumpiau **`Library: IC`**) |
| **Failai** | `index.html` `uiText('Biblioteka: vadovas', …)` |

---

### P1-10 · EN lokalė: `Personalisation` (UK) vs likęs US tonas

| | |
|--|--|
| **Dabar** | `02 • Personalisation` |
| **Sprendimas A (US)** | `Personalization` |
| **Sprendimas B (UK)** | Palikti + dokumentuoti, kad EN = UK spelling |
| **Rekomendacija** | **US** (`Personalization`), nes meta/address CA ir bendras produktinis EN |
| **Failai** | `en-html-replacements.cjs` |

---

### P1-11 · EN: `through repeats`

| | |
|--|--|
| **Dabar** | `more stability through repeats` |
| **Siūloma** | **`more stability through iteration`** arba **`… through repetition`** |
| **Failai** | `en-html-replacements.cjs` (visible + `data-copy-text`) |

---

## 4. P2 — stilius, skolinių politika (ne blokuojantis)

Šie punktai **nėra objektyvios klaidos**. Reikia vieno produkto sprendimo ir tada — nuoseklumo.

| ID | Tema | Dabar | Variantai | Rekomendacija |
|----|------|-------|-----------|---------------|
| P2-01 | *quiz* LT | `trumpas quiz`, meta, nav | Palikti skolinį **arba** `testas` / `klausimynas` | Palikti *quiz* (trumpos UI etiketės); meta aprašuose OK |
| P2-02 | *brendo* | aria-label | *prekės ženklo* / *brendo* | Palikti *brendo* (įsitvirtinęs) arba *svetainė (prekės ženklas)* |
| P2-03 | *checkout* entity | AGENTS kanonas | — | **Palikti** (kanonas) |
| P2-04 | *executive* aria | `CEO ir COO executive rinkinys` | `vadovybės rinkinys` | Aria: **`CEO ir COO vadovybės rinkinys…`**; matomas CTA lieka `CEO rinkinys` |
| P2-05 | *Identifikuok* | biblioteka | *Įvardink* / *Nustatyk* | *Įvardink* (labiau LT) |
| P2-06 | tools-lt brand | `PROMPT ANATOMY` | `PROMPTŲ ANATOMIJA` | Suvienodinti su LT brand lockup |
| P2-07 | tools.html title | `Prompt Anatomy - AI Tools` | em dash `—` | `Prompt Anatomy — AI Tools Guide 2026` |
| P2-08 | FAQ LT≠EN | LT 3 klausimai / EN 4 leadership | Paritetas turiniui | Atskirą turinio užduotį (ne gramatika) |
| P2-09 | HTML komentaras | `atnaujinkite PNG` | `atnaujink` | Kosmetika (dev-only) |
| P2-10 | PDF URL footer | `.app` nuoroda | `.cloud` pamoka | Produktinis (ne gramatika) |

---

## 5. Kas patikrinta ir OK

- Hero TU tonas (`Pradėk`, `Atsisiųsk`, `Paimk`) — atitinka golden standard.
- Schema žingsniai, patikros šablonai, dauguma skaidrių lead’ų — skyryba su `—` / `–` nuosekli.
- EN meta (`Prompt Anatomy — for work and leadership`) — gramatiškai tvarkinga.
- EN `lib_deescalateMessage` / dauguma library promptų — aiškūs, be akivaizdžių typos.
- EN PDF MD — be rastų rašybos klaidų šioje peržiūroje.
- `404.html` body — trumpas, taisyklingas LT (išskyrus sąmoningą *brendas*).

---

## 6. Sisteminis pataisymų backlogas (vykdymo eilė)

### Bangą A — P0 (viena PR / commit)

1. `minutes` → `minutės` (visos LT vietos).
2. `Viso iki` → `Iš viso iki`.
3. `Dabartinė žinutės juodraštis` → `Dabartinis…` (lib + mgr).
4. `kitas aiškus kitas` → `kitas aiškus`.
5. De-escalate `–` → `—`.
6. PDF MD: `įrašote` / `sutarėte` → TU; rebuild PDF.

**Patikra:** `rg "minutes|Viso iki|Dabartinė žinutės|kitas aiškus kitas|ĮRAŠYKITE"` (P0 daliai be placeholder bangos).

### Bangą B — P1 greiti EN/LT

1. `7 bullet` → `7-bullet`.
2. `check-list` → `checklist`.
3. `without upside` → idiominė frazė.
4. `uiText` manager/employee → leader/IC.
5. `Personalisation` → pasirinkta lokalė.
6. `through repeats` → `iteration` / `repetition`.
7. `spėliodama` → `spėliodamas`.
8. Quiz *rolė* → *vaidmuo* (A/C).

### Bangą C — P1 placeholder politika

1. Nuspręsti: TU veiksmažodis **ar** neutralus `[TEKSTAS]`.
2. Masinė paieška/keitimas `libraryPromptsLt`.
3. `npm run verify` (library keys).

### Bangą D — P2 (nebūtina)

Skolinių politika, tools brand, FAQ paritetas — atskiros užduotys.

---

## 7. Acceptance checklist (po pataisymų)

- [ ] Nėra `minutes` LT matomame tekste (`index.html` be EN porų).
- [ ] Nėra `Viso iki` / `Dabartinė žinutės juodraštis` / `kitas aiškus kitas`.
- [ ] De-escalate naudoja `—`.
- [ ] Kiekviena pakeista LT eilutė turi atnaujintą porą `en-html-replacements.cjs` (jei pora egzistuoja).
- [ ] Bibliotekos keitimai abiejose kalbose, jei keitėsi prasmė.
- [ ] PDF: local MD → build → atnaujinti binary.
- [ ] `npm run build` be `[build] EN pair … missing`.
- [ ] `npm run verify` žalia.

---

## 8. Greita „prieš → po“ lentelė (kopijuoti į PR)

| ID | Prieš | Po | Failas |
|----|-------|-----|--------|
| P0-01 | Pradėk per 2 minutes | Pradėk per 2 minutės | index.html + en-html LT |
| P0-01b | per kelias minutes | per kelias minutės | index.html + en-html LT |
| P0-02 | Viso iki ≈ 5 val. | Iš viso iki ≈ 5 val. | index.html + en-html LT |
| P0-03 | Dabartinė žinutės juodraštis | Dabartinis žinutės juodraštis | libraryPromptsLt ×2 |
| P0-04 | kitas aiškus kitas žingsnis | kitas aiškus žingsnis | index.html + en-html LT |
| P0-05a | Ką įrašote | Ką įrašai | pamoka-1-pdf.md |
| P0-05b | ką sutarėte | ką sutarei | pamoka-1-pdf.md |
| P0-06 | faktų – parašyk | faktų — parašyk | libraryPromptsLt ×2 |
| P1-06 | 7 bullet list | 7-bullet list | en-html-replacements.cjs |
| P1-07 | check-list | checklist | en-html-replacements.cjs |
| P1-08 | without upside | only change what clearly improves the prompt | prompt-library-en.js ×2 |
| P1-09 | Library: manager/employee | Library: leader / individual contributor | index.html uiText |
| P1-02 | spėliodama | spėliodamas | index.html + en-html LT |

---

## 9. Ribos ir kas neįeina

- Neperrašytas visas turinys dėl „skambesio“.
- Nevertinta vizuali tipografija (atskiras `DS_TYPOGRAPHY_AUDIT`).
- Neblokuota FAQ LT≠EN turinio strategija (P2-08) — tai turinio, ne gramatikos, sprendimas.
- `site/**` — build artefaktas; taisyti šaltinius, ne rankiniu būdu `site/`.

---

## 10. Kitas žingsnis

Jei patvirtinsi **Bangą A** (ar A+B), galima tą pačią sesiją įrašyti pataisymus į šaltinius, paleisti `npm run build` + `npm run verify`, o PDF — rebuild tik jei redaguosi MD.
