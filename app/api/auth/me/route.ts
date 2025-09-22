import { getRouteSession } from "@/lib/session";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    const res = NextResponse.next(); // dummy response
    const session = await getRouteSession(request, res);

    if (!session.userId) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    
     return NextResponse.json(
       {
         authenticated: true,
         user: { id: session.userId, email: session.email },
       },
       { status: 200 }
     ); 
}