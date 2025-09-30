
import { cookies } from "next/headers";
import { getIronSession, SessionOptions} from "iron-session";
import { SessionUser } from "./types/session";


export const sessionOptions: SessionOptions = {
    cookieName: "career_ai_session",
    password: process.env.SESSION_SECRET! as string,
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        samesite: "strict",
    },
};

// we use inside route handlers (app/api/...) where you have a Request/Response
// returns a session bound to the response we return
export function getRouteSession(request: Request, response: Response) {
    return getIronSession<SessionUser>(request, response, sessionOptions);
} 

// we use inside Server Components (app/...)
// we dont have response here, so we create a dummy response thath wont be sent
//but lets iron-session read coookies safely

export async function getServerSession() {
    const cookieHeader = (await cookies()).toString(); // serialize cookies which means: cookie1=value1; cookie2=value2
    const req = new Request("http://localhost", { headers: { cookie: cookieHeader } });
    const res = new Response(); // dummy response
    return getIronSession<SessionUser>(req, res, sessionOptions);
}


