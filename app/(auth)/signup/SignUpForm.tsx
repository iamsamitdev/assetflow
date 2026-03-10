"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { registerSchema } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import { signUp } from "@/lib/auth-client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Field,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"

// Interface สำหรับข้อมูลฟอร์มการสมัครสมาชิก
interface SignUpFormData {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export default function SignUpForm() {

    // การใช้ useForm กับ zodResolver เพื่อเชื่อมต่อกับ registerSchema
    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    // ฟังก์ชันสำหรับจัดการการส่งฟอร์ม
    const handleSignUp = async (data: SignUpFormData) => {
        console.log("Form Data:", data)

        // เรียกใช้ฟังก์ชัน signUp จาก authClient เพื่อสมัครสมาชิก
        try {
            const result = await signUp.email({
                name: data.name,
                email: data.email,
                password: data.password,
                // confirmPassword ไม่ส่งไป better auth
            })

            if (result.error) {
                const isEmailTaken = result.error.message?.toLowerCase().includes("user already exists")
                toast.warning(isEmailTaken ? "อีเมลนี้ถูกใช้งานแล้ว" : "เกิดข้อผิดพลาดในการสมัครสมาชิก", {
                    description: isEmailTaken ? "กรุณาใช้อีเมลอื่น หรือเข้าสู่ระบบด้วยอีเมลนี้" : "โปรดลองอีกครั้งในภายหลัง",
                    position: "top-right",
                })
            } else {
                toast.success("สมัครสมาชิกสำเร็จ! กรุณาล็อกอินเพื่อใช้งาน", { 
                    description: "คุณสามารถเข้าสู่ระบบด้วยอีเมลและรหัสผ่านที่คุณใช้สมัครสมาชิก",
                    position: "top-right",
                 })
                form.reset() // รีเซ็ตฟอร์มหลังจากสมัครสมาชิกสำเร็จ
            }
        } catch (error) {
            console.error("Sign Up Error:", error)
            toast.error("เกิดข้อผิดพลาดในการสมัครสมาชิก", { 
                description: "โปรดลองอีกครั้งในภายหลัง",
                position: "top-right",
            })
        }
    }

    return (
        
       <Card className="mx-4 sm:mx-auto sm:max-w-md my-20 px-6 py-8">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">ลงทะเบียน</CardTitle>
                <CardDescription>กรุณากรอกข้อมูลของคุณเพื่อสมัครสมาชิก</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-6">
                    {/* Name */}
                    <Field>
                        <FieldLabel>ชื่อ</FieldLabel>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field }) => <Input {...field} placeholder="ชื่อของคุณ" />}
                        />
                        <FieldError>{form.formState.errors.name?.message}</FieldError>
                    </Field>

                    {/* Email */}
                    <Field>
                        <FieldLabel>อีเมล</FieldLabel>
                        <Controller 
                            name="email"
                            control={form.control}
                            render={({ field }) => <Input {...field} placeholder="อีเมลของคุณ" />}
                        />
                        <FieldError>{form.formState.errors.email?.message}</FieldError>
                    </Field>

                    {/* Password */}
                    <Field>
                        <FieldLabel>รหัสผ่าน</FieldLabel>
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field }) => <Input {...field} type="password" 
                            placeholder="รหัสผ่านของคุณ" />}
                        />
                        <FieldError>{form.formState.errors.password?.message}</FieldError>
                    </Field>

                    {/* Confirm Password */}
                    <Field>
                        <FieldLabel>ยืนยันรหัสผ่าน</FieldLabel>
                        <Controller
                            name="confirmPassword"
                            control={form.control}
                            render={({ field }) => <Input {...field} type="password" placeholder="ยืนยันรหัสผ่านของคุณ" />}
                        />
                        <FieldError>{form.formState.errors.confirmPassword?.message}</FieldError>
                    </Field>

                    <div className="text-center">
                        <Button size="lg" className="px-8 py-4" type="submit">ลงทะเบียน</Button>
                        <p className="mt-4 text-sm text-muted-foreground">
                            มีบัญชีแล้ว? <a href="/signin" className="text-primary hover:underline">เข้าสู่ระบบ</a>
                        </p>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
