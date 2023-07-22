/* eslint-disable @typescript-eslint/no-var-requires */
// const { merge } = require("webpack-merge");
import { merge } from "webpack-merge";
// const common = require("./webpack.common.mjs");
import common from "./webpack.common.mjs";

const devConfig = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  plugins: [],
});

export default devConfig;
