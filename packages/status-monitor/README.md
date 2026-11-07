# @philomelcc/dsh-status-monitor

工作台模块：四张实时卡片——磁盘、CPU/内存/GPU、端口、会话用量，每张都能放大到整个中央区域。

![状态监控](../../docs/screenshot.png)

## 安装

```powershell
dsh plugin --profile web add @philomelcc/dsh-workbench
dsh plugin --profile web add @philomelcc/dsh-status-monitor
```

重启 Web UI，模块会加出**状态监控**标签。

## 数据来源

| 卡片 | 来源 |
|---|---|
| 磁盘 | 逐卷 `fs.statfs` |
| CPU / 内存 | `os` 采样，2 秒一拍 |
| GPU | 有 `nvidia-smi` 时读取，没有就静默跳过 |
| 端口 | 自己的 `/wb/status/ports` 快路径（不走端口监控模块的慢扫描） |
| 用量 | 从本地会话日志折叠出的 token / 成本 |

采样都在 Host 半、Windows 上完成；端点挂在 `/wb/status/...` 下，只允许回环访问。

## 要求

完整功能需要 Windows（进程/磁盘遥测）。页面按卡片降级：某个端点挂了，只有那张卡显示「未接入」。

MIT。
