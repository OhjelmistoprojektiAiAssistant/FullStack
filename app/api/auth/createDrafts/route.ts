import { prisma } from "@/lib/prisma";
import { getRouteSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const res = NextResponse.next();
    const session = await getRouteSession(request, res);

    if (!session.userId) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const body = await request.json();
    const content = body.content;
    if (!content) {
        return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const draft = await prisma.draft.create({
        data: { userId: session.userId, content },
    });
    return NextResponse.json(draft, { status: 201 });
}