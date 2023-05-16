import { UnpluginFactoryOutput, VitePlugin } from "unplugin";
import unplugin from "./core/unplugin";
import { UserOptions } from "./types";

export const vitePlugin = unplugin.vite as UnpluginFactoryOutput<UserOptions, VitePlugin>;
export const rspackPlugin = unplugin.rspack as UnpluginFactoryOutput<UserOptions, unknown>;
export const webpackPlugin = unplugin.webpack as UnpluginFactoryOutput<UserOptions, unknown>;
// export const rollupPlugin = unplugin.rollup as unknown;
// export const esbuildPlugin = unplugin.esbuild as unknown;
