import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { vitePlugin as reactInspectorPlugin } from "unplugin-react-inspector";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactInspectorPlugin({ enabled: true })],
});
