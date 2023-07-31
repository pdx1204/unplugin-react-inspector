/**
 * @type {import('rollup').RollupOptions}
 */

import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import swc from "@qiuqfang/rollup-plugin-swc";
import nodeResolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";

export default [
  {
    input: "./src/index.ts",
    external: [/node_modules/],
    output: [
      { file: "dist/index.cjs", format: "cjs" },
      { file: "dist/index.mjs", format: "es" },
    ],
    plugins: [swc({}), nodeResolve({ extensions: [".ts", ".js"] }), commonjs(), json()],
  },
  // fix: webpack 开发环境下需要打包问题
  {
    input: "./src/client/index.tsx",
    external: [/node_modules|react-dom|jsx-runtime/],
    output: [
      { file: "dist/client/index.cjs", format: "cjs" },
      { file: "dist/client/index.mjs", format: "es" },
    ],
    plugins: [
      postcss({
        plugins: [],
      }),
      swc({
        syntax: "typescript",
        jsc: {
          loose: false,
          // 通常不推荐启用
          target: "esnext", // 编译成哪个版本
          parser: {
            tsx: true,
          },
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
        module: {
          type: "es6",
        },
      }),
      nodeResolve({
        extensions: [".tsx", ".jsx"],
      }),
      commonjs(),
      json(),
    ],
  },
];
