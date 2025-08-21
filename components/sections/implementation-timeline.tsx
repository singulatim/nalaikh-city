"use client"

import { ArrowRight } from "lucide-react"
import { Translate } from "@/lib/_types"


export default function ImplementationTimelineSection({t}: Translate) {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 dark:text-white">
              {t.implementationTimeline}
            </h2>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-nalaikh-navy text-white rounded-full flex items-center justify-center font-bold mb-2 dark:bg-nalaikh-gold dark:text-nalaikh-navy">
                1
              </div>
              <div className="font-semibold dark:text-white">{t.step1}</div>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-nalaikh-navy text-white rounded-full flex items-center justify-center font-bold mb-2 dark:bg-nalaikh-gold dark:text-nalaikh-navy">
                2
              </div>
              <div className="font-semibold dark:text-white">{t.step2}</div>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-nalaikh-navy text-white rounded-full flex items-center justify-center font-bold mb-2 dark:bg-nalaikh-gold dark:text-nalaikh-navy">
                3
              </div>
              <div className="font-semibold dark:text-white">{t.step3}</div>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-nalaikh-navy text-white rounded-full flex items-center justify-center font-bold mb-2 dark:bg-nalaikh-gold dark:text-nalaikh-navy">
                4
              </div>
              <div className="font-semibold dark:text-white">{t.step4}</div>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-nalaikh-navy text-white rounded-full flex items-center justify-center font-bold mb-2 dark:bg-nalaikh-gold dark:text-nalaikh-navy">
                5
              </div>
              <div className="font-semibold dark:text-white">{t.step5}</div>
            </div>
          </div>
        </div>
      </section>
  )
}
