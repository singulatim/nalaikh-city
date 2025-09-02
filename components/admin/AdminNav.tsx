"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  Home, 
  FileText, 
  Image, 
  Users, 
  Settings,
  ExternalLink
} from "lucide-react"

const navigation = [
  { name: 'Хяналтын самбар', href: '/admin', icon: Home },
  { name: 'Нийтлэлүүд', href: '/admin/posts', icon: FileText },
  { name: 'Зураг файл', href: '/admin/media', icon: Image },
  { name: 'Хэрэглэгчид', href: '/admin/users', icon: Users },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">Н</span>
              </div>
              <span className="font-semibold text-gray-900">НХХК Удирдлага</span>
            </Link>
            
            <div className="flex items-center gap-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || 
                  (item.href !== '/admin' && pathname.startsWith(item.href))
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive 
                        ? "bg-blue-100 text-blue-700" 
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              target="_blank"
            >
              <ExternalLink className="h-4 w-4" />
              Сайт үзэх
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}