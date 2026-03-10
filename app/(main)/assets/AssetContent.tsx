import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Search } from "lucide-react"
import { getAssets, getAssetStats } from "@/actions/assetActions"
import { getDepartments } from "@/actions/departmentActions"
import AddAssetButton from "./AddAssetButton"

const statusConfig = {
    AVAILABLE: { label: "พร้อมใช้งาน", variant: "default" as const, className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
    IN_USE: { label: "กำลังใช้งาน", variant: "secondary" as const, className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
    MAINTENANCE: { label: "ซ่อมบำรุง", variant: "outline" as const, className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
    RETIRED: { label: "ปลดระวาง", variant: "destructive" as const, className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
}

export default async function AssetContent() {
    const [assets, assetStats, departments] = await Promise.all([
        getAssets(),
        getAssetStats(),
        getDepartments(),
    ])

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">ครุภัณฑ์</h2>
                    <p className="text-muted-foreground mt-1">จัดการรายการครุภัณฑ์ทั้งหมดในระบบ</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="ค้นหาครุภัณฑ์..."
                            className="pl-9 pr-4 py-2 text-sm border rounded-lg bg-background w-50 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <AddAssetButton departments={departments.map(d => ({ id: d.id, name: d.name, code: d.code }))} />
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid gap-3 sm:grid-cols-4">
                {[
                    { label: "ทั้งหมด", value: assetStats.total, color: "text-gray-900 dark:text-white" },
                    { label: "พร้อมใช้งาน", value: assetStats.available, color: "text-emerald-600" },
                    { label: "กำลังใช้งาน", value: assetStats.inUse, color: "text-blue-600" },
                    { label: "ซ่อมบำรุง", value: assetStats.maintenance, color: "text-amber-600" },
                ].map((s) => (
                    <Card key={s.label}>
                        <CardContent className="p-4 text-center">
                            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Asset Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        รายการครุภัณฑ์
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-left text-muted-foreground">
                                    <th className="pb-3 font-medium">ชื่อครุภัณฑ์</th>
                                    <th className="pb-3 font-medium">Serial Number</th>
                                    <th className="pb-3 font-medium">แผนก</th>
                                    <th className="pb-3 font-medium">สถานะ</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {assets.map((asset) => {
                                    const status = statusConfig[asset.status]
                                    return (
                                        <tr key={asset.id} className="hover:bg-muted/50 transition">
                                            <td className="py-3">
                                                <p className="font-medium text-gray-900 dark:text-white">{asset.name}</p>
                                                <p className="text-xs text-muted-foreground">{asset.description}</p>
                                            </td>
                                            <td className="py-3 font-mono text-xs">{asset.serialNumber}</td>
                                            <td className="py-3">{asset.department.name}</td>
                                            <td className="py-3">
                                                <Badge variant={status.variant} className={status.className}>
                                                    {status.label}
                                                </Badge>
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
