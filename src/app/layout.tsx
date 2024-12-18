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
        <script src="http://localhost:8097"></script>
        <title>Create Next App</title>
        <script src="/BrowserPrint-3.0.216.min.js"></script>
        <script src="https://d3js.org/d3.v7.min.js"></script>
      </head>
      <body className="bg-slate-100">
        {children}
      </body>
      
    </html>
  )
}
