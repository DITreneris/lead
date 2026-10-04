// Share card for promptanatomy.cloud. Off the main build:
//   npm run build:og
// Writes assets/og-promptanatomy.png (1200×630).
// Light table on the right, not full-frame. No word After.
// Left: brand, For teams, page h1, practice line.
// Bump OG_IMAGE_VERSION only when a card that already shipped changes pixels.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { getIllustrationColors } = require('./illustration-colors.cjs');
const C = getIllustrationColors();

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FONT_DIR = path.join(ROOT, 'assets', 'fonts');
const OUT = path.join(ROOT, 'assets', 'og-promptanatomy.png');

const WIDTH = 1200;
const HEIGHT = 630;

const fonts = [
  { name: 'Space Grotesk', weight: 700, style: 'normal', data: fs.readFileSync(path.join(FONT_DIR, 'SpaceGrotesk-Bold.ttf')) },
  { name: 'Inter', weight: 400, style: 'normal', data: fs.readFileSync(path.join(FONT_DIR, 'Inter-Regular.ttf')) },
  { name: 'Inter', weight: 600, style: 'normal', data: fs.readFileSync(path.join(FONT_DIR, 'Inter-SemiBold.ttf')) }
];

function h(type, style, ...children) {
  const kids = children.flat().filter((c) => c !== null && c !== undefined && c !== false);
  const props = { style: { display: 'flex', ...style } };
  if (kids.length) props.children = kids.length === 1 ? kids[0] : kids;
  return { type, props };
}

const text = (s, style) => ({
  type: 'span',
  props: { style: { display: 'block', ...style }, children: s }
});

function anatomyRow(label, value, last) {
  return h(
    'div',
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      paddingTop: 14,
      paddingBottom: 14,
      borderBottom: last ? 'none' : '1px solid ' + C.lightBar
    },
    h('div', {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: C.yellow,
      flexShrink: 0
    }),
    text(label, {
      width: 108,
      fontFamily: 'Inter',
      fontWeight: 600,
      fontSize: 18,
      letterSpacing: 0.4,
      color: C.ink
    }),
    text(value, {
      flexGrow: 1,
      fontFamily: 'Inter',
      fontWeight: 400,
      fontSize: 20,
      color: C.inkMuted
    })
  );
}

const copy = h(
  'div',
  {
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 1,
    paddingRight: 28
  },
  text('Prompt Anatomy', {
    fontFamily: 'Space Grotesk',
    fontWeight: 700,
    fontSize: 28,
    lineHeight: 1.15,
    color: C.yellow
  }),
  text('For teams', {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: 22,
    lineHeight: 1.3,
    marginTop: 10,
    color: C.textMuted
  }),
  text('A short prompt becomes a task.', {
    fontFamily: 'Space Grotesk',
    fontWeight: 700,
    fontSize: 52,
    lineHeight: 1.05,
    marginTop: 22,
    color: C.text
  }),
  text('Try the 2-minute practice.', {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: 24,
    lineHeight: 1.3,
    marginTop: 22,
    color: C.textMuted
  })
);

const panel = h(
  'div',
  {
    flexDirection: 'column',
    width: 460,
    flexShrink: 0,
    backgroundColor: C.cardLight,
    borderRadius: 28,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 26,
    paddingRight: 26
  },
  anatomyRow('Role', 'work assistant'),
  anatomyRow('Goal', 'weekly priorities'),
  anatomyRow('Input', 'notes'),
  anatomyRow('Output', 'action list', true)
);

const tree = h(
  'div',
  {
    width: WIDTH,
    height: HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.navy,
    paddingTop: 48,
    paddingBottom: 48,
    paddingLeft: 64,
    paddingRight: 56,
    fontFamily: 'Inter',
    color: C.text
  },
  copy,
  panel
);

const svg = await satori(tree, { width: WIDTH, height: HEIGHT, fonts });
const png = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng();
await sharp(png).png({ compressionLevel: 9, palette: false }).toFile(OUT);
const meta = await sharp(OUT).metadata();
const bytes = fs.statSync(OUT).size;
if (meta.width !== WIDTH || meta.height !== HEIGHT) {
  console.error('[build:og] Expected', WIDTH + '×' + HEIGHT, 'got', meta.width + '×' + meta.height);
  process.exit(1);
}
console.log('[build:og] Wrote', OUT, meta.width + '×' + meta.height, bytes, 'bytes');
