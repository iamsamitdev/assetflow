import { Sidebar } from "@/app/(main)/_components/sidebar"
import { Header } from "@/app/(main)/_components/header"
import { Suspense } from "react"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

async function AuthGate({ children }: { children: React.ReactNode }) {
    // ตรวจสอบการเข้าสู่ระบบ
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    // ถ้าไม่ได้ Login → Redirect ไปหน้า Login
    if (!session) {
        redirect("/signin")
    }

    return <>{children}</>
}

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Top Header */}
                <Header />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Suspense fallback={
                        <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                        </div>
                    }>
                        <AuthGate>{children}</AuthGate>
                    </Suspense>
                </main>
            </div>
        </div>
    )
}
