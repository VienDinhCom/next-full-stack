import type { Config } from "prettier";
import type { TailwindOptions } from "./plugins/tailwind";
import { importPlugin } from "./utils";

interface Options {
  /**
   * Enable Astro support.
   *
   * https://github.com/withastro/prettier-plugin-astro
   */
  astro?: boolean;
  /**
   * Enable TailwindCSS support.
   *
   * https://github.com/tailwindlabs/prettier-plugin-tailwindcss
   */
  tailwind?: boolean | TailwindOptions;
  /**
   * Ignores files from formatting.
   *
   * So you don't have to use .prettierignore file.
   */
  ignores?: string[];
}

export function defineConfig(options?: Options, config?: Config): Config {
  const defaultConfig: Config = {
    semi: true,
    tabWidth: 2,
    useTabs: false,
    printWidth: 120,
    endOfLine: "auto",
    singleQuote: false,
    proseWrap: "always",
    trailingComma: "all",
  };

  const configs: Config[] = [config || {}];
  const plugins: Config["plugins"] = config?.plugins || [];
  const overrides: Config["overrides"] = config?.overrides || [];

  if (options?.astro) {
    plugins.push(importPlugin("astro"));
    overrides.push({
      files: "*.astro",
      options: {
        parser: "astro",
      },
    });
  }

  if (options?.tailwind) {
    const config = options.tailwind === true ? {} : options.tailwind;

    configs.push(config as Config);
    plugins.push(importPlugin("tailwind"));
  }

  // Ignores files from formatting.
  overrides.push({
    files: [
      "pnpm-lock.yaml",
      ...(options?.ignores || []),
    ],
    options: {
      requirePragma: true,
    },
  });

  return {
    ...configs.reduce((prev, curr) => ({ ...prev, ...curr }), defaultConfig),
    plugins,
    overrides,
  };
}
