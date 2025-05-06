import htmlParser from "@html-eslint/parser";

import { getParser } from "./_helpers.js";

/**
 * @import {Linter} from "eslint"
 */

/**
 * Configuration for HTML files.
 *
 * @type {Linter.Config}
 */
export const html = {
  name: "@toridoriv/markup-html",
  files: ["**/*.html"],
  languageOptions: {
    parser: htmlParser,
  },
};

/**
 * Configuration for CSS files.
 *
 * @type {Linter.Config}
 */
export const css = {
  name: "@toridoriv/markup-css",
  files: ["**/*.css"],
  languageOptions: {
    parser: htmlParser,
  },
};

/**
 * Configuration for Markdown files.
 *
 * @type {Linter.Config}
 */
export const markdown = {
  name: "@toridoriv/markup-markdown",
  files: ["**/*.md"],
  languageOptions: {
    parser: getParser("markdown-eslint-parser", {
      name: "markdown-eslint-parser",
      version: "1.2.1",
    }),
  },
};

/**
 * Configuration for Markdown files when using Prettier through ESLint.
 *
 * @type {Linter.Config}
 */
export const markdownWithPrettier = {
  ...markdown,
  rules: {
    "prettier/prettier": ["error", { parser: "markdown" }],
  },
};
