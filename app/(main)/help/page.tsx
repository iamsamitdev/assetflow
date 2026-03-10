import HelpContent from "./HelpContent"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Help | Asset Flow",
    description: "คำถามที่พบบ่อยและคู่มือการใช้งาน",
}

export default function HelpPage() {
    return <HelpContent />
}
