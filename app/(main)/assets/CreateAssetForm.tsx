"use client"

import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Package, X } from "lucide-react"
import { createAsset } from "@/actions/assetActions"

interface Department {
    id: string
    name: string
    code: string
}

interface AssetFormData {
    name: string
    description: string
    serialNumber: string
    status: "AVAILABLE" | "IN_USE" | "MAINTENANCE" | "RETIRED"
    departmentId: string
}

export default function CreateAssetForm({ departments, onClose }: { departments: Department[]; onClose: () => void }) {
    const router = useRouter()
    const form = useForm<AssetFormData>({
        defaultValues: {
            name: "",
            description: "",
            serialNumber: "",
            status: "AVAILABLE",
            departmentId: "",
        },
    })

    const handleCreate = async (data: AssetFormData) => {
        try {
            await createAsset({
                name: data.name,
                description: data.description || undefined,
                serialNumber: data.serialNumber,
                status: data.status,
                departmentId: data.departmentId,
            })
            toast.success("เพิ่มครุภัณฑ์สำเร็จ", {
                description: `${data.name} ถูกเพิ่มเข้าระบบแล้ว`,
                position: "top-right",
            })
            form.reset()
            onClose()
            router.refresh()
        } catch {
            toast.error("ไม่สามารถเพิ่มครุภัณฑ์ได้", {
                description: "กรุณาตรวจสอบข้อมูลและลองอีกครั้ง",
                position: "top-right",
            })
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <Card className="w-full max-w-lg mx-4 shadow-2xl">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                                <Package className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">เพิ่มครุภัณฑ์ใหม่</CardTitle>
                                <CardDescription>กรอกข้อมูลครุภัณฑ์ที่ต้องการเพิ่มในระบบ</CardDescription>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition">
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-4">
                        <Field>
                            <FieldLabel>ชื่อครุภัณฑ์ *</FieldLabel>
                            <Controller
                                name="name"
                                control={form.control}
                                rules={{ required: "กรุณาระบุชื่อครุภัณฑ์" }}
                                render={({ field }) => <Input {...field} placeholder="เช่น MacBook Pro 16 M3" />}
                            />
                            <FieldError>{form.formState.errors.name?.message}</FieldError>
                        </Field>

                        <Field>
                            <FieldLabel>Serial Number *</FieldLabel>
                            <Controller
                                name="serialNumber"
                                control={form.control}
                                rules={{ required: "กรุณาระบุ Serial Number" }}
                                render={({ field }) => <Input {...field} placeholder="เช่น MBP-2026-001" />}
                            />
                            <FieldError>{form.formState.errors.serialNumber?.message}</FieldError>
                        </Field>

                        <Field>
                            <FieldLabel>รายละเอียด</FieldLabel>
                            <Controller
                                name="description"
                                control={form.control}
                                render={({ field }) => <Input {...field} placeholder="คำอธิบายเพิ่มเติม (ไม่บังคับ)" />}
                            />
                        </Field>

                        <Field>
                            <FieldLabel>แผนก *</FieldLabel>
                            <Controller
                                name="departmentId"
                                control={form.control}
                                rules={{ required: "กรุณาเลือกแผนก" }}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className="h-9 w-full rounded-md border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                                    >
                                        <option value="">-- เลือกแผนก --</option>
                                        {departments.map((dept) => (
                                            <option key={dept.id} value={dept.id}>
                                                {dept.name} ({dept.code})
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                            <FieldError>{form.formState.errors.departmentId?.message}</FieldError>
                        </Field>

                        <Field>
                            <FieldLabel>สถานะ</FieldLabel>
                            <Controller
                                name="status"
                                control={form.control}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className="h-9 w-full rounded-md border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                                    >
                                        <option value="AVAILABLE">พร้อมใช้งาน</option>
                                        <option value="IN_USE">กำลังใช้งาน</option>
                                        <option value="MAINTENANCE">ซ่อมบำรุง</option>
                                        <option value="RETIRED">ปลดระวาง</option>
                                    </select>
                                )}
                            />
                        </Field>

                        <div className="flex gap-2 pt-2">
                            <Button type="button" variant="outline" size="lg" className="flex-1" onClick={onClose}>
                                ยกเลิก
                            </Button>
                            <Button type="submit" size="lg" className="flex-1" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? "กำลังบันทึก..." : "เพิ่มครุภัณฑ์"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
