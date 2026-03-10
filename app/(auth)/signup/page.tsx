import SignUpForm from '@/app/(auth)/signup/SignUpForm'

import { Metadata } from "next"

export const metadata: Metadata = {
    title: "สมัครสมาชิก - AssetFlow",
    description: "สร้างบัญชีผู้ใช้ใหม่เพื่อเข้าถึงระบบจัดการครุภัณฑ์ของ AssetFlow",
}

export default function SignUpPage() {
  return <SignUpForm />
}
