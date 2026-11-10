# Module registry

Modules that follow [SPEC.md](SPEC.md) and are known to work. Open a PR to add
yours — one row, no ranking.

| module | package | repository | view id | what it shows |
|---|---|---|---|---|
| Status monitor | `@philomelcc/dsh-status-monitor` | [philomelcc/dsh-status-monitor](https://github.com/philomelcc/dsh-status-monitor) | `status` | disk, CPU/memory/GPU, ports, session usage — four cards with full-page zoom |
| Download center | `@philomelcc/dsh-downloads` | [philomelcc/dsh-downloads](https://github.com/philomelcc/dsh-downloads) | `downloads` | download tasks (aria2 / Xunlei), magnet links, Chrome default-download takeover, history |
| Port monitor (example) | — (private) | this repo, `packages/port-monitor` | `port-monitor` | listening ports, owning processes, reachability, jump to HTTP services |

Rules for listing a module:

- it publishes one page and works **with or without** the shell — `registerView`
  when the workbench service exists, `sidebar.panellist` + `main` when it does
  not — and does not replace other modules' ids;
- it keeps host data under `/wb/<module>/...`;
- it checks `wb.apiVersion` on start and degrades instead of crashing;
- it does not require a patched shell;
- it is published to npm (or installable from a git checkout), so other people
  can add it with `dsh plugin add <package>`.

Third-party modules stay in their own repositories; the table is the index. The
publishing checklist is in [publishing.md](publishing.md#publishing-a-module-yours-or-a-new-official-one).
