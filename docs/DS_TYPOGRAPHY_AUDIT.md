# Typography orphan audit (DS v2.1)

**Date:** 2026-07-29  
**Scope:** [`index.html`](../index.html) component CSS (post `/* DS_TOKENS_END */`).

## Canonical roles (§4)

| Role | Selectors | Status |
|------|-----------|--------|
| Display H1 | `h1`, `.hero-title-accent` | OK — no change |
| Section H2 | `h2`, slide titles | OK |
| Lead | `.slide-lead` + aliases | **Tokens** — `--font-size-lead`, `--lh-body`, `--measure-prose` |
| Label | `.label`, `.disclosure-chip__summary`, `.types-card-k` | **`--tracking-label`** + `--font-size-label` on disclosure |
| UI / buttons | CTA, copy, quiz | `--font-size-label` on copy chrome |

## Actions taken (v2.1)

- Chrome floor: disclosure, lang switch, library goal, types-copy, prompt-editor chip ≥12–13px.
- `--tracking-label` shared by `.label` and `.disclosure-chip__summary`.
- Soft gate `verify:typography-roles` unchanged (exit 0 with warnings).

## Remaining orphans (documented / low risk)

| Selector | Note |
|----------|------|
| `.schema-step-num` | Color accents — not font-size orphans |
| `.roadmap-name`, `.quiz-question` | Mobile overrides — within role |
| `.brand-name`, `.slide-outline` | 12–13px uppercase — label tier |

## Deferred

- Harden typography verify to fail CI after a clean release cycle.
