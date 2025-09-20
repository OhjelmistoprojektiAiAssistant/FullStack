import { prisma } from "@/lib/prisma";
import { createUserSession } from "@/lib/session";
import { signInSchema, SignUpSchema } from "@/lib/validations/auth";
import bcrypt from "bcryptjs";
import z, { email } from "zod";

export async function signUp(unsafeData: z.infer<typeof SignUpSchema>) {
  const { success, data } = SignUpSchema.safeParse(unsafeData);

  if (!success) return { error: "Unable to create account" };

  const existingUser = await prisma.user.findFirst({
    where: { email: data.email },
  });
  if (existingUser != null)
    return { error: "User with this email already exists" };

  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });
    await createUserSession({ id: user.id });
    return { success: true, user: { id: user.id, email: user.email } };
  } catch (error) {
    console.log("Error creating user:", error);
    return { error: "Error creating user" };
  }
}
