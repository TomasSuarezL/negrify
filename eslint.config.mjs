import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";
import reactThree from "@react-three/eslint-plugin";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    ignores: ["build/*", "public/*"],
  },
  {
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    plugins: {
      reactThree,
    },
    rules: {
      "react/jsx-no-leaked-render": ["warn", { validStrategies: ["ternary"] }],
      "react/no-unknown-property": [
        "error",
        {
          ignore: [
            "args",
            "position",
            "position-x",
            "position-y",
            "intensity",
            "rotation-x",
          ],
        },
      ],
    },
  },
  { plugins: { "jsx-a11y": jsxA11y } },
  {
    files: [".eslintrc.js", "mocks/**/*.js"],
    languageOptions: { globals: { ...globals.node } },
  },
];
