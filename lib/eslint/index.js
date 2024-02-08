import * as javascript from "./javascript.js";
import prettier from "./prettier.js";
import jsdoc from "./jsdoc.js";
import json from "./json.js";
import typescript from "./typescript.js";

/**
 * Eslint settings for different use cases.
 *
 * @module eslintConfig
 */
const eslintConfig = {
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
