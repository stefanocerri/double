import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/auth/Providers'
import { SetupProvider } from '@/contexts/SetupContext'
import { Header } from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Twelve',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <Providers>
          <SetupProvider>
            <Header/>
            {children}
          </SetupProvider>
        </Providers>
      </body>
    </html>
  )
}
