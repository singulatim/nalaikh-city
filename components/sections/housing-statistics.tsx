"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Translate } from "@/lib/_types"

export default function HousingStatisticSection({t}: Translate) {
  return (
    <section id="housing" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 dark:text-nalaikh-gold">
              {t.housingChallenge}
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
              {t.housingChallengeDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center border-0 shadow-lg dark:bg-nalaikh-navy/20 dark:border-nalaikh-gold/20">
              <CardHeader>
                <div className="text-4xl font-bold text-nalaikh-navy mb-2 dark:text-nalaikh-gold">15,000</div>
                <CardTitle className="text-lg dark:text-white">{t.totalHouseholds}</CardTitle>
                <CardDescription className="dark:text-gray-300">{t.totalHouseholdsDesc}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center border-0 shadow-lg dark:bg-nalaikh-navy/20 dark:border-nalaikh-gold/20">
              <CardHeader>
                <div className="text-4xl font-bold text-nalaikh-red mb-2 dark:text-nalaikh-gold">35%</div>
                <CardTitle className="text-lg dark:text-white">{t.downPaymentCapable}</CardTitle>
                <CardDescription className="dark:text-gray-300">{t.downPaymentCapableDesc}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center border-0 shadow-lg dark:bg-nalaikh-navy/20 dark:border-nalaikh-gold/20">
              <CardHeader>
                <div className="text-4xl font-bold text-nalaikh-navy mb-2 dark:text-nalaikh-gold">87%</div>
                <CardTitle className="text-lg dark:text-white">{t.noDownPayment}</CardTitle>
                <CardDescription className="dark:text-gray-300">{t.noDownPaymentDesc}</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg dark:bg-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl lg:text-3xl font-bold text-nalaikh-navy dark:text-nalaikh-gold">
                  15,000
                </CardTitle>
                <CardDescription className="dark:text-gray-300">{t.housingShortage}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-xl lg:text-2xl font-bold text-green-600">35%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{t.downPaymentCapable}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{t.downPaymentCapableDesc}</div>
                  </div>
                  <div>
                    <div className="text-xl lg:text-2xl font-bold text-orange-600">87%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{t.noDownPayment}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{t.noDownPaymentDesc}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg dark:bg-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl lg:text-3xl font-bold text-blue-600">70,000</CardTitle>
                <CardDescription className="dark:text-gray-300">{t.mortgageDemand}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="dark:text-gray-300">{t.totalBorrowers}</span>
                    <span className="font-bold dark:text-white">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="dark:text-gray-300">{t.normalLoans}</span>
                    <span className="font-bold text-green-600">98.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="dark:text-gray-300">{t.badLoans}</span>
                    <span className="font-bold text-red-600">1.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg dark:bg-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl lg:text-3xl font-bold text-nalaikh-red">₮ 5.4 ТБ</CardTitle>
                <CardDescription className="dark:text-gray-300">{t.totalRisk}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm dark:text-gray-300">
                  <div>10,000 өрхийн 1.8% нь чанаргүй зээлдэгч</div>
                  <div>20 жилийн хугацаанд 180 өрх чанаргүй зээлдэгч болно</div>
                  <div>Нэг өрхийн ипотекийн зээл: ₮100 сая</div>
                  <div>Нэг чанаргүй зээлээс: ₮30 сая эрсдэл</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
  )
}
