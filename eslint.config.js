import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    "env": {
        "browser": true,
        "es2022": true,
        "node": true,
        "jest": true,
        "mocha": true
    },
    "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "standard-with-typescript", "prettier"],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "globals": {
        "SELECT": true,
        "INSERT": true,
        "UPSERT": true,
        "UPDATE": true,
        "DELETE": true,
        "CREATE": true,
        "DROP": true,
        "CDL": true,
        "CQL": true,
        "CXL": true,
        "cds": true
    },
    "rules": {
    }
}
]);
