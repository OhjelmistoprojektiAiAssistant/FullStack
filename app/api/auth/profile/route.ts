import { prisma } from "@/lib/prisma";
import { getRouteSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const res = NextResponse.next(); // dummy response
    const session = await getRouteSession(request, res);

    if (!session.userId) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const profile = await prisma.user.findUnique({
        where: { id: session.userId },
    });
    return NextResponse.json(profile, { status: 200 });
}