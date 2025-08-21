"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Translate } from "@/lib/_types"



export default function FinancingSolutionsSection({t}: Translate) {
  return (
    <section id="financing" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 dark:text-nalaikh-gold">
              {t.financingSolutions}
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
              {t.financingSolutionsDesc}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 dark:text-white">
                {t.constructionFinancing}
              </h3>
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg dark:bg-red-900/20">
                  <div className="text-base lg:text-lg font-bold text-red-600 mb-2">{t.currentProblem}</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">{t.currentProblemDesc}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg dark:bg-green-900/20">
                  <div className="text-base lg:text-lg font-bold text-green-600 mb-2">{t.solution}</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">{t.solutionDesc}</div>
                </div>
              </div>
            </div>
            <div>
              <Card className="border-0 shadow-lg dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">{t.priceComparison}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded dark:bg-red-900/20">
                      <span className="dark:text-gray-300">{t.bankLoanPrice}</span>
                      <span className="font-bold text-red-600">₮240,000,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded dark:bg-green-900/20">
                      <span className="dark:text-gray-300">{t.preOrderPrice}</span>
                      <span className="font-bold text-green-600">₮164,000,000</span>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded dark:bg-blue-900/20">
                      <div className="text-base lg:text-lg font-bold text-blue-600">{t.actualSavings}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-center text-nalaikh-navy dark:text-nalaikh-gold">01</CardTitle>
                <CardDescription className="text-center font-bold dark:text-gray-300">
                  {t.downPaymentInsurance}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center dark:text-gray-300">{t.downPaymentInsuranceDesc}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-center text-nalaikh-navy dark:text-nalaikh-gold">02</CardTitle>
                <CardDescription className="text-center font-bold dark:text-gray-300">
                  {t.corporateFinancing}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center dark:text-gray-300">{t.corporateFinancingDesc}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-center text-nalaikh-navy dark:text-nalaikh-gold">03</CardTitle>
                <CardDescription className="text-center font-bold dark:text-gray-300">
                  {t.fundingSources}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center dark:text-gray-300">{t.fundingSourcesDesc}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-center text-nalaikh-navy dark:text-nalaikh-gold">04</CardTitle>
                <CardDescription className="text-center font-bold dark:text-gray-300">
                  {t.passiveHousing}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center dark:text-gray-300">{t.passiveHousingDesc}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
  )
}
