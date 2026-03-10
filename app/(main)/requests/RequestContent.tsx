import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, CheckCircle2, XCircle, AlertCircle, RotateCcw } from "lucide-react"
import { getRequests, getRequestStats } from "@/actions/requestActions"
import { getAssets } from "@/actions/assetActions"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import AddRequestButton from "./AddRequestButton"

const statusConfig = {
    PENDING: { label: "รออนุมัติ", icon: AlertCircle, className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
    APPROVED: { label: "อนุมัติแล้ว", icon: CheckCircle2, className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
    REJECTED: { label: "ปฏิเสธ", icon: XCircle, className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
    RETURNED: { label: "คืนแล้ว", icon: RotateCcw, className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400" },
}

export default async function RequestContent() {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) redirect("/signin")

    const [requests, requestStats, allAssets] = await Promise.all([
        getRequests(),
        getRequestStats(),
        getAssets(),
    ])

    // เฉพาะครุภัณฑ์ที่พร้อมใช้งาน
    const availableAssets = allAssets
        .filter((a) => a.status === "AVAILABLE")
        .map((a) => ({ id: a.id, name: a.name, serialNumber: a.serialNumber }))

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">คำขอเบิกครุภัณฑ์</h2>
                    <p className="text-muted-foreground mt-1">จัดการคำขอเบิกและคืนครุภัณฑ์</p>
                </div>
                <AddRequestButton assets={availableAssets} userId={session.user.id} />
            </div>

            {/* Stats */}
            <div className="grid gap-3 sm:grid-cols-4">
                {[
                    { label: "ทั้งหมด", value: requestStats.total, color: "text-gray-900 dark:text-white" },
                    { label: "รออนุมัติ", value: requestStats.pending, color: "text-amber-600" },
                    { label: "อนุมัติแล้ว", value: requestStats.approved, color: "text-emerald-600" },
                    { label: "ปฏิเสธ", value: requestStats.rejected, color: "text-red-600" },
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
                                {requests.map((req) => {
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
