// @ts-check
const { defineConfig } = require("eslint-define-config")

module.exports = defineConfig({
  root: true,
  ignorePatterns: ["*eslintrc*"],
  extends: ["plugin:@beequeue/base", "plugin:@beequeue/typescript"],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
  },
})
