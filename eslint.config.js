import ignore from "./lib/eslint/ignore-patterns.js";
import eslintConfig from "./lib/eslint/index.js";

/**
 * @type {import("eslint").Linter.Config[]}
 */
export default [
  {
    ...ignore(
      "DS_Store",
      "node_modules",
      "package*.json",
      "coverage",
      "!bin/**",
      "!.vscode/**",
      "logs",
      "*.log",
      "npm-debug.log*",
      "tmp/",
      "*.tmp",
      "tmp.*",
      "var/tmp",
      "bin/setup-eslint-config",
    ),
  },
  ...eslintConfig.javascript.node,
  eslintConfig.typescript,
  ...eslintConfig.jsdoc,
  eslintConfig.serialization.json,
  eslintConfig.serialization.jsonc,
  eslintConfig.markup.markdown,
  eslintConfig.prettier,
];
