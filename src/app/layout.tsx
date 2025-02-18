import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eurequat designer',
  description: 'Created by ereuquat developement team',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"></link>
        <title>Create Next App</title>
        <script src="/impression_etiquette_en_ligne/BrowserPrint-3.0.216.min.js"></script>
        <script src="https://d3js.org/d3.v7.min.js"></script>
      </head>
      <body className="bg-slate-100">
        {children}
      </body>
      
    </html>
  )
}
