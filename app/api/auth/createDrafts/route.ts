import { prisma } from "@/lib/prisma";
import { getRouteSession } from "@/lib/session";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/auth/createDrafts:
 *   post:
 *     summary: Create a new draft
 *     description: Create a new draft for the authenticated user
 *     tags: [Drafts]
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - content
 *             properties:
 *               name:
 *                 type: string
 *                 description: Draft name or title
 *                 example: "Software Engineer Application - TechCorp"
 *               content:
 *                 type: string
 *                 description: Draft content text
 *                 example: "Dear Hiring Manager, I am writing to express my interest..."
 *     responses:
 *       201:
 *         description: Draft created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Draft'
 *       400:
 *         description: Bad request - name and content are required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   examples:
 *                     name_required:
 *                       value: "Name is required"
 *                     content_required:
 *                       value: "Content is required"
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
export async function POST(request: Request) {
    const res = NextResponse.next();
    const session = await getRouteSession(request, res);

    if (!session.userId) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const body = await request.json();
    const { name, content } = body;

    if (!name) {
        return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!content) {
        return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const draft = await prisma.draft.create({
        data: { userId: session.userId, name, content },
    });
    return NextResponse.json(draft, { status: 201 });
}