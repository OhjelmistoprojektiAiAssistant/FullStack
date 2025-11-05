"use client";
import React, { useState } from "react";
import BookmarkButton from "./BookmarkButton";
import { JobListDto } from "./dto/jobListDto";
import { ChevronDown, ChevronUp } from "lucide-react";

interface JobCardProps {
  job: JobListDto;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, isBookmarked, onToggleBookmark }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b last:border-b-0">
      <div
        className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold truncate">{job.title}</h3>
            <div className="flex items-center space-x-4">
              <span className="text-green-600 font-medium whitespace-nowrap">
                {job.salaryRange}
              </span>
              <BookmarkButton
                isBookmarked={isBookmarked}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleBookmark(job.id);
                }}
              />
              {isExpanded ? (
                <ChevronUp className="text-gray-400" size={20} />
              ) : (
                <ChevronDown className="text-gray-400" size={20} />
              )}
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <span className="truncate">{job.companyName}</span>
            <span className="mx-2">•</span>
            <span className="truncate">{job.location}</span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 bg-gray-50 border-t">
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line">
              {job.description}
            </p>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Job Details:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Category: {job.category}</li>
                <li>Salary: {job.salaryRange}</li>
                <li>Location: {job.location}</li>
              </ul>
            </div>
            <div className="mt-4 flex justify-end">
              <a
                href={job.redirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                View Full Listing
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
