import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactNative from "eslint-plugin-react-native";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:jsx-a11y/recommended",
      "plugin:prettier/recommended",
      "plugin:react-native/all"
    )
  ),
  {
    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      react: fixupPluginRules(react),
      "react-hooks": fixupPluginRules(reactHooks),
      "react-native": fixupPluginRules(reactNative),
      "jsx-a11y": fixupPluginRules(jsxA11Y),
      prettier: fixupPluginRules(prettier),
      "simple-import-sort": fixupPluginRules(simpleImportSort),
    },

    languageOptions: {
      globals: {
        ...Object.fromEntries(
          Object.entries({
            ...globals.browser,
            ...globals.node,
            ...reactNative.environments["react-native"]["react-native"],
          }).map(([key, value]) => [key.trim(), value])
        ),
      },
      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",
      "react-native/no-raw-text": "off",
      "padding-line-between-statements": ["error", { blankLine: "always", prev: "*", next: "return" }],
      "react-native/no-inline-styles": "warn",
      "react-native/no-color-literals": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/rules-of-hooks": ["error"],
      "react/jsx-key": ["error"],
      "react/jsx-tag-spacing": [
        "error",
        {
          closingSlash: "never",
          beforeSelfClosing: "always",
          afterOpening: "never",
          beforeClosing: "allow",
        },
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            [
              "^react", // React-related packages first
              "^@?\\w", // Third-party packages
              "^\\.\\.(?!/?$)", // Parent imports
              "^\\.\\./?$",
              "^\\./(?=.*/)(?!/?$)", // Relative imports with nested paths
              "^\\.(?!/?$)",
              "^\\./?$", // Relative imports
            ],
          ],
        },
      ],
    },
  },
];
