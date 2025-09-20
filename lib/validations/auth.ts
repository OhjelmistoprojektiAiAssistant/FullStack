import z, { email } from "zod";

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const SignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
})