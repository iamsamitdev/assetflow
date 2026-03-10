import { prisma } from "@/lib/prisma"

// ฟังก์ชันสำหรับอ่าน Blog ทั้งหมด (List)
export const getPosts = async () => {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                id: "desc",
            },
            include: {
                user: {
                    select: {
                        name: true,
                    },
                }
            }
        })
        return posts
    } catch (error) {
        console.error("Error fetching posts:", error)
        throw error
    }
}

// ฟังก์ชันสำหรับอ่าน Blog ตาม ID (Detail)
export const getPostById = async (id: string) => {
    try {
        const post = await prisma.post.findUnique({
            where: { id: String(id) },
            include: {
                user: {
                    select: {
                        name: true
                    },
                }
            }
        })
        return post
    } catch (error) {
        console.error(`Error fetching post with id ${id}:`, error)
        throw error
    }
}