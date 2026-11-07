/**
 * Host half of dsh-status-monitor.
 *
 * The workbench "status" view aggregates four cards:
 *   - disk      : this module samples volumes itself            -> /wb/status-monitor/disk
 *   - hardware  : CPU / memory / network / GPU sampled here      -> /wb/status-monitor/hardware
 *   - ports     : list comes from dsh-port-monitor, latency and
 *                 HTTP status are probed here                    -> /wb/status-monitor/probe
 *   - usage     : read straight from dsh-usage-stats in the browser
 *
 * Every route is local-only: DSH's cookie auth guards the index but not plain
 * custom routes, and this machine state must never be readable through the
 * Cloudflare tunnel.
 */
import os from 'node:os';
import fs from 'node:fs';
import { promises as fsp } from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import http from 'node:http';
import zlib from 'node:zlib';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const MB = 1024 * 1024;

function num(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function round(n, digits = 1) {
  const factor = 10 ** digits;
  return Math.round(n * factor) / factor;
}

function clampPct(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

// ---------- CPU ----------
const cpuState = {
  model: 'CPU',
  cores: 0,
  pct: null,
  perCore: [],
  prev: null,
  at: 0,
};

function sampleCpuUsage() {
  const cpus = os.cpus();
  const next = cpus.map((cpu) => {
    const t = cpu.times;
    return { idle: t.idle, total: t.user + t.nice + t.sys + t.irq + t.idle };
  });

  if (cpuState.prev && cpuState.prev.length === next.length) {
    const pcts = next.map((cpu, i) => {
      const dTotal = cpu.total - cpuState.prev[i].total;
      const dIdle = cpu.idle - cpuState.prev[i].idle;
      if (dTotal <= 0) return null;
      return clampPct((1 - dIdle / dTotal) * 100);
    });
    const valid = pcts.filter((v) => v !== null);
    cpuState.pct = valid.length
      ? round(valid.reduce((a, b) => a + b, 0) / valid.length, 1)
      : null;
    cpuState.perCore = pcts.map((v) => (v === null ? null : round(v, 1)));
  }

  cpuState.prev = next;
  cpuState.at = Date.now();
  cpuState.cores = cpus.length;
  cpuState.model = cpus[0] ? String(cpus[0].model || 'CPU').trim() : 'CPU';
}

// ---------- memory ----------
function memorySnapshot() {
  const total = os.totalmem();
  const free = os.freemem();
  const used = Math.max(0, total - free);
  return {
    totalBytes: total,
    freeBytes: free,
    usedBytes: used,
    usedPct: total > 0 ? round((used / total) * 100, 1) : 0,
  };
}

// ---------- network ----------
// Windows has no Node API for interface byte counters. Get-NetAdapterStatistics
// gives per-adapter totals; differencing them yields the rate. `netstat -e` is
// not used because its labels are localized (and arrive as GBK) on this host.
const PS_NET_SCRIPT = `
$ErrorActionPreference = 'SilentlyContinue';
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8;
@(Get-NetAdapterStatistics | ForEach-Object {
  [PSCustomObject]@{
    name = [string]$_.Name;
    received = [double]$_.ReceivedBytes;
    sent = [double]$_.SentBytes
  }
}) | ConvertTo-Json -Compress
`;

const netState = {
  available: false,
  error: null,
  receivedBytes: 0,
  sentBytes: 0,
  downBps: 0,
  upBps: 0,
  active: '',
  interfaces: [],
  at: 0,
  prev: null,
};

async function readNetCounters() {
  let lastError = null;
  for (const exe of ['pwsh', 'powershell']) {
    try {
      const { stdout } = await execFileAsync(
        exe,
        ['-NoProfile', '-NonInteractive', '-Command', PS_NET_SCRIPT],
        { timeout: 8000, windowsHide: true, maxBuffer: 1024 * 1024 },
      );
      const text = String(stdout || '').trim();
      if (!text) {
        lastError = new Error('网卡统计输出为空');
        continue;
      }
      const parsed = JSON.parse(text);
      const rows = Array.isArray(parsed) ? parsed : [parsed];
      return rows.map((row) => ({
        name: String(row.name || '网卡'),
        received: Number(row.received) || 0,
        sent: Number(row.sent) || 0,
      }));
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error('无法读取网卡统计');
}

async function sampleNetwork() {
  if (process.platform !== 'win32') {
    netState.available = false;
    netState.error = '当前平台未接入网络采样';
    return;
  }
  try {
    const counters = await readNetCounters();
    const now = Date.now();
    const prev = netState.prev;
    const prevByName = prev ? prev.byName : new Map();
    const byName = new Map();

    let totalReceived = 0;
    let totalSent = 0;
    let totalDown = 0;
    let totalUp = 0;
    let active = '';
    let activeRate = -1;
    const interfaces = [];

    for (const counter of counters) {
      const previous = prevByName.get(counter.name);
      let down = 0;
      let up = 0;
      if (previous && now - prev.at > 0) {
        const dt = (now - prev.at) / 1000;
        down = Math.max(0, (counter.received - previous.received) / dt);
        up = Math.max(0, (counter.sent - previous.sent) / dt);
      }
      totalReceived += counter.received;
      totalSent += counter.sent;
      totalDown += down;
      totalUp += up;
      if (down + up > activeRate) {
        activeRate = down + up;
        active = counter.name;
      }
      byName.set(counter.name, counter);
      interfaces.push({
        name: counter.name,
        receivedBytes: counter.received,
        sentBytes: counter.sent,
        downBps: Math.round(down),
        upBps: Math.round(up),
      });
    }

    netState.prev = { at: now, byName };
    netState.receivedBytes = totalReceived;
    netState.sentBytes = totalSent;
    netState.downBps = totalDown;
    netState.upBps = totalUp;
    netState.active = active;
    netState.interfaces = interfaces;
    netState.at = now;
    netState.available = true;
    netState.error = null;
  } catch (error) {
    netState.available = false;
    netState.error = String((error && error.message) || error);
  }
}

// ---------- GPU ----------
const GPU_FIELDS = [
  'name',
  'utilization.gpu',
  'memory.used',
  'memory.total',
  'temperature.gpu',
  'power.draw',
  'clocks.sm',
].join(',');

const gpuState = {
  available: false,
  error: null,
  devices: [],
  at: 0,
};

async function sampleGpu() {
  try {
    const { stdout } = await execFileAsync(
      'nvidia-smi',
      ['--query-gpu=' + GPU_FIELDS, '--format=csv,noheader,nounits'],
      { timeout: 6000, windowsHide: true, maxBuffer: 1024 * 1024 },
    );
    const devices = String(stdout || '')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const parts = line.split(',').map((part) => part.trim());
        const memUsed = num(parts[2]);
        const memTotal = num(parts[3]);
        return {
          name: parts[0] || 'GPU',
          utilizationPct: num(parts[1]),
          memoryUsedBytes: memUsed === null ? null : memUsed * MB,
          memoryTotalBytes: memTotal === null ? null : memTotal * MB,
          temperatureC: num(parts[4]),
          powerW: num(parts[5]),
          clockMhz: num(parts[6]),
        };
      });

    gpuState.devices = devices;
    gpuState.available = devices.length > 0;
    gpuState.error = null;
    gpuState.at = Date.now();
  } catch (error) {
    gpuState.available = false;
    gpuState.devices = [];
    gpuState.error = String((error && error.message) || error);
    gpuState.at = Date.now();
  }
}

// ---------- DSH process ----------
let procState = { usage: process.cpuUsage(), at: Date.now() };

function processSnapshot() {
  const usage = process.cpuUsage();
  const now = Date.now();
  const dt = now - procState.at;
  const usedMicros = (usage.user - procState.usage.user) + (usage.system - procState.usage.system);
  const cpuPct = dt > 0 ? round((Math.max(0, usedMicros) / (dt * 1000)) * 100, 1) : null;
  procState = { usage, at: now };

  const mem = process.memoryUsage();
  return {
    cpuPct,
    rssBytes: mem.rss,
    heapUsedBytes: mem.heapUsed,
    uptimeSec: Math.round(process.uptime()),
    pid: process.pid,
  };
}

// ---------- rolling history (used by the expanded card) ----------
const history = [];

function pushHistory() {
  history.push({
    t: Date.now(),
    cpu: cpuState.pct,
    mem: memorySnapshot().usedPct,
    down: Math.round(netState.downBps),
    up: Math.round(netState.upBps),
  });
  if (history.length > 60) history.shift();
}

// ---------- disk ----------
const PS_DISK_META = `
$ErrorActionPreference = 'SilentlyContinue';
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8;
@(Get-CimInstance Win32_LogicalDisk -Filter 'DriveType=2 OR DriveType=3' | ForEach-Object {
  [PSCustomObject]@{
    id = [string]$_.DeviceID;
    label = [string]$_.VolumeName;
    fs = [string]$_.FileSystem;
    driveType = [int]$_.DriveType
  }
}) | ConvertTo-Json -Compress
`;

const DISK_META_TTL_MS = 10 * 60_000;
let diskMeta = { at: 0, map: new Map(), error: null };
let diskMetaPromise = null;

// Volume labels come from CIM, which costs 1–3s on this host. The request must
// never wait for it: kick a background refresh and answer with what we have.
function kickDiskMeta() {
  if (diskMeta.at > 0 && Date.now() - diskMeta.at < DISK_META_TTL_MS) return;
  if (diskMetaPromise) return;

  diskMetaPromise = (async () => {
    const next = { at: Date.now(), map: new Map(), error: null };
    if (process.platform === 'win32') {
      let lastError = null;
      for (const exe of ['pwsh', 'powershell']) {
        try {
          const { stdout } = await execFileAsync(
            exe,
            ['-NoProfile', '-NonInteractive', '-Command', PS_DISK_META],
            { timeout: 8000, windowsHide: true, maxBuffer: 1024 * 1024 },
          );
          const text = String(stdout || '').trim();
          if (!text) continue;
          const parsed = JSON.parse(text);
          const rows = Array.isArray(parsed) ? parsed : [parsed];
          for (const row of rows) {
            if (!row || !row.id) continue;
            next.map.set(String(row.id).toUpperCase(), {
              label: String(row.label || ''),
              filesystem: String(row.fs || ''),
              driveType: Number(row.driveType) || 0,
            });
          }
          lastError = null;
          break;
        } catch (error) {
          lastError = error;
        }
      }
      if (lastError && next.map.size === 0) {
        next.error = String((lastError && lastError.message) || lastError);
      }
    }

    diskMeta = next;
    return next;
  })().finally(() => {
    diskMetaPromise = null;
  });
}

function enumerateMounts() {
  const mounts = [];
  if (process.platform !== 'win32') {
    mounts.push({ id: '/', mount: '/' });
    return mounts;
  }
  for (let code = 65; code <= 90; code += 1) {
    const letter = String.fromCharCode(code);
    const mount = letter + ':\\';
    try {
      if (!fs.existsSync(mount)) continue;
      mounts.push({ id: letter + ':', mount });
    } catch {
      // A drive that cannot be inspected is skipped, not fatal.
    }
  }
  return mounts;
}

async function collectDisk() {
  const warnings = [];
  kickDiskMeta();
  const meta = diskMeta;
  if (meta.error) warnings.push('卷标信息不可用：' + meta.error);

  const volumes = [];
  for (const item of enumerateMounts()) {
    try {
      const stat = fs.statfsSync(item.mount);
      const blockSize = Number(stat.bsize) || 0;
      const totalBytes = Number(stat.blocks) * blockSize;
      if (!(totalBytes > 0)) {
        warnings.push(item.id + ' 容量读取为 0，已跳过');
        continue;
      }
      const freeBytes = Number(stat.bavail) * blockSize;
      const usedBytes = Math.max(0, totalBytes - freeBytes);
      const info = meta.map.get(item.id) || {};
      volumes.push({
        id: item.id,
        mount: item.mount,
        label: info.label || '',
        filesystem: info.filesystem || '',
        kind: info.driveType === 2 ? 'removable' : (info.driveType === 3 ? 'fixed' : ''),
        totalBytes,
        freeBytes,
        usedBytes,
        usedPct: round((usedBytes / totalBytes) * 100, 1),
        freePct: round((freeBytes / totalBytes) * 100, 1),
      });
    } catch (error) {
      warnings.push(item.id + ' 读取失败：' + String((error && error.message) || error));
    }
  }

  volumes.sort((a, b) => {
    if (a.id === 'C:') return -1;
    if (b.id === 'C:') return 1;
    return a.id.localeCompare(b.id);
  });

  return { ok: true, at: Date.now(), volumes, warnings };
}

// ---------- hardware ----------
async function hardwareSnapshot() {
  const proc = processSnapshot();
  const memory = memorySnapshot();
  return {
    ok: true,
    at: Date.now(),
    platform: process.platform,
    hostname: os.hostname(),
    uptimeSec: Math.round(os.uptime()),
    cpu: {
      model: cpuState.model,
      cores: cpuState.cores,
      usagePct: cpuState.pct,
      perCore: cpuState.perCore,
      loadAvg: os.loadavg().map((v) => round(v, 2)),
      processCpuPct: proc.cpuPct,
      processRssBytes: proc.rssBytes,
      processUptimeSec: proc.uptimeSec,
    },
    memory,
    network: {
      available: netState.available,
      error: netState.error,
      downBps: Math.round(netState.downBps),
      upBps: Math.round(netState.upBps),
      receivedBytes: netState.receivedBytes,
      sentBytes: netState.sentBytes,
      active: netState.active,
      interfaces: netState.interfaces.slice(0, 6),
      at: netState.at,
    },
    gpu: {
      available: gpuState.available,
      error: gpuState.error,
      devices: gpuState.devices,
      at: gpuState.at,
    },
    history: history.slice(-60),
  };
}

// ---------- port inventory ----------
// `Get-NetTCPConnection` costs ~9s on this host (CIM is slow here), so the list
// is read from `netstat -ano` + `tasklist`, both a few hundred milliseconds.
const LISTEN_STATE = /^(LISTENING|LISTEN|侦听)$/i;

function parseNetstatListeners(text) {
  const out = [];
  const re = /^\s*TCP\s+(\[[^\]]+\]|[^:\s]+):(\d+)\s+\S+\s+(\S+)\s+(\d+)\s*$/gmi;
  let match = re.exec(text);
  while (match !== null) {
    const state = match[3];
    if (LISTEN_STATE.test(state)) {
      const address = String(match[1]).replace(/^\[|\]$/g, '');
      const port = Number(match[2]);
      const pid = Number(match[4]);
      if (Number.isInteger(port) && port > 0) out.push({ port, address, pid });
    }
    match = re.exec(text);
  }
  return out;
}

// tasklist costs ~1.5s; process names barely change, so cache them for a minute
// and let concurrent requests share one run.
const NAMES_TTL_MS = 60_000;
let namesCache = { at: 0, map: new Map() };
let namesPromise = null;

async function readProcessNames() {
  if (namesCache.at > 0 && Date.now() - namesCache.at < NAMES_TTL_MS) return namesCache.map;
  if (namesPromise) return namesPromise;

  namesPromise = (async () => {
    const map = new Map();
    try {
      const { stdout } = await execFileAsync(
        'tasklist',
        ['/FO', 'CSV', '/NH'],
        { timeout: 10000, windowsHide: true, maxBuffer: 8 * 1024 * 1024 },
      );
      for (const line of String(stdout || '').split(/\r?\n/)) {
        const match = /^"([^"]*)","(\d+)"/.exec(line.trim());
        if (match) map.set(Number(match[2]), match[1]);
      }
    } catch {
      /* process names are a nicety, not a requirement */
    }
    namesCache = { at: Date.now(), map };
    return map;
  })().finally(() => {
    namesPromise = null;
  });

  return namesPromise;
}

