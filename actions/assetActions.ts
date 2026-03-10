"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@/app/generated/prisma/client"
import { revalidatePath } from "next/cache"

// ─── Read: ดึงครุภัณฑ์ทั้งหมด ───
export const getAssets = async () => {
    try {
        const assets = await prisma.asset.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                department: {
                    select: { id: true, name: true, code: true },
                },
            },
        })
        return assets
    } catch (error) {
        console.error("Error fetching assets:", error)
        throw error
    }
}

// ─── Read: ดึงครุภัณฑ์ตาม ID ───
export const getAssetById = async (id: string) => {
    try {
        const asset = await prisma.asset.findUnique({
            where: { id },
            include: {
                department: {
                    select: { id: true, name: true, code: true },
                },
                requests: {
                    orderBy: { createdAt: "desc" },
                    take: 10,
                    include: {
                        user: { select: { id: true, name: true, email: true } },
                    },
                },
            },
        })
        return asset
    } catch (error) {
        console.error(`Error fetching asset with id ${id}:`, error)
        throw error
    }
}

// ─── Create: สร้างครุภัณฑ์ใหม่ ───
export const createAsset = async (data: {
    name: string
    description?: string
    serialNumber: string
    status?: "AVAILABLE" | "IN_USE" | "MAINTENANCE" | "RETIRED"
    departmentId: string
    metadata?: Prisma.InputJsonValue
}) => {
    try {
        const asset = await prisma.asset.create({
            data: {
                name: data.name,
                description: data.description,
                serialNumber: data.serialNumber,
                status: data.status ?? "AVAILABLE",
                departmentId: data.departmentId,
                metadata: data.metadata ?? Prisma.DbNull,
            },
        })
        revalidatePath("/assets")
        return asset
    } catch (error) {
        console.error("Error creating asset:", error)
        throw error
    }
}

// ─── Update: แก้ไขครุภัณฑ์ ───
export const updateAsset = async (
    id: string,
    data: {
        name?: string
        description?: string
        serialNumber?: string
        status?: "AVAILABLE" | "IN_USE" | "MAINTENANCE" | "RETIRED"
        departmentId?: string
        metadata?: Prisma.InputJsonValue
    }
) => {
    try {
        const asset = await prisma.asset.update({
            where: { id },
            data: {
                ...data,
                metadata: data.metadata !== undefined
                    ? (data.metadata ?? Prisma.DbNull)
                    : undefined,
                department: data.departmentId
                    ? { connect: { id: data.departmentId } }
                    : undefined,
                departmentId: undefined,
            },
        })
        revalidatePath("/assets")
        revalidatePath(`/assets/${id}`)
        return asset
    } catch (error) {
        console.error(`Error updating asset with id ${id}:`, error)
        throw error
    }
}

// ─── Delete: ลบครุภัณฑ์ ───
export const deleteAsset = async (id: string) => {
    try {
        await prisma.asset.delete({
            where: { id },
        })
        revalidatePath("/assets")
        return { success: true }
    } catch (error) {
        console.error(`Error deleting asset with id ${id}:`, error)
        throw error
    }
}

// ─── Stats: สถิติครุภัณฑ์ ───
export const getAssetStats = async () => {
    try {
        const [total, available, inUse, maintenance, retired] =
            await Promise.all([
                prisma.asset.count(),
                prisma.asset.count({ where: { status: "AVAILABLE" } }),
                prisma.asset.count({ where: { status: "IN_USE" } }),
                prisma.asset.count({ where: { status: "MAINTENANCE" } }),
                prisma.asset.count({ where: { status: "RETIRED" } }),
            ])
        return { total, available, inUse, maintenance, retired }
    } catch (error) {
        console.error("Error fetching asset stats:", error)
        throw error
    }
}
