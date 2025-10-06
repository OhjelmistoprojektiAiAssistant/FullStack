// api/profile/route.ts

import { prisma } from "@/lib/prisma";
import { getRouteSession } from "@/lib/session";
import { NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for profile updates
const profileUpdateSchema = z.object({
  experience: z.string().max(2000).optional(),
  education: z.string().max(2000).optional(),
  skills: z.string().max(500).optional(),
  strengths: z.string().max(1000).optional(),
});

// Helper function to format member since date
function formatMemberSince(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

// Helper function to calculate profile completeness percentage
function calculateCompleteness(profile: any): number {
  if (!profile) return 0;

  const fields = ["experience", "education", "skills", "strengths"];
  const filledFields = fields.filter(
    (field) => profile[field] && profile[field].trim().length > 0
  ).length;

  return Math.round((filledFields / fields.length) * 100);
}

/**
 * @swagger
 * /api/profile:
 *   get:
 *     tags:
 *       - Profile
 *     summary: Get comprehensive user profile data
 *     description: Returns comprehensive user data including account info, user statistics, and profile data
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: Profile data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "user123"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "user@example.com"
 *                     passwordHash:
 *                       type: string
 *                       example: "[REDACTED]"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     memberSince:
 *                       type: string
 *                       example: "October 2023"
 *                 userStats:
 *                   type: object
 *                   properties:
 *                     jobCount:
 *                       type: integer
 *                       example: 5
 *                     draftCount:
 *                       type: integer
 *                       example: 3
 *                     profileCompleteness:
 *                       type: integer
 *                       example: 75
 *                 profile:
 *                   $ref: '#/components/schemas/Profile'
 *       401:
 *         description: Unauthorized - user not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 authenticated:
 *                   type: boolean
 *                   example: false
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
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch profile data"
 */
export async function GET(request: Request) {
  try {
    // Check authentication
    const res = NextResponse.next();
    const session = await getRouteSession(request, res);

    if (!session.userId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Authentication required",
          },
        },
        { status: 401 }
      );
    }

    // Fetch comprehensive user data with relation counts
    const userData = await prisma.user.findUnique({
      where: { id: session.userId },
      include: {
        profile: true,
        _count: {
          select: {
            jobs: true,
            drafts: true,
          },
        },
      },
    });

    if (!userData) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "USER_NOT_FOUND",
            message: "User not found",
          },
        },
        { status: 404 }
      );
    }

    // Calculate profile completeness
    const completeness = calculateCompleteness(userData.profile);

    // Format response with masked password and formatted dates
    const response = {
      success: true,
      data: {
        // User account information (read-only)
        user: {
          email: userData.email,
          passwordHash: "••••••••••••", // Always masked for security
          createdAt: userData.createdAt.toISOString(),
          memberSince: formatMemberSince(userData.createdAt),
        },

        // User statistics (read-only)
        stats: {
          jobCount: userData._count.jobs,
          draftCount: userData._count.drafts,
          profileCompleteness: completeness,
        },

        // Profile data (editable)
        profile: userData.profile,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "An error occurred while fetching profile data",
        },
      },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/profile:
 *   put:
 *     tags:
 *       - Profile
 *     summary: Update user profile data
 *     description: Updates user profile data (creates profile if doesn't exist). Only updates the editable profile fields, not user account data.
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
 *                 maxLength: 2000
 *                 description: Work experience details
 *                 example: "5 years as a Software Developer at Tech Corp"
 *               education:
 *                 type: string
 *                 maxLength: 2000
 *                 description: Education background
 *                 example: "Bachelor's in Computer Science from University"
 *               skills:
 *                 type: string
 *                 maxLength: 500
 *                 description: Technical and professional skills
 *                 example: "JavaScript, React, Node.js, Python"
 *               strengths:
 *                 type: string
 *                 maxLength: 1000
 *                 description: Comma-separated list of strengths
 *                 example: "Problem-solving, Team collaboration, Communication"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     profile:
 *                       $ref: '#/components/schemas/Profile'
 *                     message:
 *                       type: string
 *                       example: "Profile updated successfully"
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: "VALIDATION_ERROR"
 *                     message:
 *                       type: string
 *                       example: "Invalid profile data"
 *                     details:
 *                       type: object
 *       401:
 *         description: Unauthorized - user not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: "UNAUTHORIZED"
 *                     message:
 *                       type: string
 *                       example: "Authentication required"
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
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: "DATABASE_ERROR"
 *                     message:
 *                       type: string
 *                       example: "Failed to update profile"
 */
export async function PUT(request: Request) {
  try {
    // Check authentication
    const res = NextResponse.next();
    const session = await getRouteSession(request, res);

    if (!session.userId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Authentication required",
          },
        },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = profileUpdateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid profile data",
            details: validation.error.flatten(),
          },
        },
        { status: 400 }
      );
    }

    const profileData = validation.data;

    // Use upsert to update existing profile or create new one
    const updatedProfile = await prisma.profile.upsert({
      where: {
        userId: session.userId,
      },
      update: {
        ...profileData,
        // updatedAt is automatically set by Prisma
      },
      create: {
        userId: session.userId,
        ...profileData,
      },
      select: {
        id: true,
        experience: true,
        education: true,
        skills: true,
        strengths: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        profile: updatedProfile,
        message: "Profile updated successfully",
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "An error occurred while updating profile",
        },
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/profile
 *
 * Deletes user profile data (keeps user account)
 * This clears all profile fields but doesn't delete the user
 */
export async function DELETE(request: Request) {
  try {
    // Check authentication
    const res = NextResponse.next();
    const session = await getRouteSession(request, res);

    if (!session.userId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Authentication required",
          },
        },
        { status: 401 }
      );
    }

    // Delete profile if it exists
    const deletedProfile = await prisma.profile
      .delete({
        where: {
          userId: session.userId,
        },
      })
      .catch(() => null); // Ignore error if profile doesn't exist

    return NextResponse.json({
      success: true,
      data: {
        message: deletedProfile
          ? "Profile deleted successfully"
          : "No profile found to delete",
      },
    });
  } catch (error) {
    console.error("Error deleting profile:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "An error occurred while deleting profile",
        },
      },
      { status: 500 }
    );
  }
}
