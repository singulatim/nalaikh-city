import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  // Base JS recommended rules (ESLint flat config)
  js.configs.recommended,

  // Apply Next.js recommended rules so `next lint` detects the Next plugin (convert legacy config to flat format)
  {
    plugins: { "@next/next": nextPlugin },
    rules: nextPlugin.configs.recommended.rules,
  },

  // Ignore generated and build outputs
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "dist/**",
      "build/**",
      "coverage/**",
    ],
  },

  // Project-wide rules and TS/JS settings
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        // For speed/simplicity we don't require a tsconfig project here
      },
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "@next/next": nextPlugin,
    },
    rules: {
      eqeqeq: ["error", "smart"],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",
      "prefer-const": "error",

      // Prefer TS-aware unused-vars; turn off base rule for TS files via overrides below
      "no-unused-vars": "warn",
    },
  },

  // TypeScript-specific rule tweaks
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // Disable base no-undef in TS files (TypeScript handles this)
      "no-undef": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
];