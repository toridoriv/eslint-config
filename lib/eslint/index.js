import ignorePatterns from "./ignore-patterns.js";
import * as javascript from "./javascript.js";
import jsdoc from "./jsdoc.js";
import json from "./json.js";
import markdown from "./markdown.js";
import * as markup from "./markup.js";
import prettier from "./prettier.js";
import * as serialization from "./serialization.js";
import typescript from "./typescript.js";

/**
 * Eslint settings for different use cases.
 *
 * @module eslintConfig
 */
const eslintConfig = {
  /**
   * Function to create a configuration object with ignore patterns.
   */
  ignorePatterns,
  /**
   * Configurations for JavaScript in different environments.
   */
  javascript,
  /**
   * Configurations for JSDoc rules.
   */
  jsdoc,
  /**
   * Configurations for JSON and JSONC files.
   *
   * @deprecated Use `serialization.json` and `serialization.jsonc` instead.
   */
  json,
  /**
   * Configurations for Markdown files.
   *
   * @deprecated Use `markup.markdown` instead.
   */
  markdown,
  /**
   * Configurations for HTML, CSS, Markdown, and other markup files.
   */
  markup,
  /**
   * Configurations for data serialization formats.
   */
  serialization,
  /**
   * Configurations to use Prettier through Eslint.
   *
   * **IMPORTANT**: It must be added at the end of all the other configs.
   */
  prettier,
  /**
   * Configurations for TypeScript files.
   */
  typescript,
};

export default eslintConfig;
