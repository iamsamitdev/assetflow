import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ShieldCheck,
  Search,
  QrCode,
  FileText,
  Users,
  Bell,
  Settings,
  TrendingUp,
} from "lucide-react"

const features = [
  {
    icon: QrCode,
    title: "สแกน QR Code",
    description: "สแกนเพื่อเข้าถึงข้อมูลครุภัณฑ์ได้ทันที ลดเวลาการค้นหา",
    badge: "ยอดนิยม",
  },
  {
    icon: Search,
    title: "ค้นหาอัจฉริยะ",
    description: "ค้นหาครุภัณฑ์ด้วยชื่อ รหัส หมวดหมู่ หรือสถานที่ได้อย่างรวดเร็ว",
  },
  {
    icon: FileText,
    title: "ออกรายงานอัตโนมัติ",
    description: "สร้างรายงานสรุปครุภัณฑ์ประจำเดือน/ปี พร้อมส่งออก PDF และ Excel",
  },
  {
    icon: Users,
    title: "จัดการผู้รับผิดชอบ",
    description: "กำหนดผู้ดูแลครุภัณฑ์แต่ละรายการ พร้อมประวัติการโอนย้าย",
  },
  {
    icon: Bell,
    title: "แจ้งเตือนอัตโนมัติ",
    description: "รับการแจ้งเตือนเมื่อครุภัณฑ์ครบกำหนดตรวจสอบหรือซ่อมบำรุง",
    badge: "ใหม่",
  },
  {
    icon: ShieldCheck,
    title: "ความปลอดภัยสูง",
    description: "ระบบสิทธิ์การเข้าถึงหลายระดับ พร้อมบันทึก Log ทุกการเปลี่ยนแปลง",
  },
  {
    icon: TrendingUp,
    title: "Dashboard วิเคราะห์",
    description: "แดชบอร์ดแสดงสถิติครุภัณฑ์แบบเรียลไทม์ วิเคราะห์แนวโน้มค่าเสื่อม",
  },
  {
    icon: Settings,
    title: "ปรับแต่งได้ยืดหยุ่น",
    description: "กำหนดหมวดหมู่ สถานะ และฟิลด์ข้อมูลเพิ่มเติมตามความต้องการ",
  },
]

export default function Features() {
  return (
    <section className="py-20 px-6 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 px-4 py-1 text-sm font-medium mb-4">
            ฟีเจอร์
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ทุกสิ่งที่คุณต้องการ <span className="text-emerald-500">ในที่เดียว</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            AssetFlow มาพร้อมฟีเจอร์ครบครันที่ช่วยให้การจัดการครุภัณฑ์ขององค์กรเป็นเรื่องง่าย
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group hover:shadow-lg hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  {feature.badge && (
                    <Badge className="bg-emerald-500 text-white text-xs">
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-base">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
