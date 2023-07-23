/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const { webpackPlugin } = require("unplugin-react-inspector");

const devConfig = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  plugins: [webpackPlugin({ enabled: true, injectClientEntryFile: "src/main.tsx" })],
});

module.exports = devConfig;
