import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { admin } from "better-auth/plugins"
import { prisma } from "@/lib/prisma"

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    // อนุญาตให้เชื่อมบัญชีอัตโนมัติเมื่ออีเมลตรงกัน
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["google", "github", "line"],
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        line: {
            clientId: process.env.LINE_CLIENT_ID as string,
            clientSecret: process.env.LINE_CLIENT_SECRET as string,
        },
    },
    plugins: [admin()],
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24,      // 1 day
    },
})