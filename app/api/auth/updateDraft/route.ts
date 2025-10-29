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
 *             properties:
 *               id:
 *                 type: string
 *                 description: Draft ID to update
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               name:
 *                 type: string
 *                 description: Updated draft name
 *                 example: "Senior Developer Application - Updated"
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
 *         description: Bad request - draft ID is required, and at least name or content must be provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "At least name or content must be provided"
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
    const { name, content } = body;

    if (!draftId) {
        return NextResponse.json({ error: "Draft id is required" }, { status: 400 });
    }

    if (!name && !content) {
        return NextResponse.json({ error: "At least name or content must be provided" }, { status: 400 });
    }

    // Ensure the draft belongs to the user
    const draft = await prisma.draft.findUnique({ where: { id: draftId } });
    if (!draft || draft.userId !== session.userId) {
        return NextResponse.json({ error: "Draft not found or unauthorized" }, { status: 404 });
    }

    // Build update data object with only provided fields
    const updateData: { name?: string; content?: string } = {};
    if (name) updateData.name = name;
    if (content) updateData.content = content;

    const updated = await prisma.draft.update({
        where: { id: draftId },
        data: updateData,
    });
    return NextResponse.json(updated, { status: 200 });
}
