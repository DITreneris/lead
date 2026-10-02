# WCAG-lite smoke — DS v2.1, updated 2026-10-02

**Date:** 2026-07-29 (checklist origin). Updated 2026-10-02 for the hero PDF tier and the schema wash.  
**Tester:** Agent (structural) + checklist close-out  
**Build:** after `npm run build` (tokens inject + site/)

## Checklist

| Check | Result | Notes |
|-------|--------|-------|
| Skip link → `#main-content` | Pass | Unchanged |
| Focus visible (yellow 2px) | Pass | Disclosure / PDF / tertiary offset 3px |
| Hero → primary CTA → PDF tier | Pass | One red CTA. Hero PDF is a tertiary link in `.intro-strip`. Yellow outline stays on the final slide (`.btn-pdf-outline`) only |
| `details` DUK keyboard | Pass | Native `summary`; chrome ≥13px (`.disclosure-chip__summary`) |
| „Turinys“ outline + list buttons | Pass | IDs unchanged for JS |
| Touch 44px hero foot | Pass | `.link-tier-tertiary` |
| `prefers-reduced-motion` | Pass | Tier 2 PDF in reduced-motion block |
| Mobile 375 / 768 / 1024 | Pass (structural) | Hero center; chrome floor; teal tokens |
| EN locale verify | Pass | via `npm run verify` |
| Contrast: yellow on dark (projector) | Pass (structural) | `--accent-yellow` on `--bg-dark`; **re-check on real projector** |
| Tab order: lang → skip → content → outline | Pass (structural) | No trap in markup; **re-check on device** |
| Open DUK above mobile bottom nav | Pass (structural) | Panel `max-width` / measure tokens; **re-check overlap on phone** |

## Spot checks (manual recommended before release)

- [x] Contrast: yellow on dark — addressed via token policy; device projector still recommended
- [x] Tab order — structural pass; device recommended
- [x] Open DUK above mobile bottom nav — structural pass; device recommended

## Mobile QA log (update design_system §6)

| Date | Build | Viewports | Tester | Result |
|------|-------|-----------|--------|--------|
| 2026-10-02 | schema wash | 375 + desktop | Agent browser | Pass — step 4 `--surface-reason`, step 5 `--surface-qc`, text `--text-ink` / `--text-ink-body`. Teal stays the left rule |
| 2026-09-29 | reason-step contrast | 375 + desktop | Agent browser | Superseded 2026-10-02 — full `#047857` fill and `#f8fafc` text are not the live diagram |
| 2026-07-29 | post DS v2.1 | 375, 768, 1024 | Agent structural | Pass — type tokens, chrome floor, teal, tertiary text roles |
| 2026-05-25 | post DS v2.0 | 375, 390, 768, 1024 | Agent smoke | Pass — disclosure patterns, hero mobile center, tools-lt deploy path |
