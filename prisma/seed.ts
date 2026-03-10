import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../app/generated/prisma/client"

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Seeding database...")

  // ใช้ upsert แทน create เพื่อให้รัน seed ซ้ำได้โดยไม่พัง (ตรวจสอบจาก email ที่เป็น unique)
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'Alice',
      role: 'admin',
      image: 'https://example.com/images/alice.png',
      // สร้าง Posts ไปพร้อมกับ User เลย (Nested Writes)
        posts: {
            create: [
                {
                    title: 'Welcome to my first post!',
            content: 'Hello World, this is Alice.',
                },
                {
                    title: 'Another day, another post',
                    content: 'Just another day in the life of Alice.',
                },
            ],
        },
    },
  })

    console.log("User 1:", user1)
    console.log("Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })