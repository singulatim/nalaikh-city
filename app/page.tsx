"use client"

import {useState, useEffect} from "react"
import {Language} from "@/lib/translations"
import {I18nProvider, i18n, activateLocale, getT} from "@/lib/i18n"
import HeroSection from "@/components/sections/hero"
import ProjectDetailSection from "@/components/sections/project-detail"
import ProjectOutcomesSection from "@/components/sections/project-outcomes"
import HousingStatisticSection from "@/components/sections/housing-statistics"
import FinancingSolutionsSection from "@/components/sections/financing-solutions"
import ImplementationTimelineSection from "@/components/sections/implementation-timeline"
import ContactSection from "@/components/sections/contact"
import Footer from "@/components/sections/footer"
import {Theme} from "@/lib/_types"
import Header from "@/components/sections/header";

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("mn")
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  useEffect(() => {
    activateLocale(language)
  }, [language])

  const t = getT(language)

  return (
    <I18nProvider i18n={i18n}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header t={t} language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme}/>

        {/* Hero Section */}
        <HeroSection t={t}/>

        {/* Green Nalaikh Components */}
        <ProjectDetailSection t={t}/>

        {/* Project Outcomes */}
        <ProjectOutcomesSection t={t}/>

        {/* Housing Statistics */}
        <HousingStatisticSection t={t}/>

        {/* Financing Solutions */}
        <FinancingSolutionsSection t={t}/>

        {/* Implementation Timeline */}
        <ImplementationTimelineSection t={t}/>

        {/* Contact Section */}
        <ContactSection t={t}/>

        {/* Footer */}
        <Footer t={t}/>
      </div>
    </I18nProvider>
  )
}
