"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// ─── Read: ดึงแผนกทั้งหมด ───
export const getDepartments = async () => {
    try {
        const departments = await prisma.department.findMany({
            orderBy: { name: "asc" },
            include: {
                _count: {
                    select: {
                        users: true,
                        assets: true,
                    },
                },
            },
        })
        return departments
    } catch (error) {
        console.error("Error fetching departments:", error)
        throw error
    }
}

// ─── Read: ดึงแผนกตาม ID ───
export const getDepartmentById = async (id: string) => {
    try {
        const department = await prisma.department.findUnique({
            where: { id },
            include: {
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        image: true,
                    },
                },
                assets: {
                    select: {
                        id: true,
                        name: true,
                        serialNumber: true,
                        status: true,
                    },
                },
                _count: {
                    select: {
                        users: true,
                        assets: true,
                    },
                },
            },
        })
        return department
    } catch (error) {
        console.error(`Error fetching department with id ${id}:`, error)
        throw error
    }
}

// ─── Create: สร้างแผนกใหม่ ───
export const createDepartment = async (data: {
    name: string
    code: string
}) => {
    try {
        const department = await prisma.department.create({
            data: {
                name: data.name,
                code: data.code,
            },
        })
        revalidatePath("/departments")
        return department
    } catch (error) {
        console.error("Error creating department:", error)
        throw error
    }
}

// ─── Update: แก้ไขแผนก ───
export const updateDepartment = async (
    id: string,
    data: {
        name?: string
        code?: string
    }
) => {
    try {
        const department = await prisma.department.update({
            where: { id },
            data,
        })
        revalidatePath("/departments")
        revalidatePath(`/departments/${id}`)
        return department
    } catch (error) {
        console.error(`Error updating department with id ${id}:`, error)
        throw error
    }
}

// ─── Delete: ลบแผนก ───
export const deleteDepartment = async (id: string) => {
    try {
        await prisma.department.delete({
            where: { id },
        })
        revalidatePath("/departments")
        return { success: true }
    } catch (error) {
        console.error(`Error deleting department with id ${id}:`, error)
        throw error
    }
}
