import { getParser } from "./_helpers.js";

/**
 * @type {import("eslint").Linter.Config[]}
 */
export default [
  {
    files: ["**/*.md"],
    languageOptions: {
      parser: getParser("markdown-eslint-parser", {
        name: "markdown-eslint-parser",
        version: "1.2.1",
      }),
    },
  },
];
