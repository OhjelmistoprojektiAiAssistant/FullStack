import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function getProfile(userId: string) {
    return prisma.profile.findUnique({
        where: { userId },
    })
}

export async function updateProfile(userId: string, data: {
    experience?: string
    education?: string
    skills?: string
    strengths?: string
}) {
    return prisma.profile.upsert({
        where: { userId },
        update: {
            ...data,
            updatedAt: new Date(),
        },
        create: {
            userId,
            ...data,
            updatedAt: new Date(),
        },
    })
}