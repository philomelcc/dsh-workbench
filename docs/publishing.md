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
