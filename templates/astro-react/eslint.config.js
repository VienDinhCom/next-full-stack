// @ts-check
import { defineConfig } from "@esmate/eslint";

export default defineConfig({
  type: "app",
  astro: true,
  react: true,
  formatters: "prettier",
  ignores: ["src/shared/components/ui/*", "src/shared/database/migrations"],
});
