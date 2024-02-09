/**
 * Base configuration for Visual Studio Code.
 *
 * @module vscodeSettings
 */
const vscodeSettings = {
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  },
  "[json]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  },
  "[jsonc]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  },
  "[typescript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  },
  "editor.codeActionsOnSave": ["source.fixAll.eslint"],
  "editor.formatOnSave": true,
  "eslint.enable": true,
  "eslint.experimental.useFlatConfig": true,
  "eslint.format.enable": true,
  "eslint.runtime": "node",
  "eslint.validate": ["json", "jsonc", "javascript", "typescript"],
  "typescript.disableAutomaticTypeAcquisition": true,
};

export default vscodeSettings;
