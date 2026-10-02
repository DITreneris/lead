# Lessons – q-a-agent

Formatas: `YYYY-MM-DD | kontekstas | problema | sprendimas | failai`

2026-09-29 | vietinis shell, 64_APK | Windows komanda `python` yra Store stubas ir išeina su kodu 9009. Tai nereiškia, kad Python nėra. | Paleisti per `wsl python3` arba `wsl -e python3` (pvz. `wsl python3 -m http.server`). | shell

2026-09-29 | verify:typography-roles, 64_APK | Žalia patikra nereiškė 12 px grindų. Skenas skaldė CSS pagal neįtrauktą eilutę, o regex matė tik `font-size: Npx`, todėl `clamp(11px, …)` ir `0.7rem` prasilenkė. | Kiekviena taisyklė atskirai, įskaitant `@media`. Skaičiuoti `clamp()` ribas. `em` / `rem` vertinti prie 16 px šaknies. Nuo 2026-10-02 `--font-size-*` išskleidžiami (ankstesnis „neišskleisti“ nebegalioja). `.header-title` yra display rolė, nes tools `h1` taisyklė yra klasė. Deploy `a7bfe34`. | scripts/verify-typography-roles.js, index.html, tools.html, tools-lt.html

2026-10-02 | Enter `#intro`, 64_APK | DS vis dar vadino hero PDF geltonu kontūru, o mobilų `h1` — 48px clamp. Sekant dokumentą būtų grąžintas antras mygtukas ir kita antraštė. | Gyvas rėmas yra kanonas. PDF yra tretinė juostos nuoroda (`.link-tier-tertiary.hero-pdf-link`). Antraštės dydį žiūrėk vėlesnėje tos pačios dienos eilutėje (type rhythm), ne čia. | docs/design_system.md, index.html, .cursor/skills/q-a-agent/SKILL.md

2026-10-02 | Enter type rhythm, 64_APK | Hero h1 ir sekcijos h2 prie 1440 px buvo tie patys 56 px. Iki 1024 px h2 užaugdavo virš hero. Esmė ir CTA turėjo du uždarus clamp. | `#intro h1` yra `--font-size-hero` (44 px prie 375, 72 px prie 1440), line-height 1.12. Sekcijos `h2` visur `--font-size-title`. `h2.essence-tagline` ir `h2.cta-title` yra `--font-size-display`. Ant šių antraščių negrąžinti raw clamp. EN CTA prie 375 px yra 4 eilutės ir mygtukas lieka ekrane — netrumpinti antru clamp. Rėmas, PDF juosta ir kortelių clamp’ai lieka. | styles/tokens.css, index.html, scripts/verify-typography-roles.js

2026-09-29 | git commit, 64_APK | Šiame shell nėra `user.name` / `user.email`. Commit krenta su „Author identity unknown“. | Nekeisti git config. Šio repo commitai yra `Deployment Script <dummy@example.com>`. Vienam commitui perduoti `GIT_AUTHOR_NAME`, `GIT_AUTHOR_EMAIL`, `GIT_COMMITTER_NAME`, `GIT_COMMITTER_EMAIL`. | shell
