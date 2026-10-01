# Lessons – q-a-agent

Formatas: `YYYY-MM-DD | kontekstas | problema | sprendimas | failai`

2026-09-29 | vietinis shell, 64_APK | Windows komanda `python` yra Store stubas ir išeina su kodu 9009. Tai nereiškia, kad Python nėra. | Paleisti per `wsl python3` arba `wsl -e python3` (pvz. `wsl python3 -m http.server`). | shell

2026-09-29 | verify:typography-roles, 64_APK | Žalia patikra nereiškė 12 px grindų. Skenas skaldė CSS pagal neįtrauktą eilutę, o regex matė tik `font-size: Npx`, todėl `clamp(11px, …)` ir `0.7rem` prasilenkė. | Kiekviena taisyklė atskirai, įskaitant `@media`. Skaičiuoti `clamp()` ribas. `em` / `rem` vertinti prie 16 px šaknies. `var(--token)` neišskleisti. `.header-title` yra display rolė, nes tools `h1` taisyklė yra klasė. Deploy `a7bfe34`. | scripts/verify-typography-roles.js, index.html, tools.html, tools-lt.html

2026-09-29 | git commit, 64_APK | Šiame shell nėra `user.name` / `user.email`. Commit krenta su „Author identity unknown“. | Nekeisti git config. Šio repo commitai yra `Deployment Script <dummy@example.com>`. Vienam commitui perduoti `GIT_AUTHOR_NAME`, `GIT_AUTHOR_EMAIL`, `GIT_COMMITTER_NAME`, `GIT_COMMITTER_EMAIL`. | shell
