import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { vitePlugin } from "../../dist/index.mjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePlugin()],
});
