import { Linter } from "eslint";
import typescriptParser from "@typescript-eslint/parser";
import pluginReactRecommended from "eslint-plugin-react/configs/recommended.js";
import pluginTypescriptRecommended from "@typescript-eslint/eslint-plugin/dist/configs/recommended.js";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals.js";
import prettier from "eslint-config-prettier";
import pluginImport from "eslint-plugin-import";

export default [
  {
    files: ["**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptParser,
      parserOptions: {
        project: ["tsconfig.json"],
      },
      globals: {
        browser: true,
        es2021: true,
        node: true,
      },
    },
    plugins: {
      import: pluginImport,
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],
    },
    settings: {
      ...pluginReactRecommended,
      ...pluginTypescriptRecommended,
      ...nextCoreWebVitals,
      ...prettier,
    },
  },
];
