import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Building2, Package, Users } from "lucide-react"
import { getDepartments } from "@/actions/departmentActions"
import AddDepartmentButton from "./AddDepartmentButton"
import { connection } from "next/server"

export default async function DepartmentContent() {
    await connection()
    const departments = await getDepartments()

    const totalUsers = departments.reduce((sum, d) => sum + d._count.users, 0)
    const totalAssets = departments.reduce((sum, d) => sum + d._count.assets, 0)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">แผนก</h2>
                    <p className="text-muted-foreground mt-1">จัดการแผนกและดูครุภัณฑ์ในแต่ละแผนก</p>
                </div>
                <AddDepartmentButton />
            </div>

            {/* Stats */}
            <div className="grid gap-3 sm:grid-cols-3">
                {[
                    { label: "แผนกทั้งหมด", value: departments.length, icon: Building2, color: "text-purple-600" },
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
                {departments.map((dept) => (
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
                                    <span>{dept._count.users} คน</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Package className="h-4 w-4" />
                                    <span>{dept._count.assets} ชิ้น</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
