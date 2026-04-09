import type { Metadata } from 'next'
import { Archivo, Archivo_Black } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navbar from './components/Navbar'
import FooterConditional from './components/FooterConditional'
import { brand } from '../config/brand'

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(brand.domain),
  title: `${brand.name} | Traffic Management Staffing NZ`,
  description: 'Specialist labour hire for traffic management. Supplying certified TTM workers, STMS and civil labour across Wellington, Blenheim and Christchurch.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: `${brand.name} | Traffic Management Staffing NZ`,
    description: 'Specialist labour hire for traffic management. Supplying certified TTM workers, STMS and civil labour across Wellington, Blenheim and Christchurch.',
    url: brand.domain,
    siteName: brand.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${brand.name} | Traffic Management Staffing NZ`,
    description: 'Specialist labour hire for traffic management. Supplying certified TTM workers, STMS and civil labour across Wellington, Blenheim and Christchurch.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preload" as="image" href="/images/hero.webp" />
      </head>
      <body className={`${archivo.variable} ${archivoBlack.variable}`}>
        <Navbar />
        {children}
        <FooterConditional />
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
