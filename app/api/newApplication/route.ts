"use server";
import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { getRouteSession } from "@/lib/session";


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
    // return error if openAI key is not set
    if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json(
            { success: false, error: { code: "OPENAI_KEY_NOT_SET" } },
            { status: 500 }
        );
    }
    const res = NextResponse.next();
    const session = await getRouteSession(request, res);

    if (!session.userId) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
   
    // LLm integration logic here
    
}