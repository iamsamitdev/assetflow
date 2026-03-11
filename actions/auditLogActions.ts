"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@/app/generated/prisma/client"

// ─── Read: ดึง Audit Logs ทั้งหมด (พร้อม pagination) ───
export const getAuditLogs = async (options?: {
    page?: number
    limit?: number
    entity?: string
    userId?: string
}) => {
    const page = options?.page ?? 1
    const limit = options?.limit ?? 50
    const skip = (page - 1) * limit

    try {
        const where: Record<string, unknown> = {}
        if (options?.entity) where.entity = options.entity
        if (options?.userId) where.userId = options.userId

        const [logs, total] = await Promise.all([
            prisma.auditLog.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
                include: {
                    user: {
                        select: { id: true, name: true, email: true, image: true },
                    },
                },
            }),
            prisma.auditLog.count({ where }),
        ])

        return {
            logs,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        }
    } catch (error) {
        console.error("Error fetching audit logs:", error)
        throw error
    }
}

// ─── Read: ดึง Audit Log ตาม ID ───
export const getAuditLogById = async (id: string) => {
    try {
        const log = await prisma.auditLog.findUnique({
            where: { id },
            include: {
                user: {
                    select: { id: true, name: true, email: true, image: true },
                },
            },
        })
        return log
    } catch (error) {
        console.error(`Error fetching audit log with id ${id}:`, error)
        throw error
    }
}

// ─── Create: บันทึก Audit Log (ใช้ภายใน server actions อื่น) ───
export const createAuditLog = async (data: {
    action: string
    entity: string
    entityId: string
    details?: Prisma.InputJsonValue
    userId: string
}) => {
    try {
        const log = await prisma.auditLog.create({
            data: {
                action: data.action,
                entity: data.entity,
                entityId: data.entityId,
                details: data.details ?? Prisma.DbNull,
                userId: data.userId,
            },
        })
        return log
    } catch (error) {
        console.error("Error creating audit log:", error)
        throw error
    }
}
