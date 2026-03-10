import SignInForm from '@/app/(auth)/signin/SignInForm'

import { Metadata } from "next"

export const metadata: Metadata = {
    title: "เข้าสู่ระบบ | AssetFlow",
    description: "เข้าสู่ระบบเพื่อจัดการสินทรัพย์ของคุณด้วย AssetFlow",
}

export default function SignInPage() {
  return <SignInForm />
}
