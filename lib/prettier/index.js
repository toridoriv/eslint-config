import { jsdocPlugin } from "./plugins.js";

/**
 * Configuration file for Prettier.
 *
 * @type {PrettierConfig}
 * @module prettierConfig
 */
export const prettierConfig = {
  bracketSameLine: true,
  endOfLine: "lf",
  printWidth: 90,
  proseWrap: "always",
  quoteProps: "consistent",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
  parser: "babel-ts",
  plugins: [jsdocPlugin],
  overrides: [
    {
      files: ["*.json"],
      options: {
        parser: "json",
      },
    },
    {
      files: ["*.jsonc", "jsconfig.json"],
      options: {
        parser: "jsonc",
      },
    },
    {
      files: ["*.md"],
      options: {
        parser: "markdown",
        proseWrap: "preserve",
      },
    },
    {
      files: ["*.css"],
      options: {
        parser: "css",
        semi: true,
        singleQuote: false,
        plugins: ["prettier-plugin-css-order"],
        cssDeclarationSorterOrder: "alphabetical",
      },
    },
    {
      files: ["*.html"],
      options: {
        parser: "html",
        printWidth: 550,
        tabWidth: 2,
        bracketSameLine: true,
        proseWrap: "never",
        htmlWhitespaceSensitivity: "ignore",
        singleAttributePerLine: false,
        jsxBracketSameLine: true,
      },
    },
  ],
  jsdocSortTags: false,
  jsdocAllowAccessTag: false,
  jsdocEnsureDescriptionsAreSentences: true,
  jsdocExperimentalFormatCommentsWithoutTags: true,
  jsdocFormatComplexTypesWithPrettier: true,
  jsdocPluginEnabled: true,
  jsdocPluginExtended: true,
  jsdocReplaceTagsSynonyms: false,
  jsdocUseColumns: true,
  jsdocConsistentColumns: false,
  jsdocGroupColumnsByTag: true,
  jsdocMinSpacesBetweenNameAndDescription: 1,
  jsdocUseSingleQuotesForStringLiterals: false,
  jsdocUseShortArrays: false,
  jsdocFormatExamples: false,
  jsdocUseTypeScriptTypesCasing: false,
  jsdocFormatDotForArraysAndObjects: false,
};

export default prettierConfig;

/**
 * @typedef {PrettierBaseConfig &
 *   JsdocConfig & { overrides: Pick<PrettierBaseConfig, "overrides"> }} PrettierConfig
 */

/**
 * @typedef {import("prettier").Config} PrettierBaseConfig
 */

/**
 * @typedef {import("./plugins.js").JsdocConfig} JsdocConfig
 */
