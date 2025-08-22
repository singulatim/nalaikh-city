"use client"

import Image from 'next/image';
import CompanyLogo from "@/assets/logos/ncdc-logo.jpg";
import { Translate } from "@/lib/_types";

export default function Footer({t}: Translate) {
  return (
       <footer className="bg-nalaikh-navy text-white py-12 dark:bg-gray-900 dark:border-t dark:border-nalaikh-gold/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image src={CompanyLogo} alt="NCDC Logo" width={40} height={40} className="size-10" />
                <span className="text-lg font-bold dark:text-nalaikh-gold">NCDC</span>
              </div>
              <p className="text-blue-100 dark:text-gray-300">{t.company}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 dark:text-nalaikh-gold">{t.projects}</h4>
              <ul className="space-y-2 text-blue-100 dark:text-gray-300">
                <li>{t.greenNalaikh}</li>
                <li>{t.industrialPark}</li>
                <li>{t.housingDevelopment}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 dark:text-nalaikh-gold">{t.services}</h4>
              <ul className="space-y-2 text-blue-100 dark:text-gray-300">
                <li>{t.urbanPlanning}</li>
                <li>{t.greenFinancing}</li>
                <li>{t.sustainableDevelopment}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 dark:text-nalaikh-gold">{t.contact}</h4>
              <div className="space-y-2 text-blue-100 dark:text-gray-300">
                <p>{t.address}</p>
                <p>{t.phone}</p>
                <p>{t.email}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 dark:border-nalaikh-gold/20 mt-8 pt-8 text-center">
            <p className="text-blue-100 dark:text-gray-300">
              © 2025 {t.company}. {t.allRightsReserved}
            </p>
          </div>
        </div>
      </footer>
  )
}
