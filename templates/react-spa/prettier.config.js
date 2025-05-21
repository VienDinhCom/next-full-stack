import { defineConfig, globalIgnores } from "deves/prettier";

export default defineConfig(
  globalIgnores(["package-lock.json", "pnpm-lock.yaml"]),
);
