import { getParser } from "./_helpers.js";

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export default [
  {
    files: ["*.ts"],
    languageOptions: {
      parser: getParser("@typescript-eslint/parser"),
    },
  },
];
