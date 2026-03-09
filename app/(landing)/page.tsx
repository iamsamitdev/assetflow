import Hero from "@/app/(landing)/Hero"
import Features from "@/app/(landing)/Features"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "AssetFlow - ระบบจัดการครุภัณฑ์อัจฉริยะ",
  description:
    "AssetFlow คือระบบจัดการครุภัณฑ์ที่ช่วยให้องค์กรของคุณสามารถติดตามและบริหารจัดการทรัพย์สินได้อย่างมีประสิทธิภาพ ด้วยฟีเจอร์สแกน QR Code ค้นหาอัจฉริยะ และรายงานอัตโนมัติ",
  keywords: [
    "AssetFlow",
    "ระบบจัดการครุภัณฑ์",
    "สแกน QR Code",
    "ค้นหาอัจฉริยะ",
    "รายงานอัตโนมัติ",
    "จัดการผู้รับผิดชอบ",
    "แจ้งเตือนอัตโนมัติ",
    "ความปลอดภัยสูง",
    "Dashboard วิเคราะห์",
    "ปรับแต่งได้ยืดหยุ่น",
  ]
}

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
    </>
  )
}
