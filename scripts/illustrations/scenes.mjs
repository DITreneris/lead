// Septynios scenos, viena 60 min sprinto istorija. Tekstas LT ir EN iš vieno šaltinio.
// Spalvos — styles/tokens.css per scripts/illustration-colors.cjs. Jokių hex čia.

export const SCENES = [
  {
    slug: 'intro',
    kind: 'intro',
    width: 800,
    height: 1120,
    lt: {
      title: ['Užklausa', 'Rezultatas'],
      blocks: ['Vaidmuo', 'Kontekstas', 'Mąstymas', 'Rezultatas', 'Patikra'],
      resultTitle: 'Sprinto planas',
      rows: ['0–10 min · Sutariam, ką paliekam', '10–40 min · Darom vieną gabalą', '40–60 min · Sprendimas: kas lieka'],
      alt: 'Penkių dalių užklausa — vaidmuo, kontekstas, mąstymas, rezultatas, patikra — virsta sprinto planu: 0–10 min sutariam, ką paliekam; 10–40 min darom vieną gabalą; 40–60 min sprendimas, kas lieka.'
    },
    en: {
      title: ['Prompt', 'Result'],
      blocks: ['Role', 'Context', 'Reasoning', 'Output', 'Check'],
      resultTitle: 'Sprint plan',
      rows: ['0–10 min · Agree what stays', '10–40 min · Do one piece', '40–60 min · Decision: what stays'],
      alt: 'A five-part prompt — role, context, reasoning, output, check — becomes a sprint plan: 0–10 min agree what stays; 10–40 min do one piece; 40–60 min decision on what stays.'
    }
  },
  {
    slug: 'check',
    kind: 'check',
    width: 800,
    height: 900,
    lt: {
      kicker: 'Patikra prieš siuntimą',
      rows: [
        { state: 'risk', text: 'Rizika: data nepatikrinta' },
        { state: 'ok', text: 'Tinka: laikas ir tikslas' },
        { state: 'todo', text: 'Patikrinti: kas priima sprendimą' }
      ],
      alt: 'Patikros lapas: rizika — data nepatikrinta; tinka — laikas ir tikslas; patikrinti — kas priima sprendimą.'
    },
    en: {
      kicker: 'Check before sending',
      rows: [
        { state: 'risk', text: 'Risk: the date is unchecked' },
        { state: 'ok', text: 'Fits: time and goal' },
        { state: 'todo', text: 'Check: who decides' }
      ],
      alt: 'Check sheet: risk — the date is unchecked; fits — time and goal; check — who decides.'
    }
  },
  {
    slug: 'meeting',
    kind: 'timeline',
    width: 800,
    height: 900,
    lt: {
      kicker: '60 min sprintas',
      segments: [
        { time: '0–10', label: 'Sutariam, ką paliekam', span: 1 },
        { time: '10–40', label: 'Darom vieną gabalą', span: 3 },
        { time: '40–60', label: 'Sprendimas: kas lieka', span: 2, accent: true }
      ],
      alt: '60 min sprinto laiko juosta: 0–10 min sutariam, ką paliekam; 10–40 min darom vieną gabalą; 40–60 min sprendimas, kas lieka.'
    },
    en: {
      kicker: '60 min sprint',
      segments: [
        { time: '0–10', label: 'Agree what stays', span: 1 },
        { time: '10–40', label: 'Do one piece', span: 3 },
        { time: '40–60', label: 'Decision: what stays', span: 2, accent: true }
      ],
      alt: '60 min sprint timeline: 0–10 min agree what stays; 10–40 min do one piece; 40–60 min decision on what stays.'
    }
  },
  {
    slug: 'levels',
    kind: 'levels',
    width: 800,
    height: 900,
    lt: {
      kicker: 'Ta pati žinutė',
      levels: [
        { name: 'Bazinis', text: 'Paliekam vieną užduotį.' },
        { name: 'Vidutinis', text: 'Paliekam vieną užduotį ir vieną savininką.' },
        { name: 'Pažengęs', text: 'Paliekam vieną užduotį, vieną savininką ir vieną sprendimą 60 min pabaigoje.' }
      ],
      alt: 'Ta pati žinutė trimis lygiais: bazinis — paliekam vieną užduotį; vidutinis — ir vieną savininką; pažengęs — ir vieną sprendimą 60 min pabaigoje.'
    },
    en: {
      kicker: 'The same message',
      levels: [
        { name: 'Basic', text: 'We keep one task.' },
        { name: 'Mid', text: 'We keep one task and one owner.' },
        { name: 'Advanced', text: 'We keep one task, one owner, and one decision at the end of the 60 min.' }
      ],
      alt: 'The same message at three levels: basic — we keep one task; mid — and one owner; advanced — and one decision at the end of the 60 min.'
    }
  },
  {
    slug: 'feedback',
    kind: 'score',
    width: 800,
    height: 900,
    lt: {
      kicker: 'Įvertinimas',
      score: 'Aišku',
      strong: 'Stipru: vienas tikslas',
      change: 'Pirmas pakeitimas: įrašyk, kas priima sprendimą',
      alt: 'Įvertinimo kortelė: aišku; stipru — vienas tikslas; pirmas pakeitimas — įrašyk, kas priima sprendimą.'
    },
    en: {
      kicker: 'Review',
      score: 'Clear',
      strong: 'Strong: one goal',
      change: 'First change: write who decides',
      alt: 'Review card: clear; strong — one goal; first change — write who decides.'
    }
  },
  {
    slug: 'team',
    kind: 'task',
    width: 800,
    height: 900,
    lt: {
      kicker: 'Užduotis komandai',
      task: 'Įrašyk vieną riziką į sprinto planą.',
      owner: 'Savininkas',
      initial: 'S',
      due: 'Iki rytojaus',
      where: 'Sprinto lapas',
      alt: 'Užduoties kortelė: įrašyk vieną riziką į sprinto planą; savininkas; iki rytojaus; sprinto lapas.'
    },
    en: {
      kicker: 'Task for the team',
      task: 'Write one risk into the sprint plan.',
      owner: 'Owner',
      initial: 'O',
      due: 'By tomorrow',
      where: 'Sprint sheet',
      alt: 'Task card: write one risk into the sprint plan; owner; by tomorrow; sprint sheet.'
    }
  },
  {
    slug: 'letter',
    kind: 'letter',
    width: 800,
    height: 900,
    lt: {
      kicker: 'Laiškas komandai',
      subject: 'Sprintas: vienas tikslas',
      rows: [
        { k: 'Problema', v: 'Šis sprintas neturi vieno tikslo.' },
        { k: 'Sprendimas', v: 'Paliekam vieną užduotį ir vieną savininką.' },
        { k: 'Kitas žingsnis', v: 'Iki pabaigos pasakyk, kas lieka.' }
      ],
      alt: 'Laiško langas: problema — šis sprintas neturi vieno tikslo; sprendimas — paliekam vieną užduotį ir vieną savininką; kitas žingsnis — iki pabaigos pasakyk, kas lieka.'
    },
    en: {
      kicker: 'Letter to the team',
      subject: 'Sprint: one goal',
      rows: [
        { k: 'Problem', v: 'This sprint has no single goal.' },
        { k: 'Fix', v: 'We keep one task and one owner.' },
        { k: 'Next step', v: 'By the end, say what stays.' }
      ],
      alt: 'Letter window: problem — this sprint has no single goal; fix — we keep one task and one owner; next step — by the end, say what stays.'
    }
  }
];
