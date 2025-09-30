import { prisma } from "@/lib/prisma";
import { getRouteSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const res = NextResponse.next();
    const session = await getRouteSession(request, res);

    if (!session.userId) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const body = await request.json();
    const draftId = body.id;
    const content = body.content;

    if (!draftId || !content) {
        return NextResponse.json({ error: "Draft id and content are required" }, { status: 400 });
    }

    // Ensure the draft belongs to the user
    const draft = await prisma.draft.findUnique({ where: { id: draftId } });
    if (!draft || draft.userId !== session.userId) {
        return NextResponse.json({ error: "Draft not found or unauthorized" }, { status: 404 });
    }

    const updated = await prisma.draft.update({
        where: { id: draftId },
        data: { content },
    });
    return NextResponse.json(updated, { status: 200 });
}
