# Darbų planas — Promptų anatomija (64_APK)

Vienas kanonas: kas uždaroma čia, laikom uždaryta projekte. Lean repo principai: [SETUP.md](SETUP.md) (**„Lean repo“**), release: tas pats failas (**„Prieš push į `main`“**) + [AGENTS.md](AGENTS.md) §5.

---

## Fazė 0 — Repo higiena ir paprastumas *(uždaryta šiame PR / iteracijoje)*

- [x] PDF kanonai: LT `assets/www.promptanatomy.app.pdf` (`docs/pamoka-1-pdf.md`), EN `assets/www.promptanatomy.app-en.pdf` (`docs/pamoka-1-pdf-en.md`), build per `scripts/build-pdf.*`.
- [x] Pašalintas dublikatas `assets/promptu-anatomija-pamoka-1.pdf`.
- [x] Dokumentacija: lean + release checklist [SETUP.md](SETUP.md); įrašyta [CHANGELOG.md](CHANGELOG.md); [README.md](README.md) rodo į planą ir release.

---

## Fazė 1 — Turinys ir biblioteka (produktas)

Tikslas: aiškūs rezultatai kiekvienam mini-promptui, „TU“ tonas, be pertekliaus.

- [x] Perbėgti visas bibliotekos kategorijas **Darbuotojas** ir **Vadovas**: ar kiekvienas blokas baigiasi konkrečiu išėjimu (formatas / žingsniai / kriterijai).
- [x] Ten, kur vadovui reikia kito kampo — atskira mikrokopija (ne tik `mgr_*` kopija), kad tabas būtų prasmingas. *(UI rodytuose blokuose likę identiški tik tie raktai, kurie bibliotekoje nerodomi — pvz. `thoughtChain` / `promptSeq` / `instruct` lieka tik JS rezerve.)*
- [x] Po reikšmingų turinio pakeitimų: įrašas [CHANGELOG.md](CHANGELOG.md) (Unreleased); prieš commit — neprivaloma peržūra pagal `@.cursor/skills/q-a-agent/SKILL.md`.

---

## Fazė 2 — Prieinamumas ir mobilus UX

Tikslas: pilnas klaviatūros kelias, aiškūs fokusai, patogu telefone.

- [x] Nav + „Turinys“ (`details`) + bibliotekos tabai — tab order ir Escape elgsena *(esama: `Escape` ant `#slide-outline`, `:focus-visible`, bibliotekos tabų `aria-selected`)*.
- [x] `aria-live` po kopijavimo ir tab perjungimo — ar pranešimai ne triukšmingi *(esama: `#a11y-status`, bibliotekos `aria-live` ant panelės)*.
- [x] Mobile: sticky nav, `details` bibliotekoje, mygtukų plotis, teksto lūžiai *(lean patikra: papildomų pataisymų šioje iteracijoje nereikėjo)*.

---

## Fazė 3 — Release ir CI pasitikėjimas

Tikslas: prieš kiekvieną `main` push — trumpas, kartojamas ritualas.

- [x] Prieš push: [SETUP.md](SETUP.md) checklist **„Prieš push į `main`“** (PDF šį kartą nekeitėm; CTA/biblioteka/hash/404 — patvirtink lokaliai; Actions — žr. repo CI).
- [x] Jei keičiasi tik MD/PDF — visada commitinti abu + atnaujintas `assets/www.promptanatomy.app.pdf` *(procesas nepakitęs; ši iteracija — tik `index.html` + docs)*.

---

## Backlog (be datos — kai bus prioritetas)

- [ ] **„Turinys“ (TOC)**: grupavimas arba aiškesni antraštės lygiai „ką daryti pirmiausia“.
- [ ] **Vienas šaltinis bibliotekai** (Markdown / JSON + build): tik jei komanda nuspręs, kad `libraryPrompts` maintenance per sunkus — dabar kanonas lieka JS pagal [AGENTS.md](AGENTS.md) §4.1.
