import UserContent from "./UserContent"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Users | Asset Flow",
    description: "จัดการผู้ใช้ในระบบ",
}

export default function UsersPage() {
    return <UserContent />
}
