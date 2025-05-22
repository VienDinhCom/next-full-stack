import { defineCommand, runMain } from "citty";

import { version } from "../package.json" with { type: "json" };
import { fmt } from "./commands/fmt";
import { lint } from "./commands/lint";

const main = defineCommand({
  meta: {
    name: "esmate",
    description: "Uncomplicate JavaScript",
    version,
  },
  // setup() {
  //   console.log("Setup");
  // },
  // cleanup() {
  //   console.log("Cleanup");
  // },
  subCommands: {
    fmt,
    lint,
  },
});

runMain(main);
