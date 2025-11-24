"use server";

import { request } from "http";
import { prisma } from "../prisma";
import { getRouteSession, getServerSession } from "../session";
import { success } from "zod";


export async function saveDraftToDatabase(draftData: string | null): Promise<{ success: boolean; error?: string, message?: string }> {
    if (!draftData) {
        return { success: false, error: "Draft data is null" };
    }

    try {
        const session = await getServerSession();
        if (!session?.userId) {
            return { success: false, error: "User not authenticated" };
        }
        const draft = await prisma.draft.create({
            data: {
                userId: session.userId,
                content: draftData,
                name: `Draft ${new Date().toLocaleString()}`,
            }
        });
        return { success: true, message: "Draft saved successfully" };
    } catch (error) {
        return { success: false, error: "Failed to save draft" };
    }
}