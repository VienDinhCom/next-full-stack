import { defineConfig } from "@esmate/eslint";

// https://github.com/antfu/eslint-config
export default defineConfig({
  type: "app",
  astro: true,
  react: true,
  rules: {
    "no-console": ["warn"],
    "antfu/no-top-level-await": ["off"],
    "node/prefer-global/process": ["off"],
    "node/no-process-env": ["error"],
    "perfectionist/sort-imports": ["error", {
      tsconfigRootDir: ".",
    }],
    "unicorn/filename-case": ["error", {
      case: "kebabCase",
      ignore: ["README.md"],
    }],
  },
  ignores: [
    "src/shared/components/ui/*",
    "src/shared/lib/database/migrations/*",
  ],
});
