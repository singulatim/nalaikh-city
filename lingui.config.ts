import { defineConfig } from "@lingui/cli"

export default defineConfig({
  sourceLocale: "mn",
  locales: ["mn", "en", "zh"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
})
