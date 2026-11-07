# Workbench module contract

> `apiVersion: 1` · applies to `@philomelcc/dsh-workbench`
>
> This is the contract between the workbench shell and a module. A module built
> against `apiVersion 1` keeps working on every shell that still reports `1`.

## Shapes of a module

A workbench module is **one page** in the workbench switcher (the second row of
the top bar). There is no sidebar entry and no floating widget — the shell used
to support widgets and dropped them in 2026; do not build one.

Each module is an independent DSH bundle package:

```
<module>/
├── package.json          # bundle declaration + dsh.client
├── cordis.patch.yml      # one insert row, id = module id
├── index.js              # Host half: data collection + HTTP routes
├── client.js             # Client half: the page + registerView()
├── locale/en.json        # Plugin Manager metadata (meta.title/description)
├── locale/zh.json
└── icon.svg
```

Modules never import each other and never import the shell's code. All coupling
happens through the runtime `workbench` service and public HTTP endpoints.

## Registering the page

```js
const wb = ctx.get('workbench');
if (!wb) return;
if (wb.apiVersion !== 1) {
  console.warn('[my-module] needs workbench apiVersion 1, got ' + wb.apiVersion);
  return;
}

ctx.effect(() => wb.registerView({
  id: 'my-module',        // short kebab-case id, also the main-slot key
  title: '我的模块',       // tab label
  icon: MyIcon,           // optional React component ({ size, active })
  component: MyView,      // the page itself
  order: 50,              // tab order, lower = further left
  subtitle: '…',          // optional
  badge: () => 0,         // optional: () => number | string | null
}), 'my-module: view');
```

`registerView` returns a disposer; always wrap it in `ctx.effect` so the page
is unregistered when the plugin unloads.

| field | required | meaning |
|---|---|---|
| `id` | yes | Short id, unique among modules; also the `main` slot key. Must not be `conversation`. |
| `title` | yes | Tab label and page name (Chinese is fine — it is the user-facing name). |
| `component` | yes | Page component. |
| `icon` | no | `({ size, active }) => element`. |
| `order` | no | Tab order, default `50`. |
| `subtitle` | no | Hover hint (not rendered as a tooltip by the shell). |
| `badge` | no | Returns a badge value; call `wb.refresh()` after it changes. |
| `tab` | no | Default `true`. `false` registers a page reachable from the shell's own top-bar icons instead of a tab. |

The shell owns the tab row, the active-tab indicator and the panel switch
(`layout.selectPanel(id)`). A module must not call `layout.selectPanel` itself,
remember "am I active", or draw its own top bar.

## The page

The shell gives the page the whole central area — no padding, no card wrapper.
A page owns its layout:

```js
function MyView() {
  return h('div', {
    style: {
      height: '100%',
      boxSizing: 'border-box',
      overflowY: 'auto',
      padding: '24px 28px',
      maxWidth: 1100,
      margin: '0 auto',
      background: 'var(--dsw-alias-bg-base)',
      color: 'var(--dsw-alias-label-primary)',
    },
  }, /* … */);
}
```

Rules of thumb:

- Never `position: fixed` to fill the screen; the shell owns the frame.
- Poll only while visible (`document.hidden === true` → skip a tick).
- Degrade per block: one failing endpoint shows "unavailable" in that block, not
  an error page.
- Data stores feeding `useSyncExternalStore` must **replace** the snapshot
  (`state = { ...state, next }`), never mutate it — otherwise the page stops
  repainting.

## Host data

- Route convention: `/wb/<module>/<verb>`, registered with
  `ctx.webServer.register({ kind: 'exact', path, handler })`.
- Response: `{ ok: true, at: <epoch ms>, … }`; failure:
  `{ ok: false, error: 'human readable' }` plus a non-2xx status.
- Custom routes bypass DSH's index authentication. Check
  `req.socket.remoteAddress` and allow only loopback when the data is sensitive.
- Node APIs (processes, disks, child processes) live in `index.js` only.

## Shared UI

`wb.components`: `StatusDot`, `Card`, `SectionHeader`, `EmptyState`, `Spinner`,
`Button`, `Field`.

`wb.tokens`: `success`, `error`, `warn`, `idle`, `brand`, `bgBase`, `bgLayer1`,
`bgLayer2`, `bgOverlay`, `border1`, `border2`, `label`, `labelSecondary`.

Use tokens instead of hard-coded colors so both themes keep working.

## Naming

| thing | convention | example |
|---|---|---|
| package | `@<scope>/dsh-<module>` | `@philomelcc/dsh-download-center` |
| module id / view id | short kebab-case | `downloads` |
| client entry id | **the package name** | `@philomelcc/dsh-download-center` |
| HTTP routes | `/wb/<module-id>/<verb>` | `/wb/downloads/list` |
| plugin title | `Workbench · <Name>` | `Workbench · Download center` |

The entry id in `client.js` and the `name` in `cordis.patch.yml` must equal the
package name; DSH resolves the bundle by that string.

## Versioning

- The shell exposes `wb.apiVersion` (integer). Adding optional fields is not a
  breaking change; removing or reshaping one bumps the number.
- A module may declare which version it needs only by checking at runtime — it
  does not depend on the shell package in npm terms, because the dependency is a
  service, not an import.
- Shell and modules version independently: shell `0.x`, each module its own.

## Reference modules

`packages/port-monitor` is the smallest complete module and the recommended
starting point. `packages/status-monitor` and `packages/download-center` show
heavier pages (charts, task lists, subprocess engines).
