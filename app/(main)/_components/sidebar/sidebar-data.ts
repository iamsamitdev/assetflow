import {
    LayoutDashboard,
    Package,
    ClipboardList,
    Building2,
    Users,
    ScrollText,
    Settings,
    HelpCircle,
    type LucideIcon,
} from "lucide-react"

export interface NavItemType {
    title: string
    href: string
    icon: LucideIcon
    badge?: string
}

export interface NavSectionType {
    title?: string
    items: NavItemType[]
    allowedRoles?: string[]  // ถ้าไม่กำหนด = ทุก role เห็นได้
}

export const sidebarData: NavSectionType[] = [
    {
        items: [
            { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        ],
    },
    {
        title: "Asset Management",
        items: [
            { title: "Assets", href: "/assets", icon: Package },
            { title: "Requests", href: "/requests", icon: ClipboardList },
            { title: "Departments", href: "/departments", icon: Building2 },
        ],
    },
    {
        title: "Admin",
        items: [
            { title: "Users", href: "/admin/users", icon: Users },
            { title: "Audit Logs", href: "/admin/audit-logs", icon: ScrollText },
            { title: "Settings", href: "/admin/settings", icon: Settings },
        ],
        allowedRoles: ["admin"],  // เฉพาะ admin เห็นได้
    },
]

export const bottomNavItems: NavItemType[] = [
    { title: "Help", href: "/help", icon: HelpCircle },
]
