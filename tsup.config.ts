import { defineConfig } from "tsup"

export default defineConfig({
  entryPoints: ["src/index.ts"],
  outDir: "dist",

  env: {
    NODE_ENV: process.env.NODE_ENV || "production",
    DEV: (process.env.NODE_ENV === "development") as unknown as string,
    PROD: (process.env.NODE_ENV === "production") as unknown as string,
    TEST: false as unknown as string,
  },

  target: "node16",
  format: ["cjs", "esm"],
  esbuildOptions: (options) => {
    options.supported = {
      // For better performance: https://github.com/evanw/esbuild/issues/951
      "object-rest-spread": false,
    }
  },

  sourcemap: true,
  dts: true,
  clean: true,
  minify: true,
})
