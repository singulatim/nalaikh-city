"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  TreePine,
  Home,
  Factory,
} from "lucide-react"
import { Translate } from "@/lib/_types"


export default function ProjectOutcomesSection({t}: Translate) {
  return (
      <section
        id="projects"
        className="py-20 bg-gradient-to-br from-nalaikh-navy to-blue-900 dark:from-gray-900 dark:to-nalaikh-navy relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-nalaikh-gold/20 text-nalaikh-gold border-nalaikh-gold/30">
              {t.integratedApproach}
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 dark:text-nalaikh-gold">
              {t.projectOutcomes}
            </h2>
            <p className="text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto dark:text-gray-300">
              {t.projectOutcomesDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <CardHeader className="text-center pb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-nalaikh-gold to-yellow-400 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                    <Factory className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-nalaikh-red rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">1</span>
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-white mb-3">{t.industrialPark}</CardTitle>
                <CardDescription className="text-blue-100">{t.industrialParkDesc}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <CardHeader className="text-center pb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                    <Home className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-nalaikh-red rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">2</span>
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-white mb-3">{t.urbanDevelopment}</CardTitle>
                <CardDescription className="text-blue-100">{t.urbanDevelopmentDesc}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <CardHeader className="text-center pb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-nalaikh-red rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">3</span>
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-white mb-3">{t.economicZone}</CardTitle>
                <CardDescription className="text-blue-100">{t.economicZoneDesc}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <CardHeader className="text-center pb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                    <TreePine className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-nalaikh-red rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">4</span>
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-white mb-3">{t.greenNalaikhProject}</CardTitle>
                <CardDescription className="text-blue-100">{t.greenNalaikhDesc}</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
            <div className="text-center mb-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-nalaikh-gold mb-4">{t.benefitsTitle}</h3>
              <p className="text-blue-100">{t.benefitsDesc}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-14 h-14 bg-gradient-to-br from-nalaikh-gold to-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">💰</span>
                </div>
                <h4 className="text-base font-bold mb-2 text-white">{t.greenFinancing}</h4>
                <p className="text-sm text-blue-100">{t.greenFinancingDesc}</p>
              </div>

              <div className="text-center group">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">📈</span>
                </div>
                <h4 className="text-base font-bold mb-2 text-white">{t.exportSupport}</h4>
                <p className="text-sm text-blue-100">{t.exportSupportDesc}</p>
              </div>

              <div className="text-center group">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">👥</span>
                </div>
                <h4 className="text-base font-bold mb-2 text-white">{t.jobCreation}</h4>
                <p className="text-sm text-blue-100">{t.jobCreationDesc}</p>
              </div>

              <div className="text-center group">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">🚀</span>
                </div>
                <h4 className="text-base font-bold mb-2 text-white">{t.newTechnology}</h4>
                <p className="text-sm text-blue-100">{t.newTechnologyDesc}</p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-nalaikh-gold mb-2">5+</div>
                <div className="text-white font-semibold mb-1">{t.projectCoordination}</div>
                <div className="text-sm text-blue-100">{t.projectCoordinationDesc}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-nalaikh-gold mb-2">100%</div>
                <div className="text-white font-semibold mb-1">{t.livingEnvironment}</div>
                <div className="text-sm text-blue-100">{t.livingEnvironmentDesc}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-nalaikh-gold mb-2">∞</div>
                <div className="text-white font-semibold mb-1">{t.developmentModel}</div>
                <div className="text-sm text-blue-100">{t.developmentModelDesc}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}
