import React, { Suspense } from "react"
import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "../globals.css"
import Header from "@/components/sections/header"
import { getT } from "@/lib/i18n"
import Footer from "@/components/sections/footer"
import TopHeader from "@/components/ui/top-header"
import { Params } from "@/lib/_types"

const mainFont = Roboto({
  subsets: ["cyrillic-ext"],
  preload: true,
  display: "swap",
})

export interface RootLayoutProps {
  children: React.ReactNode
  params: Params
}

export async function generateMetadata(
  props: RootLayoutProps,
): Promise<Metadata> {
  const params = await props.params

  return {
    title: "Nalaikh City Development Corporation",
    description:
      "Green Nalaikh – Eco-friendly urban development and sustainable city initiatives.",
    openGraph: {
      type: "website",
      locale: params.lang,
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lang: language } = await params
  const t = getT(language)
  return (
    <html lang={language} className={`${mainFont.className}`}>
      <head>
        <link rel="icon" href={`/favicon.ico`} sizes="any" />
        <title>Nalaikh City Development Corporation</title>
      </head>

      <body className={`antialiased bg-background`}>
        {/* Header */}
        <Suspense>
          <TopHeader />
          <Header t={t} language={language} />
        </Suspense>

        {/* Main content */}
        <section className="flex-1">
          <Suspense>{children}</Suspense>
        </section>

        {/* Footer */}
        <Suspense>
          <Footer t={t} />
        </Suspense>
      </body>
    </html>
  )
}
