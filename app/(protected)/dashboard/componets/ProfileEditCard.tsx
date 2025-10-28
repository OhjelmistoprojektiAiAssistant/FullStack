//profile/components/ProfileEditCard
"use client";

import { useRouter } from "next/navigation";
import {
  ProfileEditCardProps,
} from "@/lib/types/profile";

export default function ProfileEditCard({
  profile,
}: ProfileEditCardProps) {
  const router = useRouter();

  // FormData now includes all profile fields
  const formData = {
    experience: profile?.experience || "",
    education: profile?.education || "",
    skills: profile?.skills || "",
    strengths: profile?.strengths || "",
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Profile Information</h3>
        <button
          onClick={() => router.push("/profile")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit Profile
        </button>
      </div>
      {/* Read-only view */}
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-600">Experience</label>
          <p className="mt-1">{formData.experience || "Not provided"}</p>
        </div>
        <div>
          <label className="text-sm text-gray-600">Education</label>
          <p className="mt-1">{formData.education || "Not provided"}</p>
        </div>
        <div>
          <label className="text-sm text-gray-600">Skills</label>
          <p className="mt-1">{formData.skills || "Not provided"}</p>
        </div>
        <div>
          <label className="text-sm text-gray-600">Strengths</label>
          <p className="mt-1">{formData.strengths || "Not provided"}</p>
        </div>
      </div>
    </div>
  );
}
