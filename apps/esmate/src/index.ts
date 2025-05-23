#!/usr/bin/env node

import { defineCommand, runMain } from "citty";
import fs from "node:fs";

import { fmt } from "./commands/fmt";
import { lint } from "./commands/lint";
import { task } from "./commands/task";

export const meta = (() => {
  const pkgPath = new URL("../package.json", import.meta.url);

  return JSON.parse(fs.readFileSync(pkgPath, "utf-8")) as {
    name: string;
    version: string;
    description: string;
  };
})();

const main = defineCommand({
  meta,
  subCommands: {
    fmt,
    lint,
    task,
  },
});

runMain(main);
