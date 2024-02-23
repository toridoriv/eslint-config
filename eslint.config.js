import eslintConfig from "./lib/eslint/index.js";

eslintConfig.javascript.node[1]?.files?.push("bin/setup-eslint-config");

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export default [
  ...eslintConfig.ignorePatterns,
  ...eslintConfig.javascript.node,
  ...eslintConfig.jsdoc,
  ...eslintConfig.typescript,
  ...eslintConfig.json,
  ...eslintConfig.markdown,
  ...eslintConfig.prettier,
];
