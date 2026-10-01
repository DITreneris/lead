# Lessons – data-agent

Formatas: `YYYY-MM-DD | kontekstas | problema | sprendimas | failai`

2026-09-29 | vietinis shell, 64_APK | Windows komanda `python` yra Store stubas ir išeina su kodu 9009. Tai nereiškia, kad Python nėra. | Paleisti per `wsl python3` arba `wsl -e python3` (pvz. `wsl python3 -m http.server`). | shell

2026-09-29 | git commit, 64_APK | Šiame shell nėra `user.name` / `user.email`. Commit krenta su „Author identity unknown“. | Nekeisti git config. Šio repo commitai yra `Deployment Script <dummy@example.com>`. Vienam commitui perduoti `GIT_AUTHOR_NAME`, `GIT_AUTHOR_EMAIL`, `GIT_COMMITTER_NAME`, `GIT_COMMITTER_EMAIL`. | shell
