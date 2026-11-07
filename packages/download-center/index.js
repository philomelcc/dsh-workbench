/**
 * 工作台 · 下载（Host 半）。
 *
 * 数据端点都在 /wb/downloads/*，只允许回环访问。
 * 任务表、引擎调度在 lib/tasks.js / lib/engines.js；
 * Agent 工具（fast_download 等）在 lib/tools.js，和页面共用同一个 store。
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createTaskStore, defaultDownloadDir } from "./lib/tasks.js";
import { aria2Status } from "./lib/engines.js";
import { registerTools } from "./lib/tools.js";

export const inject = ["webServer", "workingDirectory", "tools", "systemPrompt"];

const LOOPBACK = /^(::1|127\.0\.0\.1|::ffff:127\.0\.0\.1)$/;

function allow(req) {
  return LOOPBACK.test(req.socket?.remoteAddress || "");
}

function send(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(body));
}

function ok(res, payload) {
  send(res, 200, { ok: true, at: Date.now(), ...payload });
}

function fail(res, error, status = 400) {
  send(res, status, { ok: false, error: error instanceof Error ? error.message : String(error) });
}

async function readJson(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    // 种子文件走 base64 上传，放宽到 8MB
    if (size > 8 * 1024 * 1024) throw new Error("请求体过大");
    chunks.push(chunk);
  }
  if (chunks.length === 0) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new Error("请求体不是合法 JSON");
  }
}

export function apply(ctx) {
  // host 由计划任务启动，cwd 是 system32；工作区路径只能从注册表拿。
  const registry = ctx.get("workspaceRegistry");
  const workspaces = registry?.list?.() ?? [];
  const workspaceDir = workspaces[0]?.path || "";
  const store = createTaskStore({ baseDir: workspaceDir });

  ctx.effect(
    () => () => {
      store.shutdown();
    },
    "download-center: shutdown",
  );

  // Agent 工具与页面共用一份 task store
  registerTools(ctx, store);

  function route(path, handler) {
    return ctx.effect(
      () =>
        ctx.webServer.register({
          kind: "exact",
          path,
          handler: async (req, res) => {
            if (!allow(req)) return fail(res, "只允许本机访问", 403);
            try {
              await handler(req, res);
            } catch (error) {
              fail(res, error);
            }
          },
        }),
      `download-center: ${path}`,
    );
  }

  route("/wb/downloads/list", async (_req, res) => {
    ok(res, { tasks: store.list(), stats: store.stats() });
  });

  route("/wb/downloads/history", async (_req, res) => {
    ok(res, { records: store.historyList() });
  });

  route("/wb/downloads/health", async (_req, res) => {
    const aria2 = aria2Status();
    ok(res, {
      aria2: aria2.available ? aria2.path : null,
      aria2Error: aria2.error,
      defaultDir: defaultDownloadDir(workspaceDir),
      workspaceDir,
      platform: process.platform,
    });
  });

  route("/wb/downloads/create", async (req, res) => {
    if (req.method !== "POST") return fail(res, "只接受 POST", 405);
    const body = await readJson(req);
    const task = store.create({
      url: body.url,
      dir: body.dir,
      savePath: body.savePath,
      fileName: body.fileName,
      backend: body.backend,
      sessionId: body.sessionId,
      sessionTitle: body.sessionTitle,
      source: body.source || "ui",
    });
    ok(res, { task });
  });

  for (const action of ["pause", "resume", "cancel"]) {
    route(`/wb/downloads/${action}`, async (req, res) => {
      if (req.method !== "POST") return fail(res, "只接受 POST", 405);
      const body = await readJson(req);
      const task = store[action](String(body.id || ""));
      ok(res, { task });
    });
  }

  route("/wb/downloads/remove", async (req, res) => {
    if (req.method !== "POST") return fail(res, "只接受 POST", 405);
    const body = await readJson(req);
    store.remove(String(body.id || ""));
    ok(res, {});
  });

  route("/wb/downloads/open", async (req, res) => {
    if (req.method !== "POST") return fail(res, "只接受 POST", 405);
    const body = await readJson(req);
    if (body.dir) {
      store.openDir(String(body.dir));
    } else {
      const kind = body.kind === "dir" ? "dir" : "file";
      store.open(String(body.id || ""), kind);
    }
    ok(res, {});
  });

  // .torrent 上传：Client 把种子读成 base64，Host 落盘后交给 aria2
  route("/wb/downloads/torrent", async (req, res) => {
    if (req.method !== "POST") return fail(res, "只接受 POST", 405);
    const body = await readJson(req);
    const rawName = String(body.fileName || "upload.torrent");
    const safeName = path.basename(rawName).replace(/[<>:"|?*\u0000-\u001f]/g, "_");
    const name = /\.torrent$/i.test(safeName) ? safeName : `${safeName}.torrent`;
    const dir = path.join(os.homedir(), ".dsh", "download-center", "torrents");
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `${Date.now()}-${name}`);
    const buffer = Buffer.from(String(body.dataBase64 || ""), "base64");
    if (buffer.length === 0) return fail(res, "种子内容为空");
    fs.writeFileSync(file, buffer);
    const task = store.create({
      url: file,
      dir: body.dir,
      // 用原始种子名做任务名，别把落盘用的时间戳前缀带出来
      fileName: name,
      backend: "aria2",
      sessionId: body.sessionId,
      sessionTitle: body.sessionTitle,
      source: "torrent",
    });
    ok(res, { task });
  });

  // 供 dsh-fast-download 的 fast_download 工具登记“哪个会话下了什么”
  route("/wb/downloads/register", async (req, res) => {
    if (req.method !== "POST") return fail(res, "只接受 POST", 405);
    const body = await readJson(req);
    const record = store.register(body);
    ok(res, { record });
  });
}
