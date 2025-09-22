import { prisma } from "@/lib/prisma";
import { getRouteSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import z, { success } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsed = loginSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { success: false, error: { code: "validation_error" }, issues: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const { email, password } = parsed.data;
        const user = await prisma.user.findUnique({
            where: { email },
        })
        if (!user) {
            return NextResponse.json(
                { success: false, error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } },
                { status: 401 }
            );
        }

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) {
            return NextResponse.json(
                { success: false, error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } },
                { status: 401 }
            );
        }

        // login successful, set session
        const res = NextResponse.json({ success: true, user: { id: user.id, email: user.email } }, { status: 200 });
        const session = await getRouteSession(request, res);
        session.userId = user.id;
        session.email = user.email;
        await session.save();
        return res;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { success: false, error: { code: "internal_error", message: "An internal error occurred" } },
            { status: 500 }
        );
    }
}