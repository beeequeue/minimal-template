// @ts-expect-error: optional file
import { defineConfig } from "vitest/config"

// eslint-disable-next-line ts/no-unsafe-call
export default defineConfig({
	test: {
		testTimeout: 1500,
		experimental: { viteModuleRunner: false },
		env: { NODE_ENV: "test" },
		mockReset: true,
		restoreMocks: true,
	},
})
