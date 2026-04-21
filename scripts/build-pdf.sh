#!/usr/bin/env bash
# Build PDFs from Markdown:
#   docs/pamoka-1-pdf.md     -> assets/www.promptanatomy.app.pdf (LT)
#   docs/pamoka-1-pdf-en.md  -> assets/www.promptanatomy.app-en.pdf (EN)
# Requires: pandoc; PDF engine: typst OR pdflatex/xelatex/lualatex on PATH.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
mkdir -p assets

if ! command -v pandoc >/dev/null 2>&1; then
  echo "pandoc not found" >&2
  exit 1
fi

build_pdf() {
  local SRC="$1"
  local OUT="$2"
  local LANG="$3"
  local COMMON=( "$SRC" -o "$OUT" --resource-path=".:docs" -V geometry:margin=2.5cm )

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
    pandoc "${COMMON[@]}" --pdf-engine="$ENGINE" -V lang="$LANG"
  fi
  echo "OK: $OUT"
}

build_pdf "docs/pamoka-1-pdf.md" "assets/www.promptanatomy.app.pdf" "lt"
build_pdf "docs/pamoka-1-pdf-en.md" "assets/www.promptanatomy.app-en.pdf" "en"
