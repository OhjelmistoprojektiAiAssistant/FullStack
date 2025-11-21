//profile/components/UserInfoCard

import { UserInfoCardProps } from "@/lib/types/profile";
import LoadingSpinner from "../../../(public)/components/ui/LoadingSpinner";

export default function UserInfoCard({ user }: UserInfoCardProps) {
  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <LoadingSpinner size={40} />
        <p className="text-gray-600 mt-4">Loading user information...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Account Information</h3>

      <div className="space-y-3">
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <p className="font-medium">{user.email}</p>
        </div>

        <div>
          <label className="text-sm text-gray-600">Member Since</label>
          <p className="font-medium">{user.memberSince}</p>
        </div>

        <div>
          <label className="text-sm text-gray-600">Password</label>
          <p className="font-medium text-gray-400">{user.passwordHash}</p>
        </div>
      </div>
    </div>
  );
}
