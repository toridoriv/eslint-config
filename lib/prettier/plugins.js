import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { get, override } = require("@toridoriv/prettier-plugin-jsdoc/src/fns/app.js");
const { loadFns } = require("@toridoriv/prettier-plugin-jsdoc/src/loader.js");
const { getPlugin } = require("@toridoriv/prettier-plugin-jsdoc/src/fns/getPlugin.js");
const { splitText } = require("@toridoriv/prettier-plugin-jsdoc/src/fns/splitText.js");

loadFns();

/**
 * @param {string} text
 * @param {number} length
 * @returns {string[]}
 */
function customSplitText(text, length) {
  if (text.includes("@link")) {
    return text.split("\n");
  }

  return splitText(text, length);
}

override(splitText, customSplitText);

export const jsdocPlugin = get(getPlugin)();

/**
 * @typedef {import("@toridoriv/prettier-plugin-jsdoc/src/types.js").PJPOptions & {
 *   jsdocExperimentalFormatCommentsWithoutTags: boolean;
 * }} PJPOptions
 */

/**
 * @typedef {Partial<PJPOptions>} JsdocConfig
 */
