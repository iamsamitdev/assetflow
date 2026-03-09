import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Box, ClipboardList, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-950 -z-10" />

      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        {/* Top badge */}
        <div className="flex justify-center mb-6">
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 px-4 py-1 text-sm font-medium">
            ระบบจัดการครุภัณฑ์อัจฉริยะ
          </Badge>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-center leading-tight mb-6">
          บริหารครุภัณฑ์ง่ายๆ
          <br />
          <span className="text-emerald-500">ด้วย AssetFlow</span>
        </h1>

        {/* Description */}
        <p className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          ติดตาม จัดการ และวิเคราะห์ข้อมูลครุภัณฑ์ทั้งหมดในองค์กรของคุณได้จากที่เดียว
          ลดความซ้ำซ้อน เพิ่มประสิทธิภาพการทำงาน
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8" asChild>
            <Link href="/dashboard">
              เริ่มต้นใช้งาน
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="px-8" asChild>
            <Link href="/about">เรียนรู้เพิ่มเติม</Link>
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border shadow-sm">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-4">
              <Box className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-semibold mb-2">จัดการครุภัณฑ์</h3>
            <p className="text-sm text-muted-foreground">เพิ่ม แก้ไข ลบ และค้นหาข้อมูลครุภัณฑ์ได้สะดวกรวดเร็ว</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border shadow-sm">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-4">
              <ClipboardList className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-semibold mb-2">ติดตามสถานะ</h3>
            <p className="text-sm text-muted-foreground">ตรวจสอบสถานะและประวัติการใช้งานครุภัณฑ์แบบเรียลไทม์</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border shadow-sm">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-semibold mb-2">รายงานวิเคราะห์</h3>
            <p className="text-sm text-muted-foreground">ดูรายงานสรุปและวิเคราะห์ข้อมูลครุภัณฑ์เชิงลึก</p>
          </div>
        </div>
      </div>
    </section>
  )
}
