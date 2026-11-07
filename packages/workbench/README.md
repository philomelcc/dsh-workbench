# @philomelcc/dsh-workbench

外壳本体：顶部第二行的标签切换、每个模块一整页，以及模块注册用的那套小 API。

它单独装没什么用——至少配一个模块：

```powershell
dsh plugin --profile web add @philomelcc/dsh-workbench
dsh plugin --profile web add @philomelcc/dsh-status-monitor
```

契约：[`docs/SPEC.md`](../../docs/SPEC.md) · 模板：[`template/`](../../template) ·
现成模块：[状态监控](../status-monitor)、[下载中心](../download-center)。

外壳提供：

- `registerView({ id, title, icon, component, order, subtitle, badge, tab })` —— 一个标签、一整页；
- `components`（StatusDot / Card / SectionHeader / EmptyState / Spinner / Button / Field）；
- `tokens`（跟随明暗主题的颜色 token）；
- `apiVersion` —— 目前是 `1`；
- `refresh()` —— 角标变化后重绘标签行。

MIT。
