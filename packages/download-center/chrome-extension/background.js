/**
 * DSH 下载接管：Chrome 的每个新下载都会被取消，并转发到工作台下载中心。
 *
 * 端点是可配置的（默认 http://127.0.0.1:3080/wb/downloads/create），
 * 只拦 http(s) 链接；blob:/data: 和本地回环地址放行给 Chrome 自己。
 */
const DEFAULTS = {
  enabled: true,
  dir: "",
  endpoint: "http://127.0.0.1:3080/wb/downloads/create",
};

function readConfig() {
  return new Promise((resolve) => chrome.storage.sync.get(DEFAULTS, resolve));
}

function badge(text, color) {
  chrome.action.setBadgeText({ text });
  if (color) chrome.action.setBadgeBackgroundColor({ color });
  if (text) setTimeout(() => chrome.action.setBadgeText({ text: "" }), 2500);
}

async function forward(item, config) {
  try {
    const response = await fetch(config.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: item.url,
        fileName: item.filename || undefined,
        dir: config.dir || undefined,
        source: "chrome",
      }),
    });
    const json = await response.json().catch(() => ({ ok: false, error: `HTTP ${response.status}` }));
    if (!json.ok) throw new Error(json.error || "下载中心拒绝了请求");
    badge("✓", "#22a06b");
  } catch (error) {
    console.error("[dsh-download] forward failed:", error);
    badge("!", "#d1453b");
  }
}

chrome.downloads.onCreated.addListener(async (item) => {
  const config = await readConfig();
  if (!config.enabled) return;
  const url = item.url || "";
  if (!/^https?:/i.test(url)) return;
  if (/^https?:\/\/(127\.0\.0\.1|localhost)/i.test(url)) return;

  chrome.downloads.cancel(item.id, () => {
    chrome.downloads.erase({ id: item.id });
    forward(item, config);
  });
});
