# DSH Workbench

English README. 中文版见 [README.md](README.md).

![ci](https://github.com/philomelcc/dsh-workbench/actions/workflows/ci.yml/badge.svg)

A tabbed workspace shell for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness). Each module is one page in a second top-bar row — status monitor, download center, or anything you build against the same small contract.

![Workbench](docs/screenshot.png)

## Why

DeepSeek Harness ships a conversation-centric Web UI. This project turns it into a workspace: a fixed system bar on top (brand, global icons, account, balance, restart), a workbench switcher underneath, and the conversation area below. Every module gets a full page of the central area while the session list on the left keeps working.

**Navigation stratification is the core idea.** The stock sidebar flattens two kinds of things into one list:

- **system-level controls** — plugins, automations, the entries that manage the running system;
- **application surfaces** — a status monitor, a download manager, a design library: anything that owns a full page.

The workbench splits them into two layers. Application surfaces register as **modules** and appear in the module row on the second top-bar line; everything that does not register stays in the **system bar**, which mirrors the native sidebar rows and delegates clicks back to them.

| plugin kind | where it shows up | what it has to do |
|---|---|---|
| system-level | system bar | nothing — keep the native DSH registration |
| application-level | module row | register a module (see [SPEC.md](docs/SPEC.md)) |
| neither | nowhere | — |

That makes registration **optional**: a third-party plugin never has to know the workbench exists, and the workbench never keeps a plugin list of its own — whoever registers a module simply gets one more tab.

The shell is deliberately thin — it owns layout, the tab row and a handful of UI primitives. Modules own their data and their page. They never import each other, and they talk to the shell through one runtime service.

## Built-in extras

Besides the navigation layers, the shell ships a few **individually switchable** extras. The entry point is the gear in the system bar (workbench settings):

| extra | default | what it does |
|---|---|---|
| Theme switch | on | dark / light / paper swatches in the top bar |
| Balance | on | account balance from `remote.account`, click to top up |
| Restart | on | one-click restart of the web host; **needs an external supervisor**: set `DSH_RESTART_TASK` (a Windows scheduled task name) or `DSH_RESTART_CMD` (any command). Without one the button reports it instead of killing the server |
| Running glow | on | flowing glow around the session row while it is working |
| Turn cost | on | token and cost estimate shown after each turn |
| Effort slider | on | turns the reasoning-level row in the model menu into a segmented, detent-style slider; reaching max flashes a whale-girl silhouette behind the panel (non-commercial asset — see below) |

If you only want the navigation layers, turn the rest off and let another plugin own them — the switches persist in `localStorage`. The settings page also lists the modules that registered a page (they are the tabs in the second row).

## Packages

| package | what it is |
|---|---|
| [`@philomelcc/dsh-workbench`](packages/workbench) | the shell: module API, top bar, tab switcher, overview page, shared components |
| [`@philomelcc/dsh-status-monitor`](https://github.com/philomelcc/dsh-status-monitor) | disk / hardware / ports / usage cards with a full-page zoom |
| [`@philomelcc/dsh-downloads`](https://github.com/philomelcc/dsh-downloads) | download queue with aria2 + Xunlei backends, magnet links, session history |

The last two are plugins in **their own repositories**; this repo only ships the shell. They do not need it: with the workbench installed they appear as tabs, without it they become native sidebar entries on their own.

[`packages/port-monitor`](packages/port-monitor) is an in-repo example (`private`, not published to npm): it shows what a complete minimal module package looks like. To start a module, copy [`template/`](template).

## Install

```powershell
dsh plugin --profile web add @philomelcc/dsh-workbench
dsh plugin --profile web add @philomelcc/dsh-status-monitor
dsh plugin --profile web add @philomelcc/dsh-downloads
```

Restart the Web UI once. The workbench tabs appear on the second top-bar row. Details, manual install and troubleshooting are in [docs/getting-started.md](docs/getting-started.md).

Extra dependencies a module needs (aria2 for the download center, for example) are documented in that module's own README.

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

Copy [`template/`](template) to start, or read [`packages/port-monitor`](packages/port-monitor) as a complete example (it is private and not published to npm). Shell and modules version independently: a module built for `apiVersion 1` keeps working across shell releases that still report `1`.

## Repository layout

```
packages/workbench         the shell bundle
packages/port-monitor      example module (private, not published)
template/                  copy-me starting point for a new module
docs/                      SPEC, getting started, module registry, publishing
scripts/check.mjs          node --check across every shipped script
```

## Notes

- Windows is the primary target: port and disk sampling read Windows data. The shell and the module API are platform-neutral.
- `npm run check` syntax-checks every shipped script; CI runs it on Linux and Windows.
- Plugins are installed into a DSH profile; nothing here patches the Harness itself.

## License

MIT.

## Materials and third-party terms

- The "reasoning effort slider" is ported from [dsh-codex-effort-slider](https://github.com/Microqian2th/dsh-codex-effort-slider) (**MIT, © Microqian2th**); its licence and copyright notice are kept in the corresponding source block.
- The whale-girl silhouette that flashes at max is based on the **"big fat fish" character by ZipZipPipe**, licensed **CC BY-NC-SA 4.0**: non-commercial use only, attribution and share-alike required. Do not use this asset commercially; replace it if you need to.
- The silhouette is a vector outline traced from the author's original artwork (a 1152×2048 transparent-background illustration) and is only rendered inside the workbench window.
