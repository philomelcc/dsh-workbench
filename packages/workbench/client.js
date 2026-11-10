window.__ModuleLoader__.load({
  id: '@philomelcc/dsh-workbench',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    // ---------- theme tokens (single source shared with modules) ----------
    const tokens = {
      success: 'var(--dsw-alias-state-success-primary)',
      error: 'var(--dsw-alias-state-error-primary)',
      warn: 'var(--dsw-alias-state-warn-primary)',
      idle: 'var(--dsw-alias-state-idle-primary)',
      brand: 'var(--dsw-alias-brand-primary)',
      bgBase: 'var(--dsw-alias-bg-base)',
      bgLayer1: 'var(--dsw-alias-bg-layer-1)',
      bgLayer2: 'var(--dsw-alias-bg-layer-2)',
      bgOverlay: 'var(--dsw-alias-bg-overlay)',
      border1: 'var(--dsw-alias-border-l1)',
      border2: 'var(--dsw-alias-border-l2)',
      label: 'var(--dsw-alias-label-primary)',
      labelSecondary: 'var(--dsw-alias-label-secondary)',
    };

    // ---------- feature switches ----------
    // The shell is optional decoration on top of the navigation layer: someone
    // who only wants the tab row can turn the rest off and let another plugin
    // own balances, themes or cost estimates. Every switch defaults to on, so
    // installing the shell keeps the previous behaviour.
    const FEATURE_KEYS = ['theme', 'balance', 'restart', 'glow', 'cost'];
    const FEATURE_DEFAULTS = { theme: true, balance: true, restart: true, glow: true, cost: true };
    const FEATURE_LABELS = {
      theme: { title: '主题切换', hint: '顶部栏的深色 / 浅色 / 纸色三个色块' },
      balance: { title: '余额显示', hint: '顶部栏的账户余额' },
      restart: { title: '重启按钮', hint: '顶部栏的一键重启（需要外部管理器）' },
      glow: { title: '进行中光效', hint: '会话运行中时列表行的流动光效' },
      cost: { title: '单次消耗估计', hint: '每轮对话结束时显示的 token 与费用估算' },
    };

    function createFeaturesStore() {
      const KEY = 'dsh-workbench:features';
      const listeners = new Set();
      let state = read();

      function read() {
        const next = { ...FEATURE_DEFAULTS };
        try {
          const raw = localStorage.getItem(KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            for (const key of FEATURE_KEYS) {
              if (typeof parsed[key] === 'boolean') next[key] = parsed[key];
            }
          }
        } catch (_error) { /* storage disabled */ }
        return next;
      }

      return {
        getSnapshot() { return state; },
        set(key, value) {
          if (!FEATURE_KEYS.includes(key) || state[key] === value) return;
          state = { ...state, [key]: value };
          try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_error) { /* storage disabled */ }
          for (const fn of listeners) fn();
        },
        subscribe(fn) {
          listeners.add(fn);
          return () => { listeners.delete(fn); };
        },
      };
    }

    const features = createFeaturesStore();

    function useFeatures() {
      return React.useSyncExternalStore(features.subscribe, features.getSnapshot);
    }

    // ---------- shared UI primitives ----------
    function StatusDot(props) {
      const ok = props.ok !== false;
      const color = props.color || (ok ? tokens.success : tokens.error);
      const glow = props.glow || (ok ? 'rgba(52,211,153,0.16)' : 'rgba(248,113,113,0.16)');
      return h('span', {
        title: props.title || (ok ? '正常' : '异常'),
        style: {
          display: 'inline-block',
          width: props.size || 9,
          height: props.size || 9,
          borderRadius: '50%',
          background: color,
          boxShadow: '0 0 0 3px ' + glow,
          flex: '0 0 auto',
        },
      });
    }

    function Card(props) {
      return h('div', {
        style: {
          border: '1px solid ' + tokens.border1,
          borderRadius: 12,
          background: tokens.bgLayer1,
          overflow: 'hidden',
          ...(props.style || {}),
        },
      }, props.children);
    }

    function SectionHeader(props) {
      return h('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 12,
          ...(props.style || {}),
        },
      },
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 } },
          h('div', { style: { fontSize: 16, fontWeight: 650 } }, props.title),
          props.subtitle ? h('div', { style: { fontSize: 12, color: tokens.labelSecondary } }, props.subtitle) : null,
        ),
        props.actions
          ? h('div', { style: { display: 'flex', alignItems: 'center', gap: 8, flex: '0 0 auto' } }, props.actions)
          : null,
      );
    }

    function EmptyState(props) {
      return h('div', {
        style: {
          padding: '28px 16px',
          textAlign: 'center',
          color: tokens.labelSecondary,
          fontSize: 13,
          lineHeight: 1.6,
          whiteSpace: 'pre-line',
          ...(props.style || {}),
        },
      }, props.text || '暂无内容');
    }

    function Spinner(props) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: props.size || 12,
          height: props.size || 12,
          border: '2px solid ' + tokens.border2,
          borderTopColor: tokens.brand,
          borderRadius: '50%',
          animation: 'wb-spin 0.8s linear infinite',
          flex: '0 0 auto',
        },
        'aria-label': '加载中',
      });
    }

    function Button(props) {
      const variant = props.variant || 'default';
      const style = variant === 'primary'
        ? { background: tokens.brand, color: '#fff', border: '1px solid transparent' }
        : variant === 'ghost'
          ? { background: 'transparent', color: tokens.labelSecondary, border: '1px solid transparent' }
          : { background: tokens.bgLayer1, color: tokens.label, border: '1px solid ' + tokens.border2 };
      return h('button', {
        type: 'button',
        disabled: props.disabled,
        onClick: props.onClick,
        title: props.title,
        style: {
          padding: props.small ? '4px 10px' : '6px 12px',
          borderRadius: 8,
          fontSize: props.small ? 12 : 13,
          cursor: props.disabled ? 'not-allowed' : 'pointer',
          opacity: props.disabled ? 0.5 : 1,
          ...style,
        },
      }, props.children);
    }

    function Field(props) {
      return h('input', {
        value: props.value,
        defaultValue: props.defaultValue,
        placeholder: props.placeholder,
        onChange: props.onChange,
        onBlur: props.onBlur,
        onKeyDown: props.onKeyDown,
        style: {
          padding: '4px 8px',
          borderRadius: 7,
          border: '1px solid ' + tokens.border1,
          background: tokens.bgBase,
          color: tokens.label,
          fontSize: props.fontSize || 12,
          outline: 'none',
          width: '100%',
          boxSizing: 'border-box',
          ...(props.style || {}),
        },
      });
    }

    // ---------- module registry ----------
    // A "view" is a full workbench page: it owns a main-slot key, and the
    // workbench switcher (the second top-bar row) shows one tab per view.
    const registry = {
      views: new Map(),
      listeners: new Set(),
    };

    function notify() {
      registry.listeners.forEach((fn) => fn());
    }

    // Captured in apply(); the tab row and the overview page both need it.
    let layoutService = null;
    let layoutGetter = null;
    // Last measured position of the tab highlight plate (survives a remount).
    let lastGlider = { left: 0, width: 0 };

    function currentLayout() {
      if (layoutService) return layoutService;
      if (layoutGetter) {
        try { layoutService = layoutGetter() || null; } catch (_error) { /* not ready */ }
      }
      return layoutService;
    }

    function openView(id) {
      const layout = currentLayout();
      if (!layout) return;
      try {
        layout.selectPanel(id);
      } catch (err) {
        console.warn('[workbench] selectPanel failed for', id, err);
      }
    }

    function useRegistry() {
      const [, force] = React.useReducer((x) => x + 1, 0);
      React.useEffect(() => {
        const fn = () => force();
        registry.listeners.add(fn);
        return () => registry.listeners.delete(fn);
      }, []);
      return registry;
    }

    // ---------- the public workbench API ----------
    function createApi(ctx) {
      const api = {
        /**
         * Register a workbench view: one full page, one tab in the workbench
         * switcher. The view owns the `main` slot key `id`; pressing its tab
         * selects that key, so the page takes over the central area.
         * Pass `tab: false` to register the page without a tab (the shell itself
         * uses that for its overview, which hangs off the top-bar nav instead).
         * Returns a disposer; a module should keep it inside its own ctx.effect.
         */
        registerView(opts) {
          const { id, title, icon, component, order = 50, subtitle = '', badge, tab = true } = opts || {};
          if (typeof id !== 'string' || id.length === 0) throw new Error('workbench.registerView: string `id` is required');
          if (typeof component !== 'function') throw new Error('workbench.registerView: `component` is required');
          if (id === 'conversation') throw new Error('workbench.registerView: `conversation` is reserved by DSH');
          const label = title || id;
          registry.views.set(id, { id, title: label, subtitle, icon, component, order, badge, tab: tab !== false });
          notify();
          const disposeMain = ctx.slots.inject('main', () => ctx.slots.register({
            name: 'main', key: id,
          }, component));
          return () => {
            try { disposeMain(); } catch (_error) { /* already gone */ }
            registry.views.delete(id);
            notify();
          };
        },

        /** Ask the shell to repaint the switcher (after a view badge changed). */
        refresh() {
          notify();
        },

        /**
         * Contract version this shell implements. Modules check it once in
         * apply() and bail out on a mismatch instead of crashing later on a
         * missing method. Bump only on a breaking change; see docs/SPEC.md.
         */
        apiVersion: 1,

        components: { StatusDot, Card, SectionHeader, EmptyState, Spinner, Button, Field },
        tokens,
      };

      // Deprecated alias kept for modules written against the old contract:
      // a "panel" is just a view now, and the sidebar launcher is gone.
      api.registerPanel = (opts) => api.registerView(opts);
      return api;
    }

    // ---------- settings icon & page ----------
    const SETTINGS_VIEW_ID = 'workbench-settings';

    // A panel with its own tab strip: the workbench's mark, distinct from the
    // native "More" grid (four squares) so the two do not read alike.
    function IconWorkbenchTabs(props) {
      const size = props.size || 20;
      return h('svg', { viewBox: '0 0 24 24', width: size, height: size, 'aria-hidden': true, fill: 'none' },
        h('rect', { x: 3.5, y: 4.5, width: 17, height: 15, rx: 2.5, stroke: 'currentColor', strokeWidth: 1.5 }),
        h('path', { d: 'M3.5 9.2h17', stroke: 'currentColor', strokeWidth: 1.4 }),
        h('circle', { cx: 6.4, cy: 6.85, r: 0.85, fill: 'currentColor' }),
        h('circle', { cx: 9.4, cy: 6.85, r: 0.85, fill: 'currentColor' }),
        h('path', { d: 'M6.2 13.2h5.6M6.2 16h8.4', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round' }),
      );
    }

    function IconSettings(props) {
      const size = props.size || 20;
      return h('svg', { viewBox: '0 0 24 24', width: size, height: size, 'aria-hidden': true, fill: 'none' },
        h('circle', { cx: 12, cy: 12, r: 3.2, stroke: 'currentColor', strokeWidth: 1.5 }),
        h('path', {
          d: 'M19.4 13.5a7.7 7.7 0 0 0 0-3l1.7-1.2-1.9-3.3-2 .8a7.6 7.6 0 0 0-2.6-1.5L14.3 3h-3.8l-.3 2.3a7.6 7.6 0 0 0-2.6 1.5l-2-.8-1.9 3.3 1.7 1.2a7.7 7.7 0 0 0 0 3l-1.7 1.2 1.9 3.3 2-.8a7.6 7.6 0 0 0 2.6 1.5l.3 2.3h3.8l.3-2.3a7.6 7.6 0 0 0 2.6-1.5l2 .8 1.9-3.3z',
          stroke: 'currentColor', strokeWidth: 1.4, strokeLinejoin: 'round',
        }),
      );
    }

    // ---------- overview page ----------
    function WorkbenchOverview() {
      const reg = useRegistry();
      const views = Array.from(reg.views.values())
        .filter((item) => item.tab !== false)
        .sort((a, b) => a.order - b.order);

      const viewRow = (item) => h('div', {
        key: item.id,
        style: {
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px', borderBottom: '1px solid ' + tokens.border1,
        },
      },
        h('div', { style: { width: 22, height: 22, color: tokens.labelSecondary, flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          item.icon ? h(item.icon, { size: 18, active: false }) : null),
        h('div', { style: { flex: '1 1 auto', minWidth: 0 } },
          h('div', { style: { fontWeight: 550, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, item.title),
          h('div', { style: { fontSize: 11, color: tokens.labelSecondary } }, '视图 · ' + item.id),
        ),
        h(Button, {
          small: true,
          variant: 'ghost',
          onClick: () => openView(item.id),
        }, '打开'),
      );

      return h('div', {
        style: {
          padding: '24px 28px', maxWidth: 920, margin: '0 auto', height: '100%',
          boxSizing: 'border-box', overflowY: 'auto',
          color: tokens.label, background: tokens.bgBase,
        },
      },
        h('h2', { style: { margin: '0 0 4px', fontSize: 20, fontWeight: 650 } }, '工作台总览'),
        h('div', { style: { fontSize: 13, color: tokens.labelSecondary, marginBottom: 20 } },
          '已接入 ' + views.length + ' 个视图'),

        h('div', null,
          h(SectionHeader, { title: '视图', subtitle: '工作台切换页里的页面；每个模块对应一个页面' }),
          h(Card, null,
            views.length === 0
              ? h(EmptyState, { text: '还没有模块注册视图。\n模块会话按《工作台模块规范》接入后会出现在这里。' })
              : views.map(viewRow),
          ),
        ),
      );
    }

    // ────────────────────────── top bar (stage 1) ──────────────────────────
    const TOPBAR_HEIGHT = 102;

    // ---------- settings page ----------
    // Reachable from the gear in the system bar. Two jobs: turn the shell's own
    // extras on or off, and show which modules registered a page.
    function WorkbenchSettings() {
      const enabled = useFeatures();
      const reg = useRegistry();
      // Only tabbed modules belong here: the shell's own overview and this
      // settings page live in the system bar, not in the module row.
      const views = Array.from(reg.views.values())
        .filter((item) => item.tab !== false)
        .sort((a, b) => a.order - b.order);

      function toggleRow(key) {
        const meta = FEATURE_LABELS[key];
        const on = enabled[key];
        return h('div', {
          key,
          style: {
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '12px 14px', borderBottom: '1px solid ' + tokens.border1,
          },
        },
          h('div', { style: { flex: '1 1 auto', minWidth: 0 } },
            h('div', { style: { fontWeight: 550 } }, meta.title),
            h('div', { style: { fontSize: 11, color: tokens.labelSecondary } }, meta.hint),
          ),
          h('button', {
            type: 'button',
            role: 'switch',
            'aria-checked': on ? 'true' : 'false',
            'aria-label': meta.title,
            onClick: () => features.set(key, !on),
            style: {
              position: 'relative', width: 40, height: 22, borderRadius: 999,
              border: '1px solid ' + (on ? 'var(--dsw-alias-brand-primary)' : tokens.border2),
              background: on ? 'var(--dsw-alias-brand-primary)' : tokens.bgLayer2,
              cursor: 'pointer', flex: '0 0 auto', padding: 0,
              transition: 'background .15s, border-color .15s',
            },
          },
            h('span', {
              'aria-hidden': true,
              style: {
                position: 'absolute', top: 2, left: on ? 20 : 2,
                width: 16, height: 16, borderRadius: '50%',
                background: on ? '#fff' : 'var(--dsw-alias-label-secondary)',
                transition: 'left .15s',
              },
            }),
          ),
        );
      }

      function viewRow(item) {
        return h('div', {
          key: item.id,
          style: {
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px', borderBottom: '1px solid ' + tokens.border1,
          },
        },
          h('div', { style: { width: 22, height: 22, color: tokens.labelSecondary, flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            item.icon ? h(item.icon, { size: 18, active: false }) : null),
          h('div', { style: { flex: '1 1 auto', minWidth: 0 } },
            h('div', { style: { fontWeight: 550, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, item.title),
            h('div', { style: { fontSize: 11, color: tokens.labelSecondary } },
              (item.tab === false ? '无标签页 · ' : '标签页 · ') + item.id + ' · order ' + item.order),
          ),
        );
      }

      return h('div', {
        style: {
          padding: '24px 28px', maxWidth: 920, margin: '0 auto', height: '100%',
          boxSizing: 'border-box', overflowY: 'auto',
          color: tokens.label, background: tokens.bgBase,
        },
      },
        h('h2', { style: { margin: '0 0 4px', fontSize: 20, fontWeight: 650 } }, '工作台设置'),
        h('div', { style: { fontSize: 13, color: tokens.labelSecondary, marginBottom: 20 } },
          '只想要导航分层的话，上面这些都可以关掉，交给别的插件。'),
        h('div', null,
          h(SectionHeader, { title: '功能', subtitle: '外壳自带、可以单独关闭的额外功能' }),
          h(Card, null, FEATURE_KEYS.map(toggleRow)),
        ),
        h('div', { style: { marginTop: 20 } },
          h(SectionHeader, { title: '已注册的模块', subtitle: '它们出现在顶部第二行的模块栏' }),
          h(Card, null,
            views.length === 0
              ? h(EmptyState, { text: '还没有模块注册页面。' })
              : views.map(viewRow),
          ),
        ),
      );
    }

    async function restartDsh() {
      try {
        const res = await fetch('/wb/workbench/restart', { method: 'POST' });
        const json = await res.json().catch(() => null);
        if (json && json.ok === false) {
          window.alert(json.hint || '这台机器上没有可用的重启管理器，请手动重启 DSH Web。');
        }
      } catch (_error) {
        /* offline: nothing to do */
      }
    }

    function createBalanceStore(ctx) {
      // `state` must be REPLACED on every write: useSyncExternalStore compares
      // getSnapshot() results with Object.is, so mutating the same object in place
      // makes React think nothing changed and the chip never repaints.
      let state = { phase: 'loading', amount: null, error: null, updatedAt: 0 };
      const listeners = new Set();
      let inflight = null;
      let timer = null;
      const emit = () => listeners.forEach((fn) => fn());
      const set = (next) => { state = { ...state, ...next }; emit(); };
      function refresh() {
        if (inflight) return inflight;
        const remote = typeof ctx.get === 'function' ? ctx.get('remote') : ctx.remote;
        const account = remote && remote.account;
        if (!account || typeof account.getBalance !== 'function') {
          set({ phase: 'failed', error: 'account 服务不可用' });
          return null;
        }
        const meta = { version: '1.0.0', locale: 'zh-CN', timezoneOffsetSeconds: -new Date().getTimezoneOffset() * 60 };
        inflight = account.getBalance(meta)
          .then((result) => {
            if (!result || result.ok !== true) throw new Error('余额读取被拒绝');
            const value = result.value;
            if (!value || value.status !== 'ready') throw new Error('余额不可用');
            const wallets = Array.isArray(value.value) ? value.value : [];
            const wallet = wallets.find((w) => w && w.currency === 'CNY') || wallets[0] || null;
            set({ phase: 'ready', amount: wallet ? Number(wallet.balance) : null, error: null, updatedAt: Date.now() });
          })
          .catch((err) => {
            set({ phase: state.phase === 'ready' ? 'stale' : 'failed', error: String((err && err.message) || err) });
          })
          .finally(() => { inflight = null; });
        return inflight;
      }
      return {
        refresh,
        start() { refresh(); timer = setInterval(() => { if (document.hidden !== true) refresh(); }, 5000); },
        stop() { if (timer) clearInterval(timer); timer = null; },
        subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
        getSnapshot() { return state; },
      };
    }

    function createAccountStore(ctx) {
      // Same rule as the balance store: replace the snapshot, never mutate it.
      let state = { phase: 'loading', name: null, avatar: null, error: null };
      const listeners = new Set();
      let inflight = null;
      const emit = () => listeners.forEach((fn) => fn());
      const set = (next) => { state = { ...state, ...next }; emit(); };
      function refresh() {
        if (inflight) return inflight;
        const account = ctx.remote && ctx.remote.account;
        if (!account || typeof account.getProfile !== 'function') { set({ phase: 'failed' }); return null; }
        const meta = { version: '1.0.0', locale: 'zh-CN', timezoneOffsetSeconds: -new Date().getTimezoneOffset() * 60 };
        inflight = account.getProfile(meta)
          .then((result) => {
            if (result && result.ok && result.value && result.value.status === 'ready') {
              const p = result.value.value;
              set({ phase: 'ready', name: p.name || p.contact || '已登录', avatar: p.avatarUrl || null, error: null });
            } else {
              set({ phase: 'failed', error: 'profile 不可用' });
            }
          })
          .catch((err) => set({ phase: 'failed', error: String((err && err.message) || err) }))
          .finally(() => { inflight = null; });
        return inflight;
      }
      return {
        refresh,
        start() { refresh(); },
        stop() {},
        subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
        getSnapshot() { return state; },
      };
    }

    function balanceTone(amount) {
      if (typeof amount !== 'number' || !isFinite(amount)) return 'muted';
      if (amount > 100) return 'green';
      if (amount >= 10) return 'amber';
      return 'red';
    }

    // Linear icons for the top bar / workspaces.
    const BRAND_PATH = 'M48.8354 10.0479C48.3232 9.79199 48.1025 10.2798 47.8032 10.5278C47.7007 10.6079 47.6143 10.7119 47.5273 10.8076C46.7793 11.624 45.9048 12.1597 44.7622 12.0957C43.0923 12 41.666 12.5356 40.4058 13.8398C40.1377 12.2319 39.2476 11.272 37.8926 10.6558C37.1836 10.3359 36.4668 10.0156 35.9702 9.31982C35.6235 8.82373 35.5293 8.27197 35.356 7.72754C35.2456 7.3999 35.1353 7.06396 34.7651 7.00781C34.3633 6.94385 34.2056 7.2876 34.0479 7.57568C33.418 8.75195 33.1733 10.0479 33.1973 11.3599C33.2524 14.312 34.4736 16.6641 36.8999 18.3359C37.1758 18.5278 37.2466 18.7197 37.1597 19C36.9946 19.5757 36.7974 20.1357 36.624 20.7119C36.5137 21.0801 36.3486 21.1597 35.9624 21C34.6309 20.4321 33.481 19.5918 32.4644 18.5757C30.7393 16.8721 29.1792 14.9917 27.2334 13.52C26.7764 13.1758 26.3193 12.856 25.8467 12.5518C23.8618 10.584 26.1069 8.96777 26.627 8.77588C27.1704 8.57568 26.8159 7.8877 25.0591 7.896C23.3022 7.90381 21.6953 8.50391 19.647 9.30371C19.3477 9.42383 19.0322 9.51172 18.7095 9.58398C16.8501 9.22363 14.9199 9.14355 12.9033 9.37598C9.10596 9.80762 6.07275 11.6396 3.84326 14.7681C1.16455 18.5278 0.53418 22.7998 1.30664 27.2559C2.11768 31.9521 4.46582 35.8398 8.07373 38.8799C11.8159 42.0322 16.1255 43.5762 21.041 43.2803C24.0269 43.104 27.3516 42.6963 31.1016 39.4561C32.0469 39.936 33.0396 40.1279 34.686 40.272C35.9546 40.3921 37.1758 40.208 38.1211 40.0078C39.6021 39.688 39.4995 38.2881 38.9639 38.0322C34.623 35.9678 35.5762 36.8081 34.71 36.1279C36.9155 33.4639 40.2402 30.6958 41.54 21.728C41.6426 21.0161 41.5557 20.5679 41.54 19.9917C41.5322 19.6396 41.6108 19.5039 42.0049 19.4639C43.0923 19.3359 44.1479 19.0317 45.1167 18.4878C47.9292 16.9199 49.064 14.3438 49.3315 11.2559C49.3711 10.7837 49.3237 10.2959 48.8354 10.0479ZM24.3262 37.8398C20.1196 34.4639 18.0791 33.3521 17.2358 33.3999C16.4482 33.4482 16.5898 34.3682 16.7632 34.9678C16.9443 35.5601 17.1812 35.9683 17.5117 36.4878C17.7402 36.832 17.8979 37.3442 17.2832 37.728C15.9282 38.584 13.5728 37.4399 13.4624 37.3838C10.7207 35.7358 8.42822 33.5601 6.81348 30.584C5.25342 27.7197 4.34766 24.6479 4.19775 21.3677C4.1582 20.5757 4.38672 20.2959 5.15869 20.1519C6.17529 19.96 7.22314 19.9199 8.23926 20.0718C12.5327 20.7119 16.1885 22.6719 19.2529 25.7759C21.002 27.5439 22.3252 29.6558 23.6885 31.7202C25.1377 33.9121 26.6978 36 28.6831 37.7119C29.3843 38.312 29.9434 38.7681 30.479 39.104C28.8643 39.2881 26.1699 39.3281 24.3262 37.8398ZM26.3433 24.6001C26.3433 24.248 26.6191 23.9678 26.9658 23.9678C27.0444 23.9678 27.1152 23.9839 27.1782 24.0078C27.2651 24.04 27.3438 24.0879 27.4067 24.1602C27.5171 24.272 27.5801 24.4321 27.5801 24.6001C27.5801 24.9521 27.3042 25.2319 26.9575 25.2319C26.6108 25.2319 26.3433 24.9521 26.3433 24.6001ZM32.6064 27.8799C32.2046 28.0479 31.8027 28.1919 31.4165 28.208C30.8179 28.2397 30.1641 27.9922 29.8096 27.688C29.2583 27.2158 28.8643 26.9521 28.6987 26.1279C28.6279 25.7759 28.6675 25.2319 28.7305 24.9199C28.8721 24.248 28.7144 23.8159 28.2495 23.4238C27.8716 23.104 27.3911 23.0161 26.8633 23.0161C26.666 23.0161 26.4849 22.9277 26.3511 22.856C26.1304 22.7441 25.9492 22.4639 26.1226 22.1201C26.1777 22.0078 26.4458 21.7358 26.5088 21.688C27.2256 21.272 28.0527 21.4077 28.8169 21.7197C29.5259 22.0161 30.0615 22.5601 30.834 23.3281C31.6216 24.2559 31.7632 24.5117 32.2124 25.208C32.5669 25.752 32.8901 26.312 33.1104 26.9521C33.2446 27.3521 33.0713 27.6802 32.6064 27.8799Z';
    function IconBrand(props) {
      const s = props.size || 20;
      return h('svg', { viewBox: '0 0 50 50', width: s, height: s, fill: 'none', 'aria-hidden': true },
        h('path', { d: BRAND_PATH, fill: '#4D6BFE' }),
      );
    }
    function IconGrid(props) {
      const s = props.size || 18;
      return h('svg', { viewBox: '0 0 24 24', width: s, height: s, fill: 'none', 'aria-hidden': true },
        h('path', { d: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z', stroke: 'currentColor', strokeWidth: 1.6, strokeLinejoin: 'round' }));
    }
    function IconPlugins(props) {
      const s = props.size || 18;
      return h('svg', { viewBox: '0 0 24 24', width: s, height: s, fill: 'none', 'aria-hidden': true },
        h('path', { d: 'M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z', stroke: 'currentColor', strokeWidth: 1.6, strokeLinejoin: 'round' }));
    }
    function IconClock(props) {
      const s = props.size || 18;
      return h('svg', { viewBox: '0 0 24 24', width: s, height: s, fill: 'none', 'aria-hidden': true },
        h('circle', { cx: 12, cy: 12, r: 8, stroke: 'currentColor', strokeWidth: 1.6 }),
        h('path', { d: 'M12 7.5V12l3 2', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' }));
    }
    function IconRestart(props) {
      const s = props.size || 16;
      return h('svg', { viewBox: '0 0 24 24', width: s, height: s, fill: 'none', 'aria-hidden': true },
        h('path', { d: 'M20 12a8 8 0 1 1-2.34-5.66M20 4v5h-5', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }));
    }
    function IconChat(props) {
      const s = props.size || 16;
      return h('svg', { viewBox: '0 0 24 24', width: s, height: s, fill: 'none', 'aria-hidden': true },
        h('path', { d: 'M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-4 3.5V6z', stroke: 'currentColor', strokeWidth: 1.6, strokeLinejoin: 'round' }));
    }

    // ---------- theme switcher ----------
    // `paper` cannot be a persisted preference: DSH only accepts light / dark /
    // system there, and anything else is dropped when settings resync (that is
    // why switching models used to fall back to dark). So the paper palette is
    // an override layer on top of the legal `light` preference, remembered in
    // localStorage by us.
    const PAPER_KEY = 'dsh-workbench:paper';
    const PAPER_TOKENS = {
      '--dsw-alias-bg-base': '#f7f3ea',
      '--dsw-alias-bg-layer-1': '#f2ece0',
      '--dsw-alias-bg-layer-2': '#ece5d6',
      '--dsw-alias-bg-overlay': '#faf5e9',
      '--dsw-alias-border-l1': '#d8cfba',
      '--dsw-alias-border-l2': '#c6bba2',
      '--dsw-alias-brand-primary': '#8a6a45',
      '--dsw-alias-label-primary': '#3b342a',
      '--dsw-alias-label-secondary': '#6f6557',
      '--dsw-alias-state-error-primary': '#a34a3c',
      '--dsw-alias-state-warn-primary': '#a8792c',
      '--dsw-alias-state-success-primary': '#4f7a5a',
      '--dsw-alias-state-idle-primary': '#a49a89',
      '--dsw-specific-sidebar-fill': '#f2ece0',
      // Chat bubbles: the light base uses a pale DeepSeek blue, which looks
      // wrong on paper. These two are outside the alias layer.
      '--dsw-specific-bubble': '#f2ecdf',
      '--dsw-specific-bubble-highlight': '#e9dfcb',
      // Pale blue surfaces the alias list does not cover: command chips,
      // reference pills, selected file tabs, "load earlier", tool cards.
      '--dsw-alias-state-business-tertiary': '#f1e9da',
      '--dsw-alias-state-business-primary': '#8a6a45',
      '--dsw-specific-sidebar-nav-item-active-accent': '#f1e9da',
      '--dsw-specific-sidebar-nav-item-active': '#efe9db',
      '--dsw-specific-selector': '#f1e9da',
      '--dsw-specific-input-major': '#f2ece0',
      '--dsw-specific-tip': '#f7f2e7',
      '--dsw-specific-menu': '#fcf9f3',
      // Scrollbars read their own alias pair and default to neutral grey.
      '--dsw-alias-scrollbar-bg-l1': '#d8cfba',
      '--dsw-alias-scrollbar-bg-l2': '#d8cfba',
      '--dsw-alias-scrollbar-hover-l1': '#c6bba2',
      '--dsw-alias-scrollbar-hover-l2': '#c6bba2',
      // The neutral greys are blue-tinted. Buttons ("load earlier"), inputs,
      // chips and cards read their pale surfaces from this ramp, so warm it up
      // too; deep steps stay untouched because they are text/borders.
      '--dsw-static-neutral-bluish-00': '#fbf6ea',
      '--dsw-static-neutral-bluish-50': '#faf6ee',
      '--dsw-static-neutral-bluish-55': '#f8f4ea',
      '--dsw-static-neutral-bluish-60': '#f7f3ea',
      '--dsw-static-neutral-bluish-75': '#f4eee1',
      '--dsw-static-neutral-bluish-90': '#f2ecdf',
      '--dsw-static-neutral-bluish-100': '#efe9db',
      '--dsw-static-neutral-bluish-150': '#ece6d7',
      '--dsw-static-neutral-bluish-200': '#e7dfcd',
    };

    // Swatches double as both the current-state indicator and the toggle.
    const THEME_SWATCHES = [
      { id: 'dark', label: '深色', color: '#15171a', ring: 'rgba(255,255,255,0.28)' },
      { id: 'light', label: '浅色', color: '#f7f8fa', ring: 'rgba(0,0,0,0.35)' },
      { id: 'paper', label: '纸质', color: '#efe4cd', ring: 'rgba(0,0,0,0.28)' },
    ];

    function createThemeSwitcher(ctx) {
      const readPreference = () => {
        try {
          const theme = typeof ctx.get === 'function' ? ctx.get('theme') : ctx.theme;
          const snapshot = theme && typeof theme.getTheme === 'function' ? theme.getTheme() : null;
          return snapshot ? snapshot.preference : null;
        } catch (_error) {
          return null;
        }
      };
      const readPaper = () => {
        try { return window.localStorage.getItem(PAPER_KEY) === '1'; } catch (_error) { return false; }
      };
      const writePaper = (on) => {
        try { window.localStorage.setItem(PAPER_KEY, on ? '1' : '0'); } catch (_error) { /* storage unavailable */ }
      };

      let paperDispose = null;
      function setPaper(on) {
        const theme = typeof ctx.get === 'function' ? ctx.get('theme') : ctx.theme;
        if (!theme) return;
        if (on) {
          if (paperDispose) return;
          // Legal persisted preference first, then paint the paper layer on top.
          try { theme.setTheme('light'); } catch (error) { console.warn('[workbench] setTheme light failed', error); }
          const modes = {};
          Object.keys(PAPER_TOKENS).forEach((name) => {
            modes[name] = { light: PAPER_TOKENS[name], dark: PAPER_TOKENS[name] };
          });
          try {
            paperDispose = typeof theme.overrideTokens === 'function' ? theme.overrideTokens('workbench:paper', modes) : null;
          } catch (error) {
            console.warn('[workbench] paper override failed', error);
            paperDispose = null;
          }
        } else if (paperDispose) {
          try { paperDispose(); } catch (_error) { /* already gone */ }
          paperDispose = null;
        }
        // Marker for paper-only rules (code surfaces) that tokens cannot reach.
        try {
          if (on) document.body.setAttribute('data-wb-paper', '1');
          else document.body.removeAttribute('data-wb-paper');
        } catch (_error) { /* body not ready */ }
      }

      function ThemeSwitcher() {
        const boxRef = React.useRef(null);
        const [paper, setPaperState] = React.useState(readPaper);
        const [preference, setPreference] = React.useState(readPreference);

        // The account block is fixed to the right and changes width (a reconnect
        // banner widens it), so park the swatches against its measured left edge
        // instead of a guessed margin.
        React.useEffect(() => {
          const box = boxRef.current;
          if (!box) return undefined;
          const place = () => {
            const settings = document.querySelector('[class*="settingsArea"]');
            if (!settings) {
              box.style.right = '150px';
              return;
            }
            const rect = settings.getBoundingClientRect();
            if (rect.width > 0) {
              box.style.right = (rect.width + 16 + 12) + 'px';
              box.style.top = rect.top + 'px';
              box.style.height = rect.height + 'px';
            } else {
              // Narrow screens hide the account block; pin the swatches right.
              box.style.right = '12px';
              box.style.top = '2px';
              box.style.height = '40px';
            }
          };
          place();
          let observer = null;
          const settings = document.querySelector('[class*="settingsArea"]');
          if (settings && typeof ResizeObserver !== 'undefined') {
            observer = new ResizeObserver(place);
            // border-box: the account's width changes through its chrome, not
            // just its text content.
            observer.observe(settings, { box: 'border-box' });
          }
          window.addEventListener('resize', place);
          return () => {
            if (observer) observer.disconnect();
            window.removeEventListener('resize', place);
          };
        }, []);

        // Re-apply the saved paper layer after a reload / remount.
        React.useEffect(() => {
          if (readPaper()) setPaper(true);
        }, []);

        // Swatches only re-render on real preference changes; the paper layer is
        // local state because the theme service does not know about it.
        React.useEffect(() => {
          if (typeof ctx.on !== 'function') return undefined;
          let off = null;
          try {
            off = ctx.on('theme/change', () => {
              const next = readPreference();
              setPreference(next);
              // Somebody picked a concrete palette in DSH's own settings: drop the layer.
              if (next && next !== 'light' && paper) {
                setPaper(false);
                writePaper(false);
                setPaperState(false);
              }
            });
          } catch (_error) {
            off = null;
          }
          return () => { if (typeof off === 'function') off(); };
        }, [paper]);

        const activeId = paper ? 'paper' : (preference === 'dark' ? 'dark' : 'light');

        const choose = (id) => {
          const theme = typeof ctx.get === 'function' ? ctx.get('theme') : ctx.theme;
          if (!theme) return;
          if (id === 'paper') {
            setPaper(true);
            writePaper(true);
            setPaperState(true);
            return;
          }
          setPaper(false);
          writePaper(false);
          setPaperState(false);
          try { theme.setTheme(id); } catch (error) { console.warn('[workbench] setTheme failed', error); }
        };

        return h('div', {
          ref: boxRef,
          style: {
            position: 'fixed', top: 2, height: 40, zIndex: 301,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          },
          title: '主题',
        },
          THEME_SWATCHES.map((swatch) => {
            const active = activeId === swatch.id;
            return h('button', {
              key: swatch.id,
              type: 'button',
              title: swatch.label,
              'aria-label': swatch.label,
              'aria-pressed': active ? 'true' : 'false',
              onClick: () => choose(swatch.id),
              style: {
                width: 17, height: 17, padding: 0, borderRadius: '50%', flex: '0 0 auto',
                background: swatch.color,
                // A hairline ring keeps the dark swatch readable on a dark bar;
                // the selected one only thickens and takes the brand color.
                border: (active ? '1.5px' : '1px') + ' solid ' + (active ? 'var(--dsw-alias-brand-primary)' : swatch.ring),
                boxSizing: 'border-box',
                cursor: 'pointer',
                transition: 'border-color .12s, border-width .12s',
              },
            });
          }),
        );
      }
      return ThemeSwitcher;
    }

    // ---------- native sidebar panel mirror ----------
    // The workbench keeps no navigation list of its own: whatever the sidebar
    // lists (Plugins, Automations, More — plus any plugin that registers a
    // panel later) is mirrored into the top bar, click delegated to that row.
    function createPanelMirror() {
      function PanelMirror() {
        const [items, setItems] = React.useState(function () { return []; });

        React.useEffect(function () {
          function sync() {
            const list = document.querySelector('nav[class*="panelList"]');
            if (!list) return;
            const next = [];
            Array.prototype.forEach.call(list.children, function (node) {
              const btn = node.tagName === 'BUTTON'
                ? node
                : (node.querySelector ? node.querySelector('button') : null);
              if (!btn) return;
              const label = btn.getAttribute('aria-label') || String(node.textContent || '').trim();
              const svg = btn.querySelector('svg');
              next.push({ label: label || '入口', html: svg ? svg.outerHTML : '', btn: btn });
            });
            setItems(function (prev) {
              const same = prev.length === next.length && prev.every(function (item, index) {
                return item.label === next[index].label && item.html === next[index].html;
              });
              return same ? prev : next;
            });
          }
          sync();
          const observer = new MutationObserver(sync);
          observer.observe(document.body, { childList: true, subtree: true });
          return function () { observer.disconnect(); };
        }, []);

        return h('div', { className: 'wb-topbar-icons', style: { display: 'flex', gap: 2, flex: 1, overflow: 'hidden' } },
          items.map(function (item, index) {
            return h('button', {
              key: item.label + ':' + index,
              type: 'button',
              className: 'wb-nav-item',
              'aria-label': item.label,
              onClick: function () {
                try { item.btn.click(); } catch (_error) { /* row went away */ }
              },
              style: {
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                gap: 4, height: 34, padding: '0 9px', borderRadius: 8, border: 'none',
                background: 'transparent', color: 'var(--dsw-alias-label-secondary)',
                cursor: 'pointer', flex: '0 0 auto', transition: 'background .15s, color .15s',
              },
            },
              h('span', {
                'aria-hidden': true,
                style: { display: 'inline-flex', width: 18, height: 18, flex: '0 0 auto' },
                dangerouslySetInnerHTML: { __html: item.html },
              }),
              h('span', { className: 'wb-nav-label' }, item.label),
            );
          }),
        );
      }
      return PanelMirror;
    }

    function createTopBar(ctx, balance) {
      const ThemeSwitcher = createThemeSwitcher(ctx);
      const PanelMirror = createPanelMirror();

      function BalanceChip() {
        const snap = React.useSyncExternalStore(balance.subscribe, balance.getSnapshot);
        const [hover, setHover] = React.useState(false);
        const tone = snap.phase === 'ready' ? balanceTone(snap.amount) : 'muted';
        const value = snap.phase === 'ready' && typeof snap.amount === 'number' ? snap.amount.toFixed(2) : (snap.phase === 'loading' ? '…' : '—');
        const toneColor = tone === 'green' ? '#4ade80' : tone === 'amber' ? '#e3b341' : tone === 'red' ? '#f87171' : 'var(--dsw-alias-label-secondary)';
        // The border follows the theme: hard-coded dark greens read as a black
        // ring on light/paper backgrounds.
        const borderBase = 'var(--dsw-alias-border-l2)';
        const at = new Date(snap.updatedAt || Date.now()).toLocaleTimeString('zh-CN', { hour12: false });
        return h('div', {
          style: { position: 'relative', display: 'inline-flex' },
          onMouseEnter: () => setHover(true),
          onMouseLeave: () => setHover(false),
        },
          h('button', {
            type: 'button',
            className: 'wb-balance',
            onClick: () => window.open('https://platform.deepseek.com/top_up', '_blank', 'noopener,noreferrer'),
            style: { display: 'inline-flex', alignItems: 'center', gap: 3, height: 26, padding: '0 10px', borderRadius: 8, border: '1px solid ' + borderBase, background: 'transparent', color: toneColor, fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums', cursor: 'pointer', transition: 'background .12s, border-color .12s' },
          }, h('span', { 'aria-hidden': true }, '¥'), h('span', null, value)),
          hover && snap.phase === 'ready'
            ? h('div', { className: 'wb-balance-tip' },
                h('div', null, '充值余额 ¥' + (snap.amount || 0).toFixed(2)),
                h('div', { style: { opacity: 0.7 } }, '更新于 ' + at),
                h('div', null, '点击前往充值'),
              )
            : null,
        );
      }

      const accountStore = createAccountStore(ctx);
      accountStore.start();

      function AccountButton() {
        const snap = React.useSyncExternalStore(accountStore.subscribe, accountStore.getSnapshot);
        const [open, setOpen] = React.useState(false);
        const name = snap.phase === 'ready' ? snap.name : (snap.phase === 'loading' ? '…' : '账号');
        const menuItem = (label, onClick) => h('button', {
          type: 'button',
          onClick: () => { setOpen(false); onClick(); },
          style: { display: 'block', width: '100%', textAlign: 'left', padding: '7px 12px', border: 'none', background: 'transparent', color: 'var(--dsw-alias-label-primary)', cursor: 'pointer', fontSize: 12 },
        }, label);
        const account = ctx.remote && ctx.remote.account;
        const meta = { version: '1.0.0', locale: 'zh-CN', timezoneOffsetSeconds: -new Date().getTimezoneOffset() * 60 };
        return h('div', { style: { position: 'relative' } },
          h('button', {
            type: 'button', title: name, onClick: () => setOpen((v) => !v),
            style: { display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 10px', borderRadius: 8, border: '1px solid var(--dsw-alias-border-l2)', background: 'transparent', color: 'var(--dsw-alias-label-primary)', cursor: 'pointer', fontSize: 12 },
          }, h('span', { style: { maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, name)),
          open ? h('div', {
            style: { position: 'absolute', right: 0, top: 'calc(100% + 6px)', minWidth: 160, background: 'var(--dsw-alias-bg-overlay)', border: '1px solid var(--dsw-alias-border-l1)', borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', padding: '4px 0', zIndex: 200 },
          },
            menuItem('设置', () => { const layout = ctx.get('layout'); if (layout) { try { layout.selectPanel('settings'); } catch (_e) {} } }),
            menuItem('意见反馈', () => window.open('https://github.com/deepseek-ai/deepseek-harness/issues', '_blank', 'noopener,noreferrer')),
            menuItem('退出登录', () => { if (account && account.signOut) Promise.resolve(account.signOut(meta)).catch(() => {}); }),
          ) : null,
        );
      }

      function TopBar(props) {
        const rootRef = React.useRef(null);
        const tabsRef = React.useRef(null);
        const enabled = useFeatures();
        const reg = useRegistry();
        const usePanelInfo = props.usePanelInfo;
        const panelInfo = typeof usePanelInfo === 'function' ? usePanelInfo((s) => s) : null;
        const activePanelId = panelInfo ? panelInfo.activePanelId : null;
        const views = Array.from(reg.views.values())
          .filter((item) => item.tab !== false)
          .sort((a, b) => a.order - b.order);
        const tabs = [{ id: null, title: '会话', icon: IconChat, subtitle: '当前会话与对话记录' }].concat(views);
        const tabKey = tabs.map((item) => (item.id === null ? '__conversation' : item.id)).join('|');
        // Kept outside the component: if the shell ever remounts the top bar while
        // switching panels, the plate still starts from where it was instead of
        // teleporting to the new tab.
        const [glider, setGlider] = React.useState(lastGlider.width > 0 ? lastGlider : null);

        // The selected tab's grey plate: measured from the live DOM and animated
        // between tabs, so the highlight slides instead of blinking tab to tab.
        React.useLayoutEffect(() => {
          const host = tabsRef.current;
          if (!host) return undefined;
          const measure = () => {
            const el = host.querySelector('[data-active="1"]');
            if (!el) { setGlider(null); return; }
            const next = { left: el.offsetLeft, width: el.offsetWidth };
            lastGlider = next;
            setGlider(next);
          };
          measure();
          const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(measure) : null;
          if (observer) observer.observe(host);
          window.addEventListener('resize', measure);
          return () => {
            if (observer) observer.disconnect();
            window.removeEventListener('resize', measure);
          };
        }, [activePanelId, tabKey]);

        React.useEffect(() => {
          const el = rootRef.current;
          if (!el) return undefined;
          let frame = el.parentElement;
          while (frame && frame !== document.body && getComputedStyle(frame).display !== 'grid') frame = frame.parentElement;
          const cleanup = [];
          if (frame && frame !== document.body) {
            frame.style.paddingTop = TOPBAR_HEIGHT + 'px';
            frame.style.boxSizing = 'border-box';
            cleanup.push(() => {
              frame.style.paddingTop = '';
              frame.style.boxSizing = '';
            });
          }
          const wsRoot = document.querySelector('[class*="sidebarCol"] [class*="workspaces"]');
          if (wsRoot) {
            Array.from(wsRoot.children).forEach((g, i) => { if (i > 0) g.style.display = 'none'; });
          }
          // Narrow screens keep the official sidebar toggle: the workbench has no
          // session list of its own, so hiding it strands phone users.
          const narrowScreen = typeof window !== 'undefined' && window.innerWidth < 768;
          document.querySelectorAll('button[aria-label]').forEach((b) => {
            const label = b.getAttribute('aria-label') || '';
            if (!narrowScreen && (label.includes('侧栏') || label.includes('侧边栏') || label.includes('折叠') || label.includes('collapse') || label.includes('toggle'))) {
              b.style.display = 'none';
            }
          });
          if (narrowScreen) {
            // The official toggle lives inside the translated sidebar container,
            // so a fixed copy would ride along with it. Own button in <body>,
            // clicks delegated to the official one.
            const original = Array.from(document.querySelectorAll('button[aria-label]'))
              .find((b) => b.getAttribute('aria-label') === '打开侧边栏');
            if (original) {
              const toggle = document.createElement('button');
              toggle.type = 'button';
              toggle.className = 'wb-mobile-sidebar-toggle';
              toggle.setAttribute('aria-label', '显示会话列表');
              toggle.textContent = '☰';
              toggle.addEventListener('click', () => original.click());
              document.body.appendChild(toggle);
              cleanup.push(() => toggle.remove());
            }
          }
          const settings = document.querySelector('[class*="settingsArea"]');
          if (settings) {
            settings.style.position = 'fixed';
            settings.style.top = '2px';
            settings.style.right = '16px';
            settings.style.left = 'auto';
            settings.style.bottom = 'auto';
            settings.style.width = 'max-content';
            settings.style.zIndex = '300';
            cleanup.push(() => {
              settings.style.position = '';
              settings.style.top = '';
              settings.style.right = '';
              settings.style.left = '';
              settings.style.bottom = '';
              settings.style.width = '';
              settings.style.zIndex = '';
            });
          }
          const menuObserver = new MutationObserver(() => {
            document.querySelectorAll('[role="menu"]').forEach((menu) => {
              const txt = menu.textContent || '';
              if (txt.includes('退出登录')) menu.style.top = '56px';
            });
          });
          menuObserver.observe(document.body, { childList: true, subtree: true });
          return () => {
            cleanup.forEach((fn) => fn());
            menuObserver.disconnect();
          };
        }, []);

        const selectPanel = (id) => openView(id);
        const iconBtn = (id, label, Icon) => h('button', {
          key: id, type: 'button', onClick: () => selectPanel(id),
          className: 'wb-nav-item',
          style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 4, height: 34, padding: '0 9px', borderRadius: 8, border: 'none', background: 'transparent', color: 'var(--dsw-alias-label-secondary)', cursor: 'pointer', flex: '0 0 auto', transition: 'background .15s, color .15s' },
        }, h(Icon, { size: 18 }), h('span', { className: 'wb-nav-label' }, label));

        const viewTab = (item) => {
          const active = item.id === null
            ? (activePanelId === null || activePanelId === undefined)
            : activePanelId === item.id;
          let badge = null;
          if (typeof item.badge === 'function') {
            try { badge = item.badge(); } catch (_error) { badge = null; }
          }
          const showBadge = badge !== null && badge !== undefined && badge !== '' && badge !== 0 && badge !== false;
          return h('button', {
            key: item.id === null ? '__conversation' : item.id,
            type: 'button',
            className: 'wb-view-tab',
            'data-active': active ? '1' : '0',
            onClick: () => selectPanel(item.id),
            style: {
              position: 'relative', zIndex: 1,
              display: 'inline-flex', alignItems: 'center', gap: 6,
              height: 31, padding: '0 11px', borderRadius: 7,
              border: 'none',
              background: 'transparent',
              color: active ? 'var(--dsw-alias-label-primary)' : 'var(--dsw-alias-label-secondary)',
              fontWeight: 400,
              fontSize: 12,
              cursor: 'pointer', flex: '0 0 auto',
              transition: 'color .12s',
            },
          },
            item.icon ? h(item.icon, { size: 15, active }) : null,
            h('span', null, item.title),
            showBadge ? h('span', { className: 'wb-view-tab-badge' }, String(badge)) : null,
          );
        };

        return h('div', { ref: rootRef, style: { position: 'fixed', top: 0, left: 0, right: 0, height: TOPBAR_HEIGHT, zIndex: 100, pointerEvents: 'auto', display: 'flex', flexDirection: 'column', background: 'var(--dsw-alias-bg-base)', borderBottom: '1px solid var(--dsw-alias-border-l1)' } },
          h('div', { style: { height: 56, display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px' } },
            h('div', { className: 'wb-topbar-brand', style: { width: 214, flex: '0 0 auto' } }),
            // System-level entry, first in the top-left corner: the workbench's
            // own mark opens its settings (feature switches + module list).
            h('button', {
              type: 'button',
              className: 'wb-nav-item wb-settings-entry',
              'aria-label': '工作台设置',
              onClick: () => selectPanel(SETTINGS_VIEW_ID),
              style: {
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                gap: 4, height: 34, padding: '0 9px', borderRadius: 8, border: 'none',
                background: 'transparent', color: 'var(--dsw-alias-label-secondary)',
                cursor: 'pointer', flex: '0 0 auto', transition: 'background .15s, color .15s',
              },
            },
              h(IconWorkbenchTabs, { size: 18 }),
              h('span', { className: 'wb-nav-label' }, '工作台'),
            ),
            h(PanelMirror),
            enabled.theme ? h(ThemeSwitcher) : null,
          ),
          h('div', { style: { height: 45, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', borderTop: '1px solid var(--dsw-alias-border-l1)' } },
            h('div', { ref: tabsRef, style: { position: 'relative', display: 'flex', alignItems: 'center', gap: 4, flex: 1, overflowX: 'auto', overflowY: 'hidden' } },
              glider
                ? h('div', {
                    className: 'wb-tab-glider',
                    'aria-hidden': true,
                    style: {
                      position: 'absolute', top: 0, height: 31, borderRadius: 7,
                      // translateX keeps the slide on the compositor: switching back
                      // to the (heavy) conversation page must not drop its frames.
                      left: 0, width: glider.width,
                      transform: 'translateX(' + glider.left + 'px)',
                      background: 'var(--dsw-alias-bg-layer-2)',
                      boxShadow: 'inset 0 0 0 1px var(--dsw-alias-border-l2)',
                      pointerEvents: 'none', zIndex: 0,
                    },
                  })
                : null,
              tabs.map(viewTab),
            ),
            h('div', { style: { display: 'flex', alignItems: 'center', gap: 8, flex: '0 0 auto' } },
              enabled.balance ? h(BalanceChip, null) : null,
              enabled.restart ? h('button', {
                type: 'button', title: '重启 DSH', className: 'wb-restart',
                onClick: () => { restartDsh(ctx); },
                style: { width: 28, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: '1px solid var(--dsw-alias-border-l2)', background: 'transparent', color: 'var(--dsw-alias-label-secondary)', cursor: 'pointer', flex: '0 0 auto', transition: 'background .12s, color .12s, border-color .12s' },
              }, h(IconRestart, { size: 15 })) : null,
            ),
          ),
        );
      }
      return TopBar;
    }

    // ───────────────────────────── 每轮费用 ─────────────────────────────
    // 官方价目（2026-10-18，元 / 百万 tokens）：{ 空闲, 高峰 }
    var PRICING = {
      "deepseek-flash": {
        offPeak: { cacheHit: 0.02, cacheMiss: 1.0, output: 4.0 },
        peak: { cacheHit: 0.04, cacheMiss: 2.0, output: 8.0 },
      },
      "deepseek-v4-pro": {
        offPeak: { cacheHit: 0.15, cacheMiss: 4.5, output: 13.5 },
        peak: { cacheHit: 0.3, cacheMiss: 9.0, output: 27.0 },
      },
    };

    var BJ_FORMAT = null;
    function beijingParts(ts) {
      try {
        if (BJ_FORMAT === null) {
          BJ_FORMAT = new Intl.DateTimeFormat("en-US", {
            timeZone: "Asia/Shanghai",
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
        }
        var parts = BJ_FORMAT.formatToParts(new Date(ts));
        var out = {};
        for (var i = 0; i < parts.length; i += 1) out[parts[i].type] = parts[i].value;
        var hour = Number(out.hour);
        if (hour === 24) hour = 0;
        return { weekday: out.weekday, hour: hour, minute: Number(out.minute || 0) };
      } catch (_error) {
        var d = new Date(ts);
        var shifted = new Date(d.getTime() + (d.getTimezoneOffset() + 480) * 60000);
        return {
          weekday: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][shifted.getDay()],
          hour: shifted.getHours(),
          minute: shifted.getMinutes(),
        };
      }
    }

    function isPeak(ts) {
      var p = beijingParts(ts == null ? Date.now() : ts);
      if (p.weekday === "Sat" || p.weekday === "Sun") return false;
      var minutes = p.hour * 60 + p.minute;
      return (
        (minutes >= 9 * 60 && minutes < 12 * 60) ||
        (minutes >= 14 * 60 && minutes < 18 * 60)
      );
    }

    function num(value) {
      return typeof value === "number" && isFinite(value) && value > 0 ? value : 0;
    }

    function modelOf(usage) {
      var routes = usage && usage.routes;
      if (Array.isArray(routes)) {
        for (var i = 0; i < routes.length; i += 1) {
          if (routes[i] && typeof routes[i].model === "string" && routes[i].model) {
            return routes[i].model;
          }
        }
      }
      return "deepseek-flash";
    }

    function pricesFor(model) {
      var key = String(model || "").toLowerCase();
      return key.indexOf("v4-pro") >= 0 ? PRICING["deepseek-v4-pro"] : PRICING["deepseek-flash"];
    }

    function timeMs(value) {
      var n = typeof value === "number" ? value : Number(value);
      if (!isFinite(n) || n <= 0) return undefined;
      // Turn times can arrive in seconds; anything below 1e12 ms is seconds.
      return n < 1e12 ? n * 1000 : n;
    }

    function computeCost(usage, ts) {
      var model = modelOf(usage);
      var peak = isPeak(timeMs(ts));
      var table = peak ? pricesFor(model).peak : pricesFor(model).offPeak;
      var hit = num(usage && usage.cacheReadTokens);
      var miss = num(usage && usage.uncachedInputTokens) + num(usage && usage.cacheWriteTokens);
      var output = num(usage && usage.outputTokens);
      return {
        cost: (hit * table.cacheHit + miss * table.cacheMiss + output * table.output) / 1e6,
        peak: peak,
        table: table,
        hit: hit,
        miss: miss,
        output: output,
        model: model,
      };
    }

    function formatMoney(value) {
      if (typeof value !== "number" || !isFinite(value)) return "—";
      if (value === 0) return "0.00";
      var abs = Math.abs(value);
      if (abs < 0.01) return value.toFixed(4);
      if (abs < 1) return value.toFixed(3);
      return value.toFixed(2);
    }

    function formatTokens(value) {
      if (typeof value !== "number" || !isFinite(value)) return "0";
      try {
        return value.toLocaleString("zh-CN");
      } catch (_error) {
        return String(value);
      }
    }

    function same(left, right) {
      return left !== undefined && right !== undefined && String(left) === String(right);
    }

    function matchesTail(data, seq, turnId) {
      if (!data) return false;
      if (same(data.seq, seq)) return true;
      if (data.closing && data.closing.finalNode && same(data.closing.finalNode.seq, seq)) return true;
      if (turnId !== undefined && same(data.turn, turnId)) return true;
      return false;
    }

    function findUsage(snapshot, seq, turn) {
      if (!snapshot) return undefined;
      var turnId = turn && turn.id !== undefined ? turn.id : undefined;

      var turns = snapshot.timeline && snapshot.timeline.turns;
      if (turns && typeof turns.values === "function") {
        var iterator = turns.values();
        for (var step = iterator.next(); !step.done; step = iterator.next()) {
          var entry = step.value;
          var tail =
            entry && entry.data && typeof entry.data.get === "function"
              ? entry.data.get("turn-tail")
              : undefined;
          if (tail && tail.tokenUsage && matchesTail(tail, seq, turnId)) {
            return tail;
          }
        }
      }

      if (snapshot.nodes && typeof snapshot.nodes.forEach === "function") {
        var found;
        snapshot.nodes.forEach(function (node) {
          if (!node || node.kind !== "turn-tail" || !node.data || !node.data.tokenUsage) return;
          if (matchesTail(node.data, seq, turnId)) found = node.data;
        });
        if (found) return found;
      }
      return undefined;
    }

    function detailText(entry) {
      return [
        "模型 " + entry.model,
        "时段 " + (entry.peak ? "高峰" : "空闲") + "（周一至周五 9–12、14–18 为高峰）",
        "缓存命中 " + formatTokens(entry.hit) + " tok × ¥" + entry.table.cacheHit + "/M",
        "缓存未命中 " + formatTokens(entry.miss) + " tok × ¥" + entry.table.cacheMiss + "/M",
        "输出 " + formatTokens(entry.output) + " tok × ¥" + entry.table.output + "/M",
        "合计 ¥" + formatMoney(entry.cost),
      ].join("\n");
    }

    var COST_STYLE = `
.dsh-cost {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  align-self: flex-end;
  margin: 4px 2px 0 0;
  padding: 2px 7px;
  border: 1px solid var(--dsw-alias-border-l2, rgba(128, 128, 128, 0.24));
  border-radius: 6px;
  color: var(--dsw-alias-label-tertiary, #8b949e);
  background: transparent;
  font: inherit;
  font-size: 11px;
  line-height: 1.6;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  cursor: default;
  user-select: none;
}
.dsh-cost[data-peak="1"] {
  color: #d29922;
  border-color: color-mix(in srgb, #d29922 40%, transparent);
}
.dsh-cost-symbol { opacity: 0.6; }
`;

    function createTurnCost() {
      return function TurnCost(props) {
        var useChat = props.useChat;
        var usage;
        if (typeof useChat === "function") {
          usage = useChat(function (snapshot) {
            return findUsage(snapshot, props.seq, props.turn);
          });
        }
        if (!usage) return null;
        // Price by the turn's own timestamp, not by when this row happens to
        // render: otherwise every historical turn reprices at the current hour.
        var entry = computeCost(usage.tokenUsage, usage.time);
        return h(
          "div",
          {
            className: "dsh-cost",
            "data-peak": entry.peak ? "1" : "0",
            title: detailText(entry),
          },
          h("span", { className: "dsh-cost-symbol", "aria-hidden": "true" }, "≈"),
          h("span", null, "¥" + formatMoney(entry.cost))
        );
      };
    }

    // ───────────────────────────── 运行光效 ─────────────────────────────
    var ORBIT_MS = 4800;
    var CORNER = 8;
    var SIGMA = 0.05;
    var STEP_PX = 2;

    function radiusOf(width, height) {
      return Math.max(0, Math.min(CORNER, width / 2, height / 2));
    }

    function perimeter(width, height) {
      var r = radiusOf(width, height);
      return 2 * (width - 2 * r) + 2 * (height - 2 * r) + 4 * ((Math.PI * r) / 2);
    }

    function pointOnRect(width, height, t) {
      var r = radiusOf(width, height);
      var straightX = Math.max(0, width - 2 * r);
      var straightY = Math.max(0, height - 2 * r);
      var arc = (Math.PI * r) / 2;
      var total = 2 * straightX + 2 * straightY + 4 * arc;
      if (total === 0) return { x: 0, y: 0 };
      var d = (((t % 1) + 1) % 1) * total;

      if (d < straightX) return { x: r + d, y: 0 };
      d -= straightX;
      if (d < arc) {
        var a1 = -Math.PI / 2 + (d / arc) * (Math.PI / 2);
        return { x: width - r + r * Math.cos(a1), y: r + r * Math.sin(a1) };
      }
      d -= arc;
      if (d < straightY) return { x: width, y: r + d };
      d -= straightY;
      if (d < arc) {
        var a2 = (d / arc) * (Math.PI / 2);
        return { x: width - r + r * Math.cos(a2), y: height - r + r * Math.sin(a2) };
      }
      d -= arc;
      if (d < straightX) return { x: width - r - d, y: height };
      d -= straightX;
      if (d < arc) {
        var a3 = Math.PI / 2 + (d / arc) * (Math.PI / 2);
        return { x: r + r * Math.cos(a3), y: height - r + r * Math.sin(a3) };
      }
      d -= arc;
      if (d < straightY) return { x: 0, y: height - r - d };
      d -= straightY;
      var a4 = Math.PI + (Math.min(d, arc) / arc) * (Math.PI / 2);
      return { x: r + r * Math.cos(a4), y: r + r * Math.sin(a4) };
    }

    function hotWeight(phase, t) {
      var delta = Math.abs(phase - t);
      var dist = Math.min(delta, 1 - delta);
      return Math.exp(-(dist * dist) / (2 * SIGMA * SIGMA));
    }

    var GLOW_STYLE = `
.dsh-glow-on {
  position: relative;
  border-radius: var(--dsw-radius-md, 8px);
}
.dsh-glow-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  filter: drop-shadow(0 0 2px rgba(170, 200, 255, 0.65));
}
body[data-wb-paper="1"] .dsh-glow-canvas {
  filter: drop-shadow(0 0 2px rgba(198, 156, 96, 0.6));
}
/* 隐藏运行中会话左侧的转圈：不依赖 JS 加的 class，React 重建行时也能兜底 */
div[data-row-key^="session:"]:has(svg[data-state="ongoing"]) svg[data-state="ongoing"],
.dsh-glow-on svg[data-state="ongoing"],
.dsh-glow-on [data-state="ongoing"],
.dsh-glow-on > span:first-child > svg {
  display: none !important;
}
/* paper: every card-like surface follows the paper base; the code surface is
   deeper and overrides the card rule below (same specificity, later wins). */
body[data-wb-paper="1"] [class*="_tile"],
body[data-wb-paper="1"] [class*="_card"],
body[data-wb-paper="1"] [class*="_Card"],
body[data-wb-paper="1"] [class*="_fileCard"],
body[data-wb-paper="1"] [class*="hz8-rW_header"] {
  background: #f2ece0 !important;
}
body[data-wb-paper="1"] .md-code-block,
body[data-wb-paper="1"] pre,
body[data-wb-paper="1"] [class*="_header_1mqf1"] {
  background: #ece2cc !important;
}
body[data-wb-paper="1"] :not(pre) > code {
  background: #efe6d4 !important;
}
/* Session hover preview ships white-on-dark copy; invert it on paper. */
body[data-wb-paper="1"] [class*="_hoverTitle"] {
  color: #2f2a22 !important;
}
body[data-wb-paper="1"] [class*="_hoverStatus"] {
  color: #6f6557 !important;
}
body[data-wb-paper="1"] [class*="_hoverTime"] {
  color: #8a7f6e !important;
}
body[data-wb-paper="1"] [class*="_hoverPath"] {
  color: #6f6557 !important;
}
`;

    function installGlow(ctx) {
      var active = new Map();
      var watched = new Map();
      var unsubscribeJobs = null;
      var frame = null;
      var observer = null;
      var scheduled = false;
      var disposed = false;

      function sessionIdOf(row) {
        var key = row.getAttribute("data-row-key");
        return key && key.indexOf("session:") === 0 ? key.slice(8) : null;
      }

      function hasRunningJob(sessionId) {
        var snapshot = ctx.jobs.state.getSnapshot();
        var jobs = snapshot.rows && snapshot.rows[sessionId];
        if (!jobs) return false;
        for (var i = 0; i < jobs.length; i += 1) {
          if (jobs[i].status === "running") return true;
        }
        return false;
      }

      function glowState(row) {
        // 2 = 双光（会话运行中），1 = 单光（仅后台任务），0 = 不亮
        if (row.querySelector('svg[data-state="ongoing"]') !== null) return 2;
        var sessionId = sessionIdOf(row);
        if (!sessionId) return 0;
        if (!watched.has(sessionId)) {
          watched.set(sessionId, ctx.jobs.watchRows(sessionId));
        }
        return hasRunningJob(sessionId) ? 1 : 0;
      }

      function currentSessionId() {
        var row = document.querySelector('div[data-row-key^="session:"][aria-selected="true"]');
        return row ? sessionIdOf(row) : null;
      }

      function activate(row, lights) {
        row.classList.add("dsh-glow-on");
        if (lights === 1) row.setAttribute("data-glow-dim", "1");
        else row.removeAttribute("data-glow-dim");
        var canvas = document.createElement("canvas");
        canvas.className = "dsh-glow-canvas";
        row.appendChild(canvas);
        active.set(row, { canvas: canvas, lights: lights });
      }

      function deactivate(row) {
        var entry = active.get(row);
        if (!entry) return;
        entry.canvas.remove();
        row.classList.remove("dsh-glow-on");
        row.removeAttribute("data-glow-dim");
        active.delete(row);
      }

      function sync() {
        if (disposed) return;
        var rows = document.querySelectorAll('div[data-row-key^="session:"]');
        for (var i = 0; i < rows.length; i += 1) {
          var row = rows[i];
          var lights = glowState(row);
          if (lights > 0) {
            var entry = active.get(row);
            if (entry === undefined) {
              activate(row, lights);
            } else if (
              row.classList.contains("dsh-glow-on") !== true ||
              row.contains(entry.canvas) !== true
            ) {
              // React 重渲染会话行时会覆盖 className、删掉手动 append 的 canvas；
              // active 里还记着已激活，所以这里要检测并重挂。
              deactivate(row);
              activate(row, lights);
            } else if (entry.lights !== lights) {
              entry.lights = lights;
              if (lights === 1) row.setAttribute("data-glow-dim", "1");
              else row.removeAttribute("data-glow-dim");
            }
          } else if (active.has(row)) {
            deactivate(row);
          }
        }

        // 后台任务按钮：有任务运行就亮双光，并隐藏它自己的圆环。
        var button =
          document.querySelector('button[aria-label*="后台任务"]') ||
          document.querySelector('button[aria-label*="background task"]');
        if (button !== null) {
          var currentId = currentSessionId();
          var jobLights = currentId && hasRunningJob(currentId) ? 1 : 0;
          if (jobLights > 0) {
            var buttonEntry = active.get(button);
            if (buttonEntry === undefined) {
              activate(button, jobLights);
            } else if (
              button.classList.contains("dsh-glow-on") !== true ||
              button.contains(buttonEntry.canvas) !== true
            ) {
              deactivate(button);
              activate(button, jobLights);
            } else if (buttonEntry.lights !== jobLights) {
              buttonEntry.lights = jobLights;
              if (jobLights === 1) button.setAttribute("data-glow-dim", "1");
              else button.removeAttribute("data-glow-dim");
            }
          } else if (active.has(button)) {
            deactivate(button);
          }
        }

        active.forEach(function (_entry, row) {
          if (row.isConnected !== true) deactivate(row);
        });
      }

      function schedule() {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(function () {
          scheduled = false;
          sync();
        });
      }

      function paint(entry, row, now) {
        var width = row.clientWidth;
        var height = row.clientHeight;
        if (width === 0 || height === 0) return;
        var canvas = entry.canvas;
        var dpr = window.devicePixelRatio || 1;
        if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
          canvas.width = Math.round(width * dpr);
          canvas.height = Math.round(height * dpr);
          canvas.style.width = width + "px";
          canvas.style.height = height + "px";
        }
        var context = canvas.getContext("2d");
        if (!context) return;
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        context.clearRect(0, 0, width, height);
        context.lineWidth = 1;
        context.lineCap = "round";

        var r = radiusOf(width, height);
        var total = perimeter(width, height);
        var t = (now % ORBIT_MS) / ORBIT_MS;
        // 呼吸边框：2.8s 一个周期，和原来 CSS 动画同节奏；在 canvas 内画，
        // 所以只会有一条边（不会再和 CSS box-shadow 叠成双线）。
        var breath = 0.5 + 0.5 * Math.sin((now / 2800) * Math.PI * 2);
        var dim = entry.lights === 1 ? 0.35 : 1;
        var edgeAlpha = (0.12 + breath * 0.33) * dim;
        // Paper turns the blue streak into a bronze one; blue reads as ink
        // smear on a warm sheet.
        var paperNow = false;
        try { paperNow = document.body.hasAttribute("data-wb-paper"); } catch (_error) { paperNow = false; }
        var glowBase = paperNow ? [138, 106, 69] : [99, 149, 255];
        var glowHot = paperNow ? [198, 156, 96] : [205, 180, 255];

        context.save();
        context.lineWidth = 1;
        context.strokeStyle = "rgba(" + glowBase[0] + ", " + glowBase[1] + ", " + glowBase[2] + ", " + edgeAlpha.toFixed(3) + ")";
        context.shadowBlur = (4 + breath * 10) * dim;
        context.shadowColor = "rgba(" + glowBase[0] + ", " + glowBase[1] + ", " + glowBase[2] + ", " + ((0.2 + breath * 0.35) * dim).toFixed(3) + ")";
        context.beginPath();
        if (typeof context.roundRect === "function") {
          context.roundRect(0.5, 0.5, width - 1, height - 1, r);
        } else {
          context.rect(0.5, 0.5, width - 1, height - 1);
        }
        context.stroke();
        context.restore();

        var count = Math.max(24, Math.ceil(total / STEP_PX));
        for (var i = 0; i < count; i += 1) {
          var phase = i / count;
          var weight = hotWeight(phase, t);
          if (weight < 0.02) continue;
          var p0 = pointOnRect(width, height, phase);
          var p1 = pointOnRect(width, height, (i + 1) / count);
          var rChannel = Math.round(glowBase[0] + (glowHot[0] - glowBase[0]) * weight);
          var gChannel = Math.round(glowBase[1] + (glowHot[1] - glowBase[1]) * weight);
          var bChannel = Math.round(glowBase[2] + (glowHot[2] - glowBase[2]) * weight);
          // lights === 1 表示「只有后台任务」，整体压暗。
          var alpha = (0.05 + 0.95 * weight) * (entry.lights === 1 ? 0.35 : 1);
          context.strokeStyle =
            "rgba(" + rChannel + "," + gChannel + "," + bChannel + "," + alpha.toFixed(3) + ")";
          context.beginPath();
          context.moveTo(p0.x, p0.y);
          context.lineTo(p1.x, p1.y);
          context.stroke();
        }
      }

      function tick(now) {
        if (disposed) return;
        active.forEach(function (entry, row) {
          paint(entry, row, now);
        });
        frame = requestAnimationFrame(tick);
      }

      if (typeof MutationObserver !== "undefined" && document.body !== null) {
        observer = new MutationObserver(schedule);
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["data-state"],
        });
      }
      window.addEventListener("resize", schedule);
      unsubscribeJobs = ctx.jobs.state.subscribe(schedule);
      sync();
      frame = requestAnimationFrame(tick);

      return function () {
        disposed = true;
        if (frame !== null) cancelAnimationFrame(frame);
        if (observer !== null) observer.disconnect();
        window.removeEventListener("resize", schedule);
        if (unsubscribeJobs !== null) unsubscribeJobs();
        watched.forEach(function (release) {
          release();
        });
        watched.clear();
        active.forEach(function (_entry, row) {
          deactivate(row);
        });
      };
    }

    // 费用与光效样式（迁移自 dsh-usage-hud）
    var USAGE_STYLE = COST_STYLE + "\n" + GLOW_STYLE;

    return {
      inject: ['slots', 'remote', 'remote.account', 'jobs'],
      apply(ctx) {
        try {
        if (typeof document !== 'undefined') {
          ctx.effect(() => {
            const tag = document.createElement('style');
            tag.textContent = '@keyframes wb-spin { to { transform: rotate(360deg); } }'
              + '\n[class*="sidebarCol"] [class*="panelList"], [class*="sidebarCol"] [class*="newSession"], [class*="sidebarCol"] [class*="topStrip"] { display: none !important; }'
              + '\n[class*="sidebarCol"] [class*="logoRow"] { height: 0 !important; min-height: 0 !important; padding: 0 !important; margin: 0 !important; overflow: visible !important; }'
              + '\n[class*="sidebarCol"] [class*="workspaces"] { background: var(--dsw-alias-bg-base) !important; border: 1px solid var(--dsw-alias-border-l1) !important; border-radius: 12px !important; margin: 0 12px 8px 0 !important; overflow: hidden !important; }'
              + '\n[class*="sidebarCol"] [class*="workspaces"] > *:nth-child(n+2) { display: none !important; }'
              + '\n[class*="sidebarCol"] [class*="brand"]:not([class*="Identity"]):not([class*="Mark"]):not([class*="Name"]) { position: fixed !important; top: 14px !important; left: 16px !important; z-index: 300 !important; width: 260px !important; max-width: 260px !important; pointer-events: none !important; }'
              + '\n[class*="controls"] { display: none !important; }'
              + '\n[class*="sidebarCol"] [class*="brandIdentity"] { display: flex !important; align-items: center !important; gap: 6px !important; }'
              + '\n[role="menu"][style*="--dsh-menu-r3v"] { top: 56px !important; }'
              + '\n[class*="sidebarCol"] { border: none !important; }'
              + '\n.wb-session-row { display: flex; align-items: center; gap: 6px; width: 100%; padding: 5px 8px; border: none; border-radius: 6px; background: transparent; color: var(--dsw-alias-label-primary); cursor: pointer; text-align: left; font-size: 12px; }'
              + '\n.wb-session-row:hover { background: var(--dsw-alias-bg-layer-2); }'
              + '\n.wb-session-row .wb-session-more { opacity: 0; transition: opacity .12s; }'
              + '\n.wb-balance-tip { position: absolute; top: calc(100% + 6px); right: 0; z-index: 500; padding: 8px 10px; border-radius: 8px; background: var(--dsw-alias-bg-overlay, #23262c); border: 1px solid var(--dsw-alias-border-l2, #2f333b); color: var(--dsw-alias-label-primary); font-size: 11px; line-height: 1.7; white-space: nowrap; max-width: 240px; box-sizing: border-box; box-shadow: 0 6px 20px rgba(0,0,0,.28); pointer-events: none; }'
              + '\n.wb-mobile-sidebar-toggle { position: fixed; left: 10px; top: 10px; z-index: 5000; width: 30px; height: 30px; border-radius: 8px; border: 1px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); font-size: 15px; line-height: 1; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; padding: 0; box-shadow: 0 1px 4px rgba(0,0,0,.12); }'
              + '\n@media (max-width: 767px) { .wb-topbar-brand, [class*="settingsArea"] { display: none !important; } .wb-topbar-icons { margin-left: 42px; } [class*="sidebarCol"] [class*="brand"] { display: none !important; } [class*="sidebarCol"] { padding-top: 44px !important; } [aria-label="收起侧边栏"] { display: none !important; } }'
              + '\n.wb-balance:hover { border-color: #4ade80 !important; background: rgba(74,222,128,.12) !important; }'
              + '\n.wb-nav-item { position: relative; }'
              + '\n.wb-nav-label { max-width: 0; opacity: 0; overflow: hidden; white-space: nowrap; font-size: 12px; transition: max-width .18s ease, opacity .18s ease; }'
              + '\n.wb-nav-item:hover .wb-nav-label { max-width: 110px; opacity: 1; }'
              + '\n.wb-nav-item:hover { background: var(--dsw-alias-bg-layer-2) !important; color: var(--dsw-alias-label-primary) !important; }'
              + '\n.wb-view-tab[data-active="0"]:hover { background: var(--dsw-alias-bg-layer-1) !important; color: var(--dsw-alias-label-primary) !important; }'
              + '\n.wb-tab-glider { transition: transform .26s cubic-bezier(.4,0,.2,1), width .26s cubic-bezier(.4,0,.2,1); will-change: transform; }'
              + '\n@media (prefers-reduced-motion: reduce) { .wb-tab-glider { transition: none; } }'
              + '\n.wb-view-tab-badge { display: inline-flex; align-items: center; justify-content: center; min-width: 16px; height: 16px; padding: 0 4px; border-radius: 999px; background: var(--dsw-alias-brand-primary); color: #fff; font-size: 10px; font-weight: 650; font-variant-numeric: tabular-nums; box-sizing: border-box; }'
              + '\n.wb-restart:hover { background: var(--dsw-alias-bg-layer-2) !important; color: var(--dsw-alias-label-primary) !important; border-color: var(--dsw-alias-border-l1) !important; }';
            document.head.append(tag);
            return () => tag.remove();
          }, 'workbench: spinner keyframes');
        }

        const api = createApi(ctx);
        ctx.effect(() => ctx.provide('workbench', api), 'workbench: provide api');

        layoutService = ctx.get('layout') || null;
        layoutGetter = () => ctx.get('layout') || null;

        // The shell's own overview lives above the tab row: it is reachable from
        // the top-bar "工作台" icon, so it registers a page without a tab.
        ctx.effect(() => api.registerView({
          id: 'workbench',
          title: '工作台',
          subtitle: '工作台总览：已接入的视图与浮窗',
          icon: IconWorkbenchTabs,
          component: WorkbenchOverview,
          order: -10,
          tab: false,
        }), 'workbench: overview view');

        // Settings page: no tab — it is reached from the gear in the system bar.
        ctx.effect(() => api.registerView({
          id: SETTINGS_VIEW_ID,
          title: '工作台设置',
          subtitle: '功能开关与已注册的模块',
          icon: IconSettings,
          component: WorkbenchSettings,
          order: -20,
          tab: false,
        }), 'workbench: settings view');

        const balance = createBalanceStore(ctx);
        try {
          ctx.effect(() => { balance.start(); return () => balance.stop(); }, 'workbench: balance polling');
        } catch (err) {
          console.warn('[workbench] balance polling failed', err);
        }
        const TopBar = createTopBar(ctx, balance);
        ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay', id: 'workbench-topbar', order: -100,
        }, TopBar));

        // ── 每轮费用 + 运行光效（迁移自 dsh-usage-hud） ──
        if (typeof document !== 'undefined') {
          ctx.effect(() => {
            const tag = document.createElement('style');
            tag.dataset.plugin = 'dsh-workbench:usage';
            tag.textContent = USAGE_STYLE;
            document.head.append(tag);
            return () => tag.remove();
          }, 'workbench: usage styles');
        }

        const TurnCost = createTurnCost();
        function TurnCostGated(props) {
          const enabled = useFeatures();
          if (!enabled.cost) return null;
          return h(TurnCost, props);
        }
        ctx.slots.inject('conversation.chat.turnTail', () => ctx.slots.register({
          name: 'conversation.chat.turnTail',
          id: 'workbench-turn-cost',
          order: 600,
        }, TurnCostGated));

        // 注意：ctx.effect 接收的是「返回 dispose 的函数」。
        // 直接传 installGlow(ctx) 的返回值会让 effect 立刻执行清理，光效刚装上就被拆掉。
        // The switch can turn it off at runtime, so mount/unmount follows the store.
        ctx.effect(() => {
          let dispose = null;
          const sync = () => {
            if (dispose) { dispose(); dispose = null; }
            if (features.getSnapshot().glow) dispose = installGlow(ctx);
          };
          sync();
          const unsubscribe = features.subscribe(sync);
          return () => { unsubscribe(); if (dispose) dispose(); };
        }, 'workbench: glow');

        } catch (err) {
          console.error('[workbench] apply failed:', err);
        }
      },
    };
  },
});
