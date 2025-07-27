import React from 'react'
import { ThemeProvider } from '@/components/ThemeProvider'
import './styles.css'

export const metadata = {
  title: 'Nexus News - Güncel Haberler ve Analizler',
  description: 'Türkiye ve dünyadan son dakika haberleri, spor, ekonomi, teknoloji ve daha fazlası.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="tr" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
