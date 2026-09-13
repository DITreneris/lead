'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const TARGETS = ['index.html', '404.html', 'tools.html', 'tools-lt.html'];

function snapshot() {
  return new Map(
    TARGETS.map((rel) => [rel, fs.readFileSync(path.join(ROOT, rel), 'utf8')])
  );
}

const before = snapshot();
execFileSync(process.execPath, [path.join(__dirname, 'inject-design-tokens.js')], {
  cwd: ROOT,
  stdio: 'ignore'
});
const after = snapshot();

const changed = TARGETS.filter((rel) => before.get(rel) !== after.get(rel));
if (changed.length) {
  console.error(
    '[verify-token-injection-idempotence] Repeated token injection changed:',
    changed.join(', ')
  );
  process.exit(1);
}

console.log('[verify-token-injection-idempotence] OK — repeated injection is stable.');
