import { npx } from "@src/utils";
import { defineCommand } from "citty";
import { consola } from "consola";

export const lint = defineCommand({
  meta: {
    name: "lint",
    description: "Lint JavaScript/TypeScript source code.",
  },
  args: {
    fix: {
      type: "boolean",
      description: "Fix any linting errors for rules that support it",
    },
    files: {
      type: "positional",
      description: "Files and folders to lint",
      required: false,
    },
  },
  async run(c) {
    try {
      const options: string[] = [];
      const files = c.args._;

      if (c.args.fix) {
        options.push("--fix");
      }

      options.push("--cache");
      options.push("--cache-location");
      options.push("'./node_modules/.cache/eslint/.eslint-cache'");

      if (files.length === 0) {
        files.push(".");
      }

      consola.start("Linting...");

      npx(`eslint ${options.join(" ")} ${files.join(" ")}`);
    }

    catch (error) {
      consola.error(error);
    }
  },
});
