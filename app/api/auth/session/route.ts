import { getRouteSession } from "@/lib/session";
import { NextResponse } from "next/server";
import { email, success } from "zod";


/**
 * @swagger
 * /api/auth/session:
 *   get:
 *     tags:
 *       - User
 *     summary: Get session status and user information
 *     description: Returns detailed session information including authentication status and user data
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: Session information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 isAuthenticated:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       description: User ID
 *                       example: "user123"
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: User email address
 *                       example: "user@example.com"
 *               examples:
 *                 authenticated:
 *                   summary: Authenticated user
 *                   value:
 *                     success: true
 *                     isAuthenticated: true
 *                     user:
 *                       userId: "user123"
 *                       email: "user@example.com"
 *                 unauthenticated:
 *                   summary: Unauthenticated user
 *                   value:
 *                     success: false
 *                     isAuthenticated: false
 *                     user: null
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 isAuthenticated:
 *                   type: boolean
 *                   example: false
 *                 user:
 *                   type: null
 *                   example: null
 */
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