module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.app.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["react-refresh", "@typescript-eslint", "react"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "react/react-in-jsx-scope": "off",
    "react/no-unknown-property": [
      "error",
      {
        ignore: ["intensity", "position", "args"],
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
