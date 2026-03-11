"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// ─── Read: ดึงคำขอเบิกทั้งหมด ───
export const getRequests = async () => {
    try {
        const requests = await prisma.requestLog.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                user: {
                    select: { id: true, name: true, email: true, image: true },
                },
                asset: {
                    select: { id: true, name: true, serialNumber: true },
                },
                approvedBy: {
                    select: { id: true, name: true },
                },
            },
        })
        return requests
    } catch (error) {
        console.error("Error fetching requests:", error)
        throw error
    }
}

// ─── Read: ดึงคำขอเบิกตาม ID ───
export const getRequestById = async (id: string) => {
    try {
        const request = await prisma.requestLog.findUnique({
            where: { id },
            include: {
                user: {
                    select: { id: true, name: true, email: true, image: true },
                },
                asset: {
                    select: {
                        id: true,
                        name: true,
                        serialNumber: true,
                        status: true,
                        department: { select: { name: true } },
                    },
                },
                approvedBy: {
                    select: { id: true, name: true, email: true },
                },
            },
        })
        return request
    } catch (error) {
        console.error(`Error fetching request with id ${id}:`, error)
        throw error
    }
}

// ─── Read: ดึงคำขอเบิกของ user คนเดียว ───
export const getRequestsByUserId = async (userId: string) => {
    try {
        const requests = await prisma.requestLog.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            include: {
                asset: {
                    select: { id: true, name: true, serialNumber: true },
                },
                approvedBy: {
                    select: { id: true, name: true },
                },
            },
        })
        return requests
    } catch (error) {
        console.error(`Error fetching requests for user ${userId}:`, error)
        throw error
    }
}

// ─── Create: สร้างคำขอเบิกใหม่ ───
export const createRequest = async (data: {
    reason: string
    userId: string
    assetId: string
}) => {
    try {
        const request = await prisma.requestLog.create({
            data: {
                reason: data.reason,
                userId: data.userId,
                assetId: data.assetId,
                status: "PENDING",
            },
        })
        revalidatePath("/requests")
        revalidatePath("/dashboard")
        return request
    } catch (error) {
        console.error("Error creating request:", error)
        throw error
    }
}

// ─── Update: อนุมัติคำขอเบิก ───
export const approveRequest = async (id: string, approvedById: string) => {
    try {
        const [request] = await prisma.$transaction([
            // 1) อัปเดตสถานะคำขอ → APPROVED
            prisma.requestLog.update({
                where: { id },
                data: {
                    status: "APPROVED",
                    approvedById,
                    approvedAt: new Date(),
                },
            }),
            // 2) เปลี่ยนสถานะครุภัณฑ์ → IN_USE
            prisma.asset.update({
                where: {
                    id: (
                        await prisma.requestLog.findUniqueOrThrow({
                            where: { id },
                            select: { assetId: true },
                        })
                    ).assetId,
                },
                data: { status: "IN_USE" },
            }),
        ])
        revalidatePath("/requests")
        revalidatePath("/assets")
        revalidatePath("/dashboard")
        return request
    } catch (error) {
        console.error(`Error approving request ${id}:`, error)
        throw error
    }
}

// ─── Update: ปฏิเสธคำขอเบิก ───
export const rejectRequest = async (id: string, approvedById: string) => {
    try {
        const request = await prisma.requestLog.update({
            where: { id },
            data: {
                status: "REJECTED",
                approvedById,
                approvedAt: new Date(),
            },
        })
        revalidatePath("/requests")
        revalidatePath("/dashboard")
        return request
    } catch (error) {
        console.error(`Error rejecting request ${id}:`, error)
        throw error
    }
}

// ─── Update: คืนครุภัณฑ์ ───
export const returnRequest = async (id: string) => {
    try {
        const requestLog = await prisma.requestLog.findUniqueOrThrow({
            where: { id },
            select: { assetId: true },
        })

        const [request] = await prisma.$transaction([
            // 1) อัปเดตสถานะคำขอ → RETURNED
            prisma.requestLog.update({
                where: { id },
                data: { status: "RETURNED" },
            }),
            // 2) เปลี่ยนสถานะครุภัณฑ์ → AVAILABLE
            prisma.asset.update({
                where: { id: requestLog.assetId },
                data: { status: "AVAILABLE" },
            }),
        ])
        revalidatePath("/requests")
        revalidatePath("/assets")
        revalidatePath("/dashboard")
        return request
    } catch (error) {
        console.error(`Error returning request ${id}:`, error)
        throw error
    }
}

// ─── Delete: ลบคำขอเบิก (เฉพาะ PENDING) ───
export const deleteRequest = async (id: string) => {
    try {
        await prisma.requestLog.delete({
            where: { id, status: "PENDING" },
        })
        revalidatePath("/requests")
        return { success: true }
    } catch (error) {
        console.error(`Error deleting request ${id}:`, error)
        throw error
    }
}

// ─── Stats: สถิติคำขอเบิก ───
export const getRequestStats = async () => {
    try {
        const [total, pending, approved, rejected, returned] =
            await Promise.all([
                prisma.requestLog.count(),
                prisma.requestLog.count({ where: { status: "PENDING" } }),
                prisma.requestLog.count({ where: { status: "APPROVED" } }),
                prisma.requestLog.count({ where: { status: "REJECTED" } }),
                prisma.requestLog.count({ where: { status: "RETURNED" } }),
            ])
        return { total, pending, approved, rejected, returned }
    } catch (error) {
        console.error("Error fetching request stats:", error)
        throw error
    }
}
