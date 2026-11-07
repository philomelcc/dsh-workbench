#!/usr/bin/env node
/**
 * Syntax-check every JavaScript file that ships from this repo.
 *
 * DSH loads a plugin's `index.js` / `client.js` directly, so a syntax error
 * ships as a blank page or a failed bundle. `node --check` is the cheapest
 * guard we can put in CI.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCAN_DIRS = ["packages", "template"];
const EXTENSIONS = new Set([".js", ".mjs", ".cjs"]);
const SKIP_DIRS = new Set(["node_modules", ".git", "dist", "coverage"]);

/** @returns {string[]} absolute paths of every script to check */
function collect(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) out.push(...collect(full));
    else if (EXTENSIONS.has(path.extname(entry).toLowerCase())) out.push(full);
  }
  return out;
}

const files = SCAN_DIRS.flatMap((dir) => {
  const full = path.join(ROOT, dir);
  try {
    return statSync(full).isDirectory() ? collect(full) : [];
  } catch {
    return [];
  }
});

let failed = 0;
for (const file of files) {
  try {
    execFileSync(process.execPath, ["--check", file], { stdio: "pipe" });
  } catch (error) {
    failed += 1;
    const rel = path.relative(ROOT, file);
    const detail = String(error.stderr || error.message || error).trim();
    console.error(`FAIL ${rel}\n${detail}\n`);
  }
}

if (failed > 0) {
  console.error(`${failed} file(s) failed the syntax check`);
  process.exit(1);
}
console.log(`ok - ${files.length} file(s) passed node --check`);
