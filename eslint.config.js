import eslintConfig from "./lib/eslint/index.js";

eslintConfig.javascript.node[1]?.files?.push("bin/setup-eslint-config");

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export default [
  {
    ignores: [
      "DS_Store",
      "node_modules",
      "package-lock.json",
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
    ],
  },
  ...eslintConfig.javascript.node,
  ...eslintConfig.typescript,
  ...eslintConfig.jsdoc,
  ...eslintConfig.json,
  ...eslintConfig.markdown,
  ...eslintConfig.prettier,
];
