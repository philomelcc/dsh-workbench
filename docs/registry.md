# Module registry

Modules that follow [SPEC.md](SPEC.md) and are known to work. Open a PR to add
yours — one row, no ranking.

| module | package | view id | what it shows |
|---|---|---|---|
| Status monitor | `@philomelcc/dsh-status-monitor` | `status` | disk, CPU/memory/GPU, ports, session usage — four cards with full-page zoom |
| Download center | `@philomelcc/dsh-download-center` | `downloads` | download tasks (aria2 / Xunlei), magnet links, Chrome default-download takeover, history |
| Port monitor | `@philomelcc/dsh-port-monitor` | `port-monitor` | listening ports, owning processes, reachability, jump to HTTP services |

Rules for listing a module:

- it registers exactly one view (`registerView`) and does not replace other
  modules' ids;
- it keeps host data under `/wb/<module>/...`;
- it checks `wb.apiVersion` on start and degrades instead of crashing;
- it does not require a patched shell.

Third-party modules stay in their own repositories; the table is the index.
