import React from "react";
import BookmarkButton from "./BookmarkButton";

interface JobCardProps {
    job: any;
    isBookmarked: boolean;
    onToggleBookmark: (id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, isBookmarked, onToggleBookmark }) => {
    return (
        <div className="p-4 border rounded-2xl shadow-sm flex flex-col justify-between bg-white">
            <div>
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-sm text-gray-500">{job.location}</p>
            </div>

            <div className="flex justify-between items-center mt-3">
                <p className="text-blue-600 font-medium">{job.type}</p>
                <BookmarkButton
                    isBookmarked={isBookmarked}
                    onClick={() => onToggleBookmark(job.id)}
                />
            </div>
        </div>
    );
};

export default JobCard;
