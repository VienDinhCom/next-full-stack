// @ts-check
import { defineConfig } from "esmate/eslint";

export default defineConfig({
  type: "app",
  astro: true,
  react: true,
  ignores: ["src/shared/components/ui/*", "src/shared/database/migrations"],
});
