import { defineCommand } from "citty";
import { consola } from "consola";

import { npx } from "@src/utils";

export const fmt = defineCommand({
  meta: {
    name: "fmt",
    description: "Format source files",
  },
  args: {
    check: {
      type: "boolean",
      description: "Check if the source files are formatted",
    },
    files: {
      type: "positional",
      description: "Files, folders, or globs to format",
      required: false,
    },
  },
  async run({ args }) {
    try {
      const options: string[] = [];
      const files = args._;

      if (args.check) {
        options.push("--check");
      } else {
        options.push("--write");
      }

      options.push("--cache");
      options.push("--cache-location");
      options.push("'./node_modules/.cache/prettier/.prettier-cache'");

      if (files.length === 0) {
        files.push(".");
      }

      consola.start("Formatting...");

      npx(`prettier ${options.join(" ")} ${files.join(" ")}`);
    } catch (error) {
      consola.error(error);
    }
  },
});
