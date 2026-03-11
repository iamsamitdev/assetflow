"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import CreateRequestForm from "./CreateRequestForm"

interface Asset {
    id: string
    name: string
    serialNumber: string
}

export default function AddRequestButton({ assets, userId }: { assets: Asset[]; userId: string }) {
    const [showForm, setShowForm] = useState(false)

    return (
        <>
            <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition"
            >
                <Plus className="h-4 w-4" />
                สร้างคำขอใหม่
            </button>
            {showForm && (
                <CreateRequestForm
                    assets={assets}
                    userId={userId}
                    onClose={() => setShowForm(false)}
                />
            )}
        </>
    )
}
