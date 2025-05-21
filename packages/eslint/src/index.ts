import type { OptionsConfig, TypedFlatConfigItem } from "@antfu/eslint-config";
import type { Linter } from "eslint";
import antfu from "@antfu/eslint-config";
import prettier from "eslint-config-prettier";

type Options = Omit<OptionsConfig, "formatters"> & {
  /**
   * Use external formatters to format files.
   *
   * When set to `true`, it will enable all Antfu formatters.
   *
   * When set to `prettier`, it will disable rules that conflict with Prettier.
   *
   * @default false
   */
  formatters?: OptionsConfig["formatters"] | "prettier";
  /**
   * Ignores files from formatting.
   *
   * So you don't have to use .eslintignore file.
   */
  ignores?: string[];
};

/**
 * This function is a wrapper around the `@antfu/eslint-config` package.
 * For more details, see https://github.com/antfu/eslint-config.
 *
 * @param options - The options for the Antfu config.
 * @param configs - Additional ESLint configs to include.
 * @returns An array of ESLint flat config items.
 */
export function defineConfig(options: Options, ...configs: Linter.Config[]): ReturnType<typeof antfu> {
  const { formatters: formatterOption, ...restOptions } = options;
  const restConfigs: TypedFlatConfigItem[] = configs || [];

  // Turns off all rules that are unnecessary or might conflict with Prettier.
  if (formatterOption === "prettier") {
    restConfigs.push(prettier);
  }

  const formatters: OptionsConfig["formatters"] = formatterOption === "prettier" ? undefined : formatterOption;

  return antfu({
    formatters,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
    ...restOptions,
  }, {
    rules: {
      "no-console": ["warn"],
      "node/no-process-env": ["error"],
      "antfu/no-top-level-await": ["off"],
      "perfectionist/sort-imports": [
        "error",
        {
          tsconfigRootDir: ".",
        },
      ],
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
          ignore: ["README.md"],
        },
      ],
    },
  }, ...restConfigs);
}

// https://github.com/w3cj/hono-open-api-starter/tree/main
