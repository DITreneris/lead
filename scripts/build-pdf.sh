#!/usr/bin/env bash
# Build PDF from docs/pamoka-1-pdf.md -> assets/www.promptanatomy.app.pdf
# Requires: pandoc; PDF engine: typst OR pdflatex/xelatex/lualatex on PATH.
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

COMMON=( "$SRC" -o "$OUT" --resource-path=".:docs" -V geometry:margin=2.5cm )

if command -v typst >/dev/null 2>&1; then
  pandoc "${COMMON[@]}" --pdf-engine=typst
else
  ENGINE=""
  for e in pdflatex xelatex lualatex; do
    if command -v "$e" >/dev/null 2>&1; then
      ENGINE="$e"
      break
    fi
  done
  if [ -z "$ENGINE" ]; then
    echo "No PDF engine found. Install typst or a LaTeX distribution with pdflatex on PATH." >&2
    echo "See SETUP.md — section 'PDF iš Markdown'." >&2
    exit 1
  fi
  pandoc "${COMMON[@]}" --pdf-engine="$ENGINE" -V lang=lt
fi
echo "OK: $OUT"
