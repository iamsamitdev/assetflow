import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollText, Search, Plus, Pencil, Trash2, CheckCircle2, XCircle } from "lucide-react"

// ─── Mock Data (จะเปลี่ยนเป็นดึงจาก Prisma จริงทีหลัง) ───
const mockAuditLogs = [
    { id: "1", action: "CREATE", entity: "Asset", entityId: "asset-001", user: { name: "สมชาย ใจดี" }, details: { name: "MacBook Pro 16\" M3" }, createdAt: new Date("2026-03-10T10:00:00") },
    { id: "2", action: "APPROVE", entity: "RequestLog", entityId: "req-002", user: { name: "สมชาย ใจดี" }, details: { asset: 'Dell Monitor 27"', requester: "วิชัย สมบูรณ์" }, createdAt: new Date("2026-03-09T14:20:00") },
    { id: "3", action: "UPDATE", entity: "Asset", entityId: "asset-003", user: { name: "สมชาย ใจดี" }, details: { field: "status", from: "AVAILABLE", to: "MAINTENANCE" }, createdAt: new Date("2026-03-09T09:30:00") },
    { id: "4", action: "REJECT", entity: "RequestLog", entityId: "req-003", user: { name: "สมชาย ใจดี" }, details: { asset: 'iPad Pro 13"', requester: "นภา ศรีสุข" }, createdAt: new Date("2026-03-08T15:00:00") },
    { id: "5", action: "CREATE", entity: "Department", entityId: "dept-006", user: { name: "สมชาย ใจดี" }, details: { name: "ฝ่ายบัญชีและการเงิน" }, createdAt: new Date("2026-03-07T11:45:00") },
    { id: "6", action: "DELETE", entity: "Asset", entityId: "asset-010", user: { name: "สมชาย ใจดี" }, details: { name: "Canon EOS R6 Mark II" }, createdAt: new Date("2026-03-06T16:30:00") },
    { id: "7", action: "UPDATE", entity: "User", entityId: "user-004", user: { name: "สมชาย ใจดี" }, details: { field: "role", from: "user", to: "employee" }, createdAt: new Date("2026-03-05T10:15:00") },
    { id: "8", action: "CREATE", entity: "Asset", entityId: "asset-020", user: { name: "สมชาย ใจดี" }, details: { name: "Logitech MX Keys" }, createdAt: new Date("2026-03-04T14:00:00") },
]

const actionConfig: Record<string, { label: string; icon: typeof Plus; className: string }> = {
    CREATE: { label: "CREATE", icon: Plus, className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
    UPDATE: { label: "UPDATE", icon: Pencil, className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
    DELETE: { label: "DELETE", icon: Trash2, className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
    APPROVE: { label: "APPROVE", icon: CheckCircle2, className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
    REJECT: { label: "REJECT", icon: XCircle, className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
}

export default function AuditLogContent() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Audit Logs</h2>
                    <p className="text-muted-foreground mt-1">ประวัติการเปลี่ยนแปลงและการเบิกจ่ายครุภัณฑ์ทั้งหมด</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="ค้นหา Audit Log..."
                        className="pl-9 pr-4 py-2 text-sm border rounded-lg bg-background w-50 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            {/* Log Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <ScrollText className="h-4 w-4" />
                        รายการล่าสุด ({mockAuditLogs.length} รายการ)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-left text-muted-foreground">
                                    <th className="pb-3 font-medium">วันที่</th>
                                    <th className="pb-3 font-medium">Action</th>
                                    <th className="pb-3 font-medium">Entity</th>
                                    <th className="pb-3 font-medium">รายละเอียด</th>
                                    <th className="pb-3 font-medium">ผู้ดำเนินการ</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {mockAuditLogs.map((log) => {
                                    const action = actionConfig[log.action] || actionConfig.CREATE
                                    const ActionIcon = action.icon
                                    return (
                                        <tr key={log.id} className="hover:bg-muted/50 transition">
                                            <td className="py-3 text-muted-foreground whitespace-nowrap">
                                                {log.createdAt.toLocaleDateString("th-TH", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                                            </td>
                                            <td className="py-3">
                                                <Badge variant="secondary" className={`inline-flex items-center gap-1 ${action.className}`}>
                                                    <ActionIcon className="h-3 w-3" />
                                                    {action.label}
                                                </Badge>
                                            </td>
                                            <td className="py-3">
                                                <span className="font-medium text-gray-900 dark:text-white">{log.entity}</span>
                                                <span className="text-muted-foreground ml-1 text-xs">({log.entityId})</span>
                                            </td>
                                            <td className="py-3 text-muted-foreground text-xs max-w-64 truncate">
                                                {JSON.stringify(log.details)}
                                            </td>
                                            <td className="py-3">{log.user.name}</td>
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
