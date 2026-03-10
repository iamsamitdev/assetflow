import Navbar from "@/app/(landing)/Navbar"
import Footer from "@/app/(landing)/Footer"

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="mx-auto py-8">
        <Navbar />
        {children}
        <Footer />
    </div>
  )
}
