import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, Plus, CheckCircle2, XCircle, AlertCircle, RotateCcw } from "lucide-react"
import Link from "next/link"

// ─── Mock Data (จะเปลี่ยนเป็นดึงจาก Prisma จริงทีหลัง) ───
const mockRequests = [
    { id: "1", status: "PENDING" as const, reason: "ต้องใช้สำหรับโปรเจกต์ใหม่", asset: { name: "MacBook Pro 16\" M3" }, user: { name: "สมหญิง รักเรียน" }, createdAt: new Date("2026-03-10T09:30:00"), approvedBy: null },
    { id: "2", status: "APPROVED" as const, reason: "จอเดิมเสีย ต้องเปลี่ยนใหม่", asset: { name: 'Dell Monitor 27"' }, user: { name: "วิชัย สมบูรณ์" }, createdAt: new Date("2026-03-09T14:15:00"), approvedBy: { name: "สมชาย ใจดี" } },
    { id: "3", status: "REJECTED" as const, reason: "ต้องการ iPad สำหรับนำเสนองานลูกค้า", asset: { name: 'iPad Pro 13"' }, user: { name: "นภา ศรีสุข" }, createdAt: new Date("2026-03-09T11:00:00"), approvedBy: { name: "สมชาย ใจดี" } },
    { id: "4", status: "APPROVED" as const, reason: "คีย์บอร์ดเดิมพัง", asset: { name: "Logitech MX Keys" }, user: { name: "ธนพล จิตดี" }, createdAt: new Date("2026-03-08T16:45:00"), approvedBy: { name: "สมชาย ใจดี" } },
    { id: "5", status: "RETURNED" as const, reason: "คืนเครื่องพิมพ์หลังโปรเจกต์จบ", asset: { name: "HP LaserJet Pro" }, user: { name: "พิมพ์ใจ สุขสันต์" }, createdAt: new Date("2026-03-08T10:20:00"), approvedBy: { name: "สมชาย ใจดี" } },
]

const statusConfig = {
    PENDING: { label: "รออนุมัติ", icon: AlertCircle, className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
    APPROVED: { label: "อนุมัติแล้ว", icon: CheckCircle2, className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
    REJECTED: { label: "ปฏิเสธ", icon: XCircle, className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
    RETURNED: { label: "คืนแล้ว", icon: RotateCcw, className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400" },
}

export default function RequestContent() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">คำขอเบิกครุภัณฑ์</h2>
                    <p className="text-muted-foreground mt-1">จัดการคำขอเบิกและคืนครุภัณฑ์</p>
                </div>
                <Link
                    href="/requests"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition"
                >
                    <Plus className="h-4 w-4" />
                    สร้างคำขอใหม่
                </Link>
            </div>

            {/* Stats */}
            <div className="grid gap-3 sm:grid-cols-4">
                {[
                    { label: "ทั้งหมด", value: mockRequests.length, color: "text-gray-900 dark:text-white" },
                    { label: "รออนุมัติ", value: mockRequests.filter(r => r.status === "PENDING").length, color: "text-amber-600" },
                    { label: "อนุมัติแล้ว", value: mockRequests.filter(r => r.status === "APPROVED").length, color: "text-emerald-600" },
                    { label: "ปฏิเสธ", value: mockRequests.filter(r => r.status === "REJECTED").length, color: "text-red-600" },
                ].map((s) => (
                    <Card key={s.label}>
                        <CardContent className="p-4 text-center">
                            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Request List */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <ClipboardList className="h-4 w-4" />
                        รายการคำขอ
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-left text-muted-foreground">
                                    <th className="pb-3 font-medium">ครุภัณฑ์</th>
                                    <th className="pb-3 font-medium">ผู้ขอ</th>
                                    <th className="pb-3 font-medium">เหตุผล</th>
                                    <th className="pb-3 font-medium">สถานะ</th>
                                    <th className="pb-3 font-medium">วันที่</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {mockRequests.map((req) => {
                                    const status = statusConfig[req.status]
                                    const StatusIcon = status.icon
                                    return (
                                        <tr key={req.id} className="hover:bg-muted/50 transition">
                                            <td className="py-3 font-medium text-gray-900 dark:text-white">{req.asset.name}</td>
                                            <td className="py-3">{req.user.name}</td>
                                            <td className="py-3 text-muted-foreground max-w-50 truncate">{req.reason}</td>
                                            <td className="py-3">
                                                <Badge variant="secondary" className={`inline-flex items-center gap-1 ${status.className}`}>
                                                    <StatusIcon className="h-3 w-3" />
                                                    {status.label}
                                                </Badge>
                                            </td>
                                            <td className="py-3 text-muted-foreground">
                                                {req.createdAt.toLocaleDateString("th-TH", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
