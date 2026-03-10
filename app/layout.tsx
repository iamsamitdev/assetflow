import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/app/(landing)/Navbar"
import Footer from "@/app/(landing)/Footer"
import { Toaster } from "@/components/ui/sonner"
import { Inter, Anuphan } from "next/font/google"

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
})

const anuphan = Anuphan({
    variable: "--font-anuphan",
    subsets: ["thai", "latin"],
})

export const metadata: Metadata = {
  title: "AssetFlow - ระบบจัดการครุภัณฑ์สำหรับองค์กรยุคใหม่",
  description: "AssetFlow ช่วยให้องค์กรของคุณจัดการครุภัณฑ์ได้อย่างมีประสิทธิภาพ ตั้งแต่การลงทะเบียน ติดตามสถานะ ไปจนถึงการออกรายงานสรุปประจำปี ด้วยฟีเจอร์ครบครันและใช้งานง่าย",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${anuphan.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Navbar />
          <div className="mx-auto py-8">
            {children}
            <Toaster />
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
