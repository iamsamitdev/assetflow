import DepartmentContent from "./DepartmentContent"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Departments | Asset Flow",
    description: "จัดการแผนกในระบบ",
}

export default function DepartmentsPage() {
    return <DepartmentContent />
}
