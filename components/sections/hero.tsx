"use client"

import CityImage from "@/assets/images/new-nalaikh.jpg"
import { Translate } from "@/lib/_types"
import { Leaf } from "lucide-react"

export default function HeroSection({ t }: Translate) {
  return (
    <section className="relative overflow-hidden isolate bg-gradient-to-br from-nalaikh-light-grey to-blue-50 py-24 md:py-32 dark:from-nalaikh-navy dark:to-gray-900 dark:bg-gradient-to-br">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${CityImage.src})` }}
      />
      <div className="container max-lg:px-3 mx-auto relative z-10  items-center">
        <div className="bg-white/70 max-w-max p-6 rounded-xl">
          <div className="inline-flex items-center space-x-2 bg-white/100 px-3 py-1.5 rounded-full text-sm text-primary/80 mb-4 shadow ring-1 ring-gray-200/60 backdrop-blur-md dark:bg-nalaikh-navy/60 dark:text-nalaikh-gold dark:ring-nalaikh-gold/20">
            <Leaf className="size-5 text-green-600 dark:text-nalaikh-gold" />
            <span>{t.ecoFriendlyCity}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-green-700 mb-5 dark:text-white">
            {t.heroTitle}
          </h1>
          <p className="text-xl text-primary/80 leading-relaxed mb-8 max-w-prose dark:text-nalaikh-gold/80">
            {t.heroDescription}
          </p>
        </div>
      </div>
    </section>
  )
}
