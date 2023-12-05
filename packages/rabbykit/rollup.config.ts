import { defineConfig } from "rollup";
import { swc, defineRollupSwcOption } from "rollup-plugin-swc3";
import { preserveDirective } from "rollup-swc-preserve-directives";
import json from "@rollup/plugin-json";
import { dts } from "rollup-plugin-dts";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess, { scss } from "svelte-preprocess";
import replace from "@rollup/plugin-replace";
import crypto from "crypto";

//@ts-ignore
import svgo from "rollup-plugin-svgo";

import { dependencies, peerDependencies } from "./package.json";

const production = !process.env.ROLLUP_WATCH;

const external = [
  ...Object.keys(dependencies),
  ...Object.keys(peerDependencies),
];

const input = ["./src/index.ts", "./src/index.react.tsx"];
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
      svgo({
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeViewBox: false,
                cleanupIDs: {
                  prefix: {
                    toString() {
                      return crypto.randomBytes(6).toString("hex").slice(0, 4);
                    },
                  },
                },
              },
            },
          },
          {
            name: "cleanupNumericValues",
            params: {
              overrides: {
                floatPrecision: 6,
              },
            },
          },
          "removeDimensions",
          {
            name: "addAttributesToSVGElement",
            params: {
              attributes: [
                {
                  width: "100%",
                },
                {
                  height: "100%",
                },
              ],
            },
          },
        ],
      }),
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
            minify: production
              ? {
                  compress: {
                    passes: 2,
                    const_to_let: false,
                  },
                  mangle: {},
                  module: true,
                }
              : undefined,
          },
          minify: production,
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
      entryFileNames: (e) => {
        return `${e.name.replace("src/", "")}.d.ts`;
      },
    },
    plugins: [dts()],
  },
]);
