"use client"

import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// ─── Mock Data (จะเปลี่ยนเป็นดึงจาก session + authClient จริงทีหลัง) ───
const mockUser = {
    name: "สมชาย ใจดี",
    email: "somchai@example.com",
    image: null as string | null,
    role: "admin",
}

interface ProfileFormData {
    name: string
}

interface ChangePasswordFormData {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

export default function ProfileForm() {
    const initials = mockUser.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)

    // Profile Form
    const profileForm = useForm<ProfileFormData>({
        defaultValues: { name: mockUser.name },
    })

    // Change Password Form
    const passwordForm = useForm<ChangePasswordFormData>({
        defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
    })

    const handleUpdateProfile = async (data: ProfileFormData) => {
        // TODO: เปลี่ยนเป็น authClient.updateUser() จริงทีหลัง
        console.log("Update Profile:", data)
        toast.success("อัปเดตโปรไฟล์สำเร็จ!", { position: "top-right" })
    }

    const handleChangePassword = async (data: ChangePasswordFormData) => {
        if (data.newPassword !== data.confirmPassword) {
            passwordForm.setError("confirmPassword", { message: "รหัสผ่านใหม่ไม่ตรงกัน" })
            return
        }
        // TODO: เปลี่ยนเป็น authClient.changePassword() จริงทีหลัง
        console.log("Change Password:", data)
        toast.success("เปลี่ยนรหัสผ่านสำเร็จ!", { position: "top-right" })
        passwordForm.reset()
    }

    return (
        <div className="mx-auto max-w-2xl space-y-6">

            {/* Profile Card */}
            <Card>
                <CardHeader>
                    <CardTitle>ข้อมูลโปรไฟล์</CardTitle>
                    <CardDescription>แก้ไขชื่อที่แสดงในระบบ</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center ring-2 ring-border">
                            <span className="text-xl font-bold text-primary-foreground">{initials}</span>
                        </div>
                        <div>
                            <p className="text-base font-semibold">{mockUser.name}</p>
                            <p className="text-sm text-muted-foreground">{mockUser.email}</p>
                        </div>
                    </div>

                    <form onSubmit={profileForm.handleSubmit(handleUpdateProfile)} className="space-y-4">
                        <Field>
                            <FieldLabel>อีเมล</FieldLabel>
                            <Input value={mockUser.email} disabled />
                            <p className="text-xs text-muted-foreground mt-1">อีเมลไม่สามารถเปลี่ยนได้</p>
                        </Field>

                        <Field>
                            <FieldLabel>ชื่อ</FieldLabel>
                            <Controller
                                name="name"
                                control={profileForm.control}
                                render={({ field }) => <Input {...field} placeholder="ชื่อของคุณ" />}
                            />
                            <FieldError>{profileForm.formState.errors.name?.message}</FieldError>
                        </Field>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={profileForm.formState.isSubmitting}>
                                {profileForm.formState.isSubmitting ? "กำลังบันทึก..." : "บันทึก"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Change Password Card */}
            <Card>
                <CardHeader>
                    <CardTitle>เปลี่ยนรหัสผ่าน</CardTitle>
                    <CardDescription>อัปเดตรหัสผ่านสำหรับเข้าสู่ระบบ</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={passwordForm.handleSubmit(handleChangePassword)} className="space-y-4">
                        <Field>
                            <FieldLabel>รหัสผ่านปัจจุบัน</FieldLabel>
                            <Controller
                                name="currentPassword"
                                control={passwordForm.control}
                                render={({ field }) => <Input {...field} type="password" placeholder="กรอกรหัสผ่านปัจจุบัน" />}
                            />
                            <FieldError>{passwordForm.formState.errors.currentPassword?.message}</FieldError>
                        </Field>

                        <Field>
                            <FieldLabel>รหัสผ่านใหม่</FieldLabel>
                            <Controller
                                name="newPassword"
                                control={passwordForm.control}
                                render={({ field }) => <Input {...field} type="password" placeholder="อย่างน้อย 8 ตัวอักษร" />}
                            />
                            <FieldError>{passwordForm.formState.errors.newPassword?.message}</FieldError>
                        </Field>

                        <Field>
                            <FieldLabel>ยืนยันรหัสผ่านใหม่</FieldLabel>
                            <Controller
                                name="confirmPassword"
                                control={passwordForm.control}
                                render={({ field }) => <Input {...field} type="password" placeholder="กรอกรหัสผ่านใหม่อีกครั้ง" />}
                            />
                            <FieldError>{passwordForm.formState.errors.confirmPassword?.message}</FieldError>
                        </Field>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={passwordForm.formState.isSubmitting}>
                                {passwordForm.formState.isSubmitting ? "กำลังเปลี่ยน..." : "เปลี่ยนรหัสผ่าน"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

        </div>
    )
}
