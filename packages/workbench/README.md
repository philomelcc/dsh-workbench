# @philomelcc/dsh-workbench

外壳本体：顶部第二行的标签切换、每个模块一整页，以及模块注册用的那套小 API。

## 0.1.11 / 0.1.12 的变化

- 设置页新增**栏位分配**：每个条目（原生侧栏项 + 工作台模块）都能放进系统栏、模块栏或隐藏，还能拖拽排序——注册只决定默认位置。设置页同时改成宽屏两列布局。
- **主题切换改为仅本窗口生效**：不再调用 `theme.setTheme` 写 Host 全局偏好，多开窗口互不影响。
- 新增内置功能**「推理档位滑条」**：把模型菜单的推理等级改成可拖动的分段卡扣滑条（拖动时隐藏光标、旋钮有按下反馈），冲进 max 时背后闪过一张大肥鱼剪影并迸出粒子。功能开关里可以关掉。
- 修复：纸色主题首帧颜色错乱、纸色下冷灰任务行、纸色下 logo 的 HARNESS 徽标黑底黑字、关闭「进行中光效」后原生转圈不恢复。

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

## 许可证

MIT。

## 素材与第三方协议

- 「推理档位滑条」移植自 [dsh-codex-effort-slider](https://github.com/Microqian2th/dsh-codex-effort-slider)（**MIT，© Microqian2th**），版权与协议声明保留在对应源码段。
- max 档闪现的大肥鱼剪影形象来自 **ZipZipPipe 的「大肥鱼」**，遵循 **CC BY-NC-SA 4.0**：仅限非商业使用，转载/修改需署名原作者并相同方式共享。**不要把这个素材用于商业用途**；商用请自行替换。
- 该剪影是作者原图（1152×2048 透明底立绘）的轮廓矢量提取，只在这个包的窗口内渲染。
