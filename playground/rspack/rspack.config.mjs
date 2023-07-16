import { rspackPlugin } from "unplugin-react-inspector";

import { defineConfig } from "@rspack/cli";

const config = defineConfig({
  entry: {
    main: "./src/main.tsx",
  },
  builtins: {
    html: [
      {
        template: "./index.html",
      },
    ],
  },
  plugins: [rspackPlugin({ enabled: true })],
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
    ],
  },
  devServer: {
    open: true,
  },
});

export default config;
