import { defineConfig, node, prettier, react } from "deves/eslint";

export default defineConfig(
  node(),
  react(),
  prettier({ tailwindFunctions: ["cn"] }),
  // globalIgnores(["./example.ts"]),
);
