import { UserStatsCardProps } from "@/lib/types/profile";


export default function UserStatsCard({ stats }: UserStatsCardProps) {
    if (!stats) {
        return <div>Loading user statistics...</div>;
    }

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Your Statistics</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Job Count */}
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.jobCount}
            </div>
            <div className="text-sm text-gray-600">Jobs Applied</div>
          </div>

          {/* Draft Count */}
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.draftCount}
            </div>
            <div className="text-sm text-gray-600">Drafts Saved</div>
          </div>

          {/* Profile Completeness */}
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.profileCompleteness}%
            </div>
            <div className="text-sm text-gray-600">Profile Complete</div>
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${stats.profileCompleteness}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
}