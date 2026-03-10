import RequestContent from "./RequestContent"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Requests | Asset Flow",
    description: "จัดการคำขอเบิกครุภัณฑ์",
}

export default function RequestsPage() {
    return <RequestContent />
}
