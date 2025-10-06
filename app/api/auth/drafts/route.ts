import { prisma } from "@/lib/prisma";
import { getRouteSession } from "@/lib/session";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/auth/drafts:
 *   get:
 *     summary: Get user's drafts
 *     description: Retrieve all drafts belonging to the authenticated user
 *     tags: [Drafts]
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: List of user's drafts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Draft'
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function GET(request: Request) {
    const res = NextResponse.next(); // dummy response
    const session = await getRouteSession(request, res);

    if (!session.userId) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const drafts = await prisma.draft.findMany({
        where: { userId: session.userId },
        orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(drafts, { status: 200 });
}