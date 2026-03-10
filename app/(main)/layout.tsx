import { Sidebar } from "@/app/(main)/_components/sidebar"
import { Header } from "@/app/(main)/_components/header"

export default async function MainLayout({
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
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    )
}
