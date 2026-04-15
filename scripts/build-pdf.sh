#!/usr/bin/env bash
# Build PDF from docs/pamoka-1-pdf.md -> assets/promptu-anatomija-pamoka-1.pdf
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
mkdir -p assets
SRC="docs/pamoka-1-pdf.md"
OUT="assets/promptu-anatomija-pamoka-1.pdf"
if ! command -v pandoc >/dev/null 2>&1; then
  echo "pandoc not found" >&2
  exit 1
fi
if command -v typst >/dev/null 2>&1; then
  pandoc "$SRC" -o "$OUT" --pdf-engine=typst -V geometry:margin=2.5cm
else
  pandoc "$SRC" -o "$OUT" -V geometry:margin=2.5cm -V lang=lt
fi
echo "OK: $OUT"
