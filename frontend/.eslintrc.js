/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["eslint:recommended", "prettier"],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
  ignorePatterns: [
    "node_modules/",
    ".next/",
    "dist/",
    "build/",
  ],
};
