window.__ModuleLoader__.load({
  id: "@philomelcc/dsh-download-center",
  factory(require) {
    const React = require("react");
    const h = React.createElement;

    const { useState, useEffect, useRef, useCallback } = React;

    // ── 工具 ────────────────────────────────────────────────────────────
    function fmtBytes(value) {
      if (value === null || value === undefined || !Number.isFinite(value)) return "—";
      if (value >= 1024 ** 3) return (value / 1024 ** 3).toFixed(2) + " GiB";
      if (value >= 1024 ** 2) return (value / 1024 ** 2).toFixed(1) + " MiB";
      if (value >= 1024) return Math.round(value / 1024) + " KiB";
      return value + " B";
    }

    function fmtSpeed(bytesPerSec) {
      if (!bytesPerSec) return "";
      return fmtBytes(bytesPerSec) + "/s";
    }

    function fmtEta(seconds) {
      if (seconds === null || seconds === undefined || !Number.isFinite(seconds) || seconds <= 0) return "";
      const total = Math.round(seconds);
      const m = Math.floor(total / 60);
      const s = total % 60;
      if (m >= 60) return Math.floor(m / 60) + " 小时 " + (m % 60) + " 分";
      return m > 0 ? m + " 分 " + s + " 秒" : s + " 秒";
    }

    function fmtTime(ts) {
      if (!ts) return "—";
      const d = new Date(ts);
      const pad = (n) => String(n).padStart(2, "0");
      return `${d.getMonth() + 1}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }

    const BACKEND_LABEL = { xunlei: "迅雷", aria2: "aria2" };
    const SOURCE_LABEL = {
      fast_download: "会话",
      chrome: "Chrome",
      ui: "页面",
      torrent: "页面",
    };
    const STATUS_LABEL = {
      running: "下载中",
      queued: "排队",
      paused: "已暂停",
      done: "已完成",
      error: "失败",
      cancelled: "已取消",
    };

    function statusColor(tokens, status) {
      switch (status) {
        case "running":
          return tokens.brand;
        case "done":
          return tokens.success;
        case "error":
          return tokens.error;
        case "paused":
          return tokens.warn;
        case "cancelled":
          return tokens.idle;
        default:
          return tokens.idle;
      }
    }

    async function api(path, body) {
      const options = body === undefined
        ? { cache: "no-store" }
        : {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            cache: "no-store",
          };
      const response = await fetch(path, options);
      const json = await response.json().catch(() => ({ ok: false, error: "响应不是 JSON" }));
      if (!json.ok) throw new Error(json.error || `HTTP ${response.status}`);
      return json;
    }

    // ── 图标 ────────────────────────────────────────────────────────────
    function DownloadIcon(props) {
      const size = props.size || 20;
      return h(
        "svg",
        { viewBox: "0 0 24 24", width: size, height: size, "aria-hidden": true, fill: "none" },
        h("path", { d: "M12 4v10", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round" }),
        h("path", { d: "M8 10.5 12 14.5l4-4", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round" }),
        h("path", { d: "M5 19h14", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round" }),
      );
    }

    function StatusLed({ tokens, status }) {
      const color = statusColor(tokens, status);
      return h("span", {
        title: STATUS_LABEL[status] || status,
        style: {
          display: "inline-block",
          width: 8,
          height: 8,
          borderRadius: 999,
          background: color,
          boxShadow: status === "running" ? `0 0 6px ${color}` : "none",
          flex: "0 0 auto",
        },
      });
    }

    // ── 任务行 ──────────────────────────────────────────────────────────
    function TaskRow({ task, tokens, onAction }) {
      const busy = task.status === "running" || task.status === "queued";
      const paused = task.status === "paused";
      const percent = Math.max(0, Math.min(100, task.progress?.percent || 0));
      const speed = task.status === "running" ? fmtSpeed(task.speedBytesPerSec) : "";
      const eta = task.status === "running" ? fmtEta(task.etaSeconds) : "";

      return h(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 12px",
            borderBottom: `1px solid ${tokens.border1}`,
            opacity: task.status === "cancelled" ? 0.55 : 1,
          },
        },
        h(StatusLed, { tokens, status: task.status }),
        h(
          "div",
          { style: { minWidth: 0, flex: "1 1 220px" } },
          h(
            "div",
            { style: { display: "flex", alignItems: "center", gap: 8, minWidth: 0 } },
            h(
              "span",
              {
                title: task.url,
                style: {
                  fontSize: 13,
                  fontWeight: 560,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: task.status === "error" ? tokens.error : tokens.label,
                },
              },
              task.name,
            ),
            h(
              "span",
              {
                style: {
                  fontSize: 10,
                  padding: "1px 6px",
                  borderRadius: 999,
                  border: `1px solid ${tokens.border1}`,
                  color: tokens.labelSecondary,
                  flex: "0 0 auto",
                },
              },
              BACKEND_LABEL[task.backend] || task.backend,
            ),
          ),
          task.error
            ? h("div", { style: { fontSize: 11, color: tokens.error, marginTop: 2 } }, task.error)
            : h("div", { style: { fontSize: 11, color: tokens.labelSecondary, marginTop: 2 } },
                task.dir + "  ·  " + STATUS_LABEL[task.status]),
        ),
        h(
          "div",
          {
            style: {
              width: 220,
              height: 4,
              borderRadius: 999,
              background: tokens.border2,
              overflow: "hidden",
              flex: "0 0 auto",
            },
          },
          h("div", {
            style: {
              width: percent + "%",
              height: "100%",
              borderRadius: 999,
              background: statusColor(tokens, task.status),
              transition: "width 300ms ease",
            },
          }),
        ),
        h(
          "div",
          {
            style: {
              width: 190,
              fontSize: 11,
              color: tokens.labelSecondary,
              fontVariantNumeric: "tabular-nums",
              flex: "0 0 auto",
            },
          },
          percent + "%" + (speed ? " · " + speed : "") + (eta ? " · 剩余 " + eta : ""),
        ),
        h(
          "div",
          { style: { display: "flex", gap: 6, flex: "0 0 auto" } },
          busy &&
            h(
              "button",
              { onClick: () => onAction("pause", task), className: "dc-btn", title: "暂停" },
              "暂停",
            ),
          paused &&
            h(
              "button",
              { onClick: () => onAction("resume", task), className: "dc-btn", title: "继续" },
              "继续",
            ),
          (busy || paused) &&
            h(
              "button",
              { onClick: () => onAction("cancel", task), className: "dc-btn", title: "取消" },
              "取消",
            ),
          task.status === "done" &&
            h(
              "button",
              { onClick: () => onAction("open", task, "file"), className: "dc-btn", title: "打开文件" },
              "打开",
            ),
          h(
            "button",
            { onClick: () => onAction("opendir", task), className: "dc-btn", title: "打开所在目录" },
            "目录",
          ),
          h(
            "button",
            { onClick: () => onAction("remove", task), className: "dc-btn", title: "从列表移除（不删文件）" },
            "移除",
          ),
        ),
      );
    }

    function btnStyle() {
      // 布局归 .dc-btn 的 CSS 管；这里只给需要临时覆盖的地方留空对象
      return {};
    }

    /** 按钮 / 筛选标签的悬停、按压与切换过渡。 */
    function styleText(tokens) {
      return `
.dc-btn {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid ${tokens.border1};
  background: transparent;
  color: ${tokens.labelSecondary};
  cursor: pointer;
  transition: background 140ms ease, border-color 140ms ease, color 140ms ease, transform 90ms ease;
}
.dc-btn:hover {
  background: ${tokens.bgLayer2};
  border-color: ${tokens.border2};
  color: ${tokens.label};
}
.dc-btn:active {
  transform: scale(0.95);
  background: ${tokens.bgOverlay};
}
.dc-btn-primary {
  background: ${tokens.bgLayer2};
  border-color: ${tokens.border2};
  color: ${tokens.label};
  font-weight: 600;
}
.dc-btn-primary:hover {
  background: ${tokens.bgOverlay};
  border-color: ${tokens.border3 || tokens.border2};
}
.dc-filter {
  min-width: 96px;
  box-sizing: border-box;
  text-align: center;
  transition: background 160ms ease, border-color 160ms ease, color 160ms ease, transform 90ms ease;
}
.dc-filter[data-active="true"],
.dc-filter-active {
  background: ${tokens.bgLayer2};
  border-color: ${tokens.border2};
  color: ${tokens.label};
  font-weight: 600;
}
`;
    }

    // ── 新建任务对话框 ──────────────────────────────────────────────────
    function CreateDialog({ tokens, onClose, onCreated }) {
      const [url, setUrl] = useState("");
      const [dir, setDir] = useState("");
      const [fileName, setFileName] = useState("");
      const [backend, setBackend] = useState("auto");
      const [busy, setBusy] = useState(false);
      const [error, setError] = useState("");
      const [torrentName, setTorrentName] = useState("");
      const [torrentData, setTorrentData] = useState("");

      const pickTorrent = (event) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;
        if (!/\.torrent$/i.test(file.name)) {
          setError("请选择 .torrent 种子文件");
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          const result = String(reader.result || "");
          const comma = result.indexOf(",");
          setTorrentData(comma >= 0 ? result.slice(comma + 1) : result);
          setTorrentName(file.name);
          setError("");
        };
        reader.onerror = () => setError("读取种子文件失败");
        reader.readAsDataURL(file);
      };

      const submit = async () => {
        if (!torrentData && !url.trim()) return;
        setBusy(true);
        setError("");
        try {
          let json;
          if (torrentData) {
            json = await api("/wb/downloads/torrent", {
              fileName: torrentName,
              dataBase64: torrentData,
              dir: dir.trim() || undefined,
            });
          } else {
            json = await api("/wb/downloads/create", {
              url: url.trim(),
              dir: dir.trim() || undefined,
              fileName: fileName.trim() || undefined,
              backend,
            });
          }
          onCreated?.(json.task);
          onClose?.();
        } catch (err) {
          setError(err.message);
        } finally {
          setBusy(false);
        }
      };

      return h(
        "div",
        {
          onClick: onClose,
          style: {
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 60,
          },
        },
        h(
          "div",
          {
            onClick: (event) => event.stopPropagation(),
            style: {
              width: 520,
              maxWidth: "92vw",
              borderRadius: 12,
              background: tokens.bgLayer1,
              border: `1px solid ${tokens.border1}`,
              padding: 20,
              boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
            },
          },
          h("div", { style: { fontSize: 15, fontWeight: 620, marginBottom: 14, color: tokens.label } }, "新建下载"),
          labelInput(tokens, "下载地址", url, setUrl, "https://… 或 magnet:?xt=urn:btih:…"),
          h(
            "div",
            { style: { marginBottom: 12 } },
            h(
              "div",
              { style: { fontSize: 12, color: tokens.labelSecondary, marginBottom: 5 } },
              "或选择 .torrent 种子文件",
            ),
            h("input", {
              type: "file",
              accept: ".torrent",
              onChange: pickTorrent,
              style: { fontSize: 12, color: tokens.labelSecondary, width: "100%" },
            }),
            torrentName
              ? h(
                  "div",
                  { style: { fontSize: 11, color: tokens.labelSecondary, marginTop: 4 } },
                  "已选择：" + torrentName,
                )
              : null,
          ),
          labelInput(tokens, "保存目录（留空 = 下载目录）", dir, setDir, ""),
          labelInput(tokens, "文件名（留空自动）", fileName, setFileName, ""),
          h(
            "div",
            { style: { display: "flex", alignItems: "center", gap: 8, marginTop: 4 } },
            h("span", { style: { fontSize: 12, color: tokens.labelSecondary } }, "后端"),
            h(
              "select",
              {
                value: backend,
                onChange: (event) => setBackend(event.target.value),
                style: {
                  fontSize: 12,
                  padding: "4px 8px",
                  borderRadius: 6,
                  border: `1px solid ${tokens.border1}`,
                  background: tokens.bgLayer2,
                  color: tokens.label,
                },
              },
              h("option", { value: "auto" }, "自动"),
              h("option", { value: "xunlei" }, "迅雷"),
              h("option", { value: "aria2" }, "aria2"),
            ),
          ),
          error && h("div", { style: { marginTop: 10, fontSize: 12, color: tokens.error } }, error),
          h(
            "div",
            { style: { display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 } },
            h("button", { onClick: onClose, className: "dc-btn" }, "取消"),
            h(
              "button",
              {
                onClick: submit,
                disabled: busy || !url.trim(),
                style: {
                  
                  background: tokens.bgLayer2,
                  borderColor: tokens.border2,
                  color: tokens.label,
                  fontWeight: 600,
                  opacity: busy || !url.trim() ? 0.5 : 1,
                },
              },
              busy ? "创建中…" : "开始下载",
            ),
          ),
        ),
      );
    }

    function labelInput(tokens, label, value, onChange, placeholder) {
      return h(
        "div",
        { style: { marginBottom: 12 } },
        h("div", { style: { fontSize: 12, color: tokens.labelSecondary, marginBottom: 5 } }, label),
        h("input", {
          value,
          placeholder,
          onChange: (event) => onChange(event.target.value),
          style: {
            width: "100%",
            boxSizing: "border-box",
            fontSize: 13,
            padding: "7px 10px",
            borderRadius: 7,
            border: `1px solid ${tokens.border1}`,
            background: tokens.bgLayer2,
            color: tokens.label,
            outline: "none",
          },
        }),
      );
    }

    // ── 会话下载记录 ────────────────────────────────────────────────────
    function HistoryTable({ tokens, records }) {
      if (!records.length) {
        return h("div", { style: { fontSize: 12, color: tokens.labelSecondary, padding: "10px 0" } },
          "还没有记录。在对话里用 fast_download 下载，或在上方新建任务后，这里会记下是哪个会话下的什么文件。");
      }
      return h(
        "div",
        { style: { borderTop: `1px solid ${tokens.border1}` } },
        h(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "88px 64px 128px minmax(0, 1fr) 88px 68px 76px",
              gap: 10,
              padding: "7px 0",
              fontSize: 11,
              color: tokens.labelSecondary,
              borderBottom: `1px solid ${tokens.border1}`,
            },
          },
          h("span", null, "时间"),
          h("span", null, "来源"),
          h("span", null, "会话"),
          h("span", null, "文件"),
          h("span", null, "大小"),
          h("span", null, "后端"),
          h("span", null, "状态"),
        ),
        ...records.slice(0, 120).map((record) =>
          h(
            "div",
            {
              key: record.id + ":" + record.createdAt,
              style: {
                display: "grid",
                gridTemplateColumns: "88px 64px 128px minmax(0, 1fr) 88px 68px 76px",
                gap: 10,
                padding: "7px 0",
                fontSize: 12,
                borderBottom: `1px solid ${tokens.border1}`,
                alignItems: "center",
              },
            },
            h("span", { style: { color: tokens.labelSecondary, fontVariantNumeric: "tabular-nums" } }, fmtTime(record.createdAt)),
            h("span", { style: { color: tokens.labelSecondary } }, SOURCE_LABEL[record.source] || record.source || "—"),
            h(
              "span",
              { title: record.sessionId || "", style: { color: tokens.labelSecondary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } },
              record.sessionTitle || (record.sessionId ? record.sessionId.slice(-8) : "—"),
            ),
            h(
              "span",
              { title: record.url, style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } },
              record.fileName,
            ),
            h("span", { style: { color: tokens.labelSecondary, fontVariantNumeric: "tabular-nums" } }, fmtBytes(record.bytes)),
            h("span", { style: { color: tokens.labelSecondary } }, BACKEND_LABEL[record.backend] || record.backend || "—"),
            h(
              "span",
              { style: { color: record.status === "error" ? tokens.error : tokens.labelSecondary } },
              STATUS_LABEL[record.status] || record.status || "—",
            ),
          ),
        ),
      );
    }

    // ── 会话头部进度条（合并自 dsh-fast-download）────────────────────────
    function DownloadStrip(props) {
      const sessionId = props && props.sessionId;
      const [running, setRunning] = useState([]);

      useEffect(() => {
        if (!sessionId) return undefined;
        let alive = true;
        const tick = async () => {
          try {
            const json = await api("/wb/downloads/list");
            if (!alive) return;
            setRunning(
              (json.tasks || []).filter(
                (task) => task.sessionId === sessionId && (task.status === "running" || task.status === "queued"),
              ),
            );
          } catch {
            /* 下载中心没响应时保持静默 */
          }
        };
        tick();
        const timer = setInterval(tick, 1500);
        return () => {
          alive = false;
          clearInterval(timer);
        };
      }, [sessionId]);

      if (running.length === 0) return null;
      const task = running[0];
      const percent = Math.max(0, Math.min(100, task.progress?.percent || 0));
      const speed = task.speedBytesPerSec ? (task.speedBytesPerSec / 1024 ** 2).toFixed(1) + " MiB/s" : "";

      return h(
        "div",
        {
          title: task.name,
          style: { display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, color: "inherit" },
        },
        h("span", { style: { opacity: 0.65 } }, "下载"),
        h(
          "div",
          {
            style: {
              width: 90,
              height: 3,
              borderRadius: 999,
              background: "rgba(120,160,255,0.2)",
              overflow: "hidden",
            },
          },
          h("div", {
            style: {
              width: percent + "%",
              height: "100%",
              borderRadius: 999,
              background: "linear-gradient(90deg,#6ea8ff,#b48cff)",
              transition: "width 300ms ease",
            },
          }),
        ),
        h(
          "span",
          null,
          `${percent}%${speed ? ` · ${speed}` : ""}${running.length > 1 ? ` · +${running.length - 1}` : ""}`,
        ),
      );
    }

    // ── 页面 ────────────────────────────────────────────────────────────
    // 外壳通过闭包提供 workbench 服务；视图组件的 props 里没有 wb。
    let wbRef = null;

    function DownloadsView() {
      const wb = wbRef;
      const tokens = wb.tokens;
      const [tasks, setTasks] = useState([]);
      const [stats, setStats] = useState({ total: 0, running: 0, done: 0, speedBytesPerSec: 0 });
      const [filter, setFilter] = useState("all");
      const [records, setRecords] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState("");
      const [showCreate, setShowCreate] = useState(false);
      const [defaultDir, setDefaultDir] = useState("");
      const timer = useRef(null);

      const load = useCallback(async () => {
        try {
          const [listJson, historyJson] = await Promise.all([
            api("/wb/downloads/list"),
            api("/wb/downloads/history"),
          ]);
          setTasks(listJson.tasks || []);
          setStats(listJson.stats || { total: 0, running: 0, done: 0, speedBytesPerSec: 0 });
          setRecords(historyJson.records || []);
          setError("");
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }, []);

      useEffect(() => {
        load();
        api("/wb/downloads/health")
          .then((json) => setDefaultDir(json.defaultDir || ""))
          .catch(() => {});
      }, [load]);

      // 轮询：有运行中任务 1s，否则 5s；页面隐藏时暂停
      useEffect(() => {
        if (timer.current) clearInterval(timer.current);
        const running = tasks.some((task) => task.status === "running");
        const interval = running ? 1000 : 5000;
        timer.current = setInterval(() => {
          if (typeof document !== "undefined" && document.hidden) return;
          load();
        }, interval);
        return () => {
          if (timer.current) clearInterval(timer.current);
          timer.current = null;
        };
      }, [tasks, load]);

      const onAction = async (action, task, kind) => {
        try {
          if (action === "remove") await api("/wb/downloads/remove", { id: task.id });
          else if (action === "opendir") await api("/wb/downloads/open", { dir: task.dir });
          else if (action === "open") await api("/wb/downloads/open", { id: task.id, kind: kind || "file" });
          else await api(`/wb/downloads/${action}`, { id: task.id });
          await load();
        } catch (err) {
          setError(err.message);
        }
      };

      const pauseAll = async () => {
        for (const task of tasks.filter((item) => item.status === "running" || item.status === "queued")) {
          try {
            await api("/wb/downloads/pause", { id: task.id });
          } catch {
            /* 单个失败继续 */
          }
        }
        load();
      };

      const resumeAll = async () => {
        for (const task of tasks.filter((item) => item.status === "paused")) {
          try {
            await api("/wb/downloads/resume", { id: task.id });
          } catch {
            /* ignore */
          }
        }
        load();
      };

      const openDir = async () => {
        try {
          await api("/wb/downloads/open", { dir: defaultDir || undefined });
        } catch (err) {
          setError(err.message);
        }
      };

      const headerBtn = (label, onClick, title) =>
        h(
          "button",
          { onClick, title, className: "dc-btn", style: { fontSize: 12, padding: "5px 10px" } },
          label,
        );

      return h(
        "div",
        {
          style: {
            height: "100%",
            width: "100%",
            maxWidth: 1100,
            boxSizing: "border-box",
            overflowY: "auto",
            overflowX: "hidden",
            padding: "24px 28px",
            margin: "0 auto",
            background: tokens.bgBase,
            color: tokens.label,
          },
        },
        h(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              marginBottom: 12,
            },
          },
          h("h2", { style: { margin: 0, fontSize: 20, fontWeight: 650, lineHeight: 1.3 } }, "下载"),
          h(
            "div",
            { style: { display: "flex", alignItems: "center", gap: 8 } },
            headerBtn("全部暂停", pauseAll),
            headerBtn("全部继续", resumeAll),
            headerBtn("刷新", load),
            headerBtn("下载目录", openDir, defaultDir || "打开任务目录"),
            h(
              "button",
              {
                onClick: () => setShowCreate(true),
                className: "dc-btn dc-btn-primary",
                style: { fontSize: 12, padding: "5px 12px" },
              },
              "新建下载",
            ),
          ),
        ),
        h(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 6,
              flexWrap: "wrap",
              fontSize: 12,
              color: tokens.labelSecondary,
              marginBottom: 14,
              fontVariantNumeric: "tabular-nums",
            },
          },
          ...[
            ["all", "全部"],
            ["running", "运行中"],
            ["done", "已完成"],
            ["error", "失败"],
            ["paused", "已暂停"],
            ["cancelled", "已取消"],
          ].map(([id, label]) => {
            const count =
              id === "all"
                ? tasks.length
                : id === "running"
                  ? tasks.filter((t) => t.status === "running" || t.status === "queued").length
                  : tasks.filter((t) => t.status === id).length;
            const active = filter === id;
            return h(
              "button",
              {
                key: id,
                onClick: () => setFilter(id),
                className: active ? "dc-btn dc-filter dc-filter-active" : "dc-btn dc-filter",
                style: { padding: "4px 10px", width: 96, flex: "0 0 auto" },
              },
              `${label} ${count}`,
            );
          }),
          h("span", { style: { marginLeft: 8, color: tokens.labelSecondary } }, "速度 " + (fmtSpeed(stats.speedBytesPerSec) || "0 B/s")),
        ),
        error && h("div", { style: { fontSize: 12, color: tokens.error, marginBottom: 10 } }, error),
        loading
          ? h("div", { style: { fontSize: 12, color: tokens.labelSecondary, padding: 20 } }, "加载中…")
          : (() => {
              const visible = tasks.filter((task) => {
                if (filter === "all") return true;
                if (filter === "running") return task.status === "running" || task.status === "queued";
                return task.status === filter;
              });
              if (visible.length === 0) {
                return h(
                  "div",
                  { style: { border: `1px solid ${tokens.border1}`, borderRadius: 10, padding: "24px 16px", fontSize: 12, color: tokens.labelSecondary, lineHeight: 1.7 } },
                  filter === "all" ? "还没有下载任务。" : "这个筛选下没有任务。",
                  h("br"),
                  filter === "all" ? "点右上角「新建下载」，或在对话里用 fast_download 发起下载。" : "",
                );
              }
              return h(
                "div",
                { style: { border: `1px solid ${tokens.border1}`, borderRadius: 10, overflow: "hidden" } },
                ...visible.map((task) => h(TaskRow, { key: task.id, task, tokens, onAction })),
              );
            })(),
        h(
          "div",
          { style: { marginTop: 22 } },
          h(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                marginBottom: 8,
              },
            },
            h("h3", { style: { margin: 0, fontSize: 14, fontWeight: 600 } }, "会话下载记录"),
            h("span", { style: { fontSize: 11, color: tokens.labelSecondary } }, "最近 120 条"),
          ),
          h(HistoryTable, { tokens, records }),
        ),
        showCreate &&
          h(CreateDialog, {
            tokens,
            onClose: () => setShowCreate(false),
            onCreated: () => load(),
          }),
      );
    }

    return {
      inject: ["slots", "workbench"],
      apply(ctx) {
        const wb = ctx.get("workbench");
        if (!wb) {
          console.warn("[download-center] workbench service missing; view not registered");
          return;
        }
        if (wb.apiVersion !== 1) {
          console.warn("[download-center] needs workbench apiVersion 1, got " + wb.apiVersion + "; upgrade @philomelcc/dsh-workbench");
          return;
        }
        wbRef = wb;
        // 悬停/按压/切换过渡统一走 CSS，避免每个按钮写一遍内联状态
        const style = document.createElement("style");
        style.dataset.plugin = "dsh-download-center";
        style.textContent = styleText(wb.tokens);
        document.head.appendChild(style);
        ctx.effect(() => () => style.remove(), "download-center: styles");
        ctx.slots.inject("conversation.session.header.actions", () =>
          ctx.slots.register(
            { name: "conversation.session.header.actions", id: "download-center-strip", order: 21 },
            DownloadStrip,
          ),
        );
        ctx.effect(
          () =>
            wb.registerView({
              id: "downloads",
              title: "下载",
              subtitle: "任务列表、磁力链接与会话下载记录",
              icon: DownloadIcon,
              component: DownloadsView,
              order: 40,
            }),
          "download-center: view",
        );
      },
    };
  },
});
