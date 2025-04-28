import process from "node:process"

import { defineConfig } from "tsdown"

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",

  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV ?? "production"),
    "process.env.DEV": JSON.stringify(process.env.NODE_ENV === "development"),
    "process.env.PROD": JSON.stringify(process.env.NODE_ENV === "production"),
    "process.env.TEST": JSON.stringify(false),
  },

  platform: "node",
  target: "node22",
  format: "esm",
  dts: true,
  fixedExtension: true,

  minify: true,
  sourcemap: true,
})
