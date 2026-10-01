// Kepa septynias iliustracijas LT ir EN iš scripts/illustrations/scenes.mjs.
// satori → SVG → resvg → PNG → sharp → WebP + PNG. Paleidžiama atskirai:
//   npm run build:illustrations
// npm run build jų neperkepa. Išvestis commitinama į assets/illustrations/.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { createRequire } from 'node:module';
import { SCENES } from './illustrations/scenes.mjs';

const require = createRequire(import.meta.url);
const { getIllustrationColors } = require('./illustration-colors.cjs');
const C = getIllustrationColors();

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FONT_DIR = path.join(ROOT, 'assets', 'fonts');
const OUT_DIR = path.join(ROOT, 'assets', 'illustrations');
const ONLY = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const PNG_ONLY = process.argv.includes('--png-only');

const fonts = [
  { name: 'Space Grotesk', weight: 700, style: 'normal', data: fs.readFileSync(path.join(FONT_DIR, 'SpaceGrotesk-Bold.ttf')) },
  { name: 'Space Grotesk', weight: 500, style: 'normal', data: fs.readFileSync(path.join(FONT_DIR, 'SpaceGrotesk-Medium.ttf')) },
  { name: 'Inter', weight: 400, style: 'normal', data: fs.readFileSync(path.join(FONT_DIR, 'Inter-Regular.ttf')) },
  { name: 'Inter', weight: 600, style: 'normal', data: fs.readFileSync(path.join(FONT_DIR, 'Inter-SemiBold.ttf')) }
];

const DISPLAY = 'Space Grotesk';
const BODY = 'Inter';

function h(type, style, ...children) {
  const kids = children.flat().filter((c) => c !== null && c !== undefined && c !== false);
  const props = { style: { display: 'flex', ...style } };
  if (kids.length) props.children = kids.length === 1 ? kids[0] : kids;
  return { type, props };
}
const text = (s, style) => ({ type: 'span', props: { style: { display: 'block', ...style }, children: s } });

// Bendri gabalai -----------------------------------------------------------

function stage(width, height, ...children) {
  return h(
    'div',
    {
      width,
      height,
      flexDirection: 'column',
      backgroundColor: C.navy,
      backgroundImage: `radial-gradient(circle at 82% 14%, ${C.yellowSubtle}, transparent 46%), radial-gradient(circle at 10% 92%, ${C.navyWash}, transparent 55%)`,
      padding: 48,
      fontFamily: BODY,
      color: C.text
    },
    ...children
  );
}

function kicker(s) {
  return text(s, {
    fontFamily: DISPLAY,
    fontWeight: 700,
    fontSize: 38,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: C.yellow
  });
}

function card(style, ...children) {
  return h(
    'div',
    {
      flexDirection: 'column',
      backgroundColor: C.surface,
      border: `2px solid ${C.line}`,
      borderRadius: 36,
      boxShadow: '0 30px 70px rgba(0,0,0,0.45)',
      ...style
    },
    ...children
  );
}

function lightCard(style, ...children) {
  return h(
    'div',
    {
      flexDirection: 'column',
      backgroundColor: C.cardLight,
      color: C.ink,
      borderRadius: 32,
      boxShadow: '0 30px 70px rgba(0,0,0,0.45)',
      ...style
    },
    ...children
  );
}

function windowDots() {
  const dot = (bg) => h('div', { width: 18, height: 18, borderRadius: 9, backgroundColor: bg });
  return h('div', { gap: 12 }, dot(C.red), dot(C.yellow), dot(C.teal));
}

