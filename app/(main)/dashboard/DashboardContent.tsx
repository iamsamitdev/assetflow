import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    Shield,
    Package,
    ClipboardList,
    Sparkles,
    Users,
    ScrollText,
    Building2,
    ArrowUpRight,
    Clock,
    Zap,
    Server,
    CheckCircle2,
    XCircle,
    AlertCircle,
} from "lucide-react"

import Link from "next/link"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { getAssetStats } from "@/actions/assetActions"
import { getRequestStats, getRequests } from "@/actions/requestActions"
import { getUserStats } from "@/actions/userActions"
import { getDepartments } from "@/actions/departmentActions"
import { getAuditLogs } from "@/actions/auditLogActions"

export default async function DashboardContent() {
    // ─── Auth Session ───
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        redirect("/signin")
    }

    const user = session.user as typeof session.user & { role: string }
    const isAdmin = user.role === "admin"

    // ─── Fetch Data ───
    const [assetStats, requestStats, userStats, departments, auditLogResult, allRequests] =
        await Promise.all([
            getAssetStats(),
            getRequestStats(),
            isAdmin ? getUserStats() : null,
            getDepartments(),
            getAuditLogs({ limit: 5 }),
            getRequests(),
        ])

    const totalAssets = assetStats.total
    const availableAssets = assetStats.available
    const inUseAssets = assetStats.inUse
    const maintenanceAssets = assetStats.maintenance
    const pendingRequests = requestStats.pending
    const totalUsers = userStats?.total ?? 0
    const totalDepartments = departments.length
    const recentRequests = allRequests.slice(0, 5)
    const recentAuditLogs = auditLogResult.logs

    // ─── Stats Cards ─────────────────────────────────────
    const stats = [
        {
            title: "สถานะบัญชี",
            value: isAdmin ? "Admin" : user.role === "employee" ? "Employee" : "User",
            icon: Shield,
            description: `เข้าสู่ระบบในชื่อ ${user.name}`,
            color: "text-purple-600 dark:text-purple-400",
            bg: "bg-purple-50 dark:bg-purple-900/20",
        },
        {
            title: "ครุภัณฑ์ทั้งหมด",
            value: totalAssets.toString(),
            icon: Package,
            description: `${availableAssets} พร้อมใช้งาน · ${inUseAssets} กำลังใช้งาน`,
            color: "text-emerald-600 dark:text-emerald-400",
            bg: "bg-emerald-50 dark:bg-emerald-900/20",
        },
        {
            title: "คำขอเบิกรออนุมัติ",
            value: pendingRequests.toString(),
            icon: ClipboardList,
            description: `${maintenanceAssets} เครื่องอยู่ระหว่างซ่อมบำรุง`,
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-50 dark:bg-blue-900/20",
        },
        ...(isAdmin
            ? [
                  {
                      title: "ผู้ใช้ทั้งหมด",
                      value: totalUsers.toString(),
                      icon: Users,
                      description: `${totalDepartments} แผนกในระบบ`,
                      color: "text-amber-600 dark:text-amber-400",
                      bg: "bg-amber-50 dark:bg-amber-900/20",
                  },
              ]
            : [
                  {
                      title: "สถานะระบบ",
                      value: "Active",
                      icon: Sparkles,
                      description: "ระบบทำงานปกติ",
                      color: "text-amber-600 dark:text-amber-400",
                      bg: "bg-amber-50 dark:bg-amber-900/20",
                  },
              ]),
    ]

    // ─── Quick Actions ───────────────────────────────────
    const quickActions = [
        {
            title: "ครุภัณฑ์",
            description: "ดูรายการครุภัณฑ์ทั้งหมดในระบบ",
            href: "/assets",
            icon: Package,
            color: "text-emerald-600 dark:text-emerald-400",
            bg: "bg-emerald-50 dark:bg-emerald-900/20",
            border: "border-emerald-200 dark:border-emerald-800",
        },
        {
            title: "เบิกครุภัณฑ์",
            description: "สร้างคำขอเบิกครุภัณฑ์ใหม่",
            href: "/requests",
            icon: ClipboardList,
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-50 dark:bg-blue-900/20",
            border: "border-blue-200 dark:border-blue-800",
        },
        {
            title: "แผนก",
            description: "ดูรายการแผนกและครุภัณฑ์ในแผนก",
            href: "/departments",
            icon: Building2,
            color: "text-purple-600 dark:text-purple-400",
            bg: "bg-purple-50 dark:bg-purple-900/20",
            border: "border-purple-200 dark:border-purple-800",
        },
        ...(isAdmin
            ? [
                  {
                      title: "Audit Logs",
                      description: "ดูประวัติการเบิกจ่ายและการเปลี่ยนแปลง",
                      href: "/admin/audit-logs",
                      icon: ScrollText,
                      color: "text-amber-600 dark:text-amber-400",
                      bg: "bg-amber-50 dark:bg-amber-900/20",
                      border: "border-amber-200 dark:border-amber-800",
                  },
              ]
            : [
                  {
                      title: "โปรไฟล์",
                      description: "ดูและแก้ไขข้อมูลส่วนตัว",
                      href: "/profile",
                      icon: Shield,
                      color: "text-amber-600 dark:text-amber-400",
                      bg: "bg-amber-50 dark:bg-amber-900/20",
                      border: "border-amber-200 dark:border-amber-800",
                  },
              ]),
    ]

    return (
        <div className="space-y-6">
            {/* ─── Header ─────────────────────────────── */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        สวัสดี, {user.name} 👋
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        ยินดีต้อนรับสู่ระบบจัดการครุภัณฑ์ Asset Flow
                    </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {new Date().toLocaleDateString("th-TH", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </div>
            </div>

            {/* ─── Stats Grid ─────────────────────────── */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className="transition-shadow hover:shadow-md">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                                    <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                                        {stat.value}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        {stat.description}
                                    </p>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* ─── Quick Actions ──────────────────────── */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-amber-500" />
                    Quick Actions
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {quickActions.map((action) => {
                        const Icon = action.icon
                        return (
                            <Link key={action.title} href={action.href}>
                                <Card
                                    className={`group cursor-pointer transition-all hover:shadow-md border ${action.border}`}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-start gap-3">
                                            <div className={`p-2 rounded-lg ${action.bg} shrink-0`}>
                                                <Icon className={`h-4 w-4 ${action.color}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                        {action.title}
                                                    </p>
                                                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                                    {action.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/* ─── Two Column: Recent Requests + Audit Logs ─ */}
            <div className="grid gap-5 lg:grid-cols-2">
                {/* Recent Requests */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <ClipboardList className="h-4 w-4 text-blue-500" />
                                    คำขอเบิกล่าสุด
                                </CardTitle>
                                <CardDescription>คำขอเบิกครุภัณฑ์ที่สร้างล่าสุด</CardDescription>
                            </div>
                            <Link
                                href="/requests"
                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                            >
                                ดูทั้งหมด
                                <ArrowUpRight className="h-3 w-3" />
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                        {recentRequests.length === 0 ? (
                            <div className="text-center py-8">
                                <ClipboardList className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground">ยังไม่มีคำขอเบิกครุภัณฑ์</p>
                                <Link
                                    href="/requests"
                                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1 inline-block"
                                >
                                    สร้างคำขอใหม่ →
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {recentRequests.map((req) => (
                                    <Link key={req.id} href="/requests" className="block">
                                        <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition group">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                                req.status === "APPROVED" ? "bg-emerald-50 dark:bg-emerald-900/20" :
                                                req.status === "REJECTED" ? "bg-red-50 dark:bg-red-900/20" :
                                                req.status === "RETURNED" ? "bg-gray-50 dark:bg-gray-800" :
                                                "bg-amber-50 dark:bg-amber-900/20"
                                            }`}>
                                                {req.status === "APPROVED" ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> :
                                                 req.status === "REJECTED" ? <XCircle className="h-4 w-4 text-red-500" /> :
                                                 req.status === "RETURNED" ? <Package className="h-4 w-4 text-gray-500" /> :
                                                 <AlertCircle className="h-4 w-4 text-amber-500" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                    {req.asset.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {req.user.name} · {req.status} ·{" "}
                                                    {new Date(req.createdAt).toLocaleDateString("th-TH", {
                                                        month: "short",
                                                        day: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </p>
                                            </div>
                                            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition shrink-0" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Recent Audit Logs */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <ScrollText className="h-4 w-4 text-emerald-500" />
                                    Audit Logs ล่าสุด
                                </CardTitle>
                                <CardDescription>ประวัติการเปลี่ยนแปลงในระบบ</CardDescription>
                            </div>
                            {isAdmin && (
                                <Link
                                    href="/admin/audit-logs"
                                    className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                                >
                                    ดูทั้งหมด
                                    <ArrowUpRight className="h-3 w-3" />
                                </Link>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                        {recentAuditLogs.length === 0 ? (
                            <div className="text-center py-8">
                                <ScrollText className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground">ยังไม่มีประวัติการเปลี่ยนแปลง</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {recentAuditLogs.map((log) => (
                                    <div key={log.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
                                            <ScrollText className="h-4 w-4 text-emerald-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                {log.action} — {log.entity}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {log.user.name} ·{" "}
                                                {new Date(log.createdAt).toLocaleDateString("th-TH", {
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* ─── System Info (Admin Only) ────────────── */}
            {isAdmin && (
                <Card className="border-dashed">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <Server className="h-4 w-4 text-gray-500" />
                            ข้อมูลระบบ
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
                            {[
                                { label: "Next.js", value: "16.x" },
                                { label: "React", value: "19.x" },
                                { label: "Prisma", value: "7.x" },
                                { label: "Database", value: "PostgreSQL" },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-center justify-between sm:flex-col sm:items-start gap-1 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
                                >
                                    <span className="text-xs text-muted-foreground">{item.label}</span>
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
