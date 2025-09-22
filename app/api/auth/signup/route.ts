import { prisma } from "@/lib/prisma";
import { getRouteSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";



const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
    
    // Ensure passwords match
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
});
// api/auth/signup
export async function POST(request: Request) {
    try {
      const body = await request.json();
      const parsed = signUpSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          {
            success: false,
            error: { code: "validation_error" },
            issues: parsed.error.flatten(),
          },
          { status: 400 }
        );
      }
      const { email, password } = parsed.data;
      // check if user with email already exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "USER_EXISTS",
              message: "User with this email already exists",
            },
          },
          { status: 409 }
        );
      }
      // hash password
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { email, passwordHash },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });

      // set Session
      const res = NextResponse.json(
        { success: true, user: { id: user.id, email: user.email } },
        { status: 201 }
      );
      // get session
      const session = await getRouteSession(request, res);
      session.userId = user.id;
      session.email = user.email;
      await session.save();
      return res;
    } catch (e) {
      return NextResponse.json(
        { success: false, error: { code: "UNKNOWN" } },
        { status: 500 }
      );
    }
}

