import type { OptionsConfig, TypedFlatConfigItem } from "@antfu/eslint-config";
import type { Linter } from "eslint";
import antfu from "@antfu/eslint-config";
import prettier from "eslint-config-prettier";

type Options = OptionsConfig & {
  /**
   * Ignores files from formatting.
   *
   * So you don't have to use .eslintignore file.
   */
  ignores?: string[];
};

/**
 * This function is a wrapper around the `@antfu/eslint-config` package.
 * For more details, see http://npm.im/@antfu/eslint-config.
 *
 * @param options - The options for the @antfu/eslint-config.
 * @param configs - Additional ESLint configs to include.
 * @returns An array of ESLint flat config items.
 */
export function defineConfig(options: Options, ...configs: Linter.Config[]): ReturnType<typeof antfu> {
  const { formatters, ...restOptions } = options;
  const restConfigs: TypedFlatConfigItem[] = configs || [];

  if (!formatters) {
    restConfigs.push(prettier);
  }

  return antfu({
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
