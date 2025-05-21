import type { Config } from "prettier";
import type { TailwindOptions } from "./plugins/tailwind";
import { defaultConfig } from "./config.js";

interface Options {
  tailwind?: boolean | TailwindOptions;
  ignores?: string[];
}

export function defineConfig(options?: Options, config?: Config): Config {
  const plugins: Config["plugins"] = [];
  const configs: Config[] = [];

  if (config) {
    configs.push(config || {});
    plugins.push(...(config.plugins || []));
  }

  if (options?.tailwind) {
    const config = options.tailwind === true ? {} : options.tailwind;

    configs.push(config as Config);
    plugins.push("@esmate/prettier/plugins/tailwind");
  }

  if (options?.ignores) {
    const config: Config = {
      overrides: [
        {
          files: options?.ignores,
          options: { requirePragma: true },
        },
      ],
    };

    configs.push(config);
  }

  return {
    ...configs.reduce((prev, curr) => ({ ...prev, ...curr }), defaultConfig),
    plugins,
  };
}
