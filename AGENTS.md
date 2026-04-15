# AGENTS — Promptų anatomija (64_APK)

Trumpi vaidmenys, kuriuos galima įklijuoti į Cursor Composer arba naudoti kaip kontekstą.

## Orkestratorius (darbo eiga)

Viena eiga vietoj atskiro „router“ ir „orchestrator“ serviso: klasifikuok užduotį, prijunk kontekstą, paleisk vieną pagrindinį specialistą, prireikus — Q_A.

1. **Įvestis:** ką keiti (pvz. tik `index.html`, tik `docs/pamoka-1-pdf.md`, ar abi dalys)? Koks tikslas (turinys, UI, PDF, schema / duomenų peržūra)?
2. **Maršrutas:**
   - **Turinys (LT)** — žemiau „Turinio agentas“; neardyti JS ir skaidrių be reikalo.
   - **Skaidrės / CSS / nav / biblioteka** — „Frontend / skaidrės“ + „Biblioteka ir vadovo kelias“.
   - **PDF** — „PDF sinchronas“ (MD → build → commit PDF).
   - **Schemos, duomenų tikrinimas, planas prieš kodą** — Cursor skillas: Composer įkelti `@.cursor/skills/data-agent/SKILL.md` (ir pagal poreikį `@.cursor/skills/data-agent/reference.md`).
3. **Vykdymas:** į chat įtraukti aktualius failus (`@index.html`, `@docs/pamoka-1-pdf.md`, …) pagal maršrutą.
4. **Q_A (neprivaloma):** prieš commit ar po rizikingų pakeitimų — `@.cursor/skills/q-a-agent/SKILL.md`.
5. **Release:** žemiau skyriuje „Release“.

## Golden standard (LT)

- **Tonas**: visur „TU“ (profesionaliai, trumpai, be „mokyklos“ tono).
- **Tikslas**: padėti **įmonės darbuotojui** ir **vadovui** greitai pritaikyti sistemą darbe.
- **Terminija**: „DI“, „užklausa (promptas)“ (pirmą kartą gali būti su paaiškinimu), „šablonas“, „patikra“, „skaidrė“, „biblioteka“.
- **Microcopy**: vienas sakinys = viena mintis; CTA = vienas veiksmas; veiksmažodžiai vietoj abstrakcijų.
- **Ilgis**: jei įmanoma, sakinys iki ~14–18 žodžių; perteklių skaidyti į 2 sakinius arba į sąrašą.
- **Formatas**: kabutės „…“, intervalai su brūkšniu/en dash (pvz. 10–30 min), didžiosios raidės tik kai reikia (ne šaukimui).
- **Aiškumas**: vietoj „kažkas“/„tinka“/„geriau“ rašyti konkretų kriterijų ar rezultatą (ką gausi, ką darysi).
- **Red flags**: mišrus „TU/JŪS“, ilgi sakiniai su 3+ šalutiniais, dviprasmiai pažadai („sutaupysi garantuotai“), kaltinanti kalba, perteklinis žargonas.

## 1. Turinio agentas (LT)

- Redaguoja viešą tekstą `index.html`: antraštės, lead, quiz, CTA, bibliotekos įvadas.
- Tonas: profesionalus, aiškus, **įmonės darbuotojui / vadovui**; vengti perteklinės mokyklos terminologijos, nebent sąmoningai pedagoginiame kontekste.
- Nekeisti JS logikos be reikalo; neardyti skaidrių struktūros be priežasties.

## 2. Frontend / skaidrės

- Viena byla `index.html`: CSS `:root` kintamieji, navigacija, responsive taisyklių laikymasis.
- Naujos skaidrės = nauji `section` + du atitinkami `nav-item` (šonas ir mobilusis).

## 3. PDF sinchronas

- Šaltinis: `docs/pamoka-1-pdf.md`. Po pakeitimo: `scripts/build-pdf.ps1` arba `scripts/build-pdf.sh`, tada commitinti `assets/www.promptanatomy.app.pdf`.
- Nuorodos puslapyje: `assets/www.promptanatomy.app.pdf`.

## 4. Biblioteka ir vadovo kelias

- Darbuotojo ir vadovo rinkiniai: `libraryPrompts` + vadovo raktai (`mgr_*`), tabų būsena `syncLibraryDom`.
- Naujas mini-promptas: pridėti `pre` + mygtuką su `data-emp-key` / `data-mgr-key` ir atitinkamus tekstus JS.

### 4.1. Teksto šaltinis (vienas kanonas, be „drift“)

- **Kanonas kopijuojamam tekstui:** objektas `libraryPrompts` skripto bloke `index.html`. Tušti `pre.library-prompt-block` užpildo `syncLibraryDom()` paleidus puslapį ir perjungus tabą Darbuotojas / Vadovas.
- **Naujas ar keičiamas mini-promptas:** visada atnaujinti `libraryPrompts` (ir skirtingus `mgr_*`, jei vadovui reikia kitokio teksto). Ant `pre` ir „Kopijuoti“ mygtuko palikti tuos pačius `data-emp-key` / `data-mgr-key`.
- **Ko vengti:** rankiniu būdu pildyti tik `pre` turinį HTML be atitikmens JS — tada kopijuojamas tekstas gali nesutapti su tuo, ką mato vartotojas.
- **Ilgesnė alternatyva (backlog):** vienas šaltinis (Markdown / JSON) + build žingsnis, jei komanda nuspręs priimti minimalų įrankių sluoksnį.

## 5. Release

- Prieš push į `main`: ar PDF atitinka MD (jei keitėsi MD); ar veikia nuorodos ir GitHub Pages deploy.
