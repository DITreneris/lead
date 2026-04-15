# Build PDF from docs/pamoka-1-pdf.md -> assets/www.promptanatomy.app.pdf
# Requires: Pandoc on PATH; PDF engine: typst (winget install Typst.Typst) or pdflatex.

$ErrorActionPreference = "Stop"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Split-Path -Parent $scriptDir
Set-Location $root

$src = Join-Path $root "docs\pamoka-1-pdf.md"
$outDir = Join-Path $root "assets"
$out = Join-Path $outDir "www.promptanatomy.app.pdf"

if (-not (Test-Path $src)) { throw "Missing source: $src" }
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$pandoc = Get-Command pandoc -ErrorAction SilentlyContinue
if (-not $pandoc) {
    $pandocCandidates = @(
        (Join-Path $env:LOCALAPPDATA "Pandoc\pandoc.exe"),
        (Join-Path $env:LOCALAPPDATA "Programs\Pandoc\pandoc.exe"),
        (Join-Path $env:ProgramFiles "Pandoc\pandoc.exe"),
        (Join-Path ${env:ProgramFiles(x86)} "Pandoc\pandoc.exe")
    ) | Where-Object { $_ -and (Test-Path $_) } | Select-Object -First 1

    if ($pandocCandidates) {
        $pandoc = $pandocCandidates
    } else {
        throw "pandoc not found. Install: winget install JohnMacFarlane.Pandoc"
    }
}

$typst = Get-Command typst -ErrorAction SilentlyContinue
if (-not $typst) {
    $typstCandidates = @(
        (Join-Path $env:LOCALAPPDATA "Programs\Typst\typst.exe"),
        (Join-Path $env:LOCALAPPDATA "Programs\Typst\typst-x86_64-pc-windows-msvc\typst.exe"),
        (Join-Path $env:ProgramFiles "Typst\typst.exe"),
        (Join-Path ${env:ProgramFiles(x86)} "Typst\typst.exe")
    ) | Where-Object { $_ -and (Test-Path $_) } | Select-Object -First 1

    if ($typstCandidates) {
        $typst = $typstCandidates
    }
}

if ($typst) {
    & $pandoc $src -o $out --resource-path=".;docs" --pdf-engine=$typst -V geometry:margin=2.5cm
} else {
    & $pandoc $src -o $out --resource-path=".;docs" -V geometry:margin=2.5cm -V lang=lt
}

Write-Host "OK: $out"
