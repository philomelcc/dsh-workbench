window.__ModuleLoader__.load({
  id: '@your-scope/dsh-my-module',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    function TemplateIcon(props) {
      const size = props.size || 20;
      return h('svg', {
        viewBox: '0 0 24 24', width: size, height: size, 'aria-hidden': true, fill: 'none',
      },
        h('rect', { x: 4, y: 4, width: 16, height: 16, rx: 4, stroke: 'currentColor', strokeWidth: 1.6 }),
        h('circle', { cx: 12, cy: 12, r: 3, fill: 'currentColor', opacity: 0.5 }),
      );
    }

    // 一个视图 = 工作台切换页里的一个完整页面。
    // 页面自己负责内边距与滚动（外壳不加 padding、不包卡片），骨架照规范 §4.1。
    function TemplateView() {
      const [ping, setPing] = React.useState(null);
      React.useEffect(() => {
        fetch('/wb/my-module/ping', { cache: 'no-store' })
          .then((r) => r.json())
          .then((json) => setPing(json))
          .catch(() => setPing({ ok: false }));
      }, []);

      return h('div', {
        style: {
          height: '100%',
          boxSizing: 'border-box',
          overflowY: 'auto',
          padding: '24px 28px',
          maxWidth: 1100,
          margin: '0 auto',
          background: 'var(--dsw-alias-bg-base)',
          color: 'var(--dsw-alias-label-primary)',
        },
      },
        h('div', {
          style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 16 },
        },
          h('h2', { style: { margin: 0, fontSize: 20, fontWeight: 650, lineHeight: 1.3 } }, '我的模块'),
        ),
        h('div', { style: { fontSize: 13, color: 'var(--dsw-alias-label-secondary)', lineHeight: 1.6 } },
          '这是占位页面。把 TemplateView 换成你的内容，保留下方 registerView 调用。',
        ),
        h('div', { style: { marginTop: 16, fontSize: 12, color: 'var(--dsw-alias-label-secondary)' } },
          '后端探测：' + (ping ? JSON.stringify(ping) : '…'),
        ),
      );
    }

    return {
      // `slots` only: the workbench is optional, resolved at apply time.
      inject: ['slots'],
      apply(ctx) {
        const wb = ctx.get('workbench');

        if (wb && wb.apiVersion === 1) {
          // Installed alongside the shell: one page in the workbench tab row.
          ctx.effect(() => wb.registerView({
            id: 'my-module',
            title: '我的模块',
            icon: TemplateIcon,
            component: TemplateView,
            order: 60,
          }), 'my-module: view');
          return;
        }

        // No shell: publish the same pair the built-in panels use — a sidebar
        // entry plus the page it opens — so the module still stands alone.
        ctx.effect(() => ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
          name: 'sidebar.panellist', id: 'my-module', order: 60, label: '我的模块',
        }, TemplateIcon)), 'my-module: sidebar entry');
        ctx.effect(() => ctx.slots.inject('main', () => ctx.slots.register(
          { name: 'main', key: 'my-module' }, TemplateView,
        )), 'my-module: main view');
      },
    };
  },
});
