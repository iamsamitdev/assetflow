import { PrismaPg } from "@prisma/adapter-pg"
import {
  PrismaClient,
  Role,
  AssetStatus,
} from "../app/generated/prisma/client"
import bcrypt from "bcryptjs"

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("🌱 Seeding database...")

  // สร้างแผนก
  const itDept = await prisma.department.upsert({
    where: { code: "IT" },
    update: {},
    create: { name: "ฝ่ายเทคโนโลยีสารสนเทศ", code: "IT" },
  })

  const hrDept = await prisma.department.upsert({
    where: { code: "HR" },
    update: {},
    create: { name: "ฝ่ายทรัพยากรบุคคล", code: "HR" },
  })

  const financeDept = await prisma.department.upsert({
    where: { code: "FIN" },
    update: {},
    create: { name: "ฝ่ายการเงิน", code: "FIN" },
  })

  // สร้าง Users
  const admin = await prisma.user.upsert({
    where: { email: "admin@assetflow.com" },
    update: {},
    create: {
      name: "ผู้ดูแลระบบ",
      email: "admin@assetflow.com",
      password: await bcrypt.hash("password123", 10),
      role: Role.ADMIN,
      departmentId: itDept.id,
    },
  })

  const somchai = await prisma.user.upsert({
    where: { email: "somchai@assetflow.com" },
    update: {},
    create: {
      name: "สมชาย ใจดี",
      email: "somchai@assetflow.com",
      password: await bcrypt.hash("password123", 10),
      role: Role.EMPLOYEE,
      departmentId: hrDept.id,
    },
  })

  // สร้างครุภัณฑ์
  const assets = [
    {
      name: 'MacBook Pro 14"',
      serialNumber: "MBP-2026-001",
      departmentId: itDept.id,
      metadata: { brand: "Apple", ram: "16GB" },
    },
    {
      name: 'Dell Monitor 27"',
      serialNumber: "MON-2026-001",
      departmentId: itDept.id,
      metadata: { brand: "Dell", resolution: "4K" },
    },
    {
      name: "HP LaserJet Pro",
      serialNumber: "PRT-2026-001",
      departmentId: hrDept.id,
      metadata: { brand: "HP", type: "Laser" },
    },
    {
      name: "iPad Air",
      serialNumber: "TAB-2026-001",
      departmentId: financeDept.id,
      metadata: { brand: "Apple", storage: "256GB" },
    },
  ]

  for (const asset of assets) {
    await prisma.asset.upsert({
      where: { serialNumber: asset.serialNumber },
      update: {},
      create: { ...asset, status: AssetStatus.AVAILABLE },
    })
  }

  // สร้าง Blog Posts
  const blogPosts = [
    {
      title: "เริ่มต้นใช้งาน AssetFlow อย่างมืออาชีพ",
      content:
        "AssetFlow ช่วยให้การจัดการครุภัณฑ์ในองค์กรเป็นเรื่องง่าย ตั้งแต่การลงทะเบียน ติดตามสถานะ ไปจนถึงการออกรายงานสรุปประจำปี บทความนี้จะพาคุณเริ่มต้นใช้งานระบบตั้งแต่ขั้นตอนแรก",
      userId: admin.id,
    },
    {
      title: "5 เทคนิคบริหารครุภัณฑ์ให้มีประสิทธิภาพ",
      content:
        "การบริหารครุภัณฑ์ที่ดีช่วยลดค่าใช้จ่าย ยืดอายุการใช้งาน และลดปัญหาสินทรัพย์สูญหาย เรารวม 5 เทคนิคที่ใช้ได้จริงมาฝากทุกองค์กร",
      userId: admin.id,
    },
    {
      title: "QR Code กับการติดตามครุภัณฑ์ยุคใหม่",
      content:
        "การใช้ QR Code ช่วยให้สามารถตรวจสอบข้อมูลครุภัณฑ์ได้ทันทีด้วยมือถือ ลดเวลาค้นหา เพิ่มความแม่นยำ และรองรับการตรวจนับประจำปีอย่างรวดเร็ว",
      userId: somchai.id,
    },
  ]

  for (const post of blogPosts) {
    const existing = await prisma.post.findFirst({
      where: { title: post.title, userId: post.userId },
    })
    if (!existing) {
      await prisma.post.create({ data: post })
    }
  }

  console.log("✅ Seed completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })