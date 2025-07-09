import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'

const manrope = Manrope({ 
  subsets: ['latin'],
  weight: ['400', '600', '700']
})

export const metadata: Metadata = {
  title: 'QGP Website',
  description: 'QGP Landing Page and Blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <Header />
        {children}
      </body>
    </html>
  )
} 