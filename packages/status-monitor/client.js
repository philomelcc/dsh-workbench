window.__ModuleLoader__.load({
  id: '@philomelcc/dsh-status-monitor',
  factory(require) {
    const React = require('react');
    const ReactDOM = require('react-dom');
    const h = React.createElement;

    const VIEW_ID = 'status';
    const DISK_URL = '/wb/status-monitor/disk';
    const HARDWARE_URL = '/wb/status-monitor/hardware';
    const PROBE_URL = '/wb/status-monitor/probe';
    const PORTS_URL = '/wb/status-monitor/ports';
    const PORT_LIST_URL = '/wb/port-monitor/list';
    const USAGE_URL = '/wb/status-monitor/usage';
    const BUDGET_KEY = 'dsh-usage-stats:budget:v1';
    const DEFAULT_BUDGET = 50;
    const PORT_CONFIG_KEY = 'dsh-port-monitor:config';

    // Port purpose hints, copied from dsh-port-monitor's client half so the
    // card can show「DSH WebUI」instead of `node.exe`. A note the user typed in
    // the port-monitor page always wins; these only fill the empty case.
    // Keep in sync with DSH工作台/dsh-port-monitor/client.js 的 KNOWN_PORTS。
    const KNOWN_PORTS = {
      // ---- 本机自建 ----
      3080: 'DSH WebUI',
      8090: 'DSH Drive',
      8082: '事务所附注 v0.16',
      8083: '事务所附注 dev',
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

    const GB = 1024 ** 3;
    const MB = 1024 ** 2;
    const KB = 1024;
    const BJ_MS = 8 * 60 * 60 * 1000;
    const DAY_MS = 24 * 60 * 60 * 1000;

    // Theme tokens. Mirrors the shell's wb.tokens; keeping them as var() here
    // means the cards follow light/dark without re-reading the service.
    const C = {
      success: 'var(--dsw-alias-state-success-primary)',
      error: 'var(--dsw-alias-state-error-primary)',
      warn: 'var(--dsw-alias-state-warn-primary)',
      idle: 'var(--dsw-alias-state-idle-primary)',
      brand: 'var(--dsw-alias-brand-primary)',
      bgBase: 'var(--dsw-alias-bg-base)',
      bg1: 'var(--dsw-alias-bg-layer-1)',
      bg2: 'var(--dsw-alias-bg-layer-2)',
      bgOverlay: 'var(--dsw-alias-bg-overlay)',
      border1: 'var(--dsw-alias-border-l1)',
      border2: 'var(--dsw-alias-border-l2)',
      label: 'var(--dsw-alias-label-primary)',
      label2: 'var(--dsw-alias-label-secondary)',
    };

    let wb = null;

    // ---------- formatting ----------
    function fmtBytes(bytes, digits) {
      const n = Number(bytes);
      const d = digits === undefined ? 1 : digits;
      if (!Number.isFinite(n) || n <= 0) return '0 B';
      if (n >= 1024 ** 4) return (n / 1024 ** 4).toFixed(d) + ' TB';
      if (n >= GB) return (n / GB).toFixed(d) + ' GB';
      if (n >= MB) return (n / MB).toFixed(d) + ' MB';
      if (n >= KB) return (n / KB).toFixed(0) + ' KB';
      return n.toFixed(0) + ' B';
    }

    function fmtRate(bps) {
      const n = Number(bps) || 0;
      if (n >= MB) return (n / MB).toFixed(1) + ' MB/s';
      if (n >= KB) return (n / KB).toFixed(0) + ' KB/s';
      return n.toFixed(0) + ' B/s';
    }

    function fmtTokens(n) {
      const v = Number(n) || 0;
      if (v >= 1e8) return (v / 1e8).toFixed(2) + ' 亿';
      if (v >= 1e4) return (v / 1e4).toFixed(1) + ' 万';
      return String(Math.round(v));
    }

    function fmtTokensShort(n) {
      const v = Number(n) || 0;
      if (v >= 1e8) return (v / 1e8).toFixed(1) + '亿';
      if (v >= 1e4) return (v / 1e4).toFixed(0) + '万';
      return String(Math.round(v));
    }

    function fmtMoney(n) {
      const v = Number(n) || 0;
      if (v >= 100) return '¥' + v.toFixed(0);
      if (v >= 1) return '¥' + v.toFixed(2);
      if (v > 0) return '¥' + v.toFixed(4);
      return '¥0';
    }

    function fmtInt(n) {
      return (Number(n) || 0).toLocaleString('zh-CN');
    }

    function fmtPct(n, digits) {
      const v = Number(n);
      if (!Number.isFinite(v)) return '—';
      return v.toFixed(digits === undefined ? 1 : digits) + '%';
    }

    function fmtClock(ts) {
      if (!ts) return '—';
      const d = new Date(ts);
      const p = (v) => String(v).padStart(2, '0');
      return p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
    }

    function fmtStamp(ts) {
      if (!ts) return '—';
      const d = new Date(ts + BJ_MS);
      const p = (v) => String(v).padStart(2, '0');
      return (d.getUTCMonth() + 1) + '/' + d.getUTCDate() + ' ' + p(d.getUTCHours()) + ':' + p(d.getUTCMinutes());
    }

    function fmtDuration(sec) {
      const s = Math.max(0, Math.floor(Number(sec) || 0));
      const d = Math.floor(s / 86400);
      const hh = Math.floor((s % 86400) / 3600);
      const mm = Math.floor((s % 3600) / 60);
      if (d > 0) return d + ' 天 ' + hh + ' 小时';
      if (hh > 0) return hh + ' 小时 ' + mm + ' 分';
      return mm + ' 分';
    }

    // 对话性能用的短时长：保留一位小数。
    function fmtShortDuration(sec) {
      const s = Number(sec) || 0;
      if (s >= 3600) return (s / 3600).toFixed(1) + ' 小时';
      if (s >= 60) return (s / 60).toFixed(1) + ' 分';
      return s.toFixed(1) + ' 秒';
    }

    function monthKeyNow() {
      return new Date(Date.now() + BJ_MS).toISOString().slice(0, 7);
    }

    function usageTone(pct) {
      if (pct >= 90) return C.error;
      if (pct >= 75) return C.warn;
      return C.brand;
    }

    function diskTone(pct) {
      if (pct >= 95) return C.error;
      if (pct >= 88) return C.warn;
      return C.brand;
    }

    // ---------- http ----------
    async function fetchJson(url) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 12000);
      try {
        const res = await fetch(url, { cache: 'no-store', signal: controller.signal });
        let json = null;
        try {
          json = await res.json();
        } catch {
          json = null;
        }
        if (!res.ok || (json && json.ok === false)) {
          throw new Error((json && json.error) || ('HTTP ' + res.status));
        }
        return json || {};
      } finally {
        clearTimeout(timer);
      }
    }

    function loadDiskData() {
      return fetchJson(DISK_URL);
    }

    function loadHardwareData() {
      return fetchJson(HARDWARE_URL);
    }

    function loadUsageData() {
      return fetchJson(USAGE_URL);
    }

    // ---------- shared polling hook ----------
    // Last snapshots live at module scope: the view is unmounted whenever another
    // tab is selected, so without this every visit restarted from four spinners.
    const resourceCache = {
      disk: null,
      hardware: null,
      ports: null,
      usage: null,
    };

    function useResource(key, fetcher, intervalMs) {
      const cached = resourceCache[key];
      const [state, setState] = React.useState(() => (cached && cached.data
        ? { data: cached.data, error: null, loading: false, at: cached.at, scanning: false }
        : { data: null, error: null, loading: true, at: 0, scanning: false }));
      const fetchRef = React.useRef(fetcher);
      fetchRef.current = fetcher;

      const load = React.useCallback(async () => {
        try {
          const data = await fetchRef.current();
          if (data && data.loading) {
            // Usage stats still scanning: keep the last snapshot on screen.
            setState((prev) => ({ ...prev, scanning: true, at: Date.now() }));
            return;
          }
          const at = Date.now();
          resourceCache[key] = { data, at };
          setState({ data, error: null, loading: false, at, scanning: false });
        } catch (error) {
          setState((prev) => ({
            ...prev,
            error: String((error && error.message) || error),
            loading: false,
          }));
        }
      }, [key]);

      React.useEffect(() => {
        const tick = () => {
          if (!document.hidden) void load();
        };
        tick();
        const timer = setInterval(tick, intervalMs);
        const onVisible = () => {
          if (!document.hidden) void load();
        };
        document.addEventListener('visibilitychange', onVisible);
        return () => {
          clearInterval(timer);
          document.removeEventListener('visibilitychange', onVisible);
        };
      }, [load, intervalMs]);

      return { ...state, reload: load };
    }

    // ---------- port configuration (shared with the port-monitor page) ----------
    function readPortConfig() {
      try {
        const raw = window.localStorage.getItem(PORT_CONFIG_KEY);
        if (!raw) return { raw: {}, pinned: [], notes: {} };
        const parsed = JSON.parse(raw);
        return {
          raw: parsed && typeof parsed === 'object' ? parsed : {},
          pinned: parsed && Array.isArray(parsed.pinned) ? parsed.pinned.map(String) : [],
          notes: parsed && parsed.notes && typeof parsed.notes === 'object' ? parsed.notes : {},
        };
      } catch {
        return { raw: {}, pinned: [], notes: {} };
      }
    }

    // 用户自己写的备注优先，其次用内置用途表，最后交给进程名兜底。
    function noteFor(port, notes) {
      const key = String(port);
      return (notes && notes[key]) || KNOWN_PORTS[key] || '';
    }

    function setPinnedPort(port, on) {
      const config = readPortConfig();
      const key = String(port);
      const set = new Set(config.pinned);
      if (on) set.add(key);
      else set.delete(key);
      try {
        window.localStorage.setItem(
          PORT_CONFIG_KEY,
          JSON.stringify({ ...config.raw, pinned: Array.from(set) }),
        );
      } catch {
        /* storage unavailable: the next poll simply keeps the old selection */
      }
    }

    function setPortNote(port, note) {
      const config = readPortConfig();
      const key = String(port);
      const notes = { ...config.notes };
      const trimmed = (note || '').trim();
      if (trimmed) notes[key] = trimmed;
      else delete notes[key];
      try {
        window.localStorage.setItem(
          PORT_CONFIG_KEY,
          JSON.stringify({ ...config.raw, pinned: config.pinned, notes }),
        );
      } catch {
        /* storage unavailable */
      }
    }

    function copyText(text) {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          void navigator.clipboard.writeText(text).catch(() => {});
        }
      } catch {
        /* clipboard unavailable */
      }
    }

    function dedupePorts(ports) {
      const byPort = new Map();
      for (const item of ports || []) {
        const key = String(item.port);
        const prev = byPort.get(key);
        if (!prev) {
          byPort.set(key, { ...item });
          continue;
        }
        byPort.set(key, {
          ...prev,
          reachable: Boolean(prev.reachable || item.reachable),
          http: Boolean(prev.http || item.http),
        });
      }
      return Array.from(byPort.values()).sort((a, b) => a.port - b.port);
    }

    function openHostFor(address) {
      if (address === '::' || address === '::1') return '[::1]';
      if (!address || address === '0.0.0.0' || address === '127.0.0.1') return '127.0.0.1';
      return String(address).includes(':') ? '[' + address + ']' : address;
    }

    function portUrlFor(row) {
      return 'http://' + openHostFor(row.address) + ':' + row.port + '/';
    }

    async function loadPortsData() {
      const config = readPortConfig();
      const payload = {
        ok: true,
        at: Date.now(),
        list: [],
        listError: null,
        probeError: null,
        source: 'status-monitor',
        pinned: config.pinned,
        notes: config.notes,
        probes: {},
      };

      // The status monitor's own inventory first: it is fast (~0.5s) where the
      // port-monitor route can spend seconds in Get-NetTCPConnection.
      try {
        const json = await fetchJson(PORTS_URL);
        payload.list = dedupePorts(json.ports);
        if (Array.isArray(json.warnings) && json.warnings.length) payload.warnings = json.warnings;
      } catch (error) {
        payload.listError = String((error && error.message) || error);
        try {
          const json = await fetchJson(PORT_LIST_URL);
          payload.list = dedupePorts(json.ports);
          payload.listError = null;
          payload.source = 'port-monitor';
        } catch (fallbackError) {
          payload.listError = String((fallbackError && fallbackError.message) || fallbackError);
        }
      }

      const pinnedPorts = config.pinned
        .map((value) => Number(value))
        .filter((value) => Number.isInteger(value) && value > 0);
      const extraPorts = payload.list.slice(0, 12).map((item) => item.port);
      const targets = Array.from(new Set([...pinnedPorts, ...extraPorts])).slice(0, 16);

      if (targets.length > 0) {
        try {
          const json = await fetchJson(PROBE_URL + '?ports=' + targets.join(','));
          const map = {};
          for (const item of json.results || []) map[String(item.port)] = item;
          payload.probes = map;
        } catch (error) {
          payload.probeError = String((error && error.message) || error);
        }
      }

      if (payload.list.length === 0 && config.pinned.length === 0 && payload.listError) {
        throw new Error(payload.listError);
      }
      return payload;
    }

    function buildPortRows(data) {
      if (!data) return [];
      const notes = data.notes || {};
      const probes = data.probes || {};
      const list = data.list || [];
      const pinnedKeys = data.pinned || [];
      const byPort = new Map(list.map((item) => [String(item.port), item]));
      const rows = [];

      for (const key of pinnedKeys) {
        const port = Number(key);
        if (!Number.isInteger(port) || port <= 0) continue;
        const info = byPort.get(key) || null;
        const probe = probes[key] || null;
        rows.push({
          port,
          pinned: true,
          missing: !info,
          probed: Boolean(probe),
          name: info ? info.name : '',
          pid: info ? info.pid : null,
          address: info ? info.address : '',
          http: probe ? Boolean(probe.http) : Boolean(info && info.http),
          reachable: probe ? Boolean(probe.reachable) : Boolean(info && info.reachable),
          status: probe ? probe.status : null,
          ms: probe ? probe.ms : null,
          error: probe ? probe.error : null,
          note: noteFor(port, notes),
        });
      }

      for (const info of list) {
        const key = String(info.port);
        if (pinnedKeys.includes(key)) continue;
        const probe = probes[key] || null;
        rows.push({
          port: info.port,
          pinned: false,
          missing: false,
          probed: Boolean(probe),
          name: info.name || '',
          pid: info.pid || null,
          address: info.address || '',
          http: Boolean(info.http),
          reachable: probe ? Boolean(probe.reachable) : Boolean(info.reachable),
          status: probe ? probe.status : null,
          ms: probe ? probe.ms : null,
          error: probe ? probe.error : null,
          note: noteFor(info.port, notes),
        });
      }
      return rows;
    }

    // ---------- usage helpers ----------
    function buildDays(timeline, count) {
      const byDay = new Map();
      for (const row of timeline || []) byDay.set(row.day, row);
      const end = Date.now() + BJ_MS;
      const days = [];
      for (let i = count - 1; i >= 0; i -= 1) {
        const key = new Date(end - i * DAY_MS).toISOString().slice(0, 10);
        const row = byDay.get(key);
        days.push({
          day: key,
          input: row ? row.input : 0,
          output: row ? row.output : 0,
          cacheRead: row ? row.cacheRead : 0,
          cacheWrite: row ? row.cacheWrite : 0,
          total: row ? row.total : 0,
          cost: row ? row.cost : 0,
          calls: row ? row.calls : 0,
        });
      }
      return days;
    }

    function sumBy(rows, key) {
      return rows.reduce((acc, row) => acc + (Number(row[key]) || 0), 0);
    }

    // The usage-stats page owns the budget key; the tab is hidden now, so the
    // expanded usage card reads and writes the very same value.
    function readBudget() {
      try {
        const value = Number(window.localStorage.getItem(BUDGET_KEY));
        if (Number.isFinite(value) && value > 0) return value;
      } catch {
        /* storage unavailable */
      }
      return DEFAULT_BUDGET;
    }

    function writeBudget(value) {
      const next = Number.isFinite(value) && value > 0 ? value : 0;
      try {
        window.localStorage.setItem(BUDGET_KEY, String(next));
      } catch {
        /* keep it in memory */
      }
      return next;
    }

    // ---------- styles ----------
    const STYLE_TEXT = [
      '.wbsm-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); grid-auto-rows: minmax(0, 1fr); gap: 16px; flex: 1 1 auto; min-height: 0; }',
      '@media (max-width: 980px) { .wbsm-grid { grid-template-columns: minmax(0, 1fr); grid-auto-rows: minmax(260px, auto); } }',
      '.wbsm-card { transition: border-color .18s ease, box-shadow .18s ease, background .18s ease; }',
      '.wbsm-card:hover { border-color: var(--dsw-alias-border-l2); box-shadow: 0 10px 28px rgba(0, 0, 0, .10); }',
      '.wbsm-iconbtn { border: none; background: transparent; color: var(--dsw-alias-label-secondary); cursor: pointer; border-radius: 7px; display: inline-flex; align-items: center; justify-content: center; padding: 4px; line-height: 1; transition: background .15s ease, color .15s ease; }',
      '.wbsm-iconbtn:hover { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); }',
      '.wbsm-iconbtn:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }',
      '.wbsm-btn { cursor: pointer; border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); border-radius: 8px; padding: 5px 12px; font-size: 12px; font-family: inherit; transition: border-color .15s ease, background .15s ease; }',
      '.wbsm-btn:hover { border-color: var(--dsw-alias-border-l2); }',
      '.wbsm-btn:disabled { opacity: .5; cursor: default; }',
      '.wbsm-chip { transition: border-color .18s ease, transform .18s ease, box-shadow .18s ease; }',
      '.wbsm-chip:hover { border-color: var(--dsw-alias-brand-primary); transform: translateY(-1px); box-shadow: 0 8px 20px rgba(0, 0, 0, .12); }',
      '.wbsm-chip:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }',
      '.wbsm-scroll::-webkit-scrollbar { width: 8px; height: 8px; }',
      '.wbsm-scroll::-webkit-scrollbar-thumb { background: var(--dsw-alias-border-l2); border-radius: 999px; }',
      '.wbsm-scroll::-webkit-scrollbar-track { background: transparent; }',
      '.wbsm-spinner { display: inline-block; width: 11px; height: 11px; border: 2px solid var(--dsw-alias-border-l2); border-top-color: var(--dsw-alias-brand-primary); border-radius: 50%; animation: wbsm-spin .8s linear infinite; }',
      '@keyframes wbsm-spin { to { transform: rotate(360deg); } }',
      '.wbsm-fade { animation: wbsm-fade .26s ease both; }',
      '@keyframes wbsm-fade { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: none; } }',
    ].join('\n');

    function useStyles() {
      React.useEffect(() => {
        const stale = document.querySelectorAll('style[data-plugin="dsh-status-monitor"]');
        stale.forEach((node) => node.remove());
        const el = document.createElement('style');
        el.setAttribute('data-plugin', 'dsh-status-monitor');
        el.textContent = STYLE_TEXT;
        document.head.appendChild(el);
      }, []);
    }

    // ---------- icons ----------
    function svgBox(size, children, extra) {
      return h('svg', {
        viewBox: '0 0 24 24',
        width: size,
        height: size,
        'aria-hidden': true,
        fill: 'none',
        ...(extra || {}),
      }, children);
    }

    function StatusIcon(props) {
      const size = (props && props.size) || 20;
      return svgBox(size, [
        h('rect', { key: 'a', x: 3.2, y: 3.2, width: 7.4, height: 7.4, rx: 1.7, stroke: 'currentColor', strokeWidth: 1.5 }),
        h('rect', { key: 'b', x: 13.4, y: 3.2, width: 7.4, height: 7.4, rx: 1.7, stroke: 'currentColor', strokeWidth: 1.5, opacity: 0.55 }),
        h('rect', { key: 'c', x: 3.2, y: 13.4, width: 7.4, height: 7.4, rx: 1.7, stroke: 'currentColor', strokeWidth: 1.5, opacity: 0.55 }),
        h('path', { key: 'd', d: 'M13.6 20.4h2.7v-3.1h2.8v-2.6h1.6', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
      ]);
    }

    function DiskIcon(size) {
      return svgBox(size || 16, [
        h('ellipse', { key: 'a', cx: 12, cy: 6, rx: 7, ry: 3, stroke: 'currentColor', strokeWidth: 1.5 }),
        h('path', { key: 'b', d: 'M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6', stroke: 'currentColor', strokeWidth: 1.5 }),
        h('path', { key: 'c', d: 'M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3', stroke: 'currentColor', strokeWidth: 1.5, opacity: 0.6 }),
      ]);
    }

    function CpuIcon(size) {
      return svgBox(size || 16, [
        h('rect', { key: 'a', x: 6, y: 6, width: 12, height: 12, rx: 2, stroke: 'currentColor', strokeWidth: 1.5 }),
        h('rect', { key: 'b', x: 9.5, y: 9.5, width: 5, height: 5, rx: 1, stroke: 'currentColor', strokeWidth: 1.4, opacity: 0.7 }),
        h('path', { key: 'c', d: 'M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round' }),
      ]);
    }

    // 与 dsh-port-monitor 的 tab 图标一致：竖圆角矩形 + 三个点位，最下面亮起。
    function PortIcon(size) {
      return svgBox(size || 16, [
        h('rect', { key: 'a', x: 7, y: 3, width: 10, height: 18, rx: 5, stroke: 'currentColor', strokeWidth: 1.6 }),
        h('circle', { key: 'b', cx: 12, cy: 8, r: 2, fill: 'currentColor', opacity: 0.32 }),
        h('circle', { key: 'c', cx: 12, cy: 13, r: 2, fill: 'currentColor', opacity: 0.32 }),
        h('circle', { key: 'd', cx: 12, cy: 18, r: 2, fill: C.success }),
      ]);
    }

    function ChartIcon(size) {
      return svgBox(size || 16, [
        h('path', { key: 'a', d: 'M4 20V10M10 20V5M16 20v-7M22 20H2', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' }),
      ]);
    }

    function ExpandIcon(size) {
      return svgBox(size || 15, [
        h('path', { key: 'a', d: 'M9 4H4v5M4 4l6 6', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }),
        h('path', { key: 'b', d: 'M15 20h5v-5M20 20l-6-6', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }),
      ]);
    }

    function CloseIcon(size) {
      return svgBox(size || 18, [
        h('path', { key: 'a', d: 'M6 6l12 12M18 6L6 18', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' }),
      ]);
    }

    function CopyIcon(size) {
      return svgBox(size || 11, [
        h('rect', { key: 'a', x: 9, y: 9, width: 11, height: 11, rx: 2.2, stroke: 'currentColor', strokeWidth: 1.6 }),
        h('path', { key: 'b', d: 'M5.5 15V6a2 2 0 0 1 2-2H15', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' }),
      ]);
    }

    function RefreshIcon(size) {
      return svgBox(size || 14, [
        h('path', { key: 'a', d: 'M20 11a8 8 0 1 0-2.3 6.4', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' }),
        h('path', { key: 'b', d: 'M20 4.5V11h-6.4', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }),
      ]);
    }

    // ---------- small atoms ----------
    function Bar(props) {
      const width = Math.max(0, Math.min(100, Number(props.pct) || 0));
      return h('div', {
        style: {
          height: props.height || 5,
          borderRadius: 999,
          background: C.bg2,
          overflow: 'hidden',
          width: '100%',
          flex: '0 0 auto',
        },
      }, h('div', {
        style: {
          width: width + '%',
          height: '100%',
          borderRadius: 999,
          background: props.color || C.brand,
          transition: 'width .3s ease',
        },
      }));
    }

    function Stat(props) {
      return h('div', {
        style: {
          border: '1px solid ' + C.border1,
          borderRadius: 10,
          background: C.bg2,
          padding: '10px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          minWidth: 0,
        },
      },
        h('div', { style: { fontSize: 10.5, color: C.label2, letterSpacing: 0.2 } }, props.label),
        h('div', {
          style: {
            fontSize: props.compact ? 16 : 19,
            fontWeight: 700,
            lineHeight: 1.25,
            fontVariantNumeric: 'tabular-nums',
            color: props.color || C.label,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        }, props.value),
        props.sub
          ? h('div', {
            style: {
              fontSize: 10.5,
              color: C.label2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          }, props.sub)
          : null,
        props.children || null,
      );
    }

    function Tile(props) {
      return h('div', {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          minWidth: 0,
          minHeight: 62,
          padding: '8px 10px',
          border: '1px solid ' + C.border1,
          borderRadius: 10,
          background: C.bg2,
          justifyContent: 'center',
          overflow: 'visible',
        },
      },
        h('div', { style: { fontSize: 10.5, color: C.label2 } }, props.label),
        h('div', {
          style: {
            fontSize: props.small ? 13 : 15,
            fontWeight: 650,
            fontVariantNumeric: 'tabular-nums',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        }, props.value),
        props.pct === null || props.pct === undefined
          ? null
          : h(Bar, { pct: props.pct, color: props.color, height: 4 }),
        props.sub
          ? h('div', {
            style: {
              fontSize: 10,
              color: C.label2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          }, props.sub)
          : null,
      );
    }

    function LoadingBlock(props) {
      return h('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '14px 2px',
          fontSize: 12,
          color: C.label2,
        },
      },
        h('span', { className: 'wbsm-spinner' }),
        props.text || '读取中…',
      );
    }

    function ErrorBlock(props) {
      return h('div', {
        style: { padding: '12px 2px', display: 'flex', flexDirection: 'column', gap: 8 },
      },
        h('div', { style: { fontSize: 12, color: C.error, lineHeight: 1.5 } },
          (props.title || '暂不可用') + '：' + props.error),
        props.onRetry
          ? h('button', { className: 'wbsm-btn', onClick: props.onRetry, style: { alignSelf: 'flex-start' } }, '重试')
          : null,
      );
    }

    function EmptyBlock(props) {
      return h('div', {
        style: {
          padding: '18px 6px',
          fontSize: 12,
          color: C.label2,
          lineHeight: 1.7,
          textAlign: 'center',
          whiteSpace: 'pre-line',
        },
      }, props.text);
    }

    function SparkBars(props) {
      const days = props.days || [];
      const key = props.valueKey || 'total';
      const max = Math.max(1, ...days.map((day) => Number(day[key]) || 0));
      return h('div', {
        style: {
          display: 'flex',
          alignItems: 'flex-end',
          gap: 4,
          height: props.height || 56,
          width: '100%',
        },
      }, days.map((day) => {
        const value = Number(day[key]) || 0;
        return h('div', {
          key: day.day,
          title: day.day + ' · ' + fmtTokens(day.total) + ' tokens · ' + fmtMoney(day.cost),
          style: { flex: '1 1 0', minWidth: 0, height: '100%', display: 'flex', alignItems: 'flex-end' },
        }, h('div', {
          style: {
            width: '100%',
            height: value > 0 ? Math.max(4, (value / max) * 100) + '%' : '2px',
            borderRadius: '3px 3px 0 0',
            background: value > 0 ? (props.color || C.brand) : C.border1,
            opacity: value > 0 ? 0.85 : 0.45,
            transition: 'height .3s ease',
          },
        }));
      }));
    }

    function Sparkline(props) {
      const values = (props.points || []).filter((v) => typeof v === 'number' && Number.isFinite(v));
      const height = props.height || 40;
      if (values.length < 2) {
        return h('div', { style: { height, borderRadius: 6, background: C.bg2 } });
      }
      const coords = values.map((value, index) => {
        const x = (index / (values.length - 1)) * 100;
        const y = 100 - (Math.max(0, Math.min(100, value)) / 100) * 100;
        return x.toFixed(2) + ',' + y.toFixed(2);
      }).join(' ');
      return h('svg', {
        viewBox: '0 0 100 100',
        preserveAspectRatio: 'none',
        style: { width: '100%', height, display: 'block', overflow: 'visible' },
      }, h('polyline', {
        points: coords,
        fill: 'none',
        stroke: props.color || C.brand,
        strokeWidth: 2,
        vectorEffect: 'non-scaling-stroke',
        strokeLinejoin: 'round',
        strokeLinecap: 'round',
      }));
    }

    // ---------- disk body ----------
    function VolumeRow(props) {
      const volume = props.volume;
      const name = volume.label || (volume.id === 'C:' ? '系统盘' : '本地磁盘');
      const kindText = volume.kind === 'removable'
        ? '可移动磁盘'
        : (volume.kind === 'fixed' ? '本地磁盘' : '');
      const meta = [volume.filesystem, kindText].filter(Boolean).join(' · ');
      return h('div', {
        style: { display: 'flex', flexDirection: 'column', gap: 5, minWidth: 0 },
      },
        h('div', { style: { display: 'flex', alignItems: 'baseline', gap: 8, minWidth: 0 } },
          h('span', {
            style: {
              fontSize: 12.5,
              fontWeight: 650,
              fontVariantNumeric: 'tabular-nums',
              flex: '0 0 auto',
            },
          }, volume.id),
          h('span', {
            style: {
              fontSize: 11.5,
              color: C.label2,
              flex: '1 1 auto',
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
          }, name),
          h('span', {
            style: { fontSize: 11.5, color: C.label2, flex: '0 0 auto', fontVariantNumeric: 'tabular-nums' },
          }, '剩 ' + fmtBytes(volume.freeBytes)),
        ),
        h(Bar, { pct: volume.usedPct, color: diskTone(volume.usedPct), height: props.full ? 8 : 5 }),
        h('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            gap: 10,
            fontSize: 10.5,
            color: C.label2,
            fontVariantNumeric: 'tabular-nums',
          },
        },
          h('span', null, '已用 ' + fmtBytes(volume.usedBytes) + ' / ' + fmtBytes(volume.totalBytes)),
          h('span', null, fmtPct(volume.usedPct)),
        ),
        props.full && meta
          ? h('div', { style: { fontSize: 10.5, color: C.label2 } }, meta + ' · 可用 ' + fmtPct(volume.freePct))
          : null,
      );
    }

    function DiskBody(props) {
      const data = props.data;
      const volumes = data && Array.isArray(data.volumes) ? data.volumes : [];

      if (!data) {
        if (props.error) return h(ErrorBlock, { title: '磁盘', error: props.error, onRetry: props.onRetry });
        return h(LoadingBlock, { text: '读取磁盘信息…' });
      }
      if (volumes.length === 0) return h(EmptyBlock, { text: '没有读取到磁盘卷' });

      if (!props.full) {
        return h('div', { style: { display: 'flex', flexDirection: 'column', gap: 11, minHeight: 0 } },
          volumes.map((volume) => h('div', {
            key: volume.id,
            style: { flex: '1 1 0', minHeight: 56, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
          }, h(VolumeRow, { volume }))),
          data.warnings && data.warnings.length
            ? h('div', { style: { fontSize: 10, color: C.label2, opacity: 0.8 } }, data.warnings.join('；'))
            : null,
        );
      }

      const totalBytes = sumBy(volumes, 'totalBytes');
      const usedBytes = sumBy(volumes, 'usedBytes');
      const freeBytes = sumBy(volumes, 'freeBytes');

      return h('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.65fr) minmax(0, 1fr)',
          gap: 16,
          alignItems: 'start',
        },
      },
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 } },
          volumes.map((volume) => h('div', {
            key: volume.id,
            style: {
              border: '1px solid ' + C.border1,
              borderRadius: 10,
              background: C.bg2,
              padding: '13px 15px',
            },
          }, h(VolumeRow, { volume, full: true }))),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 } },
          h(Stat, { label: '总容量', value: fmtBytes(totalBytes), sub: volumes.length + ' 个卷' }),
          h(Stat, { label: '已用', value: fmtBytes(usedBytes), sub: fmtPct(totalBytes > 0 ? (usedBytes / totalBytes) * 100 : 0) }),
          h(Stat, { label: '剩余可用', value: fmtBytes(freeBytes), sub: fmtPct(totalBytes > 0 ? (freeBytes / totalBytes) * 100 : 0) }),
          h('div', {
            style: {
              border: '1px solid ' + C.border1,
              borderRadius: 10,
              background: C.bg2,
              padding: '11px 13px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              fontSize: 10.5,
              color: C.label2,
              lineHeight: 1.7,
            },
          },
            h('div', null, '采样时间 ' + fmtClock(data.at)),
            h('div', null, '数据来自本机卷统计，10 秒刷新一次'),
            data.warnings && data.warnings.length
              ? h('div', { style: { color: C.warn } }, '提示：' + data.warnings.join('；'))
              : null,
          ),
        ),
      );
    }

    // ---------- hardware body ----------
    function hardwareTileProps(hardware) {
      const cpu = hardware.cpu || {};
      const memory = hardware.memory || {};
      const network = hardware.network || {};
      const gpu = hardware.gpu || {};
      const device = (gpu.devices || [])[0] || null;

      const gpuValue = device
        ? (device.utilizationPct === null || device.utilizationPct === undefined
          ? '—'
          : Math.round(device.utilizationPct) + '%')
        : (gpu.available === false ? '未检测到' : '—');

      const gpuSub = device
        ? device.name
        : (gpu.error ? 'nvidia-smi 不可用' : '正在检测…');

      return [
        {
          label: 'CPU',
          value: cpu.usagePct === null || cpu.usagePct === undefined ? '—' : fmtPct(cpu.usagePct),
          pct: cpu.usagePct,
          color: usageTone(cpu.usagePct),
          sub: (cpu.cores || 0) + ' 核 · DSH ' + fmtPct(cpu.processCpuPct, 1),
        },
        {
          label: '内存',
          value: fmtBytes(memory.usedBytes) + ' / ' + fmtBytes(memory.totalBytes),
          pct: memory.usedPct,
          color: usageTone(memory.usedPct),
          sub: fmtPct(memory.usedPct) + ' 已用 · 剩 ' + fmtBytes(memory.freeBytes),
          small: true,
        },
        {
          label: '网络',
          value: network.available ? '↓ ' + fmtRate(network.downBps) : '—',
          pct: null,
          sub: network.available ? '↑ ' + fmtRate(network.upBps) : (network.error || '未接入'),
          small: true,
        },
        {
          label: 'GPU',
          value: gpuValue,
          pct: device && device.utilizationPct !== null ? device.utilizationPct : null,
          color: usageTone(device && device.utilizationPct),
          sub: gpuSub,
          small: true,
        },
      ];
    }

    function HardwareBody(props) {
      const data = props.data;
      if (!data) {
        if (props.error) return h(ErrorBlock, { title: '硬件', error: props.error, onRetry: props.onRetry });
        return h(LoadingBlock, { text: '采样硬件状态…' });
      }

      const cpu = data.cpu || {};
      const memory = data.memory || {};
      const network = data.network || {};
      const gpu = data.gpu || {};
      const devices = Array.isArray(gpu.devices) ? gpu.devices : [];
      const history = Array.isArray(data.history) ? data.history : [];

      if (!props.full) {
        return h('div', {
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gridAutoRows: 'minmax(64px, auto)',
            gap: 8,
            height: '100%',
            minHeight: 0,
          },
        }, hardwareTileProps(data).map((tile) => h(Tile, { key: tile.label, ...tile })));
      }

      const perCore = Array.isArray(cpu.perCore) ? cpu.perCore : [];
      const cpuHistory = history.map((point) => point.cpu);

      return h('div', { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
        h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 } },
          hardwareTileProps(data).map((tile) => h(Stat, {
            key: tile.label,
            label: tile.label,
            value: tile.value,
            sub: tile.sub,
            compact: true,
            color: tile.label === 'CPU' || tile.label === '内存' ? (tile.color || C.label) : C.label,
          })),
        ),
        h('div', { style: { fontSize: 11, color: C.label2 } },
          (cpu.model || 'CPU') + ' · ' + (cpu.cores || 0) + ' 核 · 系统已运行 ' + fmtDuration(data.uptimeSec) +
          ' · 主机 ' + (data.hostname || '—')),
        h('div', { style: { display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 14 } },
          h('div', {
            style: { border: '1px solid ' + C.border1, borderRadius: 10, background: C.bg2, padding: '12px 14px', minWidth: 0 },
          },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 8 } },
              h('div', { style: { fontSize: 12, fontWeight: 650 } }, 'CPU 使用率'),
              h('div', { style: { fontSize: 11, color: C.label2, fontVariantNumeric: 'tabular-nums' } },
                'DSH 进程 ' + fmtPct(cpu.processCpuPct) + ' · 常驻 ' + fmtBytes(cpu.processRssBytes)),
            ),
            h('div', { style: { fontSize: 30, fontWeight: 700, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums', color: usageTone(cpu.usagePct), marginBottom: 6 } },
              cpu.usagePct === null || cpu.usagePct === undefined ? '—' : cpu.usagePct.toFixed(1) + '%'),
            h(Bar, { pct: cpu.usagePct, color: usageTone(cpu.usagePct), height: 6 }),
            h('div', { style: { display: 'flex', flexDirection: 'column', gap: 4, marginTop: 10 } },
              h('div', { style: { fontSize: 10.5, color: C.label2 } },
                '每 1 秒采样 · 保留最近 ' + history.length + ' 个点'),
              h(Sparkline, { points: cpuHistory, height: 56, color: C.brand }),
            ),
          ),
          h('div', {
            style: { border: '1px solid ' + C.border1, borderRadius: 10, background: C.bg2, padding: '12px 14px', minWidth: 0 },
          },
            h('div', { style: { fontSize: 12, fontWeight: 650, marginBottom: 8 } }, '内存'),
            h('div', { style: { fontSize: 24, fontWeight: 700, fontVariantNumeric: 'tabular-nums', lineHeight: 1.15 } },
              fmtPct(memory.usedPct)),
            h(Bar, { pct: memory.usedPct, color: usageTone(memory.usedPct), height: 6 }),
            h('div', { style: { display: 'flex', flexDirection: 'column', gap: 3, marginTop: 8, fontSize: 11, color: C.label2 } },
              h('div', null, '已用 ', h('span', { style: { color: C.label, fontVariantNumeric: 'tabular-nums' } }, fmtBytes(memory.usedBytes))),
              h('div', null, '空闲 ', h('span', { style: { color: C.label, fontVariantNumeric: 'tabular-nums' } }, fmtBytes(memory.freeBytes))),
              h('div', null, '总计 ', h('span', { style: { color: C.label, fontVariantNumeric: 'tabular-nums' } }, fmtBytes(memory.totalBytes))),
            ),
          ),
        ),
        h('div', { style: { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 14 } },
          h('div', {
            style: { border: '1px solid ' + C.border1, borderRadius: 10, background: C.bg2, padding: '12px 14px', minWidth: 0 },
          },
            h('div', { style: { fontSize: 12, fontWeight: 650, marginBottom: 8 } }, '网络'),
            network.available
              ? h('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
                h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
                  h('div', { style: { fontSize: 13, fontVariantNumeric: 'tabular-nums' } }, '↓ ' + fmtRate(network.downBps)),
                  h('div', { style: { fontSize: 13, fontVariantNumeric: 'tabular-nums' } }, '↑ ' + fmtRate(network.upBps)),
                ),
                h(Sparkline, {
                  points: history.map((point) => Math.min(100, ((point.down || 0) / (10 * MB)) * 100)),
                  height: 46,
                  color: C.success,
                }),
                h('div', { style: { fontSize: 10.5, color: C.label2, lineHeight: 1.7 } },
                  '活跃网卡 ' + (network.active || '—') + ' · 累计接收 ' + fmtBytes(network.receivedBytes, 2) +
                  ' · 发送 ' + fmtBytes(network.sentBytes, 2) + ' · 5 秒采样'),
                Array.isArray(network.interfaces) && network.interfaces.length > 0
                  ? h('div', { style: { display: 'flex', flexDirection: 'column', gap: 2, marginTop: 6 } },
                    network.interfaces.map((item) => h('div', {
                      key: item.name,
                      style: { display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 10, color: C.label2, fontVariantNumeric: 'tabular-nums' },
                    },
                      h('span', { style: { minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, item.name),
                      h('span', { style: { flex: '0 0 auto' } }, '↓ ' + fmtRate(item.downBps) + ' · ↑ ' + fmtRate(item.upBps)))))
                  : null,
              )
              : h('div', { style: { fontSize: 11, color: C.label2, lineHeight: 1.7 } },
                network.error || '未接入网络采样'),
          ),
          h('div', {
            style: { border: '1px solid ' + C.border1, borderRadius: 10, background: C.bg2, padding: '12px 14px', minWidth: 0 },
          },
            h('div', { style: { fontSize: 12, fontWeight: 650, marginBottom: 8 } }, 'GPU'),
            devices.length > 0
              ? h('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
                devices.map((device, index) => h('div', {
                  key: index,
                  style: { display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 },
                },
                  h('div', { style: { display: 'flex', justifyContent: 'space-between', gap: 8, minWidth: 0 } },
                    h('span', {
                      style: {
                        fontSize: 11.5,
                        fontWeight: 600,
                        minWidth: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      },
                    }, device.name),
                    h('span', {
                      style: { fontSize: 11, fontWeight: 650, color: usageTone(device.utilizationPct), flex: '0 0 auto' },
                    }, device.utilizationPct === null ? '—' : Math.round(device.utilizationPct) + '%'),
                  ),
                  h(Bar, { pct: device.utilizationPct, color: usageTone(device.utilizationPct), height: 4 }),
                  h('div', {
                    style: {
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '2px 12px',
                      fontSize: 10.5,
                      color: C.label2,
                      fontVariantNumeric: 'tabular-nums',
                    },
                  },
                    h('span', null, '显存 ' + fmtBytes(device.memoryUsedBytes) + ' / ' + fmtBytes(device.memoryTotalBytes)),
                    h('span', null, '温度 ' + (device.temperatureC === null ? '—' : device.temperatureC + '°C')),
                    h('span', null, '功耗 ' + (device.powerW === null ? '—' : Math.round(device.powerW) + 'W')),
                    h('span', null, '核心 ' + (device.clockMhz === null ? '—' : device.clockMhz + 'MHz')),
                  ),
                )),
              )
              : h('div', { style: { fontSize: 11, color: C.label2, lineHeight: 1.7 } },
                gpu.error ? 'nvidia-smi 不可用：' + gpu.error : '未检测到 CUDA GPU'),
          ),
        ),
        h('div', { style: { border: '1px solid ' + C.border1, borderRadius: 10, background: C.bg2, padding: '12px 14px' } },
          h('div', { style: { fontSize: 12, fontWeight: 650, marginBottom: 8 } },
            '每核使用率' + (perCore.length ? '（' + perCore.length + ' 核）' : '')),
          perCore.length
            ? h('div', {
              style: {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(104px, 1fr))',
                gap: 8,
              },
            }, perCore.map((pct, index) => h('div', {
              key: index,
              style: { display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 },
            },
              h('div', {
                style: { fontSize: 10, color: C.label2, fontVariantNumeric: 'tabular-nums', display: 'flex', justifyContent: 'space-between' },
              },
                h('span', null, 'CPU ' + index),
                h('span', { style: { color: pct === null ? C.label2 : usageTone(pct) } }, pct === null ? '—' : Math.round(pct) + '%')),
              h(Bar, { pct: pct === null ? 0 : pct, color: usageTone(pct), height: 3 }),
            )))
            : h('div', { style: { fontSize: 11, color: C.label2 } }, '采样中…'),
        ),
      );
    }

    // ---------- ports body ----------
    function statusTextOf(row) {
      if (row.reachable) return row.http ? '在线' : '在线';
      if (row.missing) return '未监听';
      return '离线';
    }

    function portStatusLine(row) {
      if (row.reachable) {
        if (row.http) {
          const status = row.status ? 'HTTP ' + row.status : 'HTTP 服务';
          return row.ms === null || row.ms === undefined ? status : status + ' · ' + row.ms + 'ms';
        }
        return row.ms === null || row.ms === undefined ? 'TCP 可达' : 'TCP 可达 · ' + row.ms + 'ms';
      }
      if (row.missing) return '端口未监听';
      if (row.error === 'timeout') return '连接超时';
      if (row.error) return '无响应';
      return '监听中但不可达';
    }

    function PortChip(props) {
      const row = props.row;
      const url = portUrlFor(row);
      const online = row.reachable;
      const label = row.note || row.name || ('端口 ' + row.port);
      const [copied, setCopied] = React.useState(false);

      const copy = (event) => {
        event.stopPropagation();
        event.preventDefault();
        copyText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1200);
      };

      const open = () => {
        window.open(url, '_blank', 'noopener');
      };

      return h('div', {
        className: 'wbsm-chip',
        role: 'link',
        tabIndex: 0,
        title: url,
        onClick: open,
        onKeyDown: (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            open();
          }
        },
        style: {
          cursor: 'pointer',
          borderRadius: 10,
          border: '1px solid ' + (online ? C.border1 : C.border1),
          background: C.bg2,
          padding: props.large ? '11px 12px' : '9px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          minWidth: 0,
        },
      },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 } },
          h('span', {
            style: {
              fontSize: props.large ? 14 : 13,
              fontWeight: 650,
              flex: '1 1 auto',
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
          }, label),
          h('span', {
            style: {
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              flex: '0 0 auto',
              fontSize: 11,
              color: online ? C.success : C.error,
            },
          },
            h('span', {
              style: {
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: online ? C.success : C.error,
                boxShadow: '0 0 0 3px ' + (online ? 'rgba(52, 211, 153, .16)' : 'rgba(248, 113, 113, .16)'),
              },
            }),
            statusTextOf(row),
          ),
        ),
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 5, minWidth: 0 } },
          h('a', {
            href: url,
            target: '_blank',
            rel: 'noopener',
            onClick: (event) => event.stopPropagation(),
            style: {
              fontSize: 11.5,
              color: C.brand,
              textDecoration: 'none',
              fontVariantNumeric: 'tabular-nums',
              flex: '1 1 auto',
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
          }, url),
          h('button', {
            className: 'wbsm-iconbtn',
            title: copied ? '已复制' : '复制地址',
            onClick: copy,
            style: { padding: 2, flex: '0 0 auto' },
          }, copied
            ? h('span', { style: { fontSize: 10, color: C.success } }, '✓')
            : CopyIcon(11)),
        ),
        h('div', { style: { fontSize: 11, color: C.label2, fontVariantNumeric: 'tabular-nums' } }, portStatusLine(row)),
        props.large
          ? h('div', { style: { display: 'flex', flexDirection: 'column', gap: 5, marginTop: 2 } },
            h('div', {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                gap: 8,
                fontSize: 10.5,
                color: C.label2,
                opacity: 0.9,
              },
            },
              h('span', null, row.name ? row.name + (row.pid ? ' · PID ' + row.pid : '') : '端口 ' + row.port),
              h('span', null, row.address || '—')),
            props.onEditNote
              ? h('input', {
                defaultValue: row.note,
                placeholder: '自定义名称（留空用内置名称）',
                'aria-label': '备注：' + label,
                onClick: (event) => event.stopPropagation(),
                onMouseDown: (event) => event.stopPropagation(),
                onKeyDown: (event) => {
                  event.stopPropagation();
                  if (event.key === 'Enter') event.currentTarget.blur();
                },
                onBlur: (event) => {
                  const next = event.target.value;
                  if (next !== row.note) props.onEditNote(row.port, next);
                },
                style: {
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '3px 7px',
                  borderRadius: 6,
                  border: '1px solid ' + C.border1,
                  background: C.bgBase,
                  color: C.label,
                  fontSize: 11.5,
                  fontFamily: 'inherit',
                  outline: 'none',
                  cursor: 'text',
                },
              })
              : null)
          : h('div', { style: { fontSize: 10.5, color: C.label2, opacity: 0.85 } }, '点击在浏览器中打开 ↗'),
      );
    }

    function PortsBody(props) {
      const data = props.data;
      if (!data) {
        if (props.error) return h(ErrorBlock, { title: '端口', error: props.error, onRetry: props.onRetry });
        return h(LoadingBlock, { text: '扫描端口…' });
      }

      const rows = buildPortRows(data);
      const pinnedRows = rows.filter((row) => row.pinned);
      const onlineCount = pinnedRows.filter((row) => row.reachable).length;

      if (!props.full) {
        if (data.listError && pinnedRows.length === 0) {
          return h(ErrorBlock, { title: '端口列表', error: data.listError, onRetry: props.onRetry });
        }
        if (pinnedRows.length === 0) {
          return h(EmptyBlock, {
            text: '还没有选定端口。\n在「端口监控」页点 ☆，或放大这张卡片后在这里勾选。',
          });
        }
        return h('div', { style: { display: 'flex', flexDirection: 'column', gap: 0, minWidth: 0, height: '100%' } },
          h('div', {
            style: {
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(215px, 1fr))',
              gap: 9,
              alignContent: 'start',
            },
          }, pinnedRows.map((row) => h(PortChip, { key: row.port, row }))),
        );
      }

      return h('div', { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
        h('div', {
          style: {
            fontSize: 11,
            color: C.label2,
            lineHeight: 1.7,
            border: '1px dashed ' + C.border1,
            borderRadius: 9,
            padding: '8px 11px',
          },
        },
          '点下面的 ☆ 决定哪些端口出现在卡片上（与「端口监控」页共用同一份选择）。',
          data.listError ? ' 端口列表暂不可用：' + data.listError : '',
        ),
        pinnedRows.length > 0
          ? h('div', null,
            h('div', { style: { fontSize: 12, fontWeight: 650, marginBottom: 8 } },
              '已选端口（' + onlineCount + ' / ' + pinnedRows.length + ' 在线）'),
            h('div', {
              style: {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: 10,
              },
            }, pinnedRows.map((row) => h(PortChip, {
              key: row.port,
              row,
              large: true,
              onEditNote: (port, note) => {
                setPortNote(port, note);
                if (props.onReload) void props.onReload();
              },
            }))))
          : null,
        h('div', null,
          h('div', { style: { fontSize: 12, fontWeight: 650, marginBottom: 8 } },
            '全部监听端口（' + rows.filter((row) => !row.pinned).length + ' 个未选）'),
          rows.length === 0
            ? h(EmptyBlock, { text: '没有检测到监听端口' })
            : h('div', {
              style: {
                border: '1px solid ' + C.border1,
                borderRadius: 10,
                overflow: 'hidden',
                background: C.bg2,
              },
            },
              h('div', {
                style: {
                  display: 'grid',
                  gridTemplateColumns: '66px minmax(0, 1.1fr) 76px minmax(0, 1fr) 104px 40px',
                  gap: 10,
                  padding: '8px 12px',
                  fontSize: 11,
                  color: C.label2,
                  borderBottom: '1px solid ' + C.border1,
                },
              },
                h('span', null, '端口'),
                h('span', null, '进程'),
                h('span', null, 'PID'),
                h('span', null, '地址'),
                h('span', null, '状态'),
                h('span', { title: '勾选后出现在卡片上', style: { textAlign: 'center' } }, '卡片'),
              ),
              rows.map((row) => h(PortRow, {
                key: row.port,
                row,
                onToggle: () => {
                  setPinnedPort(row.port, !row.pinned);
                  if (props.onReload) void props.onReload();
                },
              })),
            ),
        ),
      );
    }

    function PortRow(props) {
      const row = props.row;
      const online = row.reachable;
      return h('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: '66px minmax(0, 1.1fr) 76px minmax(0, 1fr) 104px 40px',
          gap: 10,
          alignItems: 'center',
          padding: '8px 12px',
          borderBottom: '1px solid ' + C.border1,
          fontSize: 12,
          minWidth: 0,
        },
      },
        h('span', { style: { fontWeight: 650, fontVariantNumeric: 'tabular-nums' } }, String(row.port)),
        h('div', { style: { minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 } },
          h('div', {
            title: row.note || row.name || '',
            style: {
              color: (row.note || row.name) ? C.label : C.label2,
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
          }, row.note || row.name || (row.missing ? '未监听' : '(未知进程)')),
          row.note && row.name
            ? h('div', {
              style: {
                fontSize: 10.5,
                color: C.label2,
                minWidth: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              },
            }, row.name)
            : null,
        ),
        h('span', { style: { color: C.label2, fontVariantNumeric: 'tabular-nums' } }, row.pid ? String(row.pid) : '—'),
        h('span', {
          style: { color: C.label2, fontVariantNumeric: 'tabular-nums', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
        }, row.address || '—'),
        h('span', {
          style: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            fontSize: 11.5,
            color: online ? C.success : ((row.probed || row.missing) ? C.error : C.label2),
          },
        },
          h('span', {
            style: {
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: online ? C.success : ((row.probed || row.missing) ? C.error : C.label2),
              flex: '0 0 auto',
            },
          }),
          online
            ? (row.ms === null || row.ms === undefined ? '在线' : row.ms + 'ms')
            : (row.missing ? '未监听' : (row.probed ? '离线' : '—'))),
        h('button', {
          className: 'wbsm-iconbtn',
          title: row.pinned ? '从卡片移除' : '放到卡片上',
          onClick: props.onToggle,
          style: { padding: 2, color: row.pinned ? C.warn : C.label2 },
        }, row.pinned ? '★' : '☆'),
      );
    }

    // ---------- usage body ----------
    function costRows(totals) {
      const parts = totals.costParts || {};
      return [
        { label: '缓存命中输入', tokens: totals.cacheRead || 0, cost: parts.cacheRead || 0, color: C.success },
        { label: '未命中输入（含缓存写入）', tokens: (totals.input || 0) + (totals.cacheWrite || 0), cost: parts.input || 0, color: C.brand },
        { label: '模型输出', tokens: totals.output || 0, cost: parts.output || 0, color: C.warn },
      ];
    }

    function UsageBody(props) {
      const [budget, setBudget] = React.useState(readBudget);
      const data = props.data;
      if (!data) {
        if (props.error) return h(ErrorBlock, { title: '用量', error: props.error, onRetry: props.onRetry });
        return h(LoadingBlock, { text: '统计会话用量…' });
      }

      const totals = data.totals || {};
      const monthKey = monthKeyNow();
      const monthCost = (data.timeline || [])
        .filter((row) => String(row.day).slice(0, 7) === monthKey)
        .reduce((sum, row) => sum + (row.cost || 0), 0);

      if (!props.full) {
        const days = buildDays(data.timeline, 7);
        const today = days[days.length - 1];
        const weekTotal = sumBy(days, 'total');
        const weekCost = sumBy(days, 'cost');
        const compactParts = costRows(totals);
        const maxPartCostCompact = Math.max(0.000001, ...compactParts.map((item) => item.cost));
        return h('div', { style: { display: 'flex', flexDirection: 'column', gap: 10, height: '100%', minHeight: 0 } },
          h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8 } },
            h(Stat, { label: '总 Token', value: fmtTokens(totals.total), sub: fmtInt(totals.sessions) + ' 个会话', compact: true }),
            h(Stat, { label: '总成本', value: fmtMoney(totals.cost), sub: '官方价目估算', compact: true }),
            h(Stat, { label: '今日', value: fmtMoney(today.cost), sub: fmtTokens(today.total) + ' tokens', compact: true }),
          ),
          h('div', {
            style: {
              flex: '1 1 auto',
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            },
          },
            h('div', {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                gap: 8,
                fontSize: 11,
                color: C.label2,
                marginBottom: 2,
              },
            },
              h('span', null, '成本构成'),
              h('span', { style: { fontVariantNumeric: 'tabular-nums' } },
                '近 7 天 ' + fmtMoney(weekCost) + ' · ' + fmtTokens(weekTotal) + ' tokens'),
            ),
            compactParts.map((item) => h('div', {
              key: item.label,
              style: {
                flex: '1 1 0',
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 4,
              },
            },
              h('div', {
                style: { display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 11.5, minWidth: 0 },
              },
                h('span', { style: { display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 } },
                  h('span', { style: { width: 8, height: 8, borderRadius: 2, background: item.color, flex: '0 0 auto' } }),
                  h('span', {
                    style: { color: C.label, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
                  }, item.label),
                ),
                h('span', {
                  style: { color: C.label2, fontVariantNumeric: 'tabular-nums', flex: '0 0 auto' },
                }, fmtMoney(item.cost) + ' · ' + (totals.cost > 0 ? Math.round((item.cost / totals.cost) * 100) : 0) + '%'),
              ),
              h(Bar, { pct: (item.cost / maxPartCostCompact) * 100, color: item.color, height: 4 }),
            )),
          ),
        );
      }

      const days = buildDays(data.timeline, props.range || 30);
      const rangeTotal = sumBy(days, 'total');
      const rangeCost = sumBy(days, 'cost');
      const byModel = (data.byModel || []).slice(0, 5);
      const sessions = (data.sessions || []).slice(0, 8);
      const cacheHitPct = totals.total > 0 ? (totals.cacheRead / totals.total) * 100 : 0;
      const maxModelCost = Math.max(0.000001, ...byModel.map((item) => item.cost));
      const peakDay = days.reduce(
        (best, day) => ((Number(day.total) || 0) > (Number(best.total) || 0) ? day : best),
        days[0] || { day: '', total: 0 },
      );
      const budgetPct = budget > 0 ? (monthCost / budget) * 100 : 0;
      const overBudget = budget > 0 && monthCost > budget;

      const kpiIcon = (children) => h('svg', {
        viewBox: '0 0 24 24',
        width: 14,
        height: 14,
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }, children);

      const kpi = (label, value, sub, accent, icon) => h('div', {
        style: {
          border: '1px solid ' + C.border1,
          borderRadius: 12,
          background: C.bg2,
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          minWidth: 0,
        },
      },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 7, minWidth: 0 } },
          h('span', {
            style: {
              width: 24,
              height: 24,
              borderRadius: 7,
              background: C.bg1,
              border: '1px solid ' + C.border1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: accent,
              flex: '0 0 auto',
            },
          }, icon),
          h('span', { style: { fontSize: 11, color: C.label2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, label),
        ),
        h('div', { style: { fontSize: 21, fontWeight: 700, fontVariantNumeric: 'tabular-nums', lineHeight: 1.2, whiteSpace: 'nowrap' } }, value),
        h('div', { style: { fontSize: 10.5, color: C.label2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, sub),
      );

      const perfItem = (label, value, sub) => h('div', {
        style: { display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 },
      },
        h('div', { style: { fontSize: 10.5, color: C.label2 } }, label),
        h('div', { style: { fontSize: 16, fontWeight: 650, fontVariantNumeric: 'tabular-nums', lineHeight: 1.25 } }, value),
        h('div', { style: { fontSize: 10, color: C.label2, lineHeight: 1.5 } }, sub),
      );

      return h('div', { style: { display: 'flex', flexDirection: 'column', gap: 14 } },
        h('div', {
          style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' },
        },
          h('div', { style: { fontSize: 11.5, color: C.label2 } },
            '近 ' + days.length + ' 天 · 合计 ' + fmtTokens(rangeTotal) + ' tokens / ' + fmtMoney(rangeCost)),
          h('div', { style: { display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' } },
            [7, 14, 30].map((n) => h('button', {
              key: n,
              className: 'wbsm-btn',
              onClick: () => props.onRangeChange(n),
              style: {
                padding: '3px 10px',
                background: days.length === n ? C.brand : C.bg1,
                color: days.length === n ? C.bgBase : C.label,
                borderColor: days.length === n ? C.brand : C.border1,
              },
            }, n + ' 天')),
            h('span', { style: { width: 1, height: 14, background: C.border1, margin: '0 4px' } }),
            h('span', { style: { fontSize: 10.5, color: C.label2 } }, '预算 ¥'),
            h('input', {
              type: 'number',
              min: 0,
              step: 5,
              defaultValue: budget,
              key: 'budget-' + budget,
              'aria-label': '本月预算',
              onBlur: (event) => {
                const next = Number(event.target.value);
                if (Number.isFinite(next) && next >= 0) setBudget(writeBudget(next));
              },
              onKeyDown: (event) => {
                if (event.key === 'Enter') event.currentTarget.blur();
              },
              style: {
                width: 58,
                padding: '2px 6px',
                fontSize: 10.5,
                fontFamily: 'inherit',
                color: C.label,
                background: C.bg1,
                border: '1px solid ' + C.border1,
                borderRadius: 5,
                outline: 'none',
              },
            }),
          ),
        ),
        h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 } },
          kpi(
            '总 Token 消耗',
            fmtTokens(totals.total),
            '输入 ' + fmtTokens(totals.input) + ' · 输出 ' + fmtTokens(totals.output),
            C.brand,
            kpiIcon([h('path', { key: 'a', d: 'M4 7h16M4 12h16M4 17h10' })]),
          ),
          kpi(
            '预估成本',
            fmtMoney(totals.cost),
            overBudget
              ? '本月 ' + fmtMoney(monthCost) + ' · 超预算 ' + fmtMoney(monthCost - budget)
              : '本月 ' + fmtMoney(monthCost) + ' / 预算 ' + fmtMoney(budget),
            overBudget ? C.error : C.success,
            kpiIcon([
              h('circle', { key: 'a', cx: 12, cy: 12, r: 8 }),
              h('path', { key: 'b', d: 'M12 8v8M9.5 10.5h5M9.5 13.5h5' }),
            ]),
          ),
          kpi(
            '会话数',
            fmtInt(totals.sessions),
            '共 ' + fmtInt(totals.calls) + ' 次模型调用',
            C.warn,
            kpiIcon([h('path', { key: 'a', d: 'M4 6h16v10H8l-4 4z' })]),
          ),
          kpi(
            '缓存命中率',
            cacheHitPct.toFixed(1) + '%',
            '缓存读取 ' + fmtTokens(totals.cacheRead),
            C.success,
            kpiIcon([
              h('circle', { key: 'a', cx: 12, cy: 12, r: 8, opacity: 0.35 }),
              h('path', { key: 'b', d: 'M8.5 12.5l2.5 2.5 4.5-5' }),
            ]),
          ),
        ),
        h('div', { style: { display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)', gap: 14 } },
          h('div', {
            style: { border: '1px solid ' + C.border1, borderRadius: 12, background: C.bg2, padding: '13px 15px', minWidth: 0 },
          },
            h('div', { style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, marginBottom: 10 } },
              h('div', null,
                h('div', { style: { fontSize: 12.5, fontWeight: 650 } }, '每日消耗'),
                h('div', { style: { fontSize: 10.5, color: C.label2, marginTop: 2 } },
                  '按 token 堆叠 · 近 ' + days.length + ' 天 · 峰值 ' +
                  (peakDay.day ? peakDay.day.slice(5) + ' · ' + fmtTokens(peakDay.total) : '—')),
              ),
              h('div', { style: { textAlign: 'right' } },
                h('div', { style: { fontSize: 13, fontWeight: 650, fontVariantNumeric: 'tabular-nums' } }, fmtTokens(rangeTotal) + ' tokens'),
                h('div', { style: { fontSize: 10, color: C.label2, fontVariantNumeric: 'tabular-nums' } }, fmtMoney(rangeCost)),
              ),
            ),
            h('div', { style: { position: 'relative', height: 170 } },
              [0.25, 0.5, 0.75].map((ratio) => h('div', {
                key: 'grid-' + ratio,
                style: {
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: (ratio * 100) + '%',
                  borderTop: '1px dashed ' + C.border1,
                  opacity: 0.45,
                  pointerEvents: 'none',
                },
              })),
              h('div', { style: { position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 7, height: '100%' } },
                usageStackedBars(days, [
                  { key: 'input', color: C.brand },
                  { key: 'cacheRead', color: C.success },
                  { key: 'cacheWrite', color: C.warn },
                  { key: 'output', color: C.label },
                ]),
              ),
            ),
            h('div', { style: { display: 'flex', gap: 4, marginTop: 6 } },
              days.map((day, index) => {
                const step = Math.max(1, Math.round(days.length / 8));
                const last = days.length - 1;
                // 末尾日期强制显示；倒数第二个离得太近就让位，避免两个标签叠在一起。
                const show = (index % step === 0 && last - index > 1) || index === last;
                return h('div', {
                  key: day.day,
                  style: { flex: '1 1 0', minWidth: 0, textAlign: 'center', fontSize: 9, color: C.label2, whiteSpace: 'nowrap' },
                }, show ? day.day.slice(5) : '');
              }),
            ),
            h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '4px 12px', marginTop: 10, fontSize: 10, color: C.label2 } },
              [
                { label: '输入（未命中）', color: C.brand },
                { label: '缓存读取', color: C.success },
                { label: '缓存写入', color: C.warn },
                { label: '输出', color: C.label },
              ].map((item) => h('span', { key: item.label, style: { display: 'inline-flex', alignItems: 'center', gap: 5 } },
                h('span', { style: { width: 7, height: 7, borderRadius: 2, background: item.color, flex: '0 0 auto' } }),
                item.label,
              )),
            ),
          ),
          h('div', {
            style: { border: '1px solid ' + C.border1, borderRadius: 12, background: C.bg2, padding: '13px 15px', minWidth: 0 },
          },
            h('div', { style: { fontSize: 12.5, fontWeight: 650, marginBottom: 10 } }, 'Token 构成'),
            h('div', { style: { display: 'flex', justifyContent: 'center', marginBottom: 12 } },
              usageDonut([
                { value: totals.input || 0, color: C.brand },
                { value: totals.cacheRead || 0, color: C.success },
                { value: totals.cacheWrite || 0, color: C.warn },
                { value: totals.output || 0, color: C.label },
              ], totals.total || 0, fmtMoney(totals.cost)),
            ),
            h('div', { style: { display: 'flex', flexDirection: 'column', gap: 7 } },
              [
                { label: '输入（未命中）', value: totals.input || 0, color: C.brand },
                { label: '缓存读取', value: totals.cacheRead || 0, color: C.success },
                { label: '缓存写入', value: totals.cacheWrite || 0, color: C.warn },
                { label: '输出', value: totals.output || 0, color: C.label },
              ].map((item) => h('div', {
                key: item.label,
                style: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 },
              },
                h('span', { style: { width: 8, height: 8, borderRadius: 2, background: item.color, flex: '0 0 auto' } }),
                h('span', { style: { color: C.label2, flex: '1 1 auto', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, item.label),
                h('span', { style: { fontVariantNumeric: 'tabular-nums', flex: '0 0 auto' } }, fmtTokens(item.value)),
                h('span', {
                  style: { fontVariantNumeric: 'tabular-nums', flex: '0 0 auto', color: C.label2, width: 40, textAlign: 'right' },
                }, (totals.total > 0 ? ((item.value / totals.total) * 100).toFixed(1) : '0.0') + '%'),
              )),
            ),
          ),
        ),
        h('div', {
          style: {
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)',
            gap: 14,
            alignItems: 'start',
          },
        },
          h('div', {
            style: { border: '1px solid ' + C.border1, borderRadius: 12, background: C.bg2, padding: '13px 15px', minWidth: 0 },
          },
            h('div', { style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, marginBottom: 6 } },
              h('div', { style: { fontSize: 12.5, fontWeight: 650 } }, '会话消耗排行'),
              h('div', { style: { fontSize: 10.5, color: C.label2 } }, '按 token 降序'),
            ),
            sessions.length === 0
              ? h(EmptyBlock, { text: '还没有会话记录' })
              : sessions.map((session, index) => h('div', {
                key: session.id || index,
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 2px',
                  borderBottom: '1px solid ' + C.border1,
                  minWidth: 0,
                },
              },
                h('span', {
                  style: { width: 18, textAlign: 'right', fontSize: 10.5, color: C.label2, fontVariantNumeric: 'tabular-nums', flex: '0 0 auto' },
                }, String(index + 1)),
                h('div', { style: { flex: '1 1 auto', minWidth: 0 } },
                  h('div', {
                    title: session.title || '',
                    style: { fontSize: 11.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
                  }, session.title || ('会话 ' + String(session.id || '').slice(-6))),
                  h('div', {
                    style: { fontSize: 10, color: C.label2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
                  }, (session.workspace || '—') + ' · ' + String(session.model || '未知').replace(/^deepseek-/, '')),
                ),
                h('div', { style: { textAlign: 'right', flex: '0 0 auto' } },
                  h('div', { style: { fontSize: 11.5, fontVariantNumeric: 'tabular-nums' } }, fmtTokens(session.total) + ' tokens'),
                  h('div', { style: { fontSize: 10, color: C.label2, fontVariantNumeric: 'tabular-nums' } }, fmtMoney(session.cost)),
                ),
              )),
            h('div', { style: { fontSize: 10.5, color: C.label2, marginTop: 8 } },
              '共 ' + fmtInt(totals.sessions) + ' 个会话，这里显示 token 最高的 ' + sessions.length + ' 个'),
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 } },
            h('div', {
              style: { border: '1px solid ' + C.border1, borderRadius: 12, background: C.bg2, padding: '13px 15px', minWidth: 0 },
            },
              h('div', { style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, marginBottom: 10 } },
                h('div', { style: { fontSize: 12.5, fontWeight: 650 } }, '模型花费'),
                h('div', { style: { fontSize: 10.5, color: C.label2 } }, byModel.length + ' 个模型'),
              ),
              byModel.length === 0
                ? h(EmptyBlock, { text: '暂无模型数据' })
                : h('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
                  byModel.map((row) => h('div', { key: row.model, style: { display: 'flex', flexDirection: 'column', gap: 4 } },
                    h('div', { style: { display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 11.5 } },
                      h('span', { style: { minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } },
                        String(row.model || 'unknown').replace(/^deepseek-/, '')),
                      h('span', { style: { fontVariantNumeric: 'tabular-nums', flex: '0 0 auto' } }, fmtMoney(row.cost)),
                    ),
                    h(Bar, { pct: (row.cost / maxModelCost) * 100, color: C.brand, height: 4 }),
                    h('div', { style: { fontSize: 10, color: C.label2 } },
                      fmtInt(row.calls) + ' 次调用 · ' + fmtTokens(row.total) + ' tokens'),
                  )),
                ),
            ),
            h('div', {
              style: { border: '1px solid ' + C.border1, borderRadius: 12, background: C.bg2, padding: '13px 15px', minWidth: 0 },
            },
              h('div', { style: { fontSize: 12.5, fontWeight: 650, marginBottom: 10 } }, '对话性能'),
              data.perf && data.perf.turns > 0
                ? h(React.Fragment, null,
                  h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 } },
                    perfItem('平均每轮耗时', fmtShortDuration(data.perf.avgTurnSec), '共 ' + fmtInt(data.perf.turns) + ' 轮'),
                    perfItem('平均首条回复', fmtShortDuration(data.perf.firstReplySec), '轮次开始到首条回复'),
                    perfItem('输出速度', data.perf.outputTokPerSec + ' tok/s', '按轮次总耗时估算'),
                    perfItem('工具错误率', data.perf.toolErrorPct + '%',
                      fmtInt(data.perf.toolResults) + ' 次调用中 ' + fmtInt(data.perf.toolErrors) + ' 次报错'),
                  ),
                  h('div', { style: { fontSize: 10, color: C.label2, marginTop: 10, lineHeight: 1.6 } },
                    '基于日志里的 turn 边界、首条 assistant 消息时间戳和 tool/result.isError 计算。'),
                )
                : h('div', { style: { fontSize: 11, color: C.label2 } }, '暂无轮次数据'),
            ),
          ),
        ),
        h('div', { style: { fontSize: 10.5, color: C.label2, lineHeight: 1.7 } },
          '数据源：' + ((data.source && data.source.dir) || '—') +
          ' · 更新于 ' + fmtStamp(data.updatedAt) +
          ' · 时间均为北京时间 · 成本为本地估算，以平台账单为准'),
      );
    }

    // 堆叠柱：先画一根完整柱子，再用硬色标渐变按 token 类型上色。
    // 分段 div 会在高度取整处露出缝隙，渐变没有这个问题。
    function usageStackedBars(days, segments) {
      const max = Math.max(1, ...days.map((day) => Number(day.total) || 0));
      return days.map((day) => {
        const total = Number(day.total) || 0;
        const stops = [];
        let acc = 0;
        let lastColor = C.bg2;
        for (const segment of segments) {
          const value = Number(day[segment.key]) || 0;
          if (value <= 0 || total <= 0) continue;
          const frac = (value / total) * 100;
          stops.push(segment.color + ' ' + acc.toFixed(3) + '% ' + (acc + frac).toFixed(3) + '%');
          acc += frac;
          lastColor = segment.color;
        }
        // 浮点残差补到顶，避免柱顶露出一条背景色。
        if (acc > 0 && acc < 99.999) stops.push(lastColor + ' ' + acc.toFixed(3) + '% 100%');
        return h('div', {
          key: day.day,
          title: day.day + ' · ' + fmtTokens(day.total) + ' tokens · ' + fmtMoney(day.cost) + ' · ' + fmtInt(day.calls) + ' 次调用',
          style: { flex: '1 1 0', minWidth: 0, height: '100%', display: 'flex', alignItems: 'flex-end' },
        }, h('div', {
          style: {
            width: '100%',
            height: total > 0 ? Math.max(3, (total / max) * 100) + '%' : '3px',
            borderRadius: '3px 3px 0 0',
            background: stops.length > 0
              ? 'linear-gradient(to top, ' + stops.join(', ') + ')'
              : C.border1,
            opacity: total > 0 ? 1 : 0.55,
          },
        }));
      });
    }

    // 环形图：四段 token 构成，中心放总量与成本。
    function usageDonut(parts, total, costText) {
      const size = 144;
      const center = size / 2;
      const radius = 52;
      const strokeWidth = 14;
      const circumference = 2 * Math.PI * radius;
      let offset = 0;
      const segments = parts.map((part, index) => {
        const frac = total > 0 ? Math.max(0, part.value / total) : 0;
        const length = frac * circumference;
        const segment = h('circle', {
          key: index,
          cx: center,
          cy: center,
          r: radius,
          fill: 'none',
          stroke: part.color,
          strokeWidth,
          strokeDasharray: length + ' ' + Math.max(0, circumference - length),
          strokeDashoffset: -offset,
          transform: 'rotate(-90 ' + center + ' ' + center + ')',
        });
        offset += length;
        return segment;
      });
      return h('div', { style: { position: 'relative', width: size, height: size } },
        h('svg', { viewBox: '0 0 ' + size + ' ' + size, width: size, height: size },
          h('circle', { cx: center, cy: center, r: radius, fill: 'none', stroke: C.bg1, strokeWidth }),
          segments,
        ),
        h('div', {
          style: {
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          },
        },
          h('div', { style: { fontSize: 14, fontWeight: 700, fontVariantNumeric: 'tabular-nums' } }, fmtTokens(total)),
          h('div', { style: { fontSize: 9.5, color: C.label2 } }, 'tokens'),
          h('div', { style: { fontSize: 10, color: C.label2, marginTop: 2 } }, costText),
        ),
      );
    }

    // ---------- card shell ----------
    function CardShell(props) {
      const card = props.card;
      return h('section', {
        ref: props.nodeRef,
        className: 'wbsm-card',
        'aria-label': card.title,
        style: {
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          minWidth: 0,
          borderRadius: 14,
          border: '1px solid ' + C.border1,
          background: C.bg1,
          overflow: 'hidden',
        },
      },
        h('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '11px 14px 8px',
            flex: '0 0 auto',
          },
        },
          card.icon
            ? h('span', { style: { color: C.label2, display: 'inline-flex', flex: '0 0 auto' } }, card.icon(15))
            : null,
          h('div', { style: { minWidth: 0, flex: '1 1 auto' } },
            h('div', { style: { fontSize: 13.5, fontWeight: 650, letterSpacing: 0.1 } }, card.title),
            card.subtitle
              ? h('div', {
                style: {
                  fontSize: 11,
                  color: C.label2,
                  marginTop: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontVariantNumeric: 'tabular-nums',
                },
              }, card.subtitle)
              : null,
          ),
          h('button', {
            className: 'wbsm-iconbtn',
            title: '放大到整页',
            'aria-label': '放大' + card.title,
            onClick: props.onExpand,
            style: { flex: '0 0 auto' },
          }, ExpandIcon(15)),
        ),
        h('div', {
          className: 'wbsm-scroll',
          style: {
            flex: '1 1 auto',
            minHeight: 0,
            overflowY: 'auto',
            padding: '2px 14px 13px',
          },
        }, card.body),
      );
    }

    // ---------- full-page overlay with the zoom animation ----------
    function overlayTargetBox(bounds) {
      const box = bounds || { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
      const pad = 14;
      // 宽屏上限：放大窗口不跟着窗口无限变宽，居中显示更像详情弹窗。
      const maxWidth = 1320;
      const width = Math.min(Math.max(320, box.width - pad * 2), maxWidth);
      return {
        left: box.left + Math.max(pad, (box.width - width) / 2),
        top: box.top + pad,
        width,
        height: Math.max(240, box.height - pad * 2),
        radius: 16,
      };
    }

    function CardOverlay(props) {
      // The source rect is re-read on close so a scrolled page still lands the
      // card back on its thumbnail.
      const sourceRef = React.useRef(props.getSourceRect);
      sourceRef.current = props.getSourceRect;
      const closeCbRef = React.useRef(props.onClose);
      closeCbRef.current = props.onClose;
      const boundsRef = React.useRef(props.getBounds);
      boundsRef.current = props.getBounds;

      const [box, setBox] = React.useState({
        left: props.rect.left,
        top: props.rect.top,
        width: props.rect.width,
        height: props.rect.height,
        radius: 14,
      });
      const [open, setOpen] = React.useState(false);
      const closingRef = React.useRef(false);

      const close = React.useCallback(() => {
        if (closingRef.current) return;
        closingRef.current = true;
        setOpen(false);
        const source = (sourceRef.current && sourceRef.current()) || props.rect;
        setBox({ left: source.left, top: source.top, width: source.width, height: source.height, radius: 14 });
        window.setTimeout(() => closeCbRef.current(), 250);
      }, [props.rect]);

      React.useEffect(() => {
        const raf = requestAnimationFrame(() => {
          const bounds = boundsRef.current ? boundsRef.current() : null;
          setBox(overlayTargetBox(bounds));
          setOpen(true);
        });
        const onKey = (event) => {
          if (event.key === 'Escape') {
            event.stopPropagation();
            close();
          }
        };
        const onResize = () => {
          if (!closingRef.current) {
            const bounds = boundsRef.current ? boundsRef.current() : null;
            setBox(overlayTargetBox(bounds));
          }
        };
        window.addEventListener('keydown', onKey);
        window.addEventListener('resize', onResize);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
          cancelAnimationFrame(raf);
          window.removeEventListener('keydown', onKey);
          window.removeEventListener('resize', onResize);
          document.body.style.overflow = previousOverflow;
        };
      }, [close]);

      const card = props.card;

      return h('div', {
        style: {
          position: 'fixed',
          inset: 0,
          zIndex: 400,
          background: open ? 'rgba(0, 0, 0, .45)' : 'rgba(0, 0, 0, 0)',
          transition: 'background .24s ease',
        },
        onMouseDown: (event) => {
          if (event.target === event.currentTarget) close();
        },
      }, h('div', {
        role: 'dialog',
        'aria-modal': 'true',
        'aria-label': card.title,
        style: {
          position: 'fixed',
          left: box.left,
          top: box.top,
          width: box.width,
          height: box.height,
          borderRadius: box.radius,
          background: C.bgBase,
          border: '1px solid ' + C.border1,
          boxShadow: '0 30px 90px rgba(0, 0, 0, .45)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transition: 'left .24s cubic-bezier(.2, .8, .25, 1), top .24s cubic-bezier(.2, .8, .25, 1), width .24s cubic-bezier(.2, .8, .25, 1), height .24s cubic-bezier(.2, .8, .25, 1), border-radius .24s ease',
          willChange: 'left, top, width, height',
        },
        onMouseDown: (event) => event.stopPropagation(),
      },
        h('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '13px 16px',
            borderBottom: '1px solid ' + C.border1,
            flex: '0 0 auto',
          },
        },
          card.icon
            ? h('span', { style: { color: C.label2, display: 'inline-flex', flex: '0 0 auto' } }, card.icon(17))
            : null,
          h('div', { style: { minWidth: 0, flex: '1 1 auto' } },
            h('div', { style: { fontSize: 16, fontWeight: 650 } }, card.title),
            card.subtitle
              ? h('div', { style: { fontSize: 11, color: C.label2, marginTop: 1 } }, card.subtitle)
              : null,
          ),
          h('button', {
            className: 'wbsm-iconbtn',
            title: '关闭（Esc）',
            'aria-label': '关闭',
            onClick: close,
            style: { flex: '0 0 auto' },
          }, CloseIcon(18)),
        ),
        h('div', {
          className: 'wbsm-scroll wbsm-fade',
          style: {
            flex: '1 1 auto',
            minHeight: 0,
            overflowY: 'auto',
            padding: '16px 18px 20px',
            opacity: open ? 1 : 0,
            transition: 'opacity .18s ease',
          },
        }, h('div', {
          // 宽屏下限宽居中：否则卡片会被拉到整屏宽，看着又空又散。
          style: { maxWidth: 1120, width: '100%', margin: '0 auto' },
        }, card.full)),
      ));
    }

    // ---------- the view ----------
    function StatusView() {
      useStyles();

      const disk = useResource('disk', loadDiskData, 10000);
      const hardware = useResource('hardware', loadHardwareData, 2000);
      const ports = useResource('ports', loadPortsData, 5000);
      const usage = useResource('usage', loadUsageData, 10000);
      const [usageRange, setUsageRange] = React.useState(30);
      const [overlay, setOverlay] = React.useState(null);

      const cardNodes = React.useRef({});
      const rootRef = React.useRef(null);

      const reloadAll = React.useCallback(() => {
        void disk.reload();
        void hardware.reload();
        void ports.reload();
        void usage.reload();
      }, [disk.reload, hardware.reload, ports.reload, usage.reload]);

      const cards = React.useMemo(() => {
        const diskData = disk.data;
        const hwData = hardware.data;
        const portData = ports.data;
        const usageData = usage.data;

        const diskVolumes = diskData && Array.isArray(diskData.volumes) ? diskData.volumes : [];
        const diskFree = sumBy(diskVolumes, 'freeBytes');
        const diskSubtitle = diskData
          ? diskVolumes.length + ' 个卷 · 剩余 ' + fmtBytes(diskFree)
          : (disk.error ? '暂不可用' : '读取中…');

        const hwCpu = hwData ? (hwData.cpu || {}) : {};
        const hwMem = hwData ? (hwData.memory || {}) : {};
        const hardwareSubtitle = hwData
          ? 'CPU ' + fmtPct(hwCpu.usagePct) + ' · 内存 ' + fmtPct(hwMem.usedPct)
          : (hardware.error ? '暂不可用' : '采样中…');

        const portRows = buildPortRows(portData);
        const pinnedRows = portRows.filter((row) => row.pinned);
        const onlinePinned = pinnedRows.filter((row) => row.reachable).length;
        const portsSubtitle = portData
          ? '已选 ' + pinnedRows.length + ' 个端口 · ' + onlinePinned + ' 个在线'
          : (ports.error ? '暂不可用' : '扫描中…');

        const usageTotals = usageData ? (usageData.totals || {}) : {};
        const usageSubtitle = usageData
          ? '共 ' + fmtInt(usageTotals.sessions) + ' 个会话 · ' + fmtTokens(usageTotals.total) + ' tokens'
          : (usage.error ? '暂不可用' : '统计中…');

        return [
          {
            id: 'disk',
            title: '磁盘空间',
            subtitle: diskSubtitle,
            icon: DiskIcon,
            body: h(DiskBody, { data: diskData, error: disk.error, onRetry: disk.reload }),
            full: h(DiskBody, { data: diskData, error: disk.error, full: true, onRetry: disk.reload }),
          },
          {
            id: 'hardware',
            title: '硬件性能',
            subtitle: hardwareSubtitle,
            icon: CpuIcon,
            body: h(HardwareBody, { data: hwData, error: hardware.error, onRetry: hardware.reload }),
            full: h(HardwareBody, { data: hwData, error: hardware.error, full: true, onRetry: hardware.reload }),
          },
          {
            id: 'ports',
            title: '端口监控',
            subtitle: portsSubtitle,
            icon: PortIcon,
            body: h(PortsBody, { data: portData, error: ports.error, onRetry: ports.reload }),
            full: h(PortsBody, {
              data: portData,
              error: ports.error,
              full: true,
              onRetry: ports.reload,
              onReload: ports.reload,
            }),
          },
          {
            id: 'usage',
            title: '用量统计',
            subtitle: usageSubtitle,
            icon: ChartIcon,
            body: h(UsageBody, { data: usageData, error: usage.error, onRetry: usage.reload }),
            full: h(UsageBody, {
              data: usageData,
              error: usage.error,
              full: true,
              range: usageRange,
              onRangeChange: setUsageRange,
              onReload: usage.reload,
            }),
          },
        ];
      }, [disk, hardware, ports, usage, usageRange]);

      const openCard = React.useCallback((id) => {
        const node = cardNodes.current[id];
        if (!node) return;
        const root = rootRef.current;
        setOverlay({
          id,
          rect: node.getBoundingClientRect(),
          bounds: root ? root.getBoundingClientRect() : null,
        });
      }, []);

      const closeOverlay = React.useCallback(() => setOverlay(null), []);

      const lastAt = Math.max(disk.at, hardware.at, ports.at, usage.at);

      const activeCard = overlay ? cards.find((card) => card.id === overlay.id) : null;

      const overlayNode = overlay && activeCard
        ? ReactDOM.createPortal(
          h(CardOverlay, {
            key: overlay.id,
            card: activeCard,
            rect: overlay.rect,
            getSourceRect: () => {
              const node = cardNodes.current[overlay.id];
              return node ? node.getBoundingClientRect() : overlay.rect;
            },
            getBounds: () => {
              const root = rootRef.current;
              return root ? root.getBoundingClientRect() : overlay.bounds;
            },
            onClose: closeOverlay,
          }),
          document.body,
        )
        : null;

      return h(React.Fragment, null,
        h('div', {
          ref: rootRef,
          className: 'wbsm-scroll',
          style: {
            height: '100%',
            boxSizing: 'border-box',
            overflowY: 'auto',
            padding: '20px 24px 22px',
            background: C.bgBase,
            color: C.label,
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'inherit',
          },
        },
          h('div', {
            style: {
              maxWidth: 1280,
              width: '100%',
              margin: '0 auto',
              flex: '1 1 auto',
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
            },
          },
            h('div', {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                marginBottom: 14,
                flex: '0 0 auto',
              },
            },
              h('div', { style: { minWidth: 0 } },
                h('h2', { style: { margin: 0, fontSize: 20, fontWeight: 650, lineHeight: 1.3 } }, '状态监控'),
                h('div', { style: { marginTop: 3, fontSize: 11, color: C.label2 } },
                  lastAt
                    ? '最后更新 ' + fmtClock(lastAt) + ' · 硬件 2 秒 / 端口 5 秒 / 磁盘与用量 10 秒'
                    : '正在读取…'),
              ),
              h('div', { style: { display: 'flex', alignItems: 'center', gap: 8, flex: '0 0 auto' } },
                h('button', {
                  className: 'wbsm-btn',
                  onClick: reloadAll,
                  style: { display: 'inline-flex', alignItems: 'center', gap: 5 },
                }, RefreshIcon(13), '刷新'),
              ),
            ),
            h('div', { className: 'wbsm-grid' },
              cards.map((card) => h(CardShell, {
                key: card.id,
                card,
                onExpand: () => openCard(card.id),
                nodeRef: (node) => {
                  cardNodes.current[card.id] = node;
                },
              })),
            ),
          ),
        ),
        overlayNode,
      );
    }

    return {
      inject: ['slots', 'workbench'],
      apply(ctx) {
        const api = ctx.get('workbench');
        if (!api) {
          console.warn('[status-monitor] workbench service missing; registration skipped');
          return;
        }
        if (api.apiVersion !== 1) {
          console.warn('[status-monitor] needs workbench apiVersion 1, got ' + api.apiVersion + '; upgrade @philomelcc/dsh-workbench');
          return;
        }
        wb = api;

        ctx.effect(() => api.registerView({
          id: VIEW_ID,
          title: '状态监控',
          subtitle: '磁盘、硬件、端口与会话用量',
          icon: StatusIcon,
          component: StatusView,
          order: 20,
        }), 'status-monitor: view');
      },
    };
  },
});
