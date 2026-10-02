// Šešios scenos. Hero „prieš / po“ yra HTML #intro, ne piešinys. 60 min sprintas prasideda nuo meeting.
// Spalvos — styles/tokens.css per scripts/illustration-colors.cjs. Jokių hex čia.

export const SCENES = [
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
        { state: 'todo', text: 'Patikrinti ne DI: skaičių sutartyje' }
      ],
      alt: 'Patikros lapas: rizika — data nepatikrinta; tinka — laikas ir tikslas; patikrinti ne DI — skaičių sutartyje.'
    },
    en: {
      kicker: 'Check before sending',
      rows: [
        { state: 'risk', text: 'Risk: the date is unchecked' },
        { state: 'ok', text: 'Fits: time and goal' },
        { state: 'todo', text: 'Check outside AI: the figure in the contract' }
      ],
      alt: 'Check sheet: risk — the date is unchecked; fits — time and goal; check outside AI — the figure in the contract.'
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
        { time: '0–10', label: 'Sutark, ką palikti', span: 1 },
        { time: '10–40', label: 'Padaryk vieną užduotį', span: 3 },
        { time: '40–60', label: 'Sprendimas: kas lieka', span: 2 }
      ],
      alt: '60 min sprinto laiko juosta: 0–10 min sutark, ką palikti; 10–40 min padaryk vieną užduotį; 40–60 min sprendimas, kas lieka.'
    },
    en: {
      kicker: '60 min sprint',
      segments: [
        { time: '0–10', label: 'Agree what stays', span: 1 },
        { time: '10–40', label: 'Do one task', span: 3 },
        { time: '40–60', label: 'Decision: what stays', span: 2 }
      ],
      alt: '60 min sprint timeline: 0–10 min agree what stays; 10–40 min do one task; 40–60 min decision on what stays.'
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
        { name: 'Bazinis', text: 'Palik vieną užduotį.' },
        { name: 'Vidutinis', text: 'Palik vieną užduotį ir vieną savininką.' },
        { name: 'Pažengęs', text: 'Palik vieną užduotį, vieną savininką ir vieną sprendimą 60 min pabaigoje.' }
      ],
      alt: 'Ta pati žinutė trimis lygiais: bazinis — palik vieną užduotį; vidutinis — ir vieną savininką; pažengęs — ir vieną sprendimą 60 min pabaigoje.'
    },
    en: {
      kicker: 'The same message',
      levels: [
        { name: 'Basic', text: 'Keep one task.' },
        { name: 'Mid', text: 'Keep one task and one owner.' },
        { name: 'Advanced', text: 'Keep one task, one owner, and one decision at the end of the 60 min.' }
      ],
      alt: 'The same message at three levels: basic — keep one task; mid — and one owner; advanced — and one decision at the end of the 60 min.'
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
      change: 'Pirmas pakeitimas: pirmą sakinį skirk skaitytojui',
      alt: 'Įvertinimo kortelė: aišku; stipru — vienas tikslas; pirmas pakeitimas — pirmą sakinį skirk skaitytojui.'
    },
    en: {
      kicker: 'Review',
      score: 'Clear',
      strong: 'Strong: one goal',
      change: 'First change: aim the first sentence at the reader',
      alt: 'Review card: clear; strong — one goal; first change — aim the first sentence at the reader.'
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
        { k: 'Sprendimas', v: 'Palik vieną užduotį ir vieną savininką.' },
        { k: 'Kitas žingsnis', v: 'Iki pabaigos pasakyk, kas lieka.' }
      ],
      alt: 'Laiško langas: problema — šis sprintas neturi vieno tikslo; sprendimas — palik vieną užduotį ir vieną savininką; kitas žingsnis — iki pabaigos pasakyk, kas lieka.'
    },
    en: {
      kicker: 'Letter to the team',
      subject: 'Sprint: one goal',
      rows: [
        { k: 'Problem', v: 'This sprint has no single goal.' },
        { k: 'Fix', v: 'Keep one task and one owner.' },
        { k: 'Next step', v: 'By the end, say what stays.' }
      ],
      alt: 'Letter window: problem — this sprint has no single goal; fix — keep one task and one owner; next step — by the end, say what stays.'
    }
  }
];
