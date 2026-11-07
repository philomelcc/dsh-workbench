# @philomelcc/dsh-downloads

工作台模块：一个真正的下载队列——进度、暂停/继续/取消、磁力链接、Chrome 默认下载接管，以及每个会话下载过什么的记录。

## 安装

```powershell
dsh plugin --profile web add @philomelcc/dsh-workbench
dsh plugin --profile web add @philomelcc/dsh-downloads
```

重启 Web UI，模块会加出**下载**标签。

## 引擎

| 来源 | 引擎 |
|---|---|
| 磁力 / `.torrent` | aria2（DHT + LPD，`--seed-time=0`） |
| HTTP / HTTPS | 配了 API Key 时走迅雷 P2SP，否则 aria2 16 连接 |

本包**不自带 aria2**（GPLv2，5 MB 的二进制）。自己装好后模块会自动找到：

1. 环境变量 `ARIA2C_PATH` 指向可执行文件，或
2. 缓存副本 `~/.dsh/download-center/bin/aria2c[.exe]`，或
3. `winget install aria2.aria2` / `scoop install aria2` 后重启。

没有 aria2 时页面照样能开；磁力会给出可读错误，`/wb/downloads/health` 会说明原因。

迅雷引擎是**可选的，也不是依赖**（它带一个需要构建批准的原生模块）。有 API Key 就自己装：

```powershell
npm i @xunlei-open/dlsdk @xunlei-open/dlsdk-native-windows-x64
```

凭据放在 `~/.dsh/secrets/xunlei.txt`。没装 SDK 时磁力/HTTP 走 aria2，迅雷引擎给出可读错误，不影响页面。

## 端点

| 方法 | 路径 | 请求体 |
|---|---|---|
| GET | `/wb/downloads/list` | —（任务 + 统计） |
| GET | `/wb/downloads/history` | —（会话记录） |
| GET | `/wb/downloads/health` | —（引擎路径、默认目录） |
| POST | `/wb/downloads/create` | `{ url, dir?, fileName?, backend? }` |
| POST | `/wb/downloads/pause` · `resume` · `cancel` · `remove` | `{ id }` |
| POST | `/wb/downloads/open` | `{ id, kind: 'file' \| 'dir' }` |
| POST | `/wb/downloads/register` | `{ … }` —— 供 `fast_download` 工具登记 |

所有路由只接受回环访问。

## 结构

```
index.js            Host：上面的路由
client.js           Client：页面 + registerView('downloads')
lib/tasks.js        任务表、状态机、持久化、历史记录
lib/engines.js      aria2 / 迅雷子进程引擎与进度解析
lib/xunlei*.mjs     迅雷 worker（独立进程，dll 崩了不带走 host）
chrome-extension/   可选的 Chrome 默认下载接管扩展
test/               client 侧冒烟测试
```

MIT。aria2 和迅雷 SDK 保持各自许可。
