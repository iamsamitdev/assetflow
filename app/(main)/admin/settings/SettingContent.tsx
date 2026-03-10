"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, Globe, Bell, Database, Shield } from "lucide-react"
import { toast } from "sonner"

export default function SettingContent() {
    const [appName, setAppName] = useState("Asset Flow")
    const [appUrl, setAppUrl] = useState("http://localhost:3000")
    const [emailNotif, setEmailNotif] = useState(true)

    const handleSave = () => {
        // TODO: เปลี่ยนเป็นบันทึกลง DB จริงทีหลัง
        toast.success("บันทึกการตั้งค่าสำเร็จ!", { position: "top-right" })
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">ตั้งค่าระบบ</h2>
                <p className="text-muted-foreground mt-1">กำหนดค่าต่างๆ ของระบบ Asset Flow</p>
            </div>

            <div className="grid gap-6 max-w-2xl">
                {/* General Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            ทั่วไป
                        </CardTitle>
                        <CardDescription>ตั้งค่าพื้นฐานของแอปพลิเคชัน</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>ชื่อแอปพลิเคชัน</Label>
                            <Input value={appName} onChange={(e) => setAppName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>URL</Label>
                            <Input value={appUrl} onChange={(e) => setAppUrl(e.target.value)} />
                        </div>
                    </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <Bell className="h-4 w-4" />
                            การแจ้งเตือน
                        </CardTitle>
                        <CardDescription>ตั้งค่าการแจ้งเตือนทางอีเมล</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={emailNotif}
                                onChange={(e) => setEmailNotif(e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300"
                            />
                            <span className="text-sm">ส่งอีเมลเมื่อมีคำขอเบิกครุภัณฑ์ใหม่</span>
                        </label>
                    </CardContent>
                </Card>

                {/* System Info */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <Database className="h-4 w-4" />
                            ข้อมูลระบบ
                        </CardTitle>
                        <CardDescription>ข้อมูลเกี่ยวกับเวอร์ชันและสถานะระบบ</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {[
                                { label: "Next.js", value: "16.x" },
                                { label: "Prisma", value: "7.x" },
                                { label: "Database", value: "PostgreSQL" },
                                { label: "Auth", value: "Better Auth" },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
                                    <span className="text-sm text-muted-foreground">{item.label}</span>
                                    <span className="text-sm font-medium">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Security */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            ความปลอดภัย
                        </CardTitle>
                        <CardDescription>ตั้งค่าความปลอดภัยของระบบ</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
                            <span className="text-sm">Session Expiry</span>
                            <span className="text-sm font-medium">7 วัน</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
                            <span className="text-sm">Account Linking</span>
                            <span className="text-sm font-medium text-emerald-600">เปิดใช้งาน</span>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button onClick={handleSave}>บันทึกการตั้งค่า</Button>
                </div>
            </div>
        </div>
    )
}
