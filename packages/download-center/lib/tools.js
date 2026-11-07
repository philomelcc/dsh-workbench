/**
 * Agent 工具：fast_download / download_status / download_cancel。
 *
 * 合并自 dsh-fast-download，但不再自己 spawn 进程——统一走下载中心的
 * `store`，这样页面任务列表和会话进度条看到的是同一份数据。
 */
import { defineTool } from "./tool.js";

function text(content) {
  return [{ type: "text", text: content }];
}

function sessionTitleOf(ctx, exec) {
  try {
    const service = ctx.get?.("sessionTitle");
    const session = exec.agent?.session;
    return service && session ? (service.get(session)?.title ?? null) : null;
  } catch {
    return null;
  }
}

export function registerTools(ctx, store) {
  const fastDownload = defineTool({
    name: "fast_download",
    description: [
      "在后台下载一个文件，自动保存到指定目录（默认下载目录）。",
      "支持 HTTP(S)、magnet 磁力链接，本机 .torrent 文件走工作台页面。",
      "有迅雷 API Key 时走迅雷 P2SP，否则 aria2 多连接。",
      "调用后立即返回 taskId，进度显示在会话头部和「工作台 · 下载」页面；",
      "用 download_status 查，download_cancel 取消。",
      "下载大文件（安装包、模型、视频、压缩包）时优先用它。",
    ].join(" "),
    parameters: {
      url: { type: "string", required: true, description: "HTTP(S) 或 magnet 链接" },
      savePath: { type: "string", description: "保存目录；省略则用默认下载目录" },
      fileName: { type: "string", description: "保存文件名；省略则从 URL 推断" },
      backend: {
        type: "string",
        enum: ["auto", "xunlei", "aria2"],
        description: "下载后端：auto（有 Key 用迅雷，否则 aria2）、xunlei、aria2",
      },
      wait: { type: "boolean", description: "为 true 时阻塞到下载结束再返回（默认 false）" },
    },
    output: {
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          taskId: { type: "string" },
          state: { type: "string" },
          savePath: { type: "string" },
          fileName: { type: "string" },
          filePath: { type: "string" },
          backend: { type: "string" },
          detail: { type: "string" },
        },
        required: ["taskId", "state", "savePath", "fileName", "filePath", "backend"],
      },
      render(_args, value) {
        const head =
          value.state === "started"
            ? `已开始后台下载：${value.fileName}`
            : value.state === "done"
              ? `下载完成：${value.filePath}`
              : `下载${value.state === "error" ? "失败" : "结束"}：${value.fileName}`;
        const lines = [
          head,
          `后端: ${value.backend}`,
          `taskId: ${value.taskId || "-"}`,
          `保存到: ${value.filePath}`,
          value.detail ? `说明: ${value.detail}` : "",
          value.state === "started" ? "进度会显示在会话头部；用 download_status 查结果。" : "",
        ].filter(Boolean);
        return text(lines.join("\n"));
      },
    },
    async execute(args, exec) {
      const url = String(args.url || "").trim();
      if (!/^https?:\/\//i.test(url) && !/^magnet:/i.test(url)) {
        return {
          taskId: "",
          state: "error",
          savePath: "",
          fileName: "",
          filePath: "",
          backend: "aria2",
          detail: "只支持 http(s) 或 magnet 链接；.torrent 文件请在下载页选择",
        };
      }
      const task = store.create({
        url,
        dir: args.savePath,
        fileName: args.fileName,
        backend: args.backend === "auto" ? undefined : args.backend,
        sessionId: exec.agent?.id,
        sessionTitle: sessionTitleOf(ctx, exec),
        source: "fast_download",
      });
      return {
        taskId: task.id,
        state: "started",
        savePath: task.dir,
        fileName: task.name,
        filePath: task.savePath,
        backend: task.backend,
        detail: "后台下载中",
      };
    },
  });

  const downloadStatus = defineTool({
    name: "download_status",
    description: "查看 fast_download 起的后台下载任务：状态、进度、文件路径。",
    parameters: {
      taskId: { type: "string", required: true, description: "fast_download 返回的 taskId" },
    },
    output: {
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          taskId: { type: "string" },
          status: { type: "string" },
          progress: { type: "string" },
          filePath: { type: "string" },
          error: { type: "string" },
        },
        required: ["taskId", "status"],
      },
      render(_args, value) {
        const lines = [
          `任务 ${value.taskId}`,
          `状态: ${value.status}${value.progress ? ` · ${value.progress}` : ""}`,
          value.filePath ? `文件: ${value.filePath}` : "",
          value.error ? `错误: ${value.error}` : "",
        ].filter(Boolean);
        return text(lines.join("\n"));
      },
    },
    async execute(args) {
      const taskId = String(args.taskId || "");
      const task = store.list().find((item) => item.id === taskId);
      if (!task) return { taskId, status: "unknown", error: "任务不存在" };
      const percent = task.progress?.percent ?? 0;
      const speed = task.speedBytesPerSec
        ? `${(task.speedBytesPerSec / 1024 ** 2).toFixed(1)} MiB/s`
        : "";
      return {
        taskId,
        status: task.status,
        progress: `${percent}%${speed ? ` · ${speed}` : ""}`,
        filePath: task.savePath,
        error: task.error || "",
      };
    },
  });

  const downloadCancel = defineTool({
    name: "download_cancel",
    description: "取消一个 fast_download 后台下载任务。",
    parameters: {
      taskId: { type: "string", required: true, description: "要取消的 taskId" },
    },
    output: {
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          taskId: { type: "string" },
          result: { type: "string" },
        },
        required: ["taskId", "result"],
      },
      render(_args, value) {
        return text(value.result === "requested" ? `已取消 ${value.taskId}` : `任务 ${value.taskId}：${value.result}`);
      },
    },
    async execute(args) {
      const taskId = String(args.taskId || "");
      try {
        const task = store.cancel(taskId);
        return { taskId, result: task ? "requested" : "任务不存在" };
      } catch (error) {
        return { taskId, result: error instanceof Error ? error.message : String(error) };
      }
    },
  });

  ctx.effect(() => ctx.tools.register(fastDownload), "download-center: tool fast_download");
  ctx.effect(() => ctx.tools.register(downloadStatus), "download-center: tool download_status");
  ctx.effect(() => ctx.tools.register(downloadCancel), "download-center: tool download_cancel");

  ctx.effect(
    () =>
      ctx.systemPrompt.section({
        name: "fast-download",
        order: 1000,
        text: [
          "下载文件时，优先调用 fast_download 工具而不是 curl / Invoke-WebRequest：",
          "它支持 HTTP(S) 和 magnet，有迅雷 Key 走 P2SP，否则 aria2 多连接；",
          "自动保存到指定目录，进度显示在会话头部和「工作台 · 下载」页面。",
          "调用后立即返回 taskId，可用 download_status 查询、download_cancel 取消。",
          "只有很小的文件、需要边下边处理、或者链接不是 http(s)/magnet 时才退回 curl。",
        ].join("\n"),
      }),
    "download-center: prompt section",
  );
}
