import { defineConfig } from "rollup";
import { swc, defineRollupSwcOption } from "rollup-plugin-swc3";
import { preserveDirective } from "rollup-swc-preserve-directives";
import dynamicImportVars from "@rollup/plugin-dynamic-import-vars";
import json from "@rollup/plugin-json";
import { dts } from "rollup-plugin-dts";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import common from "@rollup/plugin-commonjs";

//@ts-ignore
const production = !process.env.ROLLUP_WATCH;

const external = ["svelte", "@wagmi/core", "viem", "wagmi"];

const input = [
  "./src/index.ts",
  // "./src/store/index.ts",
];
export default defineConfig([
  {
    input,
    external,
    output: {
      dir: "dist",
      format: "esm",
      sourcemap: true,
    },
    plugins: [
      json(),
      replace({
        "process.env.NODE_ENV": JSON.stringify(production),
        preventAssignment: true,
      }),
      common(),
      svelte({
        preprocess: sveltePreprocess({ sourceMap: !production }),
        compilerOptions: {
          dev: !production,
        },
        emitCss: false,
      }),
      resolve({
        browser: true,
        dedupe: ["svelte"],
      }),
      swc(
        defineRollupSwcOption({
          sourceMaps: true,
          jsc: {
            externalHelpers: true,
          },
        })
      ),
      preserveDirective(),

      // dynamicImportVars({
      //   include: ["./src/locales/**/*.json"],
      // }),
    ],
  },
  {
    input,
    external,
    output: {
      format: "esm",
      dir: "dist",
    },
    plugins: [dts()],
  },
]);
