import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, Heart } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "พันธกิจ",
    description:
      "พัฒนาระบบจัดการครุภัณฑ์ที่ใช้งานง่าย ลดขั้นตอนการทำงาน และเพิ่มประสิทธิภาพการบริหารสินทรัพย์ขององค์กร",
  },
  {
    icon: Eye,
    title: "วิสัยทัศน์",
    description:
      "เป็นแพลตฟอร์มจัดการครุภัณฑ์อันดับ 1 ที่องค์กรทุกขนาดไว้วางใจ ด้วยเทคโนโลยีที่ทันสมัยและปลอดภัย",
  },
  {
    icon: Heart,
    title: "คุณค่า",
    description:
      "เราเชื่อในความโปร่งใส ความง่าย และการทำงานร่วมกัน เพื่อให้ทุกองค์กรบริหารทรัพย์สินได้อย่างมีประสิทธิภาพ",
  },
]

const stats = [
  { value: "500+", label: "องค์กรที่ใช้งาน" },
  { value: "50,000+", label: "ครุภัณฑ์ในระบบ" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "ทีมสนับสนุน" },
]

export default function AboutContent() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 px-4 py-1 text-sm font-medium mb-4">
            เกี่ยวกับเรา
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            เรื่องราวของ <span className="text-emerald-500">AssetFlow</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AssetFlow ถูกพัฒนาขึ้นเพื่อแก้ปัญหาการจัดการครุภัณฑ์แบบเดิมๆ
            ที่ซับซ้อนและเสียเวลา ด้วยทีมงานที่มีประสบการณ์ด้านเทคโนโลยีและการบริหารสินทรัพย์
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {values.map((item) => (
            <Card
              key={item.title}
              className="text-center hover:shadow-lg hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300"
            >
              <CardContent className="pt-8 pb-6">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="rounded-2xl bg-emerald-500 dark:bg-emerald-600 p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center text-white">
                <p className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-emerald-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
