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
  external: [
    "@babel/core",
    "@babel/plugin-syntax-import-meta",
    "@babel/plugin-transform-typescript",
    "unplugin",
    "magic-string",
    "connect",
    "launch-editor-middleware",
  ],
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
