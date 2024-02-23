import ignorePatterns from "./ignore-patterns.js";
import * as javascript from "./javascript.js";
import jsdoc from "./jsdoc.js";
import json from "./json.js";
import markdown from "./markdown.js";
import prettier from "./prettier.js";
import typescript from "./typescript.js";

/**
 * Eslint settings for different use cases.
 *
 * @module eslintConfig
 */
const eslintConfig = {
  /**
   * Configuration for ignore files.
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
   */
  json,
  /**
   * Configurations for Markdown files.
   */
  markdown,
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
