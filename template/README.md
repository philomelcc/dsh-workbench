# Module template

Copy this directory to start a workbench module. It already contains the minimum
a module needs: a bundle declaration, one patch row, a placeholder Host route and
a placeholder page.

## 1. Rename four things

| file | what to change |
|---|---|
| `package.json` | `name` → `@your-scope/dsh-<module>` |
| `cordis.patch.yml` | `id` → `<module>` (short), `name` → the package name |
| `client.js` | the `id:` at the very top → the package name |
| `client.js` | `registerView({ id, title, … })` → `<module>` + a human title |

The entry id and the package name must match — DSH resolves the bundle by that
string. View ids are short (`my-module`), package names are scoped
(`@your-scope/dsh-my-module`).

## 2. Fill in the halves

- `index.js` — Host half. Add `/wb/<module>/<verb>` routes; responses are
  `{ ok: true, at, … }`. Keep Node APIs here, never in `client.js`.
- `client.js` — Client half. Replace `MyView` with the page. It owns its layout
  (padding, scrolling); the shell gives it the whole central area.

## 3. Install and verify

```powershell
node --check index.js; node --check client.js
dsh plugin --profile web add <path to this folder>
```

Restart the Web UI, then click the new tab. `docs/SPEC.md` explains every field
and the rules the shell expects; `packages/port-monitor` is a complete example.
