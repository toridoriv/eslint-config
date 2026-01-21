import { getParser } from "./_helpers.js";

const parser = getParser("markdown-eslint-parser");

/**
 * @type {import("eslint").Linter.Config[]}
 */
export default [
  {
    files: ["**/*.md"],
    languageOptions: {
      parser,
    },
  },
];
