# @philomelcc/dsh-workbench

外壳本体：顶部第二行的标签切换、每个模块一整页，以及模块注册用的那套小 API。

## 0.1.9 的变化

- 新增**功能开关**和**工作台设置页**（系统栏最左侧的 mark 图标）：主题切换、余额显示、重启按钮、进行中光效、单次消耗估计，都能单独关掉。
- 顶部第一行系统栏改为**镜像原生侧栏导航项**，任何注册 `sidebar.panellist` 的插件都会自动出现。
- 模块支持**无外壳运行**：没有工作台时自己注册到原生侧栏。
- 设置入口挪到左上角，工作台图标重绘为「带标签栏的面板」；`apiVersion` 仍是 `1`。

完整变更见 [CHANGELOG](https://github.com/philomelcc/dsh-workbench/blob/main/CHANGELOG.md)。

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