function mergeListeners(rows) {
  const byPort = new Map();
  for (const row of rows) {
    const key = String(row.port);
    const prev = byPort.get(key);
    if (!prev) {
      byPort.set(key, { ...row });
      continue;
    }
    const prevWild = prev.address === '0.0.0.0' || prev.address === '::';
    const currentWild = row.address === '0.0.0.0' || row.address === '::';
    if (prevWild && !currentWild) byPort.set(key, { ...row });
  }
  return Array.from(byPort.values());
}

async function collectPorts() {
  if (process.platform !== 'win32') {
    return {
      ok: true,
      at: Date.now(),
      ports: [],
      warnings: ['当前平台未接入端口采集'],
    };
  }

  const warnings = [];
  // netstat (~1s) and tasklist (~1.5s) are independent; run them together so a
  // cold request costs their maximum instead of their sum.
  const [netResult, names] = await Promise.all([
    (async () => {
      try {
        const { stdout } = await execFileAsync('netstat', ['-ano'], {
          timeout: 10000,
          windowsHide: true,
          maxBuffer: 8 * 1024 * 1024,
        });
        return { listeners: parseNetstatListeners(String(stdout || '')), error: null };
      } catch (error) {
        return { listeners: [], error };
      }
    })(),
    readProcessNames(),
  ]);
  if (netResult.error) {
    warnings.push('netstat 读取失败：' + String((netResult.error && netResult.error.message) || netResult.error));
  }

  const ports = mergeListeners(netResult.listeners)
    .map((row) => ({
      port: row.port,
      address: row.address,
      pid: row.pid,
      name: names.get(row.pid) || '',
    }))
    .sort((a, b) => a.port - b.port);

  return { ok: true, at: Date.now(), ports, warnings };
}

