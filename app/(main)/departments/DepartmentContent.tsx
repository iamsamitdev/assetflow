import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Building2, Package, Users, Plus } from "lucide-react"
import Link from "next/link"

// ─── Mock Data (จะเปลี่ยนเป็นดึงจาก Prisma จริงทีหลัง) ───
const mockDepartments = [
    { id: "1", name: "ฝ่ายพัฒนาซอฟต์แวร์", code: "DEV", userCount: 8, assetCount: 25 },
    { id: "2", name: "ฝ่ายออกแบบ", code: "DSG", userCount: 5, assetCount: 15 },
    { id: "3", name: "ฝ่ายการตลาด", code: "MKT", userCount: 4, assetCount: 12 },
    { id: "4", name: "ฝ่ายธุรการ", code: "ADM", userCount: 3, assetCount: 18 },
    { id: "5", name: "ฝ่ายสื่อสารองค์กร", code: "COM", userCount: 3, assetCount: 10 },
    { id: "6", name: "ฝ่ายบัญชีและการเงิน", code: "FIN", userCount: 2, assetCount: 8 },
]

export default function DepartmentContent() {
    const totalUsers = mockDepartments.reduce((sum, d) => sum + d.userCount, 0)
    const totalAssets = mockDepartments.reduce((sum, d) => sum + d.assetCount, 0)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">แผนก</h2>
                    <p className="text-muted-foreground mt-1">จัดการแผนกและดูครุภัณฑ์ในแต่ละแผนก</p>
                </div>
                <Link
                    href="/departments"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition"
                >
                    <Plus className="h-4 w-4" />
                    เพิ่มแผนก
                </Link>
            </div>

            {/* Stats */}
            <div className="grid gap-3 sm:grid-cols-3">
                {[
                    { label: "แผนกทั้งหมด", value: mockDepartments.length, icon: Building2, color: "text-purple-600" },
                    { label: "บุคลากรรวม", value: totalUsers, icon: Users, color: "text-blue-600" },
                    { label: "ครุภัณฑ์รวม", value: totalAssets, icon: Package, color: "text-emerald-600" },
                ].map((s) => (
                    <Card key={s.label}>
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-muted">
                                <s.icon className={`h-5 w-5 ${s.color}`} />
                            </div>
                            <div>
                                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                                <p className="text-xs text-muted-foreground">{s.label}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Department Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mockDepartments.map((dept) => (
                    <Card key={dept.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base">{dept.name}</CardTitle>
                                <span className="text-xs font-mono px-2 py-1 rounded bg-muted text-muted-foreground">{dept.code}</span>
                            </div>
                            <CardDescription>รหัสแผนก: {dept.code}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span>{dept.userCount} คน</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Package className="h-4 w-4" />
                                    <span>{dept.assetCount} ชิ้น</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
