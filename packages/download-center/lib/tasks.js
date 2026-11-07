/**
 * 下载任务表：创建、启停、持久化、会话下载记录。
 *
 * 任务本身是纯数据（可 JSON 序列化），运行中的子进程放在 runtimes 里。
 */
import path from "node:path";
import fs from "node:fs";
import os from "node:os";
import { spawn } from "node:child_process";
import { isMagnet, isHttp, startAria2, startXunlei } from "./engines.js";
import { readCredentials } from "./xunlei.js";

const STATE_DIR = path.join(os.homedir(), ".dsh", "download-center");
const STATE_FILE = path.join(STATE_DIR, "state.json");
const HISTORY_LIMIT = 500;

const STATUS_ORDER = { running: 0, queued: 1, paused: 2, error: 3, done: 4, cancelled: 5 };

function now() {
  return Date.now();
}

function randomId() {
  return `dl-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * 默认下载目录：`~/Downloads`（存在就用，不存在创建；创建失败回退工作区）。
 *
 * aria2 运行时放在工作区外（见 lib/engines.js），所以能写用户目录。
 */
export function defaultDownloadDir(baseDir) {
  return path.join(os.homedir(), "Downloads");
}

function sanitizeName(name) {
  const base = String(name || "")
    .split(/[\\/]/)
    .pop()
    .replace(/[<>:"|?*\u0000-\u001f]/g, "_")
    .replace(/^\.+/, "")
    .trim();
  return base && base !== "." && base !== ".." ? base : "";
}

function pickFileName(url, explicit) {
  if (explicit) {
    const safe = sanitizeName(explicit);
    if (safe) return safe;
  }
  if (/\.torrent$/i.test(String(url || ""))) {
    const safe = sanitizeName(String(url).split(/[\\/]/).pop());
    if (safe) return safe;
  }
  try {
    const parsed = new URL(url);
    const last = decodeURIComponent(parsed.pathname.split("/").filter(Boolean).pop() || "");
    const safe = sanitizeName(last);
    if (safe) return safe;
  } catch {
    /* ignore */
  }
  if (isMagnet(url)) {
    const dn = /[?&]dn=([^&]+)/.exec(String(url));
    if (dn) {
      // magnet 的 dn 用 + 表示空格，decodeURIComponent 不会处理 +
      const safe = sanitizeName(decodeURIComponent(dn[1].replace(/\+/g, " ")));
      if (safe) return safe;
    }
    const hash = (/btih:([0-9a-z]+)/i.exec(String(url)) || [])[1] || "";
    return `magnet-${hash.slice(0, 8) || now()}.bin`;
  }
  return `download-${now()}.bin`;
}

function uniqueName(dir, fileName) {
  if (!fs.existsSync(path.join(dir, fileName))) return fileName;
  const ext = path.extname(fileName);
  const stem = ext ? fileName.slice(0, -ext.length) : fileName;
  for (let i = 1; i < 1000; i += 1) {
    const candidate = `${stem}-${i}${ext}`;
    if (!fs.existsSync(path.join(dir, candidate))) return candidate;
  }
  return `${stem}-${now()}${ext}`;
}

export function createTaskStore(options = {}) {
  const baseDownloadDir = options.baseDir && String(options.baseDir).trim()
    ? defaultDownloadDir(String(options.baseDir))
    : path.join(os.homedir(), "Downloads");
  /** @type {Map<string, any>} */
  const tasks = new Map();
  /** @type {Map<string, {kill: () => void}>} */
  const runtimes = new Map();
  /** @type {any[]} */
  let history = [];
  let saveTimer = null;

  function persist() {
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saveTimer = null;
      try {
        fs.mkdirSync(STATE_DIR, { recursive: true });
        const snapshot = {
          version: 1,
          tasks: [...tasks.values()].map((task) => ({ ...task, progress: { ...task.progress } })),
          history: history.slice(-HISTORY_LIMIT),
        };
        fs.writeFileSync(STATE_FILE, JSON.stringify(snapshot, null, 2), "utf8");
      } catch {
        /* 持久化失败不阻塞下载 */
      }
    }, 400);
  }

  function load() {
    try {
      const raw = fs.readFileSync(STATE_FILE, "utf8");
      const snapshot = JSON.parse(raw);
      for (const task of snapshot.tasks || []) {
        // 上次服务退出时还在跑的任务，标记为中断
        if (task.status === "running" || task.status === "queued") {
          task.status = "error";
          task.error = "服务重启，任务已中断";
          task.speedBytesPerSec = 0;
        }
        tasks.set(task.id, task);
      }
      history = Array.isArray(snapshot.history) ? snapshot.history : [];
    } catch {
      /* 首次运行没有状态文件 */
    }
  }

  function historyEntry(task, extra = {}) {
    return {
      id: task.id,
      sessionId: task.sessionId || null,
      sessionTitle: task.sessionTitle || null,
      fileName: task.name,
      url: task.url,
      savePath: task.savePath,
      dir: task.dir,
      backend: task.backend,
      status: task.status,
      createdAt: task.createdAt,
      finishedAt: task.finishedAt || null,
      bytes: task.progress?.totalBytes ?? null,
      source: task.source || "ui",
      ...extra,
    };
  }

  function upsertHistory(task) {
    const index = history.findIndex((item) => item.id === task.id);
    if (index >= 0) history[index] = historyEntry(task, { sessionId: task.sessionId });
    else history.push(historyEntry(task));
    if (history.length > HISTORY_LIMIT) history = history.slice(-HISTORY_LIMIT);
  }

  function start(task) {
    task.status = "running";
    task.startedAt = task.startedAt || now();
    task.error = null;
    const hooks = {
      onProgress(progress) {
        task.progress = {
          percent: progress.percent,
          receivedBytes: progress.receivedBytes ?? task.progress.receivedBytes,
          totalBytes: progress.totalBytes ?? task.progress.totalBytes,
        };
        task.speedBytesPerSec = progress.speedBytesPerSec || 0;
        task.etaSeconds = progress.etaSeconds ?? null;
      },
      onLog() {},
      onError(message) {
        task.error = message;
      },
      onExit(code, detail) {
        runtimes.delete(task.id);
        // 被 pause/cancel 主动杀掉的，保留操作后的状态
        if (task.status === "paused" || task.status === "cancelled") {
          task.speedBytesPerSec = 0;
          task.etaSeconds = null;
          persist();
          return;
        }
        if (code === 0) {
          task.status = "done";
          task.progress.percent = 100;
          task.finishedAt = now();
        } else {
          task.status = "error";
          task.error = detail || task.error || `退出码 ${code}`;
          task.finishedAt = now();
        }
        task.speedBytesPerSec = 0;
        task.etaSeconds = null;
        upsertHistory(task);
        persist();
      },
    };
    let engine;
    try {
      engine = task.backend === "xunlei" ? startXunlei(task, hooks) : startAria2(task, hooks);
    } catch (error) {
      // 引擎起不来（常见：没装 aria2）时把任务标成 error，别留一个永远 running 的假状态
      task.status = "error";
      task.error = String((error && error.message) || error);
      task.finishedAt = now();
      task.speedBytesPerSec = 0;
      task.etaSeconds = null;
      upsertHistory(task);
      persist();
      throw error;
    }
    runtimes.set(task.id, engine);
    upsertHistory(task);
    persist();
  }

  function create(input = {}) {
    const url = String(input.url || "").trim();
    if (!url) throw new Error("缺少下载地址");
    const torrent = /\.torrent$/i.test(url) && fs.existsSync(url);
    if (!isHttp(url) && !isMagnet(url) && !torrent) {
      throw new Error("只支持 http(s)、magnet 或本机 .torrent 文件");
    }

    const dir = path.resolve(input.dir || input.savePath || baseDownloadDir);
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (error) {
      throw new Error(`无法创建保存目录 ${dir}：${error.message}`);
    }
    const name = uniqueName(dir, pickFileName(url, input.fileName));
    const backendRequested = input.backend === "aria2" || input.backend === "xunlei" ? input.backend : "auto";
    const creds = readCredentials();
    // 磁力只能走 aria2（迅雷开放 SDK 不支持 BT）
    const backend =
      backendRequested === "xunlei" && !isMagnet(url)
        ? "xunlei"
        : backendRequested === "aria2" || isMagnet(url) || !creds
          ? "aria2"
          : "xunlei";

    const task = {
      id: randomId(),
      name,
      url,
      dir,
      savePath: path.join(dir, name),
      backend,
      status: "queued",
      progress: { percent: 0, receivedBytes: 0, totalBytes: null },
      speedBytesPerSec: 0,
      etaSeconds: null,
      createdAt: now(),
      startedAt: null,
      finishedAt: null,
      error: null,
      jobId: input.jobId || null,
      sessionId: input.sessionId || null,
      sessionTitle: input.sessionTitle || null,
      source: input.source || "ui",
    };
    tasks.set(task.id, task);
    upsertHistory(task);
    persist();
    start(task);
    return task;
  }

  function pause(id) {
    const task = tasks.get(id);
    if (!task) throw new Error("任务不存在");
    if (task.status !== "running" && task.status !== "queued") throw new Error("任务状态不允许暂停");
    task.status = "paused";
    runtimes.get(id)?.kill();
    persist();
    return task;
  }

  function resume(id) {
    const task = tasks.get(id);
    if (!task) throw new Error("任务不存在");
    if (task.status !== "paused") throw new Error("任务状态不允许继续");
    start(task);
    return task;
  }

  function cancel(id) {
    const task = tasks.get(id);
    if (!task) throw new Error("任务不存在");
    if (["done", "error", "cancelled"].includes(task.status)) throw new Error("任务已经结束");
    task.status = "cancelled";
    runtimes.get(id)?.kill();
    upsertHistory(task);
    persist();
    return task;
  }

  function remove(id) {
    const task = tasks.get(id);
    if (!task) throw new Error("任务不存在");
    runtimes.get(id)?.kill();
    runtimes.delete(id);
    tasks.delete(id);
    persist();
  }

  function open(id, kind = "file") {
    const task = tasks.get(id);
    if (!task) throw new Error("任务不存在");
    const target = kind === "dir" ? task.dir : task.savePath;
    if (!fs.existsSync(target)) throw new Error(kind === "file" ? "文件还不存在" : "目录还不存在");
    // 不能带 windowsHide: true——那会把 explorer 的窗口藏掉（MainWindowTitle 为空）
    spawn("explorer.exe", [target], { detached: true, stdio: "ignore" }).unref();
  }

  /** 打开任意目录（用于「下载目录」按钮，即使列表为空也能用）。 */
  function openDir(dir) {
    const target = dir && String(dir).trim() ? String(dir) : defaultDownloadDir();
    try {
      fs.mkdirSync(target, { recursive: true });
    } catch {
      /* 打不开就交给 explorer 报错 */
    }
    // /n 强制新窗口；同样不能带 windowsHide
    spawn("explorer.exe", [`/n,${target}`], { detached: true, stdio: "ignore" }).unref();
  }

  /** 外部（如 dsh-fast-download 的 fast_download 工具）登记或更新一条下载记录。 */
  function register(payload = {}) {
    const id = payload.id || `ext-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    const entry = {
      id,
      sessionId: payload.sessionId || null,
      sessionTitle: payload.sessionTitle || null,
      fileName: payload.fileName || "未知文件",
      url: payload.url || "",
      savePath: payload.savePath || "",
      dir: payload.dir || "",
      backend: payload.backend || "aria2",
      status: payload.status || "done",
      createdAt: payload.createdAt || now(),
      finishedAt: payload.status && payload.status !== "running" ? now() : null,
      bytes: payload.bytes ?? null,
      source: payload.source || "fast_download",
      jobId: payload.jobId || null,
    };
    const index = history.findIndex((item) => item.id === id);
    if (index >= 0) {
      // 只覆盖传入的终态字段，保留首次记录的 createdAt
      history[index] = {
        ...history[index],
        ...entry,
        createdAt: history[index].createdAt,
        finishedAt: entry.finishedAt ?? history[index].finishedAt,
      };
    } else {
      history.push(entry);
    }
    if (history.length > HISTORY_LIMIT) history = history.slice(-HISTORY_LIMIT);
    persist();
    return entry;
  }

  function list() {
    const items = [...tasks.values()].map((task) => ({
      ...task,
      progress: { ...task.progress },
    }));
    items.sort((a, b) => {
      const order = (STATUS_ORDER[a.status] ?? 9) - (STATUS_ORDER[b.status] ?? 9);
      if (order !== 0) return order;
      return b.createdAt - a.createdAt;
    });
    return items;
  }

  function historyList() {
    return [...history].sort((a, b) => b.createdAt - a.createdAt);
  }

  function stats() {
    const items = list();
    const running = items.filter((task) => task.status === "running").length;
    const done = items.filter((task) => task.status === "done").length;
    const speed = items
      .filter((task) => task.status === "running")
      .reduce((sum, task) => sum + (task.speedBytesPerSec || 0), 0);
    return { total: items.length, running, done, speedBytesPerSec: speed };
  }

  function shutdown() {
    for (const runtime of runtimes.values()) {
      try {
        runtime.kill();
      } catch {
        /* ignore */
      }
    }
    runtimes.clear();
  }

  load();
  return { create, pause, resume, cancel, remove, open, openDir, register, list, historyList, stats, shutdown };
}