// ---------- port probing ----------
function probeHttp(port, host) {
  return new Promise((resolve) => {
    const started = process.hrtime.bigint();
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };
    const req = http.get(
      {
        host,
        port,
        path: '/',
        method: 'GET',
        timeout: 1000,
        headers: { 'User-Agent': 'dsh-status-monitor/1.0' },
      },
      (res) => {
        const ms = Math.round(Number(process.hrtime.bigint() - started) / 1e6);
        res.resume();
        finish({ reachable: true, http: true, status: res.statusCode || 0, ms });
      },
    );
    req.setTimeout(1000, () => {
      req.destroy();
      finish({ reachable: false, http: false, status: null, ms: null, error: 'timeout' });
    });
    req.once('error', (error) => {
      finish({
        reachable: false,
        http: false,
        status: null,
        ms: null,
        error: (error && error.code) || 'error',
      });
    });
  });
}

function probeTcp(port, host) {
  return new Promise((resolve) => {
    const started = process.hrtime.bigint();
    let settled = false;
    const socket = net.connect({ host, port });
    const finish = (value) => {
      if (settled) return;
      settled = true;
      socket.destroy();
      resolve(value);
    };
    socket.setTimeout(700, () => finish({
      reachable: false, http: false, status: null, ms: null, error: 'timeout',
    }));
    socket.once('connect', () => {
      finish({
        reachable: true,
        http: false,
        status: null,
        ms: Math.round(Number(process.hrtime.bigint() - started) / 1e6),
        error: null,
      });
    });
    socket.once('error', (error) => finish({
      reachable: false, http: false, status: null, ms: null, error: (error && error.code) || 'error',
    }));
  });
}

