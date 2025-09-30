import { getRouteSession } from "@/lib/session";
import { NextResponse } from "next/server";
import { email, success } from "zod";


export async function GET(request: Request) {
    try {
        const res = NextResponse.next();
        const session = await getRouteSession(request, res);

        if (!session.userId) {
            return NextResponse.json({
                success: false,
                isAuthenticated: false,
                user: null
            });
        }

        return NextResponse.json({
            success: true,
            isAuthenticated: true,
            user: {
                userId: session.userId,
                email: session.email
            }
        });
    } catch (error) {
        console.error("Error fetching session:", error);
        return NextResponse.json({
            success: false,
            isAuthenticated: false,
            user: null
        }, { status: 500 });
    }
}