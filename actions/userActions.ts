"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// ─── Read: ดึง Users ทั้งหมด (admin) ───
export const getUsers = async () => {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
                banned: true,
                banReason: true,
                banExpires: true,
                departmentId: true,
                department: {
                    select: { id: true, name: true, code: true },
                },
                createdAt: true,
                updatedAt: true,
            },
        })
        return users
    } catch (error) {
        console.error("Error fetching users:", error)
        throw error
    }
}

// ─── Read: ดึง User ตาม ID ───
export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
                banned: true,
                banReason: true,
                banExpires: true,
                departmentId: true,
                department: {
                    select: { id: true, name: true, code: true },
                },
                requests: {
                    orderBy: { createdAt: "desc" },
                    take: 10,
                    select: {
                        id: true,
                        status: true,
                        reason: true,
                        createdAt: true,
                        asset: { select: { name: true } },
                    },
                },
                createdAt: true,
                updatedAt: true,
            },
        })
        return user
    } catch (error) {
        console.error(`Error fetching user with id ${id}:`, error)
        throw error
    }
}

// ─── Update: เปลี่ยน Role ───
export const updateUserRole = async (
    id: string,
    role: "user" | "admin" | "employee"
) => {
    try {
        const user = await prisma.user.update({
            where: { id },
            data: { role },
        })
        revalidatePath("/admin/users")
        return user
    } catch (error) {
        console.error(`Error updating role for user ${id}:`, error)
        throw error
    }
}

// ─── Update: เปลี่ยนแผนกของ User ───
export const updateUserDepartment = async (
    id: string,
    departmentId: string | null
) => {
    try {
        const user = await prisma.user.update({
            where: { id },
            data: { departmentId },
        })
        revalidatePath("/admin/users")
        return user
    } catch (error) {
        console.error(`Error updating department for user ${id}:`, error)
        throw error
    }
}

// ─── Update: แบน User ───
export const banUser = async (
    id: string,
    data: {
        banReason?: string
        banExpires?: Date
    }
) => {
    try {
        const user = await prisma.user.update({
            where: { id },
            data: {
                banned: true,
                banReason: data.banReason ?? null,
                banExpires: data.banExpires ?? null,
            },
        })
        revalidatePath("/admin/users")
        return user
    } catch (error) {
        console.error(`Error banning user ${id}:`, error)
        throw error
    }
}

// ─── Update: ปลดแบน User ───
export const unbanUser = async (id: string) => {
    try {
        const user = await prisma.user.update({
            where: { id },
            data: {
                banned: false,
                banReason: null,
                banExpires: null,
            },
        })
        revalidatePath("/admin/users")
        return user
    } catch (error) {
        console.error(`Error unbanning user ${id}:`, error)
        throw error
    }
}

// ─── Stats: สถิติ Users ───
export const getUserStats = async () => {
    try {
        const [total, admins, employees, users, banned] = await Promise.all([
            prisma.user.count(),
            prisma.user.count({ where: { role: "admin" } }),
            prisma.user.count({ where: { role: "employee" } }),
            prisma.user.count({ where: { role: "user" } }),
            prisma.user.count({ where: { banned: true } }),
        ])
        return { total, admins, employees, users, banned }
    } catch (error) {
        console.error("Error fetching user stats:", error)
        throw error
    }
}
