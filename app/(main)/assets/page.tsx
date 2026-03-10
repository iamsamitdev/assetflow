import AssetContent from "./AssetContent"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Assets | Asset Flow",
    description: "จัดการครุภัณฑ์ทั้งหมดในระบบ",
}

export default function AssetsPage() {
    return <AssetContent />
}
