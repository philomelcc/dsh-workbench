# @philomelcc/dsh-port-monitor

Reference workbench module — the smallest complete example in this repo. Use it
as the model when you build your own: one Host route, one page, one
`registerView`.

## Install

```powershell
dsh plugin --profile web add @philomelcc/dsh-workbench
dsh plugin --profile web add @philomelcc/dsh-port-monitor
```

## What it does

Lists listening TCP ports with their owning process, marks reachability, opens
HTTP services in the browser, and lets you star ports as "常用" (the status
monitor's port card shows starred ports first).

## Shape

```
index.js   Host: /wb/port-monitor/list  → { ok, at, ports: [{ port, pid, name, address, reachable, http }] }
client.js  Client: the page + registerView({ id: 'port-monitor' })
```

`index.js` is not called by the page through any shared code — it is a plain
`ctx.webServer.register` route, which is all a module needs to expose data.

MIT.
