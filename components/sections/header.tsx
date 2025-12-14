"use client"

import Image from "next/image"
import { Language } from "@/lib/translations"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import CompanyLogo from "@/assets/logos/ncdc-logo.jpg"
import Link from "next/link"

type Props = {
  t: Record<string, string>
  language: Language
  setLanguage?: (lang: Language) => void
}

import { useRouter, usePathname } from "next/navigation"

export default function Header({ t, language, setLanguage }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  const navigateToLanguage = (nextLang: Language) => {
    // Expect paths like /mn, /en, /zh plus optional hash
    const url = new URL(window.location.href)
    const hash = url.hash
    const segments = pathname.split("/").filter(Boolean)
    if (segments.length === 0) {
      router.push(`/${nextLang}${hash}`)
      return
    }
    segments[0] = nextLang
    const nextPath = `/${segments.join("/")}${hash}`
    router.push(nextPath)
  }
  return (
    <header className="border-b-2 backdrop-blur supports-[backdrop-filter]:white/60 sticky top-0 z-50 bg-nalaikh-light-grey border-primary dark:bg-nalaikh-navy/95 dark:supports-[backdrop-filter]:bg-nalaikh-navy/90 dark:border-nalaikh-gold/20">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3">
              <Image src={CompanyLogo} alt="company Logo" className="w-14" />
                <div className="text-xs text-primary uppercase font-semibold -mt-1 dark:text-nalaikh-gold/80">
                  {t.company}
                </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {[
              { key: "greenNalaikh", href: "#green-nalaikh", type: "section" },
              { key: "about", href: "/mn/about", type: "page" },
              { key: "projects", href: "#projects", type: "section" },
              { key: "housing", href: "#housing", type: "section" },
              { key: "financing", href: "#financing", type: "section" },
              { key: "contact", href: "#contact", type: "section" },
            ].map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-primary hover:underline transition-colors dark:text-nalaikh-gold/80 text-sm uppercase dark:hover:text-nalaikh-gold"
                onClick={(e) => {
                  if (item.type === "section") {
                    e.preventDefault()
                    document
                      .querySelector(item.href)
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                {t[item.key as keyof typeof t]}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <Select
              value={language}
              onValueChange={(value: Language) =>
                setLanguage ? setLanguage(value) : navigateToLanguage(value)
              }
            >
              <SelectTrigger className="w-18 text-primary text-sm border-primary dark:bg-nalaikh-navy/50  dark:border-nalaikh-gold/30 dark:text-nalaikh-gold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-nalaikh-navy dark:border-nalaikh-gold/30">
                <SelectItem
                  value="mn"
                  className="dark:text-nalaikh-gold dark:focus:bg-nalaikh-gold/20"
                >
                  MN
                </SelectItem>
                <SelectItem
                  value="en"
                  className="dark:text-nalaikh-gold dark:focus:bg-nalaikh-gold/20"
                >
                  EN
                </SelectItem>
                <SelectItem
                  value="zh"
                  className="dark:text-nalaikh-gold dark:focus:bg-nalaikh-gold/20"
                >
                  中文
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  )
}
