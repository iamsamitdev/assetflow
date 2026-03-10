"use client"

import { usePathname } from "next/navigation"
import { sidebarData, bottomNavItems } from "@/app/(main)/_components/sidebar/sidebar-data"
import { UserMenu } from "@/app/(main)/_components/header/user-menu"
export function Header() {
    const pathname = usePathname()

    // หน้าที่ไม่อยู่ใน sidebar แต่ต้องแสดง title
    const pageTitles: Record<string, string> = {
        "/profile": "โปรไฟล์ของฉัน",
    }

    // รวม items ทั้งหมดจาก sidebar แล้วหา title ที่ตรงกับ pathname
    const allItems = [
        ...sidebarData.flatMap((section) => section.items),
        ...bottomNavItems,
    ]
    const matched = allItems.find((item) => pathname === item.href)
    const title = pageTitles[pathname] ?? matched?.title ?? "Dashboard"

    return (
        <>
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/80 backdrop-blur-xl px-6">
            <div className="flex items-center gap-4">
                <h1 className="text-lg font-semibold text-foreground">
                    {title}
                </h1>
            </div>

            <div className="flex items-center gap-3">
                <UserMenu />
            </div>
        </header>
        </>
    )
}
