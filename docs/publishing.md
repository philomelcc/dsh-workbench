# Publishing

The four packages are published to npm under the `@philomelcc` scope. The shell
and the modules are independent packages — a module does not depend on the shell
in npm terms (the dependency is the runtime `workbench` service), so they can be
released separately.

## One-time setup

```powershell
npm login
npm whoami          # must print philomelcc
```

The scope must exist. A personal scope is created by publishing the first
package; an organization scope must be created on npmjs.com first.

## Before publishing

```powershell
pnpm install
npm run check
pnpm -r publish --dry-run --access public   # inspect what would ship
```

Check each package's `files` list in `package.json` — pnpm honours it, and a
missing entry (`lib/`, `chrome-extension/`) ships a broken module.

## Release

```powershell
pnpm -r publish --access public
```

Publish order does not matter for correctness (no inter-package dependencies),
but publishing the shell first reads better in the npm feed.

## Versioning

- Shell: bump `apiVersion` in `packages/workbench/client.js` **only** on a
  breaking contract change, and say so in the release notes.
- Modules: their own semver. A module may bump a minor version independently of
  the shell.
- Tag the repository after a release, e.g. `git tag workbench-v0.1.1` or
  `git tag status-monitor-v0.1.1`.

## After publishing

Update the readme of every package that mentions a specific version, and verify
the install path on a clean profile:

```powershell
dsh plugin --profile test add @philomelcc/dsh-workbench
dsh plugin --profile test add @philomelcc/dsh-status-monitor
```

## Publishing a module (yours or a new official one)

Every workbench module is an independent npm package, so a new module ships the
same way as the four in this repo. The rule is the same for us and for anyone
building on the contract:

1. **Scope and name**: `@your-scope/dsh-<module>`. The scope must exist on npm;
   a personal scope is created by the first publish.
2. **package.json**: `license`, `repository` (plus `directory` when the module
   lives inside a monorepo), a `files` list that includes everything the module
   loads at runtime (`lib/`, `chrome-extension/`, …), and
   `publishConfig: { "access": "public" }` — scoped packages are private by
   default.
3. **Verify locally before publishing.** `dsh plugin --profile test add <dir>`,
   click the tab, check the browser console, try the failure paths. An npm
   version cannot be withdrawn cleanly, so never publish something you have not
   run. While iterating, install with `link:` (or `dsh plugin add <dir>`) so
   client changes hot-reload without a publish.
4. **Publish**: `npm publish --access public`.
5. **Versioning**: a module has its own semver and is independent of the shell.
   A module built for `apiVersion 1` keeps working on any shell that still
   reports `1`; only a contract-breaking change requires a major bump.
6. **Register it**: add a row to [registry.md](registry.md) in a PR (how other
   people find it) and put the exact install command in your README.

When the module lives in this monorepo (`packages/<name>`), publish it together
with the root release (`pnpm -r publish`) and bump only that package's version.
When it lives in someone else's repo, steps 1–6 are still the whole procedure —
nothing here needs to change for a third-party module.
