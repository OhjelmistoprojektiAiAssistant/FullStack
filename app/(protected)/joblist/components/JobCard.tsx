import React from "react";
import BookmarkButton from "./BookmarkButton";
import { JobListDto } from "./dto/jobListDto";

interface JobCardProps {
    job: JobListDto;
    isBookmarked: boolean;
    onToggleBookmark: (id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, isBookmarked, onToggleBookmark }) => {
    return (
      <div className="p-4 border rounded-2xl shadow-sm flex flex-col justify-between bg-white">
        <div>
          <h3 className="text-xl font-semibold">{job.title}</h3>
          <p className="text-gray-600">{job.companyName}</p>
          <p className="text-sm text-gray-500">{job.location}</p>

          {job.salaryRange && (
            <p className="text-green-600 font-medium mt-2">{job.salaryRange}</p>
          )}
        </div>

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center space-x-2">
            <p className="text-blue-600 font-medium">{job.category}</p>{" "}
            {/* Changed from job.type */}
            {/* Add apply button */}
            <a
              href={job.redirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
            >
              Visit
            </a>
          </div>
          
          <BookmarkButton
            isBookmarked={isBookmarked}
            onClick={() => onToggleBookmark(job.id)}
          />
        </div>
      </div>
    );
};

export default JobCard;
