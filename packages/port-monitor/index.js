/**
 * Host half of dsh-port-monitor.
 *
 * Responsibilities:
 *  1. Collect the machine's listening TCP ports (Windows via Get-NetTCPConnection).
 *  2. Probe each port for TCP reachability and, when reachable, whether it speaks HTTP.
 *  3. Serve the result as JSON on the /wb/port-monitor/list route for the Client panel.
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import net from 'node:net';
import http from 'node:http';

const execFileAsync = promisify(execFile);

const PS_LISTEN_SCRIPT = `
$ErrorActionPreference = 'SilentlyContinue';
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8;
@(Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue | ForEach-Object {
  $p = Get-Process -Id $_.OwningProcess -ErrorAction SilentlyContinue;
  [PSCustomObject]@{
    port = [int]$_.LocalPort;
    address = [string]$_.LocalAddress;
    pid = [int]$_.OwningProcess;
    name = if ($p) { $p.ProcessName } else { '' };
    path = if ($p) { $p.Path } else { '' }
  }
}) | ConvertTo-Json -Compress
`;

async function readListeningPorts() {
  for (const exe of ['pwsh', 'powershell']) {
    try {
      const { stdout } = await execFileAsync(exe, [
        '-NoProfile',
        '-NonInteractive',
        '-Command',
        PS_LISTEN_SCRIPT,
      ], { timeout: 9000, windowsHide: true, maxBuffer: 4 * 1024 * 1024 });

      const text = (stdout || '').trim();
      if (!text) return [];
      const parsed = JSON.parse(text);
      const list = Array.isArray(parsed) ? parsed : [parsed];
      return list
        .map((p) => ({
          port: Number(p.port),
          address: String(p.address ?? ''),
          pid: Number(p.pid ?? 0),
          name: String(p.name ?? ''),
          path: String(p.path ?? ''),
        }))
        .filter((p) => Number.isFinite(p.port) && p.port > 0);
    } catch {
      // Try the next PowerShell executable.
    }
  }
  return [];
}

function probeHostFor(address) {
  if (address === '::' || address === '::1') return '::1';
  if (!address || address === '0.0.0.0' || address === '127.0.0.1') return '127.0.0.1';
  return address;
}

function probeTcp(port, host) {
  return new Promise((resolve) => {
    const ipv6 = host.includes(':');
    const socket = net.connect({ host, port, family: ipv6 ? 6 : 4 });
    socket.setTimeout(800);
    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.once('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.once('error', () => {
      socket.destroy();
      resolve(false);
    });
  });
}

function probeHttp(port, host) {
  return new Promise((resolve) => {
    const req = http.get(
      { host, port, path: '/', method: 'GET' },
      (res) => {
        res.resume();
        resolve(true);
      },
    );
    req.setTimeout(1200, () => {
      req.destroy();
      resolve(false);
    });
    req.once('error', () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function collectPorts() {
  const ports = await readListeningPorts();
  const results = await Promise.all(
    ports.map(async (p) => {
      const host = probeHostFor(p.address);
      const reachable = await probeTcp(p.port, host);
      const http = reachable ? await probeHttp(p.port, host) : false;
      return { ...p, reachable, http };
    }),
  );
  results.sort((a, b) => a.port - b.port);
  return { ok: true, ports: results, at: new Date().toISOString() };
}

export const inject = ['webServer'];

export function apply(ctx) {
  ctx.effect(
    () => ctx.webServer.register({
      kind: 'exact',
      path: '/wb/port-monitor/list',
      async handler(req, res) {
        // Local-only: the port inventory is machine state, never something a
        // tunneled public request may read. DSH's cookie auth guards the index
        // but not plain custom routes, so enforce the loopback check here.
        const remote = req.socket?.remoteAddress || '';
        const local = remote === '127.0.0.1'
          || remote === '::1'
          || remote === '::ffff:127.0.0.1';
        if (!local) {
          res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('port monitor is local-only\n');
          return;
        }
        try {
          const payload = await collectPorts();
          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store',
          });
          res.end(JSON.stringify(payload));
        } catch (error) {
          res.writeHead(500, {
            'Content-Type': 'application/json; charset=utf-8',
          });
          res.end(JSON.stringify({
            ok: false,
            error: String(error?.message ?? error),
          }));
        }
      },
    }),
    'dsh-port-monitor: http route',
  );
}
