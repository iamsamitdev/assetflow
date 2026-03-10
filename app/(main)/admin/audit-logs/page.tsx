import AuditLogContent from "./AuditLogContent"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Audit Logs | Asset Flow",
    description: "ประวัติการเปลี่ยนแปลงในระบบ",
}

export default function AuditLogsPage() {
    return <AuditLogContent />
}
