import type { Config } from "prettier";
import makeSynchronized from "make-synchronized";
import { resolveConfig, resolveConfigFile } from "prettier";

export const defaultConfig: Config = {
  semi: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 120,
  endOfLine: "auto",
  singleQuote: false,
  proseWrap: "always",
  trailingComma: "all",
};

export default makeSynchronized(import.meta, async (): Promise<Config> => {
  const configFile = await resolveConfigFile();

  if (configFile) {
    const userConfig = await resolveConfig(configFile);

    return { ...defaultConfig, ...userConfig };
  }

  return defaultConfig;
});
