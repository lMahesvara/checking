import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import SessionAuthProvider from '@/context/SessionAuthProvider'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Checking',
  description: 'Aplicación para el control de asistencia de los estudiantes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + ' bg-zinc-900 dark'}>
        <SessionAuthProvider>
          <Providers>{children}</Providers>
        </SessionAuthProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}
