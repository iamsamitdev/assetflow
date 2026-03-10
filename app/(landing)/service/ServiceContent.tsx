import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PackageSearch,
  Wrench,
  GraduationCap,
  Headset,
  ArrowRight,
  CheckCircle2,
  Rocket,
} from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: PackageSearch,
    title: "ติดตั้งและตั้งค่าระบบ",
    description:
      "ทีมผู้เชี่ยวชาญช่วยติดตั้ง AssetFlow ให้พร้อมใช้งาน พร้อมนำเข้าข้อมูลครุภัณฑ์เดิมของคุณ",
    features: [
      "วิเคราะห์ความต้องการองค์กร",
      "ตั้งค่าหมวดหมู่และสิทธิ์ผู้ใช้",
      "นำเข้าข้อมูลจาก Excel / CSV",
      "ทดสอบระบบก่อนใช้งานจริง",
    ],
  },
  {
    icon: Wrench,
    title: "ปรับแต่งตามองค์กร",
    description:
      "ออกแบบและพัฒนาฟีเจอร์เพิ่มเติมให้ตรงกับ workflow เฉพาะขององค์กรคุณ",
    features: [
      "เพิ่มฟิลด์ข้อมูลตามต้องการ",
      "สร้างรายงานเฉพาะทาง",
      "เชื่อมต่อกับระบบอื่น (API)",
      "ปรับ UI / แบรนด์ขององค์กร",
    ],
  },
  {
    icon: GraduationCap,
    title: "อบรมและให้ความรู้",
    description:
      "หลักสูตรอบรมครบวงจร ตั้งแต่ผู้ใช้งานทั่วไปจนถึงผู้ดูแลระบบ",
    features: [
      "อบรม On-site / Online",
      "คู่มือการใช้งานฉบับสมบูรณ์",
      "วิดีโอสอนใช้งานทุกฟีเจอร์",
      "Workshop ปฏิบัติจริง",
    ],
  },
  {
    icon: Headset,
    title: "ดูแลและสนับสนุน",
    description:
      "บริการดูแลหลังการขายตลอด 24/7 พร้อมอัปเดตฟีเจอร์ใหม่อย่างต่อเนื่อง",
    features: [
      "ทีมซัพพอร์ต 24/7",
      "แก้ไขปัญหาเร่งด่วนภายใน 1 ชม.",
      "อัปเดตระบบอัตโนมัติ",
      "สำรองข้อมูลรายวัน",
    ],
  },
]

const plans = [
  {
    name: "Starter",
    price: "ฟรี",
    description: "สำหรับองค์กรขนาดเล็กที่เริ่มต้นใช้งาน",
    features: ["ครุภัณฑ์ไม่เกิน 100 รายการ", "ผู้ใช้ 3 คน", "รายงานพื้นฐาน", "อีเมลซัพพอร์ต"],
    highlight: false,
  },
  {
    name: "Professional",
    price: "฿1,990/เดือน",
    description: "สำหรับองค์กรที่ต้องการฟีเจอร์ครบครัน",
    features: ["ครุภัณฑ์ไม่จำกัด", "ผู้ใช้ 20 คน", "รายงานขั้นสูง", "QR Code", "ซัพพอร์ต 24/7"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "ติดต่อเรา",
    description: "สำหรับองค์กรขนาดใหญ่ที่ต้องการปรับแต่งเต็มรูปแบบ",
    features: ["ทุกอย่างใน Pro", "ผู้ใช้ไม่จำกัด", "API เชื่อมต่อ", "ปรับแต่งเฉพาะองค์กร", "ผู้ดูแลเฉพาะทาง"],
    highlight: false,
  },
]

export default function ServiceContent() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 px-4 py-1 text-sm font-medium mb-4">
            บริการ
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            บริการ<span className="text-emerald-500">ครบวงจร</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AssetFlow ให้บริการตั้งแต่ติดตั้ง อบรม ปรับแต่ง ไปจนถึงดูแลระบบ
            เพื่อให้คุณใช้งานได้อย่างมั่นใจ
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {services.map((service) => (
            <Card
              key={service.title}
              className="hover:shadow-lg hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing Section */}
        <div className="text-center mb-12">
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 px-4 py-1 text-sm font-medium mb-4">
            แพ็กเกจ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            เลือกแพ็กเกจที่<span className="text-emerald-500">เหมาะกับคุณ</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            เริ่มต้นฟรี อัปเกรดเมื่อพร้อม
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          {plans.map((plan) => (
            <div key={plan.name} className="relative flex flex-col">
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-emerald-500 text-white px-3 py-1">
                    <Rocket className="w-3 h-3 mr-1" />
                    แนะนำ
                  </Badge>
                </div>
              )}
            <Card
              className={`relative flex flex-col flex-1 transition-all duration-300 hover:shadow-lg ${
                plan.highlight
                  ? "border-emerald-500 dark:border-emerald-400 shadow-md scale-[1.02]"
                  : "hover:border-emerald-200 dark:hover:border-emerald-800"
              }`}
            >
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <p className="text-3xl font-bold mt-2">{plan.price}</p>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <ul className="space-y-2 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.highlight
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                      : ""
                  }`}
                  variant={plan.highlight ? "default" : "outline"}
                  asChild
                >
                  <Link href="/contact">
                    เริ่มต้นใช้งาน
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
