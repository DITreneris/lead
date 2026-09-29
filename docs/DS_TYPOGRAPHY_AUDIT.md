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
- At v2.1, `verify:typography-roles` was a soft gate (exit 0 with warnings). Hardened 2026-09-29 — see below.

## Remaining orphans (documented / low risk)

| Selector | Note |
|----------|------|
| `.schema-step-num` | Color accents — not font-size orphans |
| `.roadmap-name`, `.quiz-question` | Mobile overrides — within role |
| `.brand-name`, `.slide-outline` | 12–13px uppercase — label tier |

## Follow-up (2026-09-29)

- `verify:typography-roles` exits 1 on a font-size that can render under 12px in `index.html`, `404.html`, `tools.html`, and `tools-lt.html`, and on a size over 32px outside the §4 display roles (`h1`, `h2`, `.hero-title-accent`, `.essence-primary-headline`, tools `.header-title`). Each rule is scored on its own, including rules inside `@media`. `clamp()` bounds count. `em` and `rem` are judged at a 16px root. `var(--token)` is not expanded.
- `.primer-next-cta` and `.library-cat-summary__meta` use `--font-size-label` (13px). Their previous `clamp(11px, …)` minimum sat under the floor and the old line-based scan did not see it.
- Tools `.version-tag` is `0.75rem` (12px at a 16px root). `.header-title` stays a display role because the rule is the class on `h1`, not the element selector. `.essence-lead` max is 32px; below about 1230px the fluid size is unchanged.
- Practice field labels (`.practice-structured-line strong`) and the tools `.brand-tagline` use `--font-size-label`. Legal brand and tag use the same token.
- The deferred “harden after a clean release cycle” item is done.
