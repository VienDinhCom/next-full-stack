import { defineCommand, runMain } from "citty";
import { lint } from "./commands/lint";

const main = defineCommand({
  meta: {
    name: "esmate",
    version: "1.0.0",
    description: "Citty playground CLI",
  },
  // setup() {
  //   console.log("Setup");
  // },
  // cleanup() {
  //   console.log("Cleanup");
  // },
  subCommands: {
    lint,
  },
});

runMain(main);
