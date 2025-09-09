import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Нэвтрэх - NCDC Admin',
  description: 'Nalaikh City Development Corporation Admin Login',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}