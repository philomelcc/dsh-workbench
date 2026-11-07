/**
 * 下载引擎：aria2（HTTP + 磁力/BT）和迅雷官方 SDK（HTTP）。
 *
 * 两者都起独立子进程；这里只负责参数、进度解析和退出回调。
 */
import path from "node:path";
import os from "node:os";
import { spawn } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";
import { defaultConfigDir, readCredentials, workerPath } from "./xunlei.js";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const BIN_NAME = process.platform === "win32" ? "aria2c.exe" : "aria2c";
// The repo deliberately does not ship aria2c (it is GPLv2 and a 5 MB binary).
// Resolution order: ARIA2C_PATH env var → a cached copy under ~/.dsh → a legacy
// vendor/ copy from an older local install (scripted below).
const RUNTIME_ARIA2 = path.join(os.homedir(), ".dsh", "download-center", "bin", BIN_NAME);
const LEGACY_VENDOR_ARIA2 = path.join(HERE, "..", "vendor", BIN_NAME);

/**
 * Absolute path to an aria2c binary.
 * @throws when aria2 is not installed and no override is provided.
 */
function ensureAria2() {
  const override = process.env.ARIA2C_PATH || process.env.ARIA2C;
  if (override && existsSync(override)) return override;
  if (existsSync(RUNTIME_ARIA2)) return RUNTIME_ARIA2;
  if (existsSync(LEGACY_VENDOR_ARIA2)) {
    // 工作区内的 exe 会被 DSH 套上 workspace-write 受限令牌（只能写工作区），
    // 所以运行时要放在工作区外；旧安装的 vendor 副本复制过去后不再使用。
    mkdirSync(path.dirname(RUNTIME_ARIA2), { recursive: true });
    copyFileSync(LEGACY_VENDOR_ARIA2, RUNTIME_ARIA2);
    return RUNTIME_ARIA2;
  }
  throw new Error(
    "未找到 aria2c。请先安装 aria2（Windows: winget install aria2.aria2 / scoop install aria2），" +
      "或设置环境变量 ARIA2C_PATH 指向 aria2c 可执行文件。"
  );
}

export function aria2Exe() {
  return ensureAria2();
}

/** Non-throwing probe for status endpoints. */
export function aria2Status() {
  try {
    return { path: ensureAria2(), available: true, error: null };
  } catch (error) {
    return { path: null, available: false, error: String((error && error.message) || error) };
  }
}

export function isMagnet(url) {
  return /^magnet:\?/i.test(String(url || ""));
}

export function isHttp(url) {
  return /^https?:\/\//i.test(String(url || ""));
}

const UNITS = {
  B: 1,
  KB: 1000,
  MB: 1e6,
  GB: 1e9,
  TB: 1e12,
  KIB: 1024,
  MIB: 1024 ** 2,
  GIB: 1024 ** 3,
  TIB: 1024 ** 4,
};

export function parseSize(value) {
  const match = String(value || "").trim().match(/^([\d.]+)\s*([KMGT]?i?B)$/i);
  if (!match) return null;
  const unit = match[2].toUpperCase();
  const factor = UNITS[unit] ?? UNITS[unit.replace("I", "")] ?? 1;
  const bytes = parseFloat(match[1]) * factor;
  return Number.isFinite(bytes) ? bytes : null;
}

/** aria2 摘要行 → { percent, receivedBytes, totalBytes, speedBytesPerSec, etaSeconds }。 */
export function parseAria2Line(line) {
  const text = String(line || "");
  const percentMatch = text.match(/\((\d{1,3})%\)/);
  if (!percentMatch) return null;
  const sizeMatch =
    text.match(/SIZE:([\d.]+[A-Za-z]+)\/([\d.]+[A-Za-z]+)/) ||
    text.match(/\s([\d.]+[A-Za-z]+)\/([\d.]+[A-Za-z]+)\(\d{1,3}%\)/);
  const speedMatch = text.match(/(?:DL|SPEED):([\d.]+[A-Za-z]+)/);
  const etaMatch = text.match(/ETA:([\dhms]+)/);
  const received = sizeMatch ? parseSize(sizeMatch[1]) : null;
  const total = sizeMatch ? parseSize(sizeMatch[2]) : null;
  const speed = speedMatch ? parseSize(speedMatch[1]) : null;
  const percent = Number(percentMatch[1]);
  let eta = null;
  if (etaMatch) {
    const raw = etaMatch[1];
    const h = /(\d+)h/.exec(raw);
    const m = /(\d+)m/.exec(raw);
    const s = /(\d+)s/.exec(raw);
    eta = (h ? Number(h[1]) * 3600 : 0) + (m ? Number(m[1]) * 60 : 0) + (s ? Number(s[1]) : 0);
  } else if (total !== null && received !== null && speed) {
    eta = Math.max(0, Math.round((total - received) / speed));
  }
  return {
    percent,
    receivedBytes: received,
    totalBytes: total,
    speedBytesPerSec: speed || 0,
    etaSeconds: eta,
  };
}

