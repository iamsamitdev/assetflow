"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { loginSchema } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import { signIn } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Field,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"

interface SignInFormData {
    email: string
    password: string
}

export default function SignInForm() {

    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // SignIn with email/password
    const handleSignIn = async (data: SignInFormData) => {
        try {
            const result = await signIn.email({
                email: data.email,
                password: data.password,
            })

            if (result.error) {
                const isInvalidCredentials = result.error.message?.toLowerCase().includes("invalid")
                toast.warning(
                    isInvalidCredentials ? "อีเมลหรือรหัสผ่านไม่ถูกต้อง" : "เกิดข้อผิดพลาดในการเข้าสู่ระบบ",
                    {
                        description: isInvalidCredentials
                            ? "กรุณาตรวจสอบอีเมลและรหัสผ่านอีกครั้ง"
                            : "โปรดลองอีกครั้งในภายหลัง",
                        position: "top-right",
                    }
                )
            } else {
                toast.success("เข้าสู่ระบบสำเร็จ", {
                    description: "ยินดีต้อนรับสู่ AssetFlow",
                    position: "top-right",
                })
                router.push("/dashboard")
            }
        } catch (error) {
            console.error("Sign In Error:", error)
            toast.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ", {
                description: "โปรดลองอีกครั้งในภายหลัง",
                position: "top-right",
            })
        }
    }

    // SignIn with Social Providers (GitHub, Google, Line, Facebook)
    const handleSocialSignIn = async (provider: "github" | "google" | "line" | "facebook") => {
        try {
            const result = await signIn.social({
                provider,
                callbackURL: "/dashboard",
            })
            if (result.error) {
                toast.error(`เกิดข้อผิดพลาดในการเข้าสู่ระบบด้วย ${provider}`, {
                    description: "โปรดลองอีกครั้งในภายหลัง",
                    position: "top-right",
                })
            } else {
                toast.success(`เข้าสู่ระบบด้วย ${provider} สำเร็จ`, {
                    description: "ยินดีต้อนรับสู่ AssetFlow",
                    position: "top-right",
                })
                router.push("/dashboard")
            }
        } catch (error) {
            console.error(`Sign In with ${provider} Error:`, error)
            toast.error(`เกิดข้อผิดพลาดในการเข้าสู่ระบบด้วย ${provider}`, {
                description: "โปรดลองอีกครั้งในภายหลัง",
                position: "top-right",
            })
        }
    }

    return (
        <Card className="mx-4 sm:mx-auto sm:max-w-md my-20 px-6 py-8">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">เข้าสู่ระบบ</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Social Buttons */}
                <div className="space-y-3">
                    
                    <Button
                        variant="outline"
                        className="w-full justify-center gap-3 py-5"
                        onClick={() => handleSocialSignIn("github")}
                    >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        Sign in with GitHub
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full justify-center gap-3 py-5"
                        onClick={() => {
                            // Google Sign In here
                        }}
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Sign in with Google
                    </Button>
                </div>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 py-4 text-muted-foreground">or</span>
                    </div>
                </div>

                <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-6">
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
                            render={({ field }) => <Input {...field} type="password" placeholder="รหัสผ่านของคุณ" />}
                        />
                        <FieldError>{form.formState.errors.password?.message}</FieldError>
                    </Field>

                    <div className="text-center">
                        <Button size="lg" className="px-8 py-4" type="submit">เข้าสู่ระบบ</Button>
                        <p className="mt-4 text-sm text-muted-foreground">
                            ยังไม่มีบัญชี? <a href="/signup" className="text-primary hover:underline">สมัครสมาชิก</a>
                        </p>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
