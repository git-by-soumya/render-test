import globals from "globals";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js",],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.node, },
      ecmaVersion: "latest",
    },
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@stylistic/arrow-parens": ["error", "as-needed",],
      "@stylistic/arrow-spacing": ["error", { before: true, after: true, },],
      "@stylistic/brace-style": ["error", "1tbs",],
      "@stylistic/comma-dangle": [
        "error",
        {
          "functions": "never",
          "objects": "always",
          "arrays": "always",
        },
      ],
      "@stylistic/comma-spacing": [
        "error",
        {
          "before": false,
          "after": true,
        },
      ],
      "@stylistic/dot-location": ["error", "property",],
      "@stylistic/implicit-arrow-linebreak": ["error", "beside",],
      "@stylistic/indent": ["error", 2,],
      "@stylistic/key-spacing": "error",
      "@stylistic/keyword-spacing": [
        "error", 
        { 
          "overrides": {
            "if": { "after": false, }, 
            "for": { "after": false, }, 
            "while": { "after": false, }, 
          },
        },
      ],
      "@stylistic/linebreak-style": ["error", "unix",],
      "@stylistic/no-mixed-spaces-and-tabs": "error",
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/object-curly-spacing": ["error", "always",],
      "@stylistic/quotes": ["error", "double",],
      "@stylistic/semi": ["error", "always",],
      "@stylistic/space-before-blocks": [
        "error", 
        { 
          "functions": "always", 
          "keywords": "always", 
        },
      ],
      camelcase: "error",
      eqeqeq: "error",
      "no-console": "off",
    },
  },
  {
    ignores: ["dist/**",],
  },
];