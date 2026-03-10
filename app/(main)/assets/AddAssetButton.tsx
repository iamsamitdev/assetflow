"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import CreateAssetForm from "./CreateAssetForm"

interface Department {
    id: string
    name: string
    code: string
}

export default function AddAssetButton({ departments }: { departments: Department[] }) {
    const [showForm, setShowForm] = useState(false)

    return (
        <>
            <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition"
            >
                <Plus className="h-4 w-4" />
                เพิ่มครุภัณฑ์
            </button>
            {showForm && (
                <CreateAssetForm
                    departments={departments}
                    onClose={() => setShowForm(false)}
                />
            )}
        </>
    )
}
