# Typography orphan audit (DS v2.0)

**Date:** 2026-05-25  
**Scope:** [`index.html`](../index.html) component CSS (post `/* DS_TOKENS_END */`).

## Canonical roles (§4)

| Role | Selectors | Status |
|------|-----------|--------|
| Display H1 | `h1`, `.hero-title-accent` | OK — no change |
| Section H2 | `h2`, slide titles | OK |
| Lead | `.slide-lead` + aliases | **Unified** v2.0 |
| Label | `.label`, `.types-card-k`, `.cta-secondary-label` | Minor tracking variance — acceptable |
| UI / buttons | CTA, copy, quiz | OK — clamp where set |

## Actions taken

- Introduced **`.slide-lead`**; applied to `.hero-intro`, `.types-lead`, `.schema-lead`, `.slide-sublead`.
- Removed duplicate font-size/line-height from `.hero-intro`, `.types-lead` blocks.
- **`verify:typography-roles`** — warns on `font-size` >32px outside display selectors (soft gate, exit 0).

## Remaining orphans (documented / low risk)

| Selector | Note |
|----------|------|
| `.schema-step-num` | `rgba` color literals for step accents — not font-size orphans |
| `.roadmap-name`, `.quiz-question` | Mobile `font-size: 14–16px` overrides — within role |
| `.brand-name`, `.slide-outline` | 11–13px uppercase — matches label tier |

## P1 follow-up (v2.1)

- Optional: merge `.label` and `.disclosure-chip__summary` letter-spacing to single token `--tracking-label`.
