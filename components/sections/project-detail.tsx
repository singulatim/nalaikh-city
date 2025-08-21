"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  TreePine,
  Waves,
  GraduationCap,
  Leaf,
} from "lucide-react"
import { Translate } from "@/lib/_types"


export default function ProjectDetailSection({t}: Translate) {
  return (
    <section id="green-nalaikh" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 dark:text-nalaikh-gold">
              {t.greenComponents}
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
              {t.greenComponentsDesc}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-nalaikh-navy/20 dark:border-nalaikh-gold/20 dark:hover:bg-nalaikh-navy/30">
              <CardHeader>
                <TreePine className="h-10 w-10 text-green-600 mb-4 dark:text-nalaikh-gold" />
                <CardTitle className="dark:text-nalaikh-gold">{t.greenZone}</CardTitle>
                <CardDescription className="dark:text-gray-300">{t.greenZoneDesc}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-nalaikh-navy/20 dark:border-nalaikh-gold/20 dark:hover:bg-nalaikh-navy/30">
              <CardHeader>
                <Waves className="h-10 w-10 text-blue-600 mb-4 dark:text-nalaikh-gold" />
                <CardTitle className="dark:text-nalaikh-gold">{t.waterFeatures}</CardTitle>
                <CardDescription className="dark:text-gray-300">{t.waterFeaturesDesc}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-nalaikh-navy/20 dark:border-nalaikh-gold/20 dark:hover:bg-nalaikh-navy/30">
              <CardHeader>
                <GraduationCap className="h-10 w-10 text-purple-600 mb-4 dark:text-nalaikh-gold" />
                <CardTitle className="dark:text-nalaikh-gold">{t.ecoEducation}</CardTitle>
                <CardDescription className="dark:text-gray-300">{t.ecoEducationDesc}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-nalaikh-navy/20 dark:border-nalaikh-gold/20 dark:hover:bg-nalaikh-navy/30">
              <CardHeader>
                <Leaf className="h-10 w-10 text-green-500 mb-4 dark:text-nalaikh-gold" />
                <CardTitle className="dark:text-nalaikh-gold">{t.greenTech}</CardTitle>
                <CardDescription className="dark:text-gray-300">{t.greenTechDesc}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
  )
}
