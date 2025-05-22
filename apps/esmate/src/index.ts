#!/usr/bin/env node

import { defineCommand, runMain } from "citty";

import { fmt } from "./commands/fmt";
import { lint } from "./commands/lint";
import { pkg } from "./utils";

const main = defineCommand({
  meta: {
    name: "esmate",
    version: pkg.version,
    description: "Uncomplicate JavaScript",
  },
  subCommands: {
    fmt,
    lint,
  },
});

runMain(main);
