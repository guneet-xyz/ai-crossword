import { cn } from "@/lib/utils"
import "@/styles/globals.css"

import { Navbar } from "./_components/navbar"

import { type Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { Geist } from "next/font/google"
import localFont from "next/font/local"

export const metadata: Metadata = {
  title: "easystart",
  description: "Opinionated starter template for NextJS",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const Satoshi = localFont({
  src: "../fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(geist.variable, Satoshi.variable)}
      suppressHydrationWarning // needed for next-themes
    >
      <body className="flex min-h-screen flex-col">
        <ThemeProvider attribute="class">
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
