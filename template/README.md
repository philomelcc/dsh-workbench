# 模块模板

复制这个目录来做新的工作台模块。里面已经有模块最少需要的东西：bundle 声明、一条 patch 记录、一个占位 Host 路由和一个占位页面。

## 1. 改四处名字

| 文件 | 改什么 |
|---|---|
| `package.json` | `name` → `@你的scope/dsh-<module>` |
| `cordis.patch.yml` | `id` → `<module>`（短名），`name` → 包名 |
| `client.js` | 最顶部的 `id:` → 包名 |
| `client.js` | 页面组件名 + 改名后的 `id`/`title`；`apply()` 里保留两条注册路径（有工作台 → `registerView`，没有 → `sidebar.panellist` + `main`） |

入口 id 和包名必须一致——DSH 用那个字符串解析 bundle。视图 id 是短名（`my-module`），包名带 scope（`@your-scope/dsh-my-module`）。

## 2. 填两半

- `index.js` —— Host 半。加 `/wb/<module>/<verb>` 路由，响应是 `{ ok: true, at, … }`。Node API 只放这里，别放进 `client.js`。
- `client.js` —— Client 半。把 `MyView` 换成你的页面。页面自己管布局（内边距、滚动），外壳把整个中央区域给它。

## 3. 安装并验证

```powershell
node --check index.js; node --check client.js
dsh plugin --profile web add <这个目录的路径>
```

重启 Web UI，点开新标签。`docs/SPEC.md` 讲了每个字段和外壳的规矩；`packages/port-monitor` 是完整例子。

## 4. 验证通过再发布

界面还在调的时候用 `dsh plugin add <目录>` 热载，别发版；确认能用之后才 `npm publish --access public`，并把一行登记加进 `docs/registry.md`。细节见 `docs/publishing.md`。
