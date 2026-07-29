# WCAG-lite smoke — DS v2.1

**Date:** 2026-07-29  
**Tester:** Agent (structural) + checklist close-out  
**Build:** after `npm run build` (tokens inject + site/)

## Checklist

| Check | Result | Notes |
|-------|--------|-------|
| Skip link → `#main-content` | Pass | Unchanged |
| Focus visible (yellow 2px) | Pass | Disclosure / PDF / tertiary offset 3px |
| Hero → primary CTA → PDF tier | Pass | Single red + yellow outline |
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
| 2026-07-29 | post DS v2.1 | 375, 768, 1024 | Agent structural | Pass — type tokens, chrome floor, teal, tertiary text roles |
| 2026-05-25 | post DS v2.0 | 375, 390, 768, 1024 | Agent smoke | Pass — disclosure patterns, hero mobile center, tools-lt deploy path |
