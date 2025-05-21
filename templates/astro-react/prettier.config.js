// @ts-check
import { defineConfig } from "@esmate/prettier";

export default defineConfig({
  astro: true,
  tailwind: {
    tailwindStylesheet: "src/shared/styles/global.css",
  },
  ignores: [],
});
