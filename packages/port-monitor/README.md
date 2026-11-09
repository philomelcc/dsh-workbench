# @philomelcc/dsh-port-monitor

示例模块——仓库里最小的完整例子，`private: true`，**不发布到 npm**。自己写模块时照它抄：一个 Host 路由、一个页面、一次 `registerView`。

## 安装

```powershell
dsh plugin --profile web add @philomelcc/dsh-workbench
dsh plugin --profile web add @philomelcc/dsh-port-monitor
```

## 做什么

列出正在监听的 TCP 端口及所属进程，标记可达性，一键在浏览器里打开 HTTP 服务，还能把端口标成「常用」（状态监控的端口卡片会优先显示标星的）。

## 结构

```
index.js   Host：/wb/port-monitor/list → { ok, at, ports: [{ port, pid, name, address, reachable, http }] }
client.js  Client：页面 + registerView({ id: 'port-monitor' })
```

`index.js` 和页面之间没有任何共享代码——就是一个 `ctx.webServer.register` 路由，模块要暴露数据有这就够了。

MIT。
