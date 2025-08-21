"use client"

import Image from 'next/image';
import {Language} from "@/lib/translations"
import {Button} from "@/components/ui/button"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Moon, Sun} from "lucide-react"
import CompanyLogo from "@/assets/logos/ncdc-logo.jpg"
import {Theme} from '@/lib/_types';

type Props = {
  t: Record<string, string>
  language: Language
  setLanguage: (lang: Language) => void
  theme: Theme
  setTheme: (theme: Theme) => void
}

export default function Header({t, language, setLanguage, theme, setTheme}: Props) {
  return (
    <header
      className="border-b bg-white backdrop-blur supports-[backdrop-filter]:white/60 sticky top-0 z-50 dark:bg-nalaikh-navy/95 dark:supports-[backdrop-filter]:bg-nalaikh-navy/90 dark:border-nalaikh-gold/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Image src={CompanyLogo} alt="NCDC Logo" width={40} height={40} className="size-10"/>
              <div>
                <span className="text-lg font-bold text-primary dark:text-nalaikh-gold">NCDC</span>
                <div className="text-xs text-primary dark:text-nalaikh-gold/80">{t.company}</div>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {[
              { key: "greenNalaikh", href: "#green-nalaikh" },
              { key: "projects", href: "#projects" },
              { key: "housing", href: "#housing" },
              { key: "financing", href: "#financing" },
              { key: "contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-primary hover:underline transition-colors dark:text-nalaikh-gold/80 dark:hover:text-nalaikh-gold"
                onClick={(e) => {
                  e.preventDefault()
                  document
                    .querySelector(item.href)
                    ?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                {t[item.key as keyof typeof t]}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
              <SelectTrigger
                className="w-20 text-primary border-primary dark:bg-nalaikh-navy/50 h-9 dark:border-nalaikh-gold/30 dark:text-nalaikh-gold">
                <SelectValue/>
              </SelectTrigger>
              <SelectContent className="dark:bg-nalaikh-navy dark:border-nalaikh-gold/30">
                <SelectItem value="mn" className="dark:text-nalaikh-gold dark:focus:bg-nalaikh-gold/20">
                  MN
                </SelectItem>
                <SelectItem value="en" className="dark:text-nalaikh-gold dark:focus:bg-nalaikh-gold/20">
                  EN
                </SelectItem>
                <SelectItem value="zh" className="dark:text-nalaikh-gold dark:focus:bg-nalaikh-gold/20">
                  中文
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="dark:border-nalaikh-gold/30 dark:text-nalaikh-gold bg-white h-9 text-primary border-primary dark:hover:bg-nalaikh-gold/20"
            >
              {theme === "light" ? <Moon className="h-4 w-4"/> : <Sun className="h-4 w-4"/>}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
