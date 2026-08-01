import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(
  await (await import("node:fs/promises")).readFile(
    path.join(root, "manifest.json"),
    "utf8",
  ),
);
const stage = path.join(root, ".package", "vox-image-runner");
const outputDir = path.join(root, "dist");
const output = path.join(outputDir, `vox-image-runner-${manifest.version}.zip`);
const include = [
  "manifest.json",
  "background.js",
  "config",
  "content",
  "sidepanel",
  "src",
  "assets/icons",
];

rmSync(stage, { recursive: true, force: true });
rmSync(output, { force: true });
mkdirSync(stage, { recursive: true });
mkdirSync(outputDir, { recursive: true });

for (const entry of include) {
  const source = path.join(root, entry);
  if (!existsSync(source)) throw new Error(`Missing package file: ${entry}`);
  cpSync(source, path.join(stage, entry), { recursive: true });
}

execFileSync("zip", ["-qr", output, "."], { cwd: stage, stdio: "inherit" });
rmSync(path.join(root, ".package"), { recursive: true, force: true });
console.log(`Created ${output}`);
