import { i18n as linguiI18n } from "@lingui/core"
import { I18nProvider } from "@lingui/react"
import { translations, Language } from "./translations"

// Re-export provider for convenience in layout
export { I18nProvider }

// Prepare catalogs from the existing translations.ts
// Lingui expects catalogs in the form: { [messageId]: "translated string" }
const catalogs: Record<Language, Record<string, string>> = {
  mn: translations.mn,
  en: translations.en,
  zh: translations.zh,
}

// Load all catalogs once
for (const locale of Object.keys(catalogs) as Language[]) {
  linguiI18n.load(locale, catalogs[locale])
}

// Set a safe default locale early to avoid empty texts on first render
if (!linguiI18n.locale) {
  linguiI18n.activate("mn")
}

export function activateLocale(locale: Language) {
  linguiI18n.activate(locale)
}

// Adapter: return the catalog for the requested (or active) locale without relying on async activation timing
export function getT(locale?: Language): Record<string, string> {
  const resolved: Language = locale || (linguiI18n.locale as Language) || "mn"
  // Return a shallow copy to avoid accidental mutations
  return { ...(catalogs[resolved] || {}) }
}

export const i18n = linguiI18n
