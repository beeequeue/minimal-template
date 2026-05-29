import antfu from "@antfu/eslint-config"

export default antfu({
	ignores: ["**/*.json"],
	markdown: false,
	stylistic: false,
	jsonc: false,
	jsx: false,
	pnpm: false,
	toml: false,
	test: { overrides: { "test/no-import-node-test": "off" } },
	typescript: {
		tsconfigPath: "tsconfig.json",
		ignoresTypeAware: ["copy.ts", "*.config.*"],

		overrides: {
			"no-console": "off",

			"import/consistent-type-specifier-style": ["error", "prefer-top-level"],
			"ts/consistent-type-imports": [
				"error",
				{ fixStyle: "inline-type-imports", disallowTypeAnnotations: false },
			],

			"antfu/no-top-level-await": "off",
			"node/prefer-global/process": "off",
			"ts/consistent-type-definitions": "off",
			"ts/no-unsafe-argument": "off",
			"ts/no-unsafe-assignment": "off",
			"ts/no-use-before-define": "off",
			"unicorn/number-literal-case": "off",
			"unused-imports/no-unused-vars": "off",
			"perfectionist/sort-imports": "off",
		},
	},
})
