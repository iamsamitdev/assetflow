import SettingContent from "./SettingContent"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Settings | Asset Flow",
    description: "ตั้งค่าระบบ",
}

export default function SettingsPage() {
    return <SettingContent />
}