export function buildAria2Args(task) {
  const torrent = /\.torrent$/i.test(task.url);
  const magnet = isMagnet(task.url);
  const args = [
    "--no-conf",
    "--console-log-level=notice",
    "--summary-interval=1",
    "--download-result=hide",
    "--disable-ipv6=true",
    "--file-allocation=none",
    "--auto-file-renaming=false",
    "--allow-overwrite=false",
    "-d",
    task.dir,
  ];
  if (torrent) {
    // 种子文件：文件名由 torrent 元数据决定，不传 -o
    args.push("--seed-time=0");
  } else if (magnet) {
    args.push(
      "--enable-dht=true",
      "--bt-enable-lpd=true",
      "--seed-time=0",
      "--bt-max-peers=55",
      "--bt-save-metadata=true",
    );
  } else {
    args.push("-o", task.name, "-x16", "-s16", "-k1M");
  }
  args.push(task.url);
  return args;
}

/**
 * 起 aria2。返回 { kill, pid }。
 * hooks.onProgress({percent, receivedBytes, totalBytes, speedBytesPerSec, etaSeconds})
 * hooks.onExit(code)
 */
export function startAria2(task, hooks) {
  const proc = spawn(ensureAria2(), buildAria2Args(task), {
    windowsHide: true,
    cwd: task.dir,
  });
  let tail = "";
  const forward = (buf) => {
    const chunk = buf.toString("utf8");
    tail = (tail + chunk).slice(-8192);
    const lastLine = tail.split(/[\r\n]+/).filter(Boolean).pop();
    const parsed = parseAria2Line(lastLine);
    if (parsed) hooks.onProgress(parsed);
  };
  proc.stdout.on("data", forward);
  proc.stderr.on("data", forward);
  proc.on("error", (error) => hooks.onError?.(error.message));
  proc.on("exit", (code) => hooks.onExit(code));
  return {
    pid: proc.pid,
    kill() {
      if (proc.pid) spawn("taskkill", ["/PID", String(proc.pid), "/T", "/F"], { windowsHide: true });
    },
  };
}

/** 起迅雷 worker。只支持 HTTP(S)；磁力必须走 aria2。 */
export function startXunlei(task, hooks) {
  const creds = readCredentials();
  if (!creds) {
    hooks.onExit(-1, "没有找到迅雷 API Key（~/.dsh/secrets/xunlei.txt）");
    return { pid: null, kill() {} };
  }
  const env = {
    ...process.env,
    XL_APP_ID: creds.appId,
    XL_API_KEY: creds.apiKey,
    XL_CFG_DIR: defaultConfigDir(),
    XL_URL: task.url,
    XL_SAVE_PATH: task.dir,
    XL_SAVE_NAME: task.name,
  };
  const proc = spawn(process.execPath, [workerPath()], {
    env,
    windowsHide: true,
    stdio: ["ignore", "pipe", "pipe"],
  });
  const lines = createInterface({ input: proc.stdout });
  let finished = false;
  const settle = (code, detail) => {
    if (finished) return;
    finished = true;
    hooks.onExit(code, detail);
  };
  lines.on("line", (raw) => {
    let msg;
    try {
      msg = JSON.parse(raw);
    } catch {
      return;
    }
    if (msg.type === "state") {
      const percent =
        msg.total > 0 ? Math.min(100, Math.floor((msg.downloaded / msg.total) * 100)) : 0;
      hooks.onProgress({
        percent,
        receivedBytes: msg.downloaded,
        totalBytes: msg.total || null,
        speedBytesPerSec: msg.speed || 0,
        etaSeconds:
          msg.total > 0 && msg.speed > 0
            ? Math.max(0, Math.round((msg.total - msg.downloaded) / msg.speed))
            : null,
      });
    } else if (msg.type === "done") {
      settle(0);
    } else if (msg.type === "failed") {
      settle(1, msg.detail || `code ${msg.code}`);
    }
  });
  proc.stderr.on("data", (buf) => hooks.onLog?.(buf.toString("utf8")));
  proc.on("error", (error) => settle(1, error.message));
  proc.on("exit", (code) => settle(code));
  return {
    pid: proc.pid,
    kill() {
      if (proc.pid) spawn("taskkill", ["/PID", String(proc.pid), "/T", "/F"], { windowsHide: true });
    },
  };
}
