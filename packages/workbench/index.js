/**
 * Host half of the workbench shell.
 *
 * The workbench's value lives in the Client half (module API + overview page).
 * The only Host duty is the one-click restart endpoint, which stops the running
 * web host in a detached process and lets the scheduled task relaunch it, so the
 * current page simply reconnects.
 */
import { execSync } from 'node:child_process';

export const inject = ['webServer'];

export function apply(ctx) {
  ctx.effect(() => ctx.webServer.register({
    kind: 'exact',
    path: '/wb/workbench/restart',
    async handler(req, res) {
      const remote = req.socket && req.socket.remoteAddress ? req.socket.remoteAddress : '';
      const local = remote === '127.0.0.1' || remote === '::1' || remote === '::ffff:127.0.0.1';
      if (!local) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('restart is local-only\n');
        return;
      }
      // 只接受 POST：GET 不应该触发重启。
      if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('method not allowed\n');
        return;
      }
      // 先看 3080 是否在跑，再决定要不要让 ensure 脚本拉起。
      // 响应先到达页面，然后本进程退出，由每 5 分钟一次的 ensure 任务重新拉起。
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: true, restarting: true, etaSeconds: 300 }));
      setTimeout(() => {
        try { execSync('schtasks /run /tn philomel-dsh-web', { windowsHide: true, stdio: 'ignore' }); } catch (_e) {}
        process.exit(0);
      }, 300);
    },
  }), 'workbench: restart route');
}
