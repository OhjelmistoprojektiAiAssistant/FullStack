import { getRouteSession } from "@/lib/session";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const res = NextResponse.json({ success: true }, { status: 200 });
    const session = await getRouteSession(request, res);
    session.destroy();
    return res;
}