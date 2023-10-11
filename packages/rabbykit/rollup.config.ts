import { defineConfig } from "rollup";
import { swc, defineRollupSwcOption } from "rollup-plugin-swc3";
import { preserveDirective } from "rollup-swc-preserve-directives";
import json from "@rollup/plugin-json";
import { dts } from "rollup-plugin-dts";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess, { scss } from "svelte-preprocess";
import replace from "@rollup/plugin-replace";

import { dependencies, peerDependencies } from "./package.json";

const production = !process.env.ROLLUP_WATCH;

const external = [
  ...Object.keys(dependencies),
  ...Object.keys(peerDependencies),
];

const input = ["./src/index.ts"];
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
      // common(),
      svelte({
        preprocess: [sveltePreprocess({ sourceMap: !production }), scss()],
        compilerOptions: {
          dev: !production,
        },
        emitCss: false,
      }),
      // resolve({
      //   browser: true,
      //   dedupe: ["svelte"],
      // }),
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
