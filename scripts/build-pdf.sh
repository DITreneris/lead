#!/usr/bin/env bash
# Build PDF from docs/pamoka-1-pdf.md -> assets/www.promptanatomy.app.pdf
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
mkdir -p assets
SRC="docs/pamoka-1-pdf.md"
OUT="assets/www.promptanatomy.app.pdf"
if ! command -v pandoc >/dev/null 2>&1; then
  echo "pandoc not found" >&2
  exit 1
fi
if command -v typst >/dev/null 2>&1; then
  pandoc "$SRC" -o "$OUT" --resource-path=".:docs" --pdf-engine=typst -V geometry:margin=2.5cm
else
  pandoc "$SRC" -o "$OUT" --resource-path=".:docs" -V geometry:margin=2.5cm -V lang=lt
fi
echo "OK: $OUT"
