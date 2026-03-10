"use client"

import { useState, useRef, useEffect } from "react"
import ThemeToggle from "@/components/ThemeToggle"
import Link from "next/link"
import { useSession, signOut } from "@/lib/auth-client"

export function UserMenu() {
    const { data: session, isPending } = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    // ปิด dropdown เมื่อคลิกข้างนอก
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Loading state
    if (isPending) {
        return (
            <div className="flex items-center gap-2">
                <ThemeToggle />
                <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
            </div>
        )
    }

    if (!session?.user) return null

    const user = session.user
    const userRole = ((user as Record<string, unknown>).role as string) ?? "user"

    // สร้าง Avatar Initials จากชื่อผู้ใช้
    const initials = (user.name ?? "?")
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)

    return (
        <div className="relative flex items-center gap-2" ref={menuRef}>
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Avatar Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition pl-3 pr-1.5 py-1.5"
            >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden sm:block">
                    {user.name}
                </span>

                <div className="w-9 h-9 rounded-full bg-linear-to-br from-purple-500 to-indigo-600 flex items-center justify-center ring-2 ring-purple-100 dark:ring-purple-900">
                    <span className="text-xs font-bold text-white">{initials}</span>
                </div>

                {/* Chevron */}
                <svg
                    className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{user.email}</p>
                        <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
                            {userRole.toUpperCase()}
                        </span>
                    </div>

                    {/* Profile Link */}
                    <div className="px-2 pt-2">
                        <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl transition font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            โปรไฟล์ของฉัน
                        </Link>
                    </div>

                    {/* Logout */}
                    <div className="px-2 pt-1 pb-1">
                        <button
                            onClick={async () => {
                                await signOut({
                                    fetchOptions: {
                                        onSuccess: () => {
                                            window.location.href = "/signin"
                                        },
                                    },
                                })
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            ออกจากระบบ
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
