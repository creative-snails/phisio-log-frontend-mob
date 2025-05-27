import js from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactNative from "eslint-plugin-react-native";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "node_modules",
      "dist",
      ".expo/*",
      "*.local",
      "logs",
      "*.log",
      "npm-debug.log*",
      "yarn-debug.log*",
      "yarn-error.log*",
      ".DS_Store",
      "*.suo",
      "*.ntvs*",
      "*.njsproj",
      "*.sln",
      "*.sw?",
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx,js}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    // Plugins registrations
    plugins: {
      "react-hooks": reactHooks,
      "react-native": reactNative,
      "jsx-a11y": jsxA11y,
      prettier: prettier,
      react: react,
      "simple-import-sort": simpleImportSort,
    },
    // Custom rule configuration
    rules: {
      // Enforce absolute imports over relative parent imports
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*", "../*/*", "../../*"],
              message: "Please use absolute paths with the @ prefix instead of relative parent paths.",
            },
          ],
        },
      ],
      // Apply React Hooks recommended rules
      ...reactHooks.configs.recommended.rules,
      // Enforce blank lines between statements
      "padding-line-between-statements": ["error", { blankLine: "always", prev: "*", next: "return" }],
      // Import sorting config
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            [
              "^react", // React-related packages first
              "^expo",
              "^@expo", // Expo packages
              "^@?\\w", // Third-party packages
              "^\\.\\.(?!/?$)", // Parent imports
              "^\\.\\./?$", // Parent folder index
              "^\\./(?=.*/)(?!/?$)", // Nested relative imports
              "^\\.(?!/?$)", // Current folder imports
              "^\\./?$", // Current folder index
            ],
          ],
        },
      ],
      // React specific rules
      "react-hooks/rules-of-hooks": ["error"],
      "react-hooks/exhaustive-deps": "off",
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
      // React Native specific rules
      "react-native/no-unused-styles": "warn",
      "react-native/no-inline-styles": "warn",
      "react-native/no-color-literals": "off",
      "react-native/no-raw-text": "off",
      // Format code with Prettier
      "prettier/prettier": "error",
    },
    // Plugin settings
    settings: {
      react: {
        version: "detect",
      },
      "react-native/style-sheet-object-names": ["StyleSheet"],
    },
  }
);
