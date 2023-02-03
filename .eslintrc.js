/** @type import("eslint-define-config").ESLintConfig */
module.exports = {
  root: true,
  ignorePatterns: ["*eslintrc*"],
  extends: ["plugin:@beequeue/base", "plugin:@beequeue/typescript"],

  overrides: [
    {
      files: ["**/*.config.ts", "**/*.test.ts"],
      parserOptions: {
        project: "tsconfig.tests.json",
      },
    },
  ],
}
