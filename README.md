# DSH Workbench

A tabbed workspace shell for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness). Each module is one page in a second top-bar row — status monitor, download center, or anything you build against the same small contract.

![Workbench](docs/screenshot.png)

## Why

DeepSeek Harness ships a conversation-centric Web UI. This project turns it into a workspace: a fixed system bar on top (brand, global icons, account, balance, restart), a workbench switcher underneath, and the conversation area below. Every module gets a full page of the central area while the session list on the left keeps working.

The shell is deliberately thin — it owns layout, the tab row and a handful of UI primitives. Modules own their data and their page. They never import each other, and they talk to the shell through one runtime service.

## Packages

| package | what it is |
|---|---|
| [`@philomelcc/dsh-workbench`](packages/workbench) | the shell: module API, top bar, tab switcher, overview page, shared components |
| [`@philomelcc/dsh-status-monitor`](packages/status-monitor) | disk / hardware / ports / usage cards with a full-page zoom |
| [`@philomelcc/dsh-download-center`](packages/download-center) | download tasks with aria2 + Xunlei backends, magnet links, session history |
| [`@philomelcc/dsh-port-monitor`](packages/port-monitor) | reference module: listening ports, processes, one-click open |

## Install

```powershell
dsh plugin --profile web add @philomelcc/dsh-workbench
dsh plugin --profile web add @philomelcc/dsh-status-monitor
dsh plugin --profile web add @philomelcc/dsh-download-center
```

Restart the Web UI once. The workbench tabs appear on the second top-bar row. Details, manual install and troubleshooting are in [docs/getting-started.md](docs/getting-started.md).

The download center needs [aria2](https://aria2.github.io/) for HTTP/magnet/torrent transfers — the repo does not ship the binary (it is GPLv2). Install it with `winget install aria2.aria2`, or point `ARIA2C_PATH` at an existing executable.

## Build a module

The whole contract is one page: [docs/SPEC.md](docs/SPEC.md).

```js
const wb = ctx.get('workbench');
if (!wb || wb.apiVersion !== 1) return;

ctx.effect(() => wb.registerView({
  id: 'my-module',
  title: '我的模块',
  component: MyView,
  order: 50,
}), 'my-module: view');
```

Copy [`template/`](template) to start, or read [`packages/port-monitor`](packages/port-monitor) as a complete example. Shell and modules version independently: a module built for `apiVersion 1` keeps working across shell releases that still report `1`.

## Repository layout

```
packages/workbench         the shell bundle
packages/status-monitor    official module
packages/download-center   official module
packages/port-monitor      reference module
template/                  copy-me starting point for a new module
docs/                      SPEC, getting started, module registry
scripts/check.mjs          node --check across every shipped script
```

## Notes

- Windows is the primary target: port and disk sampling read Windows data. The shell and the module API are platform-neutral.
- `npm run check` syntax-checks every shipped script; CI runs it on Linux and Windows.
- Plugins are installed into a DSH profile; nothing here patches the Harness itself.

## License

MIT. Third-party engines keep their own licenses: aria2 (GPLv2) is installed separately, and the Xunlei SDK is pulled from npm by the download center.
