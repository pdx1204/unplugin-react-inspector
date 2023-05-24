/**
 * @type {import('rollup').RollupOptions}
 */

import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import del from "rollup-plugin-delete";
import swc from "@qiuqfang/rollup-plugin-swc";
import nodeResolve from "@rollup/plugin-node-resolve";

export default {
  input: "./src/index.ts",
  external: [/node_modules/],
  output: [
    { file: "dist/index.cjs", format: "cjs" },
    { file: "dist/index.mjs", format: "es" },
  ],

  plugins: [
    swc(),
    nodeResolve({ extensions: [".ts", ".js"] }),
    commonjs(),
    json(),
    del({ targets: "dist/*" }),
  ],
};
