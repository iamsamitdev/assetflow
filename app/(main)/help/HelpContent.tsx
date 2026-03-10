import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { HelpCircle, Package, ClipboardList, Building2, Users, Shield, ScrollText } from "lucide-react"

const faqs = [
    {
        question: "วิธีเบิกครุภัณฑ์ทำอย่างไร?",
        answer: "ไปที่เมนู Requests > กดปุ่ม 'สร้างคำขอใหม่' > เลือกครุภัณฑ์และระบุเหตุผล > รอ Admin อนุมัติ",
        icon: ClipboardList,
    },
    {
        question: "สถานะครุภัณฑ์มีอะไรบ้าง?",
        answer: "AVAILABLE = พร้อมใช้งาน, IN_USE = กำลังใช้งาน, MAINTENANCE = ซ่อมบำรุง, RETIRED = ปลดระวางแล้ว",
        icon: Package,
    },
    {
        question: "ใครสามารถอนุมัติคำขอเบิกได้?",
        answer: "เฉพาะผู้ใช้ที่มี role เป็น admin เท่านั้นที่สามารถอนุมัติหรือปฏิเสธคำขอเบิกครุภัณฑ์ได้",
        icon: Shield,
    },
    {
        question: "แผนกคืออะไร?",
        answer: "แผนกใช้สำหรับจัดกลุ่มครุภัณฑ์ตามหน่วยงาน แต่ละแผนกจะมีครุภัณฑ์และผู้ใช้ที่สังกัดอยู่",
        icon: Building2,
    },
    {
        question: "Audit Log คืออะไร?",
        answer: "Audit Log คือประวัติการเปลี่ยนแปลงทั้งหมดในระบบ เช่น การสร้าง/แก้ไข/ลบครุภัณฑ์ การอนุมัติ/ปฏิเสธคำขอ ระบบจะบันทึกอัตโนมัติ",
        icon: ScrollText,
    },
    {
        question: "ต้องการเปลี่ยน Role ผู้ใช้ ทำอย่างไร?",
        answer: "Admin สามารถเปลี่ยน Role ได้ที่หน้า Users โดยคลิกที่ชื่อผู้ใช้แล้วเลือก Role ใหม่ (admin, employee, user)",
        icon: Users,
    },
]

export default function HelpContent() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">ช่วยเหลือ</h2>
                <p className="text-muted-foreground mt-1">คำถามที่พบบ่อยและคู่มือการใช้งานระบบ Asset Flow</p>
            </div>

            {/* Quick Guide */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <HelpCircle className="h-4 w-4" />
                        เริ่มต้นใช้งาน
                    </CardTitle>
                    <CardDescription>ภาพรวมขั้นตอนการใช้ระบบ</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            { step: "1", title: "ดู Dashboard", desc: "ดูสรุปสถิติครุภัณฑ์และคำขอล่าสุด" },
                            { step: "2", title: "ดูครุภัณฑ์", desc: "เรียกดูรายการครุภัณฑ์ทั้งหมดในระบบ" },
                            { step: "3", title: "สร้างคำขอเบิก", desc: "เลือกครุภัณฑ์และระบุเหตุผลการเบิก" },
                            { step: "4", title: "รออนุมัติ", desc: "Admin จะตรวจสอบและอนุมัติคำขอ" },
                        ].map((item) => (
                            <div key={item.step} className="flex items-start gap-3 p-3 rounded-lg border">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                                    {item.step}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* FAQ */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">คำถามที่พบบ่อย</h3>
                <div className="grid gap-4">
                    {faqs.map((faq, i) => {
                        const Icon = faq.icon
                        return (
                            <Card key={i}>
                                <CardContent className="p-5">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-lg bg-muted shrink-0">
                                            <Icon className="h-4 w-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{faq.question}</p>
                                            <p className="text-sm text-muted-foreground mt-1">{faq.answer}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>

            {/* Contact */}
            <Card className="border-dashed">
                <CardContent className="p-6 text-center">
                    <HelpCircle className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">ยังมีคำถามอื่นหรือไม่?</p>
                    <p className="text-xs text-muted-foreground mt-1">ติดต่อ Admin หรือส่งอีเมลมาที่ support@assetflow.example.com</p>
                </CardContent>
            </Card>
        </div>
    )
}
