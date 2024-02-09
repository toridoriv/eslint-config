// @ts-nocheck
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { get, override } = require("@homer0/prettier-plugin-jsdoc/src/fns/app");
const { loadFns } = require("@homer0/prettier-plugin-jsdoc/src/loader");
const { getPlugin } = require("@homer0/prettier-plugin-jsdoc/src/fns/getPlugin");
const { splitText } = require("@homer0/prettier-plugin-jsdoc/src/fns/splitText");

loadFns();

function customSplitText(text, length) {
  if (text.includes("@link")) {
    return text.split("\n");
  }

  return splitText(text, length);
}

override(splitText, customSplitText);

export const jsdocPlugin = get(getPlugin)();

/**
 * @typedef {import("@homer0/prettier-plugin-jsdoc/src/types.js").PJPOptions & {
 *   jsdocExperimentalFormatCommentsWithoutTags: boolean;
 * }} PJPOptions
 */

/**
 * @typedef {Partial<PJPOptions>} JsdocConfig
 */
