import "./globals.css"
import { ReactNode } from "react"
import { ThemeProvider } from "next-themes"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: "AI Contact Center",
  description: "Production-grade AI AI Contact Center Chat UI",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
     <body className="bg-gray-900 overflow-y-auto">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
