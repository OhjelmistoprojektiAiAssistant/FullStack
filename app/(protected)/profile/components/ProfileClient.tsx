"use client";
import { useEffect, useState } from "react";
import UserInfoCard from "./UserInfoCard";
import { ProfileData, ProfileUpdateRequest, UserAccountInfo, UserStats } from "@/lib/types/profile";
import { updateProfile } from "@/lib/routes/profile";
import UserStatsCard from "./UserStatsCard";
import ProfileEditCard from "./ProfileEditCard";
import { useRouter } from "next/navigation";


export default function ProfileClient() {

    const [profileData, setProfileData] = useState<{
        user: UserAccountInfo;
        stats: UserStats;
        profile: ProfileData | null;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();


    // fetch data on mount 
    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const res = await fetch("/api/profile", {
                method: "GET",
                credentials: "include" // important for session cookies
            });
            const responseData = await res.json();
            
            if (!responseData.success) {
                setError(responseData.error?.message || "Failed to fetch profile");
                return;
            }
            setProfileData(responseData.data);
        } catch (error) {
            console.error("Failed to fetch profile: ", error);
            setError("Network error");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleProfileSave = async (updateData: ProfileUpdateRequest) => {
        const res = await fetch("/api/profile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(updateData)
        });

        const result = await res.json();
        if (!result.success) {
            throw new Error(result.error?.message || "Failed to update profile");
        }

        // Refresh profile data after successful update
        await fetchProfile();
    }

    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {isLoading ? (
          <div>Loading...</div>
        ) : profileData ? (
          <>
            <UserInfoCard user={profileData.user} />
            <UserStatsCard stats={profileData.stats} />
            <ProfileEditCard
              profile={profileData.profile}
              onSave={handleProfileSave}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          </>
        ) : null}
      </div>
    );
}