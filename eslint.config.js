import eslintConfig from "./lib/eslint/index.js";

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export default [
  ...eslintConfig.javascript.node,
  ...eslintConfig.jsdoc,
  ...eslintConfig.typescript,
  ...eslintConfig.json,
  ...eslintConfig.markdown,
  ...eslintConfig.prettier,
];
