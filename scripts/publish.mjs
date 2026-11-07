#!/usr/bin/env node
/**
 * Pre-flight checks for an npm release, then (optionally) publish.
 *
 *   node scripts/publish.mjs           # check only
 *   node scripts/publish.mjs --publish # check, then publish every package
 *
 * The workspace pins the public registry in each package's `publishConfig`, so a
 * local mirror in ~/.npmrc cannot silently swallow a publish.
 */
import { execSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EXPECTED_REGISTRY = "https://registry.npmjs.org/";
const publish = process.argv.includes("--publish");

function packages() {
  const dir = path.join(ROOT, "packages");
  return readdirSync(dir)
    .filter((name) => statSync(path.join(dir, name)).isDirectory())
    .map((name) => {
      const file = path.join(dir, name, "package.json");
      return { dir: name, manifest: JSON.parse(readFileSync(file, "utf8")) };
    });
}

const rows = packages();
const problems = [];

for (const { dir, manifest } of rows) {
  const config = manifest.publishConfig ?? {};
  if (config.registry !== EXPECTED_REGISTRY) {
    problems.push(`${manifest.name}: publishConfig.registry must be ${EXPECTED_REGISTRY}`);
  }
  if (config.access !== "public") {
    problems.push(`${manifest.name}: publishConfig.access must be "public" (scoped packages default to private)`);
  }
  if (manifest.private === true) {
    problems.push(`${manifest.name}: still marked private`);
  }
  if (!manifest.version) problems.push(`${manifest.name}: missing version`);
}

console.log(`packages (${rows.length}):`);
for (const { manifest } of rows) {
  console.log(`  ${manifest.name}@${manifest.version}`);
}

// verify the npm session against the registry the packages actually use
let whoami = "";
try {
  whoami = execSync(`npm whoami --registry=${EXPECTED_REGISTRY}`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
} catch (error) {
  const detail = String(error.stderr || error.message || "").trim().split("\n")[0];
  problems.push(`npm is not logged in for registry.npmjs.org (run \`npm login\`)${detail ? ` — ${detail}` : ""}`);
}

if (problems.length > 0) {
  console.error("\npre-flight failed:");
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log(`\nnpm user: ${whoami}`);
console.log("pre-flight ok");

if (!publish) {
  console.log("\nrun `node scripts/publish.mjs --publish` to publish");
  process.exit(0);
}

execSync("pnpm -r publish --access public --no-git-checks", {
  cwd: ROOT,
  stdio: "inherit",
});
