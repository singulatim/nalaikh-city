"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react"
import { Translate } from "@/lib/_types"


export default function ContactSection({t}: Translate) {
  return (
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 dark:text-nalaikh-gold">{t.contact}</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Office Location */}
              <Card className="border-0 shadow-xl bg-white dark:bg-nalaikh-navy/20 dark:border-nalaikh-gold/20 hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-nalaikh-navy/10 dark:bg-nalaikh-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="h-8 w-8 text-nalaikh-navy dark:text-nalaikh-gold" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 dark:text-nalaikh-gold">
                    {t.officeLocation}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t.address}</p>
                </CardContent>
              </Card>

              {/* Phone Contact */}
              <Card className="border-0 shadow-xl bg-white dark:bg-nalaikh-navy/20 dark:border-nalaikh-gold/20 hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-nalaikh-navy/10 dark:bg-nalaikh-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="h-8 w-8 text-nalaikh-navy dark:text-nalaikh-gold" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 dark:text-nalaikh-gold">{t.phoneContact}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">{t.phone}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{t.businessHours}</p>
                </CardContent>
              </Card>

              {/* Email Contact */}
              <Card className="border-0 shadow-xl bg-white dark:bg-nalaikh-navy/20 dark:border-nalaikh-gold/20 hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-nalaikh-navy/10 dark:bg-nalaikh-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="h-8 w-8 text-nalaikh-navy dark:text-nalaikh-gold" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 dark:text-nalaikh-gold">{t.emailContact}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">info@ncdc.mn</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{t.responseTime}</p>
                </CardContent>
              </Card>
            </div>

            {/* Additional Contact Information */}
            <div className="mt-16 text-center">
              <div className="bg-nalaikh-navy/5 dark:bg-nalaikh-gold/10 rounded-2xl p-8 max-w-4xl mx-auto">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 dark:text-nalaikh-gold">
                  {t.partnershipOpportunities}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">{t.partnershipDesc}</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="bg-white dark:bg-nalaikh-navy/30 px-6 py-3 rounded-full shadow-md">
                    <span className="text-nalaikh-navy dark:text-nalaikh-gold font-medium">{t.greenFinancing}</span>
                  </div>
                  <div className="bg-white dark:bg-nalaikh-navy/30 px-6 py-3 rounded-full shadow-md">
                    <span className="text-nalaikh-navy dark:text-nalaikh-gold font-medium">
                      {t.sustainableDevelopment}
                    </span>
                  </div>
                  <div className="bg-white dark:bg-nalaikh-navy/30 px-6 py-3 rounded-full shadow-md">
                    <span className="text-nalaikh-navy dark:text-nalaikh-gold font-medium">{t.urbanPlanning}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}
