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
├── client.js             # Client half: the page + its registration path
├── locale/en.json        # Plugin Manager metadata (meta.title/description)
├── locale/zh.json
└── icon.svg
```

Modules never import each other and never import the shell's code. All coupling
happens through the runtime `workbench` service and public HTTP endpoints.

## Registering the page

A module is **optional-shell**: it works with the workbench installed and without
it. Resolve the service at apply time and register the same page two ways —
`load` must stay `['slots']` only, or the module never starts on a profile that
has no shell.

```js
return {
  inject: ['slots'],
  apply(ctx) {
    const wb = ctx.get('workbench');

    if (wb && wb.apiVersion === 1) {
      // With the shell: one page in the workbench tab row.
      ctx.effect(() => wb.registerView({
        id: 'my-module',        // short kebab-case id, also the main-slot key
        title: '我的模块',       // tab label
        icon: MyIcon,           // optional React component ({ size, active })
        component: MyView,      // the page itself
        order: 50,              // tab order, lower = further left
        subtitle: '…',          // optional
        badge: () => 0,         // optional: () => number | string | null
      }), 'my-module: view');
      return;
    }

    // Without the shell: a native sidebar entry plus the page it opens.
    ctx.effect(() => ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
      name: 'sidebar.panellist', id: 'my-module', order: 50, label: '我的模块',
    }, MyIcon)), 'my-module: sidebar entry');
    ctx.effect(() => ctx.slots.inject('main', () => ctx.slots.register(
      { name: 'main', key: 'my-module' }, MyView,
    )), 'my-module: main view');
  },
};
```

`registerView` returns a disposer; always wrap it in `ctx.effect` so the page
is unregistered when the plugin unloads. The standalone path uses the same
`main` key and `sidebar.panellist` id as the built-in panels, which is what
makes it appear in the native sidebar exactly like Plugins or Automations.

The shell page and the standalone page are **the same component**: do not read
`wb.tokens` / `wb.components` at render time. Copy the palette values into a
local fallback (they are plain `var(--dsw-alias-*)` strings) or use the CSS
variables directly, so the page renders identically on either path.

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
| package | `@<scope>/dsh-<module>` | `@philomelcc/dsh-downloads` |
| module id / view id | short kebab-case | `downloads` |
| client entry id | **the package name** | `@philomelcc/dsh-downloads` |
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

## Shipping a module

Every module — official or third-party — ships as its own npm package:

- name `@<scope>/dsh-<module>`, `publishConfig.access = "public"`, and a `files`
  list that carries every file the module loads at runtime;
- **verify it locally before publishing** (`dsh plugin add <dir>`, click the tab,
  check the console) — an npm version cannot be taken back cleanly, so iterate
  with a link while the UI is still moving;
- `npm publish --access public`;
- open a PR that adds a row to [registry.md](registry.md) so others can find it.

The full checklist — monorepo releases vs. a standalone repository, versioning,
and the pre-publish dry run — is in
[publishing.md](publishing.md#publishing-a-module-yours-or-a-new-official-one).

## Example and reference modules

`packages/port-monitor` is the smallest complete module, but it is `private` and
not published: it exists so the docs can point at a working package instead of
only a skeleton. Start a real module from `template/`.
`packages/status-monitor` and `packages/download-center` are the published
modules and show heavier pages (charts, task lists, subprocess engines).
