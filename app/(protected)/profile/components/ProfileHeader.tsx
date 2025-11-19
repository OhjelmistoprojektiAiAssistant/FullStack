import React from "react";

interface ProfileHeaderProps {
    userInfo: { email?: string; memberSince?: string };
    stats: { profileCompleteness?: number };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userInfo, stats }) => (
    <div className="pb-8 border-b border-stone-200">
        <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-stone-800">Profile Overview</h2>
            <p className="mt-2 text-stone-600">
                Update your profile to help our AI generate better job applications.
            </p>
        </div>

        {userInfo.email && (
            <div className="bg-stone-50 rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h4 className="font-medium text-stone-800 mb-1">Email Address</h4>
                        <p className="text-stone-600">{userInfo.email}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h4 className="font-medium text-stone-800 mb-1">Member Since</h4>
                        <p className="text-stone-600">{userInfo.memberSince}</p>
                    </div>
                </div>

                {stats.profileCompleteness !== undefined && (
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-stone-800">Profile Completeness</h4>
                            <span className="text-lg font-bold text-stone-800">{stats.profileCompleteness}%</span>
                        </div>
                        <div className="w-full bg-stone-200 rounded-full h-3">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-300"
                                style={{ width: `${stats.profileCompleteness}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-stone-600 mt-2">
                            {stats.profileCompleteness === 100 ? "Perfect! Your profile is complete ✅" : "Complete your profile for better AI recommendations"}
                        </p>
                    </div>
                )}
            </div>
        )}
    </div>
);

export default ProfileHeader;