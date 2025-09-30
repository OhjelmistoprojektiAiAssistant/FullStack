import { prisma } from "@/lib/prisma";
import { getRouteSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const res = NextResponse.next(); // dummy response
    const session = await getRouteSession(request, res);

    if (!session.userId) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const drafts = await prisma.draft.findMany({
        where: { userId: session.userId },
        orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(drafts, { status: 200 });
}