import { getRouteSession } from "@/lib/session";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: User logout
 *     description: Destroy the current user session and log out the user
 *     tags: [Authentication]
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function POST(request: Request) {
    const res = NextResponse.json({ success: true }, { status: 200 });
    const session = await getRouteSession(request, res);

    session.destroy();
    return res;
}