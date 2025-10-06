import { prisma } from "@/lib/prisma";
import { getRouteSession } from "@/lib/session";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/auth/updateProfile:
 *   put:
 *     tags:
 *       - Profile
 *     summary: Update user profile (legacy endpoint)
 *     description: Updates user profile data. This is a legacy endpoint, consider using /api/profile instead.
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               experience:
 *                 type: string
 *                 description: Work experience details
 *               education:
 *                 type: string
 *                 description: Education background
 *               skills:
 *                 type: string
 *                 description: Technical and professional skills
 *               strengths:
 *                 type: string
 *                 description: Personal and professional strengths
 *             example:
 *               experience: "5 years as a Software Developer"
 *               education: "Bachelor's in Computer Science"
 *               skills: "JavaScript, React, Node.js"
 *               strengths: "Problem-solving, Team collaboration"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       400:
 *         description: Bad request - at least one field is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "At least one field is required"
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
export async function PUT(request: Request) {
    const res = NextResponse.next();
    const session = await getRouteSession(request, res);

    if (!session.userId) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const body = await request.json();
    const { experience, education, skills, strengths } = body;

    // Validating input
    if (!experience && !education && !skills && !strengths) {
        return NextResponse.json({ error: "At least one field is required" }, { status: 400 });
    }

    // Update the profile in the database
    const updatedProfile = await prisma.profile.update({
        where: { userId: session.userId },
        data: { experience, education, skills, strengths },
    });

    return NextResponse.json(updatedProfile, { status: 200 });
}