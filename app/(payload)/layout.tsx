import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NCDC CMS Admin',
  description: 'Content Management System for Nalaikh City Development Corporation',
}

export default function PayloadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}