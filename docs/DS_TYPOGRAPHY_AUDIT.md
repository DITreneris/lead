# Typography audit (DS v3.1)

**Recount:** 2026-10-02, after the type rhythm.  
**Scope:** [`index.html`](../index.html) component CSS after `/* DS_TOKENS_END */`.  
**Supersedes:** the same-day morning note that `--font-size-display` painted nothing and that hero and section `h2` were both 56px at 1440px.

## Heading roles

| Role | Selector | Token | 375 / 768 / 1024 / 1440 |
|------|----------|-------|-------------------------|
| Hero | `h1` (the only `h1` is `#intro`) | `--font-size-hero` `clamp(44px, 5vw, 72px)` | 44 / 44 / 51 / 72 px |
| Section | `h2` | `--font-size-title` `clamp(36px, 4.2vw, 56px)` | 36 / 36 / 43 / 56 px |
| Closing | `h2.essence-tagline`, `h2.cta-title` | `--font-size-display` `clamp(56px, 7.5vw, 104px)` | 56 / 58 / 77 / 104 px |

`#intro h1` keeps `line-height: 1.12` and `max-width: 14em`. Closing headlines keep `line-height: 0.92` and weight 700. No raw `font-size` clamp remains on these selectors, including inside `@media (max-width: 1024px)`. `verify:typography-roles` fails if one of them leaves its token.

Hero stays above the section title at every measured width. The English CTA title is 4 lines at 375px and the button stays on screen.

## What the scale still does not own

83 `font-size` rules in component CSS: **33 token**, **39 clamp** (27 distinct formulas), **7 px**, **4 em**.

The clamps are cards, quiz, prompts, library, roadmap, and the promo title. They are the deferred list in `docs/design_system.md`. Heading roles are closed; these are not.

| Kind | Where | Note |
|------|--------|------|
| px | `.schema-step-num` 22px, schema title 17px, schema description 16px, `.slide-outline__btn` 13px, `.quiz-reset-btn` 15px, mobile `.roadmap-name` 14px / `.roadmap-time` 13px | All under the 32px ceiling |
| em | legal address `1em`, entity footer `0.92em`, disclosure chevrons `1.35em` / `1.25em` | Relative to the parent |
| clamp | `.essence-lead` `clamp(22px, 2.6vw, 32px)` | Ceiling is the gate. Width under about 1230px does not change the size |
| clamp | `.brand-name` `clamp(12px, 2vw, 17px)` | Sentence case, `letter-spacing: 0` |

Letter-spacing still has 11 raw steps plus `var(--tracking-label)`. That token is not part of this recount's change.

## Fonts

Google request: Inter **400 / 500 / 600 / 700 / 800**, Space Grotesk **700**. Component CSS uses those weights 1 / 1 / 11 / 22 / 17 times. The single 500 is `.schema-step-body span`. Inter 300 and Space Grotesk 500 are not requested. Illustration bake TTFs are separate and are not in `PUBLIC_FILES`.

## What is already v3.1

Color, radius, and motion tokens are the live source. Illustration bake reads `styles/tokens.css`. The only component hex is `#2aabee` (Telegram). Yellow stays the existing ladder; it was not remapped. The intro frame stays 1200px / 55/45, one red CTA, PDF as a tertiary strip link. Satellites use the v3.1 subset and do not carry `--font-size-hero`.
