import Navbar from "@/app/(landing)/Navbar"
import Footer from "@/app/(landing)/Footer"
import { Suspense } from "react"

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="mx-auto py-8">
        <Suspense>
          <Navbar />
        </Suspense>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        }>
          {children}
        </Suspense>
        <Footer />
    </div>
  )
}
