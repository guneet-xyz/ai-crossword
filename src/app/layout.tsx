import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import "@/styles/globals.css"

import { AppSidebar } from "./_components/sidebar"

import { type Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { Geist } from "next/font/google"
import localFont from "next/font/local"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: "easy crossword",
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
          <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger className="size-10" />
            {children}
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
