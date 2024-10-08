/**
 * Base configuration for Visual Studio Code.
 *
 * @module vscodeSettings
 */
const vscodeSettings = {
  "[javascript]": {
    "editor.codeActionsOnSave": ["source.fixAll.eslint"],
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSave": true,
  },
  "[json]": {
    "editor.codeActionsOnSave": ["source.fixAll.eslint"],
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSave": true,
  },
  "[jsonc]": {
    "editor.codeActionsOnSave": ["source.fixAll.eslint"],
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSave": true,
  },
  "[markdown]": {
    "editor.codeActionsOnSave": ["source.fixAll.eslint"],
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSave": true,
  },
  "[typescript]": {
    "editor.codeActionsOnSave": ["source.fixAll.eslint"],
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSave": true,
  },
  "eslint.enable": true,
  "eslint.useFlatConfig": true,
  "eslint.format.enable": true,
  "eslint.runtime": "node",
  "eslint.validate": ["json", "jsonc", "javascript", "markdown", "typescript"],
  "javascript.suggestionActions.enabled": false,
  "typescript.disableAutomaticTypeAcquisition": true,
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "typescript.suggest.autoImports": true,
  "typescript.tsdk": "./node_modules/typescript/lib",
};

export default vscodeSettings;
