# WCAG-lite smoke — DS v2.0

**Date:** 2026-05-25  
**Tester:** Agent (structural)  
**Build:** `site/lt/index.html` after `npm run build`

## Checklist

| Check | Result | Notes |
|-------|--------|-------|
| Skip link → `#main-content` | Pass | Unchanged |
| Focus visible (yellow 2px) | Pass | `.disclosure-chip__summary`, `.btn-pdf-outline`, `.link-tier-tertiary` use 3px offset |
| Hero → primary CTA → PDF tier | Pass | Single red + yellow outline |
| `details` DUK keyboard | Pass | Native `summary`; chevron is CSS-only |
| „Turinys“ outline + list buttons | Pass | IDs unchanged for JS |
| Touch 44px hero foot | Pass | `.link-tier-tertiary` + padding |
| `prefers-reduced-motion` | Pass | `.btn-pdf-outline` in reduced-motion block |
| Mobile 375 / 768 / 1024 | Pass | Hero centering + viz `order` (see §6 QA log in design_system.md) |
| EN locale verify | Pass | `verify-en-locale` in CI |

## Spot checks (manual recommended before release)

- [ ] Contrast: yellow on dark (`--accent-yellow` on `--bg-dark`) — projector view
- [ ] Tab order: lang switch → skip → content → outline (does not trap)
- [ ] Open DUK above mobile bottom nav — no overlap

## Mobile QA log (update design_system §6)

| Date | Build | Viewports | Tester | Result |
|------|-------|-----------|--------|--------|
| 2026-05-25 | post DS v2.0 | 375, 390, 768, 1024 | Agent smoke | Pass — disclosure patterns, hero mobile center, tools-lt deploy path |
