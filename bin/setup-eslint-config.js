#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";

import JSONC from "jsonc-simple-parser";

import jsconfig from "../lib/vscode/jsconfig.js";
import vscodeSettings from "../lib/vscode/settings.js";

const userPath = process.env.INIT_CWD || ".";
const require = createRequire(import.meta.url);
const libraryPackageJson = require("../package.json");
const projectPackageJson = JSON.parse(tryReadFile(`${userPath}/package.json`));
const rawProjectVscode = tryReadFile(`${userPath}/.vscode/settings.json`);
const projectVscode = rawProjectVscode === "" ? {} : JSONC.parse(rawProjectVscode);
const separator = "";

if (await confirm()) {
  console.info("Creating config files...");
  createIgnoreFiles();
  writeConfigFiles();
  updateVscodeSettings();
} else {
  console.info("Skipping config files...");
}

/**
 * Writes the ESLint and Prettier config files for the project.
 */
function writeConfigFiles() {
  const prettier = [
    `import { prettierConfig } from "@toridoriv/eslint-config";`,
    separator,
    `export default prettierConfig;`,
  ].join("\n");
  const eslint = [
    `import { eslintConfig } from "@toridoriv/eslint-config";`,
    separator,
    `/**`,
    ` * @type {import("eslint").Linter.FlatConfig[]}`,
    ` */`,
    `export default [...eslintConfig.javascript.node];`,
  ].join("\n");

  writeFileSync(`${userPath}/eslint.config.js`, eslint, "utf-8");
  writeFileSync(`${userPath}/prettier.config.js`, prettier, "utf-8");
  writeFileSync(`${userPath}/jsconfig.json`, JSONC.stringify(jsconfig, null, 2), "utf-8");
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

  if (!existsSync(`${userPath}/.vscode`)) {
    mkdirSync(`${userPath}/.vscode`, { recursive: true });
  }

  writeFileSync(
    `${userPath}/.vscode/settings.json`,
    JSON.stringify(config, null, 2),
    "utf-8",
  );
}

/**
 * Creates ignore file (`.gitignore`) by merging the ignore config from the library and
 * project `package.json` files.
 *
 * - The config contains titled sections with array paths.
 * - The sections are sorted alphabetically by title.
 * - The paths within each section are sorted alphabetically.
 * - The sorted sections and paths are joined into file content.
 * - The content is written to the ignore file.
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

  writeFileSync(`${userPath}/.gitignore`, content, "utf-8");
}

/**
 * Simple object check.
 *
 * @param   {any}     item
 * @returns {boolean}
 */
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 *
 * @param {any}   target
 * @param {any[]} sources
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

async function confirm() {
  const rl = readline.createInterface({ input, output });

  const answer = await rl.question(
    "Do you want to create the initial configuration files? Y/N",
  );

  rl.close();

  return answer.toUpperCase() === "Y";
}
