"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { LayoutDashboard, QrCode, ShieldCheck } from "lucide-react"

interface SlideData {
    icon: React.ElementType
    title: string
    description: string
    image: string
}

const slides: SlideData[] = [
    {
        icon: LayoutDashboard,
        title: "จัดการครุภัณฑ์ทั้งองค์กร",
        description:
            "ติดตาม ตรวจสอบ และบริหารครุภัณฑ์ทุกชิ้นขององค์กรได้ในที่เดียว พร้อม Dashboard แบบ Real-time",
        image:
            "https://images.unsplash.com/photo-1664575602276-acd073f104c1?w=1200&h=1600&fit=crop&q=80",
    },
    {
        icon: QrCode,
        title: "สแกน QR Code ง่ายทุกที่",
        description:
            "ติดป้าย QR Code บนครุภัณฑ์ทุกชิ้น สแกนเพื่อดูข้อมูล ประวัติ และสถานะได้ทันทีจากมือถือ",
        image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=1600&fit=crop&q=80",
    },
    {
        icon: ShieldCheck,
        title: "ระบบสิทธิ์และความปลอดภัย",
        description:
            "จัดการสิทธิ์ผู้ใช้งานด้วย Role-Based Access Control และบันทึก Audit Log ทุกการเปลี่ยนแปลง",
        image:
            "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=1600&fit=crop&q=80",
    },
]

export function AuthBranding() {
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slides.length)
        }, 6000)
        return () => clearInterval(interval)
    }, [])

    const current = slides[activeIndex]
    const Icon = current.icon

    return (
        <div className="relative h-full w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    className="object-cover transition-all duration-700"
                    priority
                    sizes="50vw"
                />
                {/* Dark overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/30" />
            </div>

            {/* Content */}
            <div className="relative flex h-full flex-col justify-end p-12">
                <div className="space-y-6">
                    {/* Feature Icon + Label */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                            <Icon className="h-5 w-5 text-emerald-300" />
                        </div>
                        <span className="text-lg font-light text-emerald-300">
                            AssetFlow
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-bold leading-tight text-white">
                        {current.title}
                    </h2>

                    {/* Description */}
                    <p className="max-w-md text-lg leading-relaxed text-gray-300">
                        &ldquo;{current.description}&rdquo;
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {["Next.js", "Better Auth", "Prisma", "PostgreSQL", "Tailwind CSS"].map(
                            (tech) => (
                                <span
                                    key={tech}
                                    className="rounded-full bg-white/10 px-3 py-1 text-sm text-gray-300 backdrop-blur-sm"
                                >
                                    {tech}
                                </span>
                            )
                        )}
                    </div>
                </div>

                {/* Navigation Dots */}
                <div className="mt-8 flex items-center gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={cn(
                                "h-2 rounded-full transition-all duration-300",
                                activeIndex === index
                                    ? "w-8 bg-white"
                                    : "w-2 bg-gray-500 hover:bg-gray-400"
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}