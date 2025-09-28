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
    const { experience, education, skills, strengths } = body;

    // Validating input
    if (!experience && !education && !skills && !strengths) {
        return NextResponse.json({ error: "At least one field is required" }, { status: 400 });
    }

    // Update the profile in the database
    const updatedProfile = await prisma.profile.update({
        where: { userId: session.userId },
        data: { experience, education, skills, strengths },
    });

    return NextResponse.json(updatedProfile, { status: 200 });
}