import React from "react";
import JobCard from "./JobCard";
import { JobListDto } from "./dto/jobListDto";

interface JobListProps {
    jobs: JobListDto[];
    bookmarkedJobs: string[];
    onToggleBookmark: (id: string) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, bookmarkedJobs, onToggleBookmark }) => {
    if (jobs.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No jobs found matching your criteria.
            </div>
        );
    }

    return (
        <div className="border rounded-lg divide-y">
            {jobs.map((job) => (
                <JobCard
                    key={job.id}
                    job={job}
                    isBookmarked={bookmarkedJobs.includes(job.id)}
                    onToggleBookmark={onToggleBookmark}
                />
            ))}
        </div>
    );
};

export default JobList;
