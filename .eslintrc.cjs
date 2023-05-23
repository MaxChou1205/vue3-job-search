/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
    "plugin:vitest-globals/recommended",
    "./.eslintrc-auto-import.json",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  env: {
    "vitest-globals/env": true,
  },
};
