import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      reportsDirectory: "node_modules/.coverage",
    },
  },
})
