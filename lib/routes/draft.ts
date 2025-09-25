import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function getDrafts(userId: string) {
    return prisma.draft.findMany({
        where: { userId },
        orderBy:{ createdAt: "desc"},
    })
}

export async function getDraftById(id: string) {
    return prisma.draft.findUnique({
        where: { id },
})
}

export async function createDraft(userId: string, content: string) {
    return prisma.draft.create({
        data: { userId, content},
    })
}

export async function deleteDraft(id: string) {
    return prisma.draft.delete({
        where: { id },
    })
}