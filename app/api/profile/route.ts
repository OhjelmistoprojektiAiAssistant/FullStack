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
 * GET /api/profile
 *
 * Returns comprehensive user data including:
 * - User account info (email, passwordHash masked, createdAt)
 * - User statistics (job count, draft count, profile completeness)
 * - Profile data (experience, education, skills, strengths)
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
 * PUT /api/profile
 *
 * Updates user profile data (creates profile if doesn't exist)
 * Only updates the editable profile fields, not user account data
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
