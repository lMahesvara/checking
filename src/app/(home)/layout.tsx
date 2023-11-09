import AsideMenu from '@/components/AsideMenu'
import Navbar from '@/components/Navbar'
import { Suspense } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <div className="flex w-full flex-1 max-w-screen-xl mx-auto">
        <AsideMenu />
        <main className="flex-1">{children}</main>
      </div>
    </>
  )
}
