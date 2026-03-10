"use client"

import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Building2, X } from "lucide-react"
import { createDepartment } from "@/actions/departmentActions"

interface DepartmentFormData {
    name: string
    code: string
}

export default function CreateDepartmentForm({ onClose }: { onClose: () => void }) {
    const router = useRouter()
    const form = useForm<DepartmentFormData>({
        defaultValues: {
            name: "",
            code: "",
        },
    })

    const handleCreate = async (data: DepartmentFormData) => {
        try {
            await createDepartment({
                name: data.name,
                code: data.code.toUpperCase(),
            })
            toast.success("เพิ่มแผนกสำเร็จ", {
                description: `แผนก ${data.name} ถูกเพิ่มเข้าระบบแล้ว`,
                position: "top-right",
            })
            form.reset()
            onClose()
            router.refresh()
        } catch {
            toast.error("ไม่สามารถเพิ่มแผนกได้", {
                description: "ชื่อหรือรหัสแผนกอาจซ้ำกัน กรุณาตรวจสอบและลองอีกครั้ง",
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
                            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                                <Building2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">เพิ่มแผนกใหม่</CardTitle>
                                <CardDescription>กรอกข้อมูลแผนกที่ต้องการเพิ่มในระบบ</CardDescription>
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
                            <FieldLabel>ชื่อแผนก *</FieldLabel>
                            <Controller
                                name="name"
                                control={form.control}
                                rules={{ required: "กรุณาระบุชื่อแผนก" }}
                                render={({ field }) => <Input {...field} placeholder="เช่น ฝ่ายพัฒนาซอฟต์แวร์" />}
                            />
                            <FieldError>{form.formState.errors.name?.message}</FieldError>
                        </Field>

                        <Field>
                            <FieldLabel>รหัสแผนก *</FieldLabel>
                            <Controller
                                name="code"
                                control={form.control}
                                rules={{
                                    required: "กรุณาระบุรหัสแผนก",
                                    maxLength: { value: 10, message: "รหัสแผนกต้องไม่เกิน 10 ตัวอักษร" },
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="เช่น DEV, MKT, FIN"
                                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                        className="font-mono uppercase"
                                    />
                                )}
                            />
                            <FieldError>{form.formState.errors.code?.message}</FieldError>
                        </Field>

                        <div className="flex gap-2 pt-2">
                            <Button type="button" variant="outline" size="lg" className="flex-1" onClick={onClose}>
                                ยกเลิก
                            </Button>
                            <Button type="submit" size="lg" className="flex-1" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? "กำลังบันทึก..." : "เพิ่มแผนก"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
