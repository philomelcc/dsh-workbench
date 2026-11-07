/**
 * 迅雷后端的凭证与路径解析。
 *
 * Key 放在 `~/.dsh/secrets/xunlei.txt`（两行 appId=/apiKey=），
 * 或环境变量 DSH_XUNLEI_APP_ID / DSH_XUNLEI_API_KEY，避免写进代码和会话记录。
 */
import path from "node:path";
import os from "node:os";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));

export function credentialsPath() {
  return path.join(os.homedir(), ".dsh", "secrets", "xunlei.txt");
}

/** 读凭证；两者缺一返回 null。 */
export function readCredentials() {
  let file = {};
  try {
    const text = readFileSync(credentialsPath(), "utf8");
    for (const line of text.split(/\r?\n/)) {
      const match = /^\s*([A-Za-z0-9_]+)\s*=\s*(.+?)\s*$/.exec(line);
      if (match) file[match[1].toLowerCase()] = match[2];
    }
  } catch {
    /* 没文件就走环境变量 */
  }
  const appId = file.appid || file.app_id || process.env.DSH_XUNLEI_APP_ID || "";
  const apiKey = file.apikey || file.api_key || process.env.DSH_XUNLEI_API_KEY || "";
  if (!appId || !apiKey) return null;
  return { appId, apiKey };
}

export function workerPath() {
  return path.join(HERE, "xunlei-worker.mjs");
}

export function defaultConfigDir() {
  return path.join(os.homedir(), ".dsh", "fast-download", "sdk");
}

/** 字节数 → aria2 摘要风格的单位（HUD 的 parseSize 认这些）。 */
export function formatBytes(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return "0B";
  if (n >= 1024 ** 3) return `${(n / 1024 ** 3).toFixed(2)}GiB`;
  if (n >= 1024 ** 2) return `${(n / 1024 ** 2).toFixed(1)}MiB`;
  if (n >= 1024) return `${Math.round(n / 1024)}KiB`;
  return `${n}B`;
}

/** 把迅雷的一帧状态拼成 HUD 认识的 aria2 摘要行。 */
export function toAria2Line({ downloaded, total, speed, connections = 16 }) {
  const percent = total > 0 ? Math.min(100, Math.floor((downloaded / total) * 100)) : 0;
  let eta = "";
  if (speed > 0 && total > downloaded) {
    const seconds = Math.ceil((total - downloaded) / speed);
    const minutes = Math.floor(seconds / 60);
    eta = minutes > 0 ? `${minutes}m${seconds % 60}s` : `${seconds}s`;
  }
  return `[#1 SIZE:${formatBytes(downloaded)}/${formatBytes(total)}(${percent}%) CN:${connections} DL:${formatBytes(speed)}${eta ? ` ETA:${eta}` : ""}]`;
}
