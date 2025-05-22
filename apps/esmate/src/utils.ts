import { spawnSync } from "node:child_process";
import process from "node:process";

export function shell(command: string): void {
  const { env } = process;

  spawnSync(command, { shell: true, stdio: "inherit", env });
}

export function npx(command: string): void {
  shell(`npx --yes ${command}`);
}
