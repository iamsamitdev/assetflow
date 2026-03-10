import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Shield, Search } from "lucide-react"

// ─── Mock Data (จะเปลี่ยนเป็นดึงจาก Prisma จริงทีหลัง) ───
const mockUsers = [
    { id: "1", name: "สมชาย ใจดี", email: "somchai@example.com", role: "admin" as const, department: "ฝ่ายพัฒนาซอฟต์แวร์", banned: false, createdAt: new Date("2026-01-15") },
    { id: "2", name: "สมหญิง รักเรียน", email: "somying@example.com", role: "employee" as const, department: "ฝ่ายพัฒนาซอฟต์แวร์", banned: false, createdAt: new Date("2026-01-20") },
    { id: "3", name: "วิชัย สมบูรณ์", email: "wichai@example.com", role: "employee" as const, department: "ฝ่ายออกแบบ", banned: false, createdAt: new Date("2026-02-01") },
    { id: "4", name: "นภา ศรีสุข", email: "napa@example.com", role: "user" as const, department: "ฝ่ายการตลาด", banned: false, createdAt: new Date("2026-02-10") },
    { id: "5", name: "ธนพล จิตดี", email: "thanapon@example.com", role: "employee" as const, department: "ฝ่ายธุรการ", banned: false, createdAt: new Date("2026-02-15") },
    { id: "6", name: "พิมพ์ใจ สุขสันต์", email: "pimjai@example.com", role: "user" as const, department: "ฝ่ายสื่อสารองค์กร", banned: true, createdAt: new Date("2026-03-01") },
]

const roleConfig = {
    admin: { label: "Admin", className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
    employee: { label: "Employee", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
    user: { label: "User", className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400" },
}

export default function UserContent() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">จัดการผู้ใช้</h2>
                    <p className="text-muted-foreground mt-1">ดูและจัดการผู้ใช้ทั้งหมดในระบบ</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="ค้นหาผู้ใช้..."
                        className="pl-9 pr-4 py-2 text-sm border rounded-lg bg-background w-50 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-3 sm:grid-cols-3">
                {[
                    { label: "ผู้ใช้ทั้งหมด", value: mockUsers.length, icon: Users, color: "text-blue-600" },
                    { label: "Admin", value: mockUsers.filter(u => u.role === "admin").length, icon: Shield, color: "text-purple-600" },
                    { label: "ถูกระงับ", value: mockUsers.filter(u => u.banned).length, icon: Shield, color: "text-red-600" },
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

            {/* User Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        รายชื่อผู้ใช้
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-left text-muted-foreground">
                                    <th className="pb-3 font-medium">ชื่อ</th>
                                    <th className="pb-3 font-medium">อีเมล</th>
                                    <th className="pb-3 font-medium">แผนก</th>
                                    <th className="pb-3 font-medium">Role</th>
                                    <th className="pb-3 font-medium">สถานะ</th>
                                    <th className="pb-3 font-medium">วันที่สมัคร</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {mockUsers.map((user) => {
                                    const role = roleConfig[user.role]
                                    return (
                                        <tr key={user.id} className="hover:bg-muted/50 transition">
                                            <td className="py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                                        {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                                                    </div>
                                                    <span className="font-medium text-gray-900 dark:text-white">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 text-muted-foreground">{user.email}</td>
                                            <td className="py-3">{user.department}</td>
                                            <td className="py-3">
                                                <Badge variant="secondary" className={role.className}>{role.label}</Badge>
                                            </td>
                                            <td className="py-3">
                                                {user.banned ? (
                                                    <Badge variant="destructive" className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">ถูกระงับ</Badge>
                                                ) : (
                                                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">ปกติ</Badge>
                                                )}
                                            </td>
                                            <td className="py-3 text-muted-foreground">
                                                {user.createdAt.toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" })}
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