async function probeOne(port) {
  const overHttp = await probeHttp(port, '127.0.0.1');
  if (overHttp.http) return { port, ...overHttp };

  const [v4, v6] = await Promise.all([
    probeTcp(port, '127.0.0.1'),
    probeTcp(port, '::1'),
  ]);
  if (v4.reachable) return { port, ...v4 };
  if (v6.reachable) return { port, ...v6 };
  return {
    port,
    reachable: false,
    http: false,
    status: null,
    ms: null,
    error: v4.error || v6.error || 'unreachable',
  };
}

async function collectProbes(ports) {
  const results = await Promise.all(ports.map((port) => probeOne(port)));
  return { ok: true, at: Date.now(), results };
}

// ---------- usage statistics (migrated from dsh-usage-stats, 2026-11-04) ----------
// 数据层原本在独立的用量统计模块 Host 半；那个模块的界面已经并入状态监控的
// 用量卡片，所以扫描 / 聚合 / 缓存整体搬过来，端点改为 /wb/status-monitor/usage。
// 缓存文件沿用原路径，迁移时不需要全量重扫；旧插件卸载后由这里独占。
const USAGE_DSH_HOME = process.env.DSH_HOME || path.join(os.homedir(), '.dsh');
const USAGE_SESSIONS_DIR = path.join(USAGE_DSH_HOME, 'sessions');
const USAGE_CACHE_DIR = path.join(USAGE_DSH_HOME, 'storages', 'usage-stats');
const USAGE_CACHE_FILE = path.join(USAGE_CACHE_DIR, 'cache-v3.json');
const USAGE_CACHE_VERSION = 4;
const USAGE_BJ_OFFSET_MS = 8 * 60 * 60 * 1000;
const USAGE_SCAN_TTL_MS = 60_000;
const USAGE_CACHE_SAVE_INTERVAL_MS = 15_000;

// 官方 DeepSeek 价目（元 / 百万 tokens，2026-10-18）：[谷时, 峰时]；
// 峰时 = 北京时间工作日 09:00–12:00 与 14:00–18:00。
const USAGE_PRICE_TABLE = [
  {
    model: 'deepseek-v4-pro',
    match: /pro/i,
    cacheRead: [0.15, 0.3],
    input: [4.5, 9.0],
    output: [13.5, 27.0],
  },
  {
    model: 'deepseek-flash',
    match: /.*/,
    cacheRead: [0.02, 0.04],
    input: [1.0, 2.0],
    output: [4.0, 8.0],
  },
];

let usageCache = null;
let usageCacheLoaded = false;
let usageCacheSavedAt = 0;
let usageSnapshot = null;
let usageScanPromise = null;
const usageScanState = {
  running: false,
  scanned: 0,
  total: 0,
  startedAt: 0,
  finishedAt: 0,
  error: null,
};

function usageBaseName(dir) {
  if (!dir) return '';
  const norm = String(dir).replace(/[\\/]+$/, '');
  const idx = Math.max(norm.lastIndexOf('\\'), norm.lastIndexOf('/'));
  return idx >= 0 ? norm.slice(idx + 1) : norm;
}

function usageDayKey(ts) {
  if (!ts) return '';
  return new Date(ts + USAGE_BJ_OFFSET_MS).toISOString().slice(0, 10);
}

