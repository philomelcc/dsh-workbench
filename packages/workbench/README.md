# @philomelcc/dsh-workbench

The shell: a second top-bar row of workbench tabs, one page per module, plus the
small API modules register against.

This package does almost nothing on its own — install it together with at least
one module:

```powershell
dsh plugin --profile web add @philomelcc/dsh-workbench
dsh plugin --profile web add @philomelcc/dsh-status-monitor
```

Contract: [`docs/SPEC.md`](../../docs/SPEC.md) · module template: [`template/`](../../template) ·
ready-made modules: [status monitor](../status-monitor), [download center](../download-center).

What the shell provides:

- `registerView({ id, title, icon, component, order, subtitle, badge, tab })` —
  one tab, one full page;
- `components` (StatusDot, Card, SectionHeader, EmptyState, Spinner, Button, Field);
- `tokens` (theme colors that follow light/dark);
- `apiVersion` — `1` today;
- `refresh()` — repaint the tab row after a badge changed.

MIT.
