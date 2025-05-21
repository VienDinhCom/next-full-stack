import { defineConfig } from "@rslib/core";

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { globbySync } from "globby";

const commands = {
  rm: (path: string) => {
    fs.rmSync(path, { recursive: true, force: true });
  },
  exec: (command: string) => {
    spawnSync(command, { shell: true, stdio: "inherit", env: process.env });
  },
};

(function shadcn() {
  commands.rm("src/shadcn/hooks");
  commands.rm("src/shadcn/components");

  commands.exec("npx shadcn add --all");

  let index = "";

  globbySync("src/shadcn/hooks/*.ts").forEach(
    (p) => {
      const { dir, name } = path.parse(p);
      const filePath = path.join(dir.replace("src/shadcn", "."), name);

      index += `export * from "./${filePath}";\n`;
    },
  );

  index += "\n";

  globbySync("src/shadcn/components/ui/*.tsx").forEach(
    (p) => {
      const { dir, name } = path.parse(p);
      const filePath = path.join(dir.replace("src/shadcn", "."), name);

      index += `export * from "./${filePath}";\n`;
    },
  );

  fs.writeFileSync("src/shadcn/index.ts", index);
})();

// https://lib.rsbuild.dev/config/
export default defineConfig({
  lib: [
    {
      format: "esm",
      syntax: ["ES2021"],
      dts: true,
      bundle: false,
    },
  ],
  source: {},
  output: {
    target: "node",
    cleanDistPath: true,
    copy: [{
      context: "src",
      from: "**/*.css",
      globOptions: { dot: true },
    }],
  },
});
