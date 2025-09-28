import { getRouteSession } from "@/lib/session";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: Request) {
    const res = NextResponse.next();
    const session = await getRouteSession(request, res);

    if (!session.userId) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const draftId = searchParams.get("id");

    if (!draftId) {
        return NextResponse.json({ error: "Draft id required" }, { status: 400 });
    }

    const deleted = await prisma.draft.delete({
        where: { id: draftId },
    });
    return NextResponse.json(deleted, { status: 200 });
}