window.__ModuleLoader__.load({
  id: '@philomelcc/dsh-port-monitor',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const PANEL_ID = 'port-monitor';
    const CONFIG_KEY = 'dsh-port-monitor:config';
    const API_PATH = '/wb/port-monitor/list';

    // The workbench API arrives in apply(); components only render after the
    // shell has registered them, so reading this at render time is safe.
    let wb = null;

    // ---------- persisted config: { pinned: string[], notes: { [port]: string } } ----------
    function readConfig() {
      try {
        const raw = window.localStorage.getItem(CONFIG_KEY);
        if (!raw) return { pinned: [], notes: {} };
        const parsed = JSON.parse(raw);
        return {
          pinned: Array.isArray(parsed.pinned) ? parsed.pinned.map(String) : [],
          notes: parsed && typeof parsed.notes === 'object' && parsed.notes ? parsed.notes : {},
        };
      } catch {
        return { pinned: [], notes: {} };
      }
    }

    function writeConfig(config) {
      try {
        window.localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
      } catch {
        /* storage unavailable: keep in memory for this page */
      }
    }

    const configStore = {
      value: readConfig(),
      listeners: new Set(),
      get() {
        return this.value;
      },
      set(next) {
        this.value = next;
        writeConfig(next);
        this.listeners.forEach((fn) => fn());
      },
      subscribe(fn) {
        this.listeners.add(fn);
        return () => this.listeners.delete(fn);
      },
    };

    function useConfig() {
      const [snap, setSnap] = React.useState(configStore.get());
      React.useEffect(
        () => configStore.subscribe(() => setSnap(configStore.get())),
        [],
      );
      return snap;
    }

    function setPinned(port, on) {
      const config = configStore.get();
      const key = String(port);
      const set = new Set(config.pinned);
      if (on) set.add(key);
      else set.delete(key);
      configStore.set({ ...config, pinned: Array.from(set) });
    }

    function setNote(port, note) {
      const config = configStore.get();
      const key = String(port);
      const notes = { ...config.notes };
      const trimmed = (note || '').trim();
      if (trimmed) notes[key] = trimmed;
      else delete notes[key];
      configStore.set({ ...config, notes });
    }

    // Default purpose hints for ports this machine is known to serve.
    // A note the user typed always wins; these only fill the empty case so the
    // panel reads like a map instead of a list of anonymous numbers.
    const KNOWN_PORTS = {
      // ---- 本机自建 ----
      3080: 'DSH WebUI',
      8090: 'DSH Drive',
      8082: '事务所附注 v0.16',
      8083: '事务所附注 dev',
      // fz-app/scripts/preview.ps1: 端口 = 8090 + 版本号（v0.6 -> 8096 ... v0.19 -> 8109）
      8096: '事务所附注 v0.6 预览',
      8097: '事务所附注 v0.7 预览',
      8098: '事务所附注 v0.8 预览',
      8099: '事务所附注 v0.9 预览',
      8100: '事务所附注 v0.10 预览',
      8101: '事务所附注 v0.11 预览',
      8102: '事务所附注 v0.12 预览',
      8103: '事务所附注 v0.13 预览',
      8104: '事务所附注 v0.14 预览',
      8105: '事务所附注 v0.15 预览',
      8106: '事务所附注 v0.16 预览',
      8107: '事务所附注 v0.17 预览',
      8108: '事务所附注 v0.18 预览',
      8109: '事务所附注 v0.19 预览',
      8084: 'FZNote',
      8085: 'FZNote',
      1198: 'LM Studio',
      1234: 'LM Studio',
      41343: 'LM Studio',
      12345: 'LM Studio 路由',
      20241: 'Cloudflare 隧道',
      // ---- 聊天 / 办公 ----
      4001: 'QQ 客户端',
      4301: 'QQ 客户端',
      4310: 'QQ 客户端',
      5283: 'QQ 客户端',
      9210: 'QQ 客户端',
      4012: '企业微信',
      4013: '企业微信',
      42050: 'OneDrive 同步',
      27015: 'Apple 设备服务',
      27018: 'CAJViewer',
      // ---- 游戏 / 外设 ----
      10325: 'Steam',
      10327: 'Steam',
      27036: 'Steam',
      9010: '罗技 G HUB',
      9080: '罗技 G HUB',
      45654: '罗技 G HUB',
      9100: '罗技 G HUB 更新',
      9180: '罗技 G HUB 更新',
      9012: '华硕 Armoury Crate',
      9013: '华硕 Armoury Crate',
      13010: '华硕 Armoury Crate',
      13031: '华硕 Armoury Crate',
      13032: '华硕 Armoury Crate',
      17532: '华硕 Armoury Crate',
      17945: '华硕 Armoury Crate',
      1042: '华硕服务',
      1043: '华硕服务',
      13030: 'ROG Live Service',
      22112: 'ROG Live Service',
      // ---- 加速器 / 远程 ----
      2013: '网易UU加速器',
      16301: '网易UU加速器',
      10501: '快车VPN',
      5939: 'TeamViewer',
      // ---- 系统 ----
      135: 'Windows RPC',
      139: 'NetBIOS 文件共享',
      445: 'SMB 文件共享',
      1024: 'Intel JHI 服务',
      1040: 'Windows 服务宿主',
      5040: 'Windows 连接设备平台',
      5354: 'Bonjour / mDNS',
      5357: 'WSDAPI 网络发现',
      7680: 'Windows 传递优化',
      49664: 'Windows RPC 动态端口',
      49665: 'Windows RPC 动态端口',
      49666: 'Windows RPC 动态端口',
      49667: 'Windows RPC 动态端口',
      49669: 'Windows RPC 动态端口',
      60328: '阿里安全服务',
    };

    function noteFor(port, config) {
      return config.notes[String(port)] || KNOWN_PORTS[port] || '';
    }

    // ---------- one shared port poller ----------
    function createPortsStore() {
      const store = {
        value: { loading: true, ports: [], error: null, at: null },
        listeners: new Set(),
        timer: null,
        async load() {
          try {
            const res = await fetch(API_PATH, { cache: 'no-store' });
            const json = await res.json();
            store.set({
              loading: false,
              ports: Array.isArray(json.ports) ? json.ports : [],
              error: json && json.ok === false ? json.error || '加载失败' : null,
              at: json.at || null,
            });
          } catch (err) {
            store.set({
              loading: false,
              ports: [],
              error: String((err && err.message) || err),
              at: null,
            });
          }
        },
        set(next) {
          store.value = next;
          store.listeners.forEach((fn) => fn());
        },
        subscribe(fn) {
          store.listeners.add(fn);
          return () => store.listeners.delete(fn);
        },
        start() {
          store.load();
          store.timer = setInterval(() => store.load(), 5000);
          return () => {
            if (store.timer) clearInterval(store.timer);
            store.timer = null;
          };
        },
      };
      return store;
    }

    const portsStore = createPortsStore();

    function usePorts() {
      const [snap, setSnap] = React.useState(portsStore.value);
      React.useEffect(
        () => portsStore.subscribe(() => setSnap(portsStore.value)),
        [],
      );
      return snap;
    }

    // ---------- helpers ----------
    // A process listening on both 0.0.0.0 and :: reports two rows for one port;
    // merge them so the panel shows one line per port.
    function dedupePorts(ports) {
      const byPort = new Map();
      for (const p of ports) {
        const key = String(p.port);
        const prev = byPort.get(key);
        if (!prev) {
          byPort.set(key, { ...p });
          continue;
        }
        byPort.set(key, {
          ...prev,
          reachable: Boolean(prev.reachable || p.reachable),
          http: Boolean(prev.http || p.http),
        });
      }
      return Array.from(byPort.values()).sort((a, b) => a.port - b.port);
    }

    function openHostFor(address) {
      if (address === '::' || address === '::1') return '[::1]';
      if (!address || address === '0.0.0.0' || address === '127.0.0.1') return '127.0.0.1';
      return address.includes(':') ? '[' + address + ']' : address;
    }

    function PortMonitorIcon(props) {
      const size = props.size || 20;
      return h('svg', {
        viewBox: '0 0 24 24',
        width: size,
        height: size,
        'aria-hidden': true,
        fill: 'none',
      },
        h('rect', {
          x: 7, y: 3, width: 10, height: 18, rx: 5,
          stroke: 'currentColor', strokeWidth: 1.6,
        }),
        h('circle', { cx: 12, cy: 8, r: 2, fill: 'currentColor', opacity: 0.32 }),
        h('circle', { cx: 12, cy: 13, r: 2, fill: 'currentColor', opacity: 0.32 }),
        h('circle', { cx: 12, cy: 18, r: 2, fill: wb ? wb.tokens.success : 'currentColor' }),
      );
    }

    // ---------- panel (registered through workbench.registerView) ----------
    function PortMonitorPanel() {
      const config = useConfig();
      const { loading, ports, error } = usePorts();
      const { StatusDot, Card, EmptyState, Spinner, Button, Field } = wb.components;

      const list = dedupePorts(ports);
      const pinnedSet = new Set(config.pinned);

      const header = h('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 16,
        },
      },
        h('h2', { style: { margin: 0, fontSize: 20, fontWeight: 650, lineHeight: 1.3 } }, '端口监控'),
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          h('span', { style: { fontSize: 12, color: wb.tokens.labelSecondary } },
            '点 ☆ 标记常用端口（状态监控页默认只显示这些）'),
          h(Button, { onClick: () => portsStore.load() }, '刷新'),
        ),
      );

      let body;
      if (loading && list.length === 0) {
        body = h('div', {
          style: { padding: '32px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 },
        },
          h(Spinner, { size: 14 }),
          h('span', { style: { color: wb.tokens.labelSecondary, fontSize: 13 } }, '正在扫描端口…'),
        );
      } else if (error) {
        body = h('div', {
          style: {
            padding: '24px 16px',
            color: wb.tokens.error,
            background: wb.tokens.bgLayer1,
            borderRadius: 10,
            border: '1px solid ' + wb.tokens.border1,
          },
        }, '扫描失败：' + error);
      } else if (list.length === 0) {
        body = h(EmptyState, { text: '没有检测到监听端口' });
      } else {
        body = h(Card, null,
          list.map((p) => {
            const key = String(p.port);
            const pinned = pinnedSet.has(key);
            return h('div', {
              key,
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 14px',
                borderBottom: '1px solid ' + wb.tokens.border1,
              },
            },
              h(StatusDot, {
                ok: p.reachable,
                title: p.reachable ? '可达' : '监听中但不可达',
              }),
              h('div', {
                style: { width: 58, fontWeight: 650, fontVariantNumeric: 'tabular-nums', flex: '0 0 auto' },
              }, key),
              h('div', { style: { flex: '0 0 auto', maxWidth: 220, minWidth: 0 } },
                h('div', { style: { display: 'flex', alignItems: 'baseline', gap: 6, minWidth: 0 } },
                  h('span', {
                    title: p.name || '(未知进程)',
                    style: { fontWeight: 550, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 },
                  }, p.name || '(未知进程)'),
                  p.pid
                    ? h('span', {
                      style: { fontSize: 11, color: wb.tokens.labelSecondary, whiteSpace: 'nowrap', flex: '0 0 auto' },
                    }, 'PID ' + p.pid)
                    : null,
                ),
              ),
              h(Field, {
                defaultValue: noteFor(p.port, config),
                placeholder: '备注用途…',
                onBlur: (e) => setNote(p.port, e.target.value),
                onKeyDown: (e) => { if (e.key === 'Enter') e.target.blur(); },
                style: { flex: '1 1 auto', minWidth: 60, width: 'auto' },
              }),
              p.http
                ? h(Button, {
                  small: true,
                  variant: 'ghost',
                  title: '在浏览器打开 http://' + openHostFor(p.address) + ':' + key + '/',
                  onClick: () => window.open(
                    'http://' + openHostFor(p.address) + ':' + key + '/',
                    '_blank',
                    'noopener',
                  ),
                }, '打开')
                : null,
              h('button', {
                onClick: () => setPinned(p.port, !pinned),
                title: pinned ? '取消标记' : '标记为常用端口',
                style: {
                  border: 'none',
                  background: 'transparent',
                  color: pinned ? wb.tokens.warn : wb.tokens.labelSecondary,
                  cursor: 'pointer',
                  fontSize: 16,
                  padding: '2px 4px',
                  flex: '0 0 auto',
                },
              }, pinned ? '★' : '☆'),
            );
          }),
        );
      }

      return h('div', {
        style: {
          padding: '24px 28px',
          maxWidth: 920,
          margin: '0 auto',
          height: '100%',
          boxSizing: 'border-box',
          overflowY: 'auto',
          color: wb.tokens.label,
          background: wb.tokens.bgBase,
        },
      },
        header,
        body,
      );
    }

    return {
      inject: ['slots', 'workbench'],
      apply(ctx) {
        const api = ctx.get('workbench');
        if (!api) {
          console.warn('[port-monitor] workbench service missing; registration skipped');
          return;
        }
        if (api.apiVersion !== 1) {
          console.warn('[port-monitor] needs workbench apiVersion 1, got ' + api.apiVersion + '; upgrade @philomelcc/dsh-workbench');
          return;
        }
        wb = api;

        // One shared poller for the panel.
        ctx.effect(() => portsStore.start(), 'port-monitor: poll');

        ctx.effect(() => wb.registerView({
          id: PANEL_ID,
          title: '端口监控',
          icon: PortMonitorIcon,
          component: PortMonitorPanel,
          order: 30,
          // 2026-11-04：入口并入「状态监控」页（放大卡片里有 ☆ 与备注编辑），
          // 本页不再占切换页 tab；Host 端点照常提供。
          tab: false,
        }), 'port-monitor: view');
      },
    };
  },
});
