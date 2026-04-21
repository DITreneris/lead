# English locale UI/UX audit — Prompt Anatomy (`/en/`)

**Date:** 2026-04-18  
**Scope:** User-facing and accessibility-relevant text on the built English page `site/en/index.html`, plus the English prompt library asset `assets/prompt-library-en.js`.  
**Method:** `npm run build` → `npm run verify`; manual review of `scripts/en-html-replacements.cjs` coverage; grep for Lithuanian diacritics; comparison of nav `aria-label` values vs landmark `section aria-label` values.

---

## 1. Executive summary

Several **landmark `section` elements** kept Lithuanian `aria-label` values on the English build even though sidebar navigation labels were already translated. The **hero brand block and `<h1>`** also kept Lithuanian typography (`PROMPTŲ` / `ANATOMIJA`), which is visible to all users and to assistive technologies.

Those gaps are **fixed** in `scripts/en-html-replacements.cjs` (build-time string pairs). **`scripts/verify-en-locale.js`** now fails the build if **any Lithuanian-specific letter** appears in the English HTML **outside** `<script>`, `<style>`, and HTML comments — reducing regression risk.

The file `site/en/index.html` still contains **Lithuanian in HTML comments, CSS comments, and inside the inline script** (the `libraryPromptsLt` object remains in the bundle for the LT code path). That text is **not rendered** to end users, but it **is visible in “View source”** and increases noise for developers auditing the EN artifact.

---

## 2. Findings (before this audit)

| Area | Severity | Finding |
|------|----------|---------|
| Landmarks | **Blocking (a11y / locale)** | Five `<section aria-label="…">` values stayed in Lithuanian (`Susitikimo ar sprinto planas`, `Ta pati žinutė — 3 lygiai`, `Turinio grįžtamasis ryšys`, `Užduotis / mokymas komandai`, `Laiškas ar žinutė (juodraštis)`). Nav items for the same slides were already in English — **inconsistent UX** for screen-reader users moving from nav to content. |
| Brand / hero | **High (visible)** | `PROMPTŲ` / `ANATOMIJA` in `.brand-name` and `<h1>` on `/en/`. |
| Automation | **Medium** | `verify-en-locale.js` only matched a fixed deny-list; **ASCII-only** Lithuanian phrases (e.g. `Susitikimo ar sprinto planas`) could slip through. |
| EN prompt library | **OK** | `assets/prompt-library-en.js` contains **no** Lithuanian diacritics in the checked file. Runtime selection uses `window.__PROMPT_LIBRARY_EN__` when `LOCALE === 'en'`. |
| Product PDF | **By design** | English UI states that the downloadable summary PDF is **Lithuanian** (see existing `aria-label` / hero copy in replacements). |

---

## 3. Changes made (code)

1. **`scripts/en-html-replacements.cjs`**  
   - Added EN pairs for the five `section` `aria-label` strings above.  
   - Added EN pairs for `.brand-name` and hero `<h1>` → `PROMPT` / `ANATOMY`.

2. **`scripts/verify-en-locale.js`**  
   - After the deny-list check, assert that stripped HTML **body** (no comments / script / style) contains **no** Lithuanian letters (Unicode range used in standard Lithuanian orthography).

---

## 4. Residual Lithuanian (non-blocking for end users)

| Location | User impact | Recommendation |
|----------|-------------|----------------|
| `<!-- … -->` slide markers in `site/en/index.html` | None (comments not rendered) | Optional: translate comments in **source** `index.html` to neutral English for maintainers, or strip comments in a future build step. |
| `/* … */` inside `<style>` | None | Same as above — developer ergonomics only. |
| Inline `<script>`: `libraryPromptsLt` object | None at runtime on `/en/` if `prompt-library-en.js` loads | Long-term: split bundles so EN pages do not ship LT strings (smaller HTML, cleaner audits). |

---

## 5. Light UX notes (English copy)

- **Terminology** is generally aligned with AGENTS.md (“prompt”, “library”, “framework” for schema, “check” for QC).  
- **Nav vs content:** After this fix, slide numbers and themes read consistently between sidebar `aria-label` and `section` landmarks.  
- **PDF expectation:** Keeping “Lithuanian” explicit in the download CTA is good practice — avoids surprise for English-primary users.

---

## 6. Verification

After changes:

```text
npm run build
npm run verify
```

Expected: `[verify-library-keys] OK` and `[verify-en-locale] OK` for `site/en/index.html`.

---

## 7. Sign-off

**User-visible HTML outside script/style/comments:** no Lithuanian diacritics detected after build, enforced by `verify-en-locale.js`.  

**Full HTML file:** Lithuanian still appears in comments, CSS comments, and embedded LT library source inside `<script>` — documented above as non-rendered residual.
