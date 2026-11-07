import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const clientPath = path.join(here, "..", "client.js");

let entry = null;
globalThis.window = {
  __ModuleLoader__: {
    load(value) {
      entry = value;
    },
  },
};
// client 在 apply 里注入 <style>，Node 下给 document 一个最小替身
globalThis.document = {
  createElement: () => ({ dataset: {}, textContent: "", remove() {} }),
  head: { appendChild() {} },
};

const code = readFileSync(clientPath, "utf8");
new Function("window", code)(globalThis.window);
assert.ok(entry, "client registered through __ModuleLoader__");
assert.equal(entry.id, "@local/dsh-download-center");

const React = {
  createElement: (...args) => ({ type: "el", args }),
  useState: (initial) => [initial, () => {}],
  useEffect: () => {},
  useRef: () => ({ current: null }),
  useCallback: (fn) => fn,
};
const mod = entry.factory((name) => {
  if (name === "react") return React;
  throw new Error(`unexpected require: ${name}`);
});

assert.deepEqual(mod.inject.sort(), ["slots", "workbench"]);

let view = null;
const tokens = {
  success: "#0a0",
  error: "#d00",
  warn: "#c90",
  idle: "#888",
  brand: "#36c",
  bgBase: "#111",
  bgLayer1: "#222",
  bgLayer2: "#333",
  bgOverlay: "#000",
  border1: "#444",
  border2: "#555",
  label: "#fff",
  labelSecondary: "#aaa",
};
const ctx = {
  get(name) {
    if (name !== "workbench") return undefined;
    return {
      tokens,
      registerView(options) {
        view = options;
        return () => {};
      },
      refresh() {},
    };
  },
  effect(fn) {
    fn();
    return () => {};
  },
  slots: {
    inject(_owner, callback) {
      callback();
    },
    register() {
      return () => {};
    },
  },
};
mod.apply(ctx);

assert.ok(view, "registerView was called");
assert.equal(view.id, "downloads");
assert.equal(view.title, "下载");
assert.equal(typeof view.component, "function");

console.log("client.js ok: registration, view id, component, header strip");
