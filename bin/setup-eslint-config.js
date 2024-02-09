#!/usr/bin/env node

import { createRequire } from "node:module";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import JSONC from "jsonc-simple-parser";
import vscodeSettings from "../lib/vscode/settings.js";

const require = createRequire(import.meta.url);
const libraryPackageJson = require("../package.json");
const projectPackageJson = JSON.parse(tryReadFile("./package.json"));
const rawProjectVscode = tryReadFile("./.vscode/settings.json");
const projectVscode = rawProjectVscode === "" ? {} : JSONC.parse(rawProjectVscode);
const separator = "";

createIgnoreFiles();
writeConfigFiles();
updateVscodeSettings();

/**
 * Writes the ESLint and Prettier config files for the project.
 */
function writeConfigFiles() {
  const prettier = [
    `import { prettierOptions } from "@toridoriv/eslint-config";`,
    separator,
    `export default prettierOptions;`,
  ].join("\n");
  const eslint = [
    `import { eslintConfig } from "@toridoriv/eslint-config";`,
    separator,
    `/**`,
    ` * @type {import("eslint").Linter.FlatConfig[]}`,
    ` */`,
    `export default [...eslintConfig.javascript.node];`,
  ].join("\n");

  writeFileSync("eslint.config.js", eslint, "utf-8");
  writeFileSync("prettier.config.js", prettier, "utf-8");
}

/**
 * Updates the VS Code settings by merging the project's existing settings with the
 * settings from the library.
 *
 * - Removes the eslint.useESLintClass property if present.
 * - Creates the .vscode directory if it does not exist.
 * - Writes the merged settings object to .vscode/settings.json.
 */
function updateVscodeSettings() {
  const config = mergeDeep(projectVscode, vscodeSettings);

  if ("eslint.useESLintClass" in config) {
    delete config["eslint.useESLintClass"];
  }

  if (!existsSync("./.vscode")) {
    mkdirSync("./.vscode", { recursive: true });
  }

  writeFileSync("./.vscode/settings.json", JSON.stringify(config, null, 2), "utf-8");
}

/**
 * Creates ignore files (`.gitignore`, `.eslintignore`, `.prettierignore`)
 * by merging the ignore config from the library and project package.json files.
 *
 * - The config contains titled sections with array paths.
 * - The sections are sorted alphabetically by title.
 * - The paths within each section are sorted alphabetically.
 * - The sorted sections and paths are joined into file content.
 * - The content is written to the ignore files.
 */
function createIgnoreFiles() {
  /**
   * @typedef  {Object}   Section
   * @property {string}   title
   * @property {string[]} paths
   */
  /**
   * @typedef {Record<string, Section>} Ignore
   */
  /**
   * @type {Ignore}
   */
  const config = mergeDeep(
    libraryPackageJson.config["@toridoriv"].files.ignore,
    projectPackageJson?.config?.["@toridoriv"]?.files?.ignore,
  );
  const sections = Object.values(config).sort((a, b) =>
    sortAlphabetically(a.title, b.title),
  );
  /**
   * @type {string[]}
   */
  const lines = [];

  for (const section of sections) {
    lines.push(
      `# 💬 ${section.title}`,
      ...section.paths.toSorted(sortAlphabetically),
      separator,
    );
  }

  const content = lines.join("\n");

  writeFileSync("./.gitignore", content, "utf-8");
  writeFileSync("./.prettierignore", content, "utf-8");
}

/**
 * Simple object check.
 *
 * @param   item
 * @returns {boolean}
 */
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 *
 * @param target
 * @param {Object[]} sources
 */
function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

/**
 * @param   {string} a
 * @param   {string} b
 * @returns {number}
 */
function sortAlphabetically(a, b) {
  return a.localeCompare(b);
}

/**
 * @param {string} path
 */
function tryReadFile(path) {
  try {
    return readFileSync(path, "utf-8");
  } catch {
    return "";
  }
}
