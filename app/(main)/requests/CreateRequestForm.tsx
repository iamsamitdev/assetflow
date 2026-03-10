"use client"

import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ClipboardList, X } from "lucide-react"
import { createRequest } from "@/actions/requestActions"

interface Asset {
    id: string
    name: string
    serialNumber: string
}

interface RequestFormData {
    assetId: string
    reason: string
}

export default function CreateRequestForm({
    assets,
    userId,
    onClose,
}: {
    assets: Asset[]
    userId: string
    onClose: () => void
}) {
    const router = useRouter()
    const form = useForm<RequestFormData>({
        defaultValues: {
            assetId: "",
            reason: "",
        },
    })

    const handleCreate = async (data: RequestFormData) => {
        try {
            await createRequest({
                assetId: data.assetId,
                reason: data.reason,
                userId,
            })
            toast.success("สร้างคำขอเบิกสำเร็จ", {
                description: "คำขอของคุณถูกส่งรออนุมัติแล้ว",
                position: "top-right",
            })
            form.reset()
            onClose()
            router.refresh()
        } catch {
            toast.error("ไม่สามารถสร้างคำขอได้", {
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
                            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                <ClipboardList className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">สร้างคำขอเบิกครุภัณฑ์</CardTitle>
                                <CardDescription>เลือกครุภัณฑ์และระบุเหตุผลในการเบิก</CardDescription>
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
                            <FieldLabel>ครุภัณฑ์ที่ต้องการเบิก *</FieldLabel>
                            <Controller
                                name="assetId"
                                control={form.control}
                                rules={{ required: "กรุณาเลือกครุภัณฑ์" }}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className="h-9 w-full rounded-md border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                                    >
                                        <option value="">-- เลือกครุภัณฑ์ --</option>
                                        {assets.map((asset) => (
                                            <option key={asset.id} value={asset.id}>
                                                {asset.name} ({asset.serialNumber})
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                            <FieldError>{form.formState.errors.assetId?.message}</FieldError>
                        </Field>

                        <Field>
                            <FieldLabel>เหตุผลในการเบิก *</FieldLabel>
                            <Controller
                                name="reason"
                                control={form.control}
                                rules={{
                                    required: "กรุณาระบุเหตุผล",
                                    minLength: { value: 5, message: "เหตุผลต้องมีอย่างน้อย 5 ตัวอักษร" },
                                }}
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        rows={3}
                                        placeholder="ระบุเหตุผลในการเบิกครุภัณฑ์ เช่น ต้องใช้สำหรับโปรเจกต์ใหม่"
                                        className="w-full rounded-md border border-input bg-transparent px-2.5 py-2 text-sm transition-colors outline-none resize-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                                    />
                                )}
                            />
                            <FieldError>{form.formState.errors.reason?.message}</FieldError>
                        </Field>

                        <div className="flex gap-2 pt-2">
                            <Button type="button" variant="outline" size="lg" className="flex-1" onClick={onClose}>
                                ยกเลิก
                            </Button>
                            <Button type="submit" size="lg" className="flex-1" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? "กำลังส่งคำขอ..." : "ส่งคำขอเบิก"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