function usageIsPeak(ts) {
  const d = new Date(ts + USAGE_BJ_OFFSET_MS);
  const dow = d.getUTCDay();
  if (dow === 0 || dow === 6) return false;
  const h = d.getUTCHours();
  return (h >= 9 && h < 12) || (h >= 14 && h < 18);
}

function usagePriceFor(model) {
  for (const row of USAGE_PRICE_TABLE) {
    if (row.match.test(model || '')) return row;
  }
  return USAGE_PRICE_TABLE[USAGE_PRICE_TABLE.length - 1];
}

function usageCostPartsOf(model, usage, ts) {
  const price = usagePriceFor(model);
  const peak = usageIsPeak(ts) ? 1 : 0;
  const inputTokens = usage.inputTokens || 0;
  const outputTokens = usage.outputTokens || 0;
  const cacheRead = usage.cacheReadTokens || 0;
  const cacheWrite = usage.cacheWriteTokens || 0;
  const cacheCost = (cacheRead * price.cacheRead[peak]) / 1e6;
  const inputCost = ((inputTokens + cacheWrite) * price.input[peak]) / 1e6;
  const outputCost = (outputTokens * price.output[peak]) / 1e6;
  return {
    cacheRead: cacheCost,
    input: inputCost,
    output: outputCost,
    total: cacheCost + inputCost + outputCost,
  };
}

function usageTotalOf(usage) {
  if (typeof usage.totalTokens === 'number' && usage.totalTokens > 0) return usage.totalTokens;
  return (usage.inputTokens || 0)
    + (usage.outputTokens || 0)
    + (usage.cacheReadTokens || 0)
    + (usage.cacheWriteTokens || 0);
}

// 会话日志是「多帧 zstd 拼接」：按 magic 切帧、逐帧解压，再拼起来。
function usageDecompressFrames(buf) {
  const starts = [];
  for (let i = 0; i <= buf.length - 4; i += 1) {
    if (buf[i] === 0x28 && buf[i + 1] === 0xb5 && buf[i + 2] === 0x2f && buf[i + 3] === 0xfd) starts.push(i);
  }
  if (starts.length === 0) return '';
  const parts = [];
  for (let k = 0; k < starts.length; k += 1) {
    const start = starts[k];
    const end = k + 1 < starts.length ? starts[k + 1] : buf.length;
    try {
      parts.push(zlib.zstdDecompressSync(buf.subarray(start, end)));
    } catch {
      // 会话正在追加时尾帧可能不完整：能解的部分先留着。
    }
  }
  return Buffer.concat(parts).toString('utf8');
}

function usageParseSession(file, buf) {
  const text = usageDecompressFrames(buf);
  if (!text) return null;

  const nl = text.indexOf('\n');
  const headLine = nl === -1 ? text : text.slice(0, nl);
  let header;
  try {
    header = JSON.parse(headLine);
  } catch {
    return null;
  }
  if (!header || header.type !== 'session') return null;

  const record = {
    id: String(header.id || path.basename(path.dirname(file))),
    title: '',
    cwd: typeof header.cwd === 'string' ? header.cwd : '',
    createdAt: Number(header.createdAt) || 0,
    lastAt: 0,
    model: '',
    preset: typeof header.agentPreset === 'string' ? header.agentPreset : '',
    parent: typeof header.parentSession === 'string' ? header.parentSession : '',
    origin: typeof header.origin === 'string' ? header.origin : '',
    calls: 0,
    input: 0,
    output: 0,
    cacheRead: 0,
    cacheWrite: 0,
    total: 0,
    cost: 0,
    costParts: [0, 0, 0],
    days: {},
    // 对话性能：轮次耗时、首条回复延迟、工具调用与错误。
    turns: 0,
    turnMs: 0,
    firstReplyMs: 0,
    firstReplyCount: 0,
    toolCalls: 0,
    toolResults: 0,
    toolErrors: 0,
  };

  let pos = nl === -1 ? text.length : nl + 1;
  let turnStart = 0;
  let lastUserTime = 0;
  let awaitingFirstReply = false;
  while (pos < text.length) {
    let end = text.indexOf('\n', pos);
    if (end === -1) end = text.length;
    const line = text.slice(pos, end);
    pos = end + 1;
    if (line.length === 0) continue;

    // 只解析与用量 / 轮次 / 工具相关的事件，先做廉价字符串过滤再 JSON.parse。
    if (line.indexOf('"type":"assistant/message"') === -1
      && line.indexOf('"type":"session/title"') === -1
      && line.indexOf('"type":"turn/start"') === -1
      && line.indexOf('"type":"turn/end"') === -1
      && line.indexOf('"type":"user/message"') === -1
      && line.indexOf('"type":"tool/call"') === -1
      && line.indexOf('"type":"tool/result"') === -1) continue;

    let ev;
    try {
      ev = JSON.parse(line);
    } catch {
      continue;
    }
    if (!ev || typeof ev.type !== 'string') continue;
    const ts = Number(ev.time) || 0;

    if (ev.type === 'session/title') {
      const title = ev.data && ev.data.title;
      if (typeof title === 'string' && title.trim()) record.title = title.trim().slice(0, 160);
      continue;
    }

    if (ev.type === 'turn/start') {
      turnStart = ts;
      continue;
    }

    if (ev.type === 'turn/end') {
      if (turnStart && ts > turnStart) {
        record.turnMs += ts - turnStart;
        record.turns += 1;
      }
      turnStart = 0;
      continue;
    }

    if (ev.type === 'user/message') {
      lastUserTime = ts;
      awaitingFirstReply = true;
      continue;
    }

    if (ev.type === 'tool/call') {
      record.toolCalls += 1;
      continue;
    }

    if (ev.type === 'tool/result') {
      record.toolResults += 1;
      if (ev.data && ev.data.message && ev.data.message.isError) record.toolErrors += 1;
      continue;
    }

    const data = ev.data;
    if (!data || !data.usage) continue;

    if (awaitingFirstReply) {
      awaitingFirstReply = false;
      if (lastUserTime && ts > lastUserTime) {
        record.firstReplyMs += ts - lastUserTime;
        record.firstReplyCount += 1;
      }
    }

    const usage = data.usage;
    const model = data.message && data.message.source && data.message.source.model
      ? String(data.message.source.model)
      : '';
    const total = usageTotalOf(usage);
    const cost = usageCostPartsOf(model, usage, ts);

    record.calls += 1;
    record.input += usage.inputTokens || 0;
    record.output += usage.outputTokens || 0;
    record.cacheRead += usage.cacheReadTokens || 0;
    record.cacheWrite += usage.cacheWriteTokens || 0;
    record.total += total;
    record.cost += cost.total;
    record.costParts[0] += cost.cacheRead;
    record.costParts[1] += cost.input;
    record.costParts[2] += cost.output;
    if (model) record.model = model;
    if (ts > record.lastAt) record.lastAt = ts;

    const day = usageDayKey(ts) || 'unknown';
    let bucket = record.days[day];
    if (!bucket) {
      bucket = [0, 0, 0, 0, 0, 0, 0];
      record.days[day] = bucket;
    }
    bucket[0] += usage.inputTokens || 0;
    bucket[1] += usage.outputTokens || 0;
    bucket[2] += usage.cacheReadTokens || 0;
    bucket[3] += usage.cacheWriteTokens || 0;
    bucket[4] += total;
    bucket[5] += cost.total;
    bucket[6] += 1;
  }

  record.cost = round(record.cost, 6);
  return record;
}