function mark(kind) {
  const base = { width: 54, height: 54, borderRadius: 27, alignItems: 'center', justifyContent: 'center', flexShrink: 0 };
  if (kind === 'ok') {
    return h(
      'div',
      { ...base, backgroundColor: C.yellow },
      {
        type: 'svg',
        props: {
          width: 30,
          height: 30,
          viewBox: '0 0 24 24',
          children: { type: 'path', props: { d: 'M20 6 9 17l-5-5', fill: 'none', stroke: C.ink, strokeWidth: 3.2, strokeLinecap: 'round', strokeLinejoin: 'round' } }
        }
      }
    );
  }
  if (kind === 'risk') {
    return h('div', { ...base, backgroundColor: C.red }, text('!', { fontFamily: DISPLAY, fontWeight: 700, fontSize: 38, color: C.onAccent, lineHeight: 1 }));
  }
  return h('div', { ...base, border: `3px solid ${C.yellow}` });
}

// Scenos --------------------------------------------------------------------

function sceneIntro(scene, t) {
  const block = (label, i) =>
    h(
      'div',
      {
        alignItems: 'center',
        gap: 16,
        padding: '14px 22px',
        borderRadius: 18,
        backgroundColor: i === 4 ? C.yellowEmphasis : C.card,
        border: `2px solid ${i === 4 ? C.yellowStrong : C.line}`
      },
      text(String(i + 1).padStart(2, '0'), { fontFamily: DISPLAY, fontWeight: 700, fontSize: 38, color: C.yellow, width: 56 }),
      text(label, { fontFamily: DISPLAY, fontWeight: 500, fontSize: 38, color: C.text })
    );

  const row = (s, i) =>
    h(
      'div',
      { alignItems: 'flex-start', gap: 16, padding: '14px 0', borderTop: i === 0 ? 'none' : `2px solid ${C.inkFaint}` },
      h('div', { width: 14, height: 14, borderRadius: 7, backgroundColor: i === 2 ? C.yellow : C.navy2, flexShrink: 0, marginTop: 16 }),
      text(s, { fontSize: 38, fontWeight: 600, color: C.ink, lineHeight: 1.3 })
    );

  const arrow = () => ({
    type: 'svg',
    props: {
      width: 48,
      height: 32,
      viewBox: '0 0 48 32',
      children: { type: 'path', props: { d: 'M2 16 H40 M28 4 L44 16 L28 28', fill: 'none', stroke: C.yellow, strokeWidth: 5, strokeLinecap: 'round', strokeLinejoin: 'round' } }
    }
  });

  return stage(
    scene.width,
    scene.height,
    h('div', { alignItems: 'center', gap: 14 }, kicker(t.title[0]), arrow(), kicker(t.title[1])),
    h('div', { flexDirection: 'column', gap: 12, marginTop: 28 }, ...t.blocks.map(block)),
    lightCard(
      { width: '100%', padding: '28px 32px 24px', marginTop: 28 },
      h(
        'div',
        { alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
        text(t.resultTitle, { fontFamily: DISPLAY, fontWeight: 700, fontSize: 40, color: C.ink }),
        h('div', { padding: '8px 16px', borderRadius: 999, backgroundColor: C.yellow }, text('60 min', { fontFamily: DISPLAY, fontWeight: 700, fontSize: 38, color: C.ink }))
      ),
      h('div', { flexDirection: 'column' }, ...t.rows.map(row))
    )
  );
}

function sceneCheck(scene, t) {
  const row = (r, i) =>
    h(
      'div',
      { alignItems: 'center', gap: 28, padding: '30px 0', borderTop: i === 0 ? 'none' : `2px solid ${C.inkFaint}` },
      mark(r.state),
      text(r.text, { fontSize: 38, fontWeight: 600, color: C.ink, lineHeight: 1.25, flex: 1 })
    );
  return stage(
    scene.width,
    scene.height,
    kicker(t.kicker),
    h(
      'div',
      { flex: 1, alignItems: 'center', marginTop: 40 },
      lightCard({ width: '100%', padding: '36px 56px 30px' }, h('div', { flexDirection: 'column' }, ...t.rows.map(row)))
    )
  );
}

function sceneTimeline(scene, t) {
  // Trys eilutės, viena per segmentą. Laikas kairėje, juosta dešinėje. Paskutinė eilutė geltona.
  const row = (s, i) =>
    h(
      'div',
      {
        alignItems: 'center',
        gap: 32,
        padding: '22px 24px',
        borderRadius: 26,
        backgroundColor: s.accent ? C.yellow : C.card,
        border: `2px solid ${s.accent ? C.yellow : C.line}`
      },
      text(s.time, { fontFamily: DISPLAY, fontWeight: 700, fontSize: 38, color: s.accent ? C.ink : C.text, lineHeight: 1, width: 168 }),
      h(
        'div',
        { flexDirection: 'column', gap: 14, flex: 1 },
        text(s.label, { fontSize: 38, fontWeight: 600, color: s.accent ? C.ink : C.text, lineHeight: 1.2 }),
        h('div', { height: 12, borderRadius: 6, width: `${Math.round((s.span / 6) * 100)}%`, backgroundColor: s.accent ? C.inkMid : C.navy2 })
      )
    );
  return stage(
    scene.width,
    scene.height,
    kicker(t.kicker),
    h('div', { flex: 1, flexDirection: 'column', justifyContent: 'center', gap: 24, marginTop: 36 }, ...t.segments.map(row))
  );
}

function sceneLevels(scene, t) {
  const lvl = (l, i) =>
    h(
      'div',
      {
        flexDirection: 'column',
        gap: 12,
        padding: '22px 28px',
        marginLeft: i * 20,
        marginRight: (2 - i) * 20,
        borderRadius: 28,
        backgroundColor: i === 2 ? C.cardLight : C.card,
        border: `2px solid ${i === 2 ? 'transparent' : C.line}`,
        boxShadow: i === 2 ? '0 30px 70px rgba(0,0,0,0.45)' : 'none'
      },
      text(l.name, { fontFamily: DISPLAY, fontWeight: 700, fontSize: 38, letterSpacing: 2, textTransform: 'uppercase', color: i === 2 ? C.navy2 : C.yellow }),
      text(l.text, { fontSize: 38, fontWeight: i === 2 ? 600 : 400, color: i === 2 ? C.ink : C.text, lineHeight: 1.3 })
    );
  return stage(scene.width, scene.height, kicker(t.kicker), h('div', { flex: 1, flexDirection: 'column', justifyContent: 'center', gap: 22, marginTop: 40 }, ...t.levels.map(lvl)));
}

function sceneScore(scene, t) {
  return stage(
    scene.width,
    scene.height,
    kicker(t.kicker),
    h(
      'div',
      { flex: 1, alignItems: 'center', marginTop: 40 },
      lightCard(
        { width: '100%', padding: '56px 56px 52px', gap: 36 },
        h(
          'div',
          { alignItems: 'center', gap: 28 },
          h('div', { width: 120, height: 120, borderRadius: 60, backgroundColor: C.yellow, alignItems: 'center', justifyContent: 'center' }, {
            type: 'svg',
            props: { width: 64, height: 64, viewBox: '0 0 24 24', children: { type: 'path', props: { d: 'M20 6 9 17l-5-5', fill: 'none', stroke: C.ink, strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round' } } }
          }),
          text(t.score, { fontFamily: DISPLAY, fontWeight: 700, fontSize: 92, color: C.ink, lineHeight: 1 })
        ),
        h('div', { height: 2, backgroundColor: C.inkFaint }),
        h(
          'div',
          { alignItems: 'center', gap: 22 },
          h('div', { width: 16, height: 16, borderRadius: 8, backgroundColor: C.teal, flexShrink: 0 }),
          text(t.strong, { fontSize: 38, fontWeight: 600, color: C.ink, lineHeight: 1.3 })
        ),
        h(
          'div',
          { alignItems: 'flex-start', gap: 22, padding: '24px 28px', borderRadius: 22, backgroundColor: C.yellowGlow, border: `2px solid ${C.yellow}` },
          h('div', { width: 16, height: 16, borderRadius: 8, backgroundColor: C.yellow, flexShrink: 0, marginTop: 14 }),
          text(t.change, { fontSize: 38, fontWeight: 600, color: C.ink, lineHeight: 1.35 })
        )
      )
    )
  );
}

function sceneTask(scene, t) {
  return stage(
    scene.width,
    scene.height,
    kicker(t.kicker),
    h(
      'div',
      { flex: 1, alignItems: 'center', marginTop: 40 },
      lightCard(
        { width: '100%', padding: '52px 56px', gap: 40 },
        h(
          'div',
          { alignItems: 'center', gap: 24 },
          h('div', { width: 28, height: 28, borderRadius: 8, border: `3px solid ${C.navy2}`, flexShrink: 0 }),
          text(t.task, { fontFamily: DISPLAY, fontWeight: 700, fontSize: 46, color: C.ink, lineHeight: 1.2 })
        ),
        h('div', { height: 2, backgroundColor: C.inkFaint }),
        h(
          'div',
          { alignItems: 'center', gap: 20, flexWrap: 'wrap' },
          h('div', { width: 64, height: 64, borderRadius: 32, backgroundColor: C.navy2, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }, text(t.initial, { fontFamily: DISPLAY, fontWeight: 700, fontSize: 38, color: C.yellow })),
          text(t.owner, { fontSize: 38, fontWeight: 600, color: C.ink }),
          h('div', { padding: '8px 16px', borderRadius: 999, backgroundColor: C.yellow }, text(t.due, { fontFamily: DISPLAY, fontWeight: 700, fontSize: 38, color: C.ink })),
          text(t.where, { fontSize: 38, color: C.inkMuted })
        )
      )
    )
  );
}

function sceneLetter(scene, t) {
  const row = (r) =>
    h(
      'div',
      { flexDirection: 'column', gap: 6 },
      text(r.k, { fontFamily: DISPLAY, fontWeight: 700, fontSize: 38, letterSpacing: 1, textTransform: 'uppercase', color: C.navy2 }),
      text(r.v, { fontSize: 38, color: C.ink, lineHeight: 1.35 })
    );
  return stage(
    scene.width,
    scene.height,
    kicker(t.kicker),
    h(
      'div',
      { flex: 1, alignItems: 'center', marginTop: 40 },
      lightCard(
        { width: '100%', padding: 0, overflow: 'hidden' },
        h(
          'div',
          { alignItems: 'center', gap: 24, padding: '26px 40px', backgroundColor: C.lightBar },
          windowDots(),
          text(t.subject, { fontFamily: DISPLAY, fontWeight: 700, fontSize: 38, color: C.ink })
        ),
        h('div', { flexDirection: 'column', gap: 30, padding: '44px 52px 48px' }, ...t.rows.map(row))
      )
    )
  );
}

const RENDERERS = {
  intro: sceneIntro,
  check: sceneCheck,
  timeline: sceneTimeline,
  levels: sceneLevels,
  score: sceneScore,
  task: sceneTask,
  letter: sceneLetter
};

// Kepimas -------------------------------------------------------------------

async function renderOne(scene, locale) {
  const tree = RENDERERS[scene.kind](scene, scene[locale]);
  const svg = await satori(tree, { width: scene.width, height: scene.height, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: scene.width } }).render().asPng();
  const base = path.join(OUT_DIR, `${scene.slug}-${locale}`);
  await sharp(png).png({ compressionLevel: 9, palette: false }).toFile(`${base}.png`);
  if (!PNG_ONLY) await sharp(png).webp({ quality: 82 }).toFile(`${base}.webp`);
  return base;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const scenes = ONLY.length ? SCENES.filter((s) => ONLY.includes(s.slug)) : SCENES;
  if (!scenes.length) throw new Error(`No scene matches: ${ONLY.join(', ')}`);
  for (const scene of scenes) {
    for (const locale of ['lt', 'en']) {
      const base = await renderOne(scene, locale);
      const size = fs.statSync(`${base}.png`).size;
      console.log(`[illustrations] ${path.relative(ROOT, base)}.png  ${(size / 1024).toFixed(0)} KB`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
