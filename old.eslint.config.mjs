// import js from "@eslint/js";
// import react from "eslint-plugin-react";
// import jsxa11y from "eslint-plugin-jsx-a11y";
// import reactThree from "@react-three/eslint-plugin";
// import importPlugin from "eslint-plugin-import";
// import typeScript from "@typescript-eslint/eslint-plugin";
// import markdown from "eslint-plugin-markdown";
// import cypress from "eslint-plugin-cypress";
// import jest from "eslint-plugin-jest";
// import jestDom from "eslint-plugin-jest-dom";
// import testingLibrary from "eslint-plugin-testing-library";
// import { FlatCompat } from "@eslint/eslintrc";
// import path from "path";
// import { fileURLToPath } from "url";
// // mimic CommonJS variables -- not needed if using CommonJS
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const compat = new FlatCompat({
//   baseDirectory: __dirname, // optional; default: process.cwd()
//   resolvePluginsRelativeTo: __dirname, // optional
// });

// /**
//  * This is intended to be a basic starting point for linting in the Indie Stack.
//  * It relies on recommended configs out of the box for simplicity, but you can
//  * and should modify this configuration to best suit your team's needs.
//  */

// /** @type {import('eslint').Linter.Config} */
// export default [
//   // { root: true },
//   {
//     languageOptions: {
//       parserOptions: {
//         ecmaVersion: "latest",
//         sourceType: "module",
//         ecmaFeatures: {
//           jsx: true,
//         },
//       },
//       globals: {
//         it: "readonly",
//         expect: "readonly",
//         describe: "readonly",
//       },
//     },
//   },

//   // Base config
//   js.configs.recommended,

//   // React
//   {
//     files: ["**/*.{js,jsx,ts,tsx}"],
//     plugins: { react, jsxa11y, reactThree },
//     ...compat.extends("plugin:react/recommended"),
//     ...compat.extends("plugin:react/jsx-runtime"),
//     ...compat.extends("plugin:react-hooks/recommended"),
//     ...compat.extends("plugin:jsx-a11y/recommended"),
//     ...compat.extends("plugin:@react-three/recommended"),
//     ...compat.extends("prettier"),
//     settings: {
//       react: {
//         version: "detect",
//       },
//       formComponents: ["Form"],
//       linkComponents: [
//         { name: "Link", linkAttribute: "to" },
//         { name: "NavLink", linkAttribute: "to" },
//       ],
//     },
//     rules: {
//       "react/jsx-no-leaked-render": ["warn", { validStrategies: ["ternary"] }],
//       "react/no-unknown-property": [
//         "error",
//         {
//           ignore: [
//             "args",
//             "position",
//             "position-x",
//             "position-y",
//             "intensity",
//             "rotation-x",
//           ],
//         },
//       ],
//     },
//   },

//   // // Typescript
//   // {
//   //   files: ["**/*.{ts,tsx}"],
//   //   plugins: { typeScript, importPlugin },
//   //   parser: "@typescript-eslint/parser",
//   //   settings: {
//   //     "import/internal-regex": "^~/",
//   //     "import/resolver": {
//   //       node: {
//   //         extensions: [".ts", ".tsx"],
//   //       },
//   //       typescript: {
//   //         alwaysTryTypes: true,
//   //       },
//   //     },
//   //   },
//   //   extends: [
//   //     compat.extends("plugin:@typescript-eslint/recommended"),
//   //     compat.extends("plugin:@typescript-eslint/stylistic"),
//   //     compat.extends("plugin:import/recommended"),
//   //     compat.extends("plugin:import/typescript"),
//   //     compat.extends("prettier"),
//   //   ],
//   //   rules: {
//   //     "import/order": [
//   //       "error",
//   //       {
//   //         alphabetize: { caseInsensitive: true, order: "asc" },
//   //         groups: ["builtin", "external", "internal", "parent", "sibling"],
//   //         "newlines-between": "always",
//   //       },
//   //     ],
//   //   },
//   // },

//   // // Markdown
//   // {
//   //   files: ["**/*.md"],
//   //   plugins: { markdown },
//   //   extends: [
//   //     compat.extends("plugin:markdown/recommended"),
//   //     compat.extends("prettier"),
//   //   ],
//   // },

//   // // Jest/Vitest
//   // {
//   //   files: ["**/*.test.{js,jsx,ts,tsx}"],
//   //   plugins: { jest, jestDom, testingLibrary },
//   //   extends: [
//   //     compat.extends("plugin:jest/recommended"),
//   //     compat.extends("plugin:jest-dom/recommended"),
//   //     compat.extends("plugin:testing-library/react"),
//   //     compat.extends("prettier"),
//   //   ],
//   //   env: {
//   //     "jest/globals": true,
//   //   },
//   //   settings: {
//   //     jest: {
//   //       // we're using vitest which has a very similar API to jest
//   //       // (so the linting plugins work nicely), but it means we have to explicitly
//   //       // set the jest version.
//   //       version: 28,
//   //     },
//   //   },
//   // },

//   // // Cypress
//   // {
//   //   files: ["cypress/**/*.ts"],
//   //   plugins: { cypress },
//   //   extends: [
//   //     compat.extends("plugin:cypress/recommended"),
//   //     compat.extends("prettier"),
//   //   ],
//   // },

//   // // Node
//   // {
//   //   files: [".eslintrc.js", "mocks/**/*.js"],
//   //   env: {
//   //     node: true,
//   //   },
//   // },
// ];
