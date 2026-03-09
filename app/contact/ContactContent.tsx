"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { useState } from "react"

const contactInfo = [
  {
    icon: Mail,
    title: "อีเมล",
    detail: "info@assetflow.com",
    description: "ตอบกลับภายใน 24 ชั่วโมง",
  },
  {
    icon: Phone,
    title: "โทรศัพท์",
    detail: "02-xxx-xxxx",
    description: "จันทร์ - ศุกร์ 9:00 - 18:00",
  },
  {
    icon: MapPin,
    title: "ที่อยู่",
    detail: "กรุงเทพมหานคร",
    description: "ประเทศไทย",
  },
]

export default function ContactContent() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 px-4 py-1 text-sm font-medium mb-4">
            ติดต่อเรา
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            พร้อม<span className="text-emerald-500">ให้บริการ</span>คุณ
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            มีคำถามหรือข้อเสนอแนะ? ทีมงาน AssetFlow ยินดีรับฟังและช่วยเหลือคุณ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-2">ช่องทางการติดต่อ</h2>
            <p className="text-muted-foreground mb-6">
              เลือกช่องทางที่สะดวกสำหรับคุณ หรือกรอกแบบฟอร์มด้านข้าง
            </p>

            {contactInfo.map((item) => (
              <Card
                key={item.title}
                className="hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300"
              >
                <CardContent className="flex items-center gap-4 py-5">
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm">{item.detail}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <Card className="border-emerald-100 dark:border-emerald-900">
            <CardHeader>
              <CardTitle>ส่งข้อความถึงเรา</CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">ส่งข้อความสำเร็จ!</h3>
                  <p className="text-muted-foreground">ขอบคุณที่ติดต่อเรา เราจะตอบกลับโดยเร็วที่สุด</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setSubmitted(false)}
                  >
                    ส่งข้อความอีกครั้ง
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">ชื่อ-นามสกุล</Label>
                      <Input id="name" placeholder="กรอกชื่อของคุณ" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">อีเมล</Label>
                      <Input id="email" type="email" placeholder="you@example.com" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">หัวข้อ</Label>
                    <Input id="subject" placeholder="หัวข้อที่ต้องการติดต่อ" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">ข้อความ</Label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="รายละเอียดที่ต้องการแจ้ง..."
                      required
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    ส่งข้อความ
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
