"server-only"

import { cookies } from "next/headers";
import z from "zod"

const sessionSchema = z.object({
    id: z.string(), // user id is not hashed for simplicity
    // role may be added later
})

type UserSession = z.infer<typeof sessionSchema>;
export async function createUserSession(user: UserSession) {
    // Create a session for the user
    const cookieStore = await cookies();

    // set the session cookie
    cookieStore.set('session', JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    });
}

export async function getUserSession(): Promise<UserSession | null> {
    const cookiesStore = await cookies();
    const sessionCookie = cookiesStore.get('session');

    if (!sessionCookie) return null;
    try {
        const parsed = JSON.parse(sessionCookie.value);
        return sessionSchema.parse(parsed);
    } catch (error) {
        return null;
    }
}

// Check if user is logged in
export async function isUserLoggedIn(): Promise<boolean> {
  const session = await getUserSession();
  return session !== null;
}


// Delete user session --> log out
export async function deleteUserSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}