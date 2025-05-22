import { spawnSync } from "node:child_process";
import process from "node:process";

export function shell(command: string): void {
  spawnSync(command, { shell: true, stdio: "inherit", env: process.env });
}

export function npx(command: string): void {
  shell(`npx --yes ${command}`);
}
