# @philomelcc/dsh-downloads

Workbench module: a real download queue — progress, pause/resume/cancel, magnet
links, Chrome default-download takeover, and a per-session record of what was
downloaded.

## Install

```powershell
dsh plugin --profile web add @philomelcc/dsh-workbench
dsh plugin --profile web add @philomelcc/dsh-downloads
```

Restart the Web UI; the module adds the **下载 / Downloads** tab.

## Engines

| source | engine |
|---|---|
| magnet / `.torrent` | aria2 (DHT + LPD, `--seed-time=0`) |
| HTTP / HTTPS | Xunlei P2SP when an API key is configured, otherwise aria2 with 16 connections |

The module does **not** bundle aria2 — it is GPLv2 and a 5 MB binary. Install it
yourself and the module finds it automatically:

1. `ARIA2C_PATH` environment variable pointing at the executable, or
2. a cached copy at `~/.dsh/download-center/bin/aria2c[.exe]`, or
3. `winget install aria2.aria2` / `scoop install aria2` and restart.

Without aria2 the page still opens; magnet transfers fail with a readable error
and `/wb/downloads/health` reports why.

The Xunlei engine is optional and is **not** a package dependency (it pulls a
native module that needs a build approval on install). Install it yourself if
you have an API key:

```powershell
npm i @xunlei-open/dlsdk @xunlei-open/dlsdk-native-windows-x64
```

Credentials go in `~/.dsh/secrets/xunlei.txt`. Without the SDK, magnet/HTTP
downloads still work through aria2 and the Xunlei engine reports a readable
error instead of breaking the page.

## Endpoints

| method | path | body |
|---|---|---|
| GET | `/wb/downloads/list` | — (tasks + stats) |
| GET | `/wb/downloads/history` | — (session records) |
| GET | `/wb/downloads/health` | — (engine paths, default dir) |
| POST | `/wb/downloads/create` | `{ url, dir?, fileName?, backend? }` |
| POST | `/wb/downloads/pause` · `resume` · `cancel` · `remove` | `{ id }` |
| POST | `/wb/downloads/open` | `{ id, kind: 'file' \| 'dir' }` |
| POST | `/wb/downloads/register` | `{ … }` — used by the `fast_download` tool |

All routes accept loopback only.

## Layout

```
index.js            Host: routes above
client.js           Client: the page + registerView('downloads')
lib/tasks.js        task table, state machine, persistence, history
lib/engines.js      aria2 / Xunlei subprocess engines and progress parsing
lib/xunlei*.mjs     Xunlei worker (separate process; a dll crash does not take the host down)
chrome-extension/   optional Chrome default-download takeover
test/               client-side smoke test
```

MIT. aria2 and the Xunlei SDK keep their own licenses.
