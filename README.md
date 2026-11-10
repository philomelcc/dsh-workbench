# DSH 工作台

![ci](https://github.com/philomelcc/dsh-workbench/actions/workflows/ci.yml/badge.svg)

给 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 加一层带标签页的工作区外壳。顶部第二行是工作台切换页，每个模块占一整页——状态监控、下载中心，或者你按同一份契约写的任何页面。

![工作台](docs/screenshot.png)

## 为什么

DeepSeek Harness 的 Web UI 以会话为中心。这个项目把它变成工作区：顶部固定系统栏（品牌、全局图标、账号、余额、重启），下面是工作台切换页，再往下是会话区。每个模块拿到中央区域的整页，左侧会话列表照常可用。

**导航分层是这套设计的核心。** 原生侧栏把两类东西塞进同一个列表：

- **系统级入口** —— 插件、自动化任务这类「管理正在运行的系统」的控制项；
- **应用级页面** —— 像状态监控、下载中心这样自己占满一整页的应用。

工作台把它们拆成两层：应用级页面注册成**模块**，出现在顶部第二行的模块栏；没有注册的插件留在**系统栏**——系统栏渲染的是原生侧栏导航项的镜像，点下去走的也是原生那条路径。

于是三类插件各得其所：

| 插件类型 | 入口 | 需要做什么 |
|---|---|---|
| 系统级（运行相关） | 系统栏 | 什么都不用做，保持 DSH 原生注册 |
| 应用级（整页应用） | 模块栏 | 注册成模块（见 [SPEC.md](docs/SPEC.md)） |
| 两者都没有 | 自然没有入口 | — |

这意味着**注册是可选的**：第三方插件不需要知道工作台存在也能正常工作；工作台也不需要维护一张插件清单，谁注册了模块栏就多一格。

外壳刻意做得很薄——只负责布局、标签行和几个 UI 原语。模块自己管数据、自己画页面，彼此不 import，只通过一个运行时服务跟外壳对话。

## 自带的额外功能

导航分层之外，外壳还带几样**可以单独关闭**的东西，入口是系统栏的齿轮（工作台设置）：

| 功能 | 默认 | 说明 |
|---|---|---|
| 主题切换 | 开 | 顶部栏的深色 / 浅色 / 纸色三个色块 |
| 余额显示 | 开 | 读 `remote.account` 的账户余额，点击去充值 |
| 重启按钮 | 开 | 一键重启 Web 宿主；**需要外部管理器**（计划任务或 `DSH_RESTART_CMD`），没有时按钮会提示而不是把服务关掉 |
| 进行中光效 | 开 | 会话运行中时，左侧列表行外的流动光效 |
| 单次消耗估计 | 开 | 每轮对话结束时显示这轮的 token 与费用估算 |

如果你只想要导航分层，其余交给别的插件——在设置页里把对应开关关掉就行，状态存在 `localStorage`，下次打开仍然生效。设置页同时列出**当前注册的模块**（它们就是第二行里的标签）。

## 包含的包

| 包 | 说明 |
|---|---|
| [`@philomelcc/dsh-workbench`](packages/workbench) | 外壳：模块 API、顶部栏、标签切换、总览页、公共组件 |
| [`@philomelcc/dsh-status-monitor`](https://github.com/philomelcc/dsh-status-monitor) | 磁盘 / 硬件 / 端口 / 用量四张卡片，支持放大到整页 |
| [`@philomelcc/dsh-downloads`](https://github.com/philomelcc/dsh-downloads) | 下载队列（aria2 + 迅雷双引擎）、磁力链接、会话下载记录 |

后两个是**独立仓库里的插件**，本仓库只提供外壳。它们不依赖外壳：装在工作台里就出现在顶部标签栏，没装工作台时自己就是原生侧栏里的入口。

另外 [`packages/port-monitor`](packages/port-monitor) 是仓库内的示例模块（`private: true`，不发 npm）：它演示一个最小完整的模块包长什么样，想直接复制的话用 [`template/`](template)。

## 安装

```powershell
dsh plugin --profile web add @philomelcc/dsh-workbench
dsh plugin --profile web add @philomelcc/dsh-status-monitor
dsh plugin --profile web add @philomelcc/dsh-downloads
```

装完重启一次 Web UI，标签就出现在顶部第二行。手动安装、故障排查见[《快速开始》](docs/getting-started.md)。

模块自己的额外依赖（比如下载中心要的 aria2）写在各自仓库的 README 里，装那个模块时再看。

## 写一个模块

完整契约就一页：[docs/SPEC.md](docs/SPEC.md)。

```js
const wb = ctx.get('workbench');
if (!wb || wb.apiVersion !== 1) return;

ctx.effect(() => wb.registerView({
  id: 'my-module',
  title: '我的模块',
  component: MyView,
  order: 50,
}), 'my-module: view');
```

从 [`template/`](template) 复制起步，或者直接读 [`packages/port-monitor`](packages/port-monitor) 这个最小完整例子（它不发布到 npm，只在仓库里当参考）。外壳和模块独立发版：按 `apiVersion 1` 写的模块，在仍然声明 `1` 的外壳上都能用。

## 仓库结构

```
packages/workbench         外壳
packages/port-monitor      示例模块（私有，不发布）
template/                  复制即用的模块起点
docs/                      契约、快速开始、模块登记、发布流程
scripts/check.mjs          对全部脚本跑 node --check
```

## 说明

- 主要面向 Windows：端口和磁盘采样读的是 Windows 数据。外壳和模块 API 本身跨平台。
- `npm run check` 对所有要发布的脚本做语法检查，CI 在 Linux 和 Windows 各跑一次。
- 插件装进 DSH 的 profile，不会改动 Harness 本体。
- 英文版 README 见 [README.en.md](README.en.md)。

## 许可证

MIT。
