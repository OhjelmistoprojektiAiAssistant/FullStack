import { getRouteSession } from "@/lib/session";
import { NextResponse } from "next/server";


/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     tags:
 *       - User
 *     summary: Get current user information
 *     description: Returns basic information about the currently authenticated user
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authenticated:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: User ID
 *                       example: "user123"
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: User email address
 *                       example: "user@example.com"
 *       401:
 *         description: Unauthorized - user not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authenticated:
 *                   type: boolean
 *                   example: false
 */
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