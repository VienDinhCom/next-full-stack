import fs from "node:fs";
import { globbySync } from "globby";
import { spawnSync } from "node:child_process";

const commands = {
  clean: (patterns: string | readonly string[]) => {
    globbySync(patterns).forEach((p) => fs.rmSync(p));
  },
  exec: (command: string) => {
    spawnSync(command, { shell: true, stdio: "inherit", env: process.env });
  },
};

commands.clean("src/ui/**");
commands.clean("src/components/**");
commands.clean(["src/hooks/**", "!src/hooks/use-zod-form.ts"]);

commands.exec("npx shadcn add --all");
