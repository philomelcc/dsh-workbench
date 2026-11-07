const DEFAULTS = {
  enabled: true,
  dir: "",
  endpoint: "http://127.0.0.1:3080/wb/downloads/create",
};

const endpointInput = document.getElementById("endpoint");
const dirInput = document.getElementById("dir");
const enabledInput = document.getElementById("enabled");
const stateEl = document.getElementById("state");

chrome.storage.sync.get(DEFAULTS, (config) => {
  endpointInput.value = config.endpoint;
  dirInput.value = config.dir;
  enabledInput.checked = config.enabled;
});

document.getElementById("save").addEventListener("click", () => {
  const config = {
    endpoint: endpointInput.value.trim() || DEFAULTS.endpoint,
    dir: dirInput.value.trim(),
    enabled: enabledInput.checked,
  };
  chrome.storage.sync.set(config, () => {
    stateEl.textContent = "已保存：" + (config.enabled ? "接管开启" : "接管关闭");
    setTimeout(() => (stateEl.textContent = ""), 2000);
  });
});
