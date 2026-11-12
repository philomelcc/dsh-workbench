/**
 * Host half of the workbench shell.
 *
 * The workbench's value lives in the Client half (module API + overview page).
 * The only Host duty is the one-click restart endpoint: it stops the running web
 * host and lets an external supervisor start it again, so the current page
 * simply reconnects. A restart is only offered when such a supervisor is
 * actually present — exiting without one would strand the user with a dead
 * server.
 */
import { execSync } from 'node:child_process';

/** Supervisor that can start the host again, resolved per platform. */
function resolveSupervisor() {
  const command = process.env.DSH_RESTART_CMD || '';
  if (command) return { kind: 'command', command };
  if (process.platform !== 'win32') return null;
  // No default task name: this package ships to other machines, where the
  // author's scheduled task does not exist. Enable the button by setting
  // DSH_RESTART_TASK (a Windows scheduled task name) or DSH_RESTART_CMD
  // (any command that starts the host again).
  const task = process.env.DSH_RESTART_TASK || '';
  if (!task) return null;
  try {
    execSync(`schtasks /query /tn ${JSON.stringify(task)}`, { windowsHide: true, stdio: 'ignore' });
    return { kind: 'task', task };
  } catch (_error) {
    return null;
  }
}

function startSupervisor(supervisor) {
  if (supervisor.kind === 'command') {
    execSync(supervisor.command, { windowsHide: true, stdio: 'ignore' });
    return;
  }
  execSync(`schtasks /run /tn ${JSON.stringify(supervisor.task)}`, { windowsHide: true, stdio: 'ignore' });
}

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
      // Refuse without a supervisor: exiting here would leave no server behind.
      const supervisor = resolveSupervisor();
      if (!supervisor) {
        res.writeHead(409, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
          ok: false,
          reason: 'no-supervisor',
          hint: '这台机器上没有可用的重启管理器，请手动重启 DSH Web。',
        }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: true, restarting: true, etaSeconds: 300 }));
      setTimeout(() => {
        try { startSupervisor(supervisor); } catch (_e) { /* best effort */ }
        process.exit(0);
      }, 300);
    },
  }), 'workbench: restart route');
}
