import { prisma } from "@/lib/prisma";
import { getRouteSession } from "@/lib/session";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/auth/updateDraft:
 *   put:
 *     summary: Update a draft
 *     description: Update the content of an existing draft for the authenticated user
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
 *               - id
 *               - content
 *             properties:
 *               id:
 *                 type: string
 *                 description: Draft ID to update
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               content:
 *                 type: string
 *                 description: Updated draft content
 *                 example: "Updated cover letter content..."
 *     responses:
 *       200:
 *         description: Draft updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Draft'
 *       400:
 *         description: Bad request - draft ID and content are required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Draft id and content are required"
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
 *       404:
 *         description: Draft not found or unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Draft not found or unauthorized"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function PUT(request: Request) {
    const res = NextResponse.next();
    const session = await getRouteSession(request, res);

    if (!session.userId) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const body = await request.json();
    const draftId = body.id;
    const content = body.content;

    if (!draftId || !content) {
        return NextResponse.json({ error: "Draft id and content are required" }, { status: 400 });
    }

    // Ensure the draft belongs to the user
    const draft = await prisma.draft.findUnique({ where: { id: draftId } });
    if (!draft || draft.userId !== session.userId) {
        return NextResponse.json({ error: "Draft not found or unauthorized" }, { status: 404 });
    }

    const updated = await prisma.draft.update({
        where: { id: draftId },
        data: { content },
    });
    return NextResponse.json(updated, { status: 200 });
}
