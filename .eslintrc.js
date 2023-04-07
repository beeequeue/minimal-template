/** @type import("eslint-define-config").ESLintConfig */
module.exports = {
  root: true,
  ignorePatterns: ["*eslintrc*", "copy.ts"],
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
