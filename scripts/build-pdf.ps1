# Build PDF from docs/pamoka-1-pdf.md -> assets/promptu-anatomija-pamoka-1.pdf
# Requires: Pandoc on PATH; PDF engine: typst (winget install Typst.Typst) or pdflatex.

$ErrorActionPreference = "Stop"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Split-Path -Parent $scriptDir
Set-Location $root

$src = Join-Path $root "docs\pamoka-1-pdf.md"
$outDir = Join-Path $root "assets"
$out = Join-Path $outDir "promptu-anatomija-pamoka-1.pdf"

if (-not (Test-Path $src)) { throw "Missing source: $src" }
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$pandoc = Get-Command pandoc -ErrorAction SilentlyContinue
if (-not $pandoc) { throw "pandoc not found. Install: winget install JohnMacFarlane.Pandoc" }

$typst = Get-Command typst -ErrorAction SilentlyContinue
if ($typst) {
    pandoc $src -o $out --pdf-engine=typst -V geometry:margin=2.5cm
} else {
    pandoc $src -o $out -V geometry:margin=2.5cm -V lang=lt
}

Write-Host "OK: $out"
