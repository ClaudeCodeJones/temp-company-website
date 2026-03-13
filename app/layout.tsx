import type { Metadata } from 'next'
import { Archivo, Archivo_Black } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
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
  title: brand.name,
  description: `Professional services from ${brand.name}. Contact us today.`,
  openGraph: {
    title: brand.name,
    description: `Professional services from ${brand.name}.`,
    url: brand.domain,
    siteName: brand.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: brand.name,
    description: `Professional services from ${brand.name}.`,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/images/hero.webp" />
      </head>
      <body className={`${archivo.variable} ${archivoBlack.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
