import React from "react";

interface ProfileHeaderProps {
    userInfo: { email?: string; memberSince?: string };
    stats: { profileCompleteness?: number };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userInfo, stats }) => (
    <div className="pb-5 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
        <p className="mt-2 text-sm text-gray-500">
            Update your profile to help our AI generate better job applications.
        </p>
        {userInfo.email && (
            <div className="mt-3 text-sm text-gray-700">
                <p>
                    <strong>Email:</strong> {userInfo.email}
                </p>
                <p>
                    <strong>Member since:</strong> {userInfo.memberSince}
                </p>
                {stats.profileCompleteness !== undefined && (
                    <p>
                        <strong>Profile completeness:</strong>{" "}
                        {stats.profileCompleteness}% ✅
                    </p>
                )}
            </div>
        )}
    </div>
);

export default ProfileHeader;