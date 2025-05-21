import { defineConfig, tsconfigPaths } from "deves/vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: { port: 3000 },
  plugins: [reactRouter(), tsconfigPaths(), tailwindcss()],
});
