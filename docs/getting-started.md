# Getting started

## Requirements

- DeepSeek Harness `0.2.x` with the Web UI (`dsh web`, default port 3080).
- Node.js 22+ (DSH ships its own runtime; this is for local checks).
- Windows for the full experience: the port monitor and status monitor read
  Windows process/disk data. The shell itself is cross-platform.
- Optional: [aria2](https://aria2.github.io/) for the download center
  (HTTP, magnet, torrent). Without it, downloads fall back to the Xunlei engine
  or fail with a clear message.

## Install

The shell and every module are ordinary DSH bundles. Install them into the
profile that runs your Web UI — `web` in the common case:

```powershell
dsh plugin --profile web add @philomelcc/dsh-workbench
dsh plugin --profile web add @philomelcc/dsh-status-monitor
dsh plugin --profile web add @philomelcc/dsh-downloads
```

`dsh plugin add` forwards to pnpm inside the profile and registers the new bundle
in `dsh.profile.bundles`. Restart the Web UI once afterward (stop and start it
however you normally launch it, e.g. `dsh web`).

The workbench shows up as a second row of tabs under the top bar. The shell
itself contributes the first-row icons (workbench overview / plugins / scheduled
tasks); each module adds one tab.

### Manual install

If you prefer to edit the profile by hand, add the packages to
`<profile>/package.json`:

```json
{
  "dsh": { "profile": { "bundles": ["@philomelcc/dsh-workbench", "…"] } },
  "dependencies": {
    "@philomelcc/dsh-workbench": "^0.1.0",
    "@philomelcc/dsh-status-monitor": "^0.1.0"
  }
}
```

then `pnpm install` inside that directory and restart.

## Verify

1. The second top-bar row shows one tab per installed module.
2. Click a tab — the page replaces the conversation area; the left session list
   stays usable.
3. `cordis_inspect_query` → `Slots.listSubTree root=main` lists your module ids
   as `main` slot keys.
4. Module data endpoints answer on loopback:
   `http://127.0.0.1:3080/wb/<module>/<verb>`.

## Develop from source

```powershell
git clone https://github.com/philomelcc/dsh-workbench.git
cd dsh-workbench
npm run check                       # node --check on every shipped script
dsh plugin --profile web add ./packages/workbench      # link this checkout
```

`dsh plugin add <local dir>` creates a pnpm link, so edits to `client.js` reload
through DSH's client HMR while you work.

## Write a module

1. Read [SPEC.md](SPEC.md) — that is the whole contract.
2. Copy `template/` into your own repo or folder.
3. Rename four things: `package.json` `name`, `cordis.patch.yml` `id` + `name`,
   the `id` at the top of `client.js`, and the `registerView({ id, title })`.
4. Implement `index.js` (data) and `client.js` (page).
5. `npm run check`, install it, restart, click the tab.

`packages/port-monitor` is the smallest complete example; copy it when in doubt.