async function usageListFiles() {
  const out = [];
  let workspaces;
  try {
    workspaces = await fsp.readdir(USAGE_SESSIONS_DIR, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const ws of workspaces) {
    if (!ws.isDirectory()) continue;
    const wsPath = path.join(USAGE_SESSIONS_DIR, ws.name);
    let entries;
    try {
      entries = await fsp.readdir(wsPath, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const file = path.join(wsPath, entry.name, 'session.v4.jsonl.zstd');
      try {
        const stat = await fsp.stat(file);
        if (!stat.isFile()) continue;
        out.push({ path: file, mtimeMs: stat.mtimeMs, size: stat.size });
      } catch {
        // 空会话目录没有日志文件。
      }
    }
  }
  return out;
}

async function usageLoadCache() {
  if (usageCacheLoaded) return;
  usageCacheLoaded = true;
  try {
    const raw = await fsp.readFile(USAGE_CACHE_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (parsed && parsed.version === USAGE_CACHE_VERSION && parsed.files && typeof parsed.files === 'object') {
      usageCache = { version: USAGE_CACHE_VERSION, files: parsed.files };
      return;
    }
  } catch {
    // 首次运行或缓存损坏：走全量扫描。
  }
  usageCache = { version: USAGE_CACHE_VERSION, files: {} };
}

async function usageSaveCache(force = false) {
  const now = Date.now();
  if (!force && now - usageCacheSavedAt < USAGE_CACHE_SAVE_INTERVAL_MS) return;
  usageCacheSavedAt = now;
  try {
    await fsp.mkdir(USAGE_CACHE_DIR, { recursive: true });
    await fsp.writeFile(
      USAGE_CACHE_FILE,
      JSON.stringify({ version: USAGE_CACHE_VERSION, savedAt: now, files: usageCache.files }),
      'utf8',
    );
  } catch {
    // ~/.dsh 只读也不致命：内存缓存照常工作。
  }
}

function usageBuildSnapshot(records, source) {
  const totals = {
    sessions: records.length,
    calls: 0,
    input: 0,
    output: 0,
    cacheRead: 0,
    cacheWrite: 0,
    total: 0,
    cost: 0,
    costParts: { cacheRead: 0, input: 0, output: 0 },
    turns: 0,
    turnMs: 0,
    firstReplyMs: 0,
    firstReplyCount: 0,
    toolCalls: 0,
    toolResults: 0,
    toolErrors: 0,
  };
  const dayMap = new Map();
  const modelMap = new Map();
  const wsMap = new Map();
  const sessions = [];

  for (const r of records) {
    totals.calls += r.calls;
    totals.input += r.input;
    totals.output += r.output;
    totals.cacheRead += r.cacheRead;
    totals.cacheWrite += r.cacheWrite;
    totals.total += r.total;
    totals.cost += r.cost;
    totals.turns += Number(r.turns) || 0;
    totals.turnMs += Number(r.turnMs) || 0;
    totals.firstReplyMs += Number(r.firstReplyMs) || 0;
    totals.firstReplyCount += Number(r.firstReplyCount) || 0;
    totals.toolCalls += Number(r.toolCalls) || 0;
    totals.toolResults += Number(r.toolResults) || 0;
    totals.toolErrors += Number(r.toolErrors) || 0;
    if (r.costParts) {
      totals.costParts.cacheRead += r.costParts[0] || 0;
      totals.costParts.input += r.costParts[1] || 0;
      totals.costParts.output += r.costParts[2] || 0;
    }

    for (const [day, v] of Object.entries(r.days)) {
      let bucket = dayMap.get(day);
      if (!bucket) {
        bucket = { day, input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0, cost: 0, calls: 0 };
        dayMap.set(day, bucket);
      }
      bucket.input += v[0];
      bucket.output += v[1];
      bucket.cacheRead += v[2];
      bucket.cacheWrite += v[3];
      bucket.total += v[4];
      bucket.cost += v[5];
      bucket.calls += v[6];
    }

    const modelKey = r.model || 'unknown';
    if (r.calls > 0) {
      let modelRow = modelMap.get(modelKey);
      if (!modelRow) {
        modelRow = { model: modelKey, calls: 0, total: 0, cost: 0 };
        modelMap.set(modelKey, modelRow);
      }
      modelRow.calls += r.calls;
      modelRow.total += r.total;
      modelRow.cost += r.cost;
    }

    const ws = usageBaseName(r.cwd) || '未知工作区';
    let wsRow = wsMap.get(ws);
    if (!wsRow) {
      wsRow = { workspace: ws, sessions: 0, total: 0, cost: 0 };
      wsMap.set(ws, wsRow);
    }
    wsRow.sessions += 1;
    wsRow.total += r.total;
    wsRow.cost += r.cost;

    sessions.push({
      id: r.id,
      title: r.title || ('会话 ' + String(r.id).slice(-6)),
      cwd: r.cwd,
      workspace: ws,
      createdAt: r.createdAt,
      lastAt: r.lastAt,
      model: r.model,
      preset: r.preset,
      origin: r.origin,
      parent: r.parent,
      calls: r.calls,
      input: r.input,
      output: r.output,
      cacheRead: r.cacheRead,
      cacheWrite: r.cacheWrite,
      total: r.total,
      cost: round(r.cost, 4),
    });
  }

  sessions.sort((a, b) => b.cost - a.cost || b.lastAt - a.lastAt);
  const timeline = Array.from(dayMap.values())
    .filter((d) => d.day !== 'unknown')
    .sort((a, b) => (a.day < b.day ? -1 : 1))
    .map((d) => ({ ...d, cost: round(d.cost, 4) }));

  totals.cost = round(totals.cost, 4);
  totals.costParts = {
    cacheRead: round(totals.costParts.cacheRead, 4),
    input: round(totals.costParts.input, 4),
    output: round(totals.costParts.output, 4),
  };

  const perf = {
    turns: totals.turns,
    totalTurnSec: round(totals.turnMs / 1000, 1),
    avgTurnSec: totals.turns > 0 ? round(totals.turnMs / totals.turns / 1000, 1) : 0,
    firstReplySec: totals.firstReplyCount > 0
      ? round(totals.firstReplyMs / totals.firstReplyCount / 1000, 2)
      : 0,
    outputTokPerSec: totals.turnMs > 0 ? round(totals.output / (totals.turnMs / 1000), 1) : 0,
    toolCalls: totals.toolCalls,
    toolResults: totals.toolResults,
    toolErrors: totals.toolErrors,
    toolErrorPct: totals.toolResults > 0
      ? round((totals.toolErrors / totals.toolResults) * 100, 2)
      : 0,
  };

  return {
    ok: true,
    loading: false,
    updatedAt: Date.now(),
    source,
    totals,
    perf,
    timeline,
    sessions,
    byModel: Array.from(modelMap.values())
      .sort((a, b) => b.total - a.total)
      .map((m) => ({ ...m, cost: round(m.cost, 4) })),
    byWorkspace: Array.from(wsMap.values())
      .sort((a, b) => b.total - a.total)
      .map((w) => ({ ...w, cost: round(w.cost, 4) })),
    prices: USAGE_PRICE_TABLE.map((p) => ({
      model: p.model,
      cacheRead: p.cacheRead,
      input: p.input,
      output: p.output,
    })),
  };
}

async function usageRunScan(force) {
  const startedAt = Date.now();
  usageScanState.running = true;
  usageScanState.scanned = 0;
  usageScanState.total = 0;
  usageScanState.startedAt = startedAt;
  usageScanState.finishedAt = 0;
  usageScanState.error = null;

  try {
    await usageLoadCache();
    const files = await usageListFiles();
    usageScanState.total = files.length;
    const records = [];
    let bytes = 0;

    for (const file of files) {
      const prev = usageCache.files[file.path];
      let record;
      if (!force && prev && prev.mtimeMs === file.mtimeMs && prev.size === file.size) {
        record = prev.record;
      } else {
        try {
          const buf = await fsp.readFile(file.path);
          bytes += buf.length;
          record = usageParseSession(file.path, buf);
        } catch {
          record = null;
        }
      }
      if (record) records.push(record);
      usageCache.files[file.path] = { mtimeMs: file.mtimeMs, size: file.size, record };
      usageScanState.scanned += 1;
      if (usageScanState.scanned % 3 === 0) await new Promise((resolve) => setImmediate(resolve));
    }

    // 忘掉已消失的文件，避免缓存无限增长。
    const live = new Set(files.map((f) => f.path));
    for (const key of Object.keys(usageCache.files)) {
      if (!live.has(key)) delete usageCache.files[key];
    }

    usageSnapshot = usageBuildSnapshot(records, {
      dir: USAGE_SESSIONS_DIR,
      files: files.length,
      bytes,
      scanMs: Date.now() - startedAt,
      cached: force ? false : true,
    });
    usageScanState.finishedAt = Date.now();
    await usageSaveCache(true);
    return usageSnapshot;
  } catch (error) {
    usageScanState.error = String((error && error.message) || error);
    usageScanState.finishedAt = Date.now();
    return null;
  } finally {
    usageScanState.running = false;
  }
}

function usageStartScan(force) {
  if (usageScanPromise) return usageScanPromise;
  usageScanPromise = usageRunScan(force).finally(() => {
    usageScanPromise = null;
  });
  return usageScanPromise;
}

async function usageEnsureFresh(force = false) {
  if (!usageSnapshot) {
    if (!usageScanPromise) usageStartScan(force);
    return;
  }
  if (force) {
    await usageStartScan(true);
    return;
  }
  if (Date.now() - usageSnapshot.updatedAt < USAGE_SCAN_TTL_MS) return;
  if (usageScanPromise) return;
  usageStartScan(false);
}

function usageLoadingPayload() {
  return {
    ok: true,
    loading: true,
    progress: {
      scanned: usageScanState.scanned,
      total: usageScanState.total,
      startedAt: usageScanState.startedAt,
      error: usageScanState.error,
    },
    source: { dir: USAGE_SESSIONS_DIR },
  };
}

// ---------- sampler lifecycle ----------
function startSampler() {
  const timers = [];

  sampleCpuUsage();
  const warm = setTimeout(() => {
    sampleCpuUsage();
    pushHistory();
  }, 250);
  timers.push({ kind: 'timeout', id: warm });

  const fast = setInterval(() => {
    sampleCpuUsage();
    pushHistory();
  }, 1000);
  timers.push({ kind: 'interval', id: fast });

  void sampleNetwork();
  void sampleGpu();
  // A second network sample shortly after boot turns the first zero rate into
  // a real delta before the card's first paint.
  const warmNet = setTimeout(() => {
    void sampleNetwork();
  }, 900);
  timers.push({ kind: 'timeout', id: warmNet });

  const slow = setInterval(() => {
    void sampleNetwork();
    void sampleGpu();
  }, 5000);
  timers.push({ kind: 'interval', id: slow });

  return () => {
    for (const timer of timers) {
      if (timer.kind === 'timeout') clearTimeout(timer.id);
      else clearInterval(timer.id);
    }
  };
}

// ---------- HTTP ----------
function sendJson(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(body));
}

function isLocal(req) {
  const remote = (req.socket && req.socket.remoteAddress) || '';
  return remote === '127.0.0.1' || remote === '::1' || remote === '::ffff:127.0.0.1';
}

function parsePortList(raw) {
  const list = String(raw || '')
    .split(',')
    .map((item) => Number(item.trim()))
    .filter((n) => Number.isInteger(n) && n > 0 && n <= 65535);
  return Array.from(new Set(list)).slice(0, 24);
}

export const inject = ['webServer'];

export function apply(ctx) {
  ctx.effect(() => startSampler(), 'status-monitor: sampler');

  ctx.effect(() => {
    void usageStartScan(false);
    const timer = setInterval(() => {
      void usageEnsureFresh(false).catch(() => {});
    }, 30_000);
    return () => clearInterval(timer);
  }, 'status-monitor: usage scanner');

  ctx.effect(
    () => ctx.webServer.register({
      kind: 'exact',
      path: '/wb/status-monitor/disk',
      async handler(req, res) {
        if (!isLocal(req)) {
          sendJson(res, 403, { ok: false, error: 'status monitor is local-only' });
          return;
        }
        try {
          sendJson(res, 200, await collectDisk());
        } catch (error) {
          sendJson(res, 500, { ok: false, error: String((error && error.message) || error) });
        }
      },
    }),
    'status-monitor: disk route',
  );

  ctx.effect(
    () => ctx.webServer.register({
      kind: 'exact',
      path: '/wb/status-monitor/hardware',
      async handler(req, res) {
        if (!isLocal(req)) {
          sendJson(res, 403, { ok: false, error: 'status monitor is local-only' });
          return;
        }
        try {
          sendJson(res, 200, await hardwareSnapshot());
        } catch (error) {
          sendJson(res, 500, { ok: false, error: String((error && error.message) || error) });
        }
      },
    }),
    'status-monitor: hardware route',
  );

  ctx.effect(
    () => ctx.webServer.register({
      kind: 'exact',
      path: '/wb/status-monitor/ports',
      async handler(req, res) {
        if (!isLocal(req)) {
          sendJson(res, 403, { ok: false, error: 'status monitor is local-only' });
          return;
        }
        try {
          sendJson(res, 200, await collectPorts());
        } catch (error) {
          sendJson(res, 500, { ok: false, error: String((error && error.message) || error) });
        }
      },
    }),
    'status-monitor: ports route',
  );

  ctx.effect(
    () => ctx.webServer.register({
      kind: 'exact',
      path: '/wb/status-monitor/probe',
      async handler(req, res) {
        if (!isLocal(req)) {
          sendJson(res, 403, { ok: false, error: 'status monitor is local-only' });
          return;
        }
        try {
          const url = new URL(req.url || '/', 'http://localhost');
          const ports = parsePortList(url.searchParams.get('ports'));
          if (ports.length === 0) {
            sendJson(res, 400, { ok: false, error: '没有可探测的端口' });
            return;
          }
          sendJson(res, 200, await collectProbes(ports));
        } catch (error) {
          sendJson(res, 500, { ok: false, error: String((error && error.message) || error) });
        }
      },
    }),
    'status-monitor: probe route',
  );

  ctx.effect(
    () => ctx.webServer.register({
      kind: 'exact',
      path: '/wb/status-monitor/usage',
      async handler(req, res) {
        if (!isLocal(req)) {
          sendJson(res, 403, { ok: false, error: 'status monitor is local-only' });
          return;
        }
        if (req.method !== 'GET' && req.method !== 'HEAD') {
          sendJson(res, 405, { ok: false, error: 'method not allowed' });
          return;
        }
        try {
          if (!usageSnapshot) {
            if (!usageScanPromise) usageStartScan(false);
            sendJson(res, 200, usageLoadingPayload());
            return;
          }
          if (Date.now() - usageSnapshot.updatedAt >= USAGE_SCAN_TTL_MS && !usageScanPromise) {
            usageStartScan(false);
          }
          sendJson(res, 200, { ...usageSnapshot, scanning: usageScanState.running });
        } catch (error) {
          sendJson(res, 500, { ok: false, error: String((error && error.message) || error) });
        }
      },
    }),
    'status-monitor: usage route',
  );
}
