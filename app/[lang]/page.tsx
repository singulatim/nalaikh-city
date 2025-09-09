import HeroSection from "@/components/sections/hero"
import ProjectDetailSection from "@/components/sections/project-detail"
import ProjectOutcomesSection from "@/components/sections/project-outcomes"
import HousingStatisticSection from "@/components/sections/housing-statistics"
import FinancingSolutionsSection from "@/components/sections/financing-solutions"
import ImplementationTimelineSection from "@/components/sections/implementation-timeline"
import ContactSection from "@/components/sections/contact"
import Footer from "@/components/sections/footer"
import Header from "@/components/sections/header"
import { getT } from "@/lib/i18n"

type PageProps = {
  params: { lang: "mn" | "en" | "zh" }
}

export default function LocaleHomePage({ params }: PageProps) {
  const language = params.lang
  const t = getT(language)

  return (
    <div className="min-h-screen bg-background">
      <Header t={t} language={language} />

      <HeroSection t={t} />

      <ProjectDetailSection t={t} />

      <ProjectOutcomesSection t={t} />

      <HousingStatisticSection t={t} />

      <FinancingSolutionsSection t={t} />

      <ImplementationTimelineSection t={t} />

      <ContactSection t={t} />

      <Footer t={t} />
    </div>
  )
}
