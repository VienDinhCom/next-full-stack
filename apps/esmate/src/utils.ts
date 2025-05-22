import { spawnSync } from "node:child_process";
import fs from "node:fs";
import process from "node:process";

export function shell(command: string): void {
  const { env } = process;

  spawnSync(command, { shell: true, stdio: "inherit", env });
}

export function npx(command: string): void {
  shell(`npx --yes ${command}`);
}

export const pkg = (() => {
  const pkgPath = new URL("../package.json", import.meta.url);

  return JSON.parse(fs.readFileSync(pkgPath, "utf-8")) as {
    name: string;
    version: string;
    description: string;
  };
})();
